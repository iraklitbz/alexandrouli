<template>
    <section class="relative z-1 py-20 lg:py-24">
        <div class="w-[calc(100%_-_2.5rem)] lg:w-[calc(100%_-_4rem)] mx-auto max-w-7xl">
            <div class="grid grid-cols-2 gap-8 lg:gap-12">
            <div class="col-span-2 lg:col-span-1">
                <div class="lg:flex lg:flex-col lg:h-full">
                <h1 class="lg:sticky top-8 lg:top-12">How it works</h1>
        
                <div class="toc lg:sticky lg:bottom-12 lg:mt-auto toc--static@md hidden lg:block js-toc">
                    <nav class="toc__nav">
                    <ul class="toc__list js-toc__list">
                        <li><a class="toc__link js-smooth-scroll" href="#car-model">1. Car Model</a></li>
                        <li><a class="toc__link js-smooth-scroll" href="#paint-color">2. Paint Color</a></li>
                        <li><a class="toc__link js-smooth-scroll" href="#delivery">3. Delivery</a></li>
                        <li><a class="toc__link js-smooth-scroll" href="#done">4. Done</a></li>
                    </ul>
                    </nav>
                </div>
                </div>
            </div>

            <div class="col-span-2 lg:col-span-1">
                <div class="toc-content js-toc-content">
                <ul class="grid grid-cols-1 gap-8 lg:gap-12 xl:gap-20">
                    <li id="car-model" class="toc-content__target col-span-1">
                    <figure class="mb-3 lg:mb-5">
                        <img class="w-full rounded-md" src="https://codyhouse.co/app/assets/img/how-it-works-v4-img-1.jpg" alt="Image description">
                    </figure>
        
                    <div class="text-component">
                        <h2 class="text-xl lg:text-3xl">1. Select your car model</h2>
                        <p class="text-contrast-medium">Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, doloremque. Vitae voluptate rem aspernatur inventore culpa iste asperiores dolores explicabo perspiciatis iusto iure sit, nulla magni nobis consectetur.</p>
                    </div>
                    </li>

                    <li id="paint-color" class="toc-content__target col-span-1">
                    <figure class="mb-3 lg:mb-5">
                        <img class="w-full rounded-md" src="https://codyhouse.co/app/assets/img/how-it-works-v4-img-2.jpg" alt="Image description">
                    </figure>
        
                    <div class="text-component">
                        <h2 class="text-xl lg:text-3xl">2. Choose the paint color</h2>
                        <p class="text-contrast-medium">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorem illo quis accusamus quam vel fugit voluptatibus reiciendis a atque illum! Laudantium alias provident earum in, dolore porro rem labore est?</p>
                    </div>
                    </li>

                    <li id="delivery" class="toc-content__target col-span-1">
                    <figure class="mb-3 lg:mb-5">
                        <img class="w-full rounded-md" src="https://codyhouse.co/app/assets/img/how-it-works-v4-img-3.jpg" alt="Image description">
                    </figure>
        
                    <div class="text-component">
                        <h2 class="text-xl lg:text-3xl">3. We deliver within 3 days</h2>
                        <p class="text-contrast-medium">Lorem ipsum dolor sit amet consectetur adipisicing elit. In dolorum incidunt dolorem architecto molestias, corrupti voluptas. Minima est amet mollitia ratione aliquid!</p>
                    </div>
                    </li>

                    <li id="done" class="toc-content__target col-span-1">
                    <figure class="mb-3 lg:mb-5">
                        <img class="w-full rounded-md" src="https://codyhouse.co/app/assets/img/how-it-works-v4-img-4.jpg" alt="Image description">
                    </figure>
        
                    <div class="text-component">
                        <h2 class="text-xl lg:text-3xl">4. Enjoy your new car</h2>
                        <p class="text-contrast-medium">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, consectetur modi. Excepturi natus ratione soluta, velit reprehenderit facilis perferendis eveniet! Temporibus tenetur modi magnam aspernatur accusantium laborum numquam maxime perspiciatis?</p>
                    </div>
                    </li>
                </ul>
                </div>
            </div>
            </div>
        </div>
        </section>
</template>
<script>
import axios from 'axios';
import smothScroll from "~/plugins/smothScroll.js";
import aboutJS from "~/plugins/aboutJS.js";
export default {
    name: 'AboutPage',
    data(){
        return {
    
        }
    },
    mounted () {
        smothScroll();
        aboutJS();
    }
}
</script>

<style scoped>
  @import "~/assets/scss/_about.scss";
</style>