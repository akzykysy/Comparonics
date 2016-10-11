angular
	.module('Comparonics')
	.controller('productCtrl', productCtrl)

//productCtrl.$inject = ['$routeParams', 'comparonicsData'];
function productCtrl($routeParams, comparonicsData) {
	var vm = this;
	vm.itemid = $routeParams.itemid;
	
	comparonicsData.itemById(vm.itemid)
		.success(function(data) {
			vm.data = { item : data };
			vm.pageHeader = {
				title: vm.data.item.model
			};
			console.log(vm.pageHeader);
		})
		.error(function (e) {
			console.log(e);
		});
};