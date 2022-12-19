<template>
    <div class="w-[calc(100%_-_2.5rem)] lg:w-[calc(100%_-_4rem)] mx-auto max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-7xl py-20 lg:py-24">
        <section class="feature-v11 relative z-[1]">
            <div class="relative">
                <div class="py-0 px-6 lg:p-0 lg:flex lg:justify-end">
                <div class="relative z-[2] flex lg:w-1/2 xl:w-[calc(100%/12*5)]">
                    <div class="bg-floor p-6 shadow-[0_0.9px_1.25px_hsla(var(--color-contrast-higher)/0.025),0_3px_5px_hsla(var(--color-contrast-higher)/0.05),0_12px_20px_hsla(var(--color-contrast-higher)/0.09)] my-28 mx-0">
                        <h1 class="text-[2.125rem] mb-3">{{title}}</h1>
                        <p class="text-contrast-medium leading-normal mb-4">
                            {{description}}
                        </p>
                    </div>
                </div>

                <figure class="absolute z-[1] w-full top-0 left-0 h-full lg:w-[calc(100%/12*10)]">
                    <img class="w-full h-full object-cover" :src="image" :alt="'Bodega ' + title + 'imagen'">
                </figure>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    data() {
        return {
            title: '',
            description: '',
            image: ''
        }
    },
    async mounted () {
        await axios
        .get(process.env.strapiUrl + `/api/bodegas?filters[slug][$eq]=${this.$route.params.slug}&populate=*` )
        .then(response => (
                this.title = response.data.data[0].attributes.title,
                this.description = response.data.data[0].attributes.description,
                this.image = response.data.data[0].attributes.feature.data.attributes.formats.medium.url
            ))
        .catch(error => (this.error = error))
    }
}
</script>