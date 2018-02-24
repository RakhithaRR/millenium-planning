<template>
  <v-app>

    <v-navigation-drawer
      temporary
      absolute
      v-model="sideNav">
      <v-list>
        <v-list-tile
          v-for="item in toolbarItems"
          :key="item.title"
          router
          :to="item.link"
        >
          <v-list-tile-action>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{item.title}}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile
          v-show="signedIn"
          @click="logout"
        >
          <v-list-tile-action>
            <v-icon>mdi-logout</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Logout</v-list-tile-content>
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
        <v-btn
          v-show="signedIn"
          @click="logout"
        >
          <v-icon>mdi-logout</v-icon>
          Logout
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
  import axios from 'axios';
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
        {title: "Search Projects", icon: "mdi-file-find"},
        {title: "Login", icon: "mdi-login-variant", link: "/login"},
        {title: "Profile", icon: "", link: "/profile"},
        {title: "Add Project", icon: "", link: "/addproject"}
      ];

      if(localStorage.getItem("user")){
        var user = JSON.parse(localStorage.getItem('user'));
        console.log(user);
        if(user.Type === "Admin"){
          toolbarItems = [
            {title: "Register", icon: "mdi-account-plus", link:"/register"},
            {title: "Search Projects", icon: "mdi-file-find"},
            {title: "Add Project", icon: "mdi-chart-gantt", link: "/addproject"},
            {title: user.Name.split(" ")[0], icon: "mdi-account-key", link: "/profile/"+user.Username},
//            {title: "Login", icon: "mdi-login-variant", link: "/login"},
          ]
        }
        else if(user.Type === "Normal User"){
          toolbarItems = [
//            {title: "Register", icon: "mdi-account-plus", link:"/register"},
            {title: "Search Projects", icon: "mdi-file-find"},
            {title: user.Name.split(" ")[0], icon: "mdi-account", link: "/profile/"+user.Username},
//            {title: "Login", icon: "mdi-login-variant", link: "/login"},
          ]
        }
      }
      else{
        toolbarItems = [
//            {title: "Register", icon: "mdi-account-plus", link:"/register"},
//            {title: "View Projects", icon: "mdi-file-find"},
          {title: "Login", icon: "mdi-login-variant", link: "/login"},
        ]
      }


      return toolbarItems;
    },

    signedIn(){
      if(localStorage.getItem("token")){
        return true
      }
      else{
        return false
      }
    }
  },

  methods: {
    logout() {
      localStorage.setItem("token",null);
      localStorage.clear();
      axios.post('http://localhost:3000/users/logout',{headers: {'Content-Type': 'application/json'}})
        .then((response) =>{
        console.log("Logged out");
        })
        .catch((err) => {
          console.log(err);
        });
      this.$router.push('/');
      location.reload();
    }
  },

}
</script>

<style>
  /*@import "./stylus/main.styl"*/
</style>
