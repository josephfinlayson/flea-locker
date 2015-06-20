/*
    Class for items. Only for Benji use right now.
 */

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
};


angular.module('starter.controllers', [])
    .controller('buyCtrl', function ($scope) {

        items = [];
        items.push(new Item(
            0,
            'img/headphones.jpg',
            'Headphones',
            '10',
            [0,0,'where in building', 'locker identifier'],
            'Sennheiser. Great sound!'


        ));

        items.push(new Item(
            0,
            'img/nokia.png',
            'Nokia Phone',
            '30',
            [0,0,'where in building', 'locker identifier'],
            'Get your self the famous vintage phone'
        ));

        $scope.toggleSearch = function () {
            $scope.buttonIsShown = !$scope.buttonIsShown;
        }
        
        $scope.togglePaymentBox = function (_item) {
            _item.paymentBoxShown = !_item.paymentBoxShown;
        }
    $scope.items = items

        console.log(items)

    })

    .controller('sellCtrl', function ($scope) {

    })
    .controller('accountCtrl', function ($scope) {

    })
