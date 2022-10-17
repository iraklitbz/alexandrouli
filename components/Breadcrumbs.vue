<template>
    <nav class="breadcrumbs text-sm lg:text-base" aria-label="Breadcrumbs">
        <ol class="flex flex-wrap gap-1.5 lg:gap-2">
            <li class="breadcrumbs__item">
            <a href="#0" class="text-inherit">Home</a>
            <span class="text-contrast-lower ml-1.5 lg:ml-2" aria-hidden="true">/</span>
            </li>

            <li class="breadcrumbs__item">
            <a href="#0" class="text-inherit">Gallery</a>
            <span class="text-contrast-lower ml-1.5 lg:ml-2" aria-hidden="true">/</span>
            </li>

            <li class="breadcrumbs__item">
            <a href="#0" class="text-inherit">Web</a>
            <span class="text-contrast-lower ml-1.5 lg:ml-2" aria-hidden="true">/</span>
            </li>

            <li class="breadcrumbs__item" aria-current="page">Project</li>
        </ol>
    </nav>
</template>

<style lang="scss">
    .breadcrumbs__item {
        display: inline-block;
        display: inline-flex;
        align-items: center;
    }
</style>
