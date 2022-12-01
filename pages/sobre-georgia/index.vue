<template>
    <CardGrid 
        :posts="posts"
    />
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
        .get(process.env.strapiUrl + '/api/posts?populate=*')
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