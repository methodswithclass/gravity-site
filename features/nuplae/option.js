nuplaeModule.directive("option", function () {

	var directive = {
		restrict:'E',
		replace:true,
		template:"<div class='absolute width80 height-100 center border {{info.page.menu}}'>" +
					"<div class='absolute center font-30 text-center white'>{{info.name}}</div>" + 
				 "</div>",
		scope:{
			info:'='
		},
	};

	return directive;

});