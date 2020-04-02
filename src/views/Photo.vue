<template>
    <div>

        <div class="s02">
            <div class="container">
                <div class="jumbotron p-4 p-md-5 text-white rounded bg-dark">
                    <h1>Photo</h1>
                    <hr>
                    <form @submit.prevent="savephoto(item)">
                        <form-input label="Title" :item="item" property="title" :errors="errors" @input="updateValue"></form-input>                        
                         <picture-input 
                            ref="pictureInput"
                            width="300" 
                            height="300" 
                            margin="16" 
                            accept="image/jpeg,image/png,image/jpg" 
                            size="16" 
                            button-class="btn btn-outline-info"
                            :custom-strings="{
                                upload: '<h1>Bummer!</h1>',
                                drag: 'click, or drag a file here'
                            }"
                            @change="onChange">
                            </picture-input>
                            <!-- <a @click="attemptUpload" v-bind:class="{ disabled: !image }" class="btn btn-outline-info">
                            Upload
                            </a> -->
                        <form-select label="Tags" :item="tagsItems" property="tags" @input="updateArray" :errors="errors" :multiple="true"></form-select>
                        <button class="btn btn-outline-info float-right" type="submit">Save</button>
                    </form>
                </div>                
                <div class="jumbotron p-4 p-md-5 text-white rounded bg-dark">
                    <div class="row" v-for="(item)  in items" :key="item.id">
                        <span class="col-sm-3 text-left align-top">{{item.title}}</span><span class="col-sm-7 text-left">{{item.viewCount}}</span><span class="col-sm-2"><button type="button" class="btn btn-outline-warning mr-1" @click="remove(item.id)">Remove</button></span>
                    </div>
                    <!-- <ul>
                        <li v-for="(item)  in items" :key="item.id">{{item.title}} 
                            <button type="button" class="btn btn-outline-warning mr-1" @click="remove(item.id)">Remove</button>
                        </li>
                    </ul> -->
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
</style>
<script>
import { mapActions, mapGetters } from 'vuex'
import FormInput from '../components/FormInput'
import FormSelect from '../components/FormSelect'
import PictureInput from 'vue-picture-input'
// import FormTextarea from '../components/FormTextarea'
import axios from '../interceptor'

export default {
    components: { FormInput,FormSelect,PictureInput },
    data() {
        return {
            item: {},
            image: '',
            formData:{}
        }
    },
    props: {

    },
    computed: {
        ...mapGetters({
        items: 'photo/items',
        errors: 'photo/errors',
        tagsItems: 'tags/items',
        })
    },
    mounted() {
        this.getItems(),
        this.getTags()
    },
    beforeDestroy() {
        this.resetState()
        
    },
    methods: {
        ...mapActions({
            getItems: 'photo/getItems',
            photoCreate: 'photo/create',
            removeItem: 'photo/remove',
            getTags: 'tags/getItems'
        }),
        remove(id) {
            if (confirm('Are you sure?')) {
                this.removeItem(id).then(() => {
                this.getItems()
                this.$toastr.s('Successfully removed')
                })
            }
        },
        updateArray(property, value) {
            console.log(value)
            this.$store.commit('photo/UPDATE_ITEM', { [property]: [value] })
        },
        updateValue(property, value) {
            this.$store.commit('photo/UPDATE_ITEM', { [property]: value })
        },
        onChange () {
            console.log('New picture selected!')
            if (this.$refs.pictureInput.file) {
            this.image = this.$refs.pictureInput.file;
            } else {
            console.log("Old browser. No support for Filereader API");
            }
        },
        attemptUpload() {
            console.log(this.image);
             const formData = new FormData();
            formData.append('file', this.image);
            var url=process.env.VUE_APP_API_URL+'/api/media_objects'
            // this.formData=['file'=>['photo', this.image]];
            const config = {
                headers: {
                'content-type': 'multipart/form-data'
                }
            };
            axios.post(url, formData, config).then((response) => {
                this.image=response.data.contentUrl;
                this.$store.commit('photo/UPDATE_ITEM', { ['image']: this.image })
            });
            return false;
        },
        savephoto() {
            // console.log(this.item.name)
            console.log(this.tags);
                         const formData = new FormData();
            formData.append('file', this.image);
            var url=process.env.VUE_APP_API_URL+'/api/media_objects'
            // this.formData=['file'=>['photo', this.image]];
            const config = {
                headers: {
                'content-type': 'multipart/form-data'
                }
            };
            axios.post(url, formData, config).then((response) => {
                this.image=response.data.contentUrl;
                // alert(response.data.contentUrl)
                this.$store.commit('photo/UPDATE_ITEM', { ['image']: this.image })
                console.log(this.tags)
                // this.$store.commit('photo/UPDATE_ITEM', { ['tags']: [value] })
                this.$store.commit('photo/UPDATE_ITEM', { ['viewCount']: 0 })

                this.photoCreate()
                .then(() => {
                    this.$toastr.s('saved')
                    this.getItems()
                    this.items.push(this.item)
                    this.$router.push({ name: 'Photo' })
                })
                .catch(error => {
    alert(JSON.stringify(error))
                })
                
            });


            
        }
    }
}
</script>