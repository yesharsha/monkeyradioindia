'use strict';

/**
 * @ngdoc function
 * @name yoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the yoApp
 */
angular.module('yoApp')
  .controller('MainCtrl', function ($scope, $http) {

    //Ajax for getting  cloudcast count
    var responsePromise = $http.get('http://api.mixcloud.com/monkeyradioindia/');

        responsePromise.success(function(data) {
                $scope.cloudcastCount = data.cloudcast_count;
            });
        responsePromise.error(function() {
          $scope.cloudcastCount = 'Quite many';
                    });

    //Ajax for getting all other mix details
    var mixpromise = $http.get('http://api.mixcloud.com/monkeyradioindia/cloudcasts/');

    mixpromise.success(function(data) {
                $scope.mixDetails = data.data;

                //Displaying all the mix details
                for(var i=0;i<$scope.mixDetails.length;i++)
                {
                  $scope.mixDetails[i].host=radioHost($scope.mixDetails[i].name);
                }

                //setting initial mix
                var src = '//www.mixcloud.com/widget/iframe/?feed='+data.data[0].url+'&amp;amp;embed_uuid=2fa6d3fd-bf4f-4c21-83ba-bdb4771c437a&amp;amp;replace=0&amp;amp;hide_cover=1&amp;amp;embed_type=widget_standard&amp;amp;hide_tracklist=1';
                angular.element(document.querySelector('#monkeyPlayer iframe')).attr('src',src);

    });

    //1. Accept name as parameter
    //2. check with hostlist of name appears.
    //3. if matches with an entry in hostlist, set host as corresponding value.

    function radioHost(name){
      var host = '';
      var hostList = {
          			'tune inn': 'Dakta Dub',
          			'dub vibration': 'Dakta Dub',
          			'hyderabad hi fi': 'Dakta Dub ',
          			'musical journey with balu':'Balasubramaniam',
          			'roots unwired':'Mr Nobody',
          			'funk assassin':'Funk Assassin',
          			'souls of sound':'DJ Psylenz',
          			'swatantram':'Velugu',
          			'music manthan':'Selekta Chakkra',
          			'puri juggernaut':'Shivacult',
                'transmission':'Chidakasha',
                'moonchild':'Sarikah Rai'
              };

      angular.forEach(hostList,function(key,value){

				if(name.toLowerCase().indexOf(value) > -1)
				{
					host = key;
				}
			});

      if(host == '')
			{
        host = 'a special guest'
      }

      return host;

    }

    //On click event to put mix on player
    $scope.putMixOnPlayer = function(url){

      var src = '//www.mixcloud.com/widget/iframe/?feed='+url+'&amp;amp;embed_uuid=2fa6d3fd-bf4f-4c21-83ba-bdb4771c437a&amp;amp;replace=0&amp;amp;hide_cover=1&amp;amp;embed_type=widget_standard&amp;amp;hide_tracklist=1';
      var myEl = angular.element( document.querySelector( '#monkeyPlayer iframe' ) );
      myEl.attr('src',src);
      angular.element(this).addClass(".hoverRecordAnimation");

    }

  });
