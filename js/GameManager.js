export class GameManager {
    constructor() {
        this.state = 'Playing'; // 'Playing' | 'GameOver'
        this.score = 0;
        this.time = 0;
        this.level = 1;
        this.startTime = null;
        
        this.LEVEL_DURATION = 15; // seconds per level
    }
    
    start() {
        this.state = 'Playing';
        this.score = 0;
        this.time = 0;
        this.level = 1;
        this.startTime = Date.now();
    }
    
    update() {
        if (this.state === 'Playing') {
            this.time = Math.floor((Date.now() - this.startTime) / 1000);
            this.score = this.time * 10; // 10 points per second
            this.level = Math.floor(this.time / this.LEVEL_DURATION) + 1;
        }
    }
    
    gameOver() {
        this.state = 'GameOver';
    }
    
    restart() {
        this.start();
    }
    
    getCurrentLevel() {
        return this.level;
    }
    
    getNextLevelTime() {
        return this.level * this.LEVEL_DURATION;
    }
    
    getTimeToNextLevel() {
        return this.getNextLevelTime() - this.time;
    }
    
    getObstacleSpawnRate() {
        // Increase spawn rate with level
        return Math.max(0.5, 2 - (this.level - 1) * 0.2);
    }
    
    getObstacleSpeed() {
        // Increase speed with level
        return 2 + (this.level - 1) * 0.5;
    }
}