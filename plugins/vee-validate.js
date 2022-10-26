import Vue from 'vue';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { required, email, numeric, oneOf, confirmed } from "vee-validate/dist/rules";

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

extend('required', {
    ...required,
    message: 'This field is required'
})

extend('email', {
    ...email,
    message: 'This field needs to be a email'
})

extend('postcode', {
    ...numeric,
    message: 'This field needs to be a valid postcode'
})

extend('phone', {
    ...numeric,
    message: 'This field needs to be a valid phone number'
})

extend('delivery', {
    ...oneOf,
    message: 'Chose one of the options'
})

extend('confirmed', {
    ...confirmed,
    message: 'The passwords do not match'
})
