<template>
  <v-content>
    <v-flex mt-2 md8 xs12 offset-md2>
      <v-card class="mb-5" raised>
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
            :size="100"
            :width="10"
            :rotate="-90"
            :value="getCompletion(project).op"
            color="red"
            class="mt-4 mb-2 mr-2"
          >
            <div class="layout justify-center">
              {{getCompletion(project).overdue}}
            </div>
            <div>
              overdue
            </div>
          </v-progress-circular>

          <v-progress-circular
            :size="150"
            :width="10"
            :rotate="-90"
            :value="getCompletion(project).overall"
            color="teal"
            class="mt-2 mb-2"
          >
            {{getCompletion(project).overall}}%
          </v-progress-circular>

          <v-progress-circular
            :size="100"
            :width="10"
            :rotate="-90"
            :value="getCompletion(project).overall"
            color="green"
            class="mt-4 mb-2 ml-2"
          >
            <div class="layout justify-center">
              {{getCompletion(project).completed}}
            </div>
            <div>
              completed
            </div>
          </v-progress-circular>
        </div>
        <div>
          <v-btn
            absolute
            dark
            fab
            bottom
            right
            color="black"
            v-show="cUser.Type === 'Admin'"
            @click="$router.push('/editProjects/'+project.Name)"
          >
            <v-icon>edit</v-icon>
          </v-btn>
        </div>
        <div>
          <v-date-picker
            :show-current='true'
            read-only
            full-width
            no-title
            v-model="date1"
            event-color="purple darken-3"
            :events="events"
            color="teal lighten-2"
          ></v-date-picker>
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
            <v-chip
              small
              label
              color="green lighten-2"
              v-show="task.status"
            >Completed
            </v-chip>
            <v-chip
              small
              label
              color="orange lighten-2"
              v-show="!task.status && !compareDates(task.deadline)"
            >In Progress
            </v-chip>
            <v-chip
              large
              label
              color="red"
              v-show="!task.status && compareDates(task.deadline)"
            >Overdue
            </v-chip>
          </v-flex>
        </v-card-title>
      </v-card>

      <br>
      <br>
      <div>
        <h3 class="display-2">{{project.Name}} Discussion</h3>
      </div>

      <div class="grey lighten-4">
        <v-container
          class="mt-2 scroll-y"
          style="max-height: 500px"
        >
          <div>
            <v-list two-line>
              <v-list-tile
                v-for="(item,index) in messages"
                :key="`${index}`"
              >
                <v-list-tile-content>
                  <v-list-tile-sub-title>~{{ item.username }}~</v-list-tile-sub-title>
                  <v-list-tile-title>{{ item.text }}</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-list-tile-action-text>{{getTime(item.date) +" "+new Date(item.date).toDateString() }}</v-list-tile-action-text>
                </v-list-tile-action>
              </v-list-tile>
            </v-list>
          </div>
        </v-container>
        <div class="layout row">
          <v-flex md11>
            <v-text-field
              ref="msg"
              clearable
              v-model="textMessage"
              label="Enter your message here"
            ></v-text-field>
          </v-flex>
          <v-flex md1>
            <div class="text-xs-right">
              <v-btn
                @click="sendMessage"
                :disabled="!textMessage"
              >Send
              </v-btn>
            </div>
          </v-flex>
        </div>
      </div>

    </v-flex>

  </v-content>
</template>

<script>
  import axios from 'axios';
  import io from 'socket.io-client';

  const socket = io('http://localhost:3000');

  export default {

    data() {
      return {
        localProject: JSON.parse(localStorage.getItem('project')),
        key: '',
        project: {},
        cUser: JSON.parse(localStorage.getItem('user')),
        date1: new Date(Date.now()).toISOString().slice(0, 10),
        events: [],

        textMessage: '',
        messages: [{username: 'System', text: 'Project created.'}]

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
            this.getEvents();
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
        var overdue = 0;
        for (var i in cProject.Tasks) {
          var obj = cProject.Tasks[i];
          if (obj.status) {
            counter++
          }
          else {
            if (this.compareDates(obj.deadline)) {
              overdue++
            }
          }
        }

        var overall = Math.floor((counter / nTasks) * 100);
        var overduePercentage = Math.floor((overdue / nTasks) * 100);

        return {
          overall: overall,
          overdue: overdue,
          completed: counter,
          op: overduePercentage
        }
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
      },

      getEvents() {
        for (var i in this.project.Tasks) {
          if (this.project.Tasks.hasOwnProperty(i)) {
            var obj = this.project.Tasks[i];
            this.events.push(obj.deadline);
          }
        }
      },

      getTime(dateString){
        var d = new Date(dateString);
        return d.getHours()+":"+d.getMinutes()
      },

      sendMessage() {
        console.log("CLICKED");
        socket.emit('chat', {msg:{username: this.cUser.Name, text: this.textMessage, date: new Date()}, key: this.key});
        this.$refs.msg.focus();
        this.textMessage = "";


      },

      receiveMessages() {
        socket.on('chat', (data) => {
          console.log(data);
          this.messages.push(data);
          return this.messages

//          console.log(data.messages);
//          for(var i in data.messages){
//            if(data.messages.hasOwnProperty(i)){
//              var obj = data.messages[i]
//              this.messages.push(obj)
//            }
//          }

        });
      }


    },

    mounted() {
      this.getProject();
      this.receiveMessages();

//      this.startConnection();


    },

    computed: {},

  }

</script>


