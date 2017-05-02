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
    url: '/submissions'
  }).then( (response) => {
      // console.log(this);
      this.ratings = response.data;
      // console.log(this.ratings);
    }, (response) => {
      console.log('ERROR', response);
  });


})


.controller('entries', function($http, $scope) {
  this.rate = (number, id) => {
    $http.post('/rating', {rating: number, submitID: id});
  };

  var id = JSON.stringify($scope.$parent.thing.id);

  $http.post('/average', {id: id}).then( (response) => {
    console.log(response);
    this.average = response.data;
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