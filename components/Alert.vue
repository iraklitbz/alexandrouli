<template>
    <div 
        class="alert alert--is-visible text-contrast-higher rounded-md p-4 absolute text-[0.9375rem] [&.alert--is-visible]:static js-alert" role="alert"
        :class="`bg-${type}/20`"
    >
        <div class="flex items-center justify-between">
            <div class="flex items-center">
            <svg class="h-6 w-6 mr-2 text-success icon" viewBox="0 0 24 24" aria-hidden="true">
                <g fill="currentColor">
                <circle cx="12" cy="12" r="12" opacity=".2" style="isolation:isolate"></circle>
                <path d="M9.5 17a1 1 0 0 1-.707-.293l-3-3a1 1 0 0 1 1.414-1.414L9.5 14.586l7.293-7.293a1 1 0 1 1 1.439 1.389l-.025.025-8 8A1 1 0 0 1 9.5 17z"></path>
                </g>
            </svg>

            <p><strong class="font-bold">{{headline}}:</strong> {{message}}</p>
            </div>
        
            <button v-if="closeButton" class="inline-flex shrink-0 ml-6 transition-all duration-300 hover:scale-110 js-alert__close-btn">
                <load-svg name="cross" class="w-8 text-black" />
            </button>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        type: {
            type: String,
            default: 'success'
        },
        closeButton: {
            type: Boolean,
            default: false
        },
        headline: {
            type: String,
            default: ''
        },
        message: {
            type: String,
            default: 'Success'
        }
    },
}
</script>
<style>
.alert {
  clip-path: inset(50%);
}

.alert--is-visible {
  clip-path: none;
}
</style>