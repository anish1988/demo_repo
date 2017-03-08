var app =  angular.module('main-App',['ngRoute','angularUtils.directives.dirPagination','ngAnimate', 'ngSanitize', 'ui.bootstrap']);

app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'templates/home.html',
                controller: 'AdminController'
            }).
            when('/products', {
                templateUrl: 'templates/products.html',
                controller: 'ProductController'
            }).
            when('/employees', {
                templateUrl: 'templates/employees.html',
                controller: 'employeesController'
            });
}]);

app.value('apiUrl', 'http://localhost/Laravel-5-Angularjs-CRUD/public');
