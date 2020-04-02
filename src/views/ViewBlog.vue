<template>
    <div>
        <header-template></header-template>
        View
        <div class="container">
        <div class="card mt-5" v-for="(blog) in blogs" :key="blog.id">
            <div class="card-header">
            </div>
            <div class="card-body">
                <!-- <h5 class="card-title">Special title treatment</h5> -->
                <p class="card-text" v-html="blog.mainbody"></p>
                <a :href="'/portfolio?tag='+$route.query.tag" class="btn btn-primary" v-if="$route.query.tag">Go to {{$route.query.tag}} portfolio</a>
                <a href="/portfolio" class="btn btn-primary" v-if="!$route.query.tag">Go to {{$route.query.tag}} portfolio</a>
            </div>
        </div>

        </div>
    </div>
</template>


<script>
// import { mapActions, mapGetters } from 'vuex'
import axios from 'axios'
import HeaderTemplate from '../components/HeaderTemplate'

export default {
  name: 'Home',
  data() {
        return {
            blogs: {}
        }
  },
  components: {
    HeaderTemplate,
 
  },
  mounted() {
      this.getBlogs()
  },
  methods: {
      getBlogs() {
          var url=''
          var blogData=this
          if(this.$route.query.tag)
          {
            url=process.env.VUE_APP_API_URL+'/api/tags?name='+this.$route.query.tag
            console.log(url)
            axios.get(url).then((response) => {
                console.log('ok')
                blogData.blogs=response.data['hydra:member'][0].blogs;
            })
            return true
          }
          console.log(this.$route.query.tag)
          url=process.env.VUE_APP_API_URL+'/api/blogs'
          console.log(url)
          axios.get(url).then((response) => {
            blogData.blogs=response.data['hydra:member'];
          console.log(response.data['hydra:member']);
          })
      }
  }
}
</script>