class Obstacle {
    constructor(x, y, speed) {
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
        this.speed = speed;
        
        this.image = new Image();
        this.image.src = 'akainu.png';
        this.imageLoaded = false;
        
        this.image.onload = () => {
            this.imageLoaded = true;
        };
    }
    
    update() {
        this.y += this.speed;
    }
    
    draw(ctx) {
        if (this.imageLoaded) {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        } else {
            // Fallback rectangle if image not loaded
            ctx.fillStyle = '#4ecdc4';
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    
    getBounds() {
        return {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
        };
    }
    
    isOffScreen(canvasHeight) {
        return this.y > canvasHeight;
    }
}

export class ObstacleManager {
    constructor(canvas) {
        this.canvas = canvas;
        this.obstacles = [];
        this.lastSpawnTime = 0;
        this.spawnRate = 2; // seconds between spawns
    }
    
    update(gameManager, deltaTime) {
        const currentTime = Date.now() / 1000;
        const spawnRate = gameManager.getObstacleSpawnRate();
        const obstacleSpeed = gameManager.getObstacleSpeed();
        
        // Spawn new obstacles
        if (currentTime - this.lastSpawnTime > spawnRate) {
            this.spawnObstacle(obstacleSpeed);
            this.lastSpawnTime = currentTime;
        }
        
        // Update existing obstacles
        for (let i = this.obstacles.length - 1; i >= 0; i--) {
            const obstacle = this.obstacles[i];
            obstacle.update();
            
            // Remove obstacles that are off screen
            if (obstacle.isOffScreen(this.canvas.height)) {
                this.obstacles.splice(i, 1);
            }
        }
    }
    
    spawnObstacle(speed) {
        const x = Math.random() * (this.canvas.width - 50);
        const y = -50;
        const obstacle = new Obstacle(x, y, speed);
        this.obstacles.push(obstacle);
    }
    
    draw(ctx) {
        this.obstacles.forEach(obstacle => {
            obstacle.draw(ctx);
        });
    }
    
    getObstacles() {
        return this.obstacles;
    }
    
    reset() {
        this.obstacles = [];
        this.lastSpawnTime = 0;
    }
}