<template>
  <v-content>
    <v-flex mt-2 md4 xs-12 offset-md4>

      <v-alert color="success" icon="check_circle" value="true" transition="scale-transition" v-show="successCond">
        {{successMessage}}
      </v-alert>

      <v-alert color="error" icon="warning" value="true" transition="scale-transition" v-show="failCond">
        {{successMessage}}
      </v-alert>

      <v-card style="padding: 50px">
        <v-card-title primary-title class="layout justify-center">
          <div class="headline text-xs-center"><b>SignUp with Millennium Planning</b></div>
        </v-card-title>
        <v-form v-model="valid" ref="regForm">
          <v-select
            label="User Type"
            single-line
            v-bind:items="types"
            v-model="type"
            bottom
            required
          ></v-select>

          <v-text-field
            label="Name"
            v-model="name"
            :rules="nameRules"
            required
          ></v-text-field>

          <v-text-field
            label="User Name"
            v-model="userName"
            :rules="usernameRules"
            required
          ></v-text-field>

          <v-text-field
            label="E-mail"
            v-model="email"
            :rules="emailRules"
            required
          ></v-text-field>

          <v-text-field
            label="Designation"
            v-model="designation"
            :rules="desigRules"
            required
          ></v-text-field>

          <v-select
            label="Department"
            single-line
            v-bind:items="departments"
            v-model="department"
            bottom
            required
          ></v-select>

          <v-text-field
            label="Enter your password"
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
            label="Confirm the password"
            v-model="cPassword"
            :rules="cRules"
            min="8"
            :append-icon="pass2 ? 'visibility' : 'visibility_off'"
            :append-icon-cb="() => (pass2 = !pass2)"
            :type="pass2 ? 'password' : 'text'"
            required
          ></v-text-field>

          <div>
            <v-btn
              dark
              @click="submit"
              :disabled="!valid"
            >Submit
            </v-btn>
            <v-btn
              dark
              v-on:click="clear"
            >Clear
            </v-btn>
          </div>
          <div class="layout justify-center" v-show="progress">
            <v-progress-linear v-bind:indeterminate="true" color="black"></v-progress-linear>
          </div>
        </v-form>
      </v-card>
    </v-flex>

  </v-content>
</template>

<script>
  import axios from 'axios';

  export default {

    data() {
      return {
        valid: false,
        pass1: true,
        pass2: true,
        password: '',
        passRules: [
          (v) => !!v || 'Password is required',
        ],

        cPassword: '',
        cRules: [
          () => !!this.cPassword || 'Please confirm the password above',
          () => this.cPassword === this.password || 'Entered passwords do not match'
        ],

        name: '',
        nameRules: [
          (v) => !!v || 'Name is required',
        ],

        userName: '',
        usernameRules: [
          (v) => !!v || 'User Name is required',
        ],

        email: '',
        emailRules: [
          (v) => !!v || 'E-mail is required',
          (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
        ],

        designation: '',
        desigRules: [
          (v) => !!v || 'Designation is required',
        ],

        department: '',
        departments: ['Human Resources', 'Information Technology', 'Management'],

        type: '',
        types: ['Admin', 'Normal User'],

        successMessage: '',
        successCond: false,
        failCond: false,
        progress: false,

      }
    },
    methods: {
      submit() {
        this.progress = true;
        axios.post('http://localhost:3000/users/register', {
          type: this.type,
          name: this.name,
          userName: this.userName,
          email: this.email,
          designation: this.designation,
          department: this.department,
          password: this.password
        }, {headers: {'Content-Type': 'application/json'}})
          .then((response) => {
            if (response.data.success) {
              this.successMessage = "User registered successfully";
              this.successCond = true;
              this.failCond = false;
              this.progress = false;
              setTimeout(() => {
                this.$router.push('/');
              }, 2000);

            }
            else {
              this.successMessage = response.data.message;
              this.progress = false;
              this.failCond = true;
              this.successCond = false;
            }

            console.log(response.data.message);
          }).catch((error) => {
          console.log("Error: " + error);
          this.progress = false;
        });
      },

      clear() {
        this.progress = false;
        this.$refs.regForm.reset();
        this.successCond = false;
        this.existCond = false;
        this.failCond = false;
      }
    }
  }

</script>

<!--v-bind:items=""-->
<!--v-model=""-->

<!--<v-text-field-->
<!--label="NIC"-->
<!--placeholder="951234567V"-->
<!--v-model="nic"-->
<!--:rules="nicRules"-->
<!--required-->
<!--&gt;</v-text-field>-->
<!--nic: '',-->
<!--nicRules: [-->
<!--(v) => !!v || 'NIC is required',-->
<!--(v) => /^[0-9]{9}[V]$/.test(v) || "NIC must be of valid format"-->
<!--],-->
