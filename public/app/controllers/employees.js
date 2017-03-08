app.controller('employeesController', function(dataFactory,$scope, $http, apiUrl) {
    //retrieve employees listing from API
	
	
	  $scope.data = [];
	  $scope.libraryTemp = {};
	  $scope.totalEmployeeTemp = {};

	  $scope.totalEmployee = 0;
	  $scope.pageChanged = function(newPage) {
	    getResultsPage(newPage);
	  };
    $http.get(apiUrl + "/employees")
            .success(function(response) {
                $scope.employees = response;
            });
    
    //show modal form
    $scope.toggle = function(modalstate, id) {
        $scope.modalstate = modalstate;

        switch (modalstate) {
            case 'add':
                $scope.form_title = "Add New Employee";
                break;
            case 'edit':
                $scope.form_title = "Employee Detail";
                $scope.id = id;
                $http.get(apiUrl + '/employees/' + id)
                        .success(function(response) {
                            console.log(response);
                            $scope.employee = response;
                        });
                break;
            default:
                break;
        }
        console.log(id);
        $('#myModal').modal('show');
    }
    $scope.open1 = function() {
        $scope.popup1.opened = true;
      }
      
      $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
      $scope.format = $scope.formats[0];
    //save new record / update existing record
    $scope.save = function(modalstate, id) {
        var url = apiUrl + "/employees";
        
        //append employee id to the URL if the form is in edit mode
        if (modalstate === 'edit'){
            url += "/" + id;
            
        }
        
        $http({
            method: 'POST',
            url: url,
            data: $.param($scope.employee),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function(response) {
            console.log(response);
            location.reload();
        }).error(function(response) {
            console.log(response);
            alert('This is embarassing. An error has occured. Please check the log for details');
        });
    }

    //delete record
    $scope.confirmDelete = function(id) {
        var isConfirmDelete = confirm('Are you sure you want this record?');
        if (isConfirmDelete) {
            $http({
                method: 'DELETE',
                url: apiUrl + '/employees/' + id
            }).
                    success(function(data) {
                        console.log(data);
                        location.reload();
                    }).
                    error(function(data) {
                        console.log(data);
                        alert('Unable to delete');
                    });
        } else {
            return false;
        }
    }
    
    getResultsPage(1);
    function getResultsPage(pageNumber) {
        if(! $.isEmptyObject($scope.libraryTemp)){
            dataFactory.httpRequest(apiUrl+'/employees/search?search='+$scope.searchText+'&page='+pageNumber).then(function(data) {
              $scope.data = data.data;
              $scope.totalEmployee = data.total;
            });
        }else{
          dataFactory.httpRequest(apiUrl+'/employees/search?page='+pageNumber).then(function(data) {
            console.log(data);
            $scope.data = data.data;
            $scope.totalEmployee = data.total;
          });
        }
    }
    $scope.searchDB = function(){
        if($scope.searchText.length >= 3){
            if($.isEmptyObject($scope.libraryTemp)){
                $scope.libraryTemp = $scope.data;
                $scope.totalEmployeeTemp = $scope.totalEmployee;
                $scope.data = {};
            }
            getResultsPage(1);
        }else{
            if(! $.isEmptyObject($scope.libraryTemp)){
                $scope.data = $scope.libraryTemp ;
                $scope.totalEmployee = $scope.totalEmployeeTemp;
                $scope.libraryTemp = {};
            }
        }
    }
});