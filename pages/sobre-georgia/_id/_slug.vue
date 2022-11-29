<template>
    <div class="pt-28">
      <Header />
      <section class="product-v3 py-8 lg:py-12 js-product-v3">
        <div class="w-[calc(100%_-_2.5rem)] lg:w-[calc(100%_-_4rem)] mx-auto max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-7xl">
          <div class="mb-3 lg:mb-5">
            <breadcrumbs 
              :name="title"
              :page="{ title: 'Sobre Georgia', link: '/sobre-georgia' }"
            />
          </div>
          <article class="story-v4 py-8 lg:py-12">
                <div class="w-[calc(100%_-_2.5rem)] lg:w-[calc(100%_-_4rem)] mx-auto max-w-lg md:max-w-3xl lg:max-w-5xl mb-8 lg:mb-12">
                    <div class="mb-5 lg:mb-12">
                    <h1 class="text-4xl lg:text-6xl lg:leading-tight xl:text-7xl xl:leading-tight">
                        <a class="story-v4__title" href="#0">{{title}}</a>
                    </h1>
                    </div>

                    <div class="grid grid-cols-12 gap-5 lg:gap-8">
                        <div class="col-span-12 lg:col-span-3 xl:col-span-4">
                            <dl class="text-sm lg:text-base">
                            <dt><strong>Date</strong></dt>
                            <dd><time datetime="2020-06-17">June 17, 2020</time></dd>

                            <dt class="mt-3 lg:mt-5"><strong>Author</strong></dt>
                            <dd><a class="text-inherit" href="#0" rel="author">Olivia Gribben</a></dd>
                            </dl>
                        </div>

                        <div class="text-component text-space-y-md leading-normal col-span-12 lg:col-span-9 xl:col-span-8">
                            <p>{{description}}</p>
                        </div>
                    </div>
                </div>

                <figure class="w-full">
                    <img class="w-full" :src="strapiUrl + feature">
                </figure>
                <div class="main-content-body mt-10 md:max-w-3xl mx-auto">
                    <div v-html="content"></div>
                </div>
            </article>
        </div>
      </section>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  export default {
    name: 'DetailPostPage',
    data() {
      return {
        title: '',
        content: '',
        description: '',
        feature: '',
        category: '',
        strapiUrl: process.env.strapiUrl
      };
    },
    mounted() {
      axios
        .get(process.env.strapiUrl + '/api/entradas/' + this.$route.params.id + '?populate=*')
        .then(response => (
            this.id = response.data.data.id,
            this.title = response.data.data.attributes.title,
            this.content = response.data.data.attributes.content,
            this.description = response.data.data.attributes.description,
            this.feature = response.data.data.attributes.feature.data.attributes.url,
            this.handleImages(this.content)
          ))
        .catch(error => (this.error = error))
    },
    methods: {
      handleImages(content) {
        const regex = /<img[^>]+src="([^">]+)"/g;
        const images = content.match(regex);
        if (images) {
          images.forEach(image => {
            const regex = /<img[^>]+src="([^">]+)"/g;
            const src = image.match(regex)[0].split('"')[1];
            const newImage = `<img src="${this.strapiUrl + src}" />`;
            this.content = this.content.replace(image, newImage);
          });
        }
      }
    }
  }
  </script>
  <style lang="scss" scoped>
  .main-content-body p {
        margin-bottom: 20px;
  }
.story-v4 {
  position: relative;
  z-index: 1;
}

.story-v4__title {
  @apply text-contrast-higher;
  @apply decoration-contrast-higher/20;
  transition: 0.2s;
}
.story-v4__title:hover {
  @apply decoration-contrast-higher/100;
}

.story-v4__img-link {
  display: block;
}
.story-v4__img-link img {
  display: block;
  width: 100%;
  clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
  transition: 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
}
.story-v4__img-link:hover img {
  clip-path: polygon(2% 2%, 98% 2%, 98% 98%, 2% 98%);
}
  </style>
  