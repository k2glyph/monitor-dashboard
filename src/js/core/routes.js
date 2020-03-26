function loginController($scope, $location, $rootScope, $sce) {
  $rootScope.isLoggedIn = false;
  $scope.login = function(){
    if ($scope.loginForm.$valid) {
      if($scope.loginForm.username.$viewValue == 'admin' && $scope.loginForm.password.$viewValue == 'admin1234'){
        alert('login successful');
        location.reload();
        $rootScope.isLoggedIn = true;
        $scope.UserId = $scope.email;
        $scope.session = $scope.email;
        $scope.sessionName = 'admin';
        window.localStorage.setItem("SessionId", $scope.session);
        window.localStorage.setItem("SessionName", $scope.sessionName);
        window.localStorage.setItem("isLoggedIn", $scope.isLoggedIn);
        
        //userDetails.SessionId = $scope.session;        
      }else{
        alert('check your email id and password');
        $rootScope.isLoggedIn = false;
        window.localStorage.setItem("isLoggedIn", $rootScope.isLoggedIn);
        $scope.loginMessage = $sce.trustAsHtml('<i class="fa fa-exclamation-triangle"></i> check your email id and password');
      }
    }
    
 }
}
function appLoadController($scope, $location, $rootScope) {
  var loadUrl = localStorage.getItem('currentTab') || 'system-status'
  var loadAuzmorDash = function () {
    $rootScope.isLoggedIn = true;
    window.localStorage.setItem("isLoggedIn", $rootScope.isLoggedIn);
    $location.path(loadUrl)
    
  }

  $rootScope.$on('start-linux-dash', loadAuzmorDash)
  // $rootScope.session = window.localStorage.getItem("SessionId");
  // $rootScope.userName = window.localStorage.getItem("SessionName");
  // $rootScope.isLoggedIn = window.localStorage.getItem("isLoggedIn");
        // Call checkAuth factory for cheking login details
        // $scope.check = checkAuth(
    //   $location, $rootScope
    // );
        
        // $scope.logout = function () {
        //         window.localStorage.clear();
        //         $rootScope.isLoggedIn = false;
        //         $location.path("/");
        // };
}
function routesFn($routeProvider) {
  // console.log("Route function", $rootScope)
    for(var path in window.routes) {
      $routeProvider.when(path, window.routes[path]);
  }
  $routeProvider

      .when("/forbidden", {
        template: "<div> forbidden</div>"
      })
      .when('/login', {
        controller: ['$scope', '$location', '$rootScope', '$sce', loginController],
        templateUrl : 'login.html',
      })
      .when('/loading', {
        requireLogin: true,
        template: [
          '<div class="lead" style="text-align: center;">',
            '<loader></loader>',
            'Loading...',
          '</div>',
        ].join(''),
        controller: ['$scope', '$location', '$rootScope', appLoadController],
      })
  
      .when('/system-status', {
        requireLogin: true,
        template: [
          '<ram-chart sortablejs-id="ram-chart"></ram-chart> ',
          '<cpu-avg-load-chart sortablejs-id="cpu-avg-load-chart"></cpu-avg-load-chart> ',
          '<cpu-utilization-chart sortablejs-id="cpu-util-chart"></cpu-utilization-chart> ',
          '<cpu-temp sortablejs-id="cpu-temp"></cpu-temp> ',
          '<ram-intensive-processes sortablejs-id="ram-intensive-processes"></ram-intensive-processes> ',
          '<cpu-intensive-processes sortablejs-id="cpu-intensive-processes"></cpu-intensive-processes> ',
          '<disk-space sortablejs-id="disk-space"></disk-space> ',
          '<swap-usage sortablejs-id="swap-usage"></swap-usage> ',
          '<docker-processes sortablejs-id="docker"></docker-processes> ',
        ].join(''),
      })
      .when('/basic-info', {
        template: [
          '<machine-info sortablejs-id="machine-info"></machine-info>',
          '<memory-info sortablejs-id="memory-info"></memory-info>',
          '<cpu-info sortablejs-id="cpu-info"></cpu-info>',
          '<scheduled-crons sortablejs-id="scheduled-crons"></scheduled-crons>',
          '<cron-history sortablejs-id="cron-history"></cron-history>',
          '<io-stats sortablejs-id="io-stats"></io-stats>',
        ].join(''),
      })
  
      .when('/network', {
      template: [
          '<upload-transfer-rate-chart sortablejs-id="upload"></upload-transfer-rate-chart> ',
          '<download-transfer-rate-chart sortablejs-id="download"></download-transfer-rate-chart> ',
          '<ip-addresses sortablejs-id="ip-addresses"></ip-addresses> ',
          '<network-connections sortablejs-id="net-cons"></network-connections> ',
          '<arp-cache-table sortablejs-id="arp"></arp-cache-table> ',
          '<ping-speeds sortablejs-id="ping"></ping-speeds> ',
          '<bandwidth sortablejs-id="bandwidth"></bandwidth> ',
        ].join(''),
      })
  
      .when('/accounts', {
        template: [
          '<server-accounts sortablejs-id="server-accounts"></server-accounts> ',
          '<logged-in-accounts sortablejs-id="logged-in"></logged-in-accounts> ',
          '<recent-logins sortablejs-id="recent"></recent-logins> ',
        ].join(''),
      })
  
      .when('/apps', {
        template: [
          '<common-applications sortablejs-id="common-applications"></common-applications>',
          '<memcached sortablejs-id="memcached"></memcached>',
          '<redis sortablejs-id="redis"></redis>',
          '<pm2 sortablejs-id="pm2"></pm2>',
        ].join(''),
      })
}
angular.module('AuzmorDash').config(['$routeProvider', routesFn]);