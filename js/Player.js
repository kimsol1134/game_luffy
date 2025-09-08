export class Player {
    constructor(canvas) {
        this.canvas = canvas;
        this.width = 60;
        this.height = 60;
        this.x = (canvas.width - this.width) / 2;
        this.y = canvas.height - this.height - 20;
        this.speed = 5;
        
        this.image = new Image();
        this.image.src = './luffy.png';
        this.imageLoaded = false;
        
        this.image.onload = () => {
            this.imageLoaded = true;
        };
    }
    
    update(inputManager) {
        const direction = inputManager.getMovementDirection();
        this.x += direction * this.speed;
        
        // Keep player within canvas bounds
        this.x = Math.max(0, Math.min(this.canvas.width - this.width, this.x));
    }
    
    draw(ctx) {
        if (this.imageLoaded) {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        } else {
            // Fallback rectangle if image not loaded
            ctx.fillStyle = '#ff6b6b';
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
    
    reset(canvas) {
        this.canvas = canvas;
        this.x = (canvas.width - this.width) / 2;
        this.y = canvas.height - this.height - 20;
    }
}