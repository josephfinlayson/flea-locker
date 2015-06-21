/**
 * Created by benjaminskirlo1 on 20.06.15.
 */
angular.module('starter.controllers')
    .controller('buyCtrl', function ($scope, $ionicScrollDelegate, $ionicPosition) {

        var Item = function(
            _itemId,
            _image,
            _itemName,
            _itemPrice,
            _location,
            _description)
        {
            this.itemId = _itemId;
            this.image = _image; //link to image
            this.itemName = _itemName;
            this.itemPrice = _itemPrice;
            this.location = _location; //How will this be done if we want to anonymise the exact location of the locker
            this.description = _description;

            this.paymentBoxShown = false;
            this.presentFeature = false;
        };

        items = [];
        items.push(new Item(
            0,
            'img/headphones.jpg',
            'Headphones',
            '10',
            [",",'where in building', 'locker identifier'],
            'Sennheiser. Great sound!'


        ));

        items.push(new Item(
            1,
            'img/nokia.png',
            'Nokia Phone',
            '30',
            [",",'where in building', 'locker identifier'],
            'Get your self the famous vintage phone'
        ));

        items.push(new Item(
            2,
            'img/camera.jpg',
            'Instant picture camera',
            '25',
            [",",'where in building', 'locker identifier'],
            'Not a polaroid but still super cool!'
        ));

        items.push(new Item(
            3,
            'img/duck.jpg',
            'Rubber Duck',
            '50',
            [",",'where in building', 'locker identifier'],
            'My best friend has to go because I need to pay my rent. I feel so awful.'
        ));

        items.push(new Item(
            4,
            'img/kitty.jpg',
            'Lucky Cat',
            '5',
            [",",'where in building', 'locker identifier'],
            'I\'ve been lucky all the time since. Good condition!'
        ));

        items.push(new Item(
            5,
            'img/knife.jpg',
            'Swiss Army knife',
            '80',
            [",",'where in building', 'locker identifier'],
            'The classsic. Be McGyver'
        ));

        items.push(new Item(
            6,
            'img/luggage.jpg',
            'Luggage',
            '30',
            [",",'where in building', 'locker identifier'],
            'Just came back from a long business journey. Never again.'
        ));


        items[0].presentFeature = true;

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

            console.log(_element);
            console.log($ionicPosition.position(_element));

            var _position = $ionicPosition.position(_element);

            $ionicScrollDelegate.scrollTo(0, _position.top);

        }

        $scope.items = items;

        $scope.showMeta = function (slide) {

            var _activeItem = items[slide % items.length];

            for(item in items){
                items[item].presentFeature = false;
            }

            _activeItem.presentFeature = true;

        }

        $scope.enlargeImage = function (_item) {
            var _element = angular.element(
                document.getElementById('itemImage' + _item.itemId)
            );

            angular.element.addClass(_element, 'largeItemImage');
        }

        console.log(items)

    })