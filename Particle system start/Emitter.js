function Emitter(x,y,xSpeed,ySpeed,size,colour) {
	this.x = x;
	this.y = y;
	this.xSpeed = xSpeed;
	this.ySpeed = ySpeed;
	this.size = size;
	this.colour = colour;

	this.startParticles = 0;
	this.lifetime = 0;

	this.particles = [];

	this.addParticle = function() {
		var p = new Particle(random(this.x-10, this.x+10), random(this.y-10,this.y+10), 
			random(this.xSpeed-1,this.xSpeed+1), random(this.ySpeed-1,this.ySpeed+1), 
			random(this.size-4,this.size+4), this.colour);
		return p;
	}

	this.startEmitter = function(startParticles, lifetime) {
		this.startParticles = startParticles;
		this.lifetime = lifetime;

		//Start emitter with initial particles
		for(var i = 0; i < startParticles; i++) {
			this.particles.push(this.addParticle());
		}
	}
	this.updateParticles = function() {
		//iterate through particles and draw to the screen
		var deadParticles = 0;
		for (var i = this.particles.length-1; i >= 0; i--) {
			this.particles[i].drawParticle();
			this.particles[i].updateParticle();
			if(this.particles[i].age > random(0,this.lifetime)) {
				this.particles.splice(i,1);
				deadParticles++;
			}
		}
		if(deadParticles > 0) {
			for(var i = 0; i < deadParticles; i++) {
				this.particles.push(this.addParticle());
			}
		}
	}
}