export const state = () => ({
    products: []
})

export const mutations = {
    SET_PRODUCTS (state, payload) {
            const thisProduct = state.products.filter(element => element.id === payload.id).shift()
            if(thisProduct && thisProduct.amount) {
                thisProduct.amount = payload.amount + thisProduct.amount
            } else {
                payload.product.amount = payload.amount
            }
            state.products.push(payload.product)
            const productDuplicate = state.products.filter(element => element.id === payload.id).shift()
            if(productDuplicate) {
                const sumaPrecios = productDuplicate.amount * productDuplicate.price
                productDuplicate.totalPrice = sumaPrecios
                const arrayWithoutDuplicate = state.products.filter(element => element.id !== productDuplicate.id)
                arrayWithoutDuplicate.push(productDuplicate)
                localStorage.setItem('productsInCart', JSON.stringify(arrayWithoutDuplicate))
                state.products = arrayWithoutDuplicate
            } else {
                state.products.push(payload.product)
            }
    },
    SET_PRODUCTS_LOCAL_STORAGE (state, payload) {
        state.products = payload
    },
    SET_REMOVE_PRODUCTS (state, payload) {
        const productForRemove = state.products.filter(element => element.id === payload).shift()
        if(productForRemove) {
            productForRemove.amount = 0
            productForRemove.totalPrice = 0
        }
        const removeProductFromSArray = state.products.filter(element => element.id !== payload)
        localStorage.setItem('productsInCart', JSON.stringify(removeProductFromSArray))
        state.products = removeProductFromSArray
    },
    SET_REMOVE_ALL_PRODUCTS (state) {
        localStorage.removeItem('productsInCart')
        state.products = []
    },
}
