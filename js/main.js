

var canvas = document.createElement('canvas');
document.body.appendChild(canvas);
var ctx = canvas.getContext('2d');
canvas.setAttribute("id", "canvas1");

// var hidden_canvas = document.createElement('canvas');
// hidden_canvas.setAttribute("id", "canvas2");
// document.body.appendChild(hidden_canvas);
// hidden_canvas.style.position = 'absolute';
// hidden_canvas.style.top = '0px';
// hidden_canvas.style.right = '-2000px';
// var hidden_ctx = hidden_canvas.getContext('2d');

var width, height, w, h;
resize();

function resize() {
	width = w = window.innerWidth,
	height = h = window.innerHeight,
	// canvas.width = hidden_canvas.width = width;
	// canvas.height = hidden_canvas.height = height;
	canvas.width =  width;
	canvas.height =  height;
	// hidden_canvas.style.right = -width;
}

window.addEventListener('resize', resize, false);


var loc = document.location.hash.substr(1);
var filename = 'art/' +  loc + '.js';
fileref = document.createElement('script')
fileref.setAttribute("type","text/javascript")
fileref.setAttribute("src", filename);
document.getElementsByTagName("body")[0].appendChild(fileref);


// var showStats = true;
// var stats = new Stats();
// var stats_container = document.createElement('stats');
// document.body.appendChild(stats_container);
// stats_container.appendChild( stats.domElement );
// stats.domElement.style.position = 'absolute';
// stats.domElement.style.zIndex = 999;
// stats.domElement.style.top = '0px';
// stats.domElement.style.left = '0px';


