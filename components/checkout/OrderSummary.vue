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
                    <nuxt-link v-if="product.feature.data && product.feature.data.attributes" :to="'/vinos/' + product.id + '/' + product.slug" class="h-36 w-36 lg:h-20 lg:w-20 order-summary__img mr-5">
                        <img
                            class="object-contain h-full"
                            :src="product.feature.data.attributes.formats.thumbnail.url" :alt="product.name + ' image'"
                        >
                    </nuxt-link>
                    <nuxt-link v-else :to="'/vinos/' + product.id + '/' + product.slug" class="h-36 w-36 lg:h-20 lg:w-20 flex items-center justify-center mr-5">
                        <load-svg name="cross" class="w-10 h-10 text-contrast-low" />
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
            <Alert 
                v-if="buyError"
                class="mt-2" 
                :headline="'Error'"
                :type="'error'"
                :message="'Ha habido un error en el envío de la orden, por favor, inténtelo de nuevo más tarde.'"
            />
        </footer>
    </aside>
</template>

<script>
import { mapState } from 'vuex'
export default {
    props: {
        addressData: {
            type: Object,
            default: () => {}
        }
    },
    data () {
            return {
                strapiUrl: process.env.strapiUrl,
                loaded: false,
                productsWanna: [],
                buyError: false
            }
    },
    watch: {
        buyError: {
            handler: function (val) {
                if(val) {
                    setTimeout(() => {
                        this.buyError = false;
                    }, 5000);
                }
            },
            immediate: true
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
        script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.paypalClientID}&currency=EUR&components=buttons,funding-eligibility`;
        script.addEventListener("load", this.setLoaded);
        document.body.appendChild(script);
        if (localStorage.getItem('productsInCart')) {
            this.$store.commit('cart/SET_PRODUCTS_LOCAL_STORAGE', JSON.parse(localStorage.getItem('productsInCart')))
        }
    },
    methods: {
        setLoaded() {
            if(this.products.length > 0) {
                //ESTE ES EL PRODUCTO QUE SE VA A ENVIAR A ORDERS
                this.productsWanna = this.products.map(element => {
                    element.bodega = element.bodegas.data.attributes.title;
                    element.categoria = element.category.data.attributes.title;
                    return (({ name, amount, bodega, categoria }) => ({ name, amount, bodega, categoria}))(element);
                });
            }
            this.loaded = true;
            window.paypal
                .Buttons({
                fundingSource: paypal.FUNDING.PAYPAL,
                createOrder: (data, actions) => {
                    return actions.order.create({
                        aplication_context: {
                            brand_name: 'myBrand',
                            locale: 'es-ES',
                            shipping_preference: 'SET_PROVIDED_ADDRESS',
                        },
                        payer: {
                            address: {
                                address_line_1: this.addressData.billingData.username,
                                address_line_2: this.addressData.billingData.direccion,
                                admin_area_1: this.addressData.billingData.ciudad,
                                admin_area_2: this.addressData.billingData.provincia,
                                postal_code: this.addressData.billingData.postal,
                                country_code: this.addressData.billingData.pais
                            }
                        },
                        purchase_units: [{
                        amount: {
                            value: this.sumaFinal
                        },
                        shipping: {
                            address: {
                                address_line_1: this.addressData.direccion,
                                admin_area_1: this.addressData.ciudad,
                                admin_area_2: this.addressData.provincia,
                                postal_code: this.addressData.postal,
                                country_code: this.addressData.pais,
                            }
                        }
                        }]
                    });
                },
                onApprove: async (data, actions) => {
                    const order = await actions.order.capture();
                    this.paidFor = true;
                    await this.$axios.post("/api/orders", {
                        data: {
                            orderID: order.id,
                            name: this.addressData.username,
                            email: this.addressData.email,
                            direccion: `${order.purchase_units[0].shipping.address.address_line_1}, ${order.purchase_units[0].shipping.address.admin_area_1}, ${order.purchase_units[0].shipping.address.admin_area_2}, ${order.purchase_units[0].shipping.address.postal_code}, ${order.purchase_units[0].shipping.address.country_code}`,
                            billingAdress: `${order.payer.address.address_line_1}, ${order.payer.address.address_line_2}, ${order.payer.address.admin_area_1}, ${order.payer.address.admin_area_2}, ${order.payer.address.postal_code}, ${order.payer.address.country_code}`,
                            date: order.create_time,
                            status: order.status,
                            totalPagado: order.purchase_units[0].amount.value,
                            articulos: this.productsWanna,
                            enviado: false,
                        }
                        }).then((response) => {
                            if(response) {
                                this.buyError = false;
                                this.$store.commit('cart/SET_REMOVE_ALL_PRODUCTS')
                                this.$router.push("/compra-finalizado");
                            }
                        }).catch((error) => {
                            this.buyError = true;
                            console.log(error);
                        });
                },
                onError: err => {
                    this.buyError = true;
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
