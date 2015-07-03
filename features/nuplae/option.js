nuplaeModule.directive("option", function () {

	var directive = {
		restrict:'E',
		replace:true,
		template:"<div class='absolute width height30 text-center vcenter border-blue'>{{info.name}}</div>",
		scope:{
			info:'='
		},
	};

	return directive;

});