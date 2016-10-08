settingsModule.factory("settings.service", ['utility', function (g) {


	var save = function () {

    	g.setSessionFactor($("#amount").val()/100);

    	console.log("settings", "session factor", g.getSessionFactor());
    }


	return {
		save:save
	}

}]);