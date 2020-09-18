sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    function (Controller) {
        "use strict";

        return Controller.extend("ns.sap.controller.Game", {

            onInit: function () {

            },
            onMakeStep: function () {
            console.log(this)
            },
            /*      onAfterRendering:function(){
                     document.querySelectorAll('.box').forEach(item => {
       item.addEventListener('click', event => {
          console.log(event.target);
       })
     })
    } */
        });
    });