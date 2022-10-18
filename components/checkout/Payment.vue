<template>
    <div>
            <fieldset class="mb-5 lg:mb-8">
            <legend class="form-legend font-bold mb-1.5 lg:mb-2">Payment Method</legend>

            <div class="choice-accordion  js-choice-accordion" data-animation="on">

            <div class="choice-accordion__item">
                <!-- fallback -->
                <div class="choice-accordion__fallback js-choice-accordion__fallback">
                <input type="radio" name="check-pay-method" id="check-pay-method-card" checked>
                <label for="check-pay-method-card">Credit Card</label>
                </div>

                <!-- control -->
                <div class="choice-accordion__btn p-3 lg:p-5 js-choice-accordion__btn" aria-hidden="true">
                <div class="choice-accordion__input choice-accordion__input--radio">
                    <svg class="icon" viewBox="0 0 16 16">
                    <circle fill="currentColor" cx="8" cy="8" r="4" />
                    </svg>
                </div>

                <p class="text-contrast-higher select-none">Credit Card</p>
                </div>

                <!-- panel -->
                <div class="choice-accordion__panel js-choice-accordion__panel">
                <div class="grid grid-cols-12 gap-3 lg:gap-5 p-3 lg:p-5">
                    <div class="col-span-12">
                    <label class="form-label mb-1.5 lg:mb-2" for="checkCardNumber">Card Number</label>
                    <input class="form-control w-full" type="text" name="checkCardNumber" id="checkCardNumber" required>
                    </div>

                    <div class="col-span-12">
                    <label class="form-label mb-1.5 lg:mb-2" for="checkCardName">Name on Card</label>
                    <input class="form-control w-full" type="text" name="checkCardName" id="checkCardName" required>
                    </div>

                    <div class="col-span-12 md:col-span-6">
                    <label class="form-label mb-1.5 lg:mb-2" for="checkCardExpiration">Expiration date (MM/YY)</label>
                    <input class="form-control w-full" type="text" name="checkCardExpiration" id="checkCardExpiration" required>
                    </div>

                    <div class="col-span-12 md:col-span-6">
                    <label class="form-label mb-1.5 lg:mb-2" for="checkCardSecCode">Security code</label>
                    <input class="form-control w-full" type="text" name="checkCardSecCode" id="checkCardSecCode" required>
                    </div>
                </div>
                </div>

            </div>

            <div class="choice-accordion__item">
                <!-- fallback -->
                <div class="choice-accordion__fallback js-choice-accordion__fallback">
                <input type="radio" name="check-pay-method" id="check-pay-method-paypal">
                <label for="check-pay-method-paypal">Paypal</label>
                </div>

                <!-- control -->
                <div class="choice-accordion__btn p-3 lg:p-5 js-choice-accordion__btn" aria-hidden="true">
                <div class="choice-accordion__input choice-accordion__input--radio">
                    <svg class="icon" viewBox="0 0 16 16">
                    <circle fill="currentColor" cx="8" cy="8" r="4" />
                    </svg>
                </div>

                <p class="text-contrast-higher select-none">Paypal</p>
                </div>

            </div>

            </div>
        </fieldset>
        <div class="fixed bottom-0 left-0 w-full py-6 bg-contrast-lower bg-opacity-20">
            <div class="w-full flex gap-4 mx-auto max-w-xl">
                <button @click="prevStep()" class="btn btn--subtle w-2/4">Go back</button>
                <button @click="nextStep()" class="btn btn--primary w-2/4">Continue to Delivery &rarr;</button>
            </div>
        </div>
    </div>
</template>

<script>
    import choice from "~/plugins/choice-accordeon.js";
    export default {
        props: {
            step: {
                type: Number,
                default: null
            }
        },
        mounted() {
            choice()
        },
         methods: {
            nextStep() {
                this.$store.commit('steps/SET_NEXT_STEPS', this.step )
            },
            prevStep() {
                this.$store.commit('steps/SET_PREV_STEPS', this.step )
            }
        }
    }
</script>
