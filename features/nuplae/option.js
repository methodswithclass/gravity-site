nuplaeModule.directive("option", function () {

	var directive = {
		restrict:'E',
		template:"{{game.name}}",
		scope:{
			game:'=game'
		},
	};

	return directive;

});