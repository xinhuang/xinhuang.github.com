import path from 'path';

export class BlogController {
  constructor($rootScope, $scope, $stateParams, $http) {
    'ngInject';

    const blogFileName = $stateParams['blogFile'];
    $rootScope.header = blogFileName;
    const blogFile = path.join('/assets/posts/', blogFileName);

    $http.get(blogFile).success((data) => {
      $scope.data = data;
    });
  }
}
