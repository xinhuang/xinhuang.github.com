import path from 'path';
import parser from '../components/blog-parser';

export class BlogController {
  constructor($rootScope, $scope, $stateParams, $http) {
    'ngInject';

    const blogFileName = $stateParams['blogFile'];
    $rootScope.header = blogFileName;
    const blogFile = path.join('/assets/posts/', blogFileName);

    $http.get(blogFile).success((data) => {
      const lines = data.split('\n');
      const post = parser.parse(blogFile, lines);
      const content = `# ${post.header.title}\n${post.content.join('\n')}`;
      $scope.data = content;
    });
  }
}
