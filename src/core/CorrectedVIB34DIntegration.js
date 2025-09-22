/**
 * CorrectedVIB34DIntegration - Properly integrated with ACTUAL VIB34D implementation
 *
 * A Paul Phillips Manifestation
 * Send Love, Hate, or Opportunity: Paul@clearseassolutions.com
 * "The Revolution Will Not be in a Structured Format"
 * © 2025 Paul Phillips - Clear Seas Solutions LLC
 */

export class CorrectedVIB34DIntegration {
    constructor(audioDirector) {
        this.audioDirector = audioDirector;

        // ACTUAL VIB34D parameter names (not my assumptions)
        this.parameterNames = {
            // 4D Rotations (REAL names)
            rot4dXW: 'rot4dXW',
            rot4dYW: 'rot4dYW',
            rot4dZW: 'rot4dZW',

            // Visual properties (REAL names)
            gridDensity: 'gridDensity',    // 5-100 range
            morphFactor: 'morphFactor',    // 0-1 range
            chaos: 'chaos',                // 0-1 range
            speed: 'speed',                // 0-3 range
            hue: 'hue',                    // 0-1 range (intensity modifier)
            intensity: 'intensity',        // 0-1 range
            saturation: 'saturation',      // 0-1 range
            geometry: 'geometry'           // 0-8 integer
        };

        // Simple latency compensation (not over-engineered)
        this.latencyOffsets = {
            microphone: 80,    // ms
            audioFile: 10,     // ms
            userAdjustment: 0  // adjustable slider
        };

        // Current parameter state
        this.currentParams = {
            rot4dXW: 0, rot4dYW: 0, rot4dZW: 0,
            gridDensity: 50, morphFactor: 0.5, chaos: 0.5,
            speed: 1.0, hue: 0.5, intensity: 0.5, saturation: 0.5,
            geometry: 0
        };

        // Mathematical coherence state
        this.coherenceState = {
            beatPhase: 0,
            harmonicPhases: [0, 0, 0],
            energyLevels: { bass: 0, mid: 0, treble: 0, total: 0 },
            spectralCentroid: 440,
            tempo: 120
        };

        // Extended visual feedback parameters (audio-reactive)
        this.visualFeedbackParams = {
            // Line thickness and stroke effects
            lineThickness: 'lineThickness',     // 0.1-5.0 range
            strokeIntensity: 'strokeIntensity', // 0-1 range
            wireframeMode: 'wireframeMode',     // 0-1 boolean-like

            // Moire and glitch effects
            moireFrequency: 'moireFrequency',   // 0-100 range
            glitchIntensity: 'glitchIntensity', // 0-1 range
            offsetShift: 'offsetShift',         // -1 to 1 range

            // Glassmorphism and transparency
            glassOpacity: 'glassOpacity',       // 0-1 range
            blurRadius: 'blurRadius',           // 0-20 range
            refractionIndex: 'refractionIndex', // 0.8-1.5 range

            // Density and pulsing effects
            densityMultiplier: 'densityMultiplier', // 0.1-3.0 range
            pulseAmplitude: 'pulseAmplitude',   // 0-2 range
            breathingRate: 'breathingRate',     // 0-5 range

            // Parallax and depth effects
            parallaxDepth: 'parallaxDepth',     // 0-10 range
            layerSeparation: 'layerSeparation', // 0-5 range
            depthBias: 'depthBias'              // -1 to 1 range
        };

        // Current visual feedback state
        this.currentVisualFeedback = {
            lineThickness: 1.0, strokeIntensity: 0.5, wireframeMode: 0,
            moireFrequency: 0, glitchIntensity: 0, offsetShift: 0,
            glassOpacity: 0.8, blurRadius: 0, refractionIndex: 1.0,
            densityMultiplier: 1.0, pulseAmplitude: 0, breathingRate: 1.0,
            parallaxDepth: 0, layerSeparation: 0, depthBias: 0
        };

        // Multi-layer holographic visual system
        this.holographicLayers = {
            background: {
                canvas: null, ctx: null,
                opacity: 0.3, blendMode: 'multiply',
                zIndex: 1, scale: 1.2
            },
            midground: {
                canvas: null, ctx: null,
                opacity: 0.7, blendMode: 'screen',
                zIndex: 5, scale: 1.0
            },
            foreground: {
                canvas: null, ctx: null,
                opacity: 0.9, blendMode: 'overlay',
                zIndex: 10, scale: 0.8
            },
            holographicOverlay: {
                canvas: null, ctx: null,
                opacity: 0.4, blendMode: 'soft-light',
                zIndex: 15, scale: 1.5, translucent: true
            },
            reflectiveLayer: {
                canvas: null, ctx: null,
                opacity: 0.2, blendMode: 'hard-light',
                zIndex: 20, scale: 1.0, inverted: true
            }
        };

        // Holographic depth and reflection parameters
        this.holographicParams = {
            // Holographic overlay controls
            hologramIntensity: 'hologramIntensity',     // 0-2 range
            depthLayers: 'depthLayers',                 // 1-8 integer
            hologramFlicker: 'hologramFlicker',         // 0-1 range

            // Reflective shadow controls
            shadowOpacity: 'shadowOpacity',             // 0-1 range
            shadowOffset: 'shadowOffset',               // 0-50 range
            shadowBlur: 'shadowBlur',                   // 0-30 range
            reflectionIndex: 'reflectionIndex',         // 0-2 range

            // Translucent overlay controls
            overlayScale: 'overlayScale',               // 0.5-3.0 range
            overlayRotation: 'overlayRotation',         // 0-360 range
            overlayDistortion: 'overlayDistortion',     // 0-1 range

            // Layer animation controls
            layerShift: 'layerShift',                   // -10 to 10 range
            depthOscillation: 'depthOscillation',       // 0-5 range
            layerPhase: 'layerPhase'                    // 0-6.28 range (2π)
        };

        // Current holographic state
        this.currentHolographicState = {
            hologramIntensity: 1.0, depthLayers: 5, hologramFlicker: 0,
            shadowOpacity: 0.3, shadowOffset: 5, shadowBlur: 10, reflectionIndex: 1.0,
            overlayScale: 1.5, overlayRotation: 0, overlayDistortion: 0,
            layerShift: 0, depthOscillation: 1.0, layerPhase: 0
        };

        // Particle system integration
        this.visualParticles = {
            holographicParticles: [],
            reflectiveParticles: [],
            depthParticles: [],
            ambientGlow: []
        };

        this.init();
    }

