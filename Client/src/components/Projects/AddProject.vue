<template>
  <v-content>
    <v-flex mt-2 md6 xs12 offset-md3>
      <v-card>

        <v-card-title primary-title class="layout justify-center">
          <div class="headline text-xs-center"><b>Add New Project</b></div>
        </v-card-title>
        <div class="layout justify-center">
          <p class="body-2">Please specify the details of the project you wish to create in the form below.</p>
        </div>
        <v-flex md10 xs12 offset-md1>
          <v-form v-model="valid" ref="project">
            <v-text-field
              label="Project Name"
              v-model="name"
              :rules="nameRules"
              required
            ></v-text-field>

            <v-text-field
              label="Client"
              v-model="client"
              :rules="clientRules"
              required
            ></v-text-field>

            <v-text-field
              v-model="description"
              label="Project Description"
              multi-line
            ></v-text-field>

            <v-layout row wrap>
              <v-flex xs11 sm5>
                <v-menu
                  ref="menu1"
                  lazy
                  :close-on-content-click="false"
                  v-model="menu1"
                  transition="scale-transition"
                  offset-y
                  full-width
                  :nudge-right="40"
                  min-width="290px"
                  :return-value.sync="startDate"
                >
                  <v-text-field
                    slot="activator"
                    label="Start Date"
                    v-model="startDate"
                    prepend-icon="event"
                    readonly
                  ></v-text-field>
                  <v-date-picker
                    v-model="startDate"
                    scrollable
                    color="black"
                  >
                    <v-btn flat color="primary" @click="menu1 = false">Cancel</v-btn>
                    <v-btn flat color="primary" @click="$refs.menu1.save(startDate)">OK</v-btn>
                  </v-date-picker>
                </v-menu>
              </v-flex>
              <v-spacer></v-spacer>
              <v-flex xs11 sm5>
                <v-menu
                  ref="menu2"
                  lazy
                  :close-on-content-click="false"
                  v-model="menu2"
                  transition="scale-transition"
                  offset-y
                  full-width
                  :nudge-right="40"
                  min-width="290px"
                  :return-value.sync="endDate"
                >
                  <v-text-field
                    slot="activator"
                    label="End Date"
                    v-model="endDate"
                    prepend-icon="event"
                    readonly
                  ></v-text-field>
                  <v-date-picker
                    color="black"
                    v-model="endDate"
                    scrollable
                  >
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="menu2 = false">Cancel</v-btn>
                    <v-btn flat color="primary" @click="$refs.menu2.save(endDate)">OK</v-btn>
                  </v-date-picker>
                </v-menu>
              </v-flex>
            </v-layout>

            <hr>
            <br>

            <div>
              <p class="title">Technologies</p>
              <p>Please mention the technologies you plan to use in your project.</p>
            </div>
            <div>
              <v-layout row wrap>
                <v-flex xs11 sm5>
                  <v-text-field
                    ref="tech"
                    label="Technology"
                    v-model="technology"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs11 sm2>
                  <v-btn
                    :disabled="!(technology != '')"
                    @click="addTech"
                  >Add</v-btn>
                </v-flex>
                <v-flex xs11 sm5>
                  <br>
                  <v-layout v-for="(item,index) in techs" :key="`${item}`">
                    <v-flex xs11 sm5>
                      <p class="body-2">{{item}}</p>
                    </v-flex>
                    <v-flex xs11 sm5>
                      <v-icon
                        @click="techs.splice(index,1)"
                      >mdi-delete</v-icon>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>

            </div>

            <hr>
            <br>

            <div>
              <p class="title">Tasks</p>
              <p>Please mention the tasks involved in the project. These are the main parts of the project that will determine the flow of the project.</p>
              <p>Deadline will be the final date given to complete the relevant task.</p>
              <p>Select a user who will be responsible for the relevant task.</p>
            </div>

            <div>
              <v-layout row wrap>
                <v-flex xs11 md8>
                  <v-text-field
                    label="Task Name"
                    v-model="taskName"
                    required
                  ></v-text-field>

                  <v-menu
                    ref="deadline"
                    lazy
                    :close-on-content-click="false"
                    v-model="menu3"
                    transition="scale-transition"
                    offset-y
                    full-width
                    :nudge-right="40"
                    min-width="290px"
                    :return-value.sync="deadline"
                  >
                    <v-text-field
                      slot="activator"
                      label="Deadline"
                      v-model="deadline"
                      prepend-icon="event"
                      readonly
                    ></v-text-field>
                    <v-date-picker
                      color="black"
                      v-model="deadline"
                      scrollable
                    >
                      <v-spacer></v-spacer>
                      <v-btn flat color="primary" @click="menu3 = false">Cancel</v-btn>
                      <v-btn flat color="primary" @click="$refs.menu3.save(deadline)">OK</v-btn>
                    </v-date-picker>
                  </v-menu>

                  <v-select
                    :items="users"
                    v-model="user"
                    label="Select a user"
                    autocomplete
                  ></v-select>

                </v-flex>
                <v-flex xs11 md4>
                  <v-btn
                    :disabled="(taskName === '') || (deadline === null) || (user === null)"
                    @click="addTask"
                  >Add Task</v-btn>
                </v-flex>
              </v-layout>
            </div>
            <br>
            <hr>
            <br>
            <v-layout v-for="(item,index) in tasks" :key="`${index}`">
              <v-flex xs11 md8>
                <p><b>Task Name: {{item.taskName}}</b></p>
                <p>Deadline: {{item.deadline}}</p>
                <p>Assigned User: {{item.user}}</p>

              </v-flex>
              <v-flex xs11 md4>
                <v-btn @click="tasks.splice(index,1)">Remove Task</v-btn>
              </v-flex>
            </v-layout>
            <hr v-show="tasks.length>0">
            <br v-show="tasks.length>0">
            <p>Please confirm that the above information is correct.</p>
            <v-switch
              color="green"
              v-model="switch1"
            ></v-switch>

            <div class="layout justify-center">
              <v-btn
                dark
                :disabled="!switch1"
              >Add Project</v-btn>
            </div>

          </v-form>

        </v-flex>
      </v-card>
    </v-flex>
  </v-content>
