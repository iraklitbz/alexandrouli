
<template>
  <div class="w-[calc(100%_-_2.5rem)] lg:w-[calc(100%_-_4rem)] mx-auto max-w-7xl grid lg:gap-12 grid-cols-1 lg:grid-cols-3 mt-8 py-20 lg:py-24">
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
                @click="showAlert" 
                class="text-error text-lg block text-center cursor-pointer mt-10"
              >
                Borrar tu cuenta
              </a>
          </div>
        </div>
    </div>
    <div class="col-span-4 lg:col-span-2 mt-10 lg:mt-0">
      <order-review-table />
    </div>
  </div>
</template>
<script>
import { loadavg } from 'os'
    export default {
    middleware: "auth",
    computed: {
      currentUser() {
            return this.$store.state.user
        }
    },
    data() {
        return {
            isAddingAdress: false,
            username: '',
            address: '',
            email: '',
            city: '',
            provincia: '',
            postcode: '',
            country: 'ES',
            addressData: {},
            isEditingAdress: false,
            addressID: null
        };
    },
    mounted() {
      console.log(this.currentUser)
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
            this.$swal({
                title: "¿Estas seguro?",
                text: "No podras recuperar tu cuenta",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#999",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si, borrarla",
                cancelButtonText: "Cancelar"
            }).then(async (result) => {
                try {
                  await this.$fire.auth.signInWithEmailAndPassword(this.email, this.password).then((user) => {
                  //we are signed in
                  if(user) {
                    this.$swal("Borrada!", "Tu cuenta ha sido borrada.", "success");
                    this.$fire.auth.signOut()
                    this.$router.push("/");
                  } 
                })
                } catch (e) {
                  this.loading = false
                  if(e.code = 'auth/wrong-password') {
                      this.err = 'El email o la contraseña son incorrectos'
                  }
                }
            });
        }
    },
    components: { loadavg }
}
</script>