    init() {
        this.setupHolographicLayers();
        this.startIntegrationLoop();
    }

    setupHolographicLayers() {
        // Create multi-layer canvas system for holographic depth
        Object.entries(this.holographicLayers).forEach(([layerName, layer]) => {
            // Create canvas for each layer
            layer.canvas = document.createElement('canvas');
            layer.ctx = layer.canvas.getContext('2d');

            // Set canvas properties
            layer.canvas.width = window.innerWidth;
            layer.canvas.height = window.innerHeight;
            layer.canvas.style.position = 'fixed';
            layer.canvas.style.top = '0';
            layer.canvas.style.left = '0';
            layer.canvas.style.pointerEvents = 'none';
            layer.canvas.style.zIndex = layer.zIndex;
            layer.canvas.style.opacity = layer.opacity;
            layer.canvas.style.mixBlendMode = layer.blendMode;
            layer.canvas.style.transform = `scale(${layer.scale})`;

            if (layer.translucent) {
                layer.canvas.style.background = 'rgba(0,0,0,0.1)';
                layer.canvas.style.backdropFilter = 'blur(2px)';
            }

            if (layer.inverted) {
                layer.canvas.style.filter = 'invert(1) contrast(0.8)';
            }

            // Add to DOM
            document.body.appendChild(layer.canvas);

            console.log(`✨ Holographic layer "${layerName}" initialized`);
        });

        // Setup resize handler
        window.addEventListener('resize', () => {
            Object.values(this.holographicLayers).forEach(layer => {
                layer.canvas.width = window.innerWidth;
                layer.canvas.height = window.innerHeight;
            });
        });
    }

