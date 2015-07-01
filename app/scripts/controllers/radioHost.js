'use strict';

/**
 * @ngdoc function
 * @name yoApp.controller:AboutCtrl
 * @description
 * # RadioHostCtrl
 * Controller of the yoApp
 */
angular.module('yoApp')
  .controller('RadioHostCtrl', function ($scope, $routeParams, $http) {

      $scope.name = $routeParams.radioHostName;
      var a = '';
      var b;

      $http({method:'GET', url:'hostList.json'}).success(function(data)
        {
          for(var i=0;i<data.length;i++)
          {
            if(data[i].djname == $routeParams.radioHostName.toLowerCase())
            {
              a = i;
            }
          }
          $scope.hostName = data[a].name;
          $scope.hostImage = data[a].imageURL;
          $scope.description= data[a].description.split('\r\n');
        });


        $http({method:'GET', url:b, headers: {'content-type': 'application/json'}})
        .success(function(data){
          $scope.description = data.biog;
          console.log('data '+data);
        }).error(function(data){console.log(data)});



  });
