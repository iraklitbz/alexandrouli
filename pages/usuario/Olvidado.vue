
<template>
    <div class="max-w-md w-full mx-auto">
      <h1 class="text-3xl font-extrabold mb-4">Nueva contraseña</h1>
      <ValidationObserver ref="form">
        <form class="relative" @submit.prevent="validateForm">
          <div
            v-if="success"
            class="
              my-4
              text-md text-green-700
              bg-green-100
              rounded-lg
              dark:bg-green-200 dark:text-green-800
            "
            role="alert"
          >
            Le hemos enviado un correo electrónico con instrucciones para restablecer su contraseña.
            <nuxt-link class="btn btn--primary w-full mt-4" to="/">Página de inicio</nuxt-link>
          </div>
          <div v-else class="mt-4">
              <label class="form-label mb-1.5 lg:mb-2" for="checkout-email">Email</label>
              <ValidationProvider rules="required|email" v-slot="{ errors }">
                <input class="form-control w-full" v-model="email" type="email" placeholder="email@email.com">
                <error-message
                    :errors="errors[0]"
                />
              </ValidationProvider>
              <button
                type="submit"
                class="btn btn--primary w-full mt-4"
              >
                Enviar
            </button>
            </div>
            <div
              v-if="loading" 
              class="absolute left-0 top-0 w-full h-full flex items-center justify-center"
            >
              <div class="bg-white bg-opacity-60 z-1 w-full h-full absolute left-0 top-0"></div>
              <Loader class="relative z-2" />
          </div>
        </form>
      </ValidationObserver>
    </div>
</template>
<script>
    export default {
      data() {
        return {
          err: null,
          email: '',
          success: false,
          loading: false,
        }
      },
      methods: {
        validateForm() {
            this.$refs.form.validate().then((valid) => {
                if (valid) {
                    this.userPassword()
                }
            })
        },
        async userPassword() {
          this.loading = true
          try {
            await this.$axios.post('/api/auth/forgot-password', {
              email: this.email,
            }).then((response) => {
                  if(response) {
                    this.success = true
                    this.loading = false
                  }
                })
          } catch (e) {
            this.loading = false
            if (e.response) this.err = e.response.data.error.message
          }
        },
      },
    }
</script>
