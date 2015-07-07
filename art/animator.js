var framenumber = 0;
var firstTime = 0;
var frames = [];
var up = true;
var onion = false;
var grid_w = 150;
var grid_h = 80;
var xoffset = 50;
var yoffset = 120;
var block = 10;
var little_frame_factor = 3;
var playback_x = xoffset + grid_w + block;
var frames_x = xoffset;
var frames_y = yoffset + grid_h + 10;
var frames_spacer = 2;
var frames_grid_w = grid_w/little_frame_factor;
var hidden_playFrame = 0;
var hidden_counter = 0;
var playFrame = 0;
var counter = 0;

var hidden_x = -1*grid_w
var hidden_y = 0;
var old_x = 0; 
var old_y = 0; 
var new_x = 0; 
var new_y = 0; 
hidden_canvas.style.top = 0 + 'px';
hidden_canvas.style.left =  -grid_w + 'px';
// hidden_canvas.style.width = grid_w + 'px';
// hidden_canvas.style.height =  grid_h + 'px';
hidden_canvas.width = grid_w;
hidden_canvas.height = grid_h;
// export to gif

//



$('#frame').css('left', xoffset);
$('#frame').css('top', yoffset -25);

$('#instructions').css('left', xoffset);
$('#instructions').css('top', grid_h + yoffset + 25 + grid_h/little_frame_factor);

function setup() {

  $("#frame").html("Frame: 1");
  console.log("==========================================");
  console.log("                Instructions              ");
  console.log("==========================================");
  console.log("1. Click or drag with left mouse key to draw,");
  console.log("2. Use right mouse key to erase a single pixel,");
  console.log("3. Press SPACE to erase pixels.");
  console.log("4. Press UP to view previous frame,");
  console.log("5 .Press DOWN to load previous frame,");
  console.log("6. Press ALT LEFT to erase frame.");
  resetGrid();
  clearPlayback();
}

function draw() {
  //draw grid
  drawGrid();
  playBack();
}

function resetGrid(){
  ctx.strokeWeight(1);
  ctx.fillColor(rgb(0,0,0));
  ctx.fillRect(xoffset, yoffset, grid_w, grid_h);
}





function addBlock(x,y, state){
  
  firstTime = 0;
  posx = Math.floor(x/block);
  posy = Math.floor(y/block);
   
  //if () { // check if black
  if (state == 1) { // fill
  
    ctx.fillColor(rgb(255,0,0));

  } else if (state == 0) { // clear
  
    ctx.fillColor(rgb(0,0,0));

  } else if (state == 2) { // clear
  
    ctx.fillColor(rgb(0,0,0));
    //ctx.fillColor(rgb(50,50,50));
  
  } else if (state == 3) { // onion
      console.log("onion");
      ctx.fillColor(rgb(110,0,0));
      //ctx.fillColor(rgb(50,50,50));
    } else {
      ctx.fillColor(rgb(0,0,0));
    }
  ctx.strokeColor(rgb(30,30,30));
  ctx.fillRect(Math.floor(x/block) * block, Math.floor(y/block) * block, block, block);
//    } else {
  
// }
}

function removeBlock(x,y, state){
   firstTime = 0;
   posx = Math.floor(x/block);
   posy = Math.floor(y/block); 
  ctx.fillColor(rgb(0,0,0));
  ctx.strokeColor(rgb(30,30,30));
  ctx.fillRect(Math.floor(x/block) * block, Math.floor(y/block) * block, block, block);
}




document.onkeydown = checkKey;

function checkKey(event){
  console.log(event.keyCode)
  if (event.keyCode == 39) {  //right  
      getFrame(framenumber);
      clearDrawspace();
      resetGrid();
      drawGrid();
      onion = false;
      framenumber++;
      loadFrame(framenumber,1);
      $("#frame").html("Frame: " + (framenumber+1));
      individualFrames();
  } else if (event.keyCode == 37 && framenumber>0) {  //left
      getFrame(framenumber);
      framenumber--;
      clearDrawspace();
      onion = false;
      resetGrid();
      drawGrid();
      loadFrame(framenumber, 1);
      $("#frame").html("Frame: " + (framenumber+1));
  } else if (event.keyCode == 40 && framenumber>0) {  //down
      loadFrame(framenumber-1, 1);
      getFrame(framenumber);
  } else if (event.keyCode == 32) {  //space
    console.log("clear");
    clearDrawspace(); 
    clearPlayback(); 
    onion = false;
    resetGrid();
    drawGrid();
    getFrame(framenumber,1);
  } else if (event.keyCode == 38) {  //up
  
    if (onion == false) {
      //clearDrawspace(); 
      loadFrame(framenumber-1, 3);
      onion = true;
      getFrame();
    } else {
      onion = false;
      hideOnion();
    }
  } else if (event.keyCode == 65) {  //a
    fillGrid();
    getFrame(framenumber);
  } else if (event.keyCode == 13) {  //RETURN  - save image
    getFrame(framenumber);
    saveImage();
    }
  }


