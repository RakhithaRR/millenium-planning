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
                  <v-date-picker v-model="startDate" scrollable>
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

        description: "",
        startDate: null,
        endDate: null,
        menu1: false,
        menu2: false,
        modal: false,

      }
    },
    methods: {

    }
  }

</script>

