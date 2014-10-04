var locafoxApp = angular.module('locafoxApp', [
  'google-maps'
]);


locafoxApp.factory('Auth', function ($http) {
  var token;
  //returns a promise of a token, only makes the request once.
  function _getToken() {
    if (token) {
      return token;
    }
    // preencoded the user/pass in base64 as we only have one pair
    $http.defaults.headers.common.Authorization = 'Basic ' + 'bG9jYWZveDpMb2NhRiN4ZXMh';
    token =  $http.post('v1/token').then(function (res) {
      return res.data;
    });
    return token;
  }
  //exposing the token
  return {
    getToken: _getToken
  };
});

locafoxApp.factory('GetLocations', function (Auth, $http) {
  // wait for the auth promise to resolve.
  // use the token returned from the promise to make the next http request
  function _getLocations(query) {
    return Auth.getToken().then(function (token) {
      // token received
      query = token.token;
      // append as a url parameter
      return $http.post('v1/offers?token=' + query, {
        headers: {
          'Authorization': 'Basic ' + 'bG9jYWZveDpMb2NhRiN4ZXMh'
        }
      }).then(function (res) {
        return res.data;
      });
    });
  }
  // expose the data we just got
  return {
    getLocations: _getLocations
  };

});

locafoxApp.controller('mainCtrl', function ($scope, GetLocations) {
  // for some reason initializing the map inside the submit scope
  // doesn't work - angular-google-maps not mature enough
  // pick a distant center so centering can be obvious once data
  // loaded. 
  $scope.map = {
    center: {
      latitude: 45,
      longitude: -73
    },
    zoom: 10
  };
  $scope.submit = function () {
    // fetch the data once we click on the button
    GetLocations.getLocations().then(function (data) {
      _.forEach(data, function (i) {
        i.latitude = i.lat;
        i.longitude = i.long;
        delete i.long;
        delete i.lat;
      });
      // calculate the center of the map given the list of markers
      var maxLat = _.max(data, 'latitude');
      var minLat = _.min(data, 'latitude');
      var centerLat = (maxLat.latitude + minLat.latitude) / 2;
      var maxLong = _.max(data, 'longitude');
      var minLong = _.min(data, 'longitude');
      var centerLong = (maxLong.longitude + minLong.longitude) / 2;
      $scope.map.center = {
        latitude: centerLat,
        longitude: centerLong
      };
      $scope.map.myMarkers = data;
    });
  };
});

