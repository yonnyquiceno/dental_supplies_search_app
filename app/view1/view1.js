'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/view1/', {
        templateUrl: 'view1/view1.html',
        controller: 'View1Ctrl'
    });
}])

.controller('View1Ctrl', function($scope, $http, $location) {

    $scope.setCat = function(cat) {
        $scope.cat = cat
    }

    // $scope.setMinPrice = function(minprice) {
    //     $scope.cat = minprice
    // }
    //
    // $scope.setMaxPrice = function(maxprice) {
    //     $scope.cat = maxprice
    // }

    $scope.sendRequest = function(query = ' ') {
        $http.get('http://dz-suggestions-api.herokuapp.com/suggestions?thold=0.5&q=' + query + '&cat=' + ($scope.cat || '') + '&minprice=' + ($scope.minprice || '') + '&maxprice=' + ($scope.maxprice || ''))
            .then(
                function(response) {
                    $scope.products = response.data.suggestions;
                    $scope.set_number_of_articles($scope.products.length);
                    $scope.articles_finded(true);
                    console.log("request sent")
                },
                function(response) {
                    $scope.articles_finded(false);
                    $scope.products = [];
                }
            )
    }

    $scope.articles_finded = function(bool){
      switch (bool) {
        case true:
          $scope.message_switch= "articles_finded";
          break;
        case false:
          $scope.message_switch = "no_articles";
          break;
      }
    }

    $scope.set_number_of_articles = function(noa) {
        $scope.number_of_articles = noa
    }
});
