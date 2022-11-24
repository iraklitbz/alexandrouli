<template>
    <section class="feature-v15 parallax-img p-5 lg:p-0 js-parallax-img">
        <div class="header__container w-[calc(100%_-_2.5rem)] lg:w-[calc(100%_-_4rem)] mx-auto max-w-7xl relative z-2">
            <div class="grid grid-cols-12">
            <div class="col-span-12 lg:col-span-6">
                <div class="feature-v15__content bg-floor/80 p-5 lg:p-8 lg:py-32 xl:px-12 xl:py-52">
                <div class="text-component">
                    <p class="text-sm lg:text-base opacity-60">How it works</p>
                    <h1>Lorem ipsum</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, rem neque doloribus impedit explicabo.</p>
                </div>

                <div class="mt-3 lg:mt-5">
                    <a class="btn btn--subtle" href="#0">Learn more</a>
                </div>
                </div>
            </div>
            </div>
        </div>

        <div class="absolute z-1 top-0 left-0 h-full w-full overflow-hidden">
            <figure class="parallax-img__assets h-full w-full js-parallax-img__assets">
                <img class="h-full w-full object-cover" :src="require(`~/assets/images/3.jpg`)" alt="wine glass" style="transform: translateZ(150px);">
            </figure>
        </div>
    </section>
</template>
<script>
import parallax from "~/plugins/parallax.js";
export default {
  mounted() {
    parallax()
  }
}
</script>
<style lang="scss">
  @import "~/assets/scss/parallax.scss";
</style>
