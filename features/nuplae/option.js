nuplaeModule.directive("option", function () {

	var classes = "{'absolute', 'width', 'height30', 'text-center', 'vcenter'}";

	var directive = {
		restrict:'E',
		template:"<div ng-class=classes>{{info.name}}</div>",
		scope:{
			info:'='
		},
	};

	return directive;

});