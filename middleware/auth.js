export default function ({app, route, redirect}){
    if (route.path === '/usuario/perfil') {
      //we are on a protected route
      if(!app.$fire.auth.currentUser.emailVerified) {
        //take them to sign in page
        return redirect('/usuario/login')
      }
    } 
  }
  