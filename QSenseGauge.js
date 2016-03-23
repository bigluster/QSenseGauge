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
      translation: "properties.color", 
      component: "color-picker",
      label: "Arc 1",
      defaultValue: 3  
    };
    //palette de sélection couleur 2
    var ColorArc2 = {
      ref: "Arc2",
      type: "integer",
      translation: "properties.color", 
      component: "color-picker",
      label: "Arc 1",
      defaultValue: 2  
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
      
      //affichage de l'objet
      paint: function($element, layout) {
          
        //Taille de l'objet
        var width = $element.width();
        var height = $element.height();

        var id = "container_" + layout.qInfo.qId;

        //ça marche mais pourquoi ?
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
        var value = hc.qDataPages[0].qMatrix[0][0].qNum;
        //passage en %
        value = value * 100;
        
        //couleur arc 1 et 2
        var colorAcr1 = palette[layout.Arc1];
        var colorAcr2 = palette[layout.Arc2];


        //Création de la jauge
        var rad1 = radialProgress(div, width, height, [colorAcr1, colorAcr2])
          .value(value)
          .render();
       }
    };

  });