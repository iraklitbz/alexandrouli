import gql from "graphql-tag";

//POSTS DE BLOG
export const allPosts = gql`
    query allPosts{
        posts{
            data{
                id
                attributes{
                    title
                    slug
                    category
                    feature {
                        data{
                            attributes {
                                url
                            }
                        }
                    }
                }
            }    
        }
    }
`

export const post = gql`
    query post($id:ID!){
        post(id:$id){
            data{
                id
                attributes{
                    title
                    slug
                    category
                    content
                    description
                    feature {
                        data{
                            attributes {
                                url
                            }
                        }
                    }
                }
            }    
        }
    }
`