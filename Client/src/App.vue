<template>
  <v-app>
    <v-toolbar dark color="green darken-4">
      <v-toolbar-title>{{title}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat v-for="item in toolbarItems"
               :key="item.title">
          {{item.title}}
          <v-icon right></v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      title: "Millenium Planning"
    }
  },

  computed: {
    toolbarItems() {
      let toolbarItems = [
        {title: "Register"},
        {title: "View Projects"},
        {title: "Login"}
      ];
      return toolbarItems;
    }
  }
}
</script>

<style>
  /*@import "./stylus/main.styl"*/
</style>
