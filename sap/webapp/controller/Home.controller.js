sap.ui.define([
    "ns/sap/controller/BaseController"
], function (BaseController) {
    "use strict";

    return BaseController.extend("ns.sap.controller.Home", {
        /*  onDisplayGame: function () {
             //display the "notFound" target without changing the hash
             this.getRouter().getTargets().display("game", {
                 fromTarget : "home"
             });
         }, */

        figureSelection: function (event) {
            let textOnButton = event.getSource().mProperties.text;
            let figureUser = {
                "figure": textOnButton,

            };
            let oModel = new sap.ui.model.json.JSONModel(figureUser);
            this.getOwnerComponent().setModel(oModel, "figureUser");
            let oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("game");
        }
    });

});