define( ["text!./QSenseGauge.html", "css!./QSenseGauge.css"],
	function ( template ) {
		"use strict";
		return {
			template: template,
			initialProperties: {
				qHyperCubeDef: {
					qDimensions: [],
					qMeasures: [],
					qInitialDataFetch: [{
						qWidth: 2,
						qHeight: 50
					}]
				}
			},
			definition: {
				type: "items",
				component: "accordion",
				items: {
					measures: {
						uses: "measures",
						min: 1,
						max: 1
					},
					sorting: {
						uses: "sorting"
					},
                    settings: {
				        uses: "settings"
			        }
				}
			},
			snapshot: {
				canTakeSnapshot: true
			},
            paint: function ($element) {
			    var html = "<table><tr>";
                var self = this;
                var lastrow = 0;
                var morebutton = false;
                var dimcount = this.backendApi.getDimensionInfos().length;
			    //render data
			    this.backendApi.eachDataRow(function(rownum, row) {
				lastrow = rownum;
				html += '<tr>';
				$.each(row, function(key, cell) {
					if(cell.qIsOtherCell) {
						cell.qText = self.backendApi.getDimensionInfos()[key].othersLabel;
					}
					html += "<td>'";
					html += cell.qText + '</td>';
				});
				html += '</tr>';
			});
			html += "</table>";
		}
		};

	} );
