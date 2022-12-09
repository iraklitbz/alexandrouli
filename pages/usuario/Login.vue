<template>
    <div class="max-w-md w-full mx-auto">
      <h1 class="text-3xl font-extrabold mb-4 text-center">Sign in</h1>
      <ValidationObserver ref="form">
        <form class="relative" @submit.prevent="validateEmail">
            <div>
              <label class="form-label mb-1.5 lg:mb-2" for="checkout-email">Email</label>
                  <ValidationProvider rules="required|email" v-slot="{ errors }">
                    <input class="form-control w-full" v-model="email" type="text" placeholder="email@email.com">
                    <error-message
                        :errors="errors[0]"
                    />
                  </ValidationProvider>
            </div>
            <div class="mt-3">
              <label class="form-label mb-1.5 lg:mb-2" for="password">Password</label>
                  <ValidationProvider rules="required" v-slot="{ errors }">
                    <input class="form-control w-full" v-model="password" type="password">
                    <error-message
                        :errors="errors[0]"
                    />
                  </ValidationProvider>
            </div>
            <div class="mt-2 text-sm text-gray-500 dark:text-gray-400">
              <nuxt-link
                class="font-medium text-blue-600 hover:underline dark:text-blue-500 mr-4"
                to="/usuario/registro"
                >Create a account?</nuxt-link>
              <nuxt-link
                class="font-medium text-blue-600 hover:underline dark:text-blue-500"
                to="/usuario/olvidado"
                >Reset password?</nuxt-link>
            </div>
            <error-message
              v-if="err"
              :errors="err"
            />

            <a
              v-if="notVerifedEmail"
              @click="resendVerificationEmail"
              class="text-blue-600 dark:text-blue-500 hover:underline dark:text-blue-500 mt-4 block text-sm cursor-pointer"
            >
              Reenviar el correo de verificacion
            </a>

          <button
            type="submit"
            class="btn btn--primary w-full mt-4"
          >
            Sign in
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
      <button
        type="submit"
        class="btn btn--subtle w-full mt-4"
        @click="userLoginWithGoogle"
      >
        Google
      </button>
    </div>
</template>
<script>
    export default {
      data() {
        return {
          err: null,
          email: '',
          password: '',
          notVerifedEmail: false,
          loading: false
        }
      },
      methods: {
        async userLoginWithGoogle() {
          this.$auth
            .loginWith('google')
            .then(() => {
              this.$router.push('/')
            })
            .catch((err) => {
              this.err = err.message
            })
        },
        validateEmail() {
            this.$refs.form.validate().then((valid) => {
                if (valid) {
                    this.userLogin()
                }
            })
        },
        async userLogin() {
          this.loading = true
          this.notVerifedEmail = false
          try {
            await this.$auth.loginWith('local', {
              data: { identifier: this.email, password: this.password },
            }).then((response) => {
                  if(response) {
                    this.$router.push('/')
                    this.loading = false
                  }
                })
          } catch (e) {
            this.loading = false
            if(e.response.data.error.message === 'Your account email is not confirmed') {
                this.err = 'El correo de tu cuenta no está verificado'
                this.notVerifedEmail = true
            }
            else if(e.response.data.error.message === 'Invalid identifier or password') {
                this.err = 'El email o la contraseña son incorrectos'
            }
          }
        },
        async resendVerificationEmail(){
          this.loading = true
          try {
            await this.$axios.post('/api/auth/send-email-confirmation', {email: this.email}).then(
                  this.$router.push('/confirmar-email'),
                  this.loading = false
            )
          }
          catch (e) {
            this.loading = false
            if (e.response) {
              console.log(e)
            }
          }
        }
      },
    }
</script>
