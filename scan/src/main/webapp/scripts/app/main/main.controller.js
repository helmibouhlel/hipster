'use strict';

angular.module('newappApp')
    .controller('MainController', function ($scope, Principal) {
        Principal.identity().then(function(account) {
            $scope.account = account;
            $scope.isAuthenticated = Principal.isAuthenticated;
        });
        
//        var scanRequest = {
//        		  "twain_cap_setting" : {
//        		    "ICAP_PIXELTYPE" : "TWPT_RGB", // Color
//        		    "ICAP_XRESOLUTION" : "100", // DPI: 100
//        		    "ICAP_YRESOLUTION" : "100",
//        		    "ICAP_SUPPORTEDSIZES" : "TWSS_USLETTER" // Paper size: TWSS_USLETTER, TWSS_A4, ...
//        		  },
//        		  "output_settings" : [ {
//        		    "type" : "save",
//        		    "format" : "pdf",
//        		    "save_path" : "${TMP}\\${TMS}${EXT}" // Can be absolute path or path containing variables
//        		  } ]
//        		};
        
        $scope.scanner = function(){
//        	asprise_scanner_js_scan(resultHandlerCallBackFunction, scanRequest, true, false);

        }
    });
