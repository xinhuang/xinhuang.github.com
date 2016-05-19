export class MainController {
  constructor($scope, $http) {
    'ngInject';

    $scope.message = "Hello world!";

    $http.get('assets/posts/list.json').success((data) => {
      $scope.blogs = [];
      for (var i = 0; i < data.length; ++i) {
        $scope.blogs[i] = { file: data[i] };
      }
    });
  }
}
