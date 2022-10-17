<template>
    <span v-if="errors" class="chip chip--error text-sm lg:text-base mt-4">
        <em class="not-italic chip__icon-wrapper">
        <svg class="icon" viewBox="0 0 12 12" aria-hidden="true"><line x1="6" y1="1.75" x2="6" y2="7" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><circle cx="6" cy="10" r="1" fill="currentColor"/></svg>
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
