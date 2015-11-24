angular.module( 'qApp', [] )
    .controller( 'qController', [ '$scope', '$q', function( $scope, $q ) {
        $scope.name = "sadfdsf";

    function a(){

    }

    function dd(arr, i) {
        var deferred = $q.defer();
        asyncGreet(arr, i);
        function asyncGreet( arr, i ) {
            var arr = arr || [];
            setTimeout( function() {
                if ( i < 3 ) {
                    arr.push( i );
                    i++;
                    asyncGreet( arr, i );
                } else {
                    deferred.resolve( 'Hello, sha bi' + i );
                }
            }, 200 );
        }

        return deferred.promise;
    }
        var promise = dd(undefined, 0);
        promise.then( function( greeting ) {
            alert( 'Success: ' + greeting );
        }, function( reason ) {
            alert( 'Failed: ' + reason );
        });
    } ] );