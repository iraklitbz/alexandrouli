<template>
    <nav class="header__nav js-header__nav" id="header-nav" role="navigation" aria-label="Main">
        <div class="header__nav-inner">
            <ul class="header__list">
            <li class="header__item"><nuxt-link to="/" class="header__link">Home</nuxt-link></li>
            <li class="header__item"><nuxt-link to="/productos" class="header__link">Productos</nuxt-link></li>
            <li class="header__item"><nuxt-link to="/sobre-georgia" class="header__link">Georgia</nuxt-link></li>
            <li class="header__item"><nuxt-link to="/sobre-nosotros" class="header__link">About </nuxt-link></li>
            <li class="header__item"><nuxt-link to="/contacto" class="header__link">Contacto </nuxt-link></li>
             <li class="header__item"><button @click="userLogout" class="header__link">Logout </button></li>
            <li class="header__item header__item--divider" aria-hidden="true"></li>
            <li class="header__item">
                <button class="relative" @click="handleToggleCart" aria-controls="drawer-1">
                    <load-svg name="shopBag" class="w-8 text-primary" />
                    <span v-if="products > 0"
                        class="text-white flex items-center justify-center bg-error w-4 h-4 rounded-full text-xs absolute bottom-0 right-0 transform"
                    >
                        {{carritoNumber}}
                    </span>
                </button>
            </li>
            </ul>
        </div>
    </nav>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
    props: {
        toggleCart: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        ...mapState({
                products: state => state.cart.products.length,
                carritoNumber: state => state.cart.products.reduce((sum, value) => (sum + value.cantidad ), 0)
        }),
        ...mapGetters(['loggedInUser'])
    },
    mounted() {
        console.log(this.loggedInUser)
    },
    methods: {
        async userLogout() {
          await this.$auth.logout()
        },
        handleToggleCart() {
            let toggleCart = this.toggleCart
            toggleCart = !toggleCart
            this.$emit("update-toggle", toggleCart);
        },
        logout() {
            this.$auth.logout()
        }
    }
}
</script>


