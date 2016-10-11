angular
	.module('Comparonics')
	.directive('navigation', navigation);

function navigation () {
	return {
		restrict: 'EA',
		templateUrl: '/partials/nav.template.html'
	};
}