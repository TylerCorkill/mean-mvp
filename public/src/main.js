// var db = require('../../helpers/db');

angular.module('main', [])

.config(function($locationProvider) {
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
});

// .controller('navigation', function($location, $window) {
//   this.template = 'views' + $location.url() + '.html';



//   this.switch = (destination) => {


//     this.template = 'views/' + destination + '.html';
//     $window.location.reload();
//     $location.path(destination);
//   };

//   // db.getRatings(function(results) {
//   //   this.ratings = results;
//   //   console.log(results);
//   //   // $window.location.reload();
//   // });

// })

// .directive('app', function() {
//   return {
//     scope: {},
//     restrict: 'E',
//     controller: 'navigation',
//     controllerAs: 'main',
//     bindToController: true,
//     templateUrl: 'views/layout.html'
//   };
// });