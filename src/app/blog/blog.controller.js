import path from 'path';

export class BlogController {
  constructor($scope, $stateParams, $http) {
    'ngInject';

    const blogFile = path.join('/assets/posts/', $stateParams['blogFile']);

    $http.get(blogFile).success((data) => {
      $scope.data = data;
    });
  }
}
