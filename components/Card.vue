<template>
    <div class="prod-card-v2 mb-5">
        <span class="prod-card-v2__badge" role="text">{{product.cultivo}} <i class="sr-only">product</i></span>
        <nuxt-link to="/products/id" class="prod-card-v2__img-link rounded-lg shadow-md">
            <figure>
                <img
                    v-for="(image, index) in product.imagesFeature"
                    :key="index"
                    :src="image"
                    alt="Product preview image"
                >
            </figure>
        </nuxt-link>
        <div class="p-3 lg:p-5 text-center">
            <h1 class="text-lg lg:text-2xl"><nuxt-link to="/products/id" class="product-card-v2__title">{{ product.name }}</nuxt-link></h1>

            <div class="my-1 lg:my-1.5">
                <span class="prod-card-v2__price">{{product.price}}€</span>
            </div>
            <error-message
                v-if="product.disponible === product.cantidad"
                :errors="'Producto agotado'"
            />
            <button v-else @click="handleCarrito(product)" class="btn btn--primary mt-2">Añadir al carrito</button>
        </div>

    </div>
</template>
<script>
export default {
    props: {
        product: {
            type: Object,
            required: true
        }
    },
    methods: {
        handleCarrito(product) {
            //its add in the cart until the product is available
            if(product.disponible !== product.cantidad) {
                this.$store.commit('cart/SET_PRODUCTS', product)
            }
        }
    }
}
</script>

<style lang="scss">
  @import "~/assets/scss/card.scss";
</style>
