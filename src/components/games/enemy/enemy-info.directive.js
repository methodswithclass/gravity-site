enemyModule.directive("enemyInfo", ['data.service', function (data) {

	return {
		restrict:"E",
		scope:false,
		replace:true,
		templateUrl:"assets/views/games/enemy/enemy-info.view.html",
		link:function ($scope, element, attr) {

			var type = $scope.type;

            var factor = 0.8;

			//console.log("info " + type.name);

			$(element).css({left:$scope.$index*$(element).width()});

			var enemy = document.createElement("div");
			$(enemy).addClass("absolute center");
			enemy.style.width = type.size*factor + "px";
			enemy.style.height = type.size*factor + "px";
			enemy.style.backgroundColor = type.color;
			enemy.style.borderRadius = type.size*factor/2 + "px";

			$(element).append(enemy);
		}

	}

}]);