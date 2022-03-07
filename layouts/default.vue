<template lang="pug">
#app.full-height.bg-circuit.bg-dark.border-primary
  //position absolute overlay
  FPSOverlay
  //vue router pages, pages extend pug layout
  main.h-100
    slot
</template>

<script lang="ts">

export default {
  head: {

  }
}
</script>
<script lang="ts" setup>  
useMeta({
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css' },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com'},
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'true'},
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Jura:wght@300;400;500;600;700&family=Roboto+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap'}
  ]
})
</script>

<style lang="sass">
#app
  border: ridge 10px
</style>
