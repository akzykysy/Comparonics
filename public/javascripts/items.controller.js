angular
	.module('Comparonics')
	.controller('itemsCtrl', itemsCtrl)

//itemsCtrl.$inject = ['$http'];
function itemsCtrl(comparonicsData) {
	var vm = this;
	
	comparonicsData.getItems()
		.success(function(data) {
			vm.data = { items : data };
			console.log(vm.data);
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
};

