export class MainController {
  constructor($scope, $http) {
    'ngInject';

    $http.get('assets/posts/list.json').success((list) => {
      $scope.blogs = list.blogs;
    });
  }
}
