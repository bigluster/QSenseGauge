define(["./radialProgress", "./d3.min", "css!./QSenseGauge.css"],
  function(template) {
    "use strict";


    var ColorArc1 = {
      ref: "Arc1",
      type: "number",
      component: "slider",
      label: "Colors Arc1",
      min: 0,
	  max: 16777215,
      step: 1,
      defaultValue: 15
    };
    var ColorArc2 = {
      ref: "Arc2",
      type: "number",
      component: "slider",
      label: "Colors Arc2",
      min: 0,
	  max: 16777215,
      step: 1,
      defaultValue: 15
    };

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
          Setting: {
            uses: "settings",
            items: {
              Colors: {
                ref: "Color",
                type: "items",
                label: "Color",
                items: {
                  Colors1: ColorArc1,
                  Colors2: ColorArc2
                }
              }
            }
          }
        }
      },
      snapshot: {
        canTakeSnapshot: true
      },
      paint: function($element, layout) {
        //$element.append('<div id="div1">');

        //Taille de l'objet
        var width = $element.width();
        var height = $element.height();

        var id = "container_" + layout.qInfo.qId;

        if (document.getElementById(id)) {
          $("#" + id).empty();
        } else {
          $element.append($('<div />').attr("id", id).attr("class", "viz").width(width).height(height));
        }

        var hc = layout.qHyperCube;
        var div = document.getElementById(id);


        var value = hc.qDataPages[0].qMatrix[0][0].qNum;
        value = value * 100;
        
          console.log(layout.Arc1.toString(16));
        var colorAcr1 = '#' + layout.Arc1.toString(16);
        var colorAcr2 = '#' + layout.Arc2.toString(16);


        var rad1 = radialProgress(div, width, height, [colorAcr1, colorAcr2])
          .value(value)
          .render();
      }
    };

  });