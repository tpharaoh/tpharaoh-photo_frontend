<template>
  <div>
    <label :for="property" class="sr-only">{{ label }}</label>
    <select :id="property" class="form-control mb-1" @blur="$emit('input', property, $event.target.value)">
    <option disabled selected>Select {{property}}</option>
    <option v-for="(tag) in item" :key="tag.id"
      :value="'/api/tags/'+tag['id']"
      type="text"
      class="form-control mb-1"
      :placeholder="label"
    >{{tag.name}}</option>
    </select>
    <div v-if="isInvalid(property)" class="invalid">
      {{ errors[property] }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormSelect',
  props: {
    label: {
      type: String,
      required: true
    },
    item: {
      type: Object,
      required: true
    },
    tags: {
      type: Array,
      required: true
    },
    property: {
      type: String,
      required: true
    },
    errors: {
      type: Object,
      required: true
    }
  },
  methods: {
    isInvalid(property) {
      return Object.keys(this.errors).length > 0 && this.errors[property]
    }
  }
}
</script>