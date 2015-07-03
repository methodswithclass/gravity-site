nuplaeModule.directive("option", function () {

	var directive = {
		restrict:'E',
		replace:true,
		template:"<div class='absolute width60 margin-v-20 height-100 center font-40 text-center border {{info.page.menu}}'>{{info.name}}</div>",
		scope:{
			info:'='
		},
	};

	return directive;

});