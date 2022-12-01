<template>
    <div>
        <section class="thank-you py-20 lg:py-32">
            <div class="w-[calc(100%_-_2.5rem)] lg:w-[calc(100%_-_4rem)] mx-auto max-w-lg md:max-w-3xl text-center">
                <svg class="inline-block thank-you__icon mb-3 lg:mb-5" viewBox="0 0 80 80" aria-hidden="true"><g class="thank-you__icon-group"><circle class="fill-success" cx="40" cy="40" r="40"/><polyline points="21 41 33 53 59 27" fill="none" stroke="#fff" stroke-miterlimit="10" stroke-width="2"/></g></svg>

                <div class="text-component">
                <h1 class="text-4xl lg:text-6xl">Order Confirmed</h1>
                    <p class="text-contrast-medium">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi aliquid qui et saepe omnis ipsum amet quasi accusamus.</p>

                    <p class="flex flex-wrap flex-col sm:flex-row gap-1.5 lg:gap-2 justify-center">
                    <nuxt-link class="btn btn--subtle" to="/vinos">Continue Shopping</nuxt-link>
                    <a class="btn btn--primary" href="#0">Manage Order</a>
                    </p>
                </div>
            </div>
        </section>
        <MoreProducts />
    </div>
</template>
<style scoped>
    .thank-you {
    position: relative;
    z-index: 1;
    }

    .thank-you__icon {
    width: 80px;
    height: 80px;
    }

    .thank-you__icon-group {
    transform-origin: 50% 50%;animation: thank-you-icon 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);
            animation: thank-you-icon 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);
    }
    .thank-you__icon-group > *:last-child {
    transform-origin: 50% 50%;
    stroke-dashoffset: 55;
    stroke-dasharray: 55;
    -webkit-animation: thank-you-icon-check 0.5s cubic-bezier(0.215, 0.61, 0.355, 1) forwards;animation: thank-you-icon-check 0.5s cubic-bezier(0.215, 0.61, 0.355, 1) forwards;
    }

    @-webkit-keyframes thank-you-icon {
    from {
        transform: scale(0.5);
        opacity: 0;
    }
    to {
        transform: scale(1);
        opacity: 1;
    }
    }

    @keyframes thank-you-icon {
    from {
        transform: scale(0.5);
        opacity: 0;
    }
    to {
        transform: scale(1);
        opacity: 1;
    }
    }
    @-webkit-keyframes thank-you-icon-check {
    from {
        stroke-dashoffset: 55;
    }
    to {
        stroke-dashoffset: 0;
    }
    }
    @keyframes thank-you-icon-check {
    from {
        stroke-dashoffset: 55;
    }
    to {
        stroke-dashoffset: 0;
    }
    }
</style>
