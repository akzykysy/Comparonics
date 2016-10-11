angular
	.module('Comparonics')
	.controller('homeCtrl', homeCtrl);


function homeCtrl() {
	var vm = this;
	vm.pageHeader = {
		title: 'Comparonics'
	};
};