function ViewRegistrationCtrl($scope, $location, $routeParams, $registrations) {
    // page parameter
    $scope.uuid = $routeParams.uuid;
    // get the current notification
    $registrations.getRegistration($scope.uuid).
    then(function (response) {
        $scope.registration = response.data;
        $('#wait').hide();
    });

    $scope.cancel = function () {
        $location.path('/registrations');
    };
}

function ListRegistrationsCtrl($scope, $registrations, $localeService, $translate) {
    // initialize the paging structure
    $scope.maxSize = 10;
    $scope.pageSize = 10;
    $scope.currentPage = 1;
    $scope.totalItems = 0;

    $scope.loadPaginationStub = false;
    $localeService.getUserLocale().then(function (response) {
        var serverData = response.data.locale;
        $translate.use(serverData).then(function () {
            $scope.loadPaginationStub = true;
        });
    });

    $registrations.getRegistrations($scope.currentPage, $scope.pageSize).
    then(function (response) {
        var serverData = response.data;
        $scope.registrations = serverData.objects;
        $scope.noOfPages = serverData.pages;
        $scope.totalItems = serverData.totalItems;
        $('#wait').hide();
    });

    $scope.$watch('currentPage', function (newValue, oldValue) {
        if (newValue != oldValue) {
            $registrations.getRegistrations($scope.currentPage, $scope.pageSize).
            then(function (response) {
                var serverData = response.data;
                $scope.registrations = serverData.objects;
                $scope.noOfPages = serverData.pages;
                $scope.totalItems = serverData.totalItems;
            });
        }
    }, true);

    $scope.$watch('search', function (newValue, oldValue) {
        if (newValue != oldValue) {
            $scope.currentPage = 1;
            $registrations.getRegistrations($scope.currentPage, $scope.pageSize).
            then(function (response) {
                var serverData = response.data;
                $scope.registrations = serverData.objects;
                $scope.noOfPages = serverData.pages;
                $scope.totalItems = serverData.totalItems;
            });
        }
    }, true);
}