describe('controllers', () => {
  let vm;

  beforeEach(angular.mock.module('xinhuangGithubCom'));

  beforeEach(inject(($controller) => {
    vm = $controller('MainController');
  }));

  it('should have a title', () => {
    expect(vm.title).toEqual(jasmine.any(String));
  });

  it('should have a tagline', () => {
    expect(vm.tagline).toEqual(jasmine.any(String));
  });
});
