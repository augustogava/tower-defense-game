var deltaTime = 0;
var fps = 0;
var targetFPS = 60;
var targetFrameTime = 1000 / targetFPS;

var FrameTimer = function() {
    this._lastTick = performance.now();
    this._frameSpacing = 0;
    this._fpsFrames = 0;
    this._fpsLastUpdate = performance.now();
    this._fps = 0;
};

FrameTimer.prototype = {
    getSeconds: function() {
        var seconds = this._frameSpacing / 1000;
        if(isNaN(seconds)) {
            return 0;
        }
        return seconds;
    },
    
    getDeltaTime: function() {
        return this._frameSpacing / targetFrameTime;
    },

    tick: function() {
        var currentTick = performance.now();
        this._frameSpacing = currentTick - this._lastTick;
        this._lastTick = currentTick;
        
        deltaTime = this.getDeltaTime();
        if (deltaTime > 3) deltaTime = 3;
        
        this._fpsFrames++;
        if (currentTick - this._fpsLastUpdate >= 1000) {
            this._fps = this._fpsFrames;
            fps = this._fps;
            this._fpsFrames = 0;
            this._fpsLastUpdate = currentTick;
        }
    },
    
    getFPS: function() {
        return this._fps;
    }
};