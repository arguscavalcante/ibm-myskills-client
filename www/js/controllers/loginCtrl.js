'use strict';

app.controller('loginCtrl', function($scope,  $ionicPopup, $rootScope, $state, $ionicLoading, $window) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //

var usuario = {
		"nome": "",
		"email":""
};
$scope.usuario = usuario;

function load ()
{
	$scope.usuario.nome = JSON.parse($window.localStorage.getItem('nome'));
	$scope.usuario.email = JSON.parse($window.localStorage.getItem('email'));
}

load();



	$scope.goTo = function(pagina)
	{
		if($scope.usuario.nome.length == 0 || $scope.usuario.email.length == 0)
		{
			$scope.infoAlert ("O nome e e-mail devem ser preenchidos","Atenção")
		}
		else {
			$window.localStorage.setItem('nome', JSON.stringify($scope.usuario.nome));
			$window.localStorage.setItem('email', JSON.stringify($scope.usuario.email));

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
