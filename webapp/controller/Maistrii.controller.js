sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History"
], function(Controller, History) {
	"use strict";

	return Controller.extend("testTest.controller.Maistrii", {
	onInit: function(){
		var oTable = this.getView().byId("maistriTable");
		var oModel = new sap.ui.model.json.JSONModel();
		oModel.loadData("model/Maistri.json");
		oTable.setModel(oModel);
	},
	

	
	onBack: function()
	{
		var oHistory = History.getInstance();
		var sPreviousHash = oHistory.getPreviousHash();
	  if (sPreviousHash !== undefined) {
	  window.history.go(-1);
	  } else {
	  var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
	  oRouter.navTo("overview", true);
	  }
	}
	});
});