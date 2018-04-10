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
        <v-toolbar color="teal" dark>
          <v-toolbar-title><h3 class="display-1">{{project.Name}} Discussion</h3></v-toolbar-title>
          <v-spacer></v-spacer>

        </v-toolbar>
        <v-container
          class="mt-2 scroll-y"
          style="max-height: 500px"
        >

          <div>
            <v-layout row>
              <v-flex xs12>
                <v-list three-line>
                  <v-list-tile
                    v-for="(item,index) in messages"
                    :key="`${index}`"
                    avatar
                  >
                    <v-list-tile-avatar class="hidden-xs-only">
                      <img src="/../../../static/youngAvatar.jpg" alt="">
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                      <v-list-tile-sub-title>~{{ item.username }}~</v-list-tile-sub-title>
                      <v-list-tile-sub-title class="hidden-sm-and-up">{{getTime(item.date) + " " + new Date(item.date).toDateString() }}</v-list-tile-sub-title>
                      <p class="body-2 multi-line">{{ item.text }}</p>
                    </v-list-tile-content>
                    <v-list-tile-action class="hidden-xs-only">
                      <v-list-tile-action-text>{{new Date(item.date).toDateString()}}</v-list-tile-action-text>
                      <v-list-tile-action-text>{{getTime(item.date)}}</v-list-tile-action-text>
                    </v-list-tile-action>
                  </v-list-tile>
                </v-list>
              </v-flex>
            </v-layout>
          </div>
        </v-container>
        <div class="layout row">
          <v-flex md11>
            <v-text-field
              ref="msg"
              color="teal"
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



  export default {

    data() {
      return {
        socket: '',
        localProject: JSON.parse(localStorage.getItem('project')),
        key: '',
        project: {},
        cUser: JSON.parse(localStorage.getItem('user')),
        date1: new Date(Date.now()).toISOString().slice(0, 10),
        events: [],

        textMessage: '',
        messages: []

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
            this.getMessages();
          })
          .catch((error) => {
            console.log(error);
          });
      },

      getMessages() {
        var messageArray = [];
        axios.post("http://localhost:3000/chats/getMessages",
          {
            key: this.key
          },
          {"headers": {'Content-Type': 'application/json'}})
          .then((response) => {
            console.log(response.data);
            for (var i in response.data) {
              if (response.data.hasOwnProperty(i)) {
                messageArray.push(response.data[i])
              }
            }
            this.messages = messageArray;
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

      getTime(dateString) {
        var d = new Date(dateString);
        if (d.getMinutes().toString().length === 1) {
          return d.getHours() + ":0" + d.getMinutes()
        }
        else {
          return d.getHours() + ":" + d.getMinutes()
        }

      },

      sendMessage() {
        this.socket.emit('chat', {
          msg: {username: this.cUser.Name, text: this.textMessage, date: new Date()},
          key: this.key
        });
        this.$refs.msg.focus();
        this.textMessage = "";


      },

      receiveMessages() {
        this.socket.on('message', (data) => {
          console.log(data);
          this.messages.push(data);
          return this.messages

        });
      },

      mobileCheck() {
        var check = false;
        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
        return check;
      }


    },

    mounted() {
      this.socket = io('http://localhost:3000');
      this.getProject();
//      this.getMessages();
      this.receiveMessages();

//      this.startConnection();


    },

    computed: {},

  }

</script>


