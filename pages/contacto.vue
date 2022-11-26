<template>
    <div>
        <Header />
        <section class="thank-you py-20 lg:py-32">
            <div class="col-6@md">
                <form name="contact" method="POST">
                    <input class="hidden" type="hidden" name="bot-field" />
                    <div class="margin-bottom-sm">
                        <label class="form-label margin-bottom-xxs" for="contactName">Name</label>
                        <input class="form-control width-100%" type="text" name="name" id="contactName" :value="name" required>
                    </div>
                
                    <div class="margin-bottom-sm">
                        <label class="form-label margin-bottom-xxs" for="contactEmail">Email</label>
                        <input class="form-control width-100%" type="email" name="email" :value="email" id="contactEmail">
                    </div>
                
                    <div class="margin-bottom-sm">
                        <label class="form-label margin-bottom-xxs" for="contactMessage">Message</label>
                        <textarea class="form-control width-100%" rows="9" name="message" :value="message" id="contactMessage"></textarea>
                    </div>
                    
                    <div class="text-right">
                        <button class="btn btn--primary" type="submit" @click="handleMail">Submit</button>
                    </div>
                </form>
            </div>
        </section>
    </div>
</template>
<script>
  export default {
    data() {
      return {
        name: '',
        email: '',
        message: '',
      }
    },
    methods: {
      handleMail(e) {
        e.preventDefault();
        /*ENVIAR FORMULARIO*/
        fetch('https://a3f8g1o1r1.execute-api.us-east-1.amazonaws.com/default/handleSendFormContact', {
          method: 'POST',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.message)
        }).then(async (res) => {
          if (res.status === 200) {
            await setTimeout(() =>{
              console.log(res);
            },2000)
          }
        })
      }
    }
  }
</script>