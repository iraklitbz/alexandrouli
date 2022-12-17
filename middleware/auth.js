export default function ({app, route, redirect}){
    if (route.path !== '/usuario/login') {
      //we are on a protected route
      if(!app.$fire.auth.currentUser) {
        //take them to sign in page
        return redirect('/usuario/login')
      }
    } else if (route.path === '/usuario/login') {
      if(!app.$fire.auth.currentUser) {
        //leave them on the sign in page
      } else {
        return redirect('/')
      }
    }
  }
  