<template lang="pug">
#radar.border.border-primary.d-flex.flex-wrap.bg-transparent-dark
  .radar-quadrant.d-flex.flex-column.align-items-center.justify-content-center.border.border-transparent-primary(
    :key="'radar-quadrant-' + index",
    v-for="(route, index) in getVueRoutes"
  )
    i.text-secondary(:class="getIconByRouteName(route.name)")
    h6.text-primary {{ route.name }}
  #user-pawn(ref="user-pawn")
    lord-icon(
        src="https://cdn.lordicon.com/ibgjiwvi.json"
        trigger="loop"
        :colors="'primary:' + colorPrimary + ',secondary:' + colorSecondary"
        :style="{ marginLeft: getPawnOffsetX, marginTop: getPawnOffsetY}"
    )
    
</template>

<script lang="ts" setup>
const colorPrimary = '#dd6600'
const colorSecondary = '#FDB750'
const pawnOffsetX = 1
const pawnOffsetY = 0
const vhBase = 250
const gridSize = 3
const boxSize = vhBase / gridSize
/**
 * @param {string} routeName
 * @description get font awesome route classes
 * @returns {string} classes
 */
const getIconByRouteName = (routeName) => {
  switch (routeName) {
    case "index":
      return "fas fa-home fa-lg";
    case "blog":
      return "fas fa-th-list fa-lg";
    case "app":
      return "fas fa-home fa-lg";
    case "contacts":
      return "far fa-id-badge fa-lg";
    case "cv":
      return "far fa-file-alt fa-lg";
    case "github":
      return "fab fa-github fa-lg";
    case "vimeo":
      return "fab fa-vimeo-v fa-lg";
    case "skills":
      return "fas fa-cloud fa-lg";
    case "portfolio":
      return "fas fa-code fa-lg";
    default:
      return "fas fa-error fa-lg";
  }
};
/**
 * @description get VueRouter istance
 * @returns {object} istance of VueRouter
 */
const getVueRouter = computed(() => useRouter()).value;
/**
 * @description get current VueRouter route
 * @returns {object} {name},{path},{location}
 */
const getActiveRoute = computed(() => useRoute()).value;
/**
 * @description get current VueRouter name
 * @returns {string}
 */
const getActiveRouteName = computed(() => getActiveRoute.name).value;
/**
 * @description get current VueRouter route path
 * @returns {string}
 */
const getActiveRoutePath = computed(() => getActiveRoute.path).value;
/**
 * @description get VueRouter routes unordered list
 * @returns {array}
 */
const getVueRoutes = computed(() => getVueRouter.options.routes).value;
/**
 * @description get VueRouter routes ordered list
 * @returns {array}
 */
const getRadarVueRoutes = computed(() => {
  const unorderedList = getVueRoutes;
  const centralItem = unorderedList[4];
  const oldIndexPosition = unorderedList.findIndex(
    (element) => element.name === "index"
  );
  const indexRoute = unorderedList[oldIndexPosition];
  unorderedList[oldIndexPosition] = centralItem;
  unorderedList[4] = indexRoute;
  return unorderedList;
}).value;
const getPawnOffsetX = computed(() => {
    return boxSize * pawnOffsetX + 'px'
})
const getPawnOffsetY = computed(() => {
    return boxSize * pawnOffsetY + 'px'
})
</script>

<script lang="ts">

</script>

<style lang="sass" scoped>
$vh-base: 250px
$grid-size: 3
$box-size: calc(100% / $grid-size)
#radar
    position: absolute
    top: 10px
    left: calc(10px + 50%)
    transform: translateX(-50%)
    width: $vh-base
    height: $vh-base
    .radar-quadrant
        width: $box-size
        height: $box-size
    #user-pawn
        lord-icon
            width: $box-size
            height: $box-size
            position: absolute
            top: 0
            left: calc(50% - $box-size)
            transform: translateX(-50%)
@media screen and (min-width: 768px)
    #radar
        left: 10px
        transform: translateX(0)
        #user-pawn lord-icon
            left: 0
            transform: translateX(0)
</style>
