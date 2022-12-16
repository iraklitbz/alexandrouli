import Vue from 'vue';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { required, email, numeric, oneOf, confirmed } from "vee-validate/dist/rules";

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

extend('required', {
    ...required,
    message: 'Este campo es requerido'
})

extend('email', {
    ...email,
    message: 'Este campo necesita ser un email válido'
})

extend('postcode', {
    ...numeric,
    message: 'Este campo necesita ser un código postal válido'
})

extend('phone', {
    ...numeric,
    message: 'Este campo necesita ser un número de teléfono válido'
})

extend('delivery', {
    ...oneOf,
    message: 'Debes seleccionar una opción de envío'
})

extend('confirmed', {
    ...confirmed,
    message: 'Las contraseñas no coinciden'
})
