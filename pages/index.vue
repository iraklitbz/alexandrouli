<template>
  <div>
    <Hero class="mt-5" />
    <section class="adv-gallery my-10">
      <div class="adv-gallery__grid w-[calc(100%_-_2.5rem)] lg:w-[calc(100%_-_4rem)] mx-auto max-w-7xl">
        <div>
          <img class="adv-gallery__img" :src="require(`~/assets/images/1.jpg`)" alt="Image description">
        </div>
        <div>
          <img class="adv-gallery__img" :src="require(`~/assets/images/2.jpg`)" alt="Image description">
        </div>

        <div>
          <img class="adv-gallery__img" :src="require(`~/assets/images/4.jpg`)" alt="Image description">
        </div>

        <div class="bg-contrast-higher/10 p-5 lg:p-8 xl:flex">
          <div class="xl:mt-auto">
            <div class="border-l border-contrast-high h-24 mb-3 lg:mb-5 hidden xl:block" aria-hidden="true"></div>
            <p class="text-lg lg:text-2xl">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'HomePage',
    // middleware: 'auth',
    computed: {
      ...mapGetters(['loggedInUser']),
    },
    mounted() {
      // TODO console.log(this.$cookies)
      console.log(this.loggedInUser)
    }
  }
</script>

<style scoped>
  @import "~/assets/scss/_gallery.scss";
</style>
