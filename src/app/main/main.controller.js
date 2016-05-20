export class MainController {
  constructor($rootScope, $scope, $http, $interval) {
    'ngInject';

    $rootScope.header = 'Life is short,';
    $scope.title = 'Life is short, ';
    $scope.tagline = 'eat more.';
    $http.get('assets/posts/list.json').success((list) => {
      $scope.blogs = list.blogs;
    });

    let itl = 0;
    const taglines = [
      'eat more.',
      'sleep more.',
      'play more.',
      'code more.',
    ];
    $interval(() => {
      $scope.tagline = taglines[itl];
      itl += 1;
      if (itl >= taglines.length) {
        itl = 0;
      }
    }, 3000);
  }
}
