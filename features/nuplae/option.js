nuplaeModule.directive("option", function () {

	var directive = {
		restrict:'E',
		replace:true,
		template:"<div class='relative width80 height-100 margin-v-20 center border {{info.page.menu}}'>" +
					"<div class='absolute center font-30 text-center white'>{{info.name}}</div>" + 
				 "</div>",
		scope:{
			info:'='
		},
	};

	return directive;

});