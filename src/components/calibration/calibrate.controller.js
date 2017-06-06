controllerModule.controller("calibrate.controller", ['$scope', 'global.service', 'states.service', 'events.service', 'data.service', "calibrate.service", function ($scope, g, states, events, data, calibrate) {

	//console.log(" ");
	console.log("calibrate controller");
    

    var page = $scope.page;

    var timer;

    var phases = {
        over:{
            src:"img/tilt-arrow-over.png",
            instructions:"tilt down, away from you",
            pos:{
                image:{
                    top:"top0",
                    left:"right0"
                },
                continue:{
                    top:"bottom0",
                    left:"left0"
                }
            }
        },
        under:{
            src:"img/tilt-arrow-under.png",
            instructions:"tilt up, toward you",
            pos:{
                image:{
                    top:"bottom0",
                    left:"right0"
                },
                continue:{
                    top:"top0",
                    left:"left0"
                }
            }
        },
        right:{
            src:"img/tilt-arrow-right.png",
            instructions:"hold flat, tilt to the right",
            pos:{
                image:{
                    top:"top0",
                    left:"left0"
                },
                continue:{
                    top:"top0",
                    left:"right0"
                }
            }
        },
        left:{
            src:"img/tilt-arrow-left.png",
            instructions:"hold flat, tilt to the left",
            pos:{
                image:{
                    top:"top0",
                    left:"left0"
                },
                continue:{
                    top:"bottom0",
                    left:"right0"
                }
            }
        },
        none:{
            src:"",
            instructions:"continue",
            pos:{
                image:{
                    top:"top200",
                    left:"left0"
                },
                continue:{
                    top:"top0",
                    left:"right0"
                }
            }
        }
    }

    $scope.progress = "0%";
    $scope.message = "";
    $scope.accel;

    var $btn;
    var showing = true;

    var toggleBtn = function (_showing) {

        if (_showing) {

            showing = true;
            $btn.show();
            $btn.removeClass("hidden");
        }
        else {
            
            showing = false;
            $btn.hide();
            $btn.addClass("hidden");
        }

    }

    setTimeout(function () {

        $btn = $("#btn" + page.id);
        toggleBtn(false);

    }, 500);

    $scope.continue = function () {

        calibrate.toggleRunning();
        toggleBtn(false);
    }

    events.on("calibrate-btn-show", function () {

        toggleBtn(true);
    })

    events.on("calibrate-btn-hide", function () {

        toggleBtn(false);
    })

    events.on("calibrate-start", function () {

        clearInterval(timer);
        timer = setInterval(function() {

            $scope.message = calibrate.getMessage();
            $scope.progress = calibrate.getProgress()*100 + "%";

            $scope.$apply();

        }, 10);

    });

    events.on("calibrate-stop", function () {

        clearInterval(timer);
        timer = {};
        timer = null;

    });

    events.on("tiltover", function () {

        $scope.phase = phases.over;
    });

    events.on("tiltunder", function () {

        $scope.phase = phases.under;
    });

    events.on("tiltright", function () {

        $scope.phase = phases.right;
    });

    events.on("tiltleft", function () {

        $scope.phase = phases.left;
    });

    events.on("tiltnone", function () {

        $scope.phase = phases.none;
    })

}])