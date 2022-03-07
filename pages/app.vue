<script setup lang="ts">
import { ref } from "vue"

const count = ref(0);
</script>

<template lang="pug">
div
    h1 Counter {{count}}
    button(@click="count++") press me
</template>