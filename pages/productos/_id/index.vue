<template>
  <div class="pt-28">
    <Header />
    <section class="product-v3 py-8 lg:py-12 js-product-v3">
      <div class="w-[calc(100%_-_2.5rem)] lg:w-[calc(100%_-_4rem)] mx-auto max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-7xl">
        <div class="mb-3 lg:mb-5">
          <breadcrumbs />
        </div>

        <div class="grid grid-cols-12 gap-5 lg:gap-8">
          <div class="col-span-12 lg:col-span-6 xl:col-span-7">
            <div class="flex flex-col gap-3 lg:gap-5">
              <figure>
                <img class="adv-gallery__img" :src="require(`~/assets/images/product.jpg`)" alt="Image description">
              </figure>

              <figure>
                <img class="block w-full" :src="require(`~/assets/images/product2.jpg`)" alt="Image description">
              </figure>

  
            </div>
          </div>

          <div class="col-span-12 lg:col-span-6 xl:col-span-5">
            <div class="product-v3__panel">
              <div class="mb-2 lg:mb-3">
                <h1>Product Name</h1>
              </div>


              <div class="text-component mb-8 lg:mb-12">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo repudiandae sapiente eaque!</p>
              </div>

              <div class="flex flex-wrap gap-5 lg:gap-8 js-product-v3__cta">
                <div>
                  <label class="sr-only" for="product-qty-input">Quantity:</label>

                  <div class="number-input number-input--v2  js-number-input">
                    <input class="form-control js-number-input__value js-product-v3__input" type="number" name="product-qty-input" id="product-qty-input" min="0" max="10" step="1" value="1">

                    <button class="number-input__btn number-input__btn--plus js-number-input__btn" aria-label="Increase Number">
                      <svg class="icon" viewBox="0 0 12 12" aria-hidden="true"><path d="M11,5H7V1A1,1,0,0,0,5,1V5H1A1,1,0,0,0,1,7H5v4a1,1,0,0,0,2,0V7h4a1,1,0,0,0,0-2Z" /></svg>
                    </button>

                    <button class="number-input__btn number-input__btn--minus js-number-input__btn" aria-label="Decrease Number">
                      <svg class="icon" viewBox="0 0 12 12" aria-hidden="true"><path d="M11,7H1A1,1,0,0,1,1,5H11a1,1,0,0,1,0,2Z"/></svg>
                    </button>
                  </div>
                </div>

                <button class="btn btn--primary grow">Add to Cart - $49</button>
              </div>
            </div>

            <div class="product-v3__cta-clone lg:hidden js-product-v3__cta-clone" aria-hidden="true">
              <div class="w-[calc(100%_-_2.5rem)] lg:w-[calc(100%_-_4rem)] mx-auto max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-7xl">
                <div class="flex flex-wrap gap-5 lg:gap-8">
                  <div>
                    <label class="sr-only" for="product-qty-input-clone">Quantity:</label>

                    <div class="number-input number-input--v2  js-number-input">
                      <input class="form-control js-number-input__value js-product-v3__input-clone" type="number" name="product-qty-input-clone" id="product-qty-input-clone" min="0" max="10" step="1" value="1">

                      <button class="number-input__btn number-input__btn--plus js-number-input__btn" aria-label="Increase Number">
                        <svg class="icon" viewBox="0 0 12 12" aria-hidden="true"><path d="M11,5H7V1A1,1,0,0,0,5,1V5H1A1,1,0,0,0,1,7H5v4a1,1,0,0,0,2,0V7h4a1,1,0,0,0,0-2Z" /></svg>
                      </button>

                      <button class="number-input__btn number-input__btn--minus js-number-input__btn" aria-label="Decrease Number">
                        <svg class="icon" viewBox="0 0 12 12" aria-hidden="true"><path d="M11,7H1A1,1,0,0,1,1,5H11a1,1,0,0,1,0,2Z"/></svg>
                      </button>
                    </div>
                  </div>

                  <button class="btn btn--primary grow">Add to Cart - $49</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <more-products />
  </div>
</template>

<script>
import product from "~/plugins/product.js";
import Breadcrumbs from '../../../components/Breadcrumbs.vue';
import MoreProducts from '../../../components/MoreProducts.vue';
export default {
  components: { Breadcrumbs, MoreProducts },
  name: 'DetailProductPage',
  mounted() {
    product()
  },
}
</script>
<style scoped>
  @import "~/assets/scss/_forms.scss";
  .product-v3__panel {
    position: -webkit-sticky;
    position: sticky;
    @apply top-5 lg:top-8;
  }

  .product-v3__cta-clone {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    @apply py-3 lg:py-5 px-5 lg:px-8;
    @apply bg-floor/90;
    -webkit-backdrop-filter: blur(5px);backdrop-filter: blur(5px);
    @apply shadow-lg;
    @apply z-10;
    transform: translateY(100%);
    visibility: hidden;
    transition: visibility 0s 0.3s, -webkit-transform 0.3s;
    transition: transform 0.3s, visibility 0s 0.3s;
    transition: transform 0.3s, visibility 0s 0.3s, -webkit-transform 0.3s;
  }

  .product-v3__cta-clone--is-visible {
    transform: translateY(0);
    visibility: visible;

    transition: transform 0.3s;

  }
</style>
