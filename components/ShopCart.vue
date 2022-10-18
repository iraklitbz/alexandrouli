<template>
    <div
        class="drawer dr-cart"
        :class="toggleCart ? 'drawer--is-visible' : ''"
        >
        <div class="drawer__content bg-floor-light inner-glow shadow-lg flex flex-col" role="alertdialog" aria-labelledby="drawer-cart-title">
            <header class="flex items-center justify-between shrink-0 border-b border-contrast-lower px-3 lg:px-5 py-2 lg:py-3">
            <h1 id="drawer-cart-title" class="text-base lg:text-xl truncate" >Your Cart (2)</h1>

            <button @click="handleCloseCart" class="drawer__close-btn js-drawer__close">
                <svg class="icon w-[16px] h-[16px]" viewBox="0 0 16 16"><title>Close drawer panel</title><g stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"><line x1="13.5" y1="2.5" x2="2.5" y2="13.5"></line><line x1="2.5" y1="2.5" x2="13.5" y2="13.5"></line></g></svg>
            </button>
            </header>

            <div class="drawer__body px-3 lg:px-5 pb-3 lg:pb-5">
            <ol>
                <li class="dr-cart__product">
                <a href="#0" class="dr-cart__img"><img src="https://codyhouse.co/app/assets/img/cart-drawer-img-1.jpg" alt="Image description"></a>

                <div>
                    <h2 class="text-sm lg:text-base"><a href="#0" class="text-inherit">Product One</a></h2>
                    <p class="text-sm lg:text-base text-contrast-medium mt-1 lg:mt-1.5">Color: Black, Size: M</p>

                    <div class="mt-1 lg:mt-1.5">
                    <div class="select dr-cart__select">
                        <select class="select__input btn btn--subtle appearance-none" name="select-product-qty-1" id="select-product-qty-1" data-label="Select product quantity">
                        <option value="0">1</option>
                        <option value="1">2</option>
                        <option value="2">3</option>
                        </select>

                        <svg class="icon select__icon" aria-hidden="true" viewBox="0 0 16 16"><polyline points="1 5 8 12 15 5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/></svg>
                    </div>
                    </div>
                </div>

                <div class="text-right">
                    <p class="text-sm lg:text-base text-contrast-higher">$49.00</p>
                    <button class="dr-cart__remove-btn mt-1 lg:mt-1.5">Remove</button>
                </div>
                </li>

                <li class="dr-cart__product">
                <a href="#0" class="dr-cart__img"><img src="https://codyhouse.co/app/assets/img/cart-drawer-img-1.jpg" alt="Image description"></a>

                <div>
                    <h2 class="text-sm lg:text-base"><a href="#0" class="text-inherit">Product Two</a></h2>
                    <p class="text-sm lg:text-base text-contrast-medium mt-1 lg:mt-1.5">Color: Black, Size: M</p>

                    <div class="mt-1 lg:mt-1.5">
                    <div class="select dr-cart__select">
                        <select class="select__input btn btn--subtle appearance-none" name="select-product-qty-2" id="select-product-qty-2" data-label="Select product quantity">
                        <option value="0">1</option>
                        <option value="1">2</option>
                        <option value="2">3</option>
                        </select>

                        <svg class="icon select__icon" aria-hidden="true" viewBox="0 0 16 16"><polyline points="1 5 8 12 15 5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/></svg>
                    </div>
                    </div>
                </div>

                <div class="text-right">
                    <p class="text-sm lg:text-base text-contrast-higher">$49.00</p>
                    <button class="dr-cart__remove-btn mt-1 lg:mt-1.5">Remove</button>
                </div>
                </li>
            </ol>
            </div>

            <footer class="px-3 lg:px-5 py-2 lg:py-3 border-t border-contrast-lower shrink-0">
                <p class="text-sm lg:text-base flex justify-between"><span>Subtotal:</span> <span>$98.00</span></p>
                <nuxt-link to="/checkout" class="btn btn--primary text-[1.2em] w-full mt-2 lg:mt-3">Checkout &rarr;</nuxt-link>
            </footer>
        </div>
        </div>
</template>
<script>

export default {
    props: {
        toggleCart: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        handleCloseCart() {
            let toggleCart = this.toggleCart
            toggleCart = !toggleCart
            this.$emit("update--close-toggle", toggleCart);
        }
    }
}
</script>

<style lang="scss">
  @import "~/assets/scss/_drawer.scss";
  .dr-cart__product {
  display: grid;
  grid-template-columns: 80px 1fr auto;
  @apply gap-2 lg:gap-3;
  align-items: start;
  @apply py-3 lg:py-5 px-0;
}
.dr-cart__product:not(:last-child) {
  @apply border-b border-contrast-lower;
}

.dr-cart__img {
  display: block;
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
  color: inherit;
  line-height: inherit;
  appearance: none;
  @apply text-sm lg:text-base;
  @apply text-primary;
  cursor: pointer;
}
.dr-cart__remove-btn:hover {
  text-decoration: underline;
}
.dr-cart__remove-btn:focus {
  @apply outline-2 outline outline-primary/20 outline-offset-2;
}
</style>
