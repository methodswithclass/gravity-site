controllerModule.controller("calibrate.controller", ['$scope', 'global.service', 'state.service', 'events.service', 'data.service', "calibrate.service", function ($scope, g, states, events, data, calibrate) {


	console.log("calibrate controller");

    var page = $scope.page;

    var timer;

    var phases = {
        under:{
            src:"/assets/img/tilt-arrow-under.png",
            instructions:"hold device vertically",
            pos:{
                image:{
                    top:"bottom0",
                    left:"right0"
                },
                continue:{
                    top:"top0",
                    left: "left0",
                    rotate:""
                }
            }
        },
        right:{
            src:"/assets/img/tilt-arrow-right.png",
            instructions:"turn device horizontally",
            pos:{
                image:{
                    top:"top0",
                    left:"left0"
                },
                continue:{
                    top:"top0",
                    left: "right0",
                    rotate:"rotate-counter-90"
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
            $scope.progress = mcshared.utility.truncate(calibrate.getProgress() * 100, 1) + "%";

            $scope.$apply();

        }, 10);

    });

    events.on("calibrate-stop", function () {

        clearInterval(timer);
        timer = {};
        timer = null;

    });

    events.on("tiltunder", function () {

        $scope.phase = phases.under;
    });

    events.on("tiltright", function () {

        $scope.phase = phases.right;
    });

}])