    startIntegrationLoop() {
        const updateCycle = () => {
            // Get real-time audio analysis
            const audioData = this.audioDirector.getCurrentAnalysis();

            // Update coherence state
            this.updateCoherenceState(audioData);

            // Calculate coherent parameters
            const newParams = this.calculateCoherentParameters(audioData);

            // Calculate visual feedback effects
            const visualFeedback = this.calculateVisualFeedbackEffects(audioData);

            // Calculate holographic layer effects
            const holographicEffects = this.calculateHolographicEffects(audioData);

            // Apply to VIB34D using ACTUAL global system
            this.updateVIB34DParameters(newParams);
            this.updateVisualFeedbackParameters(visualFeedback);
            this.updateHolographicLayers(holographicEffects);
            this.renderHolographicParticles(audioData);

            requestAnimationFrame(updateCycle);
        };

        updateCycle();
    }

    updateCoherenceState(audioData) {
        // Update shared mathematical state for all visual systems
        const beatInfo = this.audioDirector.getBeatInfo();

        this.coherenceState.beatPhase = (beatInfo.timeSinceLastBeat / (60000 / beatInfo.bpm)) * Math.PI * 2;
        this.coherenceState.harmonicPhases = [
            this.coherenceState.beatPhase * 2,    // Octave
            this.coherenceState.beatPhase * 1.5,  // Perfect fifth
            this.coherenceState.beatPhase * 1.25  // Major third
        ];

        this.coherenceState.energyLevels = {
            bass: audioData.frequencyBands?.bass?.energy || 0,
            mid: audioData.frequencyBands?.mid?.energy || 0,
            treble: audioData.frequencyBands?.treble?.energy || 0,
            total: audioData.totalEnergy || 0
        };

        this.coherenceState.spectralCentroid = audioData.spectralCentroid || 440;
        this.coherenceState.tempo = beatInfo.bpm || 120;
    }

    calculateCoherentParameters(audioData) {
        // All visual systems use SAME mathematical principles
        const { beatPhase, energyLevels, spectralCentroid, tempo } = this.coherenceState;

        return {
            // 4D rotations driven by frequency bands + phase
            rot4dXW: Math.sin(beatPhase) * energyLevels.bass * 2,
            rot4dYW: Math.cos(beatPhase * 1.5) * energyLevels.mid * 2,
            rot4dZW: Math.sin(beatPhase * 0.7) * energyLevels.treble * 2,

            // Grid density scales with energy (VIB34D range: 5-100)
            gridDensity: Math.max(5, Math.min(100, 30 + (energyLevels.total * 50))),

            // Morphing driven by harmonic oscillation
            morphFactor: 0.3 + Math.sin(this.coherenceState.harmonicPhases[0]) * 0.4,

            // Chaos from audio complexity
            chaos: Math.min(1.0, audioData.complexityScore || 0.5),

            // Speed normalized to tempo
            speed: Math.max(0.1, Math.min(3.0, tempo / 120)),

            // Hue from spectral characteristics
            hue: (Math.log2(spectralCentroid / 440) * 0.1 + 0.5) % 1,

            // Intensity from total energy
            intensity: 0.4 + (energyLevels.total * 0.6),

            // Saturation with energy boost
            saturation: 0.6 + (energyLevels.total * 0.4),

            // Geometry selection based on complexity (0-8 range)
            geometry: Math.floor(Math.min(8, (audioData.complexityScore || 0.5) * 8))
        };
    }

