<template>
<div>
  <header-template></header-template>
          <!-- Page Preloder -->
        <!-- <div id="preloder">
                <div class="loader"></div>
        </div> -->

        <!-- Header section  -->
        
        <div class="clearfix"></div>
        <div class="hero-section">
                <!-- <div class="hero-slider"> -->
                  <!-- <carousel :autoplay="true"  v-if="items.length>0" items="6">
                    <a :href="'/show/'+photo.id" v-for="(photo) in items" :key="photo.id">
                      <img :src="'https://127.0.0.1:8001/thumb'+photo.image" width="240" class="" />
                    </a>
                  </carousel> -->
                   
                <!-- </div> -->
        </div>
        <!-- {{tags}} -->
        <div v-for="(tag) in tags" :key="tag.id">
          <div v-if="tag.photo.length>0">
          <h2>{{tag.name}}</h2>
          <!-- <div class="jumbotron jumbotron-fluid" role="alert"><h2>{{tag.name}}</h2></div> -->
          <div class="d-sm-block d-none">
              <carousel :autoplay="true" items="6">
                        <a :href="'/show/'+photo.id" v-for="(photo) in tag.photo" :key="photo.id">
                          <img :src="baseUrl+'/thumb'+photo.image" width="240" class="" />
                        </a>
                      </carousel>
          </div>
          <div class="d-block d-md-none">
              <carousel :autoplay="true" items="1">
                        <a :href="'/show/'+photo.id" v-for="(photo) in tag.photo" :key="photo.id">
                          <img :src="baseUrl+'/thumb'+photo.image" width="240" class="" />
                        </a>
                      </carousel>
          </div>
          </div>
        </div>
        <div class="hero-social-links">
                        <a href=""><i class="fa fa-pinterest"></i></a>
                        <a href=""><i class="fa fa-facebook"></i></a>
                        <a href=""><i class="fa fa-twitter"></i></a>
        </div>
         <!-- Intro section   -->

        <section class="intro-section jumbotron">
                <div class="intro-warp">
                        <div class="container-fluid">
                                <div class="row">
                                        <div class="col-xl-6 col-lg-7 p-0">
                                                <div class="intro-text">
                                                        <h2>My name is Hanna. I’m a photographer</h2>
                                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis commodo viverra maecenas. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.</p>
                                                        <a href="/portfolio" class="sp-link">Take a look @my portfolio</a>
                                                </div>
                                        </div>
                                        <div class="col-xl-6 col-lg-5 p-0">
                                                <div class="skill-warp">
                                                        
                                                        <div class="single-progress-item" v-for="(tag) in tags" :key="tag.id">
                                                                <h1 class="display-4">{{tag.name}}</h1>
                                                                <!-- <div class="progress-bar-style" data-progress="75"></div> -->
                                                                <p><a :href="'/portfolio?tag='+tag.name" class="btn btn-outline-secondary">View Portfolio</a> <a :href="'/viewBlog?tag='+tag.name" class="btn btn-outline-secondary">View Blog</a></p>
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                        </div>
                </div>
        </section>
        <!-- Intro section end  -->


</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import axios from 'axios'
import HeaderTemplate from '../components/HeaderTemplate'
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import carousel from 'vue-owl-carousel'
export default {
  name: 'Home',
  components: {
    HeaderTemplate,
    carousel
  },
  data() {
        return {
            photos: {},
            loaded: false,
            tags: {},
            baseUrl:process.env.VUE_APP_API_URL
        }
    },
  computed: {   
      ...mapGetters({
        // items: 'photo/items',
        tags: function() {
          
        }
      })     
    },
    mounted() {
        // this.getItems()
        this.getTags()
        this.loaded = true;
        console.log(this.$store.state.general.isLoading);
    },
    methods: {
        ...mapActions({
            getItems: 'photo/getItems'
        }),
        getTags() {
          var tagsInternal=this;
          var url=process.env.VUE_APP_API_URL+'/api/tags'
          axios.get(url).then((response) => {
          console.log(response.data['hydra:member']);
          tagsInternal.tags=response.data['hydra:member']
          this.loaded = true;
          });
        },
        getPhotos() {
          var url=process.env.VUE_APP_API_URL+'/api/photos'
          axios.get(url).then((response) => {
          console.log(response.data);
          this.loaded = true;
          });
        }
    }

}
</script>
