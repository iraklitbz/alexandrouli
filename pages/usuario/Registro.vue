
<template>
    <div class="max-w-md w-full mx-auto py-20 lg:py-24">
      <h1 class="text-3xl font-extrabold mb-4">Crea tu cuenta</h1>
      <ValidationObserver ref="form">
        <form class="relative" @submit.prevent="validateForm">
          <div>
            <label class="form-label mb-1.5 lg:mb-2" for="username">Nombre</label>
            <ValidationProvider rules="required" v-slot="{ errors }">
              <input class="form-control w-full" v-model="username" type="text" placeholder="Jon Snow">
              <error-message
                  :errors="errors[0]"
              />
            </ValidationProvider>
          </div>
          <div class="mt-4">
            <label class="form-label mb-1.5 lg:mb-2" for="checkout-email">Email</label>
            <ValidationProvider rules="required" v-slot="{ errors }">
              <input class="form-control w-full" v-model="email" type="email" placeholder="email@email.com">
              <error-message
                  :errors="errors[0]"
              />
            </ValidationProvider>
          </div>
          <div class="mt-4">
            <label class="form-label mb-1.5 lg:mb-2" for="password">Contraseña</label>
            <ValidationProvider rules="required" v-slot="{ errors }">
              <input @keyup="handleCheckMoreThen6characters" class="form-control w-full" name="password" v-model="password" ref="password" type="password">
              <error-message
                  :errors="errors[0]"
              />
            </ValidationProvider>
          </div>
          <div class="mt-4">
            <label class="form-label mb-1.5 lg:mb-2" for="passwordtwo">Repite contraseña</label>
            <ValidationProvider rules="required" v-slot="{ errors }">
              <input @keyup="handlePasswordMatch" class="form-control w-full" name="password_confirmation" v-model="passwordtwo" type="password" data-vv-as="password">
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
              Registrate
          </button>
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
      auth: 'guest',
      data() {
        return {
          err: null,
          username: '',
          email: '',
          password: '',
          passwordtwo: '',
          passwordMatch: null,
          charcaterCounter: 0,
          sendFormError: false,
          passwordMatchMsg: `Al menos 6 caracteres`,
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
          if (this.password === this.passwordtwo) {
            this.passwordMatchMsg = 'Passwords matchs!'
            this.passwordMatch = true
          } else {
            this.passwordMatchMsg = 'Passwords do not match'
            this.passwordMatch = false
          }
        },
        validateForm() {
            this.$refs.form.validate().then((valid) => {
                if (valid) {
                    this.userRegister()
                }
            })
        },
        async userRegister() {
            this.loading = true
              try {
                this.$axios.setToken(false)
                await this.$axios.post('api/auth/local/register', {
                  username: this.username,
                  email: this.email,
                  password: this.password,
                }).then((response) => {
                  if(response) {
                    this.loading = false
                    this.$router.push('/confirmar-email')
                  }
                })
              } catch (e) {
                if (e.response) {
                    if(e.response.data.error) {
                      this.sendFormError = true
                    }
                    if(e.response.data.error.message === 'Email or Username are already taken') {
                      this.passwordMatchMsg = 'El correo electrónico ya esta en uso'
                    } else if(e.response.data.error.message === 'username must be at least 3 characters') {
                      this.passwordMatchMsg = 'El nombre de usuario debe tener al menos 3 caracteres'
                    } else {
                      this.passwordMatchMsg = e.response.data.error.message
                    }
                    this.loading = false
                }
              }
        }

      }
    }
</script>