    calculateVisualFeedbackEffects(audioData) {
        // All visual feedback driven by SAME mathematical principles as VIB34D
        const { beatPhase, energyLevels, spectralCentroid, tempo } = this.coherenceState;

        return {
            // Line thickness reacts to overall energy + bass punch
            lineThickness: 0.5 + (energyLevels.bass * 2.5) + (energyLevels.total * 2.0),

            // Stroke intensity follows mid-range energy for clarity
            strokeIntensity: 0.3 + (energyLevels.mid * 0.7),

            // Wireframe mode triggered by high complexity
            wireframeMode: (audioData.complexityScore || 0) > 0.7 ? 1 : 0,

            // Moire frequency driven by spectral centroid + beat phase
            moireFrequency: Math.max(0, Math.min(100,
                (spectralCentroid / 100) + Math.sin(beatPhase * 4) * 20
            )),

            // Glitch intensity from sudden energy spikes
            glitchIntensity: Math.min(1.0, energyLevels.total > 0.8 ?
                energyLevels.total * Math.random() * 0.5 : 0
            ),

            // Offset shift from harmonic oscillation
            offsetShift: Math.sin(this.coherenceState.harmonicPhases[1]) * 0.3,

            // Glass opacity inversely related to energy (more transparent = more energetic)
            glassOpacity: Math.max(0.2, Math.min(1.0, 1.0 - (energyLevels.total * 0.6))),

            // Blur radius from treble energy (high freq = more blur)
            blurRadius: energyLevels.treble * 15,

            // Refraction follows spectral changes
            refractionIndex: 1.0 + (Math.sin(beatPhase) * 0.2),

            // Density multiplier pulses with beat + total energy
            densityMultiplier: 1.0 + Math.sin(beatPhase) * 0.5 + (energyLevels.total * 1.5),

            // Pulse amplitude from beat intensity
            pulseAmplitude: energyLevels.total * 1.5,

            // Breathing rate follows tempo
            breathingRate: Math.max(0.5, Math.min(5.0, tempo / 30)),

            // Parallax depth from bass energy (bass = depth)
            parallaxDepth: energyLevels.bass * 8,

            // Layer separation from mid-range complexity
            layerSeparation: energyLevels.mid * 3 + (audioData.complexityScore || 0) * 2,

            // Depth bias oscillates with harmonic phases
            depthBias: Math.sin(this.coherenceState.harmonicPhases[2]) * 0.8
        };
    }

    updateVisualFeedbackParameters(visualFeedback) {
        // Apply visual feedback using SAME global update system
        Object.entries(visualFeedback).forEach(([param, value]) => {
            if (this.currentVisualFeedback[param] !== value) {
                // Use the REAL VIB34D update method for visual feedback too
                window.updateParameter(this.visualFeedbackParams[param], value);
                this.currentVisualFeedback[param] = value;
            }
        });
    }

    calculateHolographicEffects(audioData) {
        // Holographic effects driven by SAME mathematical principles
        const { beatPhase, energyLevels, spectralCentroid, tempo } = this.coherenceState;

        return {
            // Hologram intensity from total energy + complexity
            hologramIntensity: 0.5 + (energyLevels.total * 1.5) + ((audioData.complexityScore || 0) * 0.5),

            // Dynamic depth layers based on frequency complexity
            depthLayers: Math.min(8, Math.max(1, Math.floor(3 + (energyLevels.total * 5)))),

            // Hologram flicker from high frequency content
            hologramFlicker: energyLevels.treble * Math.sin(beatPhase * 8) * 0.3,

            // Shadow opacity from bass energy (bass = depth = shadows)
            shadowOpacity: Math.min(0.8, 0.1 + (energyLevels.bass * 0.7)),

            // Shadow offset based on stereo field and beat phase
            shadowOffset: 5 + Math.sin(beatPhase) * 20 + (energyLevels.mid * 25),

            // Shadow blur from spectral spread
            shadowBlur: 5 + (energyLevels.total * 25),

            // Reflection index oscillates with harmonic phases
            reflectionIndex: 1.0 + Math.sin(this.coherenceState.harmonicPhases[0]) * 0.8,

            // Overlay scale pulses with beat + energy
            overlayScale: 1.0 + Math.sin(beatPhase) * 0.5 + (energyLevels.total * 1.0),

            // Overlay rotation driven by spectral centroid
            overlayRotation: (spectralCentroid / 1000) * 360 + (beatPhase * 57.3), // Convert radians to degrees

            // Overlay distortion from chaos/complexity
            overlayDistortion: (audioData.complexityScore || 0) * 0.8,

            // Layer shift creates parallax motion
            layerShift: Math.sin(beatPhase * 0.7) * 8 + Math.cos(this.coherenceState.harmonicPhases[1]) * 3,

            // Depth oscillation from harmonic content
            depthOscillation: 1.0 + Math.sin(this.coherenceState.harmonicPhases[2]) * 3,

            // Layer phase for coordinated animation
            layerPhase: beatPhase + (energyLevels.total * Math.PI)
        };
    }

