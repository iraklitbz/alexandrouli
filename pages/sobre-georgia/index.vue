<template>
    <div class="py-20 lg:py-24">
        <CardGrid 
            :posts="posts.data"
        />
        
    </div>      
</template>
<script>
import { allPosts } from '~/graphql/querys'
export default {
    name: 'PostsPage',
    data(){
        return {
            
        }
    },
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