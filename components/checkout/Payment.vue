<template>
    <div>
        <fieldset class="margin-bottom-lg@lg">
            <legend class="form-legend font-bold">Payment Method</legend>

            <div class="choice-accordion  js-choice-accordion" data-animation="on">

            <div class="choice-accordion__item">
                <!-- fallback -->
                <div class="choice-accordion__fallback js-choice-accordion__fallback">
                <input type="radio" name="check-pay-method" id="check-pay-method-card" checked>
                <label for="check-pay-method-card">Credit Card</label>
                </div>

                <!-- control -->
                <div class="choice-accordion__btn padding-sm js-choice-accordion__btn" aria-hidden="true">
                <div class="choice-accordion__input choice-accordion__input--radio">
                    <svg class="icon" viewBox="0 0 16 16">
                    <circle fill="currentColor" cx="8" cy="8" r="4" />
                    </svg>
                </div>

                <p class="color-contrast-higher user-select-none">Credit Card</p>
                </div>

                <!-- panel -->
                <div class="choice-accordion__panel js-choice-accordion__panel">
                <div class="grid gap-sm padding-sm">
                    <div>
                    <label class="form-label margin-bottom-xxs" for="checkCardNumber">Card Number</label>
                    <input class="form-control width-100%" type="text" name="checkCardNumber" id="checkCardNumber" required>
                    </div>

                    <div>
                    <label class="form-label margin-bottom-xxs" for="checkCardName">Name on Card</label>
                    <input class="form-control width-100%" type="text" name="checkCardName" id="checkCardName" required>
                    </div>

                    <div class="col-6@sm">
                    <label class="form-label margin-bottom-xxs" for="checkCardExpiration">Expiration date (MM/YY)</label>
                    <input class="form-control width-100%" type="text" name="checkCardExpiration" id="checkCardExpiration" required>
                    </div>

                    <div class="col-6@sm">
                    <label class="form-label margin-bottom-xxs" for="checkCardSecCode">Security code</label>
                    <input class="form-control width-100%" type="text" name="checkCardSecCode" id="checkCardSecCode" required>
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
                <div class="choice-accordion__btn padding-sm js-choice-accordion__btn" aria-hidden="true">
                <div class="choice-accordion__input choice-accordion__input--radio">
                    <svg class="icon" viewBox="0 0 16 16">
                    <circle fill="currentColor" cx="8" cy="8" r="4" />
                    </svg>
                </div>

                <p class="color-contrast-higher user-select-none">Paypal</p>
                </div>

            </div>

            </div>
        </fieldset>
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
