<template>
    <div>
        <Header />
        <div class="py-28">
            <CardGrid 
                :posts="posts"
            />
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    name: 'PostsPage',
    data(){
        return {
            posts: [],
            strapiUrl: process.env.strapiUrl
        }
    },
    mounted () {
        axios
        .get(process.env.strapiUrl + '/api/entradas?populate=*')
        .then(response => (
                this.posts = response.data.data
            ))
        .catch(error => (this.error = error))
    }
}
</script>

<style scoped>
  @import "~/assets/scss/_card.scss";
</style>