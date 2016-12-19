'use strict';

app.controller('categoriaCtrl', function($scope, $rootScope, $ionicPlatform, $ionicLoading, $state, $ionicPopup, Template, Avaliacao, Time, $interval) {


//  $scope.avaliacoes = [];

/*  Avaliacao.find({filter: {where: {email: $rootScope.usuario.email}}}).$promise.then(function(avaliacoes, error) {
    console.log("Avaliacao.find");
    if (error) {
      console.log('Erro recuperando as avaliacoes: %j', error);
    }
    $scope.avaliacoes = avaliacoes;
    console.log(avaliacoes);
  }).catch(function(error) {
    console.log('Catch: Erro recuperando as avaliacoes: %j', error);
  });
*/
  $ionicLoading.show();

  $scope.isRunning = Time.isRunning();
  $scope.currentTime = Time.getCurrentTimeRemaining();
  $scope.cor = Time.getCurrentColor();
  formatTime();
  var stop = $interval(function() {
    // decrement remaining seconds
    $scope.currentTime = Time.getCurrentTimeRemaining();
    formatTime();
    if ($scope.currentTime === 0) {
      $interval.cancel(stop);
      $scope.isRunning = false;
    }
  }, 100, 0);


  function formatTime() {
    var min = Math.floor($scope.currentTime / 60);
    var sec = $scope.currentTime - min * 60;

    if (min < 10) {
      min = "0" + min;
    }

    if (sec < 10) {
      sec = "0" + sec;
    }

    $scope.formattedTime = min + ":" + sec;
  }


  $scope.avaliacoes = [];

//TODO: não está retornando nenhuma avaliacao neste código
  Avaliacao.find({filter: {where: {email: '' + $rootScope.usuario.email + '' }}}).$promise.then(function(avaliacoes, error) {
  //Avaliacao.find().$promise.then(function(avaliacoes, error) {
     console.log("Avaliacao.find");
     console.log(avaliacoes);
    if (error) {
      console.log(error);
      $scope.load();
    } else if (avaliacoes && avaliacoes.length > 0) {
      console.log('eventos: %j', avaliacoes);
      $scope.avaliacoes = avaliacoes;
    } else {
      $scope.load();
    }

  }).catch(function(error) {
    console.log('deu ruim questionario: %j', JSON.stringify(error));
  }).finally(function() {
    $ionicLoading.hide();
  });

  /*
  Template.find({
  	filter:
  	{where: {nome: 'Default'}
  }*/


  Template.find().$promise.then(function(templates, error) {
    console.log("Template.find");
    if(error) {
      console.log("Erro recuperando templates %j", error);
    }
    console.log('eventos: %j', templates);
    $scope.templates = templates;
  }).catch(function(error) {
    console.log('deu ruim template: %j', JSON.stringify(error));
  }).finally(function() {});

  //Recupera o questionario do servico

  $scope.load = function(template) {
    console.log("load!");

/*`  var avaliacao = {
      questoes: [],
      template: "Oi-BI",
      nome: $rootScope.usuario.nome,
      email: $rootScope.usuario.email
    };

    Avaliacao.create(avaliacao)
      .$promise.then(function(avaliacao, error) {
        if (error) {
          console.log(error);
        } else if (avaliacao) {
          console.log('eventos: %j', avaliacao);
          $scope.avaliacao = avaliacao;
        }
      }).catch(function(error) {
        console.log('deu ruim create avaliacao: %j', error);
      }).finally(function() {});*/
  };

  $scope.getGradeForEval = function (template) {
    //console.log("getGradeForEval");
    if($scope.avaliacoes){
      for (var i = 0 ; i < $scope.avaliacoes.length ; i++) {
        if (template.nome == $scope.avaliacoes[i].template) {

        //if (template.nome == $scope.avaliacoes[i].template && $scope.avaliacoes[i].email == $rootScope.usuario.email) {
          //console.log($scope.avaliacoes[i].nota);
          return $scope.avaliacoes[i].nota;
        }
      }
    }
    return null;
  }

  $scope.isAvaliacaoCompleta = function (template) {
    //console.log("isAvaliacaoCompleta");
    //console.log($scope.avaliacoes);
  if($scope.avaliacoes) {
      for (var i = 0 ; i < $scope.avaliacoes.length ; i++) {
        if (template.nome == $scope.avaliacoes[i].template) {
        //TODO: a linha abaixo eh temporaria...quando a query de avaliacoes estiver filtrando a linha de cima deve ser reativada
        //console.log($scope.avaliacoes[i].email);
        //if (template.nome == $scope.avaliacoes[i].template && $scope.avaliacoes[i].email == $rootScope.usuario.email) {
         //console.log("true");
          return true;
        }
      }
    }
    //console.log("false");
    return false;
  };

  $scope.goBackToTest = function() {

    $rootScope.categoria = Time.getCurrentCategoria();
    console.log($rootScope.categoria);

    $state.go('categoriaInicial', {}, {
      reload: true
    });
  };


  $scope.selectItem = function(template) {
    if(!$scope.isAvaliacaoCompleta(template)) {
      console.log(template.nome);
      //TODO: acertar o quaestionario
    //  $rootScope.avaliacao = $scope.avaliacao;

      //console.log($scope.avaliacao);

      $rootScope.template = template;
      $state.go('categoriaInicial', {}, {
        reload: true
      });
    } else {
      $scope.infoAlert("Esta avaliação já foi finalizada e submetida.","Avaliação completa");
    }
  };

  $scope.infoAlert = function(info, title) {
    var alertPopup = $ionicPopup.alert({
      title: title,
      template: info
    });
  };

  $scope.goTo = function(pagina) {
    $state.go(pagina);
  };
});
