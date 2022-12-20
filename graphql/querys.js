import gql from "graphql-tag";

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