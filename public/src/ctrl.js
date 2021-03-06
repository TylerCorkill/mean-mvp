// var db = require('../../helpers/db');

angular.module('main')
.controller('navigation', function($location, $window, $http) {
  this.template = 'views' + $location.url() + '.html';

  // console.log($location);

  this.switch = (destination, id) => {
    this.template = 'views/' + destination + '.html';
    $window.location.reload();
    if (id) {
      $location.path(id + '/' + destination);
    } else {
      $location.path(destination);
    }
  };



  $http({
    method: 'GET',
    url: '/submissions'
  }).then( (response) => {
      // console.log(this);
      this.ratings = response.data;
      // console.log(this.ratings);
    }, (response) => {
      console.log('ERROR', response);
  });


})


// .run( function($rootScope, $location, $window) {
//    $rootScope.$watch(function() {
//       return $location.url();
//     },
//     function(a){
//       console.log('url has changed: ' + a);
//       $window.location.reload();
//       // show loading div, etc...
//     });
// })


.controller('entries', function($http, $scope) {


  var id = JSON.stringify($scope.$parent.thing.id);

  $http.post('/average', {id: id}).then( (response) => {
    // console.log(response);
    this.average = response.data;
  }, (response) => {
    console.log('ERROR', response);
  });

  this.rate = (number, id) => {
    $http.post('/rating', {rating: number, submitID: id});
  };

  // this.getComments = (number, id) => {
  //   $http.post('/rating', {rating: number, submitID: id});
  // };


})


.directive('ratingEntry', function() {
  return {
    scope: {
      rating: '<',
      switch: '<'
    },
    restrict: 'E',
    controller: 'entries',
    controllerAs: 'main',
    bindToController: true,
    templateUrl: 'views/ratingEntry.html'
  };
})


.directive('app', function() {
  return {
    scope: {},
    restrict: 'E',
    controller: 'navigation',
    controllerAs: 'main',
    bindToController: true,
    templateUrl: 'views/layout.html'
  };
});