// var db = require('../../helpers/db');

angular.module('main')
.controller('navigation', function($location, $window, $http) {
  this.template = 'views' + $location.url() + '.html';

  // console.log($location);

  this.switch = (destination) => {

    this.template = 'views/' + destination + '.html';
    // if (destination )
    $window.location.reload();
    $location.path(destination);
  };


  $http({
    method: 'GET',
    url: '/ratings'
  }).then( (response) => {
      // console.log(this);
      this.ratings = response.data;
      // console.log(this.ratings);
    }, (response) => {
      console.log('ERROR', response);
  });


})


.directive('ratingEntry', function() {
  return {
    scope: {
      rating: '<'
    },
    restrict: 'E',
    controller: function() {},
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