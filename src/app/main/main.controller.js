export class MainController {
  constructor($rootScope, $http) {
    'ngInject';

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
      });
      this.blogs.forEach((e, i) => {
        this.blogs[i].file = this.blogs[i].file.slice(0, -3);
      });
    });

    this.taglines = [
      'eat more.',
      'sleep more.',
      'play more.',
      'code more.',
    ];
  }
}
