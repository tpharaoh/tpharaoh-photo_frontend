<template>
  <div class="text-center">
    <form class="form-signin" @submit.prevent>
      <h1 class="h3 mb-3 font-weight-normal">Sign in</h1>

      <label for="email" class="sr-only">Email address</label>
      <input
        id="email"
        v-model="credentials.email"
        type="text"
        class="form-control mb-1"
        placeholder="email"
        required
        autofocus
      />

      <label for="password" class="sr-only">Password</label>
      <input
        id="password"
        v-model="credentials.password"
        type="password"
        class="form-control mb-3"
        placeholder="password"
      />

      <div v-if="error" class="invalid">
        {{ error }}
      </div>

      <button class="btn btn-lg btn-primary btn-block mb-3" type="submit" v-on:click="signIn">
        Sign in
      </button>

      <!-- <p>
        Don't have account yet?
        <router-link :to="{ name: 'Register' }">Sign up</router-link>
      </p> -->
    </form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      credentials: {
        email: '',
        password: ''
      }
    }
  },
  computed: {
    error() {
      return this.$store.getters['auth/error']
    }
  },
  methods: {
    signIn() {
        this.$store
        .dispatch('auth/login', this.credentials)
        .then(() => {
                this.$toastr.s('You are successfully logged in')
                this.$router.push({ name: 'About' })
        })
        .catch(() => {
            // this.$toastr.e('You are successfully logged in')
          this.$toastr.e('Please check the form')
          // this.$router.push({ name: 'Login' })
    
        })
    }
  }
}
</script>

<style>
.text-center {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 80px 0;
}
</style>