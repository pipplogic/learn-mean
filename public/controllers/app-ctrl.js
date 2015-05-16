var myApp = angular.module('myApp', []);

myApp.controller('AppCtrl', ['$scope', '$http', function ($scope, $http) {

  var refresh = function () {
    $http.get('/articles').success(function (res) {
      $scope.articles = res;
      $scope.article = {};
    });
  };

  refresh();

  $scope.addArticle = function () {
    $http.post('/articles', $scope.article)
      .success(function (res) {
        refresh();
      });
  };

  $scope.removeArticle = function (id) {
    $http.delete('/articles/' + id)
      .success(function (res) {
        refresh();
      });
  };

  $scope.editArticle = function (id) {
    $http.get('/articles/' + id)
      .success(function (res) {
        $scope.article = res;
      });
  };

  $scope.updateArticle = function () {
    $http.put('/articles/' + $scope.article._id, $scope.article)
      .success(function (res) {
        refresh();
      })
  };

}]);