</template>

<script>
  import axios from 'axios';
  export default {

    data () {
      return {
        valid: false,
        name: '',
        nameRules: [
          (v) => !!v || 'Project name is required',
        ],

        client: '',
        clientRules: [
          (v) => !!v || 'Client name is required',
        ],

        technology: "",
        techs: [],

        taskName: "",
        deadline: null,
        user: null,
        tasks: [],

        description: "",

        startDate: null,
        endDate: null,
        menu1: false,
        menu2: false,
        menu3: false,
        modal: false,

        users: [],
        switch1: false

      }
    },
    methods: {
      addTech () {
        this.techs.push(this.technology);
        this.technology = ""
        this.$refs.tech.focus();
      },

      getUsers () {
        axios.get("http://localhost:3000/project/getUsers")
          .then((response) => {
            console.log(response.data);
            for(var i in response.data){
              if(response.data.hasOwnProperty(i)){
                var obj = response.data[i]
                this.users.push(obj.Name);
              }
            }

          })
          .catch((error) => {

          })
      },

      addTask () {
        var task = new Object();
        task.taskName = this.taskName;
        task.deadline = this.deadline;
        task.user = this.user;
        task.status = false;
        this.tasks.push(task)
        this.taskName = ""
        this.deadline = null
        this.user = null
      },

      addProject () {
        axios.post("http://localhost:3000/project/addProject",{
          name: this.name,
          client: this.client,
          description: this.description,
          technologies: this.techs,
          startDate: this.startDate,
          endDate: this.endDate,
          tasks: this.tasks
        },{headers:{'Content-Type':'application/json'}})
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          })
      }
    },

    mounted () {
      this.getUsers()
    }
  }

</script>

