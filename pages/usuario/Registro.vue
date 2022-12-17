
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
              :disabled="buttonRegister"
            >
              Registrate
          </button>
          <error-message
              v-if="err"
              :errors="err"
            />
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
          disabledRegister: true,
          passwordMatch: null,
          charcaterCounter: 0,
          sendFormError: false,
          passwordHasMoreThen6characters: false,
          passwordMatchMsg: `Repite tu contraseña`,
          loading: false
        }
      },
      computed: {
        buttonRegister() {
          if (this.email !== '' && this.username !== '' && this.password !== '' && this.passwordtwo !== '' && this.password === this.passwordtwo) {
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
                    this.userRegister()
                }
            })
        },
        async userRegister() {
            this.loading = true
      
              await this.$fire.auth.createUserWithEmailAndPassword(this.email, this.password)
              .then((res) => {
                //we are signed in
                  const user = this.$fire.auth.currentUser;
                  return user.updateProfile({
                      displayName: this.username
                  }).then(() => {
                      const user = this.$fire.auth.currentUser;
                      user.sendEmailVerification();
                  }).then(() => {
                      this.loading = false
                      this.$router.push('/confirmar-email');
                  })
              }).catch((e) => {
                  this.loading = false
                  console.log(e)
                  if(e.code = 'auth/email-already-in-use') {
                    this.err = 'Este email ya esta en uso'
                  }
              })   
            
        }

      }
    }
</script>
