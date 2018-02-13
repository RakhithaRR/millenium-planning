<template>
  <v-content>
    <v-flex mt-5 md10 xs-12 offset-md1>

      <v-tabs centered grow>
        <v-tabs-bar class="black" dark>
          <v-tabs-slider class="red"></v-tabs-slider>
          <v-tabs-item href="profile">
            Profile Details
          </v-tabs-item>
          <v-tabs-item href="projects">
            Projects
          </v-tabs-item>
        </v-tabs-bar>
        <v-tabs-items>
          <v-tabs-content id="profile">
            <v-card flat>
              <v-card-title class="layout justify-center">
                <h2 class="display-1"><b>User Details</b></h2>
              </v-card-title>
              <v-card-text>
                <h4 class="headline">User Type: {{user.Type}}</h4>
              </v-card-text>
            </v-card>
          </v-tabs-content>
          <v-tabs-content id="projects">
            <v-card flat>
              <v-card-text>Project details</v-card-text>
            </v-card>
          </v-tabs-content>
        </v-tabs-items>
      </v-tabs>

    </v-flex>
  </v-content>
</template>

<script>
  import axios from 'axios';
  export default {
    data () {
      return {
        user : {},


      }
    },

    methods: {

    },

    mounted() {
      this.user = JSON.parse(localStorage.getItem("user"));
    }

  }
</script>
