import path from 'path';

export class PageController {
  constructor($rootScope, $stateParams, $http, $location, $anchorScroll) {
    'ngInject';

    // TODO: fix header
    $rootScope.header = "Resume - Xin Huang";

    const pageFileName = $stateParams['pageFile'];
    const pageFile = path.join('/assets/pages/', pageFileName);

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
