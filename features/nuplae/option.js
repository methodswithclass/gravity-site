nuplae.module.directive("option", function () {

	return {
		restrict:'E',
		scope:{
			info:'='
		},
		templateUrl:'features/nuplae/option.html'
		//template:'<div>{{info.name}}</div>'
	}

});