<template lang="pug">
#radar.border.border-primary
    .radar-quadrant(
        :key="'radar-quadrant-' + index"
        v-for="(route, index) in vueRoutes"
    )
        h1.text-primary {{ route.name }}
</template>

<script lang="ts" setup>
//const vueRouter = useRouter()
//const activeRoute = useRoute()
//const activeRouteName = activeRoute.name
//const activeRoutePath = activeRoute.path
//const vueRoutes = vueRouter.options.routes

const getVueRoute = computed(() => useRouter()).value
const getActiveRoute = computed(() => useRoute()).value
const getActiveRouteName = computed(() => getActiveRoute.name).value
const getActiveRoutePath = computed(() => getActiveRoute.path).value
const getVueRoutes = computed(() => getVueRoute.options.routes).value
const getRadarVueRoutes = computed(() => {
    const unorderedList = getVueRoutes
    const centralItem = unorderedList[4]
    const oldIndexPosition = unorderedList.findIndex(element => element.name === 'index')
    const indexRoute = unorderedList[oldIndexPosition]
    unorderedList[oldIndexPosition] = centralItem
    unorderedList[4] = indexRoute
    return unorderedList;
}).value

console.log("routes:")
console.dir(getVueRoutes)

console.log("active route:")
console.dir(getActiveRouteName)

console.log(getRadarVueRoutes)
</script>

<script lang="ts">
</script>

<style lang="sass" scoped>
#radar
    position: absolute
    top: 10px
    left: 10px
</style>