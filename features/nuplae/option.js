nuplaeModule.directive("option", function () {

	var directive = {
		restrict:'E',
		template:"{{info.name}}",
		scope:{
			info:'='
		},
	};

	return directive;

});