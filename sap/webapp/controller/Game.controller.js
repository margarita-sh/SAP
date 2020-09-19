sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    function (Controller) {
        "use strict";

        return Controller.extend("ns.sap.controller.Game", {
            onMakeStep: function (event) {
                let idSAP = event.getSource().getId();
                //let id = idSAP.split('--').slice(1).join('');
                let c = document.querySelector('#' + idSAP).classList;
                if (c.contains('cross')) {
                    c.remove('cross')
                } else {
                    c.add('cross')
                }
            },
        });
    });