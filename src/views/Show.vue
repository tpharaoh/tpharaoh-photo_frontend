<template>
<div>
          <!-- Page Preloder -->
        <!-- <div id="preloder">
                <div class="loader"></div>
        </div> -->

        <!-- Header section  -->
        <header-template></header-template>
        <div class="clearfix"></div>
        <div class="container">        
        <div class="hero-social-links">
                        <a href=""><i class="fa fa-pinterest"></i></a>
                        <a href=""><i class="fa fa-facebook"></i></a>
                        <a href=""><i class="fa fa-twitter"></i></a>
        </div>
         <!-- Intro section   -->
        <section class="intro-section">
                <div class="intro-warp">
                        <div class="container-fluid">
                                <div class="row">
                                        <div class="col-xl-6 col-lg-7 p-0">
                                                <div class="intro-text">
                                                        <h2>{{item.title}} {{viewCount}}</h2>
                                                        <p><img :src="baseUrl+item.image" /></p>
                                                        <a href="/portfolio" class="sp-link">Take a look @my portfolio</a>
                                                </div>
                                        </div>
                                        <div class="col-xl-6 col-lg-5 p-0">
                                                <div class="skill-warp">
                                                        <div class="single-progress-item">
                                                                <div class="progress-bar-style" data-progress="75"></div>
                                                                <p>Nature</p>
                                                        </div>
                                                        <div class="single-progress-item">
                                                                <div class="progress-bar-style" data-progress="100"></div>
                                                                <p>Passion</p>
                                                        </div>
                                                        <div class="single-progress-item">
                                                                <div class="progress-bar-style" data-progress="90"></div>
                                                                <p>Portraits</p>
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                        </div>
                
                </div>
        </section>
        <!-- Intro section end  -->
</div>

</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import axios from 'axios'
import HeaderTemplate from '../components/HeaderTemplate'
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
// import carousel from 'vue-owl-carousel'
export default {
  name: 'Home',
  components: {
      HeaderTemplate
    // HelloWorld
    // carousel
  },
  data() {
        return {
                baseUrl:process.env.VUE_APP_API_URL
        }
    },
  computed: {   
      ...mapGetters({
        item: 'photo/item',
      }),
      viewCount(){
        return this.item.viewCount+1
      }    
    },
    mounted() {
        this.getItem(this.$route.params.id)
        // var viewCount = this.item.viewCount+1
        // console.log(this.item.viewCount+1)
        // this.$store.commit('photo/UPDATE_ITEM', { ['id']: this.$route.params.id })
        // this.$store.commit('photo/UPDATE_ITEM', { ['viewCount']: parseInt(this.viewCount) })
        // this.update()
        axios.get(process.env.VUE_APP_API_URL+'/api/photos/'+this.$route.params.id+'/viewCounter')
    },
    methods: {
        ...mapActions({
            getItem: 'photo/getItem',
            update: 'photo/update'
        }),
    }

}
</script>
