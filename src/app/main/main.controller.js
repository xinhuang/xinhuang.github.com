export class MainController {
  constructor($rootScope, $http, $interval) {
    'ngInject';

    $rootScope.header = 'Life is short,';
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

    let itl = 0;
    const taglines = [
      'eat more.',
      'sleep more.',
      'play more.',
      'code more.',
    ];
    this.tagline = taglines[itl];
    $interval(() => {
      this.tagline = taglines[itl];
      itl += 1;
      if (itl >= taglines.length) {
        itl = 0;
      }
    }, 2000);
  }
}
