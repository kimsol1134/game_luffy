export class InputManager {
    constructor() {
        this.keys = {};
        this.touchX = null;
        this.isMovingLeft = false;
        this.isMovingRight = false;
        
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        // Keyboard events
        document.addEventListener('keydown', (e) => {
            this.keys[e.code] = true;
            this.updateMovement();
        });
        
        document.addEventListener('keyup', (e) => {
            this.keys[e.code] = false;
            this.updateMovement();
        });
        
        // Touch events for mobile
        document.addEventListener('touchstart', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            this.touchX = touch.clientX;
            this.updateTouchMovement();
        });
        
        document.addEventListener('touchend', (e) => {
            e.preventDefault();
            this.touchX = null;
            this.isMovingLeft = false;
            this.isMovingRight = false;
        });
        
        document.addEventListener('touchmove', (e) => {
            e.preventDefault();
            if (e.touches.length > 0) {
                const touch = e.touches[0];
                this.touchX = touch.clientX;
                this.updateTouchMovement();
            }
        });
    }
    
    updateMovement() {
        this.isMovingLeft = this.keys['ArrowLeft'] || this.keys['KeyA'];
        this.isMovingRight = this.keys['ArrowRight'] || this.keys['KeyD'];
    }
    
    updateTouchMovement() {
        if (this.touchX !== null) {
            const screenCenter = window.innerWidth / 2;
            this.isMovingLeft = this.touchX < screenCenter;
            this.isMovingRight = this.touchX >= screenCenter;
        }
    }
    
    getMovementDirection() {
        if (this.isMovingLeft && !this.isMovingRight) {
            return -1; // Left
        } else if (this.isMovingRight && !this.isMovingLeft) {
            return 1; // Right
        }
        return 0; // No movement
    }
}