<template>

<header style="height:100px">
  
  <div class="navbar navbar-dark bg-dark shadow-sm">
    <div class="container d-flex justify-content-between">
      <a href="/" class="navbar-brand d-flex align-items-center">
        <img src="/hanna_lesvos4.png" width="200" alt="logo">
        <!-- <strong>Album</strong> -->
      </a>
      <div class="d-none d-lg-block d-xl-block">
      <a href="/">Home</a> | <a href="/viewBlog">Blog</a> | <a href="/portfolio">Portfolio</a> | </div>
<a href="/login" class="search-btn" v-if="!username"><i class="fa fa-user"></i></a>
                             <a class="btn btn-outline-primary"  href="#" @click.prevent="SignOut" v-if="username">{{username}} Logout</a>
    </div>
  </div>
</header>

</template>

<script>
export default {
  name: 'App',
  computed: {
    jwt() {
      if(!this.$store.getters['auth/jwtDecoded']) return {};
      return this.$store.getters['auth/jwtDecoded']
    },
    username() {
      return this.jwt.username
    },
  },
}
</script>
