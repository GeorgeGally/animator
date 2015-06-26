var framenumber = 0;
var firstTime = 0;
var frames = [];
var up = true;
var onion = false;
var grid_w = 240;
var grid_h = 320;
var xoffset = 50;
var yoffset = 100;
var block = 10;

function setup() {

  $("#frame").html("Frame: 1");
  console.log("==========================================");
  console.log("                Instructions              ");
  console.log("==========================================");
  console.log("1. Click or drag with left mouse key to draw,");
  console.log("2. Use right mouse key to erase a single pixel,");
  console.log("3. Press UP to erase all pixels.");
  console.log("4. Press SPACE to view previous frame,");
  console.log("5 .Press DOWN to load previous frame,");
  console.log("6. Press ALT LEFT to erase frame.");
  resetGrid();

}

function draw() {
  //draw grid
  drawGrid();
  clearPlayback();
}

function resetGrid(){
  ctx.fillColor(rgb(0,0,0));
  ctx.fillRect(xoffset, 0, grid_w, grid_h);
}

window.addEventListener('mousedown', function(event){
  
  up = false;
     if (mouseX > xoffset && mouseX<xoffset+grid_w && mouseY < grid_h) {
      if(event.shiftKey) {
        removeBlock(mouseX, mouseY);
      } else if (ctx.getImageData(mouseX, mouseY, 1, 1).data[0]> 200 || ctx.getImageData(mouseX+2, mouseY+2, 1, 1).data[0]> 200) {
        addBlock(mouseX, mouseY, 3);
  } else {
    if (event.button == 0) {
      addBlock(mouseX, mouseY, 1);
    } else {
      addBlock(mouseX, mouseY, 0);
    }
}

}
} )

window.addEventListener('mousemove', function(event){
  
  if (mouseX > xoffset && mouseX<xoffset+grid_w && mouseY < grid_h && up == false) {
 
    if(event.shiftKey) {
      removeBlock(mouseX, mouseY);
  
    } else {
        if (event.button == 0) {
          addBlock(mouseX, mouseY, 1);
        } else {
          addBlock(mouseX, mouseY, 0);
      }
    }
}

} )


function addBlock(x,y, state){
   firstTime = 0;

   posx = Math.floor(x/block);
   posy = Math.floor(y/block);
   
   //if () { // check if black
     if (state == 1) {
  
      ctx.fillColor(rgb(255,0,0));
    
    
  

    } else if (state == 2) {
    ctx.fillColor(rgb(255,0,0));
    //ctx.fillColor(rgb(50,50,50));
      } else if (state == 3) {
    ctx.fillColor(rgb(0,0,0));
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


window.addEventListener('mouseup', function(event){
 up = true;
 getFrame(framenumber);
})

document.onkeydown = checkKey;

function checkKey(event){
  console.log(event.keyCode)
  if (event.keyCode == 39) {  //right  
      getFrame(framenumber);
      ctx.clearRect(xoffset,0,grid_w,grid_h);
      resetGrid();
      drawGrid();
      onion = false;
      framenumber++;
      loadFrame(framenumber,1);
      $("#frame").html("Frame: " + (framenumber+1));
  } else if (event.keyCode == 37 && framenumber>0) {  //left
      getFrame(framenumber);
      framenumber--;
      ctx.clearRect(xoffset, 0, grid_w, grid_h);
      onion = false;
      resetGrid();
      drawGrid();
      loadFrame(framenumber, 1);
      $("#frame").html("Frame: " + (framenumber+1));
  } else if (event.keyCode == 40 && framenumber>0) {  //down
      loadFrame(framenumber-1, 1);
  } else if (event.keyCode == 32) {  //space
    console.log("clear");
    ctx.clearRect(xoffset,0,grid_w,grid_h);
    onion = false;
      resetGrid();
      drawGrid();
      getFrame(framenumber);
  } else if (event.keyCode == 38) {  //up
  
    if (onion == false) {
      loadFrame(framenumber-1);
      onion = true;
  } else {
      onion = false;
      hideOnion();
  }
}
  }


function hideOnion(){
  for (var y = 5; y<grid_h; y+=block) { 
    
      for (var x = xoffset+5; x<xoffset+grid_w; x+=block) {
          var p = ctx.getImageData(x, y, 1, 1).data; 
          
          if (p[0] == 50 && p[1] == 50 && p[2] == 50) {
            addBlock(x,y, 3)
            //console.log(p)
        }
        
}

    }
}


function getFrame(framenumber){
    var f = "";
    var i = 0;
    for (var y = 5; y<grid_h; y+=block) { 
    
      for (var x = 5; x<grid_w; x+=block) {
          var p = ctx.getImageData(x, y, 1, 1).data; 
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
frames[framenumber] = f;
//console.log("-------"+frames[framenumber]);


}


function drawGrid(){
  ctx.strokeColor(rgb(30,30,30));
 for (var x = 0; x<= grid_w; x+=block) {
    ctx.line(x+xoffset, 0, x+xoffset, grid_h);
  }
  for (var y = 0; y<=grid_h; y+=block) {
    ctx.line(xoffset, y, grid_w+xoffset, y);
  }

}

function loadFrame(_frameNumber, state){

  var i = 0;
  if (frames[_frameNumber]) {
  var s = frames[_frameNumber];
  //console.log(s)

   for (var y = 0; y<grid_h; y+=block) {
     
     for (var x = xoffset; x<grid_w+xoffset; x+=block) {
      
      if (s.substring(i,i+1) == "1") {
        if (state != undefined && state == 1) {
        addBlock(x,y,1);
        } else {
         addBlock(x,y,2); 
        }        
        }
      i++;
   }
 }
}
}

var playFrame = 0;
var counter = 0;

function playBack(){
   
  counter++;
  if (counter>50 && frames[playFrame]) { 
    counter= 0;
    var i = 0;
    //ctx.clearRect(0,350,240,320);
    clearPlayback();
    //console.log(playFrame)
  if (playFrame < frames.length-1) {
    playFrame++;
  } else {
    playFrame = 0;
    
  }

    var s = frames[playFrame];
    //

   for (var y = 0; y<grid_h; y+= block) {
     
     for (var x = 0; x < grid_w; x+= block) {
      
      if (s.substring(i,i+1) == "1") {
        addBlock(x+grid_w + block, y, 2);
        //wait(200);
      }
        i++
   }
 }


}
}

function clearPlayback(){
  ctx.clearRect(xoffset+grid_w+10,0, xoffset+490, grid_h);
    ctx.fillColor(rgb(0,0,0));
    ctx.fillRect(xoffset+grid_w+block, 0, grid_w, grid_h);
}
 