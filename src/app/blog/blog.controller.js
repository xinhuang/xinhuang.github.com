import path from 'path';
import parser from '../components/blog-parser/blog-parser';

export class BlogController {
  constructor($rootScope, $stateParams, $http, $location, $anchorScroll) {
    'ngInject';

    $rootScope.header = "Loading...";

    const blogFileName = $stateParams['blogFile'];
    const blogFile = path.join('/assets/posts/', blogFileName);

    $http.get(blogFile).success((data) => {
      const lines = data.split('\n');
      const post = parser.parse(blogFile, lines);

      $rootScope.header = post.header.title;

      const content = `# ${post.header.title}\n${post.content.join('\n')}`;
      this.content = content;
    });

    this.scrollToTop = () => {
      if ($location.hash() != 'top') {
        $location.hash('top');
      } else {
        $anchorScroll();
      }
    };
  }
}