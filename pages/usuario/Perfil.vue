
<template>
  <div>
    <div v-if="isVerified" class="w-[calc(100%_-_2.5rem)] lg:w-[calc(100%_-_4rem)] mx-auto max-w-7xl grid lg:gap-12 grid-cols-1 lg:grid-cols-3 mt-8 py-20 lg:py-24">
      <div class="col-span-4">
        <h1 class="text-3xl font-extrabold mb-4">Tu perfil</h1>
      </div>
      <div>
        <form>
          <div class="mb-6">
            <label
              for="email"
              class="
                block
                mb-2
                text-sm
                font-medium
                text-gray-900
                dark:text-gray-300
              "
              >Email</label
            >
            <input
              type="email"
              class="
                mb-6
                bg-gray-100
                border border-gray-300
                text-gray-900 text-sm
                rounded-lg
                focus:ring-blue-500 focus:border-blue-500
                block
                w-full
                p-2.5
                cursor-not-allowed
                dark:bg-gray-700
                dark:border-gray-600
                dark:placeholder-gray-500
                dark:text-gray-500
                dark:focus:ring-blue-500
                dark:focus:border-blue-500
              "
              :value="currentUser.email"
              disabled
            />
          </div>
          <div class="mb-6">
            <label
              for="username"
              class="
                block
                mb-2
                text-sm
                font-medium
                text-gray-900
                dark:text-gray-300
              "
              >Nombre</label
            >
            <input
              type="text"
              class="
                mb-6
                bg-gray-100
                border border-gray-300
                text-gray-900 text-sm
                rounded-lg
                focus:ring-blue-500 focus:border-blue-500
                block
                w-full
                p-2.5
                cursor-not-allowed
                dark:bg-gray-700
                dark:border-gray-600
                dark:placeholder-gray-500
                dark:text-gray-500
                dark:focus:ring-blue-500
                dark:focus:border-blue-500
              "
              :value="this.$fire.auth.currentUser.displayName"
              disabled
            />
          </div>
        </form>
          <div class="address-module">
            <div class="bg-floor rounded-md p-6 border-l-[3px] border-solid border-primary shadow-[0_0_0_1px_hsla(var(--color-contrast-higher)/0.05),0_0_0_1px_hsla(var(--color-contrast-higher)/0.02),0_1px_3px_-1px_hsla(var(--color-contrast-higher)/0.2)]">
              <div class="flex items-center justify-between mb-3">
                <h5 class="font-semibold text-contrast-higher">Dirección de entrega</h5>
                <button v-if="Object.keys(addressData).length !== 0" @click="handleAdressEdit" class="btn  text-sm bg-warning bg-opacity-75 hover:bg-opacity-100">Editar</button>
              </div>
              <div
                v-if="isAddingAdress || isEditingAdress"
              >
                <form>
                  <ValidationObserver ref="form">
                    <Address 
                      @update-address="handleAdressData"
                      :ID="currentUser.id"
                    />
                  </ValidationObserver>
                </form>
              </div>
              <div
                  v-if="Object.keys(addressData).length === 0 && !isAddingAdress"
                  @click="handleAdressAdd" 
                  class="cursor-pointer mt-4 py-2 bg-contrast-low bg-opacity-20 hover:bg-opacity-35 flex items-center justify-center rounded-sm"
                >
                <load-svg name="plus" class="w-5" />
              </div>
              <button v-if="isAddingAdress" @click="handleAdressSend" class="btn w-full btn--primary mt-5">Guardar</button>
              
              <div v-if="Object.keys(addressData).length !== 0 && !isAddingAdress" class="text-[0.9375rem] leading-snug text-contrast-medium">
                <ul>
                  <li>{{addressData.username}}</li>
                  <li>{{addressData.direccion}}</li>
                  <li>{{addressData.ciudad}}</li>
                  <li>{{addressData.provincia}}</li>
                  <li>{{addressData.postal}}</li>
                  <li>{{addressData.pais}}</li>
                </ul>
              </div>
            </div>
            <div class="text-center col-span-4">
                <a
                v-if="!sureWantToDeleteQuestion" 
                  @click="showAlert" 
                  class="text-error text-lg block text-center cursor-pointer mt-10"
                >
                  Borrar tu cuenta
                </a>
                <div
                  v-if="sureWantToDeleteQuestion"
                  class="mt-5 text-left">
                    <Alert 
                      class="mb-2 text-left" 
                      :headline="'¿Estás seguro?'"
                      :type="'error'"
                      :message="'No podras recuperar tu cuenta'"
                  />
                  <label class="form-label mb-1.5 lg:mb-2 text-left" for="password">Entra la contraseña para borrar tu cuenta</label>
                  <input class="form-control w-full" v-model="password" type="password">
                  <error-message
                    v-if="err"
                    class="mt-4"
                    :errors="err"
                  />
                  <button
                    @click="handleCloseDeleteZone"
                    class="btn btn--primary w-full mt-4"
                  >
                    Cerrar
                  </button>
                  <button
                    @click="handleDeleteAccount"
                    class="btn btn--subtle w-full mt-4"
                  >
                    Borrar tu cuenta
                  </button>
                  
                </div>
            </div>
          </div>
      </div>
      <div class="col-span-4 lg:col-span-2 mt-10 lg:mt-0">
        <order-review-table />
      </div>
    </div>
    <div 
      v-else
      class="w-[calc(100%_-_2.5rem)] lg:w-[calc(100%_-_4rem) mx-auto max-w-7xl py-20 lg:py-24"
      >
      <div class="note note--warning flex flex-column items-center">
        <em class="not-italic flex justify-center mr-6 w-12 h-12 rounded-full bg-warning bg-opacity-50 mb-4">
            <load-svg name="exclamacion" class="w-7" />
        </em>

        <div class="flex mt-1 justify-center lg:mt-1.5">
          <div class="note__content text-component text-center">
            <p class="note__title  text-contrast-higher"><strong>El correo no ha sido verificado aún</strong></p>
            <p>Por favor, comprueba su bandeja de entradas para verificar su correo</p>
            <a @click="handleResendVerificationCode" class="btn btn--primary">Reenviar correo de verificación</a>
            <p
              v-if="resendVerificationCode" 
              class="mt-3 text-success-darker text-sm flex justify-center items-center"
            >
              <load-svg name="check" class="w-5 mr-1" /><b>Enviado correctamente</b>, no olvide revisar la carpeta spam por si acaso. 
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  
</template>
<script>
    export default {
    middleware: "auth",
    data() {
        return {
            err: null,
            isAddingAdress: false,
            username: '',
            password: '',
            address: '',
            email: '',
            city: '',
            provincia: '',
            postcode: '',
            country: 'ES',
            addressData: {},
            isEditingAdress: false,
            addressID: null,
            sureWantToDeleteQuestion: false,
            resendVerificationCode: false
        };
    },
    computed: {
      currentUser() {
            return this.$store.state.user
      },
      isVerified() {
        return this.$fire.auth.currentUser.emailVerified
      }
    },
    mounted() {
        this.handleGetAdress()
    },
    
    methods: {
        handleAdressData (data) {
          this.username = data.username,
          this.address = data.address,
          this.email = this.currentUser.email,
          this.city = data.city,
          this.provincia = data.provincia,
          this.postcode = data.postcode
        },
        async handleAdressSend () {
          if(!this.isEditingAdress) {
            try {
              await this.$fire.firestore.collection('direcciones').add({
                    userID: this.currentUser.uid,
                    username: this.username,
                    email: this.email,
                    direccion: this.address,
                    ciudad: this.city,
                    provincia: this.provincia,
                    postal: this.postcode,
                    pais: this.country,
                    billingData: {
                      username: this.username,
                      direccion: this.address,
                      ciudad: this.city,
                      provincia: this.provincia,
                      postal: this.postcode,
                      pais: this.country
                    }
              }).then((response) => {
                if(response) {
                    this.$swal("Guardada!", "Tu dirección ha sido guardada.", "success");
                    this.isAddingAdress = false
                    this.handleGetAdress()
                  }
              })
            } catch (error) {
              console.log(error)
            }
          } else {
            try {
              await this.$fire.firestore.collection('direcciones').doc(this.addressID).update({
                    username: this.username,
                    direccion: this.address,
                    email: this.email,
                    ciudad: this.city,
                    provincia: this.provincia,
                    postal: this.postcode,
                    billingData: {
                      username: this.username,
                      direccion: this.address,
                      ciudad: this.city,
                      provincia: this.provincia,
                      postal: this.postcode
                    }
              }).then(() => {
                  this.$swal("Actualizado!", "Tu dirección ha sido actualizado con exito.", "success");
                  this.isAddingAdress = false
                  this.isEditingAdress = false
                  this.handleGetAdress()
              })
            } catch (error) {
              console.log(error)
            }
          }
        },
        async handleGetAdress() {
            try {
                await this.$fire.firestore.collection('direcciones').where("userID", "==", this.currentUser.uid).get().then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        this.addressID = doc.id
                        this.addressData = doc.data()
                    });
                })
            } catch (error) {
                console.log(error)
            }
        },
        handleAdressAdd () {
          this.isAddingAdress = true
        },
        handleAdressEdit () {
          this.isEditingAdress = true
          this.isAddingAdress = true
        },
        showAlert() {
            this.sureWantToDeleteQuestion = true
        },
        handleCloseDeleteZone() {
          this.sureWantToDeleteQuestion = false
        },
        async handleDeleteAccount() {
          try {
            await this.$fire.auth.signInWithEmailAndPassword(this.currentUser.email, this.password).then(() => {
              this.$fire.auth.currentUser.delete().then(() => {
                this.$swal("Borrado!", "Tu cuenta ha sido borrada con exito.", "success");
                this.$fire.auth.signOut()
                this.$router.push('/')
              })
          })
          } catch (e) {
            this.loading = false
            if(e.code = 'auth/wrong-password') {
                this.err = 'La contraseña es incorrecta'
            }
          }
        },
        async handleResendVerificationCode() {
          try {
            await this.$fire.auth.currentUser.sendEmailVerification()
            this.resendVerificationCode = true
          } catch (error) {
            console.log(error)
          }
        }
    }
}
</script>
<style>
.note {
  @apply bg-floor-light;
  @apply border-l-3 border-primary;
  @apply shadow;
  /* 👇 you can ovveride this padding using the padding utility classes */
}
.note:not([class^=padding-]):not([class*=" padding-"]) {
  @apply p-3 lg:p-5;
}

.note--warning {
  @apply border-l-warning;
}

.note--error {
  @apply border-l-error;
}

.note--success {
  @apply border-l-success;
}

.text-component .note__content > *:last-child {
  margin-bottom: 0;
}
.text-component .note__title {
  margin-bottom: 0;
}
</style>
