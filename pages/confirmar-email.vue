<template>
    <section class="thank-you py-20 lg:py-32">
        <div class="w-[calc(100%_-_2.5rem)] lg:w-[calc(100%_-_4rem)] mx-auto max-w-lg md:max-w-3xl text-center">

            <div class="text-component">
            <h1 class="text-4xl lg:text-6xl">Corre de verificacion de emai</h1>
                <p class="text-contrast-medium">Hemos registrado su email correctamente</p>

                <p class="flex flex-wrap flex-col sm:flex-row gap-1.5 lg:gap-2 justify-center">
                    <nuxt-link class="btn btn--primary" to="/vinos/1">Tienda</nuxt-link>
                </p>
            </div>
        </div>
    </section>
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
