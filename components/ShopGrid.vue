<template>
    <section class="py-12">
        <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6 mt-14">
            <Card
                v-for="product in products"
                :key="product.id"
                :product="product.attributes"
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
            required: true
        }
    }
}
</script>

