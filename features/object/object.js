objectModule.directive("object", ['send', 'data.service', 'utility', function (send, data, object, g) {

	return {
		restrict:'E',
		scope:false,
		replace:true,
		template:"<div class='absolute'></div>",
		link:function ($scope, element, attr) {

			var page = $scope.page;

			if (page.id != "home") {
				//var page = data.getPageById(pageName);

				var params = page.obj;

				element.css({height:params.size, width:params.size, borderRadius:params.size/2, backgroundColor:params.color});

				// if (params.shape == g.c.cross) {

				// 	object.cross(element, params);

				// }

				send.retrieve.accum({name:"objects", id:attr.id, data:element[0]});
			}
		}
	}

}]);