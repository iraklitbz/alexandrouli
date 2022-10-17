<template>
    <section class="py-12 lg:py-20">
    <div class="w-[calc(100%_-_2.5rem)] lg:w-[calc(100%_-_4rem)] mx-auto max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-7xl">
        <div class="mb-5 lg:mb-8">
        <h1 class="text-center">Our Products</h1>
        </div>

        <div class="filter-nav filter-nav--v1 filter-nav--expanded js-filter-nav">
        <button class="btn btn--subtle hidden js-filter-nav__control" aria-label="Select a filter option" aria-controls="filter-nav">
            <span class="js-filter-nav__placeholder" aria-hidden="true">All Products</span>

            <svg class="icon w-[12px] h-[12px] ml-1.5 lg:ml-2" aria-hidden="true" viewBox="0 0 12 12"><polyline points="0.5 3.5 6 9.5 11.5 3.5" fill="none" stroke-width="1" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></polyline></svg>
        </button>

        <div class="filter-nav__wrapper js-filter-nav__wrapper" id="filter-nav">
            <nav class="filter-nav__nav justify-center js-filter-nav__nav">
            <ul class="filter-nav__list js-filter-nav__list" aria-controls="product-gallery">
                <li class="filter-nav__item">
                <button class="filter-nav__btn js-filter-nav__btn js-tab-focus" aria-current="true" data-filter="*">All Products</button>
                </li>

                <li class="filter-nav__item">
                <button class="filter-nav__btn js-filter-nav__btn js-tab-focus" data-filter="coffee-mug">Coffe mugs</button>
                </li>

                <li class="filter-nav__item">
                <button class="filter-nav__btn js-filter-nav__btn js-tab-focus" data-filter="tea-mug">Tea mugs</button>
                </li>

                <li class="filter-nav__item">
                <button class="filter-nav__btn js-filter-nav__btn js-tab-focus" data-filter="other">Others</button>
                </li>
            <li class="filter-nav__marker js-filter-nav__marker" aria-hidden="true"></li>
            </ul>

            <button class="filter-nav__close-btn hidden js-filter-nav__close-btn js-tab-focus" aria-label="Close navigation">
                <svg class="icon" viewBox="0 0 16 16" aria-hidden="true"><g stroke-width="1" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"><line x1="13.5" y1="2.5" x2="2.5" y2="13.5"></line><line x1="2.5" y1="2.5" x2="13.5" y2="13.5"></line></g></svg>
            </button>
            </nav>
        </div>
        </div>

        <div class="mt-5 lg:mt-8">
        <ul class="grid grid-cols-12 gap-3 lg:gap-5 js-filter" id="product-gallery">
            <li class="col-span-12 md:col-span-6 lg:col-span-4 js-filter__item" data-filter="coffee-mug">
            <div class="prod-card ">
                <nuxt-link to="/products/lorem" class="prod-card__img-link" aria-label="Description of the link">
                    <figure class="prod-card__img aspect-w-1 aspect-h-1">
                        <img src="https://codyhouse.co/app/assets/img/filter-product-gallery-img-1.jpg" alt="Product preview image">
                    </figure>
                </nuxt-link>

                <div class="p-3 lg:p-5 text-center">
                <h3><a class="text-inherit" href="#0">Product One</a></h3>

                <div class="mt-2 lg:mt-3">
                    <span class="prod-card__price">$79</span>
                </div>
                </div>
            </div>
            </li>

            <li class="col-span-12 md:col-span-6 lg:col-span-4 js-filter__item" data-filter="tea-mug">
            <div class="prod-card ">
                <a class="prod-card__img-link" href="#0" aria-label="Description of the link">
                <figure class="prod-card__img aspect-w-1 aspect-h-1">
                    <img src="https://codyhouse.co/app/assets/img/filter-product-gallery-img-2.jpg" alt="Product preview image">
                </figure>
                </a>

                <div class="p-3 lg:p-5 text-center">
                <h3><a class="text-inherit" href="#0">Product Two</a></h3>

                <div class="mt-2 lg:mt-3">
                    <span class="prod-card__price">$79</span>
                </div>
                </div>
            </div>
            </li>

            <li class="col-span-12 md:col-span-6 lg:col-span-4 js-filter__item" data-filter="tea-mug">
            <div class="prod-card ">
                <a class="prod-card__img-link" href="#0" aria-label="Description of the link">
                <figure class="prod-card__img aspect-w-1 aspect-h-1">
                    <img src="https://codyhouse.co/app/assets/img/filter-product-gallery-img-3.jpg" alt="Product preview image">
                </figure>
                </a>

                <div class="p-3 lg:p-5 text-center">
                <h3><a class="text-inherit" href="#0">Product Three</a></h3>

                <div class="mt-2 lg:mt-3">
                    <span class="prod-card__price">$79</span>
                </div>
                </div>
            </div>
            </li>

            <li class="col-span-12 md:col-span-6 lg:col-span-4 js-filter__item" data-filter="other">
            <div class="prod-card ">
                <a class="prod-card__img-link" href="#0" aria-label="Description of the link">
                <figure class="prod-card__img aspect-w-1 aspect-h-1">
                    <img src="https://codyhouse.co/app/assets/img/filter-product-gallery-img-4.jpg" alt="Product preview image">
                </figure>
                </a>

                <div class="p-3 lg:p-5 text-center">
                <h3><a class="text-inherit" href="#0">Product Four</a></h3>

                <div class="mt-2 lg:mt-3">
                    <span class="prod-card__price">$79</span>
                </div>
                </div>
            </div>
            </li>

            <li class="col-span-12 md:col-span-6 lg:col-span-4 js-filter__item" data-filter="coffee-mug">
            <div class="prod-card ">
                <a class="prod-card__img-link" href="#0" aria-label="Description of the link">
                <figure class="prod-card__img aspect-w-1 aspect-h-1">
                    <img src="https://codyhouse.co/app/assets/img/filter-product-gallery-img-5.jpg" alt="Product preview image">
                </figure>
                </a>

                <div class="p-3 lg:p-5 text-center">
                <h3><a class="text-inherit" href="#0">Product Five</a></h3>

                <div class="mt-2 lg:mt-3">
                    <span class="prod-card__price">$79</span>
                </div>
                </div>
            </div>
            </li>

            <li class="col-span-12 md:col-span-6 lg:col-span-4 js-filter__item" data-filter="tea-mug">
            <div class="prod-card ">
                <a class="prod-card__img-link" href="#0" aria-label="Description of the link">
                <figure class="prod-card__img aspect-w-1 aspect-h-1">
                    <img src="https://codyhouse.co/app/assets/img/filter-product-gallery-img-6.jpg" alt="Product preview image">
                </figure>
                </a>

                <div class="p-3 lg:p-5 text-center">
                <h3><a class="text-inherit" href="#0">Product Six</a></h3>

                <div class="mt-2 lg:mt-3">
                    <span class="prod-card__price">$79</span>
                </div>
                </div>
            </div>
            </li>
        </ul>
        </div>
    </div>
    </section>
</template>
<script>
import filters from "~/plugins/filters.js";
import filtersNav from "~/plugins/filters-navegation.js";
export default {
  mounted() {
    filters()
    filtersNav()
  },
}
</script>
<style scoped lang="scss">
@import "~/assets/scss/filter.scss";
@import "~/assets/scss/productCard.scss";

</style>
