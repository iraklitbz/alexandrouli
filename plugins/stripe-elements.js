import Vue from 'vue'
import { StripePlugin } from '@vue-stripe/vue-stripe'

const options = {
  pk: 'pk_test_LXWhyxMuSAysDnI57cnHTb8h00NybXCX0v',
  stripeAccount: 'iraklitbz@gmail.com',
  apiVersion: process.env.API_VERSION,
  locale: process.env.LOCALE
}

Vue.use(StripePlugin, options)