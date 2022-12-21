<template>
    <div class="w-[calc(100%_-_2.5rem)] lg:w-[calc(100%_-_4rem)] mx-auto max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-7xl py-20 lg:py-24">
        <div class="mb-5 lg:mb-8">
            <h1 class="text-center">Our Products</h1>
        </div>
        <!-- <Filters 
            :filter-data="'categories'"
            :filter-name="'category'"
            @update-filter="handleGetData"
        /> -->
        <ShopGrid 
            :products="products"
            :pagination="pagination"
        />
        <Pagination
            v-if="pagination ? pagination.pageCount > 1 : false"   
            :pagination="pagination"
            :current-page="currentPage"
            class="mt-10"
        />
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  export default {
      name: 'VinosPage',
      data(){
          return {
              products: [],
              pagination: {},
              currentPage: this.$route.params.id ? this.$route.params.id : '1',
              strapiUrl: process.env.strapiUrl,
              filter: '',
              joinCategoryFilterData: []
          }
      },
      mounted () {
            // this.currentPage = this.$route.params.id
            // if(this.$route.query && this.$route.query.filter) {
            //     const splitFilterParams = this.$route.query.filter.split('&')
            //     const solitDataQuery = splitFilterParams.map(element => {
            //         return `filters[category][slug][$eq]=${element}`
            //     })
            //     this.handleGetData(solitDataQuery)
            // } else {
            //     this.handleGetData()
            // }
        },
        methods: {
            // handleGetData(dataToFilter) {
            //     dataToFilter && dataToFilter !== 'Todos' ? this.filter = `${dataToFilter.join('&')}` : this.filter = ''
            //     axios
            //     .get(
            //         dataToFilter === 'Todos' 
            //         ? process.env.strapiUrl + `/api/products?pagination[page]=${this.currentPage}&pagination[pageSize]=4&populate=*` 
            //         : process.env.strapiUrl + `/api/products?${this.filter}&pagination[page]=${this.currentPage}&pagination[pageSize]=4&populate=*` 
            //         )
            //     .then(response => (
            //             this.products = response.data.data,
            //             this.pagination = response.data.meta.pagination
            //         ))
            //     .catch(error => (this.error = error))
            // }
        }
  }
  </script>
  <style scoped>
  
  </style>
  