<template>
    <div class="py-20 lg:py-24">
        <CardGrid
            v-if="posts" 
            :posts="posts.data"
        />
        
    </div>      
</template>
<script>
import { allPosts } from '~/graphql/querys'
export default {
    name: 'PostsPage',
    apollo: {
        posts: {
            prefetch: true,
            query: allPosts
        }
    }
}
</script>

<style scoped>
  @import "~/assets/scss/_card.scss";
</style>