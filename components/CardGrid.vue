<template>
    <div class="w-[calc(100%_-_2.5rem)] lg:w-[calc(100%_-_4rem)] mx-auto max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-7xl">
        <div class="grid grid-cols-12 gap-3 lg:gap-5">
            <nuxt-link 
                v-for="(item, index) in posts" 
                :key="item.id"
                :to="'/sobre-georgia/' + item.id + '/' + item.attributes.slug" 
                class="card-v9 rounded col-span-12 lg:col-span-8"
                :class="index === 0 || index === 3 ? 'lg:col-span-8' : 'lg:col-span-4'" 
                :style="{ backgroundImage: `url(${strapiUrl}${item.attributes.feature.data.attributes.url})` }"
            >
                <div class="card-v9__content p-5 lg:p-8">
                <div class="pb-32 lg:pb-52 max-w-lg">
                    <p class="text-sm lg:text-base text-contrast-higher/50 mb-1.5 lg:mb-2">{{item.attributes.category}}</p>
                    <h1 id="card-title-1" class="text-2xl lg:text-4xl">{{item.attributes.title}}</h1>
                </div>
            
                <div class="mt-auto">
                    <span class="card-v9__btn"><i class="not-italic">Leer más</i></span>
                </div>
                </div>
            </nuxt-link>
        </div>
  </div>
</template>

<script>
export default {
    props: {
        posts: {
            type: Array,
            required: true
        }
    },
    data(){
        return {
            strapiUrl: process.env.strapiUrl
        }
    }
}
</script>