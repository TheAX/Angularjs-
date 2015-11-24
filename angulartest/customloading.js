/**
 * Created by 123zs on 2015/10/12.
 */

angular.module( "loading", [] )
    .provider( 'loading', function () {
        this.$get = [ '$document', '$injector', '$timeout',
            function ( $document, $injector, $timeout ) {
                var $animate;
                var loadingBarContainer = angular.element( '<div id="loading-bar"><div class="bar"></div></div>' ),
                    loadingBar = loadingBarContainer.find( 'div' ).eq( 0 );

                var incTimeout,
                    completeTimeout,
                    started = false,
                    status = 0;

                var autoIncrement = true;
                var includeBar = true;
                var startSize = 0.02;

                var maskLayer = angular.element('<div  id="mapped-routing-loading"  style="position: fixed; background: rgba(0, 0, 0, 0.4);top: 0;right: 0;bottom: 0;left: 0;"></div>');
                var $parentSelector = angular.element('<div style="width:400px;"></div>' );
                maskLayer.append($parentSelector);

                function _start() {
                    if ( !$animate ) {
                        $animate = $injector.get( '$animate' );
                    }

                    $timeout.cancel( completeTimeout );


                    if ( started ) {
                        return;
                    }

                    // $rootScope.$broadcast('cfpLoadingBar:started');
                    started = true;

                    if ( includeBar ) {
                        $animate.enter( loadingBarContainer, $parentSelector.eq( 0 ));//, angular.element( $parent[ 0 ] )
                    }


                    _set( startSize );
                }


                function _set( n ) {
                    if ( !started ) {
                        return;
                    }
                    var pct = (n * 100) + '%';
                    loadingBar.css( 'width', pct );
                    status = n;

                    // increment loadingbar to give the illusion that there is always
                    // progress but make sure to cancel the previous timeouts so we don't
                    // have multiple incs running at the same time.
                    if ( autoIncrement ) {
                        $timeout.cancel( incTimeout );
                        incTimeout = $timeout( function () {
                            _inc();
                        }, 250 );
                    }
                }


                function _inc() {
                    if ( _status() >= 1 ) {
                        return;
                    }

                    var rnd = 0;

                    // TODO: do this mathmatically instead of through conditions

                    var stat = _status();
                    if ( stat >= 0 && stat < 0.25 ) {
                        // Start out between 3 - 6% increments
                        rnd = (Math.random() * (5 - 3 + 1) + 3) / 100;
                    } else if ( stat >= 0.25 && stat < 0.65 ) {
                        // increment between 0 - 3%
                        rnd = (Math.random() * 3) / 100;
                    } else if ( stat >= 0.65 && stat < 0.9 ) {
                        // increment between 0 - 2%
                        rnd = (Math.random() * 2) / 100;
                    } else if ( stat >= 0.9 && stat < 0.99 ) {
                        // finally, increment it .5 %
                        rnd = 0.005;
                    } else {
                        // after 99%, don't increment:
                        rnd = 0;
                    }

                    var pct = _status() + rnd;
                    _set( pct );
                }

                function _status() {
                    return status;
                }

                function _completeAnimation() {
                    status = 0;
                    started = false;
                    maskLayer.remove();
                }

                function _complete() {
                    if ( !$animate ) {
                        $animate = $injector.get( '$animate' );
                    }

                    // $rootScope.$broadcast('cfpLoadingBar:completed');
                    _set( 1 );

                    $timeout.cancel( completeTimeout );

                    // Attempt to aggregate any start/complete calls within 500ms:
                    completeTimeout = $timeout( function () {
                        var promise = $animate.leave( loadingBarContainer, _completeAnimation );
                        if ( promise && promise.then ) {
                            promise.then( _completeAnimation );
                        }
                    }, 500 );
                }


                var showLoading = function () {
                    angular.element( $document[ 0 ].body ).append( maskLayer );

                    _start();

                    _inc();

                    _set( 0.1 )


                };

                var hideLoading = function () {
                    _complete();
                    //$parentSelector.remove();
                };

                var methods = {
                    showLoading: showLoading,
                    hideLoading: hideLoading
                };

                return methods;
            } ];
    } );




angular.module( "customloadingApp", [ "loading" ] )
    .controller( 'customloadingController', [ '$scope', 'loading', function ( $scope, loading ) {
        $scope.name = "custom loading";

        loading.showLoading();

        setTimeout( function () {
            loading.hideLoading();
        }, 5000 );
    } ] )