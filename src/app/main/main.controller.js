export class MainController {
  constructor($rootScope, $scope, $http) {
    'ngInject';

    $rootScope.header = 'Life is short,';
    $http.get('assets/posts/list.json').success((list) => {
      $scope.blogs = list.blogs;
    });
  }
}
