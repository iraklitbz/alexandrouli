<template>
 <fieldset class="mb-8 lg:mb-12">
    <legend class="form-legend font-bold">Dirección Facturación</legend>
      <div class="checkout__billing-info">
         <div class="grid grid-cols-12 gap-3 lg:gap-5">
             <div class="col-span-12 md:col-span-6">
                <ValidationProvider rules="required" v-slot="{ errors }">
                    <label class="form-label mb-1.5 lg:mb-2" for="checkout-billing-name">Nombre</label>
                    <input class="form-control w-full" v-model="fullNamer" type="text" placeholder="Jon Snow">
                    <error-message
                        :errors="errors[0]"
                    />
                </ValidationProvider>
            </div>

             <div class="col-span-12 md:col-span-6">
                    <label class="form-label mb-1.5 lg:mb-2" for="checkout-billing-company">Empresa (opcional)</label>
                    <input class="form-control w-full" v-model="company" type="text" placeholder="The Night's Watch">
            </div>

            <div class="col-span-12">
                <ValidationProvider rules="required" v-slot="{ errors }">
                    <label class="form-label mb-1.5 lg:mb-2" for="checkout-billing-address">Dirreción</label>
                    <input class="form-control w-full" v-model="address" type="text" placeholder="calle Winterfell 38, 3b">
                    <error-message
                            :errors="errors[0]"
                    />
                </ValidationProvider>
            </div>

             <div class="col-span-12 md:col-span-6">
                <ValidationProvider rules="required" v-slot="{ errors }">
                    <label class="form-label mb-1.5 lg:mb-2" for="checkout-billing-city">Ciudad</label>
                    <input class="form-control w-full" v-model="city" type="text" placeholder="Winterfell">
                    <error-message
                        :errors="errors[0]"
                    />
                </ValidationProvider>
            </div>

             <div class="col-span-12 md:col-span-6">
                <ValidationProvider rules="required" v-slot="{ errors }">
                    <label class="form-label mb-1.5 lg:mb-2" for="checkout-billing-state">Provincia</label>
                    <input class="form-control w-full" v-model="state" type="text" placeholder="North land">
                    <error-message
                            :errors="errors[0]"
                        />
                </ValidationProvider>
            </div>

             <div class="col-span-12 md:col-span-6">
                <label class="form-label mb-1.5 lg:mb-2" for="checkout-billing-country">Pais</label>

                <div class="select">
                    <select class="select__input btn btn--subtle appearance-none" name="checkout-billing-country" id="checkout-billing-country" disabled>
                        <option value="0">España</option>
                    </select>

                    <svg class="icon select__icon" aria-hidden="true" viewBox="0 0 16 16">
                    <polyline points="1 5 8 12 15 5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
                    </svg>
                </div>
            </div>

             <div class="col-span-12 md:col-span-6">
                <ValidationProvider rules="required|postcode" v-slot="{ errors }">
                    <label class="form-label mb-1.5 lg:mb-2" for="checkout-billing-postcode">Código postal</label>
                    <input class="form-control w-full" v-model="postcode" type="text" placeholder="19240">
                    <error-message
                        :errors="errors[0]"
                    />
                </ValidationProvider>
            </div>
        </div>
    </div>
</fieldset>
</template>
<script>
export default {
    name: 'BillAddress',
    data() {
        return {
            fullNamer: '',
            company: '',
            address: '',
            city: '',
            state: '',
            postcode: '',
        }
    },
    methods: {
        validate() {
            this.$validator.validateAll().then((result) => {
                if (result) {
                    this.$emit('nextStep', {
                        fullNamer: this.fullNamer,
                        company: this.company,
                        address: this.address,
                        city: this.city,
                        provincia: this.provincia,
                        postcode: this.postcode,
                    });
                }
            });
        },
    },
}
</script>
