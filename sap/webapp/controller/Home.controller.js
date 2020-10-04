sap.ui.define([
    "ns/sap/controller/BaseController"
], function (BaseController) {
    "use strict";

    return BaseController.extend("ns.sap.controller.Home", {
        onDisplayGame: function () {
            //display the "notFound" target without changing the hash
            this.getRouter().getTargets().display("game", {
				fromTarget : "home"
			});
        }
    });

});