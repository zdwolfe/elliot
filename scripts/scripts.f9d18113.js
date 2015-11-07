"use strict";angular.module("elliotApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).otherwise({redirectTo:"/"})}]),angular.module("elliotApp").controller("MainCtrl",["CytoscapeService",function(a){function b(){return[{selector:"node",style:{label:"data(id)"}}]}function c(){return{name:"breadthfirst",fit:!0,directed:!1,padding:30,circle:!1,spacingFactor:1.75,boundingBox:void 0,avoidOverlap:!0,roots:void 0,maximalAdjustments:0,animate:!1,animationDuration:500,animationEasing:void 0,ready:void 0,stop:void 0}}function d(){for(var a=[],b=0;f>b;b++)a.push({group:"nodes",data:{id:b}});for(var c=0;7*f>c;c++)a.push({data:{id:c,source:e(0,10),target:e(0,10)}});return a}function e(a,b){return Math.floor(Math.random()*(b-a))+a}var f=10;a({container:document.getElementById("graph"),elements:d(),layout:c(),style:b()})}]),angular.module("elliotApp").service("CytoscapeService",function(){return window.cytoscape}),angular.module("elliotApp").run(["$templateCache",function(a){a.put("views/main.html",'<div id="graph"></div>')}]);