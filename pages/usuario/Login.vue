<template>
    <div class="max-w-md w-full mx-auto py-20 lg:py-24">
      <h1 class="text-3xl font-extrabold mb-4 text-center">Iniciar sesión</h1>
      <ValidationObserver ref="form">
        <form class="relative" @submit.prevent="validateEmail">
            <div>
              <label class="form-label mb-1.5 lg:mb-2" for="checkout-email">Email</label>
                  <ValidationProvider rules="required|email" v-slot="{ errors }">
                    <input class="form-control w-full" v-model="email" type="text" placeholder="email@email.com">
                    <error-message
                      class="mt-4"
                        :errors="errors[0]"
                    />
                  </ValidationProvider>
            </div>
            <div class="mt-3">
              <label class="form-label mb-1.5 lg:mb-2" for="password">Password</label>
                  <ValidationProvider rules="required" v-slot="{ errors }">
                    <input class="form-control w-full" v-model="password" type="password">
                    <error-message
                      class="mt-4"
                        :errors="errors[0]"
                    />
                  </ValidationProvider>
            </div>
            <div class="mt-2 text-sm text-gray-500 dark:text-gray-400 text-center">
              <nuxt-link
                class="font-medium text-blue-600 hover:underline dark:text-blue-500"
                to="/usuario/olvidado"
                >¿Olvidaste tu contraseña?</nuxt-link>
            </div>
            <error-message
              class="mt-4"
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
            Iniciar sesión
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
      <p class="text-center mt-7">- o -</p>
      <nuxt-link
        to="/usuario/registro"
        class="btn btn--subtle w-full mt-4"
      >
        Registrarte
      </nuxt-link>
    </div>
</template>
<script>
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
const provider = new GoogleAuthProvider();
const auth = getAuth();
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
      computed: {
        user() {
          return this.$store.state.user
        }
      },
      methods: {
        async userLoginWithGoogle() {
          await signInWithPopup(auth, provider)
          .then((result) => {
           if(result) {
              this.$router.push('/')
           }
          }).catch((error) => {
            console.log(error)
          });
          
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
            await this.$fire.auth.signInWithEmailAndPassword(this.email, this.password).then((user) => {
            //we are signed in
            if(user) {
              this.$router.push('/')
              this.loading = false
            } 
          })
          } catch (e) {
            this.loading = false
            if(e.code = 'auth/wrong-password') {
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
