// create instance
var heatmapInstance = h337.create({
    container: document.querySelector('.heatmap'),
    radius: 90
  });
  document.querySelector('body').onclick = function(ev) {
    heatmapInstance.addData({
      x: ev.layerX,
      y: ev.layerY,
      value: 1
    });
  };
  // that's it... yay right? ;)

console.log("XDDDDDDD");