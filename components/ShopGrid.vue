<template>
    <section class="py-12">
        <div class="w-[calc(100%_-_2.5rem)] lg:w-[calc(100%_-_4rem)] mx-auto max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-7xl">
            <div class="mb-5 lg:mb-8">
                <h1 class="text-center">Our Products</h1>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6 mt-14">
                <Card
                    v-for="product in products"
                    :key="product.id"
                    :product="product.attributes"
                    :id="product.id"
                />
            </div>
        </div>
        <Pagination
            class="mt-10 mx-auto max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-7xl"
        />
    </section>
</template>
<script>
import axios from 'axios';
export default {
    data(){
        return {
            products: [],
            strapiUrl: process.env.strapiUrl
        }
    },
    mounted () {
        axios
        .get(process.env.strapiUrl + '/api/products?populate=*')
        .then(response => (
                this.products = response.data.data
            ))
        .catch(error => (this.error = error))
    }
}
</script>

