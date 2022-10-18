<template>
    <nav class="header__nav js-header__nav" id="header-nav" role="navigation" aria-label="Main">
        <div class="header__nav-inner">
            <div class="header__label">Main menu</div>
            <ul class="header__list">
            <li class="header__item"><nuxt-link to="/products" class="header__link">Products</nuxt-link></li>
            <li class="header__item"><a href="#0" class="header__link" aria-current="page">Resources</a></li>
            <li class="header__item"><a href="#0" class="header__link">Pricing</a></li>
            <li class="header__item"><a href="#0" class="header__link">Contact</a></li>
            <li class="header__item header__item--divider" aria-hidden="true"></li>
            <li class="header__item"><button @click="handleToggleCart" class="btn btn--primary" aria-controls="drawer-1">Cart</button></li>
            </ul>
        </div>
    </nav>
</template>

<script>
export default {
    props: {
        toggleCart: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        handleToggleCart() {
            let toggleCart = this.toggleCart
            toggleCart = !toggleCart
            this.$emit("update-toggle", toggleCart);
        }
    }
}
</script>


