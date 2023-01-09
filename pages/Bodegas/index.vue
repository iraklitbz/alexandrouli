<template>
      <div class="w-[calc(100%_-_2.5rem)] lg:w-[calc(100%_-_4rem)] mx-auto max-w-7xl py-20 lg:py-24">
        <ul class="grid gap-6 grid-cols-[repeat(auto-fit,minmax(15rem,1fr))]">
            <li 
                v-for="bodega in bodegas?.data"
                :key="bodega.id"
            >
                <nuxt-link
                    class="card-v6 rounded-md block no-underline text-inherit relative bg-floor transition-shadow duration-300 hover:shadow-[0_0.9px_1.25px_hsla(var(--color-contrast-higher)_/_0.025),0_3px_5px_hsla(var(--color-contrast-higher)_/_0.05),0_12px_20px_hsla(var(--color-contrast-higher)_/_0.09)] group" 
                    :to="{path: 'bodegas/' + bodega?.attributes.slug, query: {id: bodega.id}}"
                    :props-name-defined-in-router="bodega.id"
                    >
                    <figure 
                        v-if="bodega?.attributes.feature.data && bodega?.attributes.feature.data.attributes"
                    
                    >
                        <nuxt-img
                            provider="cloudinary"
                            loading="lazy"
                            format="webp" 
                            class="block w-full h-80 object-cover"
                            :src="bodega.attributes.feature.data.attributes.formats.medium.hash"
                            :alt="bodega.attributes.title + ' image'"
                        />
                    </figure>
                    <div class="flex items-center justify-center bg-contrast-low bg-opacity-10 h-80" v-else>
                        <load-svg name="cross" class="w-20 h-20 text-contrast-low" />
                    </div>
                    <div class="p-4 grid gap-3">
                        <h4>{{bodega.attributes.title}}</h4>
                    </div>
                </nuxt-link>
            </li>
        </ul>
    </div>  
</template>
<script>
import { allBodegas } from '~/graphql/querys'
export default {
    name: 'PostsPage',
    apollo: {
        bodegas: {
            prefetch: true,
            query: allBodegas
        }
    }
}
</script>
<style>

.card-v6:hover .card-v6__icon {
  animation: card-v6-icon 0.3s;
}

@keyframes card-v6-icon {
  0%, 100% {
    opacity: 1;
    transform: translateX(0);
  }
  50% {
    opacity: 0;
    transform: translateX(100%);
  }
  51% {
    opacity: 0;
    transform: translateX(-100%);
  }
}
</style>