export class MainController {
  constructor($rootScope, $http) {
    'ngInject';

    $rootScope.header = 'Life is short';
    this.title = 'Life is short, ';
    $http.get('assets/posts/list.json').success((list) => {
      this.blogs = list.blogs;
      this.blogs.sort((lhs, rhs) => {
        if (lhs.date == rhs.date) {
          return 0;
        } else if (lhs.date > rhs.date) {
          return -1;
        } else {
          return 1;
        }
      })
    });

    this.taglines = [
      'eat more.',
      'sleep more.',
      'play more.',
      'code more.',
    ];
  }
}
