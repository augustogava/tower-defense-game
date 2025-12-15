const ResponsiveConfig = {
    BASE_WIDTH: 1020,
    BASE_HEIGHT: 800,
    UI_HEIGHT: 200,
    
    BREAKPOINTS: {
        MOBILE: 768,
        TABLET: 1024,
        DESKTOP: 1920
    },
    
    getDeviceType: function() {
        const width = window.innerWidth;
        if (width < this.BREAKPOINTS.MOBILE) return 'mobile';
        if (width < this.BREAKPOINTS.TABLET) return 'tablet';
        return 'desktop';
    },
    
    isMobile: function() {
        return this.getDeviceType() === 'mobile';
    },
    
    isTablet: function() {
        return this.getDeviceType() === 'tablet';
    },
    
    isDesktop: function() {
        return this.getDeviceType() === 'desktop';
    },
    
    getPerformanceSettings: function() {
        const device = this.getDeviceType();
        
        return {
            maxParticles: device === 'mobile' ? 30 : device === 'tablet' ? 60 : 150,
            maxEffects: device === 'mobile' ? 20 : device === 'tablet' ? 40 : 100,
            enableShadows: device === 'desktop',
            enableGlow: device !== 'mobile',
            targetFPS: device === 'mobile' ? 30 : 60
        };
    },
    
    checkOrientation: function() {
        const warning = document.getElementById('orientationWarning');
        if (!warning) return true;
        
        const isMobileDevice = this.isMobile();
        const isPortrait = window.innerHeight > window.innerWidth;
        
        if (isMobileDevice && isPortrait) {
            warning.style.display = 'flex';
            return false;
        } else {
            warning.style.display = 'none';
            return true;
        }
    }
};

console.log('ResponsiveConfig loaded - Device:', ResponsiveConfig.getDeviceType());

