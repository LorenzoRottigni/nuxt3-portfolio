<template lang="pug">
extends ./../layouts/default.pug

block hero-content
    .col-8.offset-2.border.border-primary
        h1.text-white.text-center  portfolio - Hero Content
block deep-content
    .col-8.offset-2.border.border-primary
        h1.text-white.text-center  portfolio - Deep Content
block footing-content
    .col-8.offset-2.border.border-primary
        h1.text-white.text-center  portfolio - Footing content
</template>

<script lang="ts" setup></script>

<script>
export default {};
</script>

<style lang="sass" scoped></style>
