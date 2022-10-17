<template>
  <div>
    <Header />
    <section class="cart">
        <div class="w-[calc(100%_-_2.5rem)] lg:w-[calc(100%_-_4rem)] mx-auto max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-7xl py-8 lg:py-12">
            <div class="mb-8 lg:mb-12 text-center">
            <h1>Your Cart</h1>
            </div>

            <div class="grid grid-cols-12 gap-5 lg:gap-8">
            <div class="col-span-12 lg:col-span-8">
                <!-- cart products 👇 -->
                <ol class="mb-5 lg:mb-8" aria-label="Products in your cart">
                <li class="cart__product flex py-3 lg:py-5">
                    <div class="cart__product-img mr-3 lg:mr-5">
                    <a href="#0" class="rounded shadow-lg"><img src="https://codyhouse.co/app/assets/img/cart-img-1.jpg" alt="Image description"></a>
                    </div>

                    <div class="cart__product-info">
                    <div class="text-component text-space-y-sm">
                        <h2 class="text-lg lg:text-2xl"><a href="#0" class="text-inherit">Product One</a></h2>
                        <p class="text-sm lg:text-base text-contrast-medium">Color: Black, Size: M</p>
                    </div>

                    <div class="cart__product-tot">
                        <div class="select cart__select">
                        <select class="select__input btn btn--subtle appearance-none" name="select-product-qty-1" id="select-product-qty-1" data-label="Select product quantity">
                            <option value="0">1</option>
                            <option value="1">2</option>
                            <option value="2">3</option>
                        </select>

                        <svg class="icon select__icon" aria-hidden="true" viewBox="0 0 12 12"><polyline points="1 3.5 6 8.5 11 3.5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/></svg>
                        </div>

                        <div>
                        <p class="text-lg lg:text-2xl"><span class="sr-only">Price:</span>$49.00</p>

                        <button class="cart__remove-btn mt-1.5 lg:mt-2">Remove</button>
                        </div>
                    </div>
                    </div>
                </li>

                <li class="cart__product flex py-3 lg:py-5">
                    <div class="cart__product-img mr-3 lg:mr-5">
                    <a href="#0" class="rounded shadow-lg"><img src="https://codyhouse.co/app/assets/img/cart-img-1.jpg" alt="Image description"></a>
                    </div>

                    <div class="cart__product-info">
                    <div class="text-component text-space-y-sm">
                        <h2 class="text-lg lg:text-2xl"><a href="#0" class="text-inherit">Product Two</a></h2>
                        <p class="text-sm lg:text-base text-contrast-medium">Color: Black, Size: M</p>
                    </div>

                    <div class="cart__product-tot">
                        <div class="select cart__select">
                        <select class="select__input btn btn--subtle appearance-none" name="select-product-qty-2" id="select-product-qty-2" data-label="Select product quantity">
                            <option value="0">1</option>
                            <option value="1">2</option>
                            <option value="2">3</option>
                        </select>

                        <svg class="icon select__icon" aria-hidden="true" viewBox="0 0 12 12"><polyline points="1 3.5 6 8.5 11 3.5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/></svg>
                        </div>

                        <div>
                        <p class="text-lg lg:text-2xl"><span class="sr-only">Price:</span>$49.00</p>

                        <button class="cart__remove-btn mt-1.5 lg:mt-2">Remove</button>
                        </div>
                    </div>
                    </div>
                </li>
                </ol>

            </div>

            <div class="col-span-12 lg:col-span-4">
                <!-- cart subtotal 👇 -->
                <div class="cart__subtotal">
                <p class="flex justify-between"><span>Subtotal:</span> <span>$98.00</span></p>
                <nuxt-link to="/checkout" class="btn btn--primary text-[1.2em] w-full my-2 lg:my-3">Checkout &rarr;</nuxt-link>
                <p class="text-contrast-medium text-sm lg:text-base text-center hidden lg:block">Shipping &amp; taxes calculated at checkout</p>
                </div>
            </div>
            </div>
        </div>
        </section>
  </div>
</template>


<style>
:root {
    --cart-product-image-size: 96px;
}
    @media (min-width: 64rem) {
    :root {
        --cart-product-image-size: 128px;
    }
    }

    .cart {
    position: relative;
    z-index: 1;
    }

    .cart__product {
        @apply border-b border-contrast-lower;
    }
    .cart__product:first-child {
        @apply border-t border-contrast-lower;
    }

    .cart__product-img {
    width: var(--cart-product-image-size);
    flex-shrink: 0;
    }
    .cart__product-img a, .cart__product-img img {
    display: block;
    width: 100%;
    }
    .cart__product-img a {
    overflow: hidden;
    transition: opacity 0.2s;
    }
    .cart__product-img a:hover {
    opacity: 0.85;
    }

    .cart__product-info {
    flex-grow: 1;
    display: grid;
    @apply gap-2 lg:gap-3;
    }

    .cart__product-tot {
    display: grid;
    @apply gap-2 lg:gap-3;
    }

    .cart__select {
    --select-icon-size: 12px;
    --select-icon-right-margin: 0.75rem;
    --select-text-icon-gap: 0.25rem;
    @apply text-sm lg:text-base;
    width: 6em;
    }
    @media (min-width: 64rem) {
    .cart__select {
        --select-icon-right-margin: 1.125rem;
        --select-text-icon-gap: 0.375rem;
    }
    }

    .cart__remove-btn {
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
    .cart__remove-btn:hover {
    text-decoration: underline;
    }
    .cart__remove-btn:focus {
    @apply outline-2 outline outline-primary/20;
    outline-offset: 2px;
    }

    .cart__gift-message {
    width: 100%;
    @apply mt-1.5 lg:mt-2;
    @apply mt-3 lg:mt-5;
    display: none;
    }

    .cart__gift .radio:checked ~ .cart__gift-message {
    display: block;
    }

    @media (min-width: 32rem) {
    .cart__product-info {
        grid-template-columns: 1fr auto;
        @apply gap-5 lg:gap-8;
        justify-content: space-between;
        align-items: start;
    }

    .cart__product-tot {
        text-align: right;
    }

    .cart__select {
        margin-left: auto;
    }
    }
    @media (min-width: 48rem) {
    .cart__product, .cart__product-info {
        align-items: center;
    }

    .cart__product-tot {
        grid-template-columns: auto minmax(6em, auto);
        @apply gap-3 lg:gap-5;
    }

    .cart__select {
        align-self: start;
    }
    }
    @media (min-width: 64rem) {
    .cart__subtotal {
        position: -webkit-sticky;
        position: sticky;
        @apply top-5 lg:top-8;
        @apply bg-floor-light;
        @apply shadow-inner-sm;
        @apply rounded;
        @apply p-3 lg:p-5;
    }
    }
</style>
