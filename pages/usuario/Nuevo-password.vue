
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
              class="mt-4"
              :errors="errors[0]"
            />
          </ValidationProvider>
        </div>
        <span class="flex items-center text-sm mt-2">
              <load-svg
                v-if="!passwordHasMoreThen6characters" 
                name='circle' 
                class="mr-1 w-3 text-contrast-medium"
              ></load-svg>
              <load-svg 
                v-else
                name='check' 
                class="mr-1 w-5 text-success"
              ></load-svg>
            Contraseña de 6 caracteres
          </span>
        <div class="mt-4">
          <label class="form-label mb-1.5 lg:mb-2" for="passwordtwo">Repite contraseña</label>
          <ValidationProvider rules="required" v-slot="{ errors }">
            <input @keyup="handlePasswordMatch" class="form-control w-full" name="password_confirmation" v-model="passwordtwo" type="password" data-vv-as="password">
            <error-message
              class="mt-4"
              :errors="errors[0]"
            />
          </ValidationProvider>
        </div>
        <span class="flex items-center text-sm mt-2">
            <load-svg
              v-if="!passwordMatch" 
              name='circle' 
              class="mr-1 w-3 text-contrast-medium"
            ></load-svg>
            <load-svg 
              v-else
              name='check' 
              class="mr-1 w-5 text-success"
            ></load-svg>
          {{ passwordMatchMsg }}
        </span>
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
  <error-message
    class="mt-4"
    v-if="err"
      :errors="err"
    />
  </div>
</template>
<script>
  export default {
    data() {
      return {
        err: null,
        success: false,
        password: '',
        passwordtwo: '',
        disabledRegister: true,
        passwordMatch: null,
        sendFormError: false,
        loading: false,
        passwordHasMoreThen6characters: false,
        passwordMatchMsg: `Repite tu contraseña`,
      }
    },
    computed: {
      buttonRegister() {
        if (this.password !== '' && this.passwordtwo !== '') {
          return this.disabledRegister = false
        } else {
          return this.disabledRegister = true
        }
      }
    },
    methods: {
      handleCheckMoreThen6characters() {
          if (this.password.length < 6) {
              this.passwordHasMoreThen6characters = false
          } else {
            this.passwordHasMoreThen6characters = true
          }
        },
        handlePasswordMatch() {
          if (this.password === this.passwordtwo && this.passwordtwo !== '') {
            this.passwordMatchMsg = 'Contraseñas coinciden'
            this.passwordMatch = true
          } else {
            this.passwordMatchMsg = 'Contraseñas no coinciden'
            this.passwordMatch = false
            if(this.passwordtwo === '') {
              this.passwordMatchMsg = 'Repite tu contraseña'
            }
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
        const code = this.$route.query.oobCode
        try {
          await this.$fire.auth.confirmPasswordReset(code, this.password).then(() => {
              this.success = true
              this.loading = false
        })
          
        } catch (e) {
          console.log(e) 
          this.loading = false
          if(e.code = 'auth/internal-error') {
              this.err = 'No se pudo cambiar la contraseña, intenta más tarde'
          }
        }
      },
    },
  }
</script>