function hideOnion(){
  for (var y = block/2; y< grid_h; y+=block) { 
    
      for (var x = block/2; x < grid_w; x+=block) {
          var p = ctx.getImageData(x+xoffset, y+yoffset, 1, 1).data; 
          
          if (p[0] == 50 && p[1] == 50 && p[2] == 50) {
            addBlock(x,y, 3)
            //console.log(p)
        }
        
}

    }
}


function getFrame(framenumber){
    var f = "";
    //console.log("getFrame");
    var i = 0;
    for (var y = block/2; y < grid_h; y += block) { 
    
      for (var x = block/2; x < grid_w; x += block) {

          var p = ctx.getImageData(x + xoffset, y + yoffset, 1, 1).data; 
          if (p[0] == 255 && p[1] == 0 && p[2] == 0) {
            //console.log("0");
            f +="1";
          } else {
            //console.log("1");
             f +="0";
        }     
  }

  i++;
      }
  //console.log(f);
  frames[framenumber] = f;
  //console.log("-------"+frames[framenumber]);


}


function drawGrid(){
  ctx.strokeColor(rgb(30,30,30));
 for (var x = 0; x<= grid_w; x+=block) {
    ctx.line(x+xoffset, yoffset, x+xoffset, yoffset+ grid_h);
  }
  for (var y = 0; y<=grid_h; y+=block) {
    ctx.line(xoffset, y+yoffset, grid_w+xoffset, y+yoffset);
  }

}

function loadFrame(_frameNumber, state){
  
  //console.log("loadFrame" + _frameNumber);
  var i = 0;
  if (frames[_frameNumber]) {
    var s = frames[_frameNumber];

      for (var y = 0; y < grid_h; y+=block) {
       
        for (var x = 0; x < grid_w; x+=block) {
        
          if (s.substring(i,i+1) == "1") { // drawing grid
            //console.log(s);
            if (state != undefined && state == 1) {
              addBlock(x + xoffset, y + yoffset,1);
            } else if (state != undefined && state == 3) { // onion
              addBlock(x + xoffset, y + yoffset,3);
            } else { // playback grid
              addBlock(x + playback_x, y + yoffset,2); 
            }        
          }
        i++;
        }
      }
  }
}



function playBack(){
   
  counter++;
  if (counter > 20 && frames[playFrame]) { 
    individualFrames();

    counter= 0;
    var i = 0;
    clearPlayback();
  if (playFrame < frames.length-1) {
    playFrame++;
  } else {
    playFrame = 0;  
  }
  hiddenPlayBack(playFrame);
    var s = frames[playFrame];

   for (var y = 0; y<grid_h; y+= block) {
     
     for (var x = 0; x < grid_w; x+= block) {
      
      if (s.substring(i,i+1) == "1") {
        addBlock(x + playback_x, y+ yoffset, 1);
      }
        
      i++;
   }
}

  }
}

function fillGrid(){
  
  for (var y = 0; y<grid_h; y+= block) {
     
     for (var x = 0; x < grid_w; x+= block) {
        addBlock(x + xoffset, y+ yoffset, 1);
      }

  }

}




function hiddenPlayBack(hidden_playFrame){
   
  clearHiddenPlayBack();
  var s = frames[hidden_playFrame];
  
  var i = 0;
  for (var y = 0; y<grid_h; y += block) {
     
    for (var x = 0; x < grid_w; x += block) {
      
      if (s.substring(i,i+1) == "1") {
        hidden_ctx.fillColor(rgb(255,0,0));
        hidden_ctx.fillRect(x, y, block, block);
      }
      i++;   
    }
  }

}

// function sleep(milliseconds) {
//   var start = new Date().getTime();
//   for (var i = 0; i < 1e7; i++) {
//     if ((new Date().getTime() - start) > milliseconds){
//       break;
//     }
//   }
// }


function individualFrames(){

    var i = 0;
    var little_block = block/little_frame_factor;
    if (frames[playFrame]) {
    
      var s = frames[playFrame];

   for (var y = 0; y < grid_h/little_frame_factor; y+= little_block) {
     
     for (var x = 0; x < grid_w/little_frame_factor; x+= little_block) {
      
      if (s.substring(i,i+1) == "1") {

        if (framenumber == playFrame) {
          ctx.fillColor(rgb(0,0,0));
        } else {
          ctx.fillColor(rgb(220,0,0));
        }

      } else {
        // if (framenumber == playFrame) {
        //   ctx.fillColor(rgb(80,80,80));
        // } else {
          ctx.fillColor(rgb(255,255,255));
        //}
        
        
      }
      ctx.strokeWeight(0);
      ctx.fillRect(x + xoffset + playFrame * (grid_w/little_frame_factor)+ playFrame * frames_spacer, y + frames_y, little_block, little_block);
      i++
   }
}
}
 
}



