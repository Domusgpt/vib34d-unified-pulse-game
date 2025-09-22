/**
 * VisualTelegraphSystem - Clear visual communication system for all game events and interactions
 *
 * A Paul Phillips Manifestation
 * Send Love, Hate, or Opportunity: Paul@clearseassolutions.com
 * "The Revolution Will Not be in a Structured Format"
 * © 2025 Paul Phillips - Clear Seas Solutions LLC
 */

export class VisualTelegraphSystem {
    constructor(canvas, particleSystem, audioDirector) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particleSystem = particleSystem;
        this.audioDirector = audioDirector;

        // Visual communication layers
        this.layers = {
            geometry: new GeometryTelegraphLayer(canvas),
            quadrant: new QuadrantTelegraphLayer(canvas),
            interaction: new InteractionTelegraphLayer(canvas),
            timing: new TimingTelegraphLayer(canvas),
            feedback: new FeedbackTelegraphLayer(canvas)
        };

        // Active telegraph events
        this.activeTelegraphs = [];

        // Visual configuration
        this.config = {
            telegraphDuration: 3000, // 3 seconds warning
            urgencyThreshold: 1000,  // Last 1 second is urgent
            colorPalette: {
                safe: '#00ff88',
                warning: '#ffaa00',
                danger: '#ff4444',
                interact: '#44aaff',
                avoid: '#ff0088',
                timing: '#ffffff'
            },
            animations: {
                breathe: { speed: 2000, amplitude: 0.3 },
                pulse: { speed: 800, amplitude: 0.5 },
                flash: { speed: 200, amplitude: 1.0 },
                grow: { speed: 1500, amplitude: 0.7 }
            }
        };

