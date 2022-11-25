export const state = () => ({
    products: [],
})

export const mutations = {
    SET_PRODUCTS (state, payload) {
            const thisProduct = state.products.filter(element => element.id === payload.id).shift()
            if(thisProduct && thisProduct.cantidad) {
                thisProduct.cantidad = payload.cantidad + thisProduct.cantidad
            } else {
                payload.product.cantidad = payload.cantidad
            }
            state.products.push(payload.product)
            const productDuplicate = state.products.filter(element => element.id === payload.id).shift()
            if(productDuplicate) {
                const sumaPrecios = productDuplicate.cantidad * productDuplicate.price
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
            productForRemove.cantidad = 0
            productForRemove.totalPrice = 0
        }
        const removeProductFromSArray = state.products.filter(element => element.id !== payload)
        localStorage.setItem('productsInCart', JSON.stringify(removeProductFromSArray))
        state.products = removeProductFromSArray
    },
}
