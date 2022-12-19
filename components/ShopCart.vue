<template>
    <div 
        class="drawer dr-cart"
        :class="toggleCart ? 'drawer--is-visible' : ''"
        >
        <div class="drawer__content relative z-50 bg-floor-dark inner-glow shadow-lg flex flex-col" role="alertdialog" aria-labelledby="drawer-cart-title">
            <header class="flex items-center justify-between shrink-0 border-b border-contrast-lower px-3 lg:px-5 py-2 lg:py-3">
            <h1 id="drawer-cart-title" class="text-base lg:text-xl truncate" >Cesta de compra ({{ carritoNumber }})</h1>

            <button @click="handleCloseCart" class="drawer__close-btn js-drawer__close">
                <svg class="icon w-[16px] h-[16px]" viewBox="0 0 16 16"><title>Cerrar el modal</title><g stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"><line x1="13.5" y1="2.5" x2="2.5" y2="13.5"></line><line x1="2.5" y1="2.5" x2="13.5" y2="13.5"></line></g></svg>
            </button>
            </header>

            <div class="drawer__body px-3 lg:px-5 pb-3 lg:pb-5">
              <ol v-if="products.length" class="mt-5">
                  <li
                    v-for="(product, index) in products"
                    :key="index"
                  >
                    <ProductSmallCard 
                      :product="product" 
                    />
                  </li>
                  <a @click="handleRemoveAll" class="cursor-pointer text-error text-sm no-underline lg:text-base text-center block mt-3">Vaciar cesta</a>
              </ol>
              <div 
                v-else
                class="mt-10"
              >
                <p class="text-center text-lg">Tu cesta está vacía</p>
                <nuxt-link to="/vinos/1" class="btn btn--primary text-xl w-full mt-2 lg:mt-3">Empezar tu compra</nuxt-link>
              </div>
            </div>

            <footer v-if="products.length" class="px-3 lg:px-5 py-2 lg:py-3 border-t border-contrast-lower shrink-0">
                <p class="text-sm lg:text-xl flex justify-between"><span>Total:</span> <span>{{sumaFinal}}€</span></p>
                <nuxt-link to="/checkout" class="btn btn--primary text-[1.2em] w-full mt-2 lg:mt-3">Realizar el pedido &rarr;</nuxt-link>
            </footer>
        </div>
          <div
            @click="handleCloseCart"   
            class="fixed w-full h-screen bg-black bg-opacity-20 top-0 left-0 z-1">
          </div>
        </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    computed: {
      ...mapState({
          products: state => state.cart.products,
          toggleCart: state => state.cart.toggleCart,
          carritoNumber: state =>  state.cart.products.reduce((sum, value) => (sum + value.amount ), 0),
          sumaFinal: state => state.cart.products.reduce((sum, value) => (sum + value.totalPrice ), 0)
      })
    },
    mounted() {
        if (localStorage.getItem('productsInCart')) {
            this.$store.commit('cart/SET_PRODUCTS_LOCAL_STORAGE', JSON.parse(localStorage.getItem('productsInCart')))
        }
    },
    methods: {
        handleRemoveAll() {
          this.$store.commit('cart/SET_REMOVE_ALL_PRODUCTS')
        },
        handleCloseCart() {
            let toggleCart = this.toggleCart
            toggleCart = !toggleCart
            this.$store.commit('cart/SET_DRAWER', toggleCart)
        }
    }
}
</script>

<style lang="scss">
  @import "~/assets/scss/_drawer.scss";
</style>
