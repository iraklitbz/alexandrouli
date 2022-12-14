export const state = () => ({
    email: '',
    name: '',
    company: '',
    address: '',
    city: '',
    state: '',
    country: 'ES',
    postcode: '',
    phone: '',
    delivery: 'Standard',
    billAddressSame: true,
    billingname: '',
    billingcompany: '',
    billingaddress: '',
    billingcity: '',
    billingstate: '',
    billingcountry: '',
    billingpostcode: ''
})

export const mutations = {
    SET_EMAIL (state, payload) {
        state.email = payload
    },
    SET_NAME (state, payload) {
        state.name = payload
    },
    SET_COMPANY (state, payload) {
        state.company = payload
    },
    SET_ADDRESS (state, payload) {
        state.address = payload
    },
    SET_CITY (state, payload) {
        state.city = payload
    },
    SET_STATE (state, payload) {
        state.state = payload
    },
    SET_POSTCODE (state, payload) {
        state.postcode = payload
    },
    SET_PHONE (state, payload) {
        state.phone = payload
    },
    SET_DELIVERY (state, payload) {
        state.delivery = payload
    },
    /*BILLING*/
    SET_BILLING_ADDRESS_SAME (state) {
        state.billAddressSame = !state.billAddressSame
    },
    SET_BILLING_NAME (state, payload) {
        state.billingname = payload
    },
    SET_BILLING_COMPANY (state, payload) {
        state.billingcompany = payload
    },
    SET_BILLING_ADDRESS (state, payload) {
        state.billingaddress = payload
    },
    SET_BILLING_CITY (state, payload) {
        state.billingcity = payload
    },
    SET_BILLING_STATE (state, payload) {
        state.billingstate = payload
    },
    SET_BILLING_POSTCODE (state, payload) {
        state.billingpostcode = payload
    },
}
