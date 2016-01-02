objectModule.directive("object", ['send', 'data.service', 'object.generator', 'utility', function (send, data, object, g) {

	return {
		scope:false,
		replace:true,
		restrict:'E',
		template:"<div class='absolute'></div>",
		link:function ($scope, element, attr) {

			var pageName = $scope.info.name;

			var page = data.getPageByName(pageName);

			var params = page.obj;

			element.css({height:params.size, width:params.size, borderRadius:params.size/2, backgroundColor:params.color});

			if (params.shape == g.c.cross) {

				object.cross(element, params);

			}

			send.accum({name:"objects", id:attr.id, data:element[0]});
		}
	}

}]);