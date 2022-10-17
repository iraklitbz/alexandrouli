<template>
  <div>
    <Header />
    <ShopGrid />
  </div>
</template>

<script>
import sticky from "~/plugins/stick-feature.js";
export default {
  name: 'IndexPage',
  mounted() {
    sticky()
  },
}
</script>
<style scoped>

</style>
