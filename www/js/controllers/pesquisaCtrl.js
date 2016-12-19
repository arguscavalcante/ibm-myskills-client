'use strict';

app.controller('pesquisaCtrl', function($scope, $rootScope, $ionicLoading, $ionicSlideBoxDelegate, $state, $ionicPopup, Avaliacao, $window, $interval, Time) {

  $scope.slider = {};

  $scope.options = {
    loop: false,
    effect: 'slide',
    speed: 300,
    pagination: false,
  };

  $scope.load = function() {
    console.log("load");
    $scope.questoes = $rootScope.template.questoes;
    $scope.cor = $rootScope.template.cor;
    $scope.corSecundaria = $rootScope.template.corSecundaria;
    $scope.nome = $rootScope.template.nome;
    $scope.descricao = $rootScope.template.descricao;


    console.log("-------------------------------------");
    //console.log("Questionario");
    //console.log($rootScope.questionario);
    //console.log("categorias do questionario");
    //console.log($rootScope.questionario.categorias);
    console.log("Template");
    console.log($rootScope.template);
    console.log("-------------------------------------");


    getCategoriaAvaliacao($rootScope.template);
    $scope.storeDataToLocal();
    //Tempo de countdown
    console.log(Time.isRunning());
    if (Time.isRunning()) {
      $scope.currentTime = Time.getCurrentTimeRemaining();
    } else {
      Time.timerCountdown($rootScope.template.tempo * 60, $rootScope.template.id, $rootScope.template.nome, $scope.cor, $rootScope.template, $rootScope.questionario);
    }

    $scope.currentTime = Time.getCurrentTimeRemaining();
    formatTime();
    var stop = $interval(function() {
      // decrement remaining seconds
      $scope.currentTime = Time.getCurrentTimeRemaining();
      formatTime();
      if ($scope.currentTime === 0) {
        $interval.cancel(stop);
      }
    }, 1000, 0);
  }

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

  function storeLocalTime() {
    $window.localStorage.setItem('currentTime', $scope.currentTime);
  }

  function getCurrentTimeFromStorage(defaultValue) {
    $scope.currentTime = $window.localStorage.getItem('currentTime');
    console.log($scope.currentTime);
    if (isNaN($scope.currentTime)) {
      console.log('defaultValue');
      $scope.currentTime = defaultValue;
    }
  }

  $scope.storeDataToLocal = function() {

    console.log("Key: " + $rootScope.template.id);
    console.log("Content: " + $scope.categoriaAvaliacao);

    $window.localStorage.setItem($rootScope.template.id + '' + $rootScope.usuario.email, JSON.stringify($scope.categoriaAvaliacao));
    console.log('Sent to localStorage: ' + $rootScope.template.id);
  }

  $scope.loadDataFromLocal = function() {
    console.log('loading form local storage...');
   //$scope.categoriaAvaliacao = JSON.parse($window.localStorage.getItem($rootScope.template.id));
   var ret = JSON.parse($window.localStorage.getItem($rootScope.template.id + '' + $rootScope.usuario.email));
    console.log($rootScope.template.id + ' loaded form local storage!');
    return ret;
  }

  function getCategoriaAvaliacao(template) {
    console.log('getCategoriaAvaliacao');
    console.log(template);
    /*for (var i = 0; i < categoriasAvaliacao.length; i++) {
      if (categoriasAvaliacao[i].nome === template.nome) {
        $scope.categoriaAvaliacao = angular.copy(categoriasAvaliacao[i]);
        $scope.completa = angular.copy(categoriasAvaliacao[i].completa);
        return;
      }
    }*/

    var _categoria = {
      codigoCadastro: $rootScope.usuario.codigoCadastro,
      gom: $rootScope.usuario.gom,
      template: template.nome,
      tempo: template.tempo,
      nota: "",
      questoes: []
    };

    var cat = $scope.loadDataFromLocal();
    console.log(cat);
    if (cat == null) {
      console.log("---loadDataFromLocal---");
      console.log(template);
      for (var i = 0; i < template.questoes.length; i++) {
        _categoria.questoes.push({
          'nome': template.questoes[i].nome,
          'resposta': { id:"", texto: ""}
        });
      }
    } else {
      console.log("preenche  _categoria com o conteúdo do localstorage");
      _categoria = cat;
    }
    $scope.categoriaAvaliacao = angular.copy(_categoria);
    console.log("fim da inicializacao da categoriaAvaliacao");
  }

  $scope.load();

  console.log($scope.nome);

  $scope.goTo = function(pagina) {
    $scope.storeDataToLocal();
    $state.go(pagina);
  }

  $scope.click = function(resposta, indice) {
    console.log(resposta);
    $scope.categoriaAvaliacao.questoes[indice].resposta = { "id": resposta.id, "texto": resposta.texto };
    console.log($scope.categoriaAvaliacao);
    $scope.storeDataToLocal();
  };

  $scope.$on("$ionicSlides.sliderInitialized", function(event, data) {
    // data.slider is the instance of Swiper
    $scope.slider = data.slider;

    console.log("Volta para o 1o slide");
    $scope.slider.slideTo(0, 0);

    $scope.slider.lockSwipes();

    console.log($scope.slider);

    $scope.slideNext = function() {
      if (!$scope.slider.isEnd) {
        //console.log($scope.slider);
        $scope.slider.unlockSwipes();
        $scope.slider.slideNext();
        $scope.slider.lockSwipes();

        $scope.storeDataToLocal();
      }
    };

    $scope.slidePrev = function() {
      if (!$scope.slider.isBeginning) {
        $scope.slider.unlockSwipes();
        $scope.slider.slidePrev();
        $scope.slider.lockSwipes();

        $scope.storeDataToLocal();
      }
    };

    $scope.isBeginning = function() {
      return $scope.slider.isBeginning;
    };

    $scope.isEnd = function() {
      return $scope.slider.isEnd;
    };

    $scope.getProgress = function() {

      var progress = 0;
      progress = $scope.slider.progress * 100;

      return progress.toFixed(0);
    };
  });

  $scope.$on("$ionicSlides.slideChangeStart", function(event, data) {
    console.log('Slide change is beginning');
    $scope.slider = data.slider;
    //$state.go($state.current, {}, {reload: true});
  });

  $scope.$on("$ionicSlides.slideChangeEnd", function(event, data) {
    // note: the indexes are 0-based
    console.log('Slide change is Ended');

    $scope.slider = data.slider;
    $scope.activeIndex = data.activeIndex;
    $scope.previousIndex = data.previousIndex;

    //$state.go($state.current, {}, {reload: true});
  });


  $scope.submitEnquiry = function() {

    $scope.storeDataToLocal();

    var submitEnquiry = true;
    for (var i = 0, len = $scope.questoes.length; i < len; i++) {
      if ($scope.categoriaAvaliacao.questoes[i].resposta.id == "") {
        submitEnquiry = false;
        var confirmPopup = $ionicPopup.confirm({
          title: "Atenção",
          template: "Existem questões não respondidas, deseja submeter a avaliação mesmo assim?"
        });

        confirmPopup.then(function(res) {
          if (res) {
            promptSubmission();
          } else {
            $scope.slider.unlockSwipes();
            $scope.slider.slideTo(i, 300);
            $scope.slider.lockSwipes();
          }
        });
        break;
      }
    }
    if (submitEnquiry) {
      promptSubmission();
    }
  };

  function promptSubmission() {
    var confirmPopup = $ionicPopup.confirm({
      title: "Atenção",
      template: "A avaliação <b> " + $scope.nome + " será submetida. Deseja continuar?"
    });

    confirmPopup.then(function(res) {
      if (res) {
        console.log("Avaliacao atual:");
        console.log($scope.categoriaAvaliacao);
        Time.submitEnquiryToServer();
        //submitEnquiryToServer($scope.categoriaAvaliacao);
      } else {
        console.log("Cancelou submissão");
      }
    });
  }

  function submitEnquiryToServer(avaliacao) {
    console.log("submitEnquiryToServer");
    avaliacao.completa = "completa";
    console.log(avaliacao);
    $ionicLoading.show();
    console.log($rootScope.questionario);
    //$rootScope.questionario.categorias.push($scope.categoriaAvaliacao);
    Avaliacao.upsert(avaliacao).$promise.then(function(questionario, error) {
        if (error) {
          console.log(error);
          $scope.infoAlert("Ocorreu um erro no envio da avaliação <b>" + avaliacao.template + "</b>.", "Erro no envio")
        } else {
          $scope.infoAlert("Respostas da avaliação <b>" + avaliacao.template + "</b> submetidas com sucesso.", "Atenção");
          $scope.goTo("categoria");
        }
        $ionicLoading.hide();
        console.log(questionario);
      }).catch(function(error) {
        console.log('deu ruim : %s', JSON.stringify(error));
      }).finally(function() {
        Time.stopCountDown();
        $ionicLoading.hide();
      });
  };

  $scope.infoAlert = function(info, title) {
    var alertPopup = $ionicPopup.alert({
      title: title,
      template: info
    });
  };

  $scope.descriptionAlert = function(type) {
    if (type == "importancia") {
      var alertPopup = $ionicPopup.alert({
        templateUrl: 'templates/popupImportancia.html',
        title: 'Importância',
        scope: $scope,
        okText: '<b>Entendi</b>',
        okType: 'button-positive'
      });
    } else {
      var alertPopup = $ionicPopup.alert({
        templateUrl: 'templates/popupComplexidade.html',
        title: 'Complexidade',
        scope: $scope,
        okText: '<b>Entendi</b>',
        okType: 'button-positive'
      });
    }
  };

  $scope.commentPopUp = function(info, title, completa) {
    console.log("commentPopUp");
    console.log(completa);
    console.log(info);
    console.log(info != null && info.length > 0 && completa != null);
    if (info != null && info.length > 0 && completa != null) {
      console.log("chama popup");
      $scope.infoAlert(info, title);
    }
  };

  $scope.infoPopUp = function(image, title) {
    $scope.image = image;
    var myPopup = $ionicPopup.show({
      templateUrl: 'templates/popupInstrucoes.html',
      title: title,
      scope: $scope,
      cache: false,
      buttons: [{
        text: '<b>Fechar</b>',
        type: 'button-dark',
        onTap: function() {
          //console.log('Cancelar');

          $state.go("pesquisa", {}, {
            reload: true
          });

        }
      }]
    });
  }

});
