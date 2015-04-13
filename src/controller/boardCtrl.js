'use strict';

module.exports = function($rootScope, $scope, websocket, notificationCenter){
    $scope.display = false;
    $scope.notifications = [];

    $scope.init = function(socketURI){
        websocket.connect(socketURI);
    };

    $scope.$on('board:display', function(event, arg){
        $scope.display = arg;

        if(!$scope.display){
            return;
        }

        if(websocket.isConnected()){
            var route = {
                name: 'user_notification',
                parameters: { username: 'user2'}
            };

            notificationCenter.fetch(websocket.session, route, 1, 15, function(payload){
                $scope.$apply(function(){
                    $scope.notifications = payload.result;
                });
            });
        }

        $rootScope.$on('ws:connect', function(event, session){
            console.log('here');
            $scope.notifications = notificationCenter.fetch(session, ['notification/user/user2'], 1, 15, function(a){
                console.log(a);
            });
        });

    });

    $rootScope.$on('notification:new', function(event, args){
        console.log(args.payload);
    });
};