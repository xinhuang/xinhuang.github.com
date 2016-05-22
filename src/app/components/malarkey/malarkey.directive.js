export function MalarkeyDirective(malarkey) {
  'ngInject';

  const directive = {
    restrict: 'E',
    scope: {
      values: '='
    },
    template: '&nbsp;',
    link: linkFunc,
  }

  return directive;

  function linkFunc(scope, el) {
    const typist = malarkey(el[0], {
      typeSpeed: 40,
      deleteSpeed: 40,
      pauseDelay: 800,
      loop: true,
      postfix: ' ',
    });

    el.addClass('acme-malarkey');

    angular.forEach(scope.values, (value) => {
      typist.type(value).pause().delete();
    });
  }
}
