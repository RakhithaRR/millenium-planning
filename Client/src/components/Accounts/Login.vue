<template>
  <v-content>
    <v-flex mt-5 md4 xs-12 offset-md4>

      <v-alert color="error" icon="warning" value="true" transition="scale-transition" v-show="failCond">
        {{successMessage}}
      </v-alert>

      <v-card style="padding: 50px">
        <v-card-title primary-title class="layout justify-center">
          <div class="headline text-xs-center"><b>Login</b></div>
        </v-card-title>
        <v-form v-model="valid">
          <v-text-field
            label="Email"
            v-model="email"
            :rules="emailRules"
            required
          ></v-text-field>

          <v-text-field
            label="Enter your password"
            v-model="password"
            :rules="passRules"
            :append-icon="pass1 ? 'visibility' : 'visibility_off'"
            :append-icon-cb="() => (pass1 = !pass1)"
            :type="pass1 ? 'password' : 'text'"
            counter
            required
          ></v-text-field>
        </v-form>
        <div class="layout justify-center">
          <v-btn
            dark
            @click="login"
          >Login</v-btn>
        </div>
        <div class="layout justify-center" v-show="progress">
          <v-progress-linear v-bind:indeterminate="true" color="black"></v-progress-linear>
        </div>
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
        pass1: true,

        email: '',
        emailRules: [
          (v) => !!v || 'E-mail is required',
          (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
        ],

        password: '',
        passRules: [
          (v) => !!v || 'Password is required',
        ],

        failCond: false,
        successMessage: '',
        progress: false,
      }
    },

    methods: {
      login() {
        this.failCond = false;
        this.progress = true;
        axios.post('http://localhost:3000/users/login',{
          email: this.email,
          password: this.password
        }, {headers: {'Content-Type': 'application/json'}})
          .then((response) => {
            if(response.data.success){
              this.progress = false;
              console.log(response.data.message);
              console.log(response.data.user);
              localStorage.setItem("token",response.data.token);
              this.$router.push('/');
//              location.reload();
            }
            else{
              this.failCond = true;
              this.progress = false;
              this.successMessage = response.data.message;
            }
          })
          .catch((err) => {
            this.progress = false;
            console.log(err);
          })
      }
    }

  }
</script>
