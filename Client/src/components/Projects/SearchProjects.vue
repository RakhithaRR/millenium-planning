<template>
  <v-content>
    <v-flex mt-2 md4 xs12 offset-md4>
      <div class="search-wrapper">
        <v-text-field
          name="search"
          label="Search for Projects"
          hint="Enter the Project name or Client name to search"
          prepend-icon="search"
          id="testing"
          v-model="search"
        ></v-text-field>
      </div>
    </v-flex>
    <v-flex mt-2 md8 xs12 offset-md2>
      <v-card
        class="mt-2"
        hover
        tile
        v-for="(item,index) in filteredProjects"
        :key="`${index}`"
      >
        <v-card-title primary-title>
          <v-flex md5 xs12>
            <div>
              <h2>Project Name: {{item.Name}}</h2>
              <h4>Client: {{item.Client}}</h4>
            </div>
          </v-flex>
          <v-flex md4 xs12>
            <div>
              <h3>Deadline: {{item.EndDate}}</h3>
            </div>
          </v-flex>
          <v-flex md2 xs12>

            <div>
              <v-progress-circular
                :size="100"
                :width="15"
                :rotate="-90"
                :value="getCompletion(item)"
                color="teal"
              >
                {{getCompletion(item)}}%
              </v-progress-circular>
            </div>
          </v-flex>
          <v-flex md1 xs12>
            <v-chip
              small
              label
              color="green lighten-2"
              v-show="getStatus(item.EndDate,item) === 'Done'"
            >Completed
            </v-chip>
            <v-chip
              small
              label
              color="orange lighten-2"
              v-show="getStatus(item.EndDate,item) === 'Pending'"
            >In Progress
            </v-chip>
            <v-chip
              large
              label
              color="red"
              v-show="getStatus(item.EndDate,item) === 'Overdue'"
            >Overdue
            </v-chip>
          </v-flex>
          <v-flex md2 xs12>
            <v-btn v-on:click="viewProject(item)">
              View
            </v-btn>
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
        projects: [],
        search: ""

      }
    },
    methods: {
      getProjects() {
        axios.get("http://localhost:3000/project/getProjects")
          .then((response) => {
            console.log(response.data);
            for (var i in response.data) {
              if (response.data.hasOwnProperty(i)) {
                var obj = response.data[i]
                this.projects.push(obj);
              }
            }
          })
          .catch((error) => {
            console.log(error);
          })
      },

      getCompletion(project) {
        var nTasks = project.Tasks.length;
        var counter = 0;
        for (var i in project.Tasks) {
          var obj = project.Tasks[i];
          if (obj.status) {
            counter++
          }
        }

        return Math.floor((counter / nTasks) * 100);
      },

      viewProject(projName) {
        localStorage.setItem('project', JSON.stringify(projName));
        this.$router.push("/projects/" + projName.Name);

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

      getStatus(cDate, cProject) {
        var percent = this.getCompletion(cProject);
        var time = this.compareDates(cDate);

        if (percent === 100) {
          return "Done"
        }
        else if (percent < 100 && !time) {
          return "Pending"
        }
        else if (percent < 100 && time) {
          return "Overdue"
        }
      }
    },


    mounted() {
      this.getProjects();
    },

    computed: {
      filteredProjects() {
        return this.projects.filter(project => {
          return (project.Name.toLowerCase().includes(this.search.toLowerCase()) || project.Client.toLowerCase().includes(this.search.toLowerCase()))
        })
      }
    }
  }

</script>

<style scoped>

</style>

