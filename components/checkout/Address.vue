<template>
    <div>
        <div class="col-span-12">
            <ValidationProvider rules="required" v-slot="{ errors }">
                <label class="form-label mb-1.5 lg:mb-2" for="checkout-billing-address">Nombre</label>
                <input class="form-control w-full" @change="handleAdressData" v-model="username" type="text" placeholder="Jon Snow">
                <error-message
                    class="mt-4"
                    :errors="errors[0]"
                />
            </ValidationProvider>
        </div>
        <div class="col-span-12 mt-3">
            <ValidationProvider rules="required" v-slot="{ errors }">
                <label class="form-label mb-1.5 lg:mb-2" for="checkout-billing-address">Calle</label>
                <input class="form-control w-full" @change="handleAdressData" v-model="address" type="text" placeholder="calle Winterfell 38, 3b">
                <error-message
                    class="mt-4"
                    :errors="errors[0]"
                />
            </ValidationProvider>
        </div>

        <div class="col-span-12 md:col-span-6 mt-3">
            <ValidationProvider rules="required" v-slot="{ errors }">
                <label class="form-label mb-1.5 lg:mb-2" for="checkout-billing-city">Ciudad</label>
                <input class="form-control w-full" @change="handleAdressData" v-model="city" type="text" placeholder="Winterfell">
                <error-message
                    class="mt-4"
                    :errors="errors[0]"
                />
            </ValidationProvider>
        </div>

        <div class="col-span-12 md:col-span-6 mt-3">
            <ValidationProvider rules="required" v-slot="{ errors }">
                <label class="form-label mb-1.5 lg:mb-2" for="checkout-billing-state">Provincia</label>
                <input class="form-control w-full" @change="handleAdressData" v-model="provincia" type="text" placeholder="North land">
                <error-message
                    class="mt-4"
                    :errors="errors[0]"
                />
            </ValidationProvider>
        </div>

        <div class="col-span-12 md:col-span-6 mt-3">
            <label class="form-label mb-1.5 lg:mb-2" for="checkout-billing-country">Pais</label>

            <div class="select">
                <select class="select__input btn btn--subtle appearance-none" name="checkout-billing-country" id="checkout-billing-country" disabled>
                    <option value="0">ES</option>
                </select>

                <svg class="icon select__icon" aria-hidden="true" viewBox="0 0 16 16">
                <polyline points="1 5 8 12 15 5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
                </svg>
            </div>
        </div>

        <div class="col-span-12 md:col-span-6 mt-3">
            <ValidationProvider rules="required|postcode" v-slot="{ errors }">
                <label class="form-label mb-1.5 lg:mb-2" for="checkout-billing-postcode">Código postal</label>
                <input class="form-control w-full" @change="handleAdressData" v-model="postcode" type="text" placeholder="19240">
                <error-message
                    class="mt-4"    
                    :errors="errors[0]"
                />
            </ValidationProvider>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        ID: {
            type: Number,
            default: null
        }
    },
    data() {
        return {
            username: "",
            address: "",
            city: "",
            provincia: "",
            postcode: "",
            addressData: {}
        }
    },
    computed: {
      currentUser() {
            return this.$store.state.user
        }
    },
    mounted() {
        this.handleGetAdress()
    },
    methods: {
        handleAdressData() {
            this.$emit('update-address', {
                username: this.username,
                address: this.address,
                city: this.city,
                provincia: this.provincia,
                postcode: this.postcode
            })
        },
        async handleGetAdress() {
            try {
                await this.$fire.firestore.collection('direcciones').where("userID", "==", this.currentUser.uid).get().then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        this.username = doc.data().username,
                        this.address = doc.data().direccion,
                        this.city = doc.data().ciudad,
                        this.provincia = doc.data().provincia,
                        this.postcode = doc.data().postal
                    });
                })
            } catch (error) {
                console.log(error)
            }
        }
    }
}
</script>