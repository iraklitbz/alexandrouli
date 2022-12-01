
<template>
    <div class="max-w-md w-full mx-auto">
      <h1 class="text-3xl font-extrabold mb-4">New password</h1>
      <ValidationObserver ref="form">
        <form @submit.prevent="userPassword">
          <div
            v-if="err"
            class="
              p-4
              mb-4
              text-sm text-red-700
              bg-red-100
              rounded-lg
              dark:bg-red-200 dark:text-red-800
            "
            role="alert"
          >
            {{ err }}
          </div>
          <div class="mt-4">
              <label class="form-label mb-1.5 lg:mb-2" for="checkout-email">Email</label>
              <ValidationProvider rules="required|email" v-slot="{ errors }">
                <input class="form-control w-full" v-model="email" type="email" placeholder="email@email.com">
                <error-message
                    :errors="errors[0]"
                />
              </ValidationProvider>
            </div>
        <button
              type="submit"
              class="btn btn--primary w-full mt-4"
            >
              New password
          </button>
        </form>
      </ValidationObserver>
    </div>
</template>
<script>
    export default {
      auth: 'guest',
      data() {
        return {
          err: null,
          email: '',
        }
      },
      methods: {
        async userPassword() {
          try {
            await this.$axios.post('auth/forgot-password', {
              email: this.email,
            })
          } catch (e) {
            if (e.response) this.err = e.response.data.error.message
          }
        },
      },
    }
</script>
