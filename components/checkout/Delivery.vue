<template>
    <div>
         <ValidationObserver ref="form">
            <fieldset class="mb-8 lg:mb-12">
                <legend class="form-legend font-bold mb-1.5 lg:mb-2">Delivery Address</legend>
                <div class="grid grid-cols-12 gap-3 lg:gap-5">

                    <div class="col-span-12 md:col-span-6">
                        <ValidationProvider rules="required" v-slot="{ errors }">
                            <label class="form-label mb-1.5 lg:mb-2" for="checkout-delivery-name">Full Name</label>
                            <input class="form-control w-full" v-model="fullName" type="text" placeholder="Jon Snow">
                            <error-message
                                :errors="errors[0]"
                            />
                        </ValidationProvider>
                    </div>
                    <div class="col-span-12 md:col-span-6">
                        <label class="form-label mb-1.5 lg:mb-2" for="checkout-delivery-company">Company (optional)</label>
                        <input class="form-control w-full" v-model="company" type="text" placeholder="The Night's Watch">
                    </div>

                    <div class="col-span-12">
                        <ValidationProvider rules="required" v-slot="{ errors }">
                            <label class="form-label mb-1.5 lg:mb-2" for="checkout-delivery-address">Address</label>
                            <input class="form-control w-full" v-model="address" type="text" placeholder="calle Winterfell 38, 3b">
                            <error-message
                                :errors="errors[0]"
                            />
                        </ValidationProvider>
                    </div>

                <div class="col-span-12 md:col-span-6">
                    <ValidationProvider rules="required" v-slot="{ errors }">
                        <label class="form-label mb-1.5 lg:mb-2" for="checkout-delivery-city">City</label>
                        <input class="form-control w-full" v-model="city" type="text" placeholder="Winterfell">
                        <error-message
                            :errors="errors[0]"
                        />
                    </ValidationProvider>
                </div>

                <div class="col-span-12 md:col-span-6">
                    <label class="form-label mb-1.5 lg:mb-2" for="checkout-delivery-state">State (optional)</label>
                    <input class="form-control w-full" v-model="city" type="text" placeholder="North land">
                </div>

                <div class="col-span-12 md:col-span-6">
                    <label class="form-label mb-1.5 lg:mb-2" for="checkout-delivery-country">Country</label>

                    <div class="select">
                    <select class="select__input btn btn--subtle appearance-none" name="checkout-delivery-country" id="checkout-delivery-country" disabled>
                        <option value="0">Spain</option>
                    </select>

                    <svg class="icon select__icon" aria-hidden="true" viewBox="0 0 16 16">
                        <polyline points="1 5 8 12 15 5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
                    </svg>
                    </div>
                </div>

                <div class="col-span-12 md:col-span-6">
                    <ValidationProvider rules="required|postcode" v-slot="{ errors }">
                        <label class="form-label mb-1.5 lg:mb-2" for="checkout-delivery-postcode">Postcode</label>
                        <input class="form-control w-full" v-model="postcode" type="text" placeholder="19240">
                        <error-message
                            :errors="errors[0]"
                        />
                    </ValidationProvider>
                </div>

                <div class="col-span-12">
                     <ValidationProvider rules="phone" v-slot="{ errors }">
                        <label class="form-label mb-1.5 lg:mb-2" for="checkout-delivery-tel">Phone number (optional)</label>
                        <input class="form-control w-full" v-model="phone" type="tel" placeholder="000 000 000">
                        <error-message
                            :errors="errors[0]"
                        />
                    </ValidationProvider>
                </div>
                </div>
            </fieldset>

            <!-- delivery options -->
            <fieldset class="mb-8 lg:mb-12">
                <legend class="form-legend font-bold mb-1.5 lg:mb-2">Delivery Options</legend>

                <div class="choice-btns flex flex-col gap-1.5 lg:gap-2 js-choice-btns">

                <div class="choice-btn p-3 lg:p-5 js-choice-btn">
                    <!-- fallback -->
                    <div class="choice-btn__fallback">
                        <input type="radio" v-model="delivery" value="Standard delivery" name="check-delivery-options" id="check-delivery-option-1" checked>
                        <label for="check-delivery-option-1">Standard delivery, 4-5 days, $9.00</label>
                    </div>

                    <!-- custom input -->
                    <div class="choice-btn__grid" aria-hidden="true">
                        <div class="choice-btn__input choice-btn__input--radio">
                            <svg class="icon" viewBox="0 0 16 16">
                            <circle fill="currentColor" cx="8" cy="8" r="4" />
                            </svg>
                        </div>

                    <div class="flex flex-wrap gap-2 lg:gap-3 justify-between">
                        <div>
                            <p class="text-contrast-higher">Standard delivery</p>
                            <p class="text-contrast-medium text-sm lg:text-base">4-5 days</p>
                        </div>

                        <p class="text-contrast-higher">$9.00</p>
                    </div>
                    </div>
                </div>

                <div class="choice-btn p-3 lg:p-5 js-choice-btn">
                    <!-- fallback -->
                    <div class="choice-btn__fallback">
                        <input type="radio" v-model="delivery" value="Express delivery" name="check-delivery-options" id="check-delivery-option-2">
                        <label for="check-delivery-option-2">Express delivery, 1-2 days, $19.00</label>
                    </div>

                    <!-- custom input -->
                    <div class="choice-btn__grid" aria-hidden="true">
                        <div class="choice-btn__input choice-btn__input--radio">
                            <svg class="icon" viewBox="0 0 16 16">
                                <circle fill="currentColor" cx="8" cy="8" r="4" />
                            </svg>
                        </div>

                        <div class="flex flex-wrap gap-2 lg:gap-3 justify-between">
                            <div>
                            <p class="text-contrast-higher">Express delivery</p>
                                <p class="text-contrast-medium text-sm lg:text-base">1-2 days</p>
                            </div>

                            <p class="text-contrast-higher">$19.00</p>
                        </div>
                    </div>
                </div>

                </div>
            </fieldset>

            <!-- billing address -->
            <fieldset class="mb-5 lg:mb-8">
                <legend class="form-legend font-bold mb-1.5 lg:mb-2">Billing Address</legend>

                <div class="checkout-v2__billing-checkbox">
                <div>
                    <input
                        class="checkbox js-billing-checkbox"
                        type="checkbox"
                        id="autofill-billing-info"
                        :checked="billAddressSame"
                        @change="$store.commit('checkout/SET_BILLING_ADDRESS_SAME')"
                    >
                    <label for="autofill-billing-info">Same as delivery address</label>
                </div>
                </div>
                <bill-address
                    v-if="!billAddressSame"
                />
            </fieldset>
        </ValidationObserver>
        <div class="text-right border-t border-contrast-higher/10 pt-5 lg:pt-8">
            <a @click="prevStep()" class="btn btn--primary w-full lg:w-auto pointer">Go back</a>
            <a @click="validateForm()" class="btn btn--primary w-full lg:w-auto pointer">Continue to Delivery &rarr;</a>
        </div>
    </div>
