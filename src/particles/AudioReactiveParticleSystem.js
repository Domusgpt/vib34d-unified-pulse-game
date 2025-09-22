/**
 * AudioReactiveParticleSystem - Quadrant-based particle system with audio-driven behaviors
 *
 * A Paul Phillips Manifestation
 * Send Love, Hate, or Opportunity: Paul@clearseassolutions.com
 * "The Revolution Will Not be in a Structured Format"
 * © 2025 Paul Phillips - Clear Seas Solutions LLC
 */

export class AudioReactiveParticleSystem {
    constructor(canvas, audioDirector) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.audioDirector = audioDirector;

        // Quadrant configuration
        this.quadrants = {
            0: { x: 0, y: 0, width: canvas.width/2, height: canvas.height/2, name: 'melody' },
            1: { x: canvas.width/2, y: 0, width: canvas.width/2, height: canvas.height/2, name: 'harmony' },
            2: { x: 0, y: canvas.height/2, width: canvas.width/2, height: canvas.height/2, name: 'rhythm' },
            3: { x: canvas.width/2, y: canvas.height/2, width: canvas.width/2, height: canvas.height/2, name: 'bass' }
        };

        // Particle pools for performance
        this.particlePools = {
            telegraph: new ParticlePool(1000, 'telegraph'),
            success: new ParticlePool(500, 'success'),
            failure: new ParticlePool(300, 'failure'),
            ambient: new ParticlePool(2000, 'ambient'),
            danger: new ParticlePool(800, 'danger'),
            combo: new ParticlePool(400, 'combo')
        };

        // Active particles by quadrant
        this.activeParticles = {
            0: [], 1: [], 2: [], 3: [], global: []
        };

        // Audio-reactive parameters
        this.audioParams = {
            bassEnergy: 0,
            midEnergy: 0,
            highEnergy: 0,
            beatStrength: 0,
            spectralCentroid: 0,
            tempo: 120
        };

        // Telegraph system state
        this.telegraphState = {
            0: { active: false, intensity: 0, timeRemaining: 0 },
            1: { active: false, intensity: 0, timeRemaining: 0 },
            2: { active: false, intensity: 0, timeRemaining: 0 },
            3: { active: false, intensity: 0, timeRemaining: 0 }
        };

        // Performance optimization
        this.lastFrameTime = 0;
        this.targetFPS = 60;
        this.frameInterval = 1000 / this.targetFPS;

