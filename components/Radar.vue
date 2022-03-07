<template lang="pug">
#radar.border.border-primary.d-flex.flex-wrap.bg-transparent-dark
    .radar-quadrant.d-flex.flex-column.align-items-center.justify-content-center.border.border-transparent-primary(
        :key="'radar-quadrant-' + index"
        v-for="(route, index) in getVueRoutes"
    )
        i.text-secondary(:class="getIconByRouteName(route.name)")
        h6.text-primary {{ route.name }}
</template>

<script lang="ts" setup>
/**
 * @param {string} routeName
 * @description get font awesome route classes
 * @returns {string} classes
 */
const getIconByRouteName = (routeName) => {
    switch(routeName){
        case 'index':
            return 'fas fa-home fa-lg'
        case 'blog':
            return 'fas fa-th-list fa-lg'
        case 'app':
            return 'fas fa-home fa-lg'
        case 'contacts':
            return 'far fa-id-badge fa-lg'
        case 'cv':
            return 'far fa-file-alt fa-lg'
        case 'github':
            return 'fab fa-github fa-lg'
        case 'vimeo':
            return 'fab fa-vimeo-v fa-lg'
        case 'skills':
            return 'fas fa-cloud fa-lg'
        case 'portfolio':
            return 'fas fa-code fa-lg'
        default:
            return 'fas fa-error fa-lg'
    }
}
/**
 * @description get VueRouter istance
 * @returns {object} istance of VueRouter
 */
const getVueRouter = computed(() => useRouter()).value
/**
 * @description get current VueRouter route
 * @returns {object} {name},{path},{location}
 */
const getActiveRoute = computed(() => useRoute()).value
/**
 * @description get current VueRouter name
 * @returns {string}
 */
const getActiveRouteName = computed(() => getActiveRoute.name).value
/**
 * @description get current VueRouter route path
 * @returns {string}
 */
const getActiveRoutePath = computed(() => getActiveRoute.path).value
/**
 * @description get VueRouter routes unordered list
 * @returns {array}
 */
const getVueRoutes = computed(() => getVueRouter.options.routes).value
/**
 * @description get VueRouter routes ordered list
 * @returns {array}
 */
const getRadarVueRoutes = computed(() => {
    const unorderedList = getVueRoutes
    const centralItem = unorderedList[4]
    const oldIndexPosition = unorderedList.findIndex(element => element.name === 'index')
    const indexRoute = unorderedList[oldIndexPosition]
    unorderedList[oldIndexPosition] = centralItem
    unorderedList[4] = indexRoute
    return unorderedList;
}).value

</script>

<script lang="ts">
</script>

<style lang="sass" scoped>
//per renderlo responsivo anche in mobile:
// 1- radar left: calc( 10px + 50%)
// 2- radar transform: translateX(-50%)
// 3- pedina left: calc( 10px + 50% + ($vh-base / 3))
// 4- pedina left: transform translateX(-50%)
$vh-base: 250px
#radar
    position: absolute
    top: 10px
    left: calc(10px + 50%)
    transform: translateX(-50%)
    width: $vh-base
    height: $vh-base
    .radar-quadrant
        width: calc(100% / 3)
        height: calc(100 / 3)
@media screen and (min-width: 768px)
    #radar
        left: 10px
        transform: translateX(0)
</style>