<template>
    <nav class="pagination pagination--split" aria-label="Pagination">
        <ol class="pagination__list flex flex-wrap gap-1 lg:gap-1.5 justify-center">
            <li
                
            >
                <a 
                    @click="handlePrevPage" 
                    class="pagination__item cursor-pointer"
                    :class="{'pagination__item--disabled': currentPage === '1'}" 
                    aria-label="Go to previous page">
                    <svg class="icon w-[16px] h-[16px] mr-1 lg:mr-1.5 -scale-x-100" viewBox="0 0 16 16"><polyline points="6 2 12 8 6 14" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/></svg>
                    <span>Anterior</span>
                </a>
            </li>
            <li 
                v-for="(page, index) in pagination.pageCount"
                :key="index"
                class="hidden md:inline-flex"
            >
                <a 
                    @click="handlePageChange(page)" 
                    class="pagination__item cursor-pointer"
                    :aria-label="('Go to page ' + nextPage)">
                        {{page}}
                </a>
            </li>
            <li>
                <a 
                    @click="handleNextPage"
                    class="pagination__item cursor-pointer" 
                    aria-label="Go to next page"
                    :class="{'pagination__item--disabled': currentPage === String(pagination.pageCount)}" 
                >
                    <span>Siguiente</span>
                    <svg class="icon w-[16px] h-[16px] ml-1 lg:ml-1.5" viewBox="0 0 16 16"><polyline points="6 2 12 8 6 14" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/></svg>
                </a>
            </li>
        </ol>
    </nav>
</template>
<script>
export default {
    props: {
        pagination: {
            type: Object,
            required: true
        },
        currentPage: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            nextPage: Number(this.currentPage) + 1,
            prevPage: Number(this.currentPage) - 1,
            isSelectedTag: this.$route.query && this.$route.query.filter ? this.$route.query.filter : null
        }
    },
    methods: {
        handleNextPage() {
            if(this.$route.query && this.$route.query.filter) {
                this.$router.push({ path: `/vinos/${this.nextPage}`, query: {filter: this.$route.query.filter} });
            } else {
                this.$router.push({ path: `/vinos/${this.nextPage}` });
            }
        },
        handlePrevPage() {
            if(this.$route.query && this.$route.query.filter) {
                this.$router.push({ path: `/vinos/${this.prevPage}`, query: {filter: this.$route.query.filter} });
            } else {
                this.$router.push({ path: `/vinos/${this.prevPage}` });
            }
        },
        handlePageChange(page) {
            if(this.$route.query && this.$route.query.filter) {
                this.$router.push({ path: `/vinos/${page}`, query: {filter: this.$route.query.filter} });
            } else {
                this.$router.push({ path: `/vinos/${page}` });
            }
        }
    }
}
</script>
<style lang="scss">
  @import "~/assets/scss/pagination.scss";
</style>
