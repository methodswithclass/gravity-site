<!doctype html>
<html>
  <head>

    <link rel="stylesheet" href="libs/css/angular-material.min.css">
    <link rel="stylesheet" href="libs/css/bootstrap.css">
    <link rel="stylesheet" href="libs/css/bootstrap-switch.css">
    <link rel="stylesheet" href="libs/css/jquery-ui-1.12.1.css">
    
    <link rel="stylesheet" href="http://code.methodswithclass.com/api/classes.css">
    <link rel="stylesheet" href="css/museo300.css" type="text/css" charset="utf-8">
    <link rel="stylesheet" href="css/styles.css">
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">

    <script src="libs/js/jquery-1.12.4.js"></script>
    <script src="libs/js/jquery-ui-1.12.1.js"></script>
    <script src="libs/js/jquery-ui-touch_punch.js"></script>
    <script src="libs/js/jquery.scrollto.js"></script>
    <script src="libs/js/angular.min.js"></script>
    <script src="libs/js/hammer.js"></script>
    <script src="libs/js/jquery.hammer.js"></script>
    <script src="libs/js/angular.hammer.js"></script>
    <script src="libs/js/angular-route.min.js"></script>
    <script src="libs/js/angular.ui-router.min.js"></script>
    <script src="libs/js/angular-animate-1.5.5.min.js"></script>
    <script src="libs/js/angular-aria-1.5.5.min.js"></script>
    <script src="libs/js/angular-messages-1.5.5.min.js"></script>
    <script src="libs/js/angular-material-1.1.0.min.js"></script>
    <script src="libs/js/bootstrap-switch.js"></script>
    <script src="libs/js/angular-bootstrap-switch.js"></script>


    <base href="/">

    <script>
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

        ga('create', 'UA-85962895-3', 'auto');
        ga('send', 'pageview');

    </script>

  </head>
  <body ng-app="gravity">
    <div class="absolute width height deselect" id="main">
        
        <div ui-view=""></div>
        <div ui-view="modal"></div>
    
    </div>
    
    <console ng-attr-vis="hide"><console>
    

    <!-- Console -->

    <script src="http://code.methodswithclass.com/api/console-1.js"></script>

    <!-- Shared -->

    <script src="http://code.methodswithclass.com/api/shared-2.js"></script>
    <script src="http://code.methodswithclass.com/api/mcshared-1.js"></script>

    <!-- Acceleration -->

    <script src="http://code.methodswithclass.com/api/accelerometer-1.js"></script>

    <!-- App -->
    
    <script src="features/app/app.js"></script>


    <!-- Utility -->

    <script src="features/a_utility/utility.module.js"></script>


    <!-- Touch -->

    <script src="features/touch/touchModule.js"></script>
    <script src="features/touch/touch.js"></script>

    <!-- Controllers -->

    <script src="features/controllers/controllers.module.js"></script>
    <script src="features/controllers/checkingController.js"></script>
    <script src="features/controllers/validController.js"></script>
    <script src="features/controllers/pageController.js"></script>
    <script src="features/controllers/homeController.js"></script>
    <script src="features/controllers/settingsController.js"></script>
    <script src="features/controllers/calibrateController.js"></script>

    <!-- States -->

    <script src="features/state/stateModule.js"></script>
    <script src="features/state/states.js"></script>
    <script src="features/state/runtimeState.js"></script>

    <!-- Validate -->

    <script src="features/validate/validateModule.js"></script>
    <script src="features/validate/validate.service.js"></script>
    <script src="features/validate/validate.wrapper.js"></script>
    <script src="features/validate/valid.js"></script>

    <!-- Object -->

    <script src="features/object/object.module.js"></script>
    <script src="features/object/object.js"></script>

    <!-- Calibration -->

    <script src="features/calibration/calibrate.module.js"></script>
    <script src="features/calibration/calibrate.service.js"></script>
    <script src="features/calibration/progress.service.js"></script>

    <!-- Settings -->

    <script src="features/settings/settings.module.js"></script>
    <script src="features/settings/settings.service.js"></script>
    <script src="features/settings/settings-btn.js"></script>

    <!-- Games -->

    <script src="features/games/games.module.js"></script>
    <script src="features/games/keeper.js"></script>
    <script src="features/games/display.js"></script>
    <script src="features/games/preview.js"></script>

    <!-- Enemy -->

    <script src="features/games/enemy/enemy.module.js"></script>
    <script src="features/games/enemy/enemy.game.js"></script>
    <script src="features/games/enemy/enemy.service.js"></script>
    <script src="features/games/enemy/enemy-modal.js"></script>
    <script src="features/games/enemy/enemy-info.js"></script>

    <!-- Balance -->

    <script src="features/games/balance/balance.module.js"></script>
    <script src="features/games/balance/balance.game.js"></script>
    <script src="features/games/balance/target.service.js"></script>
    <script src="features/games/balance/meter.service.js"></script>
    <script src="features/games/balance/balance-modal.js"></script>

    <!-- Space -->

    <script src="features/games/space/space.module.js"></script>
    <script src="features/games/space/space.game.js"></script>
    <script src="features/games/space/space-modal.js"></script>

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
    <script src="features/interface/rotation.js"></script>
    

  </body>

 

  
</html>