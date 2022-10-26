export const state = () => ({
    products: [],
})

export const mutations = {
    SET_PRODUCTS (state, payload) {
            state.products.push(payload)
            const productDuplicate = state.products.filter(element => element.id === payload.id).shift()
            if(productDuplicate) {
                productDuplicate.cantidad++
                const sumaPrecios = productDuplicate.cantidad * productDuplicate.price
                productDuplicate.totalPrice = sumaPrecios
                const arrayWithoutDuplicate = state.products.filter(element => element.id !== productDuplicate.id)
                arrayWithoutDuplicate.push(productDuplicate)
                state.products = arrayWithoutDuplicate
            } else {
                state.products.push(payload)
            }

    },
    SET_REMOVE_PRODUCTS (state, payload) {
        const productForRemove = state.products.filter(element => element.id === payload).shift()
        console.log(productForRemove)
        if(productForRemove) {
            productForRemove.cantidad = 0
            productForRemove.totalPrice = 0
        }
        const removeProductFromSArray = state.products.filter(element => element.id !== payload)
        state.products = removeProductFromSArray
    },
}
