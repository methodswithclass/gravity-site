validateModule.factory('validate-wrapper.service', [
  '$q',
  'validate.service',
  'events',
  'utility.service',
  'state.service',
  function ($q, validate, events, g, states) {
    var isRegistered = false;

    var nextState = g.c.nextState;
    var proceedToNextState = g.c.proceedToNextState;

    var checkRegistered = function (resolve, reject, complete) {
      var i = 0;

      var timer = setInterval(function () {
        isRegistered = events.dispatch('console');

        // console.log("valid wrapper", "console registered", isRegistered, i);

        if (isRegistered || i > 200) {
          clearInterval(timer);
          timer = null;

          complete(resolve, reject);
        }

        i++;
      }, 10);
    };

    var goToNextState = function () {
      setTimeout(function () {
        if (proceedToNextState) {
          states.go(nextState);
        }
      }, 2000);
    };

    var runValidation = function (resolve, reject) {
      console.log('valid wrapper', 'run validation');

      validate.run().then(
        function () {
          //valid

          goToNextState();

          resolve();
        },
        function () {
          //invalid
          reject();
        }
      );
    };

    var forceValidation = function (resolve, reject) {
      //console.log("valid wrapper", "force validation");

      if (g.isValid()) {
        validate.validate().then(function () {
          //valid

          goToNextState();

          resolve();
        });
      } else {
        validate.invalidate().then(
          function () {
            //valid
            // resolve();
          },
          function () {
            reject(); //invalid
          }
        );
      }
    };

    var run = function () {
      console.log('valid wrapper', 'run');

      return $q(function (resolve, reject) {
        checkRegistered(resolve, reject, runValidation);

        // runValidation(resolve, reject);
      });
    };

    var force = function () {
      console.log('valid wrapper', 'force validation');

      return $q(function (resolve, reject) {
        checkRegistered(resolve, reject, forceValidation);

        // forceValidation(resolve, reject);
      });
    };

    return {
      run: run,
      force: force,
    };
  },
]);
