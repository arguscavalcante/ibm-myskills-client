'use strict';

app.controller('loginCtrl', function($scope,  $ionicPopup, $rootScope, $state, $ionicLoading, $window) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //

var usuario = {
		"codigoCadastro": "",
};
$scope.usuario = usuario;

function load ()
{
	$scope.usuario.codigoCadastro = JSON.parse($window.localStorage.getItem('codigoCadastro'));
}

load();



	$scope.goTo = function(pagina)
	{
		if($scope.usuario.codigoCadastro.length == 0 || $scope.usuario.gom == 0)
		{
			$scope.infoAlert ("O c&oacute;digo de cadastro e a posi&ccedil;&atilde;o devem ser preenchidos","Atenção")
		}
		else {
			$window.localStorage.setItem('codigoCadastro', JSON.stringify($scope.usuario.codigoCadastro));
			$window.localStorage.setItem('jobId', JSON.stringify($scope.usuario.gom));

			$rootScope.usuario = $scope.usuario;
			console.log($scope.usuario);
			$state.go(pagina);
		}
	};

	$scope.infoAlert = function(info, title) {
	   var alertPopup = $ionicPopup.alert({
	     title: title,
	     template: info
	   });
	 };

});
