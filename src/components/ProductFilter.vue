<template>
    <div>
      <label>
        <input type="checkbox" v-model="localShowInStock" @change="emitShowInStock" />
        Show In Stock Only
      </label>
    </div>
  </template>
  
  <script setup>
  import { ref, watch, defineProps, defineEmits } from 'vue'
  
  const props = defineProps({
    showInStock: {
      type: Boolean,
      required: true
    }
  })
  
  const emit = defineEmits(['updateShowInStock'])
  
  const localShowInStock = ref(props.showInStock)
  
  watch(() => props.showInStock, (newVal) => {
    localShowInStock.value = newVal
  })
  
  const emitShowInStock = () => {
    emit('updateShowInStock', localShowInStock.value)
  }
  </script>
  