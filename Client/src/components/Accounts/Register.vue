<template>
  <v-content>
    <v-flex mt-2 md5 xs-12 offset-md3>
      <v-card style="padding: 50px">
        <v-card-title primary-title class="layout justify-center">
          <div class="headline text-xs-center"><b>SignUp with Millennium Planning</b></div>
        </v-card-title>
        <v-form v-model="valid">
          <v-text-field
            label="Name"
            v-model="name"
            :rules="nameRules"
            :counter="10"
            required
          ></v-text-field>
          <v-text-field
            label="E-mail"
            v-model="email"
            :rules="emailRules"
            required
          ></v-text-field>
        </v-form>
      </v-card>
    </v-flex>

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
