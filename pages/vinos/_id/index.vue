<template>
    <div class="w-[calc(100%_-_2.5rem)] lg:w-[calc(100%_-_4rem)] mx-auto max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-7xl py-20 lg:py-24">
        <div class="mb-5 lg:mb-8">
            <h1 class="text-center">Todos los vinos</h1>
        </div>
        <!-- <Filters
            class="mb-12" 
            :filter-data="'categories'"
            :filter-name="'category'"
            @update-filter="handleGetData"
        /> -->
        <!-- <ShopGrid
            :products="productsInState.data"
        /> -->
        <button @click="handleLoadNext">More</button>
        <!-- <Pagination
            v-if="pagination ? pagination.pageCount > 1 : false"   
            :pagination="pagination"
            :current-page="currentPage"
            class="mt-10"
        /> -->
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { allProducts } from '~/graphql/querys'
  export default {
      name: 'VinosPage',
      data(){
          return {
                productsInState: {},
                pagination: {},
                currentPage: this.$route.params.id ? this.$route.params.id : '1',
                strapiUrl: process.env.strapiUrl,
                filter: '',
                joinCategoryFilterData: []
          }
      },
      apollo: {
        products: {
                prefetch: true,
                query: allProducts,
                variables() {
                    return {
                        // page: this.$route.params.id ? this.$route.params.id : '1',
                        // pageSize: 4
                        limit: 4,
                        start: 0
                    }
                },
            }
        },
        methods: {
            handleLoadNext() {
                
                this.$apollo.queries.products.fetchMore({
                    variables: { 
                        start: 4
                    },
                    updateQuery: (previousResult, { fetchMoreResult }) => {
                        console.log(fetchMoreResult)
                        if (!fetchMoreResult) return previousResult
                        this.productsInState = [...previousResult.data, ...fetchMoreResult.data]
                        console.log(this.productsInState)
                  
                    },
                })
            },
            async handleGrapqhql() {
                await this.$apollo.queries.products.refetch()
                    if(!this.$apollo.queries.products._loading) {
                        this.productsInState = this.products
                    }
                    console.log(this.productsInState)
                }
        },
        mounted () {
            if(this.product && this.product.data){
                this.productsInState = this.products
            }
            console.log(this.productsInState)
            this.handleGrapqhql()
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
        // methods: {
        //     async handleGetData(dataToFilter) {
        //         dataToFilter && dataToFilter !== 'Todos' ? this.filter = `${dataToFilter.join('&')}` : this.filter = ''
        //         await axios.get(
        //             dataToFilter === 'Todos' 
        //             ? process.env.strapiUrl + `/api/products?pagination[page]=${this.currentPage}&pagination[pageSize]=4&populate=*` 
        //             : process.env.strapiUrl + `/api/products?${this.filter}&pagination[page]=${this.currentPage}&pagination[pageSize]=4&populate=*` 
        //             )
        //         .then(response => (
        //                 this.products = response.data.data,
        //                 this.pagination = response.data.meta.pagination
        //             ))
        //         .catch(error => (this.error = error))
        //         if(this.pagination && Number(this.$route.params.id ) > this.pagination.pageCount) {
        //                 if(this.$route.query.filter) {
        //                     this.$router.push({ path: '/vinos/1', query: {filter: this.$route.query.filter} });
        //                 } else {
        //                     this.$router.push('/vinos/1')
        //                 }
        //         }
        //     }
        // }
  }
  </script>