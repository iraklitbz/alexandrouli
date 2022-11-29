<template>
    <div class="tab-features-v2 js-tabs" data-show-panel-class="tab-features-v2__panel--display" data-hide-panel-class="tab-features-v2__panel--hide">
    <div class="grid grid-cols-12 gap-5 lg:gap-8">
        <div class="col-span-12 lg:col-span-6 lg:flex lg:items-center">
            <ul class="relative flex gap-2 lg:gap-3 overflow-auto lg:flex-col lg:overflow-visible js-tabs__controls" aria-label="Tabs navigation">
                <li class="flex-[1_0_180px] lg:flex-[1_0_auto]">
                <a href="#tab-features-1" class="tab-features-v2__control block text-inherit no-underline h-full px-0 pt-0 pb-5 border-0 border-b border-contrast-higher/10 transition-all duration-200 hover:border-contrast-higher/50 [&[aria-selected=true]]:border-primary lg:border-b-0 lg:rounded-md lg:py-5 lg:px-8 lg:hover:bg-floor-light lg:hover:shadow-md lg:[&[aria-selected=true]]:bg-floor-light lg:[&[aria-selected=true]]:shadow-md" aria-selected="true">
                    <span class="tab-features-v2__control-title block font-medium mb-1.5 lg:mb-2 transition-colors duration-200">Navigations</span>
                    <span class="text-contrast-medium leading-[1.4] text-sm lg:text-base">Lorem ipsum dolor sit amet consectetur adipisicing elit</span>
                </a>
                </li>
            
                <li class="flex-[1_0_180px] lg:flex-[1_0_auto]">
                <a href="#tab-features-2" class="tab-features-v2__control block text-inherit no-underline h-full px-0 pt-0 pb-5 border-0 border-b border-contrast-higher/10 transition-all duration-200 hover:border-contrast-higher/50 [&[aria-selected=true]]:border-primary lg:border-b-0 lg:rounded-md lg:py-5 lg:px-8 lg:hover:bg-floor-light lg:hover:shadow-md lg:[&[aria-selected=true]]:bg-floor-light lg:[&[aria-selected=true]]:shadow-md">
                    <span class="tab-features-v2__control-title block font-medium mb-1.5 lg:mb-2 transition-colors duration-200">Image Galleries</span>
                    <span class="text-contrast-medium leading-[1.4] text-sm lg:text-base">Lorem ipsum dolor sit amet consectetur</span>
                </a>
                </li>
            
                <li class="flex-[1_0_180px] lg:flex-[1_0_auto]">
                <a href="#tab-features-3" class="tab-features-v2__control block text-inherit no-underline h-full px-0 pt-0 pb-5 border-0 border-b border-contrast-higher/10 transition-all duration-200 hover:border-contrast-higher/50 [&[aria-selected=true]]:border-primary lg:border-b-0 lg:rounded-md lg:py-5 lg:px-8 lg:hover:bg-floor-light lg:hover:shadow-md lg:[&[aria-selected=true]]:bg-floor-light lg:[&[aria-selected=true]]:shadow-md">
                    <span class="tab-features-v2__control-title block font-medium mb-1.5 lg:mb-2 transition-colors duration-200">Animations</span>
                    <span class="text-contrast-medium leading-[1.4] text-sm lg:text-base">Lorem ipsum dolor sit amet consectetur adipisicing elit</span>
                </a>
                </li>
            
                <li class="flex-[1_0_180px] lg:flex-[1_0_auto]">
                <a href="#tab-features-4" class="tab-features-v2__control block text-inherit no-underline h-full px-0 pt-0 pb-5 border-0 border-b border-contrast-higher/10 transition-all duration-200 hover:border-contrast-higher/50 [&[aria-selected=true]]:border-primary lg:border-b-0 lg:rounded-md lg:py-5 lg:px-8 lg:hover:bg-floor-light lg:hover:shadow-md lg:[&[aria-selected=true]]:bg-floor-light lg:[&[aria-selected=true]]:shadow-md">
                    <span class="tab-features-v2__control-title block font-medium mb-1.5 lg:mb-2 transition-colors duration-200">Controls</span>
                    <span class="text-contrast-medium leading-[1.4] text-sm lg:text-base">Lorem ipsum dolor sit amet consectetur adipisicing</span>
                </a>
                </li>

                <li class="sticky top-0 right-0 flex-[0_0_40px] pointer-events-none bg-gradient-to-r from-floor/0 to-floor/100 lg:hidden" aria-hidden="true"></li>
            </ul>
        </div>
    
        <div class="relative col-span-12 lg:col-span-6 js-tabs__panels">
        <section id="tab-features-1" class="tab-features-v2__panel js-tabs__panel">
            <img class="block w-full rounded-md" src="https://codyhouse.co/app/assets/img/tabbed-features-v2-img-1.png" alt="Image description">
        </section>
    
        <section id="tab-features-2" class="tab-features-v2__panel js-tabs__panel">
            <img class="block w-full rounded-md" src="https://codyhouse.co/app/assets/img/tabbed-features-v2-img-2.png" alt="Image description">
        </section>
    
        <section id="tab-features-3" class="tab-features-v2__panel js-tabs__panel">
            <img class="block width-100% rounded-md" src="https://codyhouse.co/app/assets/img/tabbed-features-v2-img-3.png" alt="Image description">
        </section>
    
        <section id="tab-features-4" class="tab-features-v2__panel js-tabs__panel">
            <img class="block width-100% rounded-md" src="https://codyhouse.co/app/assets/img/tabbed-features-v2-img-4.png" alt="Image description">
        </section>
        </div>
    </div>
    </div>
</template>
<script>
import tabs from "~/plugins/tabs.js";
export default {
  mounted() {
    tabs()
  }
}
</script>
<style lang="scss">
  @import "~/assets/scss/tabs.scss";
</style>