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
        },
     
     figureSelection: function(event) {
       let oRouter = sap.ui.core.UIComponent.getRouterFor(this);
      console.log('oRouter', oRouter);
      let textOnButton = event.getSource().mProperties.text;
      console.log('textOnButton', textOnButton);
      oRouter.navTo("appHome", {
          FigureUser: textOnButton
      }); 
    }
    });

});