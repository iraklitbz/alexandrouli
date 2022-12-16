<template>
      <section class="thank-you py-20 lg:py-24">
        <div class="w-[calc(100%_-_2.5rem)] lg:w-[calc(100%_-_4rem)] mx-auto max-w-7xl">
          <div class="text-component text-center">
            <h1>Contact Us</h1>
            <p class="mt-5">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ducimus eos impedit nesciunt voluptates magni vero itaque.</p>
          </div>
          <div class="mt-10 mx-auto max-w-lg">
              <form name="contact" method="POST">
                  <input class="hidden" type="hidden" name="bot-field" />
                  <div class="margin-bottom-sm">
                      <label class="form-label margin-bottom-xxs" for="contactName">Nombre</label>
                      <input class="form-control width-100%" type="text" name="name" id="contactName" v-model="name" required>
                  </div>
              
                  <div class="margin-bottom-sm">
                      <label class="form-label margin-bottom-xxs" for="contactEmail">Email</label>
                      <input class="form-control width-100%" type="email" name="email" v-model="email" id="contactEmail">
                  </div>
              
                  <div class="margin-bottom-sm">
                      <label class="form-label margin-bottom-xxs" for="contactMessage">Mensaje</label>
                      <textarea class="form-control width-100%" rows="9" name="message" v-model="message" id="contactMessage"></textarea>
                  </div>
                  
                  <div class="text-right">
                      <button class="btn btn--primary" type="submit" @click="handleMail">Enviar</button>
                  </div>
              </form>
              <Alert
                v-if="mailSended"
                class="mt-5" 
                :headline="'Enviado'"
                :type="'success'"
                :message="'El formulario ha sido enviado correctamente, pronto nos pondremos en contacto contigo. Muchas gracias'"
              />
              <div
                v-if="loading" 
                class="text-center mt-5"
                >
                  <Loader />
              </div>
          </div>
        </div>
      </section>
</template>
<script>
  export default {
    name: 'ContactPage',
    data() {
      return {
        name: '',
        email: '',
        message: '',
        mailSended: false,
        loading: false      
      }
    },
    methods: {
      handleInputChange(e) {
        this.name = this.name
      },
      async handleMail(e) {
        e.preventDefault();
        this.loading = true
        const endpoint = 'https://49njpioksh.execute-api.eu-central-1.amazonaws.com/default/handleSendForm'
        const body = JSON.stringify({
            senderName: this.name,
            senderEmail: this.email,
            message: this.message
        });
        const requestOptions = {
          method: "POST",
          body
        };
        /*ENVIAR FORMULARIO*/
        try {
          await fetch(endpoint, requestOptions);
          this.mailSended = true
          this.name = ''
          this.email = ''
          this.message = ''
          this.loading = false
          this.handleMailIsSended()
        } catch (e) {
          console.log('ikaaaaaaa',e);
        }   
      },
      handleMailIsSended() {
        setTimeout(() => {
          this.mailSended = false
        }, 5000);
      }
    }
  }
</script>