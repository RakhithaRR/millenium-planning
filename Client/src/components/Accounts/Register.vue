<template>
  <v-content>
    <v-flex mt-2 md4 xs-12 offset-md4>
      <v-card style="padding: 50px">
        <v-card-title primary-title class="layout justify-center">
          <div class="headline text-xs-center"><b>SignUp with Millennium Planning</b></div>
        </v-card-title>
        <v-form v-model="valid" ref="regForm">
          <v-text-field
            label="Name"
            v-model="name"
            :rules="nameRules"
            required
          ></v-text-field>
          <v-text-field
            label="NIC"
            placeholder="951234567V"
            v-model="nic"
            :rules="nicRules"
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
            bottom
            required
          ></v-select>
          <v-text-field
            label="Enter your password"
            hint="At least 8 characters"
            v-model="password"
            min="8"
            :append-icon="pass1 ? 'visibility' : 'visibility_off'"
            :append-icon-cb="() => (pass1 = !pass1)"
            :type="pass1 ? 'password' : 'text'"
            counter
          ></v-text-field>
          <v-text-field
            label="Confirm the password"
            v-model="cPassword"
            min="8"
            :append-icon="pass2 ? 'visibility' : 'visibility_off'"
            :append-icon-cb="() => (pass2 = !pass2)"
            :type="pass2 ? 'password' : 'text'"
            counter
          ></v-text-field>
          <div>
            <v-btn dark>Submit</v-btn>
            <v-btn
              dark
              v-on:click="reset"
            >Clear</v-btn>
          </div>
        </v-form>
      </v-card>
    </v-flex>

  </v-content>
</template>

<script>
  export default {

    data () {
      return {
        pass1: true,
        pass2: true,
        password: '',
        cPassword: '',

        name: '',
        nameRules: [
          (v) => !!v || 'Name is required',
        ],
        nic: '',
        nicRules: [
          (v) => !!v || 'NIC is required',
          (v) => /^[0-9]{9}[V]$/.test(v) || "NIC must be of valid format"
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
      }
    },
    methods: {
      reset () {
        this.$refs.regForm.reset();
      }
    }
  }

</script>

<!--v-bind:items=""-->
<!--v-model=""-->
