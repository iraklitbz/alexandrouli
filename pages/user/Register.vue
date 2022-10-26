
<template>
  <div>
    <Header />
    <div class="max-w-md w-full mx-auto mt-40">
      <h1 class="text-3xl font-extrabold mb-4">Sign up</h1>
      <ValidationObserver ref="form">
        <form @submit.prevent="validateForm">
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
          <div
            v-if="success"
            class="
              p-4
              mb-4
              text-sm text-green-700
              bg-green-100
              rounded-lg
              dark:bg-green-200 dark:text-green-800
            "
            role="alert"
          >
            Your account has been created successfully you can now
            <nuxt-link class="font-medium" to="/user/login">Login</nuxt-link>
          </div>
          <div>
            <label class="form-label mb-1.5 lg:mb-2" for="username">Username</label>
            <ValidationProvider rules="required" v-slot="{ errors }">
              <input class="form-control w-full" v-model="username" type="text" placeholder="Jon Snow">
              <error-message
                  :errors="errors[0]"
              />
            </ValidationProvider>
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
          <div class="mt-4">
            <label class="form-label mb-1.5 lg:mb-2" for="password">Password</label>
            <ValidationProvider rules="required" v-slot="{ errors }">
              <input class="form-control w-full" name="password" v-model="password" ref="password" type="password">
              <error-message
                  :errors="errors[0]"
              />
            </ValidationProvider>
          </div>
          <div class="mt-4">
            <label class="form-label mb-1.5 lg:mb-2" for="passwordtwo">Repeat password</label>
            <ValidationProvider rules="required" v-slot="{ errors }">
              <input @keyup="handlePasswordMatch" class="form-control w-full" name="password_confirmation" v-model="passwordtwo" type="password" data-vv-as="password">
              <error-message
                  :errors="errors[0]"
              />
              <span
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
            </ValidationProvider>
          </div>
          <button
              type="submit"
              class="btn btn--primary w-full mt-4"
              :disabled="!passwordMatch"
            >
              Register
          </button>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>
<script>
    export default {
      auth: 'guest',
      data() {
        return {
          success: false,
          err: null,
          username: '',
          email: '',
          password: '',
          passwordtwo: '',
          passwordMatch: null,
          passwordMatchMsg: 'At least 6 characters, please',
        }
      },
      methods: {
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
              try {
                this.$axios.setToken(false)
                await this.$axios.post('auth/local/register', {
                  username: this.username,
                  email: this.email,
                  password: this.password,
                })
                this.success = true
              } catch (e) {
                if (e.response) this.passwordMatchMsg = e.response.data.error.message
              }
        }
      }
    }
</script>
