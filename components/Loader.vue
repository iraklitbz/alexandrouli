<template>
    <div class="circle-loader circle-loader--v2" role="alert">
        <p class="circle-loader__label">Content is loading...</p>
        <div aria-hidden="true">
            <svg class="circle-loader__svg" width="48" height="48" viewBox="0 0 48 48"><circle class="circle-loader__base" cx="24" cy="24" r="19" fill="none" stroke="currentColor" stroke-width="2"/><circle class="circle-loader__fill" cx="24" cy="24" r="19" fill="none" stroke="currentColor" stroke-width="2"/></svg>
        </div>
    </div>
</template>
<style>
    @import "~/assets/scss/_loader.scss";
</style>