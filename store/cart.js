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
                localStorage.setItem('productsInCart', JSON.stringify(arrayWithoutDuplicate))
                state.products = arrayWithoutDuplicate
            } else {
                localStorage.setItem('productsInCart', JSON.stringify(payload))
                state.products.push(payload)
            }

    },
    SET_PRODUCTS_LOCALSTORAGE (state, payload) {
        state.products = payload
    },
    SET_REMOVE_PRODUCTS (state, payload) {
        const productForRemove = state.products.filter(element => element.id === payload).shift()
        if(productForRemove) {
            productForRemove.cantidad = 0
            productForRemove.totalPrice = 0
        }
        const removeProductFromSArray = state.products.filter(element => element.id !== payload)
        localStorage.setItem('productsInCart', JSON.stringify(removeProductFromSArray))
        state.products = removeProductFromSArray
    },
}
