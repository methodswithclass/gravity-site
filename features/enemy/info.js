enemyModule.directive("info", function () {

	return {
		restrict:"E",
		scope:false,
		replace:true,
		templateUrl:"features/enemy/enemy-info.html",
		link:function ($scope, element, attr) {

			var type = $scope.type;
			$scope.reward = type.reward;
			$scope.punish = type.punish;

			var enemy = document.createElement("div");
			$(enemy).addClass("absolute bordered center");
			enemy.style.width = type.size + "px";
			enemy.style.height = type.size + "px";
			enemy.style.backgroundColor = type.color;
			enemy.style.borderRadius = type.size/2 + "px";

			console.log("enemy info " + $scope.$index);

			setTimeout(function () {

				$("#info" + $scope.$index).append(enemy);

			}, 300);
			
		}

	}

});