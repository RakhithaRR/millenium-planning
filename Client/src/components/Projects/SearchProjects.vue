<template>
  <v-content>
    <v-flex mt-2 md4 xs12 offset-md4>
      <div class="search-wrapper">
        <v-text-field
          name="search"
          label="Search for Projects"
          hint="Enter the project name or Client name to search"
          prepend-icon="search"
          id="testing"
        ></v-text-field>
      </div>
    </v-flex>
    <v-flex mt-2 md6 xs12 offset-md3>
      <v-card >
        <p>Hello</p>
      </v-card>
    </v-flex>
  </v-content>
</template>

<script>
  import axios from 'axios';
  export default {

    data () {
      return {

      }
    },
    methods: {
      getProjects () {
        axios.get("http://localhost:3000/project/getProjects")
          .then((response) => {
            console.log("wew");
            console.log(response.data);
          })
          .catch((error) => {
            console.log(error);
          })
      }
    },

    mounted () {
      this.getProjects();
    }
  }

</script>