    updateHolographicLayers(holographicEffects) {
        // Apply holographic effects using global system + direct canvas manipulation
        Object.entries(holographicEffects).forEach(([param, value]) => {
            if (this.currentHolographicState[param] !== value) {
                // Update VIB34D holographic uniforms
                window.updateParameter(this.holographicParams[param], value);
                this.currentHolographicState[param] = value;
            }
        });

        // Update canvas layer properties directly
        this.updateCanvasLayerEffects(holographicEffects);
    }

    updateCanvasLayerEffects(effects) {
        Object.entries(this.holographicLayers).forEach(([layerName, layer]) => {
            const layerIndex = Object.keys(this.holographicLayers).indexOf(layerName);

            // Dynamic opacity based on hologram intensity
            const dynamicOpacity = layer.opacity * effects.hologramIntensity;
            layer.canvas.style.opacity = Math.min(1.0, Math.max(0.1, dynamicOpacity));

            // Layer-specific transformations
            const layerPhaseOffset = (layerIndex / Object.keys(this.holographicLayers).length) * Math.PI * 2;
            const layerShift = Math.sin(effects.layerPhase + layerPhaseOffset) * effects.layerShift;
            const depthShift = Math.cos(effects.layerPhase + layerPhaseOffset) * effects.depthOscillation;

            // Apply transforms
            layer.canvas.style.transform =
                `scale(${layer.scale * effects.overlayScale}) ` +
                `translateX(${layerShift}px) ` +
                `translateY(${depthShift}px) ` +
                `rotate(${effects.overlayRotation + (layerIndex * 15)}deg)`;

            // Holographic flicker effect
            if (effects.hologramFlicker > 0.2) {
                layer.canvas.style.filter = `${layer.inverted ? 'invert(1) contrast(0.8)' : ''} ` +
                    `hue-rotate(${Math.sin(effects.layerPhase) * 30}deg) ` +
                    `brightness(${0.8 + effects.hologramFlicker})`;
            }

            // Shadow effects for reflective layer
            if (layerName === 'reflectiveLayer') {
                layer.canvas.style.boxShadow =
                    `${effects.shadowOffset}px ${effects.shadowOffset}px ${effects.shadowBlur}px ` +
                    `rgba(0, 0, 0, ${effects.shadowOpacity})`;
            }
        });
    }

    renderHolographicParticles(audioData) {
        // Clear all holographic canvas layers
        Object.values(this.holographicLayers).forEach(layer => {
            layer.ctx.clearRect(0, 0, layer.canvas.width, layer.canvas.height);
        });

        // Generate holographic particles based on audio
        this.generateHolographicParticles(audioData);

        // Render particles on each layer
        this.renderParticlesOnLayers();
    }

