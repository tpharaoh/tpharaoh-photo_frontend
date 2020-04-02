<template>
    <div>
        <header-template></header-template>
        Portfolio
        <div class="container">
        <div class="row">
            <div class="col-xs-4 m-4" v-for="(p) in photo" :key="p.id">
                <div class="card" style="width: 18rem;">
                <a :href="'/show/'+p.id"><img class="card-img-top" :src="baseUrl+'/thumb'+p.image" alt="Card image cap"></a>
                <div class="card-body">
                    <p class="card-text">{{p.title}}</p>
                </div>
                </div>
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
            photo: {},
            baseUrl:process.env.VUE_APP_API_URL

        }
  },
  components: {
    HeaderTemplate,
 
  },
  mounted() {
      this.getPictures()
  },
  methods: {
      getPictures() {
          var url=''
          var pictureData=this
          if(this.$route.query.tag)
          {
            url=process.env.VUE_APP_API_URL+'/api/tags?name='+this.$route.query.tag
            console.log(url)
            axios.get(url).then((response) => {
                // console.log(response.data['hydra:member'])
                pictureData.photo=response.data['hydra:member'][0].photo;
            })
            return true
          }
          
          url=process.env.VUE_APP_API_URL+'/api/photos'
          axios.get(url).then((response) => {
            pictureData.photo=response.data['hydra:member'];
          })
      }
  }
}
</script>