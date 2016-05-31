import path from 'path';

export class PageController {
  constructor($rootScope, $stateParams, $http, $location, $anchorScroll) {
    'ngInject';

    $rootScope.header = "pages";

    const pageFileName = $stateParams['pageFile'];
    const pageFile = path.join('/assets/pages/', pageFileName);
    console.log(pageFileName);

    $http.get(pageFile).success((data) => {
      this.content = data;
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
