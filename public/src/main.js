angular.module('main', [])
// angular.module('video-player')

.controller('hello', function() {
  // console.log(this);
  this.hello = 'hello world';

  this.template = 'views/home.html';

  this.switch = (destination) => {
    console.log(this);
    this.templateUrl = 'views/' + destination;
  };

})

.directive('app', function() {
  return {
    scope: {},
    restrict: 'E',
    controller: 'hello',
    controllerAs: 'main',
    bindToController: true,
    templateUrl: 'views/layout.html'
  };
});