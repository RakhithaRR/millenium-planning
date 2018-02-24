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
    <v-flex mt-2 md8 xs12 offset-md2>
      <v-card hover tile v-for="(item,index) in projects" :key="`${index}`">
        <v-card-title primary-title>
          <div>
            <h2>{{item.Name}}</h2>
            <h4>{{item.Client}}</h4>
          </div>

        </v-card-title>
        <p>{{item}}</p>
      </v-card>
    </v-flex>
  </v-content>
</template>

<script>
  import axios from 'axios';
  export default {

    data () {
      return {
        projects: [],

      }
    },
    methods: {
      getProjects () {
        axios.get("http://localhost:3000/project/getProjects")
          .then((response) => {
            console.log(response.data);
            for(var i in response.data){
              if(response.data.hasOwnProperty(i)){
                var obj = response.data[i]
                this.projects.push(obj);
              }
            }
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

