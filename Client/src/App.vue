<template>
  <v-app>
    <v-navigation-drawer
      temporary
      absolute
      v-model="sideNav">
      <v-list>
        <v-list-tile v-for="item in toolbarItems"
                     :key="item.title">
          <v-list-tile-action>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{item.title}}</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar dark color="dark">
      <v-toolbar-side-icon
        @click.native="sideNav = !sideNav"
        class="hidden-sm-and-up"
      ></v-toolbar-side-icon>
      <v-toolbar-title>
        <v-icon>mdi-chart-areaspline</v-icon>
        <router-link to="/" tag="span" style="cursor: pointer">{{title}}</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat v-for="item in toolbarItems"
               :key="item.title"
               router
               :to="item.link"
        >
          <v-icon left>{{item.icon}}</v-icon>
          {{item.title}}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <main>
      <router-view></router-view>
    </main>
    <v-footer>
      <span>{{new Date().getFullYear()}}</span>
      <v-spacer></v-spacer>
      <span> © Rakhitha Ranathunge</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      title: "Millennium Planning",
      sideNav: false
    }
  },

  computed: {
    toolbarItems() {
      let toolbarItems = [
        {title: "Register", icon: "mdi-account-plus", link:"/register"},
        {title: "View Projects", icon: "mdi-file-find"},
        {title: "Login", icon: "mdi-login-variant"}
      ];
      return toolbarItems;
    }
  }
}
</script>

<style>
  /*@import "./stylus/main.styl"*/
</style>