</template>
<script>
import select from "~/plugins/select.js";
import choice from "~/plugins/choice-button.js";
export default {
  props: {
        step: {
            type: Number,
            default: null
        }
    },
    computed: {
        fullName: {
            get() {
                return this.$store.state.checkout.name
            },
            set(value) {
                this.$store.commit('checkout/SET_NAME', value)
            }
        },
        company: {
            get() {
                return this.$store.state.checkout.company
            },
            set(value) {
                this.$store.commit('checkout/SET_COMPANY', value)
            }
        },
        address: {
            get() {
                return this.$store.state.checkout.address
            },
            set(value) {
                this.$store.commit('checkout/SET_ADDRESS', value)
            }
        },
        city: {
            get() {
                return this.$store.state.checkout.city
            },
            set(value) {
                this.$store.commit('checkout/SET_CITY', value)
            }
        },
        state: {
            get() {
                return this.$store.state.checkout.state
            },
            set(value) {
                this.$store.commit('checkout/SET_STATE', value)
            }
        },
        postcode: {
            get() {
                return this.$store.state.checkout.postcode
            },
            set(value) {
                this.$store.commit('checkout/SET_POSTCODE', value)
            }
        },
        phone: {
            get() {
                return this.$store.state.checkout.phone
            },
            set(value) {
                this.$store.commit('checkout/SET_PHONE', value)
            }
        },
        delivery: {
            get() {
                return this.$store.state.checkout.delivery
            },
            set(value) {
                this.$store.commit('checkout/SET_DELIVERY', value)
            }
        },
        billAddressSame: {
            get() {
                return this.$store.state.checkout.billAddressSame
            }
        },
    },
    mounted() {
        select()
        choice()
        var billingCheckBox = document.getElementsByClassName('js-billing-checkbox');
        if(billingCheckBox.length > 0) {
            var billingInfo = document.getElementsByClassName('js-billing-info');
            if(billingInfo.length == 0) return;
            resetBillingInfo(billingCheckBox[0], billingInfo[0]);

            billingCheckBox[0].addEventListener('change', function(){
            resetBillingInfo(billingCheckBox[0], billingInfo[0]);
            });
        }

        function resetBillingInfo(input, content) {
            Util.toggleClass(content, 'hidden', input.checked);
        };
    },
    methods: {
        validateForm() {
            this.$refs.form.validate().then((valid) => {
                if (valid && this.billAddressSame) {
                    this.$store.commit('checkout/SET_BILLING_NAME', '')
                    this.$store.commit('checkout/SET_BILLING_COMPANY', '')
                    this.$store.commit('checkout/SET_BILLING_ADDRESS', '')
                    this.$store.commit('checkout/SET_BILLING_CITY', '')
                    this.$store.commit('checkout/SET_BILLING_STATE', '')
                    this.$store.commit('checkout/SET_BILLING_POSTCODE', '')
                    this.$store.commit('steps/SET_NEXT_STEPS', this.step )
                } else if (valid && !this.billAddressSame) {
                    this.$store.commit('steps/SET_NEXT_STEPS', this.step )
                }
            })
        },
        prevStep() {
            this.$store.commit('steps/SET_PREV_STEPS', this.step )
        }
    }
}
</script>
<style lang="scss">
    @import "~/assets/scss/forms.scss";
    @import "~/assets/scss/choice.scss";
</style>

