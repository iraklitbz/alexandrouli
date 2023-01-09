<template>
    <aside class="order-summary bg-light inner-glow shadow-sm radius-md ">
        <div v-if="products.length">
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
                            <nuxt-img
                                provider="cloudinary"
                                loading="lazy"
                                format="webp"
                                class="object-contain h-full"
                                :src="product.feature.data.attributes.formats.thumbnail.hash" :alt="product.name + ' image'"
                            />
                        </nuxt-link>
                        <nuxt-link v-else :to="'/vinos/' + product.id + '/' + product.slug" class="h-36 w-36 lg:h-20 lg:w-20 flex items-center justify-center mr-5">
                            <load-svg name="cross" class="w-10 h-10 text-contrast-low" />
                        </nuxt-link>
                        <div class="flex flex-wrap justify-between items-center w-full">
                            <div>
                                <p class="color-contrast-higher"><nuxt-link :to="'/vinos/' + product.id + '/' + product.slug">{{ product.name }}</nuxt-link></p>
                                <p class="color-contrast-medium text-sm">{{ product.cultivo }}</p>
                            </div>
                            <div>
                                <p class="text-lg lg:text-base text-contrast-higher">{{product.price * product.amount}}€</p>
                                <p class="text-sm lg:text-base text-contrast-medium mt-1 lg:mt-1.5">{{'x' + product.amount}}</p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>

            <footer class="order-summary__footer bg-light padding-x-sm padding-bottom-sm">
                <div class="margin-y-sm padding-y-sm border-top border-bottom">
                    <div class="flex flex-column flex-row@md gap-xxs">
                        <input 
                            aria-label="Código de descuento" 
                            class="form-control flex-grow min-width-0" 
                            v-model="discountName" 
                            type="text" 
                            placeholder="Código de descuento"
                            :disabled="discountExist"
                        >
                        <button @click="handleDescaunt" class="btn btn--subtle">Aplicar</button>
                    </div>
                    <Alert 
                        v-if="discountDontExist"
                        class="mt-2" 
                        :headline="'Error'"
                        :type="'error'"
                        :message="'El código de descuento no existe.'"
                    />
                    <Alert 
                        v-if="discountExist"
                        class="mt-2" 
                        :headline="'Exito'"
                        :type="'success'"
                        :message="'Aplicado el código de descuento!'"
                    />
                </div>

                <ul class="text-sm flex flex-column gap-xxs">
                    <li class="flex justify-between"><i>IVA</i> <i>{{porIVA}}</i></li>
                    <li class="flex justify-between"><i>Envio</i> <i>{{precioEnvio}}</i></li>
                    <li v-if="discountExist && sumaFinalConDescuento !== null" class="flex justify-between font-bold text-lg"><i>Total</i> <i>{{sumaFinalConDescuento}}€</i></li>
                    <li v-else class="flex justify-between font-bold text-lg"><i>Total</i> <i>{{sumaFinal}}€</i></li>
                </ul>
                <div class="mt-10" ref="paypal"></div>
                <Alert 
                    v-if="buyError"
                    class="mt-2" 
                    :headline="'Error'"
                    :type="'error'"
                    :message="errorMessage"
                />
            </footer>
        </div>
        <div v-else>
            <p class="text-center">No hay productos en el carrito</p>
        </div>
    </aside>
</template>

<script>
import { mapState } from 'vuex'
export default {
    props: {
        addressData: {
            type: Object,
            default: () => {}
        },
        handleFormValid: {
            type: Function,
            default: () => {}
        }
    },
    data () {
            return {
                loaded: false,
                productsWanna: [],
                buyError: false,
                discountName: '',
                discountDontExist: false,
                discountExist: false,
                sumaFinalConDescuento: null,
                precioEnvio: 0,
                porIVA: '21%',
                errorMessage: 'Ha habido un error en el envío de la orden, por favor, inténtelo de nuevo más tarde'
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
        },
        discountDontExist: {
            handler: function (val) {
                if(val) {
                    setTimeout(() => {
                        this.discountDontExist = false;
                    }, 3000);
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
                    return (
                        {
                            bodega: element.bodegas.data.attributes.title,
                            categoria: element.category.data.attributes.title,
                            productID: element.id,
                            imgURL: element.feature.data.attributes.formats.thumbnail.url,
                            name: element.name,
                            price: element.price,
                            amount: element.amount
                        }
                    );
                });
            this.loaded = true;
            //Aqui se crea el boton de paypal
            window.paypal
                .Buttons({
                    fundingSource: paypal.FUNDING.PAYPAL,
                    createOrder: (data, actions) => {
                        this.handeFormValidator();
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
                    await this.$axios.post("/api/orders?populate=*", {
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
                            discount: this.discountName,
                            enviado: false,
                            precioEnvio: this.precioEnvio
                        }
                        }).then((response) => {
                            if(response) {
                                this.handleUpdateStock();
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
                    if(err.message = 'Cannot read properties of undefined') {
                        this.errorMessage = 'Por favor completa todos los campos';
                    } 
                    console.log(err.message)
                }
                })
                .render(this.$refs.paypal);
            }
        },
        //COMPROBAR SI EXISTE DESCUENTO
        async handleDescaunt(e) {
            e.preventDefault();
            await this.$axios.get("/api/discounts?filters[name][$eq]=" + this.discountName).then((response) => {
                if(response) {
                    if(response.data.data) {
                        this.discountDontExist = false;
                        this.discountExist = true;
                        const discountPorc = response.data.data.shift().attributes.percentage
                        this.sumaFinalConDescuento = this.sumaFinal - (this.sumaFinal * discountPorc / 100);
                    }
                }
            }).catch(() => {
                this.discountExist = false;
                this.discountDontExist = true;
            });
        },
        //VALIDAR FORMULARIO
        handeFormValidator () {
           this.handleFormValid()
        },
        //ACUTALIZAR STOCK
        handleUpdateStock() {
            try {
                this.productsWanna.forEach(element => {
                    this.$axios.get("/api/products/" + element.productID).then((response) => {
                        if(response) {
                            this.$axios.put("/api/products/" + element.productID, {
                                data: {
                                    available: response.data.data.attributes.available - element.amount
                                }
                            })
                        }
                    })
                })
            } catch (error) {
                console.log(error)
            }
        },
    }
}
</script>
<style lang="scss">
    @import "~/assets/scss/summary.scss";
</style>