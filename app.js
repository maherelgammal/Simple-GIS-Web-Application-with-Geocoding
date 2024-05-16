require([
    "esri/Map",
    "esri/views/MapView",
    "esri/geometry/Point",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/Graphic",
    "esri/widgets/Search"
  ], function(Map, MapView, Point, SimpleMarkerSymbol, Graphic, Search) {
    // Create a map and view
    var map = new Map({
      basemap: "streets-navigation-vector"
    });
  
    var view = new MapView({
      container: "viewDiv",
      map: map,
      center: [-122, 37],
      zoom: 10
    });
  
    // Add search widget
    var searchWidget = new Search({
      view: view
    });
  
    // Add the search widget to the top right corner of the view
    view.ui.add(searchWidget, {
      position: "top-right"
    });
  
    // Handle search button click
    document.getElementById("searchButton").addEventListener("click", function() {
      var searchTerm = document.getElementById("searchInput").value;
      if (searchTerm) {
        searchWidget.search(searchTerm);
      }
    });
  
    // Handle search results
    searchWidget.on("select-result", function(event) {
      var result = event.result;
      if (result) {
        var point = new Point({
          longitude: result.extent.center.longitude,
          latitude: result.extent.center.latitude
        });
  
        var markerSymbol = new SimpleMarkerSymbol({
          color: [226, 119, 40],
          outline: {
            color: [255, 255, 255],
            width: 1
          }
        });
  
        var pointGraphic = new Graphic({
          geometry: point,
          symbol: markerSymbol
        });
  
        view.graphics.removeAll(); // Remove previous graphics
        view.graphics.add(pointGraphic);
      }
    });
  });
  