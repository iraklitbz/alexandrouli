<template>
  <div>
    <Hero class="mt-5" />
    <section class="adv-gallery my-10">
      <div class="adv-gallery__grid w-[calc(100%_-_2.5rem)] lg:w-[calc(100%_-_4rem)] mx-auto max-w-7xl">
        <div>
         <nuxt-img
            provider="cloudinary"
            loading="lazy"
            sizes="sm:100vw md:50vw lg:310px"
            format="webp" 
            class="adv-gallery__img" 
            src="1_4dc69cf321.jpg?updated_at=2023-01-09T13:20:17.214Z" 
            alt="Image description" 
          />
        </div>
        <div>
         <nuxt-img
            provider="cloudinary"
            loading="lazy"
            sizes="sm:100vw md:50vw lg:310px"
            format="webp"  
            class="adv-gallery__img" 
            src="2_211c6f0254.jpg?updated_at=2023-01-09T13:20:17.890Z" 
            alt="Image description" 
          />
        </div>

        <div>
         <nuxt-img
            provider="cloudinary"
            loading="lazy"
            sizes="sm:100vw md:50vw lg:700px"
            format="webp"  
            class="adv-gallery__img" 
            src="4_338441f6d7.jpg?updated_at=2023-01-09T13:20:17.759Z" 
            alt="Image description" 
          />
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
  export default {
    name: 'HomePage',
    // middleware: 'auth',
    computed: {
      currentUser() {
            return this.$store.state.user
        },
    }
  }
</script>

<style scoped>
  @import "~/assets/scss/_gallery.scss";
</style>
