<template>
    <div 
        class="alert alert--is-visible text-contrast-higher rounded-md p-4 absolute text-[0.9375rem] [&.alert--is-visible]:static js-alert" role="alert"
        :class="`alert--${type}`"
    >
        <div class="flex items-center justify-between">
            <div class="flex items-center">
            <load-svg v-if="type === 'error'" name="chk" class="w-10 mr-3" :class="`text-${type}`" />
            <load-svg v-else name="check2" class="w-10 mr-3" :class="`text-${type}`" />

            <p class="leading-6"><strong class="font-bold">{{headline}}:</strong> {{message}}</p>
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
            default: "success"
        },
        closeButton: {
            type: Boolean,
            default: false
        },
        headline: {
            type: String,
            default: ""
        },
        message: {
            type: String,
            default: "Success"
        }
    }
}
</script>
<style>
.alert {
  clip-path: inset(50%);
}

.alert--is-visible {
  clip-path: none;
}
.alert--error {
    @apply bg-error bg-opacity-10;
}
.alert--success {
    @apply bg-success bg-opacity-10;
}
</style>