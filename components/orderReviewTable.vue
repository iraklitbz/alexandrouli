<template>
    <div class="tbl">
            <table v-if="Object.keys(orderData).length" class="tbl__table text-unit-em text-sm lg:text-base border-b-2 border-contrast-lower" aria-label="Table Example">
                <thead class="tbl__header border-b-2 border-contrast-lower">
                <tr class="tbl__row">
                    <th class="tbl__cell text-left" scope="col">
                        <span class="text-xs uppercase letter-spacing-lg font-semibold">Nombre</span>
                    </th>

                    <th class="tbl__cell text-right" scope="col">
                        <span class="text-xs uppercase letter-spacing-lg font-semibold">Dirección</span>
                    </th>

                    <th class="tbl__cell text-right" scope="col">
                        <span class="text-xs uppercase letter-spacing-lg font-semibold">Productos</span>
                    </th>
                    
                    <th class="tbl__cell text-right" scope="col">
                        <span class="text-xs uppercase letter-spacing-lg font-semibold">Enviado</span>
                    </th>
                    <th class="tbl__cell text-right" scope="col">
                        <span class="text-xs uppercase letter-spacing-lg font-semibold">Pagado total</span>
                    </th>
                </tr>
                </thead>
                
                <tbody class="tbl__body">
                    <tr class="tbl__row">

                        <td class="tbl__cell" role="cell">Irakli</td>

                        <td class="tbl__cell text-right" role="cell">Cantaperdiz 38</td>

                        <td class="tbl__cell text-right" role="cell">Kinzmarouli</td>

                        <td class="tbl__cell text-right" role="cell">
                            <span class="inline-block text-sm leading-none lg:text-base lg:leading-none bg-success/20 text-success-darker rounded-full py-1 lg:py-1.5 px-2 lg:px-3 whitespace-nowrap">Enviado</span>
                        </td>

                        <td class="tbl__cell text-right" role="cell">$320,000</td>
                    </tr>
                </tbody>
            </table>
            <div 
                v-else
                class="bg-contrast-lower bg-opacity-20 text-contrast-high text-center py-4 rounded-sm"
            >
                <p>No hay compras</p>
            </div>
        </div>
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
        ...mapGetters(['loggedInUser'])
    },
    async mounted() {
          try {
            await this.$axios.get("/api/orders?filters[email][$eq]=" + this.loggedInUser.email).then((response) => {
             if(response) {
               if(response.data.data && response.data.data[0].attributes) {
                    this.orderData = response.data.data[0].attributes
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