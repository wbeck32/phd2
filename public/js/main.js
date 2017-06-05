var contact = angular.module('portfolio',['ngRoute'], function(){
    'use strict';


contact.controller('formController',
    ['$scope', 'formService2', function($scope, formService2) {

        console.log("starting formController at startup...............");


        this.testing = "testing";

        this.master = {};


        this.update = function(user) {
            $scope.master = angular.copy(user);

            console.log('update function in formcontroller');
            console.log('user values are: ', user,  user.name,  user.email,  user.phone,  user.text);


            formService2.update(user);

        };

        this.reset = function() {
            $scope.user = angular.copy($scope.master);
        };

        this.reset();

        this.dosomething = function(){
            console.log("doing something in formcontroller.... ");
        };

    }]);
contact.service('formService2', ['$http', function($http ){

  this.update = function(user) {

        console.log('at form service user is: ', user);

        $http({
          method: 'POST',
          url: '/api/mailer',
          data: user,
          headers: {'Content-Type': 'application/json'}
        })
        .then(function(data, status, headers, config){
          console.log('formService2: Message send via mailgun successful');
          alert('Thank you.  An email has been sent to Miles Hochstein.');
         },
        function(data, status, headers, config){
          console.log('formService2: message send failed ' + data);
        });

      };

});

}]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImNvbnRyb2xsZXJzL2Zvcm1Db250cm9sbGVyLmpzIiwic2VydmljZXMvZm9ybVNlcnZpY2UyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIHBvcnRmb2xpbyA9IGFuZ3VsYXIubW9kdWxlKCdwb3J0Zm9saW8nLFsnbmdSb3V0ZSddLCBmdW5jdGlvbigpe1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIGNvbnNvbGUubG9nKCdsb2FkaW5nIGFuZ3VsYXIgbW9kdWxlIHBvcnRmb2xpbyAuLi4uLicpO1xuXG59KTtcblxuXG4vL2V4YW1wbGUhXG4vL3ZhciBkYXlCcmVhayA9IGFuZ3VsYXIubW9kdWxlKCdkYXlCcmVhaycsWyd1aS5yb3V0ZXInXSwgZnVuY3Rpb24oKXsgLy91aVJvdXRlXG4vL30pO1xuIiwicG9ydGZvbGlvLmNvbnRyb2xsZXIoJ2Zvcm1Db250cm9sbGVyJyxcbiAgICBbJyRzY29wZScsICdmb3JtU2VydmljZTInLCBmdW5jdGlvbigkc2NvcGUsIGZvcm1TZXJ2aWNlMikge1xuXG4gICAgICAgIGNvbnNvbGUubG9nKFwic3RhcnRpbmcgZm9ybUNvbnRyb2xsZXIgYXQgc3RhcnR1cC4uLi4uLi4uLi4uLi4uLlwiKTtcblxuXG4gICAgICAgIHRoaXMudGVzdGluZyA9IFwidGVzdGluZ1wiO1xuXG4gICAgICAgIHRoaXMubWFzdGVyID0ge307XG5cblxuICAgICAgICB0aGlzLnVwZGF0ZSA9IGZ1bmN0aW9uKHVzZXIpIHtcbiAgICAgICAgICAgICRzY29wZS5tYXN0ZXIgPSBhbmd1bGFyLmNvcHkodXNlcik7XG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCd1cGRhdGUgZnVuY3Rpb24gaW4gZm9ybWNvbnRyb2xsZXInKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCd1c2VyIHZhbHVlcyBhcmU6ICcsIHVzZXIsICB1c2VyLm5hbWUsICB1c2VyLmVtYWlsLCAgdXNlci5waG9uZSwgIHVzZXIudGV4dCk7XG5cblxuICAgICAgICAgICAgZm9ybVNlcnZpY2UyLnVwZGF0ZSh1c2VyKTtcblxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMucmVzZXQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICRzY29wZS51c2VyID0gYW5ndWxhci5jb3B5KCRzY29wZS5tYXN0ZXIpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMucmVzZXQoKTtcblxuICAgICAgICB0aGlzLmRvc29tZXRoaW5nID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZG9pbmcgc29tZXRoaW5nIGluIGZvcm1jb250cm9sbGVyLi4uLiBcIik7XG4gICAgICAgIH07XG5cbiAgICB9XSk7IiwicG9ydGZvbGlvLnNlcnZpY2UoJ2Zvcm1TZXJ2aWNlMicsIFsnJGh0dHAnLCBmdW5jdGlvbigkaHR0cCApe1xuXG4gIHRoaXMudXBkYXRlID0gZnVuY3Rpb24odXNlcikge1xuXG4gICAgICAgIGNvbnNvbGUubG9nKCdhdCBmb3JtIHNlcnZpY2UgdXNlciBpczogJywgdXNlcik7XG5cbiAgICAgICAgJGh0dHAoe1xuICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgIHVybDogJy9hcGkvbWFpbGVyJyxcbiAgICAgICAgICBkYXRhOiB1c2VyLFxuICAgICAgICAgIGhlYWRlcnM6IHsnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfVxuICAgICAgICB9KVxuICAgICAgICAudGhlbihmdW5jdGlvbihkYXRhLCBzdGF0dXMsIGhlYWRlcnMsIGNvbmZpZyl7XG4gICAgICAgICAgY29uc29sZS5sb2coJ2Zvcm1TZXJ2aWNlMjogTWVzc2FnZSBzZW5kIHZpYSBtYWlsZ3VuIHN1Y2Nlc3NmdWwnKTtcbiAgICAgICAgICBhbGVydCgnVGhhbmsgeW91LiAgQW4gZW1haWwgaGFzIGJlZW4gc2VudCB0byBNaWxlcyBIb2Noc3RlaW4uJyk7XG4gICAgICAgICB9LFxuICAgICAgICBmdW5jdGlvbihkYXRhLCBzdGF0dXMsIGhlYWRlcnMsIGNvbmZpZyl7XG4gICAgICAgICAgY29uc29sZS5sb2coJ2Zvcm1TZXJ2aWNlMjogbWVzc2FnZSBzZW5kIGZhaWxlZCAnICsgZGF0YSk7XG4gICAgICAgIH0pO1xuXG4gICAgICB9O1xuXG5cblxufV0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
