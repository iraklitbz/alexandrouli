<template>
    <section>
        <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            <Card
                v-for="product in products"
                :key="product.id"
                :product="product?.attributes"
                :id="product.id"
            />
        </div>
    </section>
</template>
<script>
export default {
    props: {
        products: {
            type: Array,
            default: () => []
        }
    }
}
</script>

