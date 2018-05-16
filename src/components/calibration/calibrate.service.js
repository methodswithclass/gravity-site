calibrateModule.factory("calibrate.service", ['progress.service', 'events', '$mdToast', 'settings.service', 'utility.service', 'cookie.service', function (progress, events, $mdToast, settings, utility, cookie) {

    var g = mcaccel.utility;

    var accel;
    var obj;
    var parent;

    var yDir = g.const.y;
    var xDir = g.const.x;

    // var calDir = yDir;

    var sm = {
        xDir: {
            same: "x axis unchanged",
            switched: "x axis switched"
        },
        yDir: {
            same: "y axis unchanged",
            switched: "y axis switched"
        }
    }

    var num_phases = 0;

    // var element;

    var accelValue = 0.01;
    var acc = {};
    var time = 0;
    var position;
    var current = [];
    var curr = 0;
    var running = true;

    var skipCalibrate = false;


    var clearCalibration = function () {

        cookie.clearCookies();
    }


    var showToast = function (dir, type) {

        $mdToast.show({
            template: "<md-toast class='absolute width height-200 padding0 margin0 bottom0'>" +
            "<div class='absolute width height'>" +
            "<div class='absolute width height md-toast-content bottom0'>" +
            "<div class='absolute vcenter font-50'>" +
            sm[dir][type] +
            "</div>" +
            "</div>" +
            "</div>" +
            "</md-toast>",
            autoWrap: false,
            hideDelay: 100
        });
    }

    var getProgress = function () {

        return progress.getPercent();
    }

    var getMessage = function () {

        return progress.getMessage();
    }

    var getPhasePercent = function () {

        return phase_p;
    }

    var getAccel = function () {

        return {
            curr: curr,
            factor: g.getFactor()
        };
    }

    var toggleRunning = function () {

        if (running) {

            running = false;
        }
        else {
            running = true;
        }

    }


    var getCalibrationData = function (direction) {

        if (direction == yDir) {
            return { x: 0, y: accelValue };
        }
        else if (direction == xDir) {
            return { x: accelValue, y: 0 };
        }
    }





    /* =======================================================================================*/
    /* ================================   Phase Functions   ==================================*/
    /* =======================================================================================*/

    var begin = function (index) {

        console.log("\nbegin phase", index, ":", scheme.phases[index].id);

        if (index + 1 >= num_phases) {
            events.dispatch("tiltnone");
            toggleRunning();
            events.dispatch("calibrate-btn-show");
        }
    }

    var loading = function (index) {

        var p;

        if (running) {
            console.log("running phase", index, ":", scheme.phases[index].id);
            p = 0.003;
        }
        else {
            console.log("pausing phase", index, ":", scheme.phases[index].id);
            p = 0;
        }

        return p;
    }

    var next = function (index) {

        reset();

        console.log("complete phase", index, ":", scheme.phases[index].id, "\n");

        phase_p = 0;

        if (index + 1 < num_phases && !skipCalibrate) {
            progress.setIndex(index + 1);
            progress.startPhase();
        }
        else {
            progress.hardStop();
            events.dispatch("gohome");
            events.dispatch("calibrate-btn-hide");
        }
    }


    var checkFactor = {

        start: function (index) {

            console.log("\nbegin factor phase", index, ":", scheme.phases[index].id);

            time = (new Date()).getTime();

            acc = {};
            acc = getCalibrationData(yDir);

            accel.start();
        },
        check: function (index, interval) {

            if (running) {

                console.log("running factor phase", index, ":", scheme.phases[index].id);

                time += interval;

                accel.motion({ accelerationIncludingGravity: acc, acceleration: acc, timeStamp: time });

                position = obj.absolutePos();

                phase_p = Math.abs(position.y) / accel.bounds.y / 2;

            }
            else {
                //console.log("pausing phase 1");
            }

            return phase_p / num_phases;
        },
        complete: function (index) {

            console.log("complete factor phase", index, ":", scheme.phases[index].id);
            console.log("calibrate", "reached y boundary")
            // console.log("acceleration", obj.acceleration);
            console.log("accel y", obj.acceleration.y);

            var objaccel = Math.abs(obj.acceleration.y);
            objaccel = objaccel != 0 ? objaccel : 1;

            var factor = g.const.dist * 1e9 / time / objaccel;

            g.setFactor(g.const.factorG, factor);
            cookie.setCookie(utility.c.factorKey, factor);

            console.log("calibrate", "time", time, "accel", objaccel, "factor", g.getFactor(g.const.factorG));

            next(index);

        }
    }

    var checkAxis = {

        start: function (index, axis) {

            console.log("\nbegin axis phase", axis, index, ":", scheme.phases[index].id);

            events.dispatch(axis == yDir ? "tiltunder" : "tiltright");
            toggleRunning();

            events.dispatch("calibrate-btn-show");
            events.dispatch("calibrate-img-show");

            accel.start();
        },
        check: function (index, axis) {

            if (running) {

                console.log("running axis phase", axis, index, ":", scheme.phases[index].id);

                current.push(accel.raw().gravity);

                phase_p += 1 / 100 / 100;

                curr = current.pop()[axis == yDir ? "y" : "x"];

            }
            else {
                //console.log("pausing phase", index);
                phase_p += 0;
            }

            return phase_p / num_phases;
        },
        complete: function (index, axis) {

            console.log("complete axis phase", axis, index, ":", scheme.phases[index].id, "\n");

            reset();

            if (curr < 0) {

                g.setAxis(axis == yDir ? yDir : xDir, -1);
                settings.settings.axes.setDirection(axis, -1);
                cookie.setCookie((axis == yDir ? utility.c.axisYKey : utility.c.axisXKey), -1);
                console.log("calibrate", axis == yDir ? "y" : "x", "direction", "SWITCHED");
                //showToast(axis == yDir ? "yDir" : "xDir", "switched");
            }
            else {

                g.setAxis(axis == yDir ? yDir : xDir, 1);
                settings.settings.axes.setDirection(axis, 1);
                cookie.setCookie((axis == yDir ? utility.c.axisYKey : utility.c.axisXKey), 1);
                console.log("calibrate", axis == yDir ? "y" : "x", "direction", "SAME");
                //showToast(axis == yDir ? "yDir" : "xDir", "same");
            }


            cookie.setCookie(utility.c.axisDoneKey, utility.c.done);

            current.length = 0;
            current = null;
            current = [];

            events.dispatch("calibrate-btn-hide");
            events.dispatch("calibrate-img-hide");

            next(index);
        }
    }

    /* =======================================================================================*/
    /* =======================================     End      ==================================*/
    /* =======================================================================================*/





    var scheme = {
        phases: [
            {
                index: 0,
                id: "loading",
                message: "loading calibration",
                start: function () {
                    begin(0);
                },
                update: function (interval, percent) {

                    return percent + loading(0);
                },
                complete: function () {

                    skipCalibrate = false;

                    var checkFactor = cookie.getCookie(utility.c.factorDoneKey);
                    var checkAxis = cookie.getCookie(utility.c.axisDoneKey);

                    console.log("skipcalibrate \n\n\n\n\n\n\n", skipCalibrate);

                    if (checkFactor == utility.c.done && checkAxis == utility.c.done) {

                        console.log("cookies match \n\n\n\n\n\n");

                        var factor = cookie.getCookie(utility.c.factorKey);
                        var axisY = cookie.getCookie(utility.c.axisYKey);
                        var axisX = cookie.getCookie(utility.c.axisXKey);

                        g.setFactor(g.const.factorG, factor);
                        g.setAxis(yDir, axisY);
                        g.setAxis(xDir, axisX);

                        skipCalibrate = true;
                    }

                    next(0);

                }
            },
            {
                index: 1,
                id: "checkY",
                message: "checking y axis",
                complete:false,
                start: function () {

                    checkAxis.start(1, yDir);
                },
                update: function (interval, percent) {

                    return percent + checkAxis.check(1, yDir);
                },
                complete: function () {

                    checkAxis.complete(1, yDir);
                }
            },
            {
                index: 2,
                id: "checkFactor",
                message: "calibrating factor",
                complete:false,
                start: function () {

                    checkFactor.start(2);
                },
                update: function (interval, percent) {

                    return percent + checkFactor.check(2, interval);
                },
                complete: function () {

                    checkFactor.complete(2);

                    cookie.setCookie(utility.c.factorDoneKey, utility.c.done);

                }
            },
            {
                index: 3,
                id: "checkX",
                message: "checking x axis",
                complete:false,
                start: function () {

                    checkAxis.start(3, xDir);
                },
                update: function (interval, percent) {

                    return percent + checkAxis.check(3, xDir);
                },
                complete: function () {

                    checkAxis.complete(3, xDir);

                    cookie.setCookie(utility.c.axisDoneKey, utility.c.done);
                }
            }
        ]
    }


    var addPercentToPhases = function () {
        for (var i in scheme.phases) {
            scheme.phases[i].percent = (parseInt(i) + 1) / num_phases;
        }
    };


    /* =======================================================================================*/
    /* ================================   Stage Functions   ==================================*/
    /* =======================================================================================*/

    var update = function (object, interval) {


    }

    var reset = function () {

        accel.stop();
        accel.reset();
    }

    var onCreate = function (input) {

        console.log("calibrate init");

        obj = input.object;
        accel = input.accel;
        parent = $(input.object.el()).parent();
        num_phases = scheme.phases.length;

        addPercentToPhases();

        progress.loadScheme(scheme);

    }

    var onEnter = function () {

        // window.ondevicemotion = accel.motion;

    }

    var onStart = function () {

        console.log("calibrate start");

        // g.setFactor(g.const.factorG, 1);
        g.setFactor(g.const.factorS, settings.settings.factor.default);
        // g.setAxis(g.const.y, 1);
        // g.setAxis(g.const.x, 1);

        setTimeout(function () {

            events.dispatch("calibrate-start");
            progress.startProgress();

        }, 500);

    }

    var onEnd = function () {

    }

    var onLeave = function () {

        events.dispatch("calibrate-stop");

    }

    /* =======================================================================================*/
    /* =======================================     End      ==================================*/
    /* =======================================================================================*/


    return {
        onCreate: onCreate,
        onEnter: onEnter,
        onStart: onStart,
        onEnd: onEnd,
        onLeave: onLeave,
        update: update,
        reset: reset,
        getProgress: getProgress,
        getMessage: getMessage,
        getPhasePercent: getPhasePercent,
        getAccel: getAccel,
        toggleRunning: toggleRunning,
        clearCalibration:clearCalibration
    }

}]);