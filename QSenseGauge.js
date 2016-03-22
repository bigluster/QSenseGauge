define( ["./radialProgress", "./d3.min", "css!./QSenseGauge.css"],
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
                    settings: {
				        uses: "settings"
			        }
				}
			},
			snapshot: {
				canTakeSnapshot: true
			},
            paint: function ($element, layout) {
                //$element.append('<div id="div1">');
                $element.append('<div qv-extension style="height: 100%; position: relative; overflow: auto;"><div id="div1"></div></div>');
                var hc = layout.qHyperCube;
                var rad1 = radialProgress(document.getElementById('div1'))
                .label(hc.qMeasureInfo[0].qFallbackTitle)
                .diameter(200)
                .value(hc.qDataPages[0].qMatrix[0][0].qText)
                .render();
            }
		};

	} );
