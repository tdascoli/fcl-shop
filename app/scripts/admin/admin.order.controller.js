;(function () {

  'use strict';

  angular.module('shopApp')
    .controller('AdminOrderCtrl', function ($scope, $state, OrderService) {

      $scope.orders=false;

      function loadOrders(){
        OrderService.listOrders().then(function (result){
          $scope.orders=result.data;
        },function (error){
          console.error(error);
        });
      }
      loadOrders();

      $scope.accounting = function(prize){
        return accounting.formatMoney(prize, { symbol: "Fr.",  format: "%v %s" }, 2, "'", ".");
      };

      $scope.showCartPrize=function(prize,qty){
        return $scope.accounting(parseInt(qty) * parseInt(prize));
      };

      $scope.showTotalCartPrize=function(cart){
        var total=0;
        cart.forEach(function(item){
          total = total + (parseInt(item.qty) * parseInt(item.prize));
        });
        return $scope.accounting(total);
      };

      $scope.toMoment=function(date){
        return moment(date).format("DD.MM.YYYY HH:mm");
      };

      $scope.completed=function(order_id){
        OrderService.orderCompleted(order_id).then(function (result){
          if (result.data.completed==='1'){
            loadOrders();
          }
          else {
            console.error(result);
          }
        },function (error){
          console.error(error);
        });
      };

      $scope.delete=function(order_id){
        OrderService.deleteOrder(order_id).then(function (result){
          if (result.data){
            loadOrders();
          }
          else {
            console.error(result);
          }
        },function (error){
          console.error(error);
        });
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



