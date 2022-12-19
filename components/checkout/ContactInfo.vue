<template>
     <ValidationObserver ref="form">
        <fieldset class="margin-bottom-lg">
            <legend class="form-legend font-bold">Contact Information</legend>

            <label class="form-label margin-bottom-xxs" for="checkEmail">Email</label>
            <ValidationProvider rules="required|email" v-slot="{ errors }">
                <input class="form-control w-full" v-model="email" @change="handleEmail" type="text" placeholder="email@email.com">
                <error-message
                    class="mt-4"
                    :errors="errors[0]"
                />
            </ValidationProvider>
        </fieldset>
    </ValidationObserver>
</template>

<script>
export default {
    data() {
        return {
            email: ''
        }
    },
    methods: {
        handleEmail() {
            this.$emit('update-email', this.email)
        }
    }
}
</script>
<style>
    @import "~/assets/scss/_chip.scss";
</style>
