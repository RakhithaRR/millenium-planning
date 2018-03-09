<template>
  <v-content>
    <v-flex mt-5 md10 xs-12 offset-md1>
      <v-tabs centered dark grow color="black">
        <v-tabs-slider color="teal"></v-tabs-slider>
        <v-tab href="#profile">
          Profile
        </v-tab>
        <v-tab href="#projects">
          Projects
        </v-tab>
        <v-tab-item
          id="profile"
        >
          <v-card flat>
            <v-card-title class="layout justify-center">
              <h2 class="display-1"><b>User Details</b></h2>
            </v-card-title>
            <v-list>
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title class="layout justify-center">
                    User Type: {{user.Type}}
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title class="layout justify-center">
                    Name: {{user.Name}}
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title class="layout justify-center">
                    Username: {{user.Username}}
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>

            </v-list>

            <v-flex md8 offset-md2>
              <v-expansion-panel>
                <v-expansion-panel-content expand-icon="mdi-menu-down">
                  <div slot="header"><h4>Change Password</h4></div>
                  <v-flex md6 offset-md3>
                    <v-alert color="success" icon="check_circle" value="true" transition="scale-transition"
                             v-show="successCond">
                      {{successMessage}}
                    </v-alert>

                    <v-alert color="error" icon="warning" value="true" transition="scale-transition"
                             v-show="failCond">
                      {{successMessage}}
                    </v-alert>
                    <v-form v-model="valid">
                      <v-text-field
                        label="E-mail"
                        v-model="email"
                        :rules="emailRules"
                        required
                      ></v-text-field>

                      <v-text-field
                        label="Enter current password"
                        v-model="curPassword"
                        :rules="passRules"
                        min="8"
                        :append-icon="pass3 ? 'visibility' : 'visibility_off'"
                        :append-icon-cb="() => (pass3 = !pass3)"
                        :type="pass3 ? 'password' : 'text'"
                        counter
                        required
                      ></v-text-field>

                      <v-text-field
                        label="Enter new passwword"
                        hint="At least 8 characters"
                        v-model="password"
                        :rules="passRules"
                        min="8"
                        :append-icon="pass1 ? 'visibility' : 'visibility_off'"
                        :append-icon-cb="() => (pass1 = !pass1)"
                        :type="pass1 ? 'password' : 'text'"
                        counter
                        required
                      ></v-text-field>

                      <v-text-field
                        label="Confirm new password"
                        v-model="cPassword"
                        :rules="cRules"
                        min="8"
                        :append-icon="pass2 ? 'visibility' : 'visibility_off'"
                        :append-icon-cb="() => (pass2 = !pass2)"
                        :type="pass2 ? 'password' : 'text'"
                        required
                      ></v-text-field>
                      <div class="layout justify-center">
                        <v-btn
                          dark
                          @click="changePass"
                          :disabled="!valid"
                        >Change Password
                        </v-btn>
                      </div>
                    </v-form>
                  </v-flex>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-flex>
          </v-card>
        </v-tab-item>
        <v-tab-item
          id="projects"
        >
          <v-flex mt-2 md8 xs12 offset-md2>
            <div class="layout justify-center">
              <h2 class="display-1"><b>My Projects</b></h2>
            </div>
            <v-card
              class="mt-2"
              hover
              tile
              v-for="(item,index) in projects"
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
        </v-tab-item>
      </v-tabs>
    </v-flex>
  </v-content>
</template>

<script>
  import axios from 'axios';

  export default {
    data() {
      return {
        user: {},

        valid: false,
        pass1: true,
        pass2: true,
        pass3: true,

        curPassword: '',
        password: '',
        passRules: [
          (v) => !!v || 'Password is required',
        ],

        cPassword: '',
        cRules: [
          () => !!this.cPassword || 'Please confirm the password above',
          () => this.cPassword === this.password || 'Entered passwords do not match'
        ],

        email: '',
        emailRules: [
          (v) => !!v || 'E-mail is required',
          (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
        ],

        successMessage: '',
        successCond: false,
        failCond: false,

        projects: []

      }
    },

    methods: {
      changePass() {
        axios.post('http://localhost:3000/users/update', {
          email: this.email,
          currentPass: this.curPassword,
          newPass: this.password,
          auth: this.authInfo
        }, {headers: {'Content-Type': 'application/json'}})
          .then((response) => {
            if (response.data.success) {
              this.successMessage = response.data.message;
              this.successCond = true;
              this.failCond = false;
              this.progress = false;


            }
            else {
              this.successMessage = response.data.message;
              this.progress = false;
              this.failCond = true;
              this.successCond = false;
            }
          })
          .catch((error) => {
            this.successMessage = error.message;
            this.failCond = true;
            this.successCond = false;
            this.progress = false
          });
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
      },

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

      compareDates(date) {
        var cDate = new Date(date);
        if (cDate < Date.now()) {
          return true
        }
        else {
          return false
        }
      },

      viewProject(projName) {
        localStorage.setItem('project', JSON.stringify(projName));
        this.$router.push("/projects/" + projName.Name);

      },
    },

    mounted() {
      this.user = JSON.parse(localStorage.getItem("user"));
      this.getProjects();

    }

  }
</script>


