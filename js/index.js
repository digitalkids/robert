(function(window, document, undefined) {
  
  var WIDTH = window.innerWidth,
      HEIGHT = window.innerHeight,
      canvas = document.createElement('canvas'),
      ctx    = canvas.getContext('2d'),
			body   = document.getElementsByTagName('body')[0],
			rand, max, min,
			colors = ['red', 'blue', 'black', 'green', 'yellow', 'pink', 'orange'];
  
  canvas.width  = WIDTH;
  canvas.height = HEIGHT;
  
  body.appendChild(canvas);
	
	var Balls = new Array();
	var TOTAL_BALLS = document.getElementById('num_of_balls').value;
	
	window.setBalls = function() {
		TOTAL_BALLS = document.getElementById('num_of_balls').value;
		
		if (TOTAL_BALLS < Balls.length) {
			var del = Balls.length - TOTAL_BALLS;
			Balls.splice(TOTAL_BALLS, del);
		}
		if (TOTAL_BALLS > Balls.length) {
			var create = TOTAL_BALLS - Balls.length;
			for (var i = 0;i < create;i++) {
				var ball = new Ball();
				Balls.push(ball);
			}
		}
	}
	
	function Ball() {
		this.x = 0;
		this.y = 0;
		this.vy = 0;
		this.vx = 0;
		this.r = 25;
		this.g = .2;
		this.c = colors[Math.floor(Math.random() * (colors.length))];
		
		this.reset();
	}
	
	Ball.prototype.reset = function() {
		this.x = (WIDTH / 2) - this.r;
		this.y = (HEIGHT / 2) - this.r;
		
		this.g = Math.random() * (.5 - .1) + .1;
		
		rand = Math.random()
		
		
		if (rand > .5) {
			this.vx = -1 * (Math.random() * (10 - 2) + 2);
		} else {
			this.vx = Math.random() * (10 - 2) + 2;
		}
		
	}
	
	Ball.prototype.collisionCheck = function() {
		if (this.x < 0 || this.x > WIDTH - this.r) {
			this.vx *= -1;
		}
		if (this.y + this.r > HEIGHT) {
			this.vy = -13;
		}
		if (this.y < 0) {
			this.vy = -2;
		}
		
	}
	
	for (var i = 0;i < TOTAL_BALLS;i++) {
		var ball = new Ball();
		Balls.push(ball);	
	}
	
	
  function draw() {
		ctx.clearRect(0, 0, WIDTH, HEIGHT);
		
		for (var i = 0;i < Balls.length;i++) {
			ball = Balls[i];
			ball.collisionCheck();
			drawBall(ball);
			
			ball.y += ball.vy;
			ball.x += ball.vx;
			
			ball.vy += ball.g;
		}
		
		if (requestAnimationFrame) {
			requestAnimationFrame(draw);
		} else {
			setTimeout(draw(), 1000 / 60);
		}
	}
	
	
	draw();
	
	
	function drawBall(ball) {
		ctx.fillStyle = ball.c;
		
		ctx.beginPath();
		ctx.arc(ball.x, ball.y, ball.r, 0, 2 * Math.PI);
		ctx.fill();
	}
  
	function onResize() {
		WIDTH  = window.innerWidth;
		HEIGHT = window.innerHeight;
		
		canvas.width  = WIDTH;
		canvas.height = HEIGHT;
	}
	
  window.addEventListener('resize', onResize, false);
}(window, document));