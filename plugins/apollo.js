import { provide } from '@vue/composition-api'
import { DefaultApolloClient } from '@vue/apollo-composable'

Vue.use(provide, DefaultApolloClient)