        this.init();
    }

    init() {
        this.startRenderLoop();
    }

    startRenderLoop() {
        const render = () => {
            this.update();
            this.render();
            requestAnimationFrame(render);
        };
        requestAnimationFrame(render);
    }

    update() {
        const now = Date.now();

        // Update all active telegraphs
        for (let i = this.activeTelegraphs.length - 1; i >= 0; i--) {
            const telegraph = this.activeTelegraphs[i];
            telegraph.timeRemaining = telegraph.endTime - now;

            if (telegraph.timeRemaining <= 0) {
                this.completeTelegraph(telegraph);
                this.activeTelegraphs.splice(i, 1);
            } else {
                this.updateTelegraph(telegraph, now);
            }
        }

        // Update all layers
        for (const layer of Object.values(this.layers)) {
            layer.update(now);
        }
    }

    updateTelegraph(telegraph, now) {
        const progress = 1 - (telegraph.timeRemaining / telegraph.duration);
        telegraph.progress = progress;

        // Update urgency level
        if (telegraph.timeRemaining < this.config.urgencyThreshold) {
            telegraph.urgency = 'critical';
        } else if (telegraph.timeRemaining < this.config.urgencyThreshold * 2) {
            telegraph.urgency = 'high';
        } else {
            telegraph.urgency = 'normal';
        }

        // Update visual properties based on progress
        telegraph.intensity = this.calculateIntensity(progress, telegraph.urgency);
        telegraph.color = this.calculateColor(telegraph);
        telegraph.size = this.calculateSize(progress, telegraph.baseSize);
    }

    calculateIntensity(progress, urgency) {
        const baseIntensity = 0.3 + (progress * 0.7);

        switch (urgency) {
            case 'critical':
                return Math.min(1.0, baseIntensity * 1.5 + Math.sin(Date.now() * 0.02) * 0.3);
            case 'high':
                return Math.min(1.0, baseIntensity * 1.2);
            default:
                return baseIntensity;
        }
    }

    calculateColor(telegraph) {
        const baseColor = this.config.colorPalette[telegraph.type] || '#ffffff';

        if (telegraph.urgency === 'critical') {
            // Flash between base color and white
            const flashFactor = (Math.sin(Date.now() * 0.03) + 1) * 0.5;
            return this.interpolateColor(baseColor, '#ffffff', flashFactor * 0.5);
        }

        return baseColor;
    }

    calculateSize(progress, baseSize) {
        // Grow from 50% to 100% over the telegraph duration
        return baseSize * (0.5 + progress * 0.5);
    }

    render() {
        // Render all layers in order
        this.layers.geometry.render();
        this.layers.quadrant.render();
        this.layers.interaction.render();
        this.layers.timing.render();
        this.layers.feedback.render();

        // Render active telegraphs
        this.renderTelegraphs();
    }

    renderTelegraphs() {
        for (const telegraph of this.activeTelegraphs) {
            this.renderTelegraph(telegraph);
        }
    }

    renderTelegraph(telegraph) {
        this.ctx.save();
        this.ctx.globalAlpha = telegraph.intensity;

        switch (telegraph.visualType) {
            case 'ring':
                this.renderRingTelegraph(telegraph);
                break;
            case 'border':
                this.renderBorderTelegraph(telegraph);
                break;
            case 'fill':
                this.renderFillTelegraph(telegraph);
                break;
            case 'arrow':
                this.renderArrowTelegraph(telegraph);
                break;
            case 'icon':
                this.renderIconTelegraph(telegraph);
                break;
        }

        this.ctx.restore();
    }

    renderRingTelegraph(telegraph) {
        this.ctx.strokeStyle = telegraph.color;
        this.ctx.lineWidth = 3 + telegraph.intensity * 5;
        this.ctx.beginPath();
        this.ctx.arc(telegraph.x, telegraph.y, telegraph.size, 0, Math.PI * 2);
        this.ctx.stroke();

        // Add pulsing inner ring for timing
        if (telegraph.showTiming) {
            const timingRadius = telegraph.size * (1 - telegraph.progress);
            this.ctx.strokeStyle = this.config.colorPalette.timing;
            this.ctx.lineWidth = 2;
            this.ctx.beginPath();
            this.ctx.arc(telegraph.x, telegraph.y, timingRadius, 0, Math.PI * 2);
            this.ctx.stroke();
        }
    }

    renderBorderTelegraph(telegraph) {
        const { x, y, width, height } = telegraph.bounds;

        this.ctx.strokeStyle = telegraph.color;
        this.ctx.lineWidth = 2 + telegraph.intensity * 6;
        this.ctx.strokeRect(x, y, width, height);

        // Add danger pattern for critical urgency
        if (telegraph.urgency === 'critical') {
            this.ctx.setLineDash([10, 5]);
            this.ctx.strokeRect(x - 5, y - 5, width + 10, height + 10);
            this.ctx.setLineDash([]);
        }
    }

    renderFillTelegraph(telegraph) {
        const { x, y, width, height } = telegraph.bounds;

        // Animated fill based on progress
        const fillHeight = height * telegraph.progress;
        const gradient = this.ctx.createLinearGradient(x, y + height, x, y + height - fillHeight);
        gradient.addColorStop(0, telegraph.color);
        gradient.addColorStop(1, this.adjustColorAlpha(telegraph.color, 0.3));

        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(x, y + height - fillHeight, width, fillHeight);
    }

    renderArrowTelegraph(telegraph) {
        this.ctx.fillStyle = telegraph.color;
        this.ctx.strokeStyle = telegraph.color;
        this.ctx.lineWidth = 2;

        const { x, y, direction } = telegraph;
        const size = telegraph.size;

        // Draw arrow pointing in specified direction
        this.ctx.save();
        this.ctx.translate(x, y);
        this.ctx.rotate(direction * Math.PI / 180);

        this.ctx.beginPath();
        this.ctx.moveTo(-size, -size/2);
        this.ctx.lineTo(0, -size/2);
        this.ctx.lineTo(0, -size);
        this.ctx.lineTo(size, 0);
        this.ctx.lineTo(0, size);
        this.ctx.lineTo(0, size/2);
        this.ctx.lineTo(-size, size/2);
        this.ctx.closePath();
        this.ctx.fill();

        this.ctx.restore();
    }

    renderIconTelegraph(telegraph) {
        const { x, y, iconType, size } = telegraph;

        this.ctx.fillStyle = telegraph.color;
        this.ctx.strokeStyle = telegraph.color;
        this.ctx.lineWidth = 3;

        switch (iconType) {
            case 'tap':
                this.renderTapIcon(x, y, size);
                break;
            case 'swipe':
                this.renderSwipeIcon(x, y, size, telegraph.direction);
                break;
            case 'hold':
                this.renderHoldIcon(x, y, size, telegraph.progress);
                break;
            case 'avoid':
                this.renderAvoidIcon(x, y, size);
                break;
        }
    }

    renderTapIcon(x, y, size) {
        // Concentric circles with pulse effect
        const pulseOffset = Math.sin(Date.now() * 0.01) * size * 0.2;

        this.ctx.beginPath();
        this.ctx.arc(x, y, size + pulseOffset, 0, Math.PI * 2);
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.arc(x, y, size * 0.6, 0, Math.PI * 2);
        this.ctx.fill();
    }

    renderSwipeIcon(x, y, size, direction) {
        // Arrow with motion lines
        const angle = direction * Math.PI / 180;

        this.ctx.save();
        this.ctx.translate(x, y);
        this.ctx.rotate(angle);

        // Main arrow
        this.ctx.beginPath();
        this.ctx.moveTo(-size, -size/3);
        this.ctx.lineTo(size/2, -size/3);
        this.ctx.lineTo(size/2, -size);
        this.ctx.lineTo(size, 0);
        this.ctx.lineTo(size/2, size);
        this.ctx.lineTo(size/2, size/3);
        this.ctx.lineTo(-size, size/3);
        this.ctx.closePath();
        this.ctx.fill();

        // Motion lines
        for (let i = 0; i < 3; i++) {
            const offset = -size * 1.5 - i * size * 0.3;
            this.ctx.beginPath();
            this.ctx.moveTo(offset, -size/4);
            this.ctx.lineTo(offset + size/3, 0);
            this.ctx.lineTo(offset, size/4);
            this.ctx.stroke();
        }

        this.ctx.restore();
    }

    renderHoldIcon(x, y, size, progress) {
        // Circle that fills as hold progresses
        this.ctx.beginPath();
        this.ctx.arc(x, y, size, 0, Math.PI * 2);
        this.ctx.stroke();

        // Fill based on progress
        if (progress > 0) {
            this.ctx.beginPath();
            this.ctx.arc(x, y, size * 0.8, -Math.PI/2, -Math.PI/2 + (progress * Math.PI * 2));
            this.ctx.lineTo(x, y);
            this.ctx.closePath();
            this.ctx.fill();
        }

        // Center dot
        this.ctx.beginPath();
        this.ctx.arc(x, y, size * 0.2, 0, Math.PI * 2);
        this.ctx.fill();
    }

    renderAvoidIcon(x, y, size) {
        // X symbol with danger styling
        this.ctx.lineWidth = size * 0.2;
        this.ctx.lineCap = 'round';

        this.ctx.beginPath();
        this.ctx.moveTo(x - size, y - size);
        this.ctx.lineTo(x + size, y + size);
        this.ctx.moveTo(x + size, y - size);
        this.ctx.lineTo(x - size, y + size);
        this.ctx.stroke();

        // Outer warning circle
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.arc(x, y, size * 1.2, 0, Math.PI * 2);
        this.ctx.stroke();
    }

    // Public API for creating telegraphs
    telegraphGeometrySpawn(x, y, geometryType, interactionType, timeUntilSpawn) {
        const telegraph = {
            id: this.generateId(),
            type: interactionType,
            visualType: 'ring',
            geometryType: geometryType,
            x, y,
            baseSize: this.getGeometrySize(geometryType),
            size: 0,
            duration: timeUntilSpawn,
            timeRemaining: timeUntilSpawn,
            endTime: Date.now() + timeUntilSpawn,
            progress: 0,
            intensity: 0,
            urgency: 'normal',
            color: this.config.colorPalette[interactionType],
            showTiming: true
        };

        this.activeTelegraphs.push(telegraph);
        return telegraph.id;
    }

    telegraphQuadrantDanger(quadrant, duration) {
        const bounds = this.getQuadrantBounds(quadrant);

        const telegraph = {
            id: this.generateId(),
            type: 'danger',
            visualType: 'border',
            quadrant: quadrant,
            bounds: bounds,
            duration: duration,
            timeRemaining: duration,
            endTime: Date.now() + duration,
            progress: 0,
            intensity: 0,
            urgency: 'normal',
            color: this.config.colorPalette.danger
        };

        this.activeTelegraphs.push(telegraph);

        // Also trigger particle system
        this.particleSystem.activateQuadrantDanger(quadrant, duration);

        return telegraph.id;
    }

    telegraphInteractionGuide(x, y, interactionType, direction = 0) {
        const telegraph = {
            id: this.generateId(),
            type: interactionType,
            visualType: 'icon',
            iconType: interactionType,
            x, y,
            direction: direction,
            baseSize: 30,
            size: 30,
            duration: 2000,
            timeRemaining: 2000,
            endTime: Date.now() + 2000,
            progress: 0,
            intensity: 0.8,
            urgency: 'normal',
            color: this.config.colorPalette.interact
        };

        this.activeTelegraphs.push(telegraph);
        return telegraph.id;
    }

    telegraphBeatTiming(x, y, beatStrength) {
        const telegraph = {
            id: this.generateId(),
            type: 'timing',
            visualType: 'ring',
            x, y,
            baseSize: 20 + beatStrength * 30,
            size: 0,
            duration: 500,
            timeRemaining: 500,
            endTime: Date.now() + 500,
            progress: 0,
            intensity: 0.5 + beatStrength * 0.5,
            urgency: 'normal',
            color: this.config.colorPalette.timing,
            showTiming: false
        };

        this.activeTelegraphs.push(telegraph);
        return telegraph.id;
    }

    // Event completion handling
    completeTelegraph(telegraph) {
        // Trigger completion effects based on telegraph type
        switch (telegraph.type) {
            case 'danger':
                this.triggerDangerActivation(telegraph);
                break;
            case 'interact':
                this.triggerInteractionExpected(telegraph);
                break;
        }
    }

    triggerDangerActivation(telegraph) {
        // Make quadrant dangerous - spawn danger particles
        if (telegraph.quadrant !== undefined) {
            this.particleSystem.spawnDangerParticles(telegraph.quadrant, 1.0);
        }
    }

    triggerInteractionExpected(telegraph) {
        // Player should have interacted by now
        // This could trigger a miss event if no interaction occurred
    }

    // Utility methods
    getGeometrySize(geometryType) {
        const sizes = {
            'tesseract': 40,
            'hypersphere': 35,
            '24cell': 45,
            '600cell': 50,
            '120cell': 60
        };
        return sizes[geometryType] || 40;
    }

    getQuadrantBounds(quadrant) {
        const width = this.canvas.width / 2;
        const height = this.canvas.height / 2;

        const bounds = {
            0: { x: 0, y: 0, width, height },
            1: { x: width, y: 0, width, height },
            2: { x: 0, y: height, width, height },
            3: { x: width, y: height, width, height }
        };

        return bounds[quadrant];
    }

    generateId() {
        return Date.now() + Math.random().toString(36).substr(2, 9);
    }

    interpolateColor(color1, color2, factor) {
        // Simple color interpolation
        // In a real implementation, you'd want proper RGB interpolation
        return factor > 0.5 ? color2 : color1;
    }

    adjustColorAlpha(color, alpha) {
        // Convert color to RGBA with specified alpha
        // Simple implementation - would need proper color parsing in real code
        if (color.startsWith('#')) {
            const r = parseInt(color.substr(1, 2), 16);
            const g = parseInt(color.substr(3, 2), 16);
            const b = parseInt(color.substr(5, 2), 16);
            return `rgba(${r}, ${g}, ${b}, ${alpha})`;
        }
        return color;
    }

    // Public API for external systems
    clearTelegraph(telegraphId) {
        const index = this.activeTelegraphs.findIndex(t => t.id === telegraphId);
        if (index !== -1) {
            this.activeTelegraphs.splice(index, 1);
        }
    }

    clearAllTelegraphs() {
        this.activeTelegraphs = [];
    }

    setUrgencyLevel(telegraphId, urgency) {
        const telegraph = this.activeTelegraphs.find(t => t.id === telegraphId);
        if (telegraph) {
            telegraph.urgency = urgency;
        }
    }
}

// Telegraph Layer Classes for modular rendering
class GeometryTelegraphLayer {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.geometries = [];
    }

    update(time) {
        // Update geometry-specific telegraphs
    }

    render() {
        // Render geometry spawn telegraphs
    }
}

class QuadrantTelegraphLayer {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.quadrantStates = [false, false, false, false];
    }

    update(time) {
        // Update quadrant danger states
    }

    render() {
        // Render quadrant boundary warnings
    }
}

class InteractionTelegraphLayer {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.interactions = [];
    }

    update(time) {
        // Update interaction guides
    }

    render() {
        // Render interaction type indicators
    }
}

class TimingTelegraphLayer {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.timingEvents = [];
    }

    update(time) {
        // Update beat timing indicators
    }

    render() {
        // Render timing guides and beat indicators
    }
}

class FeedbackTelegraphLayer {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.feedbackEvents = [];
    }

    update(time) {
        // Update success/failure feedback
    }

    render() {
        // Render immediate feedback responses
    }
}