<template>
    <div>

        <div class="s02">
            <div class="container">
                <div class="jumbotron p-4 p-md-5 text-white rounded bg-dark">
                    <h1>Blog</h1>
                    <hr>
                    <form @submit.prevent="saveDeviceType(item)">
                        <form-input label="Title" :item="item" property="title" :errors="errors" @input="updateValue"></form-input>                        
                        <form-textarea label="Body" :item="item" property="mainbody" :errors="errors" @input="updateValue"></form-textarea>                        
                        <form-select label="Tags" :item="tags" property="tags" @input="updateArray" :errors="errors" :multiple="true"></form-select>
                        <button class="btn btn-outline-info float-right" type="submit">Save</button>
                    </form>
                </div>                
                <div class="jumbotron p-4 p-md-5 text-white rounded bg-dark">
                    <ul>
                        <li v-for="(item)  in items" :key="item.id">{{item.title}} 
                            <button type="button" class="btn btn-outline-warning mr-1" @click="remove(item.id)">Remove</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import FormInput from '../components/FormInput'
import FormSelect from '../components/FormSelect'
import FormTextarea from '../components/FormTextarea'
// import axios from '../../interceptor'

export default {
    components: { FormInput,FormTextarea,FormSelect },
    data() {
        return {
            item: {}
        }
    },
    props: {

    },
    computed: {
        ...mapGetters({
        items: 'blog/items',
        errors: 'blog/errors',
        tags: 'tags/items',
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
            getItems: 'blog/getItems',
            deviceTypeCreate: 'blog/create',
            removeItem: 'blog/remove',
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
            this.$store.commit('blog/UPDATE_ITEM', { [property]: [value] })
            console.log(property);
            console.log(value);
        },
        updateValue(property, value) {
            this.$store.commit('blog/UPDATE_ITEM', { [property]: value })
        },
        saveDeviceType() {
            // console.log(this.item.name)
            this.deviceTypeCreate()
                .then(() => {
                    this.$toastr.s('saved')
                    this.getItems()
                    this.items.push(this.item)
                    this.$router.push({ name: 'Blog' })
                })
                .catch(() => {})
        }
    }
}
</script>