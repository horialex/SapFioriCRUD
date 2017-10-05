sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History"
], function(Controller, History) {
	"use strict";

	var serviceUrlPath = "/Horatiu/sap/opu/odata/sap/ZHORIGATEWAY_SRV/";
	var structureSetPath = "/zhoratiustructureSet";

	return Controller.extend("testTest.controller.HoriSap", {

		onInit: function() {

			var oTable = this.getView().byId("test1");
			var oTemplate = new sap.m.ColumnListItem({
				cells: [new sap.m.Text({
					text: "{Empno}"
				}), new sap.m.Text({
					text: "{Fname}"
				}), new sap.m.Text({
					text: "{Lname}"
				}), new sap.m.Text({
					text: "{Addrs}"
				})]
			});

			var sServiceUrl = serviceUrlPath;
			var oModel = new sap.ui.model.odata.ODataModel(sServiceUrl, false);
			oTable.setModel(oModel);
			oTable.bindAggregation("items", {
				path: structureSetPath,
				template: oTemplate
			});

			var oGrid = this.getView().byId("gridId");
			oGrid.setVisible(false);
		},

		onDisplay: function() {

			var oTable = this.getView().byId("test1");
			var contexts = oTable.getSelectedContexts();

			if (contexts.length == 0) {
				alert("Please select a row");
			} else {
				var oGrid = this.getView().byId("gridId");
				oGrid.setVisible(true);

				var oSave = this.getView().byId("saveBtnId");
				oSave.setVisible(false);

				var items = contexts.map(function(c) {
					return c.getObject();
				});

				var oId = this.getView().byId("empId");
				oId.setEditable(false);
				oId.setValue(items[0].Empno);

				var oFName = this.getView().byId("fnameId");
				oFName.setEditable(false);
				oFName.setValue(items[0].Fname);

				var oLName = this.getView().byId("lnameId");
				oLName.setEditable(false);
				oLName.setValue(items[0].Lname);

				var oAddrs = this.getView().byId("addrsId");
				oAddrs.setEditable(false);
				oAddrs.setValue(items[0].Addrs);
			}
		},

		mode: 0,
		onUpdate: function() {

			var oTable = this.getView().byId("test1");
			var contexts = oTable.getSelectedContexts();

			if (contexts.length == 0) {
				alert("Please select a row");
			} else {
				var oGrid = this.getView().byId("gridId");
				oGrid.setVisible(true);

				var oSave = this.getView().byId("saveBtnId");
				oSave.setVisible(true);

				var items = contexts.map(function(c) {
					return c.getObject();
				});

				var oId = this.getView().byId("empId");
				oId.setEditable(false);
				oId.setValue(items[0].Empno);

				var oFName = this.getView().byId("fnameId");
				oFName.setEditable(true);
				oFName.setValue(items[0].Fname);

				var oLName = this.getView().byId("lnameId");
				oLName.setEditable(true);
				oLName.setValue(items[0].Lname);

				var oAddrs = this.getView().byId("addrsId");
				oAddrs.setEditable(true);
				oAddrs.setValue(items[0].Addrs);

				this.mode = "update";
			}

		},

		onCreate: function() {

			var oGrid = this.getView().byId("gridId");
			oGrid.setVisible(true);

			var oSave = this.getView().byId("saveBtnId");
			oSave.setVisible(true);

			var oId = this.getView().byId("empId");
			oId.setEditable(true);
			oId.setValue("");

			var oFName = this.getView().byId("fnameId");
			oFName.setEditable(true);
			oFName.setValue("");

			var oLName = this.getView().byId("lnameId");
			oLName.setEditable(true);
			oLName.setValue("");

			var oAddrs = this.getView().byId("addrsId");
			oAddrs.setEditable(true);
			oAddrs.setValue("");

			this.mode = "create";

		},

		deleteId: 0,
		onDelete: function() {
			var oGrid = this.getView().byId("gridId");
			oGrid.setVisible(false);

			var oTable = this.getView().byId("test1");
			var contexts = oTable.getSelectedContexts();

			if (contexts.length == 0) {
				alert("Please select a row");
			} else {
				var items = contexts.map(function(c) {
					return c.getObject();
				});

				this.deleteId = items[0].Empno;
				this.mode = "delete";
				this.onSave();

			}
		},

		onSave: function() {

			var view = this.getView();
			var oTable = this.getView().byId("test1");
			var sServiceUrl = serviceUrlPath;
			if (this.mode == "update") {

				var oId = this.getView().byId("empId").getValue();
				var fName = this.getView().byId("fnameId").getValue();
				var lName = this.getView().byId("lnameId").getValue();
				var addrs = this.getView().byId("addrsId").getValue();

				var sServiceUrl = serviceUrlPath;
				var oModel = new sap.ui.model.odata.ODataModel(sServiceUrl, false);

				// oModel.read("/zhoratiustructureSet('1')");
				var oData = {
					Empno: oId,
					Fname: fName,
					Lname: lName,
					Addrs: addrs
				};

				sap.ui.getCore().setModel(oModel);
				// oModel.create("/zhoratiustructureSet", oData);
				oModel.update(structureSetPath + "('" + oId + "')", oData,
					function() {},
					function() {
						view.byId("gridId").setVisible(false);
						sap.m.MessageToast.show("Data Update succesfully", {
							duration: 3000
						});

					});

				var oTemplate = new sap.m.ColumnListItem({
					cells: [new sap.m.Text({
						text: "{Empno}"
					}), new sap.m.Text({
						text: "{Fname}"
					}), new sap.m.Text({
						text: "{Lname}"
					}), new sap.m.Text({
						text: "{Addrs}"
					})]
				});

				var oModel = new sap.ui.model.odata.ODataModel(sServiceUrl, false);
				oModel.refresh(true);
				oTable.setModel(oModel);
				oTable.bindAggregation("items", {
					path: structureSetPath,
					template: oTemplate
				});
				// this.onInit();
			} else if (this.mode == "create") {
				var oId = this.getView().byId("empId").getValue();
				var fName = this.getView().byId("fnameId").getValue();
				var lName = this.getView().byId("lnameId").getValue();
				var addrs = this.getView().byId("addrsId").getValue();

				var sServiceUrl = serviceUrlPath;
				var oModel = new sap.ui.model.odata.ODataModel(sServiceUrl, false);

				// oModel.read("/zhoratiustructureSet('1')");
				var oData = {
					Empno: oId,
					Fname: fName,
					Lname: lName,
					Addrs: addrs
				};

				sap.ui.getCore().setModel(oModel);
				oModel.create("/zhoratiustructureSet", oData,
					//oModel.update(structureSetPath + "('"+ oId + "')", oData,
					function() {},
					function() {
						view.byId("gridId").setVisible(false);
						sap.m.MessageToast.show("Data created succesfully", {
							duration: 3000
						});

					});

				var oTemplate = new sap.m.ColumnListItem({
					cells: [new sap.m.Text({
						text: "{Empno}"
					}), new sap.m.Text({
						text: "{Fname}"
					}), new sap.m.Text({
						text: "{Lname}"
					}), new sap.m.Text({
						text: "{Addrs}"
					})]
				});

				var oModel = new sap.ui.model.odata.ODataModel(sServiceUrl, false);
				oModel.refresh(true);
				oTable.setModel(oModel);
				oTable.bindAggregation("items", {
					path: structureSetPath,
					template: oTemplate
				});
			} else if (this.mode == "delete") {

				var sServiceUrl = serviceUrlPath;
				var oModel = new sap.ui.model.odata.ODataModel(sServiceUrl, false);

				sap.ui.getCore().setModel(oModel);
				oModel.remove(structureSetPath + "('" + this.deleteId + "')",
					//oModel.update(structureSetPath + "('"+ oId + "')", oData,
					function() {},
					function() {
						view.byId("gridId").setVisible(false);
						sap.m.MessageToast.show("Data Removed succesfully", {
							duration: 3000
						});

					});

				var oTemplate = new sap.m.ColumnListItem({
					cells: [new sap.m.Text({
						text: "{Empno}"
					}), new sap.m.Text({
						text: "{Fname}"
					}), new sap.m.Text({
						text: "{Lname}"
					}), new sap.m.Text({
						text: "{Addrs}"
					})]
				});

				var oModel = new sap.ui.model.odata.ODataModel(sServiceUrl, false);
				oModel.refresh(true);
				oTable.setModel(oModel);
				oTable.bindAggregation("items", {
					path: structureSetPath,
					template: oTemplate
				});
			}

		},

		onBack: function() {
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