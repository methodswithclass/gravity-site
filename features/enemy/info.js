enemyModule.directive("info", ['data.service', function (data) {

	return {
		restrict:"E",
		scope:false,
		replace:true,
		templateUrl:"features/enemy/enemy-info.html",
		link:function ($scope, element, attr) {

			var type = $scope.type;

			//console.log("info " + type.name);

			$(element).css({left:$scope.$index*$(element).width()});

			var enemy = document.createElement("div");
			$(enemy).addClass("absolute bordered hcenter");
			enemy.style.width = type.size + "px";
			enemy.style.height = type.size + "px";
			enemy.style.top = $(element).height()*0.5 - type.size/2 + "px";
			enemy.style.backgroundColor = type.color;
			enemy.style.borderRadius = type.size/2 + "px";

			$(element).append(enemy);
		}

	}

}]);