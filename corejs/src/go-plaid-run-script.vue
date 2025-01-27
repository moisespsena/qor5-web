<script setup lang="ts">
import { isProxy, isReactive, isRef, onMounted, ref } from 'vue'

const props = defineProps({
  script: {
    type: Function,
    required: true
  }
})

onMounted(() => {
  props.script({ isProxy, isReactive, isRef, ref })
})
</script>

<template></template>
