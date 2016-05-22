describe('controllers', () => {
  let vm;

  beforeEach(angular.mock.module('xinhuangGithubCom'));

  beforeEach(inject(($controller) => {
    vm = $controller('MainController');
  }));

  it('should have a title', () => {
    expect(vm.title).toEqual(jasmine.any(String));
  });

  it('should have taglines', () => {
    expect(vm.taglines).toEqual(jasmine.any(Array));
  });
});
