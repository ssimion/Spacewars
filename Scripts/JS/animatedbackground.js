$(function () {
	// Constants
	// TODO : Should be moved to a globals.js file.
	var g_background = document.getElementById('AnimatedBackground');
	var g_table = document.getElementById('board');
	var g_backgroundContext = g_background.getContext("2d");
	var g_NeedsRefresh = false;
	var g_gameWidth = 625;
	var g_gameHeight = 625;
	var g_currentWidth = g_gameWidth;
	var g_currentHeight = g_gameHeight;
	g_background.width = g_gameWidth;
	g_background.height = g_gameHeight;
	resize();
	function resize(){
		var ratio = g_gameHeight /g_gameWidth ;
		g_currentWidth =  g_gameWidth;
		g_currentHeight = ratio * g_currentWidth;
		
		g_background.style.width = g_currentWidth + 'px';
		g_background.style.height = g_currentHeight + 'px';
		g_table.style.left = (window.innerWidth - g_table.offsetWidth)/2 + 25 +'px';
		g_background.style.left = (window.innerWidth - g_currentWidth) /2 + 'px';
		
		// We use a timeout here because of some mobile browsers.
		window.setTimeout(function(){
			window.scrollTo(0,1);
		},1);
	}
	window.addEventListener('resize',function(){resize();});
	// Animate Background
	DrawBackground();
	// Animate Stars and anything that needs refresh.
	setInterval(function () {
		DrawBackground();
	/*Slowing Brother Down, Maybe consider using clear rect :(
/* 	if (!g_NeedsRefresh) {
		DrawStars(g_backgroundContext, 1000);
		g_NeedsRefresh = true;
	} else {
		DrawBackground();
		DrawStars(g_backgroundContext, 1000);
		g_NeedsRefresh = false;
	} */
	},
		1500);

	/** Retuns a number between the bounds.
	 * @param {int> min:
	 * @param {int} max:
	 * TODO : Should probably be moved to a utils.js file for cleanliness
	 */
	function RandomNumber(min, max) {
		return Math.floor(Math.random() * max) + min;
	}

	/** This Function draws a gradient in the background
	 */
	function DrawBackground() {
		var width = g_background.width;
		var height = g_background.height;
		for (var i = height; i >= 0; --i) {
			var indexColor = i;
			g_backgroundContext.fillStyle = "rgb(" + indexColor + "," + indexColor + "," + indexColor + ")"
				g_backgroundContext.fillRect(0, i, width, 360);
		}
		g_backgroundContext.strokeStyle = "rgba(0,0,255,0.8)";
		// Draw the Big Rectangle
		g_backgroundContext.strokeRect(15, 15, width - 30, height - 30);
		g_backgroundContext.strokeRect(16, 16, width - 32, height - 32);
		//Draw The Money Box
		g_backgroundContext.strokeRect(width - 128, height - 64, 112, 48);
		//Draw The Health Box
		g_backgroundContext.strokeRect(16, height - 64, 112, 48);
	}

	/** Draw a special number of random, five branched stars in the canvas
	 * @param {object} ctx: Canvas' context.
	 * @param {int} amountOfStars: number of wanted stars.
	 */
	function DrawStars(ctx, amountOfStars) {
		for (var i = 0; i < amountOfStars; ++i)
			drawStar(ctx, RandomNumber(0, 700), RandomNumber(0, 300), 5, 1, RandomNumber(1, 3));
	}

	/** This function draws stars
	 * Based on https://gist.github.com/chrillo/1388743
	 * @param {object} ctx: Canvas' Context.
	 * @param {int} cx: X position.
	 * @param {int} cy: Y position.
	 * @param {int} spikes: number of spikes.
	 * @param {int} r0: inner radius.
	 * @param {int} r1: outer radius
	 */
	function drawStar(ctx, cx, cy, spikes, r0, r1) {
		var rot = Math.PI / 2 * 3,
		x = cx,
		y = cy,
		step = Math.PI / spikes;
		ctx.strokeStyle = "#FFFFFF";
		ctx.beginPath();
		ctx.moveTo(cx, cy - r0)
		for (var i = 0; i < spikes; ++i) {
			x = cx + Math.cos(rot) * r0;
			y = cy + Math.sin(rot) * r0;
			ctx.lineTo(x, y)
			rot += step
			x = cx + Math.cos(rot) * r1;
			y = cy + Math.sin(rot) * r1;
			ctx.lineTo(x, y)
			rot += step
		}
		ctx.lineTo(cx, cy - r0)
		ctx.stroke();
		ctx.closePath();
	}
});
