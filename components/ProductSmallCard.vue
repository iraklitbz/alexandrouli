<template>
    <div class="dr-cart__product bg-white rounded-md mb-2">
        <nuxt-link v-if="product.feature.data && product.feature.data.attributes" :to="'/vinos/' + product.id + '/' + product.slug" class="rounded-lg shadow-md h-20 flex justify-center dr-cart__img">
            <img class="object-contain h-full" :src="product.feature.data.attributes.formats.thumbnail.url" :alt="product.name + ' image'">
        </nuxt-link>
        <nuxt-link  v-else :to="'/vinos/' + product.id + '/' + product.slug" class="rounded-lg shadow-md h-20 flex justify-center items-center dr-cart__img">
                <load-svg name="cross" class="w-10 h-10 text-contrast-low" />
        </nuxt-link>
        <div class="">
            <div class="flex justify-between items-center">
                <div>
                <h2 class="text-sm lg:text-base"><nuxt-link :to="'/vinos/' + product.id + '/' + product.slug" class="text-inherit">{{ product.name }}</nuxt-link></h2>
                <p class="text-sm lg:text-base text-contrast-medium mt-1 lg:mt-1.5">{{product.cultivo}}</p>
                </div>
                <div class="text-right">
                <p class="text-sm lg:text-base text-contrast-higher">{{product.price * product.amount}}€</p>
                <p class="text-sm lg:text-base text-contrast-medium mt-1 lg:mt-1.5">{{'x' + product.amount}}</p>
                </div>
            </div>
            <div class="flex justify-between items-center mt-3">
            <div class="number-input number-input--v2">
                <input class="form-control h-7 text-sm" type="number" name="product-qty-input"  min="0" max="100" :value="amount">

                <button 
                    class="flex items-center justify-center number-input__btn small number-input__btn--plus" aria-label="Increase Number"
                    :class="available <= amount ? 'number-input__btn--disabled' : ''"
                    @click="handleIncrase"
                    :disabled="available <= amount"
                >
                    <load-svg name="plus" class="text-black w-2" />
                </button>

                <button 
                    class="flex items-center justify-center number-input__btn small number-input__btn--minus" aria-label="Decrease Number"
                    :class="amount <= 1 ? 'number-input__btn--disabled' : ''"
                    @click="handleDecrase"
                    :disabled="amount <= 1"
                    >
                    <load-svg name="minus" class="text-black w-2" />
                </button>
            </div>
            <button @click="handleRemoveProduct(product.id)" class="text-error ml-auto text-sm dr-cart__remove-btn mt-1 lg:mt-1.5">
                <load-svg name="trash" class="w-5 text-error transition-all ease-in-out opacity-50 hover:opacity-100" />
            </button>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    props: {
        product: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
            price: null,
            originalPrice: null,
        }
    },
    computed: {
        ...mapState({
            products: state => state.cart.products
        }),
        amount() {
            return this.products.find(element => element.id === this.product.id) ? this.products.find(element => element.id === this.product.id).amount : 0;
        },
        available() {
            return this.products.find(element => element.id === this.product.id) ? this.products.find(element => element.id === this.product.id).available : 0;
        }
    },
    
    mounted() {
        this.price = this.product.price
        this.originalPrice = this.product.price
    },
    methods: {
        handleIncrase() {
            if(this.available > this.amount) {
                this.price = this.originalPrice + this.price
                this.handleAddToCart(this.amount + 1)
            }
        },
        handleDecrase() {
          if (this.amount > 1) {
            this.price = this.price - this.originalPrice
            this.handleAddToCart(this.amount - 1)
          }
        },
        handleRemoveProduct(id) {
            this.$store.commit('cart/SET_REMOVE_PRODUCTS', id)
        },
        handleAddToCart(amount) {
          this.$store.commit('cart/SET_PRODUCTS', {
            product: this.product,
            amount:  amount,
            id: this.product.id
          })
        }
    }
}
</script>
<style lang="scss">
.dr-cart__product {
  display: grid;
  grid-template-columns: 80px 1fr auto;
  @apply gap-2 lg:gap-3;
  align-items: center;
  @apply py-2 px-2;
}
.dr-cart__product:not(:last-child) {
  @apply border-b border-contrast-lower;
}

.dr-cart__img {
  overflow: hidden;
  @apply rounded;
  transition: 0.2s;
}
.dr-cart__img img {
  display: block;
}
.dr-cart__img:hover {
  opacity: 0.85;
}

.dr-cart__select {
  --select-icon-size: 0.85em;
  --select-icon-right-margin: 0.375rem;
  font-size: 0.875em;
  width: 3.6em;
}
@media (min-width: 64rem) {
  .dr-cart__select {
    --select-icon-right-margin: 0.5625rem;
  }
}
.dr-cart__select .select__input {
  @apply py-0.5 lg:py-1 px-1 lg:px-1.5;
}

.dr-cart__remove-btn {
  background-color: transparent;
  padding: 0;
  border: 0;
  border-radius: 0;
  line-height: inherit;
  appearance: none;
  cursor: pointer;
}
.dr-cart__remove-btn:hover {
  text-decoration: underline;
}
.dr-cart__remove-btn:focus {
  @apply outline-2 outline outline-primary/20 outline-offset-2;
}
.number-input--v2 .number-input__btn {
    &.small {
      --number-input-btn-width: 1em;
      --number-input-btn-height: 1em;
    }
}
</style>