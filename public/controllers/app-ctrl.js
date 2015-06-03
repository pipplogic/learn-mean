var app = angular.module('myApp', []);

app.controller('AppCtrl', ['$scope', '$http', function ($scope, $http) {

  var refresh = function () {
    $http.get('/articles').success(function (res) {
      $scope.articles = res;
      $scope.article = {};
    });
  };

  refresh();

  $scope.toggleEdit = function (article) {
    article.isEditing = !article.isEditing;
  };

  $scope.update = function (article) {

    delete article.isEditing;

    if (!article._id) {

      $http.post('/articles', article)
      .success(function () {
        refresh();
      });

    } else {

      $http.put('/articles/' + article._id, article)
      .success(function () {
        refresh();
      })
    }
  };

  $scope.removeArticle = function (article) {

    $http.delete('/articles/' + article._id)
    .success(function () {
      refresh();
    });
  };

}]);

app.directive('joeArticle', function () {
  return {
    restrict: 'E',
    templateUrl: '/views/article.html'
  }
});

app.filter('externalLink', function () {
  return function (input) {
    if (input === undefined) return "javascript:void(0)";
    if (input.indexOf('://') !== -1) return input;
    return 'http://' + input;
  }
});