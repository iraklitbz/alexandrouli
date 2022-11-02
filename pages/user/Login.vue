<template>
   <div class="pt-28">
    <Header />
    <div class="max-w-md w-full mx-auto">
      <h1 class="text-3xl font-extrabold mb-4 text-center">Sign in</h1>
      <ValidationObserver ref="form">
        <form @submit.prevent="validateEmail">
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
                to="/user/register"
                >Create a account?</nuxt-link>
              <nuxt-link
                class="font-medium text-blue-600 hover:underline dark:text-blue-500"
                to="/user/forgot"
                >Reset password?</nuxt-link>
            </div>
            <error-message
              v-if="err"
              :errors="'The email or password is incorrect'"
            />

          <button
            type="submit"
            class="btn btn--primary w-full mt-4"
          >
            Sign in
          </button>
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
  </div>
</template>
<script>
    export default {
      auth: 'guest',
      data() {
        return {
          err: null,
          email: '',
          password: '',
        }
      },
      methods: {
        async userLoginWithGoogle() {
          this.$auth
            .loginWith('google')
            .then(() => {
              this.$router.push('/user')
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
          try {
            await this.$auth.loginWith('local', {
              data: { identifier: this.email, password: this.password },
            })
          } catch (e) {
            if (e.response) this.err = e.response.data.error.message
          }
        },
      },
    }
</script>
