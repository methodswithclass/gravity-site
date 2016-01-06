<!doctype html>
<html>
  <head>

  	<link rel="stylesheet" href="css/museo/museo300.css" type="text/css" charset="utf-8">
    <link rel="stylesheet" href="http://code.methodswithclass.com/api/classes.css">
    <link rel="stylesheet" href="css/styles.css">
    <link rel="stylesheet" href="css/bootstrap.css">
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">


    <script src="libs/jquery-1.11.3.min.js"></script>
    <script src="libs/jquery.scrollto.js"></script>
    <script src="libs/hammer.js"></script>
    <script src="libs/angular.min.js"></script>
    <script src="libs/angular-route.min.js"></script>
    <script src="libs/angular.ui-router.min.js"></script>
    <script src="libs/jquery.hammer.js"></script>

    <base href="/">

  </head>
  <body ng-app="nuplae">
    <div class="absolute width height" id="main">
      <div ui-view=""></div>
      <div ui-view="modal"></div>
    </div>
    <console ng-attr-vis="hide"><console>
    

    <!-- App -->
    
    <script src="features/app/app.js"></script>

    <!-- Shared -->

    <script src="http://code.methodswithclass.com/api/shared-2.js"></script>

    <!-- Utility -->

    <script src="features/utility/utility.module.js"></script>

    <!-- Console -->

    <script src="http://code.methodswithclass.com/api/console-1.js"></script>

    <!-- Touch -->

    <script src="features/touch/touchModule.js"></script>
    <script src="features/touch/touch.js"></script>

    <!-- States -->

    <script src="features/state/stateModule.js"></script>
    <script src="features/state/states.js"></script>
    <script src="features/state/runtimeState.js"></script>

    <!-- Validate -->

    <script src="features/validate/validateModule.js"></script>
    <script src="features/validate/validate.service.js"></script>
    <script src="features/validate/validate.wrapper.js"></script>


    <!-- Acceleration -->

    <script src="features/acceleration/accel.module.js"></script>
    <script src="features/acceleration/vector.js"></script>
    <script src="features/acceleration/accelerometer.js"></script>

    <!-- Object -->

    <script src="features/object/object.module.js"></script>
    <script src="features/object/object.service.js"></script>
    <script src="features/object/object.generator.js"></script>
    <script src="features/object/object.js"></script>

    <!-- Calibration -->

    <script src="features/calibration/calibrate.module.js"></script>
    <script src="features/calibration/calibrate.service.js"></script>
    <script src="features/calibration/calibrate.js"></script>
    <script src="features/calibration/progress.service.js"></script>

    <!-- Games -->

    <script src="features/games/games.module.js"></script>
    <script src="features/games/keeper.js"></script>
    <script src="features/games/display.js"></script>

    <!-- Enemy -->

    <script src="features/enemy/enemy.module.js"></script>
    <script src="features/enemy/enemy.game.js"></script>
    <script src="features/enemy/enemy.service.js"></script>
    <script src="features/enemy/preview.js"></script>
    <script src="features/enemy/info.js"></script>

    <!-- Balance -->

    <script src="features/balance/balance.module.js"></script>
    <script src="features/balance/balance.game.js"></script>
    <script src="features/balance/target.service.js"></script>
    <script src="features/balance/meter.service.js"></script>

    <!-- Data -->

    <script src="features/data/data.module.js"></script>
    <script src="features/data/data.service.js"></script>

    <!-- Manager -->

    <script src="features/manager/manager.module.js"></script>
    <script src="features/manager/manager.service.js"></script>
    <script src="features/manager/toggle.js"></script>
    <script src="features/manager/games.library.js"></script>

    <!-- Interface -->

    <script src="features/interface/ui.module.js"></script>
    <script src="features/interface/option.js"></script>
    <script src="features/interface/page.js"></script>
    <script src="features/interface/back.js"></script>
    <script src="features/interface/repeat.directive.js"></script>
    <script src="features/interface/body.js"></script>
    <script src="features/interface/home.js"></script>
    

  </body>

 

  
</html>