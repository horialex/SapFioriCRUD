sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller, JSONModel) {
	"use strict";

	return Controller.extend("testTest.controller.Master", {
		
	getRouter : function(){
		return sap.ui.core.UIComponents.getRouterFor(this);
	},
		
	onInit: function(){
	
	},
	
	onPressProducts: function(oEvent){
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("second");
	},
	
	onPressMaistrii: function(oEvent){
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("third");
	},
	
	onPressHoriSap: function(oEvent){
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("fourth");
	}
	
	});
});