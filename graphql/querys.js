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
                                hash
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
                                hash
                            }
                        }
                    }
                }
            }    
        }
    }
`
//Este es para llamar a las bodegas
export const allBodegas = gql`
    query allBodegas{
        bodegas{
            data{
                id
                attributes{
                    title
                    slug
                    feature {
                        data{
                            attributes {
                                formats
                            }
                        }
                    }
                }
            }    
        }
    }
`
export const bodega = gql`
    query bodega($id: ID!){
        bodega(id:$id){
                data{
                    id
                    attributes{
                    title
                    description
                    slug
                        feature {
                            data{
                                attributes {
                                    formats
                                }
                            }
                        }
                    }
                }    
            }
    }
`

//Este es para llamar a las products
export const allProducts = gql`
    query allProducts($limit: Int!, $start: Int!){
        products (
            pagination: {limit: $limit, start: $start}
        ){
            data{
                id
                attributes{
                    name
                    slug
                    price
                    description
                    available
                    cultivo
                    images {
                        data{
                            attributes {
                                formats
                            }
                        }
                    }
                    feature {
                        data{
                            attributes {
                                hash
                                formats
                            }
                        }
                    }
                    bodegas {
                        data {
                            attributes {
                                title
                            }
                        }
                    }
                }
            }    
        }
    }
`

export const productByID = gql`
    query productByID($id: ID!){
        product(id:$id){
            data{
                id
                attributes{
                    name
                    slug
                    price
                    description
                    available
                    images {
                        data{
                            attributes {
                                formats
                            }
                        }
                    }
                    feature {
                        data{
                            attributes {
                                hash
                                formats
                            }
                        }
                    }
                    bodegas {
                        data {
                            attributes {
                                title
                            }
                        }
                    }
                }
            }    
        }
    }
`

//Este es para llamar a las products
export const allProductsByBodegas = gql`
  query allProductsByBodegas($id: ID!){
        products(
         filters: { bodegas: {id: {eq: $id}}}
        ){
            data{
                id
                attributes{
                    name
                  	price
                  	available
                  	slug
                  	cultivo
                  	feature {
                        data{
                            attributes {
                                formats
                            }
                        }
                    }
                  	bodegas {
                      data {
                       id
                      }
                    }
                }
            }    
      }
    }
`