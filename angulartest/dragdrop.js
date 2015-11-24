angular.module("demo", ['dndLists'])
    .controller("SimpleDemoController", function ($scope) {

        $scope.models = {
            selected: null,
            lists: { "A": [], "B": [], "C":[] }
        };

        for (var i = 1; i <= 3; ++i) {
            $scope.models.lists.A.push({ label: "Item A" + i });
            $scope.models.lists.B.push({ label: "Item B" + i });
            $scope.models.lists.C.push({ label: "Item C" + i });
        }

        $scope.onMoveCallback = function (index,event) {
            var a = event;
            var ss = $scope;

            console.log("onMove deleted index: " + index);
            console.log("onMove deleted A.count: " + $scope.models.lists.A.length);
            console.log("onMove deleted B.count: " + $scope.models.lists.B.length);
        };

        $scope.dragendCallback = function(index, event) {
            var a = event;
            var ss = $scope;

            console.log("dragend deleted index: " + index);
            console.log("dragend deleted A.count: " + $scope.models.lists.A.length);
            console.log("dragend deleted B.count: " + $scope.models.lists.B.length);
        };

        $scope.dropCallback = function (event, index, item, external, type) {
            var a = index;
            var ss = $scope;
            return item;
        };

        $scope.dragoverCallback = function (event, index, external, type) {
            var a = index;

            var ss = $scope;
            return true;
        }

        $scope.insertedCallback = function(index, event) {
            var a = index;

            var ss = $scope;

            console.log("inserted index: " + index);
            console.log("inserted A.count: " + $scope.models.lists.A.length);
            console.log("inserted B.count: " + $scope.models.lists.B.length);
        }
   

        //// Model to JSON for demo purpose
        //$scope.$watch('models', function (model) {
        //    $scope.modelAsJson = angular.toJson(model, true);
        //}, true);

    });
