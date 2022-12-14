<template>
  <div>
    <section class="product-v3 py-8 lg:py-12 js-product-v3">
      <div class="w-[calc(100%_-_2.5rem)] lg:w-[calc(100%_-_4rem)] mx-auto max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-7xl">
        <div class="mb-3 lg:mb-5">
          <breadcrumbs 
            :name="name"
            :page="{ title: 'Vinos', link: '/vinos' }"
          />
        </div>

        <div class="grid grid-cols-12 gap-5 lg:gap-8">
          <div class="col-span-12 lg:col-span-6 xl:col-span-7">
            <div class="flex flex-col gap-3 lg:gap-5">
              <figure v-if="feature" class="h-big pt-14">
                <img class="object-contain h-full adv-gallery__img w-full" :src="feature" :alt="name + 'image'">
              </figure>
              <div class="flex items-center justify-center bg-contrast-low bg-opacity-10 h-96" v-else>
                <load-svg name="cross" class="w-20 h-20 text-contrast-low" />
              </div>

              <ul 
                v-if="images"
                class="flex flex-wrap gap-3 lg:gap-5 justify-center"
                >
                <li 
                    v-for="(item, index) in images" :key="index"
                    class="cursor-pointer"
                    @click="handleImageChange(item.attributes.url)"
                  >
                  <img class="block w-full" :src="item.attributes.formats.thumbnail.url">
                </li>
              </ul>

  
            </div>
          </div>

          <div class="col-span-12 lg:col-span-6 xl:col-span-5">
            <div class="product-v3__panel">
              <div class="mb-2 lg:mb-3">
                <h1>{{ name }}</h1>
              </div>


              <div class="text-component mb-8 lg:mb-12">
                <p>{{description}}</p>
              </div>

              <div class="flex flex-wrap gap-5 lg:gap-8 js-product-v3__cta">
                <div>
                  <label class="sr-only" for="product-qty-input">Quantity:</label>

                  <div class="number-input number-input--v2">
                      <input class="form-control" type="number" name="product-qty-input"  min="0" max="100" :value="amountSelect">

                    <button 
                        class="flex items-center justify-center number-input__btn number-input__btn--plus" aria-label="Increase Number"
                        @click="handleIncrase"
                      >
                        <load-svg name="plus" class="text-black w-4" />
                    </button>

                    <button 
                        class="flex items-center justify-center number-input__btn number-input__btn--minus" aria-label="Decrease Number"
                        @click="handleDecrase"
                        >
                        <load-svg name="minus" class="text-black w-4" />
                    </button>
                  </div>
                </div>

                <button 
                    class="btn btn--primary grow"
                    @click="handleAddToCart()"
                  >Add to Cart - {{price}}€</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <more-products 
      :outstanding="true"
    />
  </div>
</template>

<script>
import productJS from "~/plugins/productJS.js";
import Breadcrumbs from '../../../components/Breadcrumbs.vue';
import MoreProducts from '../../../components/MoreProducts.vue';
import axios from 'axios';
export default {
  components: { Breadcrumbs, MoreProducts },
  name: 'DetailProductPage',
  data() {
    return {
      product: {},
      name: '',
      description: '',
      feature: '',
      images: [],
      originalPrice: null,
      price: null,
      amountSelect: 1,
      productInCart: {},
      strapiUrl: process.env.strapiUrl
    };
  },
  mounted() {
    productJS()
    axios
      .get(process.env.strapiUrl + '/api/products/' + this.$route.params.id + '?populate=*')
      .then(response => (
          this.product = response.data.data.attributes,
          this.id = response.data.data.id,
          this.name = response.data.data.attributes.name,
          this.price = response.data.data.attributes.price,
          this.originalPrice = response.data.data.attributes.price,
          this.description = response.data.data.attributes.description,
          this.feature = response.data.data.attributes.feature.data.attributes.url,
          this.images = response.data.data.attributes.images.data
        ))
      .catch(error => (this.error = error))
  },
  methods: {
    handleImageChange(url) {
      this.feature = url
    },
    handleIncrase() {
      this.amountSelect++
      this.price = this.originalPrice + this.price
    },
    handleDecrase() {
      if (this.amountSelect > 1) {
        this.amountSelect--
        this.price = this.price - this.originalPrice
      }
    },
    handleAddToCart() {
          this.product.id = this.id
          this.$store.commit('cart/SET_PRODUCTS', {
            product: this.product,
            amount: this.amountSelect,
            id: this.id
          })
    }
  }
}
</script>
<style scoped>
  @import "~/assets/scss/_forms.scss";
  .h-big {
    height: 600px;
  }
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
