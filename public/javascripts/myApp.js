var app = angular.module('myApp', ['ngRoute']).run(function($rootScope, $http) {
  $rootScope.authenticated = false;
  $rootScope.current_user = "";

  $rootScope.logout = function() {
    $http.get('/auth/signout');
    $rootScope.authenticated = false;
    $rootScope.current_user = "";
  }
});

app.config(function($routeProvider){
  $routeProvider
    //the timeline display
    .when('/', {
      templateUrl: 'main.html',
      controller: 'mainController'
    })
    //the login display
    .when('/login', {
      templateUrl: 'login.html',
      controller: 'authController'
    })
    //the signup display
    .when('/signup', {
      templateUrl: 'signup.html',
      controller: 'authController'
    });
});

app.controller('mainController', function($scope) {
  $scope.posts=[];
  $scope.newPost = {create_by: '',
                        text: '',
                        create_at: ''};

  $scope.post = function() {
    $scope.newPost.created_at = Date.now();
    $scope.posts.push($scope.newPost);
    $scope.newPost = {create_by: '',
                          text: '',
                          create_at: ''};

  }
});

app.controller('authController', function($scope, $rootScope, $http, $location){
  $scope.user = {username: '', password: ''};
  $scope.error_message = '';

  $scope.login = function(){
    $http.post('/auth/login', $scope.user).success(function(data){
      $rootScope.authenticated = true;
      $rootScope.current_user = data.user.username;

      $location.path('/');
    });
  };

  $scope.signup = function(){
    $http.post('/auth/signup', $scope.user).success(function(data){
      $rootScope.authenticated = true;
      $rootScope.current_user = data.user.username;

      $location.path('/');
    });
  };
});
