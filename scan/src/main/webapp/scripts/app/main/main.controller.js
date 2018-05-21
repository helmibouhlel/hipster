'use strict';

angular.module('newappApp')
    .controller('MainController', function ($scope, Principal) {
        Principal.identity().then(function(account) {
            $scope.account = account;
            $scope.isAuthenticated = Principal.isAuthenticated;
        });
              
 angular.element(document).ready(function () {


    console .log("lol");
    });





 $scope.load = function(){

        var test = Dynamsoft.WebTwainEnv.
            GetWebTwain('dwtcontrolContainer');
  if (test) {
                var count = test.SourceCount; // Populate how many sources are installed in the system
                console.log("count");
                console.log(count);
                for (var i = 0; i < count; i++)
                    document.getElementById("source").options.add(new Option(test.GetSourceNameItems(i), i));  // Add the sources in a drop-down list
            }




 }





        $scope.scanner = function(){
             var DWObject = Dynamsoft.WebTwainEnv.
            GetWebTwain('dwtcontrolContainer');
            DWObject.IfShowUI = false;


            var t = document.getElementById("source");
            var selectedText = t.options[t.selectedIndex].text;
            //DWObject.SelectSourceByIndex(document.getElementById("source").selectedIndex);
             console.log("***********");
            console.log(selectedText);


            var i;
            for (i= 0; i< DWObject.SourceCount;i++){ 
                if (DWObject.GetSourceNameItems(i)==selectedText )  //TWAIN2 FreeImage Software Scanner
                    {DWObject.SelectSourceByIndex (i); //select the specific source
                    //if can't find the specified source, it'll select default source
                    console.log(i+"----"+selectedText);}
                else
                    DWObject.AcquireImage();
            }



            console.log("***********");
            console.log(DWObject.GetSourceNameItems(0));
            
            DWObject.OpenSource();
           // DWObject.AcquireImage();
        }




$scope.source_onchange = function () {

    if (document.getElementById("divTwainType"))
        document.getElementById("divTwainType").style.display = "";

    if (document.getElementById("source")) {
        var cIndex = document.getElementById("source").selectedIndex;
        if (Dynamsoft.Lib.env.bMac) {
            if (cIndex >= DWTSourceCount) {
                if (document.getElementById("lblShowUI"))
                    document.getElementById("lblShowUI").style.display = "";
                if (document.getElementById("ShowUI"))
                    document.getElementById("ShowUI").style.display = "";
            } else {
                if (document.getElementById("lblShowUI"))
                    document.getElementById("lblShowUI").style.display = "none";
                if (document.getElementById("ShowUI"))
                    document.getElementById("ShowUI").style.display = "none";
            }

        }
        else
            DWObject.SelectSourceByIndex(cIndex);
    }
}






/****************/
        $scope.LoadDefaultSource = function() {
   // load info from cookie as string value
   var strCookie = document.cookie;
   // check if a pre-scan settings has been saved before
   if(strCookie != "") {
      // spilt the cookie string into several name/value pair
      var arrCookie = strCookie.split("; ");
      // iterate through the array
      // locate the cookie named "DefaultSourceName", and get the value
      for (var i = 0; i < arrCookie.length; i++) {
         var arr = arrCookie[i].split("=");
         if ("DefaultSourceName" == arr[0]) {
            DWObject.IfUseTWAINDSM = true;
            DWObject.DefaultSourceName = arr[1];
            var sourceList = document.getElementById("source");
            console.log(sourceList);
            for (var j = 0; j < sourceList.length; j++) {
               if(document.getElementById("source").options[j].innerText == arr[1]){
                  document.getElementById("source").options.selectedIndex = j;
               }
            }      
         break;
         }
      }
   }
}
/****************/




    });
