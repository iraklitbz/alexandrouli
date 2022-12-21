<template>
    <div class="prod-card-v2 mb-5">
        <span class="prod-card-v2__badge" role="text">{{product.cultivo}} <i class="sr-only">product</i></span>
        <nuxt-link :to="'/vinos/' + id + '/' + product.slug" class="prod-card-v2__img-link rounded-lg shadow-md">
            <figure v-if="product.feature.data && product.feature.data.attributes" class="h-80">
                <img
                    class="object-contain h-full"
                    :src="product.feature.data.attributes.formats.small.url"
                    :alt="product.name + ' image'"
                >
            </figure>
            <div class="flex items-center justify-center bg-contrast-low bg-opacity-10 h-80" v-else>
                <load-svg name="cross" class="w-20 h-20 text-contrast-low" />
            </div>
        </nuxt-link>
        <div class="p-3 lg:p-5 text-center">
            <h1 class="text-lg lg:text-2xl"><nuxt-link :to="'/vinos/' + id + '/' + product.slug" class="product-card-v2__title">{{ product.name }}</nuxt-link></h1>

            <div class="my-1 lg:my-1.5">
                <span class="prod-card-v2__price">{{product.price}}€</span>
            </div>
            <error-message
                class="mt-4"
                v-if="amount === product.available || amount > product.available"
                :errors="'Producto agotado'"
            />
            
            <button v-else @click="handleCarrito(product)" class="btn btn--primary mt-2 relative px-10 overflow-hidden">
                <span 
                    class="blob flex justify-center text-sm absolute left-3 transition-all duration-200 ease-in-out"
                    :class="[amount > 0 ? 'top-3' : '-top-6', pulseActive ? 'active' : '']"
                >
                    {{amount}}
                </span>
                <span class="text-lg">Añadir a la cesta</span>
            </button>
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
            type: String,
            required: true
        }
    },
    data() {
        return {
            strapiUrl: process.env.strapiUrl,
            pulseActive: false
        };
    },
    computed: {
        ...mapState({
            products: state => state.cart.products,
            toggleCart: state => state.cart.toggleCart
        }),
        amount() {
            return this.products.find(element => element.id === this.id) ? this.products.find(element => element.id === this.id).amount : 0;
        }
    },
    methods: {
        handleCarrito(product) {
            this.pulseActive = true;
            setTimeout(() => {
                this.pulseActive = false;
            }, 1000);
            product.id = this.id;
            this.$store.commit("cart/SET_PRODUCTS", {
                product: product,
                amount: this.amount + 1,
                id: this.id
            });
        }
    }
}
</script>

<style lang="scss">
  @import "~/assets/scss/card.scss";
  @import "~/assets/scss/_pulseffect.scss";
  .chip__icon-wrapper {
    @apply bg-warning text-black;
}
</style>
