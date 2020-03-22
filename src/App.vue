<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> | 
      <nav v-if="username">
      <router-link to="/photo">Photo</router-link> | 
      <router-link to="/blog">Blog</router-link> | 
      <router-link to="/tag">Tag</router-link> | 
      </nav>
     <a class="btn btn-outline-primary" href="#" @click.prevent="SignOut" v-if="username">{{username}} Logout</a>
      <router-link to="/login" class="btn btn-outline-primary" v-if="!username">Login</router-link>

    </div>
    <router-view/>
    <loader />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<script>
import Loader from './components/Loader'
export default {
  name: 'App',
  components: { Loader },
  computed: {
    jwt() {
      if(!this.$store.getters['auth/jwtDecoded']) return {};
      return this.$store.getters['auth/jwtDecoded']
    },
    username() {
      return this.jwt.username
    },
    team() {
      return this.jwt.team
    }
  },
  methods: {
    SignOut() {
      this.$store.dispatch('auth/logout')
      this.$router.push('Login')
    }
  }
}
</script>