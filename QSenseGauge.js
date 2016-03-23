define(["./radialProgress", "./d3.min", "css!./QSenseGauge.css"],
  function(template) {
    "use strict";
    
    var palette = [
        "#b0afae",
        "#7b7a78",
        "#545352",
        "#4477aa",
        "#7db8da",
        "#b6d7ea",
        "#46c646",
        "#f93f17",
        "#ffcf02",
        "#276e27",
        "#ffffff",
        "#000000"
    ];

    var ColorArc1 = {
      ref: "Arc1",
      type: "integer",      
      translation: "properties.color", 
      component: "color-picker",
      label: "Arc 1",
      defaultValue: 3  
    };
    var ColorArc2 = {
      ref: "Arc2",
      type: "integer",
      translation: "properties.color", 
      component: "color-picker",
      label: "Arc 1",
      defaultValue: 2  
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
                label: "Arc colors",
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
        
        var colorAcr1 = palette[layout.Arc1];
        var colorAcr2 = palette[layout.Arc2];


        var rad1 = radialProgress(div, width, height, [colorAcr1, colorAcr2])
          .value(value)
          .render();
      }
    };

  });