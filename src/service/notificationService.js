'use strict';

module.exports = function($rootScope){
    this.websocketURI = null;
    this.websocket = null;
    this.notificationStack = [];

    this.notificationCallback = function(topic, payload){

        //Send event to notify other service that receive a new notification
        $rootScope.$broadcast('notification:new', {
            topic: topic,
            payload: payload
        });
    };

    this.fetch = function(session, route, start, end, successCb){
        var _this = this;
        start = start || 1;
        end = end || 15;

        session.call('notification/fetch', {
            start: start,
            end: end,
            route: route
        }).then(successCb, function(error) {
            console.log(error);
        });
    }
};