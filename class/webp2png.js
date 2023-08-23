WebPDecodeAndDraw = function (data) {
    var decoder = new WebPDecoder();

    var bitmap = decoder.WebPDecode(data, data.length);

    if (bitmap) {
                //Draw Image
      var output = ctx.createImageData(canvas.width, canvas.height);
      var biWidth = canvas.width;
      var outputData = output.data;
      for (var h=0;h<canvas.height;h++) {
        for (var w=0;w<canvas.width;w++) {
          outputData[0+w*4+(biWidth*4)*h] = bitmap[0+w*4+(biWidth*4)*h];
          outputData[1+w*4+(biWidth*4)*h] = bitmap[1+w*4+(biWidth*4)*h];
          outputData[2+w*4+(biWidth*4)*h] = bitmap[2+w*4+(biWidth*4)*h];
          outputData[3+w*4+(biWidth*4)*h] = bitmap[3+w*4+(biWidth*4)*h];
        };
      }
                     
      ctx.putImageData(output, 0, 0); 
                    
      var dataURL = canvas.toDataURL("image/png");
                
      document.getElementById("dec").src=dataURL;

    }
  };     
            
            
  export default  function getImage(img) {
  // Create an empty canvas element
    canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    // Copy the image contents to the canvas
    ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
        
    WebPDecodeAndDraw(ctx.getImageData(0,0,ctx.canvas.width,ctx.canvas.height)['data']);
}

