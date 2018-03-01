<template>
  <v-content>
    <v-flex mt-2 md8 xs12 offset-md2>
      <v-card>
        <div class="layout justify-center">
          <h1>{{project.Name}}</h1>
        </div>
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
      }
    },

    mounted() {
      this.getProject();
    },

    computed: {}
  }

</script>


