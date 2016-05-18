export class MainController {
  constructor($scope, $http) {
    'ngInject';

    $scope.message = "Hello world!";

    $http.get('assets/posts/list.json').success((data) => {
      $scope.blogs = data;
    });
  }
}
