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
                    :product="product"
                />
            </div>
        </div>
        <Pagination
            class="mt-10 mx-auto max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-7xl"
        />
    </section>
</template>
<script>
export default {
    data(){
        return {
            products: [
                {
                    id: 0,
                    name: "Pheasant's Tears",
                    price: 79,
                    imagesFeature: [
                        "https://codyhouse.co/app/assets/img/product-card-v2-img-1.jpg",
                        "https://codyhouse.co/app/assets/img/product-card-v2-img-2.jpg",
                    ],
                    badge: "New",
                    cultivo: "Saperavi",
                    disponible: 10,
                    cantidad: 0
                },
                {
                    id: 1,
                    name: "Pétrus",
                    price: 20,
                    imagesFeature: [
                        "https://codyhouse.co/app/assets/img/product-card-v2-img-1.jpg",
                        "https://codyhouse.co/app/assets/img/product-card-v2-img-2.jpg",
                    ],
                    badge: "New",
                    cultivo: "Kinzmarauli",
                    disponible: 5,
                    cantidad: 0
                },
                {
                    id: 2,
                    name: "Pomerol ",
                    price: 18,
                    imagesFeature: [
                        "https://codyhouse.co/app/assets/img/product-card-v2-img-1.jpg",
                        "https://codyhouse.co/app/assets/img/product-card-v2-img-2.jpg",
                    ],
                    badge: "New",
                    cultivo: "Alexandrouli",
                    disponible: 15,
                    cantidad: 0
                },
                {
                    id: 3,
                    name: "Pheasant's Tears",
                    price: 79,
                    imagesFeature: [
                        "https://codyhouse.co/app/assets/img/product-card-v2-img-1.jpg",
                        "https://codyhouse.co/app/assets/img/product-card-v2-img-2.jpg",
                    ],
                    badge: "New",
                    cultivo: "Saperavi",
                    disponible: 2,
                    cantidad: 0
                },
                {
                    id: 4,
                    name: "Pheasant's Tears",
                    price: 79,
                    imagesFeature: [
                        "https://codyhouse.co/app/assets/img/product-card-v2-img-1.jpg",
                        "https://codyhouse.co/app/assets/img/product-card-v2-img-2.jpg",
                    ],
                    badge: "New",
                    cultivo: "Kinzmaraouli",
                    disponible: 7,
                    cantidad: 0
                },
                {
                    id: 5,
                    name: "Pheasant's Tears",
                    price: 79,
                    imagesFeature: [
                        "https://codyhouse.co/app/assets/img/product-card-v2-img-1.jpg",
                        "https://codyhouse.co/app/assets/img/product-card-v2-img-2.jpg",
                    ],
                    badge: "New",
                    cultivo: "Saperavi",
                    disponible: 4,
                    cantidad: 0
                }
            ]
        }
    }
}
</script>

