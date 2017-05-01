angular.module('main', [])
// angular.module('video-player')

.controller('hello', function() {
  // console.log(this);
  this.hello = 'hello world';

})

.directive('app', function() {
  return {
    scope: {},
    restrict: 'E',
    controller: 'hello',
    controllerAs: 'stuff',
    bindToController: true,
    templateUrl: 'views/inner.html'
  };
});