//angular.module('starter.services', [])

app.factory('Time', function($interval, $ionicPopup, $window, Avaliacao, $ionicLoading, $state, $rootScope) {

  var countDown = 0; // number of seconds remaining
  var stop;
  var running = false;
  var currentTestName = "";
  var color = "";
  var categoria = null;
  var questionario = null;
  var idQuestionario = null;

  var Time = {
    timerCountdown: function (seconds, id, testName, testColor, currentCategoria, currentAvaliacao) {

      console.log("timerCountdown iniciado");
      running = true;
      // set number of seconds
      idQuestionario = id;
      questionario = currentAvaliacao;
      countDown = seconds;
      currentTestName = testName;
      color = testColor;
      categoria = currentCategoria;
      // start the countdown
      stop = $interval(function() {
        // decrement remaining seconds
        countDown--;
        console.log("decrementado...");
        // if zero, stop $interval and show the popup
        if (countDown === 0){
          running = false;
          $interval.cancel(stop);
          console.log("fim do countdown!");


          //Acao para o fim do tempo
          categoria = loadDataFromLocal(currentTestName)
          Time.submitEnquiryToServer(categoria, questionario);

          questionario = null;
          currentTestName = "";
          cor = "";
          categoria = null;

        }
      },1000,0); // invoke every 1 second
    },
    getCurrentCategoria: function()
    {
      return categoria;
    },
    getCurrentColor: function ()
    {
      return color;
    },
    getCurrentTest: function ()
    {
      return currentTestName;
    },
    isRunning: function () {
      return running;
    },
    resetCountDown: function () {
    countDown = 0; // number of seconds remaining
    },
    getCurrentTimeRemaining: function (){
      return countDown;
    },
    stopCountDown: function (){
      running = false;
      $interval.cancel(stop);
      console.log("fim do countdown!");
      currentTestName = "";
      cor = "";
      categoria = null;
    },
    submitEnquiryToServer: function(){
  			$ionicLoading.show();
        var categoria = loadDataFromLocal(idQuestionario + '' + $rootScope.usuario.email);

  			//categoria.completa = "completa";
        console.log("$rootScope.questionario");
        console.log($rootScope.questionario);
        console.log("categoria a ser submetida:");
        console.log(categoria);
        console.log(JSON.stringify(categoria));

  			//$rootScope.questionario.categorias.push(categoria);

  			Avaliacao.upsert(categoria).$promise.then(function (categoria, error) {
  				if(error)	{
  					console.log(error);
  						//$scope.infoAlert("Ocorreu um erro no envio da avaliação <b>" + categoria.template + "</b>.","Erro no envio")
  				}
  				else {
            console.log("sucesso!");
            var alertPopup = $ionicPopup.alert({
               title: 'Aviso',
               template: 'Avaliação <b>' +categoria.template+ '</b> submetida com sucesso!'});
               Time.stopCountDown();
               $state.go("categoria", {}, {reload: true});
  				}

  			}).catch(function (error) {
  				console.log('deu ruim : %s', JSON.stringify(error));
          var alertPopup = $ionicPopup.alert({
             title: 'Erro na submissão',
             template: 'Ocorreu um erro na submissão da avaliação <b>' +categoria.template+ '</b>. Tente novamente.'});
  			}).finally(function () {
          console.log("finally");
  				$ionicLoading.hide();

  			});
        //$state.go("categoria", {}, {reload: true});
  	}
  };


  function storeDataToLocal(parameter, data)
	{
		$window.localStorage.setItem(parameter, JSON.stringify(data));
		console.log('Sent to localStorage: ' + parameter);
	};

	function loadDataFromLocal(parameter)
	{
		console.log('loading form local storage...' + parameter);
		var data = JSON.parse($window.localStorage.getItem(parameter));
    console.log(data);
    return data;
	};

  return Time;

});
