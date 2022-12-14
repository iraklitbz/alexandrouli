<template>
    <section class="products-gallery-v2 py-12 lg:py-20">
        <div class="w-[calc(100%_-_2.5rem)] lg:w-[calc(100%_-_4rem)] mx-auto max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-7xl">
            <div class="grid grid-cols-12 gap-8 lg:gap-12">
            <div class="col-span-12 xl:col-span-4">
                <div class="text-component text-center xl:text-left">
                <h1>Our Shop</h1>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit unde iure velit.</p>
                <p><nuxt-link to="/vinos" class="btn btn--subtle" role="text">View all <i class="sr-only">products</i></nuxt-link></p>
                </div>
            </div>

            <div class="col-span-12 xl:col-span-8">
                <div class="grid grid-cols-12 gap-5 lg:gap-8">
                    <div
                        v-for="item in products"
                        :key="item.id"
                        class="prod-card-v2 col-span-6 lg:col-span-3"
                    >  
                        <span class="prod-card-v2__badge" role="text">{{item.attributes.cultivo}}</span>

                        <nuxt-link v-if="item.feature && item.feature.data.attributes" :to="'/vinos/' + item.id + '/' + item.attributes.slug" class="prod-card-v2__img-link rounded-lg shadow-md" aria-label="Description of the link">
                            <figure class="h-80 lg:h-44">
                                <img class="object-contain h-full" :src="item.attributes.feature.data.attributes.formats.small.url" alt="Product preview image">
                                <img class="object-contain h-full" :src="require(`~/assets/images/product2.jpg`)" alt="Product preview image" aria-hidden="true">
                            </figure>
                        </nuxt-link>
                        <nuxt-link v-else :to="'/vinos/' + item.id + '/' + item.attributes.slug" class="prod-card-v2__img-link rounded-lg shadow-md" aria-label="Description of the link">
                            <div class="flex items-center justify-center bg-contrast-low bg-opacity-10 h-80">
                                <load-svg name="cross" class="w-20 h-20 text-contrast-low" />
                            </div>
                        </nuxt-link>

                        <div class="p-3 lg:p-5 text-center">
                            <h1 class="text-lg"><nuxt-link :to="'/vinos/' + item.id + '/' + item.attributes.slug" class="product-card-v2__title">{{item.attributes.name}}</nuxt-link></h1>

                            <div class="my-1 lg:my-1.5">
                                <span class="prod-card-v2__price">{{item.attributes.price}}€</span>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    </section>
</template>

<script>
import axios from 'axios';
export default {
    props: {
        outstanding: {
            type: Boolean,
            default: true
        }
    },
    data(){
        return {
            products: [],
            strapiUrl: process.env.strapiUrl
        }
    },
    mounted () {
        axios
        .get(process.env.strapiUrl + '/api/products?populate=*')
        .then(response => (this.products = response.data.data.filter(item => item.attributes.outstanding === this.outstanding)))
        .catch(error => (this.error = error))
    }
}
</script>

<style lang="scss">
    .prod-card-v2 {
    --rating-icon-size: 28px;
    position: relative;
    }

    .prod-card-v2__img-link {
    display: block;
    position: relative;
    overflow: hidden;
    }
    .prod-card-v2__img-link img {
    display: block;
    width: 100%;
    transition: 0.3s;
    }
    .prod-card-v2__img-link img:nth-child(2) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

        object-fit: cover;
    opacity: 0;
    }
    .prod-card-v2__img-link:hover img:nth-child(1) {
    opacity: 0.85;
    }
    .prod-card-v2__img-link:hover img:nth-child(2) {
    opacity: 1;
    }

    .prod-card-v2__badge {
    position: absolute;
    z-index: 1;
    @apply top-3 lg:top-5;
    @apply right-3 lg:right-5;
    @apply bg-black/90;
    @apply py-1.5 lg:py-2 px-3 lg:px-5;
    @apply rounded;
    pointer-events: none;
    @apply text-sm lg:text-base;
    @apply text-white;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    }

    .product-card-v2__title {
    @apply text-contrast-higher;
    text-decoration: none;
    font-weight: bold;
    }
    .product-card-v2__title:hover {
    text-decoration: underline;
    }

    .prod-card-v2__price {
    text-decoration: none;
    }

    .prod-card-v2__old-price {
    @apply text-contrast-medium;
    text-decoration: line-through;
    }
    .prod-card-v2__old-price::before {
    content: "original price";
    position: absolute;
    clip: rect(1px, 1px, 1px, 1px);
    clip-path: inset(50%);
    }
</style>
