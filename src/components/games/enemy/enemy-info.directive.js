enemyModule.directive("enemyInfo", ['data.service', function (data) {

	return {
		restrict:"E",
		scope:false,
		replace:true,
		templateUrl:"assets/views/games/enemy/enemy-info.view.html",
		link:function ($scope, element, attr) {

			var type = $scope.type;

			//console.log("info " + type.name);

			$(element).css({left:$scope.$index*$(element).width()});

			var enemy = document.createElement("div");
			$(enemy).addClass("absolute bordered center");
			enemy.style.width = type.size + "px";
			enemy.style.height = type.size + "px";
			enemy.style.backgroundColor = type.color;
			enemy.style.borderRadius = type.size/2 + "px";

			$(element).append(enemy);
		}

	}

}]);