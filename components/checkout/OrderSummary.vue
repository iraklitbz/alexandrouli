<template>
    <aside class="order-summary bg-light inner-glow shadow-sm radius-md ">
        <header class="order-summary__header bg-light flex justify-between padding-sm">
        <p class="text-sm">Your cart ({{carritoNumber}}) <span class="sr-only">items</span></p>
        </header>

        <div class="padding-x-sm">
            <ul class="flex flex-column gap-sm">
                <li 
                    v-for="(product, index) in products"
                    :key="index"
                    class="order-summary__item"
                >
                    <nuxt-link to="/productos/id" class="order-summary__img">
                        <img
                            :src="'http://15.188.27.140:1337' + product.feature.data.attributes.formats.thumbnail.url" :alt="product.name + ' image'"
                        >
                    </nuxt-link>
                    <div class="flex flex-wrap justify-between gap-xxxs">
                        <div>
                            <p class="color-contrast-higher"><nuxt-link to="/productos/id">{{ product.name }}</nuxt-link></p>
                            <p class="color-contrast-medium text-sm">{{ product.cultivo }}</p>
                        </div>
                        <p class="color-contrast-higher"><span class="sr-only">Price:</span> {{ product.price }}€</p>
                    </div>
                </li>
            </ul>
        </div>

        <footer class="order-summary__footer bg-light padding-x-sm padding-bottom-sm">
            <div class="margin-y-sm padding-y-sm border-top border-bottom">
                <div class="flex flex-column flex-row@md gap-xxs">
                <input aria-label="Discount code" class="form-control flex-grow min-width-0" type="email" placeholder="Discount code">
                <button class="btn btn--subtle">Apply</button>
                </div>
            </div>

            <ul class="text-sm flex flex-column gap-xxs">
                <li class="flex justify-between"><i>Subtotal</i> <i>$98.00</i></li>
                <li class="flex justify-between"><i>Tax</i> <i>$10.00</i></li>
                <li class="flex justify-between"><i>Delivery</i> <i>Free</i></li>
                <li class="flex justify-between font-bold"><i>Total</i> <i>{{sumaFinal}}</i></li>
            </ul>
        </footer>
    </aside>
</template>

<script>
import { mapState } from 'vuex'
export default {
    data () {
            return {

            }
        },
    computed: {
        ...mapState({
                products: state => state.cart.products,
                carritoNumber: state => state.cart.products.reduce((sum, value) => (sum + value.cantidad ), 0),
                sumaFinal: state => state.cart.products.reduce((sum, value) => (sum + value.totalPrice ), 0)
        })
    },
    mounted() {
        if (localStorage.getItem('productsInCart')) {
            this.$store.commit('cart/SET_PRODUCTS_LOCAL_STORAGE', JSON.parse(localStorage.getItem('productsInCart')))
        }
    }
}
</script>
<style lang="scss">
    @import "~/assets/scss/summary.scss";
</style>
