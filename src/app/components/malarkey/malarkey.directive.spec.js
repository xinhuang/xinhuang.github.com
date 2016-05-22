describe('directive malarkey', () => {
  let element;
  let scope;

  beforeEach(angular.mock.module('xinhuangGithubCom'));

  beforeEach(inject(($compile, $rootScope) => {
    const angularElement = angular.element(`
      <acme-malarkey values="['eat more.', 'play more', 'code more', 'sleep more']"></acme-malarkey>
    `);

    scope = $rootScope.$new();
    element = $compile(angularElement)(scope);
    scope.$digest();
  }));

  it('should be compiled', () => {
    expect(element.html()).not.toEqual(null);
  });

  it('should have isolate scope object with instanciate members', () => {
    const isolateScope = element.isolateScope();
    expect(isolateScope.values).toEqual(jasmine.any(Array));
    expect(isolateScope.values.length).toEqual(4);
  });

  it('should have span element', function () {
    var malarkeyElement = element.find('acme-malarkey');
    expect(malarkeyElement).toBeDefined();
  });
})
