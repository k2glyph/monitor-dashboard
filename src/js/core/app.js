function checkAuth() {
  isLogin=localStorage.getItem("isLoggedIn");
  if (isLogin==="true") {
    return true
  }
}
function runFn(server, $location, $rootScope) {
  server.checkIfWebsocketsAreSupported()

  $rootScope.$on("$locationChangeSuccess", function(event, next, current) {
    if(checkAuth()) {
      var nextRoute = next.split('#')[1]
      if (nextRoute === '/logout') {
        localStorage.removeItem("isLoggedIn")
        location.reload();
      } else if (nextRoute === '/login') {
        $location.path("/system-status");
      }
    }else {
      $location.path("/login");
    }
    
  });
  // $rootScope.$on("$routeChangeError", function(event, current, previous, rejection) {
  //   // console.log("route change Error");
  //   // if (rejection == Access.UNAUTHORIZED) {
  //   //   $location.path("/login");
  //   // } else if (rejection == Access.FORBIDDEN) {
  //   //   $location.path("/forbidden");
  //   // }
  // });

  // // $location.path('/system-status')
}

angular
  .module('AuzmorDash', ['ngRoute'])
  .run([ 'server', '$location', '$rootScope', runFn])
  .config(['$compileProvider', function ($compileProvider) {
    $compileProvider.debugInfoEnabled(false)
  }])
  .controller('navBarController', function($scope){
    $scope.show=false
    if (localStorage.getItem("isLoggedIn")==="true") {
      $scope.show=true
      
      // $window.location.reload();
    }
  });
