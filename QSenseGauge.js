define(["./radialProgress", "./d3.min", "css!./QSenseGauge.css"],
  function(template) {
    "use strict";
    //palette de couleur par défaut
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

    //palette de sélection couleur 1
    var ColorArc1 = {
      ref: "Arc1",
      type: "integer",
      component: "color-picker",
      label: "Premier arc",
      defaultValue: 3
    };
    //palette de sélection couleur 2
    var ColorArc2 = {
      ref: "Arc2",
      type: "integer",
      component: "color-picker",
      label: "Second arc",
      defaultValue: 2
    };
	  
	  var limite1 = {
			ref: "limite1",
			type: "integer",
			label: "Limite arc 1",
			expression: "always",
			defaultValue: 100
		};
	  var limite2 = {
			ref: "limite2",
			type: "integer",
			label: "Limite arc 2",
			expression: "always",
			defaultValue: 100
		};
	
    var imageGauge = {
      label: "Icon de la jauge",
      component: "media",
      ref: "iconGauge",
      layoutRef: "myMedia",
      type: "string"
    };

    //définition de l'objet
    return {
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
            max: 2
          },
          Setting: {
            uses: "settings",
            items: {
              Colors: {
                ref: "Color",
                type: "items",
                label: "Couleurs",
                items: {
                  Colors1: ColorArc1,
                  Colors2: ColorArc2,
                  MediaGauge: imageGauge
                }
              },
							Limite:{
								ref: "limite",
								type: "items",
								label: "Limites",
								items:{
									limite1: limite1,
									limite2: limite2
								}
						  }
            }
          }
        }
      },
      snapshot: {
        canTakeSnapshot: true
      },

      //affichage de l'objet
      paint: function($element, layout) {

        //Taille de l'objet
        var width = $element.width();
        var height = $element.height();

        var id = "container_" + layout.qInfo.qId;

        //construction de la div
        if (document.getElementById(id)) {
          $("#" + id).empty();
        } else {
          $element.append($('<div />').attr("id", id).attr("class", "viz").width(width).height(height));
        }

        //recup des données
        var hc = layout.qHyperCube;
        //recup de la zone d'affichage
        var div = document.getElementById(id);

        //recup de la valeur de la mesure
        var measureName = hc.qMeasureInfo[0].qFallbackTitle;
        var value = hc.qDataPages[0].qMatrix[0][0].qNum * 100;

        if (hc.qDataPages[0].qMatrix[0].length > 1) {
          var value2 = hc.qDataPages[0].qMatrix[0][1].qNum * 100;
          var measureName2 = hc.qMeasureInfo[1].qFallbackTitle;
        }

        //couleur arc 1 et 2
        var colorAcr1 = palette[layout.Arc1];
        var colorAcr2 = palette[layout.Arc2];

        var iconGauge = layout.iconGauge;
        //Création de la jauge
        var rad1 = radialProgress(div, width, height, [colorAcr1, colorAcr2], iconGauge)
          .value(value)
          .value2(value2)
          .label(measureName)
          .label2(measureName2)
          .maxValue(layout.limite1)
				  .maxValue2(layout.limite2)
          .render();

      }
    };

  });