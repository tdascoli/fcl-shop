;(function () {

  'use strict';

  angular.module('shopApp')
    .controller('OrderCtrl', function ($scope, order) {

      $scope.order=order;

      $scope.accounting = function(prize){
        return accounting.formatMoney(prize, { symbol: "Fr.",  format: "%v %s" }, 2, "'", ".");
      };

      $scope.showCartPrize=function(prize,qty){
        return $scope.accounting(parseInt(qty) * parseInt(prize));
      };

      $scope.showTotalCartPrize=function(){
        var total=0;
        $scope.order.cart.forEach(function(item){
          total = total + (parseInt(item.qty) * parseInt(item.prize));
        });
        return $scope.accounting(total);
      };

    })
    .filter('nl2br', function() {
      var span = document.createElement('span');
      return function(input) {
        if (!input) { return input; }
        var lines = input.split('\n');

        for (var i = 0; i < lines.length; i++) {
          span.innerText = lines[i];
          span.textContent = lines[i];  //for Firefox
          lines[i] = span.innerHTML;
        }
        return lines.join('<br />');
      };
  });


}());



