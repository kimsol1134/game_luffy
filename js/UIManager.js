export class UIManager {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.gameOverScreen = false;
        this.restartButtonBounds = null;
        
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        this.canvas.addEventListener('click', (e) => {
            if (this.gameOverScreen && this.restartButtonBounds) {
                const rect = this.canvas.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                if (this.isPointInBounds(x, y, this.restartButtonBounds)) {
                    this.onRestart();
                }
            }
        });
        
        this.canvas.addEventListener('touchstart', (e) => {
            if (this.gameOverScreen && this.restartButtonBounds) {
                e.preventDefault();
                const rect = this.canvas.getBoundingClientRect();
                const touch = e.touches[0];
                const x = touch.clientX - rect.left;
                const y = touch.clientY - rect.top;
                
                if (this.isPointInBounds(x, y, this.restartButtonBounds)) {
                    this.onRestart();
                }
            }
        });
    }
    
    setRestartCallback(callback) {
        this.onRestart = callback;
    }
    
    drawGame(gameManager) {
        this.ctx.fillStyle = '#2c3e50';
        this.ctx.font = `${this.getResponsiveSize(20)}px Arial`;
        this.ctx.fillText(`점수: ${gameManager.score}`, 20, 40);
        this.ctx.fillText(`시간: ${gameManager.time}초`, 20, 70);
        this.ctx.fillText(`레벨: ${gameManager.level}`, 20, 100);
        
        this.gameOverScreen = false;
    }
    
    drawGameOver(gameManager) {
        // Semi-transparent overlay
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Game Over text
        this.ctx.fillStyle = '#ffffff';
        this.ctx.textAlign = 'center';
        
        const titleSize = this.getResponsiveSize(48);
        const textSize = this.getResponsiveSize(24);
        const smallTextSize = this.getResponsiveSize(18);
        
        this.ctx.font = `bold ${titleSize}px Arial`;
        this.ctx.fillText('게임 오버', this.canvas.width / 2, this.canvas.height / 2 - 120);
        
        // Final stats
        this.ctx.font = `${textSize}px Arial`;
        this.ctx.fillText(`최종 점수: ${gameManager.score}`, this.canvas.width / 2, this.canvas.height / 2 - 60);
        this.ctx.fillText(`생존 시간: ${gameManager.time}초`, this.canvas.width / 2, this.canvas.height / 2 - 30);
        
        // Level info
        this.ctx.font = `${smallTextSize}px Arial`;
        this.ctx.fillText(`달성 레벨: ${gameManager.getCurrentLevel()}`, this.canvas.width / 2, this.canvas.height / 2 + 10);
        
        const nextLevelTime = gameManager.getNextLevelTime();
        this.ctx.fillText(`다음 레벨(${gameManager.getCurrentLevel() + 1})까지: ${nextLevelTime - gameManager.time}초`, 
                          this.canvas.width / 2, this.canvas.height / 2 + 35);
        
        // Restart button
        const buttonWidth = this.getResponsiveSize(200);
        const buttonHeight = this.getResponsiveSize(50);
        const buttonX = (this.canvas.width - buttonWidth) / 2;
        const buttonY = this.canvas.height / 2 + 70;
        
        this.restartButtonBounds = {
            x: buttonX,
            y: buttonY,
            width: buttonWidth,
            height: buttonHeight
        };
        
        this.ctx.fillStyle = '#3498db';
        this.ctx.fillRect(buttonX, buttonY, buttonWidth, buttonHeight);
        
        this.ctx.fillStyle = '#ffffff';
        this.ctx.font = `${textSize}px Arial`;
        this.ctx.fillText('다시 시작', this.canvas.width / 2, buttonY + buttonHeight / 2 + 8);
        
        this.ctx.textAlign = 'left';
        this.gameOverScreen = true;
    }
    
    getResponsiveSize(baseSize) {
        const scaleFactor = Math.min(this.canvas.width / 800, this.canvas.height / 600);
        return Math.max(12, baseSize * scaleFactor);
    }
    
    isPointInBounds(x, y, bounds) {
        return x >= bounds.x && x <= bounds.x + bounds.width &&
               y >= bounds.y && y <= bounds.y + bounds.height;
    }
    
    resize(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
    }
}