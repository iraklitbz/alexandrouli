<template>
    <div>
        <Header />
        <section class="thank-you py-20 lg:py-32">
            <div class="col-6@md">
                <form name="contact" method="POST" data-netlify="true" data-netlify-honeypot="bot-field">
                    <input class="hidden" type="hidden" name="bot-field" />
                    <div class="margin-bottom-sm">
                        <label class="form-label margin-bottom-xxs" for="contactName">Name</label>
                        <input class="form-control width-100%" type="text" name="contactName" id="contactName" required>
                    </div>
                
                    <div class="margin-bottom-sm">
                        <label class="form-label margin-bottom-xxs" for="contactEmail">Email</label>
                        <input class="form-control width-100%" type="email" name="contactEmail" id="contactEmail">
                    </div>
                
                    <div class="margin-bottom-sm">
                        <label class="form-label margin-bottom-xxs" for="contactMessage">Message</label>
                        <textarea class="form-control width-100%" rows="9" name="contactMessage" id="contactMessage"></textarea>
                    </div>
                    
                    <div class="text-right">
                        <button class="btn btn--primary" type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </section>
    </div>
</template>