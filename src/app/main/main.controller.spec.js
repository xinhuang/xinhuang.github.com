describe('controllers', () => {
  let vm;

  beforeEach(angular.mock.module('xinhuangGithubCom'));

  beforeEach(inject(($controller) => {
    vm = $controller('MainController');
  }));
});
