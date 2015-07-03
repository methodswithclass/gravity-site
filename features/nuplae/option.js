nuplaeModule.directive("option", function () {

	var directive = {
		restrict:'E',
		template:"<div class='absolute width height30 text-center vcenter'>'{{info.name}}'</div>",
		scope:{
			info:'='
		},
	};

	return directive;

});