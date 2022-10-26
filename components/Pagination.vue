<template>
    <nav class="pagination pagination--split" aria-label="Pagination">
        <ol class="pagination__list flex flex-wrap gap-1 lg:gap-1.5 justify-center">
            <li>
            <a href="#0" class="pagination__item pagination__item--disabled" aria-label="Go to previous page">
                <svg class="icon w-[16px] h-[16px] mr-1 lg:mr-1.5 -scale-x-100" viewBox="0 0 16 16"><polyline points="6 2 12 8 6 14" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/></svg>
                <span>Prev</span>
            </a>
            </li>

            <li class="hidden md:inline-flex">
            <a href="#0" class="pagination__item" aria-label="Go to page 1">1</a>
            </li>

            <li class="hidden md:inline-flex">
            <a href="#0" class="pagination__item" aria-label="Go to page 2">2</a>
            </li>

            <li class="hidden md:inline-flex">
            <a href="#0" class="pagination__item pagination__item--selected" aria-label="Current Page, page 3" aria-current="page">3</a>
            </li>

            <li class="hidden md:inline-flex">
            <a href="#0" class="pagination__item" aria-label="Go to page 4">4</a>
            </li>

            <li class="hidden md:inline-flex" aria-hidden="true">
            <span class="pagination__item pagination__item--ellipsis">...</span>
            </li>

            <li class="hidden md:inline-flex">
            <a href="#0" class="pagination__item" aria-label="Go to page 20">20</a>
            </li>

            <li>
            <a href="#0" class="pagination__item" aria-label="Go to next page">
                <span>Next</span>
                <svg class="icon w-[16px] h-[16px] ml-1 lg:ml-1.5" viewBox="0 0 16 16"><polyline points="6 2 12 8 6 14" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/></svg>
            </a>
            </li>
        </ol>
    </nav>
</template>

<style lang="scss">
  @import "~/assets/scss/pagination.scss";
</style>
