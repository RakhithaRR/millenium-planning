<template>
  <v-content>
    <section>
      <v-parallax src="/../../static/cover_mp_3.jpg" height="750">
        <v-layout
          column
          align-center
          justify-center
          class="white--text"
        >
          <!--<img src="assets/vuetify.png" alt="Vuetify.js" height="200">-->
          <h1 id='mainh' class="white--text mb-2 display-3 text-xs-center">Millennium Planning</h1>
          <div class="subheading mb-3 text-xs-center">Easily plan, schedule, and track your projects.</div>
          <v-btn
            class="dark mt-5"
            dark
            large
            router
            :to="'/login'"
          >
            Get Started
          </v-btn>
        </v-layout>
      </v-parallax>
    </section>

    <section>
      <v-layout
        column
        wrap
        class="my-5"
        align-center
      >
        <v-flex xs12 sm4 class="my-3">
          <div class="text-xs-center">
            <h2 class="headline">Say hello to the future of project planning.</h2>
          </div>
        </v-flex>
        <v-flex xs12>
          <v-container grid-list-xl>
            <v-layout row wrap align-center>
              <v-flex xs12 md4>
                <v-card class="elevation-0 transparent" height="320px">
                  <v-card-text class="text-xs-center">
                    <v-icon x-large class="blue--text text--lighten-2">mdi-timetable</v-icon>
                  </v-card-text>
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline text-xs-center">Schedule Work</div>
                  </v-card-title>
                  <v-card-text class="text-xs-center">
                    Create projects and distribute the tasks among the co-workers.
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs12 md4>
                <v-card class="elevation-0 transparent" height="320px">
                  <v-card-text class="text-xs-center">
                    <v-icon x-large class="blue--text text--lighten-2">mdi-chart-timeline</v-icon>
                  </v-card-text>
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline">Track Progress</div>
                  </v-card-title>
                  <v-card-text class="text-xs-center">
                    Check how others are doing the project work.
                    Now you can easily keep track of all the tasks and identify whether all the deadlines are met or not.
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs12 md4>
                <v-card class="elevation-0 transparent" height="320px">
                  <v-card-text class="text-xs-center">
                    <v-icon x-large class="blue--text text--lighten-2">mdi-message-text-outline</v-icon>
                  </v-card-text>
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline text-xs-center">Communicate with Co-workers</div>
                  </v-card-title>
                  <v-card-text class="text-xs-center">
                    Collaboration has never been easier.
                    Now you can communicate with others in the project to clarify any issues.
                    Exchange insights and make sure everyone is meeting their deadlines.
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
      </v-layout>
    </section>
  </v-content>
</template>

<script>
  export default {

    data () {
      return {
      }
    }
  }

</script>

<style scoped>
</style>
