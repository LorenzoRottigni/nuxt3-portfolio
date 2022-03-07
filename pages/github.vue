<template lang="pug">
extends ./../layouts/default.pug

block hero-content
    .col-8.offset-2.border.border-primary
        h1.text-white.text-center  github - Hero Content
        h1.text-white.text-center.font-roboto-mono github-Hero Content
        h2.text-white.text-center.font-roboto-mono roboto mono
        h3.text-white.text-center.font-roboto-mono-thin roboto mono thin
        h2.text-white.text-center.font-roboto roboto
        h3.text-white.text-center.font-roboto-thin roboto thin
        h4.text-white.text-center  github - Hero Content
        h5.text-white.text-center  github - Hero Content
        h6.text-white.text-center  github - Hero Content
        div.mt-3
            ElementsP(
                textContent="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                :hasScroll="true"
            )
        div.mt-3
            ElementsP(textContent="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.")
block deep-content
    .col-8.offset-2.border.border-primary
            h1.text-white.text-center  github - Deep Content
block footing-content
    .col-8.offset-2.border.border-primary
        h1.text-white.text-center  github - Footing content
</template>

<script lang="ts" setup>

</script>

<script lang="ts">
//import aosMixin from '~/mixins/aos'

export default {
    //mixins: [aosMixin]
}
</script>

<style lang="sass" scoped>
</style>