///// clear drawspace\

function clearDrawspace(){
  ctx.clearRect(xoffset, yoffset, grid_w, grid_h);
}


function clearPlayback(){
  //console.log("clearPlayback");
  ctx.clearRect(playback_x, yoffset, xoffset+490, grid_h);
  ctx.fillColor(rgb(0,0,0));
  ctx.fillRect(playback_x, yoffset, grid_w, grid_h);
}
 
function clearHiddenPlayBack(){
  hidden_ctx.clearRect(0, 0, grid_w, grid_h);
  hidden_ctx.fillColor(rgb(0,0,0));
  hidden_ctx.fillColor(rgb(255,0,0));
}



///// listnerers ////////////////////

window.addEventListener('mousemove', function(event){
  
  // is it on the grid
  if (mouseX > xoffset && mouseX<xoffset+grid_w && mouseY > yoffset && mouseY < yoffset + grid_h && up == false) {
 
    if(event.shiftKey) {
      removeBlock(mouseX, mouseY);
    } else {
      // what's underneath
      new_x = Math.floor(mouseX/block) * block;
      new_y = Math.floor(mouseY/block) * block;
      // console.log("new_x: " + new_x);
      // console.log("old_x: " + old_x);
      // console.log("new_y: " + new_y);
      // console.log("old_y: " + old_y);
      // console.log("==========================");
      
      if (new_x != old_x || new_y != old_y ) {

        if ( ctx.getImageData(mouseX, mouseY, 1, 1).data[0]> 200 ) {
          addBlock(mouseX, mouseY, 0);
        } else {
          addBlock(mouseX, mouseY, 1);
        }
        
      }
      
        // if (event.button == 0) {
        //   addBlock(mouseX, mouseY, 1);
        // } else {
        //   addBlock(mouseX, mouseY, 0);
        // }
    }
    old_x = new_x;
    old_y = new_y;
}
  getFrame(framenumber);
  //loadFrame(framenumber,2);
})


window.addEventListener('mouseup', function(event){
  up = true;

})


window.addEventListener('mousedown', function(event){
  
  up = false;
  new_x = Math.floor(mouseX/block) * block;
  new_y = Math.floor(mouseY/block) * block;
  old_x = new_x;
  old_y = new_y;
  var frames_width = (frames_x + grid_w/little_frame_factor) * frames.length + frames.length *frames_spacer;
  
  // is it on the drawing grid
  if (mouseX > xoffset && mouseX < xoffset+grid_w && mouseY > yoffset && mouseY < yoffset + grid_h) {
    

    if(event.shiftKey) {
      removeBlock(mouseX, mouseY);
    } else if (ctx.getImageData(mouseX, mouseY, 1, 1).data[0]> 200 || ctx.getImageData(mouseX+2, mouseY+2, 1, 1).data[0]> 200) {
      addBlock(mouseX, mouseY, 2);
    } else {
    
      if (event.button == 0) {
        addBlock(mouseX, mouseY, 1);
      } else {
        addBlock(mouseX, mouseY, 0);
      }

    }

  } else if (mouseX > xoffset && mouseX < frames_width && mouseY > yoffset && mouseY < frames_y + grid_h/little_frame_factor) {
    // find which frame

    var f = Math.floor(mouseX/(frames_grid_w + frames_spacer));
    console.log("frame: "+f);
    framenumber = f-1;
    clearDrawspace();
    resetGrid();
    drawGrid();
    loadFrame(framenumber, 1);
    getFrame(framenumber);
    $("#frame").html("Frame: " + (framenumber+1));
  }
  getFrame(framenumber);
  loadFrame(framenumber,2);
})


///// save

function saveImage(){
  var encoder = new GIFEncoder();
  encoder.setRepeat(0);
  encoder.setDelay(400);
  encoder.setQuality(1)
  //encoder.setSize(grid_w,grid_h);
  encoder.start();
  console.log("total frames: " + frames.length);
  for (var i = 0; i < frames.length; i++) {
   
    hiddenPlayBack(i);
    encoder.addFrame(hidden_ctx);
  };
  encoder.finish();
  console.log("save gif");
  var binary_gif = encoder.stream().getData() 
  var data_url = 'data:image/gif;base64,'+encode64(binary_gif);
  $("#playback_image").html("<img src='"+data_url+"''>");
  var image = new Image(); image.src = data_url; 
  //window.open(data_url);
}

