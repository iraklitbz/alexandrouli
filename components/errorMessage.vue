<template>
    <span v-if="errors" class="chip chip--error text-sm lg:text-base">
        <em class="not-italic chip__icon-wrapper flex justify-center">
            <load-svg name="exclamacion" class="w-4" />
        </em>

        <i class="not-italic chip__label">{{ errors }}</i>
    </span>
</template>
<script>
export default {
    props: {
        errors: {
            type: String,
            default: ''
        }
    }
}
</script>
<style>
  @import "~/assets/scss/_chip.scss";
</style>
