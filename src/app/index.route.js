export function routerConfig($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'app/main/main.html',
      controller: 'MainController',
      controllerAs: 'main'
    })
    .state('blog', {
      url: '/blogs/:blogFile',
      templateUrl: 'app/blog/blog.html',
      controller: 'BlogController',
      controllerAs: 'blog'
    });

  $urlRouterProvider.otherwise('/');
}
