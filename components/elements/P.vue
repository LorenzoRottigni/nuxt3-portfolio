import { default } from '../../layouts/default.vue';
<template lang="pug">
.p-container.px-3.bg-transparent-dark.border.border-primary.rounded.shadow-lg(
    :class="(hasScroll) ? 'static-height overflow-scroll' : '' "
)
    p.text-primary.p-3.mb-0
        | {{ textContent }}
</template>

<script lang="ts" setup>
const props = defineProps({
  textContent: {
    type: String,
    required: true
  },
  hasScroll: {
    type: Boolean,
    required: false,
    default: false
  }
})
</script>

<style lang="sass" scoped>
.p-container
    overflow-x: hidden !important
    /* width */
    &::-webkit-scrollbar
        width: 6px
    /* Track */
    &::-webkit-scrollbar-track
        background: transparent
    /* Handle */
    &::-webkit-scrollbar-thumb
        background: #dd6600
        border-radius: 30px
    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover
        background: #dd6600
    p
        border-left: double 4px
        border-right: double 4px
        text-align: justify
.static-height
    height: 150px
</style>