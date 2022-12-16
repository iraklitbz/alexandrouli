
<template>
  <div class="max-w-md w-full mx-auto mt-8 py-20 lg:py-24">
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
        Su contraseña ha sido actualizada con éxito!
        <nuxt-link class="btn btn--primary w-full mt-4" to="/usuario/login">Login</nuxt-link>
      </div>
      
      
     <div
      v-else
     >
      <div class="mt-4">
        <label class="form-label mb-1.5 lg:mb-2" for="password">Nueva contraseña</label>
        <ValidationProvider rules="required" v-slot="{ errors }">
          <input @keyup="handleCheckMoreThen6characters" class="form-control w-full" name="password" v-model="password" ref="password" type="password">
          <error-message
              :errors="errors[0]"
          />
        </ValidationProvider>
      </div>
      <div class="mt-4">
        <label class="form-label mb-1.5 lg:mb-2" for="passwordConfirmation">Repite contraseña</label>
        <ValidationProvider rules="required" v-slot="{ errors }">
          <input @keyup="handlePasswordMatch" class="form-control w-full" name="password_confirmation" v-model="passwordConfirmation" type="password" data-vv-as="password">
          <error-message
              :errors="errors[0]"
          />
          <span
          v-if="!sendFormError"
            class="chip text-sm justify-center w-full lg:text-base mt-4"
            :class="{ 'chip--success': passwordMatch === true,'chip--error': passwordMatch === false }"
          >
            <em v-if="passwordMatch === true" class="not-italic chip__icon-wrapper flex justify-center">
                <load-svg name="check" class="w-4" />
            </em>
            <em v-else class="not-italic chip__icon-wrapper flex justify-center">
                <load-svg name="exclamacion" class="w-4" />
            </em>
            <i class="not-italic chip__label">{{ passwordMatchMsg }}</i>
        </span>
        <div v-else>
          <span
            class="chip text-sm justify-center w-full lg:text-base mt-4 chip--error"
            >
              <em class="not-italic chip__icon-wrapper flex justify-center">
                  <load-svg name="exclamacion" class="w-4" />
              </em>
              <i class="not-italic chip__label">{{ passwordMatchMsg }}</i>
          </span>
        </div>
        </ValidationProvider>
      </div>
      <button
          type="submit"
          class="btn btn--primary w-full mt-4"
          :disabled="!passwordMatch"
        >
          Cambiar
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
        success: false,
        password: '',
        passwordConfirmation: '',
        passwordMatchMsg: `Al menos 6 caracteres`,
        passwordMatch: null,
        sendFormError: false,
        loading: false
      }
    },
    methods: {
      handleCheckMoreThen6characters() {
          if (this.password.length < 6) {
            this.passwordMatchMsg = 'Al menos 6 caracteres'
            this.passwordMatch = false
          } else {
            this.passwordMatchMsg = ''
            this.handlePasswordMatch()
          }
        },
        handlePasswordMatch() {
          if (this.password === this.passwordConfirmation) {
            this.passwordMatchMsg = 'Contraseña coincide!'
            this.passwordMatch = true
          } else {
            this.passwordMatchMsg = 'Contraseña no coincide'
            this.passwordMatch = false
          }
        },
        validateForm() {
            this.$refs.form.validate().then((valid) => {
                if (valid) {
                    this.handleChangePassword()
                }
            })
        },
      async handleChangePassword() {
        this.loading = true
        try {
          await this.$axios.post('api/auth/reset-password', {
            code: this.$route.query.code,
            password: this.password,
            passwordConfirmation: this.passwordConfirmation,
          })
          this.loading = false
          this.success = true
        } catch (e) {
          this.loading = false
          if (e.response) this.passwordMatchMsg = e.response.data.error.message
        }
      },
    },
  }
</script>
