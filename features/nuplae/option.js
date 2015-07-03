nuplaeModule.directive("option", function () {

	var directive = {
		restrict:'E',
		scope:{
			game:'=game'
		},
		template:{{game.name}}
	};

	return directive;

});