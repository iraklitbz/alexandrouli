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
                    <nuxt-link :to="'/vinos/' + product.id + '/' + product.slug" class="h-36 w-36 lg:h-20 lg:w-20 order-summary__img mr-5">
                        <img
                            class="object-contain h-full"
                            :src="product.feature.data.attributes.formats.thumbnail.url" :alt="product.name + ' image'"
                        >
                    </nuxt-link>
                    <div class="flex flex-wrap justify-between items-center w-full">
                        <div>
                            <p class="color-contrast-higher"><nuxt-link :to="'/vinos/' + product.id + '/' + product.slug">{{ product.name }}</nuxt-link></p>
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
            <div class="mt-10" ref="paypal"></div>
        </footer>
    </aside>
</template>

<script>
import { mapState } from 'vuex'
export default {
    data () {
            return {
                strapiUrl: process.env.strapiUrl,
                loaded: false,
                product: {
                    price: 777.77,
                    description: "leg lamp from that one movie",
                    img: "./assets/lamp.jpg"
                }
            }
        },
    computed: {
        ...mapState({
                products: state => state.cart.products,
                carritoNumber: state => state.cart.products.reduce((sum, value) => (sum + value.amount ), 0),
                sumaFinal: state => state.cart.products.reduce((sum, value) => (sum + value.totalPrice ), 0)
        })
    },
    mounted() {
        const script = document.createElement("script");
        script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.paypalClientID}`;
        script.addEventListener("load", this.setLoaded);
        document.body.appendChild(script);
        if (localStorage.getItem('productsInCart')) {
            this.$store.commit('cart/SET_PRODUCTS_LOCAL_STORAGE', JSON.parse(localStorage.getItem('productsInCart')))
        }
    },
    methods: {
        setLoaded() {
            this.loaded = true;
            window.paypal
                .Buttons({
                createOrder: (data, actions) => {
                    return actions.order.create({
                    purchase_units: [
                        {
                        description: this.product.description,
                        amount: {
                            currency_code: "USD",
                            value: this.sumaFinal
                        }
                        }
                    ]
                    });
                },
                onApprove: async (data, actions) => {
                    const order = await actions.order.capture();
                    this.paidFor = true;
                    console.log(order);
                },
                onError: err => {
                    console.log(err);
                }
                })
                .render(this.$refs.paypal);
        }
    }
}
</script>
<style lang="scss">
    @import "~/assets/scss/summary.scss";
</style>
