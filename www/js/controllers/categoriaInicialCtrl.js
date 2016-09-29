'use strict';

app.controller('categoriaInicialCtrl', function($scope, $rootScope, $state, $ionicPopup, Time, Timer) {

  $scope.cor = $rootScope.template.cor;
  $scope.corSecundaria = $rootScope.template.corSecundaria;
  $scope.nome = $rootScope.template.nome;
  $scope.descricao = $rootScope.template.descricao;
  $scope.tempo = $rootScope.template.tempo;

  $scope.goTo = function(pagina) {
    console.log("----------");
    console.log(Time.isRunning());
    console.log(Time.getCurrentTest());
    console.log($scope.nome);
    console.log("----------");

    if (Time.isRunning() && Time.getCurrentTest() != null && Time.getCurrentTest() != $scope.nome) {
      console.log("teste errado");
      $scope.infoAlert("O teste <b>" + Time.getCurrentTest() + "</b> está em andamento. Para começar um novo teste o atual deve ser submetido.", "Teste já iniciado");
    } else {
      $state.go(pagina, {}, {
        reload: true
      });
    }
  }

  $scope.initAval = function() {
    console.log("initAval");
  /*  if(!Time.isRunning() && Time.getCurrentTest() == null) {
    var inicio =  {
        email: $rootScope.usuario.email,
        template:$rootScope.template.nome,
        dataInicio: new Date().today() + " " + new Date().timeNow(),
        status: true
      };
      Timer.upsert(inicio).$promise.then(function(tempoInicio, error) {
        if (error) {
          console.log(error);

        }else {
          console.log(tempoInicio);
          $scope.goTo('pesquisa');
        }
    }).catch(function(error) {
      console.log('deu ruim tempo: %j', error);
    }).finally(function() {});
  }*/

  //TODO REMOVER DEPOIS QUE O CONTEUDO ACIMA ESTIVER FUNCIONANDO
  $scope.goTo('pesquisa');
}
  $scope.goBack = function(pagina) {
    $state.go(pagina, {}, {
      reload: true
    });
  }

  $scope.infoAlert = function(info, title) {
    var alertPopup = $ionicPopup.alert({
      title: title,
      template: info
    });
  };

});
