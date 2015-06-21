/**
 * Created by benjaminskirlo1 on 20.06.15.
 */
angular.module('starter.controllers')
    .controller('buyCtrl', function ($scope,
                                     $ionicScrollDelegate,
                                     $ionicPosition,
                                     $state,
                                     $timeout,
    getItemsFromServer, getItems) {

        items[0].presentFeature = true;

        console.log(getItemsFromServer)
        $scope.saveAndGo = function(item){
            console.log(item);

            $state.go('tab.success', {item: item})

        }

        $scope.toggleSearch = function () {
            $scope.buttonIsShown = !$scope.buttonIsShown;
        }

        $scope.togglePaymentBox = function (_item) {
            _item.paymentBoxShown = !_item.paymentBoxShown;
        }
        
        $scope.scrollToItem = function (_item) {
            var _element = angular.element(
                document.getElementById('itemBox' + _item.itemId)
            );

            var _position = $ionicPosition.position(_element);
            $ionicScrollDelegate.scrollTo(0, _position.top);
        }

        $scope.$on('$ionicView.afterEnter', function(){

            $scope.items = getItems;

            getItemsFromServer.then(function(items){
                console.log(items)
                var items =  _.chain(items).reverse().value()
                $scope.items = items.concat($scope.items);
                console.log($scope.items)
                //$scope.$apply()
                $timeout(function(){})
            })

        })

        $scope.showMeta = function (slide) {
            var _activeItem = items[slide % items.length];
            for(item in items){
                items[item].presentFeature = false;
            }
            _activeItem.presentFeature = true;
        };

        $scope.enlargeImage = function (_item, a) {
            angular.element.addClass(a.target.parentElement, 'largeItemImage');
        }

    }).service('getItems', function(){

        var Item = function(
            _itemId,
            _image,
            _itemName,
            _itemPrice,
            _location,
            _description,
            _lockerCode)
        {
            this.itemId = _itemId;
            this.image = _image; //link to image
            this.itemName = _itemName;
            this.itemPrice = _itemPrice;
            this.location = _location; //How will this be done if we want to anonymise the exact location of the locker
            this.description = _description;
            this.lockerCode = _lockerCode;
            this.paymentBoxShown = false;
            this.presentFeature = false;
        };
        items = [];

        items.push(new Item(
            0,
            'img/headphones.jpg',
            'Headphones',
            '10',
            ["Amerikanische Gedenkbibliothek",'fronthall', '142'],
            'Sennheiser. Great sound!',
            '647832'


        ));

        items.push(new Item(
            1,
            'img/nokia.png',
            'Nokia Phone',
            '30',
            ["Ostbahnhof",'south lockers', '44'],
            'Get your self the famous vintage phone',
            '890654'
        ));

        items.push(new Item(
            2,
            'img/camera.jpg',
            'Instant picture camera',
            '25',
            ["Deutscher Bundestag",'guests locker', '343'],
            'Not a polaroid but still super cool!',
            '960596'
        ));

        items.push(new Item(
            3,
            'img/duck.jpg',
            'Rubber Duck',
            '50',
            ["Etage Eas Hostel",'coin lockers', 'A43'],
            'My best friend has to go because I need to pay my rent. I feel so awful.',
            '13627'
        ));

        items.push(new Item(
            4,
            'img/kitty.jpg',
            'Lucky Cat',
            '5',
            ["Alexa Mall",'Basement', '7'],
            'I\'ve been lucky all the time since. Good condition!',
            '99533'
        ));

        items.push(new Item(
            5,
            'img/knife.jpg',
            'Swiss Army knife',
            '80',
            ["ZOB",'lockers outside', '23'],
            'The classsic. Be McGyver',
            '12337'
        ));

        items.push(new Item(
            6,
            'img/luggage.jpg',
            'Luggage',
            '30',
            [",",'where in building', 'locker identifier'],
            'Just came back from a long business journey. Never again.',
            '7321'
        ));


        return items;

    }).service('getItemsFromServer', function($http, endPointAddress){
      return  $http.get(endPointAddress + '/items').then(function(res){

            return res.data;
        })

    })