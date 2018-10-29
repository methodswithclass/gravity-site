interfaceModule.directive("preview", ['data.service', "manager.service", 'events', 'state.service', function (data, manager, events, state) {

	return {
		restrict:'E',
		scope:false,
		replace:true,
		template:'<div ng-include="getContentUrl()"></div>',
		link:function ($scope, element, attr) {

            var page = $scope.page;

            $scope.enemyTypes = data.enemydata;

            setTimeout(function () {
                $scope.innerpaneWidth = $("#previewenemyinner").width();
                $scope.enemyInfoWidth = $scope.innerpaneWidth * ($scope.enemyTypes.length) + 100;
            }, 500);

			$scope.getContentUrl = function() {
                return "assets/views/games/" + page.id + "/" + page.id + "-modal.view.html";
            }

            $scope.togglemessage = function (action) {

                $scope.hidemessage = action == 'hide';
            }

            $scope.toggleinfo = function (action) {

                $scope.hideinfo = action == 'hide';
                $scope.togglemessage(action);
            }

		}

	}
}]);