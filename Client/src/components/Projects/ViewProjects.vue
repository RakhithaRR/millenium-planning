<template>
  <v-content>
    <v-flex mt-2 md8 xs12 offset-md2>
      <v-card>
        <div class="layout justify-center">
          <h1 class="display-3">{{project.Name}}</h1>
        </div>
        <div class="layout justify-center mb-2">
          <h2 class="display-1">{{project.Client}}</h2>
        </div>

        <div class="layout justify-center mt-2 mb-2 ml-4">
          <p class="subheading">{{project.Description}}</p>
        </div>

        <div class="layout justify-center mt-2 mb-2">
          <p class="title">
            {{new Date(project.StartDate).toDateString()}} - {{new Date(project.EndDate).toDateString()}}</p>
        </div>

        <div class="layout justify-center mt-2 mb-2">
          <v-chip v-for="(item,index) in project.Technologies" :key="`${index}`">
            <v-avatar class="teal"><b>{{item[0]}}</b></v-avatar>
            {{item}}
          </v-chip>
        </div>

        <div class="layout justify-center">
          <v-progress-circular
            :size="150"
            :width="10"
            :rotate="-90"
            :value="getCompletion(project)"
            color="teal"
          >
            {{getCompletion(project)}}%
          </v-progress-circular>
        </div>

      </v-card>

      <v-card
        class="mt-2 mb-2"
        v-for="(task,index) in project.Tasks"
        :key="`${index}`"
      >
        <v-card-title>
          <v-flex md9 xs12>
            <h2>{{task.taskName}}</h2>
          </v-flex>
          <v-flex md9 xs12>
            <p class="subheading">{{new Date(task.deadline).toDateString()}}</p>
          </v-flex>
          <v-flex md9 xs12>
            <p class="body-2">Assigned user: {{task.user}}</p>
          </v-flex>
          <v-flex md2>
            <v-btn
              v-show="!task.status && (cUser.Username === task.user)"
              @click="markCompletion(index,true)"
            >
              Mark as completed
            </v-btn>
            <v-btn
              v-show="task.status && (cUser.Username === task.user)"
              @click="markCompletion(index,false)"

            >
              Mark as incomplete
            </v-btn>
          </v-flex>
          <v-flex md1>
            <v-icon
              large
              color="green"
              v-show="task.status"
            >mdi-check-circle
            </v-icon>
            <v-icon
              large
              color="orange"
              v-show="!task.status && !compareDates(task.deadline)"
            >mdi-timer-sand
            </v-icon>
            <v-icon
              large
              color="red"
              v-show="!task.status && compareDates(task.deadline)"
            >mdi-alert-circle
            </v-icon>
          </v-flex>
        </v-card-title>
      </v-card>
    </v-flex>
  </v-content>
</template>

<script>
  import axios from 'axios';

  export default {

    data() {
      return {
        localProject: JSON.parse(localStorage.getItem('project')),
        key: '',
        project: {},
        cUser: JSON.parse(localStorage.getItem('user')),
      }
    },
    methods: {
      getProject() {
        axios.post("http://localhost:3000/project/getCurrentProject",
          {
            name: this.localProject.Name
          },
          {"headers": {'Content-Type': 'application/json'}})
          .then((response) => {
            var key = response.data.key;
            console.log(response.data.project[key]);
            this.project = response.data.project[key];
            this.key = key;
          })
          .catch((error) => {
            console.log(error);
          });
      },

      getCompletion(cProject) {

        var nTasks = 0;
        for (var j in cProject.Tasks) {
          nTasks++
        }
        var counter = 0;
        for (var i in cProject.Tasks) {
          var obj = cProject.Tasks[i];
          if (obj.status) {
            counter++
          }
        }

        return Math.floor((counter / nTasks) * 100);
      },

      markCompletion(index, status) {
        console.log("index:" + index);
        axios.post("http://localhost:3000/project/completion", {
          key: this.key,
          index: index,
          status: status
        }, {"headers": {"Content-Type": "application/json"}})
          .then((response) => {
            console.log(Date.now());
            this.getProject();
          })
          .catch((error) => {
            console.log(error);
          });
      },

      compareDates(date) {
        var cDate = new Date(date);
        if (cDate < Date.now()) {
          return true
        }
        else {
          return false
        }
      }
    },

    mounted() {
      this.getProject();
    },

    computed: {
      checkCompletetion(cTask) {

      }
    }
  }

</script>

<!--<div class="layout justify-center">-->
<!--<v-date-picker-->
<!--full-width-->
<!--landscape-->
<!--class="mt-3"-->

<!--&gt;</v-date-picker>-->
<!--</div>-->
