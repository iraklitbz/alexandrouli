<template>
    <div class="steps lg:text-base" aria-label="Multi-step indicator">
        <ol class="steps__list">
          <li
            v-for="(item, index) in steps" :key="index"
            class="step"
            :class="[item.current ? 'step--current': '', item.completed ? 'step--completed': '']"
          >
            <span class="step__label text-primary">{{ item.title }}</span>

            <span v-if="index !== steps.length - 1" class="step__separator" aria-hidden="true">
              <svg class="icon" viewBox="0 0 16 16">
                <polyline fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" points="6.5,3.5 11,8 6.5,12.5 "></polyline>
              </svg>
            </span>

            <div class="step__circle" aria-hidden="true">
              <svg v-if="item.completed" class="icon" viewBox="0 0 16 16"><polyline fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" points="1,9 5,13 15,3 "></polyline></svg>
              <span v-else>{{ index + 1 }}</span>
            </div>
          </li>
        </ol>
      </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    data() {
        return {
        }
    },
    computed: {
         ...mapState({
                steps: state => state.steps.steps
        })
    }
}
</script>
<style lang="scss">
    @import "~/assets/scss/steps.scss";
</style>