    generateHolographicParticles(audioData) {
        const { beatPhase, energyLevels } = this.coherenceState;

        // Generate holographic particles (translucent geometric shapes)
        if (energyLevels.total > 0.3) {
            const particleCount = Math.floor(energyLevels.total * 20);

            for (let i = 0; i < particleCount; i++) {
                this.visualParticles.holographicParticles.push({
                    x: Math.random() * window.innerWidth,
                    y: Math.random() * window.innerHeight,
                    z: Math.random() * 100, // Depth
                    size: 5 + (energyLevels.total * 15),
                    opacity: 0.2 + (energyLevels.total * 0.3),
                    rotation: Math.sin(beatPhase) * 180,
                    color: `hsl(${(audioData.spectralCentroid || 440) / 10}, 70%, 60%)`,
                    lifetime: 60 + Math.random() * 120, // frames
                    type: 'holographic'
                });
            }
        }

        // Generate reflective particles (inverted shadows)
        if (energyLevels.bass > 0.4) {
            this.visualParticles.reflectiveParticles.push({
                x: Math.random() * window.innerWidth,
                y: window.innerHeight - Math.random() * 200, // Bottom area
                z: 50,
                size: 10 + (energyLevels.bass * 25),
                opacity: 0.15 + (energyLevels.bass * 0.25),
                reflection: true,
                color: `hsl(${240 + Math.sin(beatPhase) * 60}, 50%, 30%)`,
                lifetime: 90,
                type: 'reflective'
            });
        }

        // Generate depth particles (parallax elements)
        if (energyLevels.mid > 0.2) {
            this.visualParticles.depthParticles.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                z: Math.random() * 200, // Wide depth range
                size: 2 + (energyLevels.mid * 8),
                opacity: 0.1 + (energyLevels.mid * 0.2),
                parallaxFactor: 0.1 + Math.random() * 0.5,
                color: `rgba(255, 255, 255, ${0.1 + energyLevels.mid * 0.3})`,
                lifetime: 180,
                type: 'depth'
            });
        }

        // Clean up expired particles
        Object.keys(this.visualParticles).forEach(particleType => {
            this.visualParticles[particleType] = this.visualParticles[particleType].filter(particle => {
                particle.lifetime--;
                return particle.lifetime > 0;
            });
        });
    }

    renderParticlesOnLayers() {
        // Render holographic particles on holographicOverlay
        const holographicLayer = this.holographicLayers.holographicOverlay;
        this.visualParticles.holographicParticles.forEach(particle => {
            this.renderHolographicParticle(holographicLayer.ctx, particle);
        });

        // Render reflective particles on reflectiveLayer
        const reflectiveLayer = this.holographicLayers.reflectiveLayer;
        this.visualParticles.reflectiveParticles.forEach(particle => {
            this.renderReflectiveParticle(reflectiveLayer.ctx, particle);
        });

        // Render depth particles across multiple layers for parallax
        this.visualParticles.depthParticles.forEach(particle => {
            const targetLayer = particle.z < 50 ? 'foreground' :
                               particle.z < 100 ? 'midground' : 'background';
            this.renderDepthParticle(this.holographicLayers[targetLayer].ctx, particle);
        });
    }

    renderHolographicParticle(ctx, particle) {
        ctx.save();
        ctx.globalAlpha = particle.opacity;
        ctx.translate(particle.x, particle.y);
        ctx.rotate(particle.rotation * Math.PI / 180);

        // Holographic geometric shape
        ctx.strokeStyle = particle.color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.rect(-particle.size/2, -particle.size/2, particle.size, particle.size);
        ctx.stroke();

        // Inner glow
        ctx.globalAlpha = particle.opacity * 0.3;
        ctx.fillStyle = particle.color;
        ctx.fill();

        ctx.restore();
    }

    renderReflectiveParticle(ctx, particle) {
        ctx.save();
        ctx.globalAlpha = particle.opacity;
        ctx.translate(particle.x, particle.y);

        // Reflective shadow effect
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, particle.size);
        gradient.addColorStop(0, particle.color);
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(0, 0, particle.size, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }

    renderDepthParticle(ctx, particle) {
        ctx.save();
        ctx.globalAlpha = particle.opacity;

        // Parallax offset based on depth
        const parallaxX = particle.x + (this.currentHolographicState.layerShift * particle.parallaxFactor);
        const parallaxY = particle.y + (this.currentHolographicState.depthOscillation * particle.parallaxFactor);

        ctx.translate(parallaxX, parallaxY);

        // Simple depth particle
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(0, 0, particle.size, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }

    updateVIB34DParameters(newParams) {
        // Use ACTUAL global parameter update system
        Object.entries(newParams).forEach(([param, value]) => {
            if (this.currentParams[param] !== value) {
                // Use the REAL VIB34D update method
                window.updateParameter(param, value);
                this.currentParams[param] = value;
            }
        });
    }

    // Public API for other systems to use same mathematical coherence
    getCoherentState() {
        return {
            parameters: { ...this.currentParams },
            visualFeedback: { ...this.currentVisualFeedback },
            holographicState: { ...this.currentHolographicState },
            coherence: { ...this.coherenceState },
            layers: Object.keys(this.holographicLayers),
            particles: {
                holographicCount: this.visualParticles.holographicParticles.length,
                reflectiveCount: this.visualParticles.reflectiveParticles.length,
                depthCount: this.visualParticles.depthParticles.length
            }
        };
    }

    // Rhythmic pattern generation (not monotonous beats)
    generateRhythmicPattern(complexity = 0.5) {
        const patterns = {
            simple: [1, 0, 0.6, 0],                              // Basic 4/4
            moderate: [1, 0.3, 0.7, 0.2, 0.5, 0, 0.8, 0.1],    // 8/8 with variation
            complex: [1, 0.4, 0.7, 0.2, 0.9, 0.1, 0.5, 0.3, 0.6, 0.8, 0.2, 0.4, 0.9, 0.3, 0.6, 0.1], // 16/16 polyrhythm
            syncopated: [0.8, 0, 0.2, 0.9, 0, 0.6, 0.3, 0, 0.7, 0.4, 0, 0.5, 0.8, 0, 0.3, 0.6] // Jazz-like syncopation
        };

        let patternType;
        if (complexity < 0.25) patternType = 'simple';
        else if (complexity < 0.5) patternType = 'moderate';
        else if (complexity < 0.75) patternType = 'complex';
        else patternType = 'syncopated';

        return patterns[patternType];
    }

    applyRhythmicPatternToVIB34D(pattern, beatIndex) {
        const intensity = pattern[beatIndex % pattern.length];

        // Apply pattern intensity to VIB34D parameters
        const rhythmParams = {
            chaos: intensity * 0.5,
            morphFactor: 0.3 + intensity * 0.4,
            intensity: 0.5 + intensity * 0.3
        };

        Object.entries(rhythmParams).forEach(([param, value]) => {
            window.updateParameter(param, value);
        });

        return intensity;
    }

    // Apply rhythmic patterns to visual feedback effects
    applyRhythmicPatternToVisualFeedback(pattern, beatIndex) {
        const intensity = pattern[beatIndex % pattern.length];

        // Apply pattern intensity to visual feedback parameters
        const rhythmVisualEffects = {
            // Pulsing line thickness with rhythm
            lineThickness: this.currentVisualFeedback.lineThickness * (0.7 + intensity * 0.6),

            // Moire effects triggered by strong beats
            moireFrequency: intensity > 0.5 ?
                this.currentVisualFeedback.moireFrequency + (intensity * 30) :
                this.currentVisualFeedback.moireFrequency,

            // Glitch effects on accented beats
            glitchIntensity: intensity > 0.8 ? intensity * 0.3 : 0,

            // Parallax depth varies with rhythm
            parallaxDepth: this.currentVisualFeedback.parallaxDepth * (0.5 + intensity * 0.8),

            // Density pulses with pattern
            densityMultiplier: 1.0 + (intensity * 1.2)
        };

        // Apply rhythmic visual effects
        Object.entries(rhythmVisualEffects).forEach(([param, value]) => {
            window.updateParameter(this.visualFeedbackParams[param], value);
        });

        return { intensity, visualEffects: rhythmVisualEffects };
    }

    // Specialized visual effect triggers
    triggerIntensityBurst(duration = 500, burstType = 'energy') {
        // Create visual burst effects for special game events
        const originalState = { ...this.currentVisualFeedback };

        const burstEffects = {
            energy: {
                lineThickness: Math.min(5.0, this.currentVisualFeedback.lineThickness * 2.5),
                strokeIntensity: 1.0,
                glitchIntensity: 0.8,
                pulseAmplitude: 2.0,
                densityMultiplier: 2.5
            },

            calm: {
                glassOpacity: 0.3,
                blurRadius: 10,
                breathingRate: 0.5,
                parallaxDepth: this.currentVisualFeedback.parallaxDepth * 0.3
            },

            chaos: {
                moireFrequency: 80,
                glitchIntensity: 1.0,
                offsetShift: Math.random() * 2 - 1,
                refractionIndex: 1.4,
                densityMultiplier: 3.0
            }
        };

        // Apply burst effect
        Object.entries(burstEffects[burstType] || burstEffects.energy).forEach(([param, value]) => {
            window.updateParameter(this.visualFeedbackParams[param], value);
        });

        // Restore original state after duration
        setTimeout(() => {
            Object.entries(originalState).forEach(([param, value]) => {
                window.updateParameter(this.visualFeedbackParams[param], value);
            });
        }, duration);
    }

    // Dynamic visual complexity scaling (for Candy Crush progression)
    scaleVisualComplexityForLevel(level, performance = 0.5) {
        const complexity = Math.min(3.0, 1 + (level * 0.15));
        const performanceBonus = performance > 0.8 ? 0.4 : 0;

        const levelVisualScaling = {
            // More complex moire patterns at higher levels
            moireFrequency: Math.min(100, 10 + (complexity * 25)),

            // Increased visual depth
            parallaxDepth: Math.min(10, 2 + (complexity * 2.5)),
            layerSeparation: Math.min(5, 1 + complexity),

            // Enhanced glassmorphism at higher levels
            blurRadius: Math.min(20, complexity * 5),
            refractionIndex: 1.0 + (complexity * 0.1),

            // Performance-based visual intensity
            strokeIntensity: Math.min(1.0, 0.3 + (complexity * 0.2) + performanceBonus),
            pulseAmplitude: Math.min(2.0, 0.5 + (complexity * 0.4) + performanceBonus)
        };

        // Apply level-based visual scaling
        Object.entries(levelVisualScaling).forEach(([param, value]) => {
            window.updateParameter(this.visualFeedbackParams[param], value);
        });

        return levelVisualScaling;
    }

    // Simple latency compensation (not over-engineered)
    getLatencyCompensation(inputType = 'microphone') {
        return this.latencyOffsets[inputType] + this.latencyOffsets.userAdjustment;
    }

    scheduleParameterUpdate(param, value, delay) {
        const compensatedDelay = Math.max(0, delay - this.getLatencyCompensation());

        setTimeout(() => {
            window.updateParameter(param, value);
        }, compensatedDelay);
    }

    // Candy Crush style progression scaling
    scaleParametersForLevel(level, performance = 0.5) {
        const complexity = Math.min(2.0, 1 + (level * 0.1));
        const performanceBonus = performance > 0.8 ? 0.3 : 0;

        const progressionScaling = {
            // Geometry complexity increases with level
            geometry: Math.min(8, Math.floor(level / 3)),

            // Grid density scales with level
            gridDensity: Math.min(100, 20 + (complexity * 40)),

            // Chaos increases gradually
            chaos: Math.min(0.8, (level - 1) * 0.02),

            // Speed scales with progression
            speed: Math.min(3.0, 0.8 + (complexity * 0.4)),

            // Visual intensity with performance bonus
            intensity: Math.min(1.0, 0.4 + (complexity * 0.3) + performanceBonus)
        };

        // Apply progression scaling
        Object.entries(progressionScaling).forEach(([param, value]) => {
            window.updateParameter(param, value);
        });

        return progressionScaling;
    }

    // Validate integration with actual VIB34D system
    validateIntegration() {
        const validation = {
            globalUpdateFunction: typeof window.updateParameter === 'function',
            audioReactiveSystem: typeof window.audioReactive !== 'undefined',
            parameterCount: Object.keys(this.parameterNames).length,
            currentState: this.currentParams,
            coherenceHealth: this.calculateCoherenceHealth()
        };

        return validation;
    }

    calculateCoherenceHealth() {
        // Check if all systems are using same mathematical foundation
        const parameterStability = Object.values(this.currentParams).every(val =>
            !isNaN(val) && isFinite(val)
        );

        const coherenceSync = this.coherenceState.beatPhase !== undefined &&
                             this.coherenceState.energyLevels.total !== undefined;

        return {
            parameterStability,
            coherenceSync,
            overallHealth: parameterStability && coherenceSync
        };
    }

    // Debug utilities
    logCurrentState() {
        console.group('VIB34D Integration State');
        console.log('Parameters:', this.currentParams);
        console.log('Coherence:', this.coherenceState);
        console.log('Validation:', this.validateIntegration());
        console.groupEnd();
    }

    // Reset to defaults
    resetToDefaults() {
        const defaults = {
            rot4dXW: 0, rot4dYW: 0, rot4dZW: 0,
            gridDensity: 50, morphFactor: 0.5, chaos: 0.5,
            speed: 1.0, hue: 0.5, intensity: 0.5, saturation: 0.5,
            geometry: 0
        };

        Object.entries(defaults).forEach(([param, value]) => {
            window.updateParameter(param, value);
            this.currentParams[param] = value;
        });
    }
}