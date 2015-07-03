nuplaeModule.directive("option", function () {

	var directive = {
		restrict:'E',
		scope:{
			info:'='
		},
		template:{{info.name}}
	};

	return directive;

});