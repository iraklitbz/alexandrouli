<template>
    <nav class="breadcrumbs text-sm lg:text-base" aria-label="Breadcrumbs">
        <ol class="flex flex-wrap gap-1.5 lg:gap-2">
            <li class="breadcrumbs__item">
                <nuxt-link to="/" class="text-inherit">Inicio</nuxt-link>
                <span class="text-contrast-lower ml-1.5 lg:ml-2" aria-hidden="true">/</span>
            </li>

            <li class="breadcrumbs__item">
                <nuxt-link :to="page.link" class="text-inherit">{{page.title}}</nuxt-link>
                <span class="text-contrast-lower ml-1.5 lg:ml-2" aria-hidden="true">/</span>
            </li>

            <li class="breadcrumbs__item" aria-current="page">{{name}}</li>
        </ol>
    </nav>
</template>

<script>
export default {
    props: {
        page: {
            type: Object,
            default: () => {}
        },
        name: {
            type: String,
            default: ''
        }
    }
}
</script>

<style lang="scss">
    .breadcrumbs__item {
        display: inline-block;
        display: inline-flex;
        align-items: center;
    }
</style>
