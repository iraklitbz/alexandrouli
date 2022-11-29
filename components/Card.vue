<template>
    <div class="prod-card-v2 mb-5">
        <span class="prod-card-v2__badge" role="text">{{product.cultivo}} <i class="sr-only">product</i></span>
        <nuxt-link :to="'/productos/' + id + '/' + product.slug" class="prod-card-v2__img-link rounded-lg shadow-md">
            <figure>
                <img
                    :src="strapiUrl + product.feature.data.attributes.formats.small.url"
                    :alt="product.name + ' image'"
                >
            </figure>
        </nuxt-link>
        <div class="p-3 lg:p-5 text-center">
            <h1 class="text-lg lg:text-2xl"><nuxt-link :to="'/productos/' + id + '/' + product.slug" class="product-card-v2__title">{{ product.name }}</nuxt-link></h1>

            <div class="my-1 lg:my-1.5">
                <span class="prod-card-v2__price">{{product.price}}€</span>
            </div>
            <error-message
                v-if="amount === product.available || amount > product.available"
                :errors="'Producto agotado'"
            />
            
            <button v-else @click="handleCarrito(product)" class="btn btn--primary mt-2">Añadir al carrito</button>
        </div>

    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    props: {
        product: {
            type: Object,
            required: true
        },
        id: {
            type: Number,
            required: true
        }
    },
    data(){
        return {
            strapiUrl: process.env.strapiUrl
        }
    },
    computed: {
        ...mapState({
            products: state => state.cart.products,
        }),
        amount() {
            return this.products.find(element => element.id === this.id) ? this.products.find(element => element.id === this.id).amount : 0
        }
    },
    methods: {
        handleCarrito(product) {

            product.id = this.id
            this.$store.commit('cart/SET_PRODUCTS', {
                product: product,
                amount: 1,
                id: this.id
            })
        }
    }
}
</script>

<style lang="scss">
  @import "~/assets/scss/card.scss";
</style>