        this.init();
    }

    init() {
        // Initialize particle behaviors
        this.setupParticleBehaviors();

        // Start render loop
        this.startRenderLoop();
    }

    setupParticleBehaviors() {
        // Define behaviors for different particle types
        this.particleBehaviors = {
            telegraph: {
                spawn: this.spawnTelegraphParticles.bind(this),
                update: this.updateTelegraphParticles.bind(this),
                render: this.renderTelegraphParticles.bind(this)
            },
            success: {
                spawn: this.spawnSuccessParticles.bind(this),
                update: this.updateSuccessParticles.bind(this),
                render: this.renderSuccessParticles.bind(this)
            },
            failure: {
                spawn: this.spawnFailureParticles.bind(this),
                update: this.updateFailureParticles.bind(this),
                render: this.renderFailureParticles.bind(this)
            },
            ambient: {
                spawn: this.spawnAmbientParticles.bind(this),
                update: this.updateAmbientParticles.bind(this),
                render: this.renderAmbientParticles.bind(this)
            },
            danger: {
                spawn: this.spawnDangerParticles.bind(this),
                update: this.updateDangerParticles.bind(this),
                render: this.renderDangerParticles.bind(this)
            },
            combo: {
                spawn: this.spawnComboParticles.bind(this),
                update: this.updateComboParticles.bind(this),
                render: this.renderComboParticles.bind(this)
            }
        };
    }

    startRenderLoop() {
        const render = (currentTime) => {
            if (currentTime - this.lastFrameTime >= this.frameInterval) {
                this.update(currentTime);
                this.render();
                this.lastFrameTime = currentTime;
            }
            requestAnimationFrame(render);
        };

        requestAnimationFrame(render);
    }

    update(currentTime) {
        // Update audio parameters
        this.updateAudioParameters();

        // Update telegraph states
        this.updateTelegraphStates();

        // Update all active particles
        this.updateAllParticles(currentTime);

        // Generate ambient particles based on audio
        this.generateAmbientParticles();

        // Clean up dead particles
        this.cleanupDeadParticles();
    }

    updateAudioParameters() {
        const frequencyData = this.audioDirector.getFrequencyData();
        const beatInfo = this.audioDirector.getBeatInfo();

        // Analyze frequency bands
        this.audioParams.bassEnergy = this.calculateBandEnergy(frequencyData, 0, 64);
        this.audioParams.midEnergy = this.calculateBandEnergy(frequencyData, 64, 512);
        this.audioParams.highEnergy = this.calculateBandEnergy(frequencyData, 512, 1024);
        this.audioParams.beatStrength = beatInfo.strength || 0;
        this.audioParams.tempo = beatInfo.bpm || 120;

        // Calculate spectral centroid for particle color mapping
        this.audioParams.spectralCentroid = this.calculateSpectralCentroid(frequencyData);
    }

    calculateBandEnergy(frequencyData, startBin, endBin) {
        let energy = 0;
        for (let i = startBin; i < endBin && i < frequencyData.length; i++) {
            energy += Math.pow(10, frequencyData[i] / 20);
        }
        return energy / (endBin - startBin);
    }

    calculateSpectralCentroid(frequencyData) {
        let numerator = 0;
        let denominator = 0;

        for (let i = 0; i < frequencyData.length; i++) {
            const magnitude = Math.pow(10, frequencyData[i] / 20);
            numerator += i * magnitude;
            denominator += magnitude;
        }

        return denominator > 0 ? numerator / denominator : 0;
    }

    // Telegraph System for Danger Zones
    activateTelegraph(quadrant, duration, intensity = 1.0) {
        this.telegraphState[quadrant] = {
            active: true,
            intensity: intensity,
            timeRemaining: duration,
            startTime: Date.now()
        };

        // Spawn initial telegraph particles
        this.spawnTelegraphParticles(quadrant, intensity);
    }

    updateTelegraphStates() {
        for (let quadrant = 0; quadrant < 4; quadrant++) {
            const state = this.telegraphState[quadrant];
            if (state.active) {
                state.timeRemaining -= this.frameInterval;

                if (state.timeRemaining <= 0) {
                    state.active = false;
                    // Spawn danger particles when telegraph completes
                    this.spawnDangerParticles(quadrant, state.intensity);
                } else {
                    // Update intensity based on remaining time
                    const progress = 1 - (state.timeRemaining / 3000); // 3 second telegraph
                    state.intensity = Math.min(1.0, progress * 2);
                }
            }
        }
    }

    // Particle Spawning Methods
    spawnTelegraphParticles(quadrant, intensity) {
        const quadrantInfo = this.quadrants[quadrant];
        const count = Math.floor(intensity * 20);

        for (let i = 0; i < count; i++) {
            const particle = this.particlePools.telegraph.acquire();
            if (particle) {
                this.initializeTelegraphParticle(particle, quadrantInfo, intensity);
                this.activeParticles[quadrant].push(particle);
            }
        }
    }

    initializeTelegraphParticle(particle, quadrantInfo, intensity) {
        // Start particles at quadrant edges, moving inward
        const edge = Math.floor(Math.random() * 4);
        let x, y, vx, vy;

        switch (edge) {
            case 0: // Top edge
                x = quadrantInfo.x + Math.random() * quadrantInfo.width;
                y = quadrantInfo.y;
                vx = (Math.random() - 0.5) * 2;
                vy = Math.random() * 2;
                break;
            case 1: // Right edge
                x = quadrantInfo.x + quadrantInfo.width;
                y = quadrantInfo.y + Math.random() * quadrantInfo.height;
                vx = -Math.random() * 2;
                vy = (Math.random() - 0.5) * 2;
                break;
            case 2: // Bottom edge
                x = quadrantInfo.x + Math.random() * quadrantInfo.width;
                y = quadrantInfo.y + quadrantInfo.height;
                vx = (Math.random() - 0.5) * 2;
                vy = -Math.random() * 2;
                break;
            case 3: // Left edge
                x = quadrantInfo.x;
                y = quadrantInfo.y + Math.random() * quadrantInfo.height;
                vx = Math.random() * 2;
                vy = (Math.random() - 0.5) * 2;
                break;
        }

        Object.assign(particle, {
            x, y, vx, vy,
            life: 1.0,
            maxLife: 2000 + Math.random() * 1000,
            size: 2 + Math.random() * 3,
            color: this.getTelegraphColor(intensity),
            intensity: intensity,
            quadrant: quadrantInfo,
            type: 'telegraph'
        });
    }

    spawnSuccessParticles(x, y, energy = 1.0) {
        const count = Math.floor(energy * 30);

        for (let i = 0; i < count; i++) {
            const particle = this.particlePools.success.acquire();
            if (particle) {
                const angle = (i / count) * Math.PI * 2;
                const speed = 2 + Math.random() * 4;

                Object.assign(particle, {
                    x, y,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed,
                    life: 1.0,
                    maxLife: 1000 + Math.random() * 500,
                    size: 3 + Math.random() * 5,
                    color: this.getSuccessColor(energy),
                    energy: energy,
                    type: 'success'
                });

                this.activeParticles.global.push(particle);
            }
        }
    }

    spawnFailureParticles(x, y) {
        const count = 15;

        for (let i = 0; i < count; i++) {
            const particle = this.particlePools.failure.acquire();
            if (particle) {
                Object.assign(particle, {
                    x, y,
                    vx: (Math.random() - 0.5) * 4,
                    vy: (Math.random() - 0.5) * 4 - 2, // Slight upward bias
                    life: 1.0,
                    maxLife: 800 + Math.random() * 400,
                    size: 2 + Math.random() * 3,
                    color: '#ff4444',
                    type: 'failure'
                });

                this.activeParticles.global.push(particle);
            }
        }
    }

    spawnDangerParticles(quadrant, intensity) {
        const quadrantInfo = this.quadrants[quadrant];
        const count = Math.floor(intensity * 50);

        for (let i = 0; i < count; i++) {
            const particle = this.particlePools.danger.acquire();
            if (particle) {
                Object.assign(particle, {
                    x: quadrantInfo.x + Math.random() * quadrantInfo.width,
                    y: quadrantInfo.y + Math.random() * quadrantInfo.height,
                    vx: (Math.random() - 0.5) * 1,
                    vy: (Math.random() - 0.5) * 1,
                    life: 1.0,
                    maxLife: 5000 + Math.random() * 2000,
                    size: 1 + Math.random() * 2,
                    color: '#ff0000',
                    intensity: intensity,
                    quadrant: quadrantInfo,
                    type: 'danger'
                });

                this.activeParticles[quadrant].push(particle);
            }
        }
    }

    spawnComboParticles(quadrant1, quadrant2, comboLevel) {
        const q1Info = this.quadrants[quadrant1];
        const q2Info = this.quadrants[quadrant2];
        const count = Math.min(comboLevel * 2, 20);

        for (let i = 0; i < count; i++) {
            const particle = this.particlePools.combo.acquire();
            if (particle) {
                const progress = i / count;
                Object.assign(particle, {
                    x: q1Info.x + q1Info.width/2 + (q2Info.x + q2Info.width/2 - q1Info.x - q1Info.width/2) * progress,
                    y: q1Info.y + q1Info.height/2 + (q2Info.y + q2Info.height/2 - q1Info.y - q1Info.height/2) * progress,
                    vx: 0,
                    vy: 0,
                    life: 1.0,
                    maxLife: 2000,
                    size: 2 + Math.random() * 2,
                    color: this.getComboColor(comboLevel),
                    comboLevel: comboLevel,
                    type: 'combo'
                });

                this.activeParticles.global.push(particle);
            }
        }
    }

    generateAmbientParticles() {
        // Generate particles based on current audio energy
        const totalEnergy = this.audioParams.bassEnergy + this.audioParams.midEnergy + this.audioParams.highEnergy;

        if (totalEnergy > 0.1 && Math.random() < totalEnergy * 0.1) {
            // Determine quadrant based on dominant frequency
            let dominantQuadrant = 0;
            if (this.audioParams.bassEnergy > this.audioParams.midEnergy && this.audioParams.bassEnergy > this.audioParams.highEnergy) {
                dominantQuadrant = 2; // Rhythm quadrant
            } else if (this.audioParams.highEnergy > this.audioParams.midEnergy) {
                dominantQuadrant = 1; // Harmony quadrant
            }

            const particle = this.particlePools.ambient.acquire();
            if (particle) {
                const quadrantInfo = this.quadrants[dominantQuadrant];

                Object.assign(particle, {
                    x: quadrantInfo.x + Math.random() * quadrantInfo.width,
                    y: quadrantInfo.y + Math.random() * quadrantInfo.height,
                    vx: (Math.random() - 0.5) * 2,
                    vy: (Math.random() - 0.5) * 2,
                    life: 1.0,
                    maxLife: 3000 + Math.random() * 2000,
                    size: 1 + Math.random() * 2,
                    color: this.getAudioColor(),
                    energy: totalEnergy,
                    type: 'ambient'
                });

                this.activeParticles[dominantQuadrant].push(particle);
            }
        }
    }

    // Particle Update Methods
    updateAllParticles(currentTime) {
        for (const quadrant in this.activeParticles) {
            this.updateParticlesInQuadrant(quadrant, currentTime);
        }
    }

    updateParticlesInQuadrant(quadrant, currentTime) {
        const particles = this.activeParticles[quadrant];

        for (let i = particles.length - 1; i >= 0; i--) {
            const particle = particles[i];
            this.updateParticle(particle, currentTime);

            if (particle.life <= 0) {
                // Return particle to pool and remove from active list
                this.particlePools[particle.type].release(particle);
                particles.splice(i, 1);
            }
        }
    }

    updateParticle(particle, currentTime) {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Update life
        particle.life -= this.frameInterval / particle.maxLife;

        // Apply audio-reactive forces
        this.applyAudioForces(particle);

        // Apply type-specific behaviors
        switch (particle.type) {
            case 'telegraph':
                this.updateTelegraphParticle(particle);
                break;
            case 'success':
                this.updateSuccessParticle(particle);
                break;
            case 'ambient':
                this.updateAmbientParticle(particle);
                break;
            case 'danger':
                this.updateDangerParticle(particle);
                break;
        }
    }

    applyAudioForces(particle) {
        // Apply beat-based impulses
        if (this.audioParams.beatStrength > 0.5) {
            const beatForce = this.audioParams.beatStrength * 0.5;
            particle.vx += (Math.random() - 0.5) * beatForce;
            particle.vy += (Math.random() - 0.5) * beatForce;
        }

        // Apply frequency-based attractions
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        const dx = centerX - particle.x;
        const dy = centerY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 0) {
            const force = this.audioParams.midEnergy * 0.001;
            particle.vx += (dx / distance) * force;
            particle.vy += (dy / distance) * force;
        }

        // Apply damping
        particle.vx *= 0.99;
        particle.vy *= 0.99;
    }

    updateTelegraphParticle(particle) {
        // Move toward quadrant center
        const centerX = particle.quadrant.x + particle.quadrant.width / 2;
        const centerY = particle.quadrant.y + particle.quadrant.height / 2;
        const dx = centerX - particle.x;
        const dy = centerY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 0) {
            const attraction = 0.02 * particle.intensity;
            particle.vx += (dx / distance) * attraction;
            particle.vy += (dy / distance) * attraction;
        }

        // Update size based on intensity
        particle.size = (2 + Math.random() * 3) * particle.intensity;
    }

    updateSuccessParticle(particle) {
        // Expand and fade
        particle.size += 0.1;
        particle.vy -= 0.05; // Float upward
    }

    updateAmbientParticle(particle) {
        // Gentle floating motion
        particle.x += Math.sin(Date.now() * 0.001 + particle.x * 0.01) * 0.5;
        particle.y += Math.cos(Date.now() * 0.001 + particle.y * 0.01) * 0.3;
    }

    updateDangerParticle(particle) {
        // Aggressive, chaotic movement
        particle.vx += (Math.random() - 0.5) * 0.2 * particle.intensity;
        particle.vy += (Math.random() - 0.5) * 0.2 * particle.intensity;

        // Clamp to quadrant
        particle.x = Math.max(particle.quadrant.x, Math.min(particle.quadrant.x + particle.quadrant.width, particle.x));
        particle.y = Math.max(particle.quadrant.y, Math.min(particle.quadrant.y + particle.quadrant.height, particle.y));
    }

    // Rendering Methods
    render() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Render quadrant boundaries if in telegraph mode
        this.renderQuadrantBoundaries();

        // Render all particles
        for (const quadrant in this.activeParticles) {
            this.renderParticlesInQuadrant(quadrant);
        }
    }

    renderQuadrantBoundaries() {
        for (let i = 0; i < 4; i++) {
            const state = this.telegraphState[i];
            if (state.active) {
                const quadrant = this.quadrants[i];
                this.ctx.strokeStyle = `rgba(255, 100, 100, ${state.intensity})`;
                this.ctx.lineWidth = 2 + state.intensity * 3;
                this.ctx.strokeRect(quadrant.x, quadrant.y, quadrant.width, quadrant.height);
            }
        }
    }

    renderParticlesInQuadrant(quadrant) {
        const particles = this.activeParticles[quadrant];

        for (const particle of particles) {
            this.renderParticle(particle);
        }
    }

    renderParticle(particle) {
        const alpha = Math.max(0, particle.life);

        this.ctx.save();
        this.ctx.globalAlpha = alpha;
        this.ctx.fillStyle = particle.color;
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.restore();
    }

    // Color Calculation Methods
    getTelegraphColor(intensity) {
        const red = Math.floor(255 * intensity);
        const yellow = Math.floor(100 * intensity);
        return `rgb(${red}, ${yellow}, 0)`;
    }

    getSuccessColor(energy) {
        const hue = 120 + energy * 60; // Green to cyan
        return `hsl(${hue}, 100%, 50%)`;
    }

    getComboColor(comboLevel) {
        const hue = (comboLevel * 30) % 360;
        return `hsl(${hue}, 100%, 60%)`;
    }

    getAudioColor() {
        const hue = (this.audioParams.spectralCentroid / 1024) * 360;
        const saturation = 50 + this.audioParams.midEnergy * 50;
        const lightness = 40 + this.audioParams.beatStrength * 40;
        return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    }

    cleanupDeadParticles() {
        // Cleanup happens in updateParticlesInQuadrant
    }

    // Public API
    onSuccessfulHit(x, y, energy) {
        this.spawnSuccessParticles(x, y, energy);
    }

    onFailedHit(x, y) {
        this.spawnFailureParticles(x, y);
    }

    onComboAchieved(quadrant1, quadrant2, comboLevel) {
        this.spawnComboParticles(quadrant1, quadrant2, comboLevel);
    }

    activateQuadrantDanger(quadrant, duration = 3000, intensity = 1.0) {
        this.activateTelegraph(quadrant, duration, intensity);
    }

    setPerformanceLevel(level) {
        // Adjust target FPS and particle limits based on performance
        if (level < 0.5) {
            this.targetFPS = 30;
            this.frameInterval = 1000 / this.targetFPS;
            // Reduce particle pool sizes
            for (const pool of Object.values(this.particlePools)) {
                pool.maxSize = Math.floor(pool.maxSize * 0.5);
            }
        }
    }
}

// Particle Pool for performance optimization
class ParticlePool {
    constructor(maxSize, type) {
        this.maxSize = maxSize;
        this.type = type;
        this.pool = [];
        this.activeCount = 0;

        // Pre-allocate particles
        for (let i = 0; i < maxSize; i++) {
            this.pool.push(this.createParticle());
        }
    }

    createParticle() {
        return {
            x: 0, y: 0, vx: 0, vy: 0,
            life: 0, maxLife: 0, size: 0,
            color: '#ffffff', type: this.type,
            active: false
        };
    }

    acquire() {
        if (this.activeCount < this.maxSize) {
            for (const particle of this.pool) {
                if (!particle.active) {
                    particle.active = true;
                    this.activeCount++;
                    return particle;
                }
            }
        }
        return null;
    }

    release(particle) {
        if (particle.active) {
            particle.active = false;
            this.activeCount--;
        }
    }
}