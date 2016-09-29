'use strict';

app.controller('instrucoesCtrl', function($scope,  $state, $ionicPlatform) {



	$scope.goTo = function(pagina)
	{
		$state.go(pagina);
	};

});
