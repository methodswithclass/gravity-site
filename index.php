<!doctype html>
<html>
  <head>

    <title>Gravity</title>

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

    <script src="http://code.methodswithclass.com/api/console-1b.js"></script>

    <!-- Shared -->

    <script src="http://code.methodswithclass.com/api/shared-1b.js"></script>
    <script src="http://code.methodswithclass.com/api/mcshared-1.js"></script>

    <!-- Acceleration -->

    <script src="http://code.methodswithclass.com/api/accelerometer-1.js"></script>

    <!-- App -->
    
    <script src="components/app/app/main.js"></script>


    <!-- Controllers -->

    <script src="components/app/controllers/controller.module.js"></script>
    <script src="components/app/controllers/page.controller.js"></script>
    <script src="components/app/controllers/home.controller.js"></script>


    <!-- Data -->

    <script src="components/app/data/data.module.js"></script>
    <script src="components/app/data/data.service.js"></script>


    <!-- Interface -->

    <script src="components/app/interface/interface.module.js"></script>
    <script src="components/app/interface/back.directive.js"></script>
    <script src="components/app/interface/body.directive.js"></script>
    <script src="components/app/interface/option.directive.js"></script>
    <script src="components/app/interface/page.directive.js"></script>
    <script src="components/app/interface/repeat.directive.js"></script>
    <script src="components/app/interface/rotation.directive.js"></script>


    <!-- States -->

    <script src="components/app/state/state.module.js"></script>
    <script src="components/app/state/state.service.js"></script>
    <script src="components/app/state/state.provider.js"></script>


    <!-- Touch -->

    <script src="components/app/touch/touch.module.js"></script>
    <script src="components/app/touch/touch.directive.js"></script>



    <!-- Games -->


    <!-- Balance -->

    <script src="components/gravity/games/balance/balance.module.js"></script>
    <script src="components/gravity/games/balance/balance.game.js"></script>
    <script src="components/gravity/games/balance/target.service.js"></script>
    <script src="components/gravity/games/balance/meter.service.js"></script>
    <script src="components/gravity/games/balance/balance-modal.directive.js"></script>


    <!-- Enemy -->

    <script src="components/gravity/games/games.module.js"></script>
    <script src="components/gravity/games/enemy/enemy.module.js"></script>
    <script src="components/gravity/games/enemy/enemy.game.js"></script>
    <script src="components/gravity/games/enemy/enemy.service.js"></script>
    <script src="components/gravity/games/enemy/enemy-modal.directive.js"></script>
    <script src="components/gravity/games/enemy/enemy-info.directive.js"></script>


    <!-- Space -->

    <script src="components/gravity/games/space/space.module.js"></script>
    <script src="components/gravity/games/space/space.game.js"></script>
    <script src="components/gravity/games/space/space-modal.directive.js"></script>
    


    <!-- Interface -->

    <script src="components/gravity/interface/display.directive.js"></script>
    <script src="components/gravity/interface/object.module.js"></script>
    <script src="components/gravity/interface/object.directive.js"></script>
    <script src="components/gravity/interface/preview.directive.js"></script>
    <script src="components/gravity/interface/time-keeper.service.js"></script>
    <script src="components/gravity/interface/toggle.directive.js"></script>



    <!-- Manager -->

    <script src="components/gravity/manager/manager.module.js"></script>
    <script src="components/gravity/manager/manager.service.js"></script>
    <script src="components/gravity/manager/games.library.js"></script>


    <!-- Services -->


    <!-- Calibration -->

    <script src="components/gravity/services/calibration/calibrate.module.js"></script>
    <script src="components/gravity/services/calibration/calibrate.service.js"></script>
    <script src="components/gravity/services/calibration/progress.service.js"></script>


    <!-- Device -->

    <script src="components/gravity/services/device/checking.controller.js"></script>



    <!-- Settings -->


    <script src="components/gravity/services/settings/settings.controller.js"></script>
    <script src="components/gravity/services/settings/settings.module.js"></script>
    <script src="components/gravity/services/settings/settings.service.js"></script>
    <script src="components/gravity/services/settings/settings-btn.directive.js"></script>


    <!-- Utility -->

    <script src="components/gravity/services/utility/gravity.utility.module.js"></script>


    <!-- Validate -->


    <script src="components/gravity/services/validate/valid.controller.js"></script>
    <script src="components/gravity/services/validate/validate.module.js"></script>
    <script src="components/gravity/services/validate/validate.service.js"></script>
    <script src="components/gravity/services/validate/valid.directive.js"></script>
    <script src="components/gravity/services/validate/validate-wrapper.service.js"></script>


    

  </body>

 

  
</html>