<template>
    <div>

        <div class="s02">
            <div class="container">
                <div class="jumbotron p-4 p-md-5 text-white rounded bg-dark">
                    <h1>Tag</h1>
                    <hr>
                    <form @submit.prevent="saveDeviceType(item)">
                        <form-input label="Name" :item="item" property="name" :errors="errors" @input="updateValue"></form-input>                        
                        <button class="btn btn-outline-info float-right" type="submit">Save</button>
                    </form>
                </div>                
                <div class="jumbotron p-4 p-md-5 text-white rounded bg-dark">
                    <ul>
                        <li v-for="(item)  in items" :key="item.id">{{item.name}} 
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
// import axios from '../../interceptor'

export default {
    components: { FormInput },
    data() {
        return {
            item: {}
        }
    },
    props: {

    },
    computed: {
        ...mapGetters({
        items: 'tags/items',
        errors: 'tags/errors'
        })
    },
    mounted() {
        this.getItems()
    },
    beforeDestroy() {
        this.resetState()
    },
    methods: {
        ...mapActions({
            getItems: 'tags/getItems',
            deviceTypeCreate: 'tags/create',
            removeItem: 'tags/remove'
        }),
        remove(id) {
            if (confirm('Are you sure?')) {
                this.removeItem(id).then(() => {
                this.getItems()
                this.$toastr.s('Successfully removed')
                })
            }
        },
        updateValue(property, value) {
            this.$store.commit('tags/UPDATE_ITEM', { [property]: value })
        },
        saveDeviceType() {
            // console.log(this.item.name)
            this.deviceTypeCreate()
                .then(() => {
                    this.$toastr.s('saved')
                    this.getItems()
                    this.items.push(this.item)
                    this.$router.push({ name: 'Tag' })
                })
                .catch(() => {})
        }
    }
}
</script>