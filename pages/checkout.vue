<template>
  <div>
    <Header />
    <section class="checkout-v2 relative z-1 py-12 lg:py-20">
        <div class="w-[calc(100%_-_2.5rem)] lg:w-[calc(100%_-_4rem)] mx-auto max-w-xl">
            <div class="mb-8 lg:mb-12">
            <h1 class="text-center">Checkout</h1>
            </div>

            <div class="mb-8 lg:mb-12">
                <Steps />
            </div>

            <form>
                <div v-for="(item, index) in steps" :key="index">
                    <component
                        v-if="item.current"
                        :is="item.component"
                        :steps="steps"
                        :step="item.step"
                        :current="item.current"
                        :completed="item.completed"
                    >
                    </component>
                </div>
            </form>
        </div>
        </section>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    name: 'CheckoutPage',
    data() {
        return {
        }
    },
    computed: {
        ...mapState({
                steps: state => state.steps.steps
        })
    }
}
</script>

<style scoped>
    .checkout-v2__billing-checkbox {
    display: none;
    }

    .checkout-v2__billing-checkbox {
    display: block;
    }
</style>
