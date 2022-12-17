<template>
    <section class="relative z-1">
        <div class="w-[calc(100%_-_2.5rem)] lg:w-[calc(100%_-_4rem)] mx-auto max-w-lg md:max-w-3xl">
            <ul v-if="orderData.length" class="grid grid-cols-12 gap-3 lg:gap-5">
                <li v-for="(item, index) in orderData" :key="index" class="col-span-12 perspective-xl">
                    <div class="bg-floor-light rounded-lg shadow-lg scroll-fx js-scroll-fx" data-scroll-fx-1="rotateX, 45deg, 0deg, 0%, 50%" data-scroll-fx-2="rotateY, 15deg, 0deg, 0%, 50%">
                        <div class="p-10">
                            <div class="mb-5" role="cell">
                                <span class="block text-black text-xl">Dirección:</span>
                                <span class="text-contrast-medium text-xl">{{item.attributes.direccion}}</span>
                            </div>
                            <div class="mb-5">
                                <span class="block text-black text-xl mb-2">Productos comprados:</span>
                                <ul class="list-disc list-inside text-contrast-medium">
                                    <li v-for="(product, index) in item.attributes.articulos" :key="index">
                                        {{product.name}} x {{product.amount}}
                                    </li>
                                </ul>
                            </div>
                            <div class="flex justify-between items-center mt-10">
                                <div>
                                    <span class="text-black text-xl mr-2">Estado:</span>
                                    <span v-if="item.attributes.enviado" class="inline-block text-lg leading-none lg:text-xl lg:leading-none bg-success/20 text-success-darker rounded-full py-1 lg:py-1.5 px-2 lg:px-3 whitespace-nowrap">Enviado</span>
                                    <span v-else class="inline-block text-sm leading-none lg:text-base lg:leading-none  bg-warning/20 text-warning-darker rounded-full py-1 lg:py-1.5 px-2 lg:px-3 whitespace-nowrap">Preparando</span>
                                </div>
                                <div>
                                    <span class="text-black text-xl mr-2">Total pagado:</span>
                                    <span>{{item.attributes.totalPagado}}€</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
            <div 
                v-else
                class="bg-floor-light rounded-lg shadow-lg p-10 text-center"
            >
                No hay compra
            </div>
        </div>
    </section>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            orderData: {}
        }
    },
    computed: {
        currentUser() {
            return this.$store.state.user
        }
    },
    async mounted() {
          try {
            await this.$axios.get("/api/orders?filters[email][$eq]=" + this.currentUser.email + '&populate=*').then((response) => {
             if(response) {
               if(response.data.data && response.data.data) {
                    this.orderData = response.data.data
               }
              }
            })
          } catch (error) {
            console.log(error)
          }
    }
}
</script>
<style>
.tbl {
  position: relative;
  z-index: 1;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
.tbl::-webkit-scrollbar {
  height: 8px;
  width: 8px;
}
.tbl::-webkit-scrollbar-track {
  @apply bg-contrast-lower;
}
.tbl::-webkit-scrollbar-thumb {
  @apply bg-contrast-higher/90;
  border-radius: 50em;
}
.tbl::-webkit-scrollbar-thumb:hover {
  @apply bg-contrast-higher;
}

.tbl__table {
  width: 100%;
}

.tbl__body .tbl__row {
  @apply border-b border-contrast-lower;
  transition: 0.2s;
}
.tbl__body .tbl__row:hover {
  @apply bg-contrast-higher/5;
}
.tbl__body .tbl__row:last-child {
  border-bottom: none;
}

.tbl__cell {
  @apply p-2 lg:p-3;
}
</style>