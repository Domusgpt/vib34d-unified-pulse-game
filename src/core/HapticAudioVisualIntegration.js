/**
 * HapticAudioVisualIntegration - Complete sensory feedback system integrating haptics, audio, and visuals
 *
 * A Paul Phillips Manifestation
 * Send Love, Hate, or Opportunity: Paul@clearseassolutions.com
 * "The Revolution Will Not be in a Structured Format"
 * © 2025 Paul Phillips - Clear Seas Solutions LLC
 */

export class HapticAudioVisualIntegration {
    constructor(audioDirector, particleSystem, telegraphSystem, visualizerEngine) {
        this.audioDirector = audioDirector;
        this.particleSystem = particleSystem;
        this.telegraphSystem = telegraphSystem;
        this.visualizerEngine = visualizerEngine;

        // Haptic capability detection
        this.hapticSupported = 'vibrate' in navigator;
        this.webVibrationAPI = navigator.vibrate;

        // Audio-visual synchronization
        this.syncBuffer = [];
        this.latencyCompensation = 20; // ms compensation for audio-visual latency

        // Haptic pattern library
        this.hapticPatterns = {
            beat: [50],
            success: [30, 50, 80],
            perfect: [20, 30, 20, 30, 100],
            failure: [200],
            warning: [100, 50, 100],
            danger: [50, 50, 50, 50, 200],
            combo: [25, 25, 25, 25, 150],
            quadrantChange: [80, 40, 80]
        };

        // Visual response configurations
        this.visualResponses = {
            beat: {
                intensity: 0.8,
                duration: 200,
                particleCount: 10,
                visualizerBoost: 0.3
            },
            success: {
                intensity: 1.0,
                duration: 500,
                particleCount: 30,
                visualizerBoost: 0.5
            },
            perfect: {
                intensity: 1.5,
                duration: 800,
                particleCount: 50,
                visualizerBoost: 0.8
            },
            failure: {
                intensity: 0.6,
                duration: 300,
                particleCount: 15,
                visualizerBoost: -0.2
            },
            combo: {
                intensity: 1.2,
                duration: 600,
                particleCount: 40,
                visualizerBoost: 0.6
            }
        };

        // Frequency-to-feedback mappings
        this.frequencyMappings = {
            bass: { hapticIntensity: 1.0, visualHue: 0, quadrant: 2 },
            lowMid: { hapticIntensity: 0.8, visualHue: 60, quadrant: 0 },
            mid: { hapticIntensity: 0.6, visualHue: 120, quadrant: 1 },
            highMid: { hapticIntensity: 0.4, visualHue: 180, quadrant: 3 },
            high: { hapticIntensity: 0.3, visualHue: 240, quadrant: 1 }
        };

        // State tracking
        this.currentState = {
            energy: 0,
            beat: false,
            combo: 0,
            lastHapticTime: 0,
            activeFeedback: new Set()
        };

        this.init();
    }

    init() {
        this.setupAudioListeners();
        this.startFeedbackLoop();

        if (this.hapticSupported) {
            console.log('Haptic feedback enabled');
        } else {
            console.log('Haptic feedback not supported on this device');
        }
    }

    setupAudioListeners() {
        // Listen to audio director events
        this.audioDirector.onBeatDetected = (beatInfo) => {
            this.onBeatDetected(beatInfo);
        };

        this.audioDirector.onEnergyChange = (energyInfo) => {
            this.onEnergyChange(energyInfo);
        };

        this.audioDirector.onFrequencyAnalysis = (frequencyData) => {
            this.onFrequencyAnalysis(frequencyData);
        };
    }

    startFeedbackLoop() {
        const processFeedback = () => {
            this.processScheduledFeedback();
            this.updateContinuousFeedback();
            requestAnimationFrame(processFeedback);
        };

        requestAnimationFrame(processFeedback);
    }

    // Audio Event Handlers
    onBeatDetected(beatInfo) {
        const now = Date.now();

        // Prevent haptic spam
        if (now - this.currentState.lastHapticTime > 100) {
            this.triggerBeatFeedback(beatInfo);
            this.currentState.lastHapticTime = now;
        }

        this.currentState.beat = true;
        setTimeout(() => { this.currentState.beat = false; }, 100);
    }

    onEnergyChange(energyInfo) {
        this.currentState.energy = energyInfo.level;
        this.updateVisualizerFromEnergy(energyInfo);
    }

    onFrequencyAnalysis(frequencyData) {
        this.updateFrequencyBasedFeedback(frequencyData);
    }

    // Feedback Triggering Methods
    triggerBeatFeedback(beatInfo) {
        const intensity = Math.min(1.0, beatInfo.strength);

        // Haptic feedback
        this.triggerHaptic('beat', intensity);

        // Visual feedback
        this.triggerVisualBeatResponse(beatInfo);

        // Visualizer response
        this.boostVisualizer('beat', intensity);
    }

    triggerSuccessFeedback(x, y, hitType, energy = 1.0) {
        const feedbackType = this.getSuccessFeedbackType(hitType);

        // Haptic feedback
        this.triggerHaptic(feedbackType, energy);

        // Particle explosion
        this.particleSystem.onSuccessfulHit(x, y, energy);

        // Telegraph confirmation
        this.telegraphSystem.telegraphBeatTiming(x, y, energy);

        // Visualizer boost
        this.boostVisualizer(feedbackType, energy);

        // Audio feedback (if available)
        this.triggerAudioFeedback(feedbackType, energy);
    }

    triggerFailureFeedback(x, y, reason = 'miss') {
        // Strong haptic for failure
        this.triggerHaptic('failure', 1.0);

        // Failure particles
        this.particleSystem.onFailedHit(x, y);

        // Visual indication of failure reason
        this.telegraphSystem.telegraphInteractionGuide(x, y, reason);

        // Visualizer dampening
        this.dampVisualizer('failure');
    }

    triggerComboFeedback(comboLevel, quadrant1, quadrant2) {
        this.currentState.combo = comboLevel;

        // Escalating haptic pattern
        const comboHaptic = this.generateComboHapticPattern(comboLevel);
        this.triggerCustomHaptic(comboHaptic);

        // Cross-quadrant particles
        this.particleSystem.onComboAchieved(quadrant1, quadrant2, comboLevel);

        // Visualizer enhancement
        this.boostVisualizer('combo', Math.min(2.0, comboLevel / 10));
    }

    triggerDangerWarning(quadrant, timeUntilDanger) {
        // Telegraph danger zone
        this.telegraphSystem.telegraphQuadrantDanger(quadrant, timeUntilDanger);

        // Warning haptic pattern
        this.scheduleHaptic('warning', Date.now() + timeUntilDanger - 1000); // 1 second before

        // Danger particles
        this.particleSystem.activateQuadrantDanger(quadrant, timeUntilDanger);
    }

    triggerGeometrySpawnWarning(x, y, geometryType, interactionType, timeUntilSpawn) {
        // Telegraph geometry appearance
        const telegraphId = this.telegraphSystem.telegraphGeometrySpawn(
            x, y, geometryType, interactionType, timeUntilSpawn
        );

        // Schedule interaction guide
        this.scheduleInteractionGuide(x, y, interactionType, timeUntilSpawn - 500);

        return telegraphId;
    }

    // Haptic Methods
    triggerHaptic(patternName, intensity = 1.0) {
        if (!this.hapticSupported) return;

        const pattern = this.hapticPatterns[patternName];
        if (pattern) {
            const scaledPattern = pattern.map(duration => Math.floor(duration * intensity));
            navigator.vibrate(scaledPattern);
        }
    }

    triggerCustomHaptic(pattern) {
        if (!this.hapticSupported) return;
        navigator.vibrate(pattern);
    }

    generateComboHapticPattern(comboLevel) {
        // Generate escalating pattern based on combo level
        const basePattern = [30, 20];
        const pattern = [];

        const pulses = Math.min(comboLevel, 10);
        for (let i = 0; i < pulses; i++) {
            pattern.push(...basePattern);
        }

        // Final celebration pulse
        pattern.push(150);

        return pattern;
    }

    scheduleHaptic(patternName, triggerTime) {
        this.syncBuffer.push({
            type: 'haptic',
            pattern: patternName,
            triggerTime: triggerTime
        });
    }

    // Visual Integration Methods
    triggerVisualBeatResponse(beatInfo) {
        const config = this.visualResponses.beat;

        // Trigger beat-synchronized particles across all quadrants
        for (let quadrant = 0; quadrant < 4; quadrant++) {
            const quadrantCenter = this.getQuadrantCenter(quadrant);
            this.particleSystem.spawnAmbientParticles(
                quadrantCenter.x,
                quadrantCenter.y,
                config.particleCount * beatInfo.strength
            );
        }
    }

    boostVisualizer(eventType, intensity) {
        const config = this.visualResponses[eventType];
        if (!config) return;

        const boost = {
            intensity: config.visualizerBoost * intensity,
            duration: config.duration,
            timestamp: Date.now()
        };

        this.visualizerEngine.applyTemporaryBoost(boost);
    }

    dampVisualizer(eventType) {
        const config = this.visualResponses[eventType];
        if (!config) return;

        const dampening = {
            intensity: config.visualizerBoost, // Negative value
            duration: config.duration,
            timestamp: Date.now()
        };

        this.visualizerEngine.applyTemporaryBoost(dampening);
    }

    updateVisualizerFromEnergy(energyInfo) {
        // Map energy levels to visualizer parameters
        const visualParams = {
            chaos: Math.min(1.0, energyInfo.level * 1.5),
            speed: 0.5 + (energyInfo.level * 0.5),
            intensity: 0.3 + (energyInfo.level * 0.7)
        };

        this.visualizerEngine.updateParameters(visualParams);
    }

    updateFrequencyBasedFeedback(frequencyData) {
        // Analyze dominant frequency bands
        const dominantBand = this.getDominantFrequencyBand(frequencyData);
        const mapping = this.frequencyMappings[dominantBand];

        if (mapping) {
            // Update quadrant emphasis
            this.emphasizeQuadrant(mapping.quadrant, mapping.visualHue);

            // Subtle haptic for frequency changes
            if (Date.now() - this.currentState.lastHapticTime > 500) {
                const subtleHaptic = [Math.floor(50 * mapping.hapticIntensity)];
                this.triggerCustomHaptic(subtleHaptic);
            }
        }
    }

    emphasizeQuadrant(quadrant, hue) {
        // Update particle system to emphasize specific quadrant
        const quadrantCenter = this.getQuadrantCenter(quadrant);
        this.particleSystem.spawnAmbientParticles(
            quadrantCenter.x,
            quadrantCenter.y,
            5, // particle count
            { hue: hue, emphasis: true }
        );
    }

    // Audio Feedback Methods
    triggerAudioFeedback(feedbackType, intensity) {
        // Generate synthetic audio feedback if needed
        // This would integrate with a Web Audio API synthesizer

        const audioParams = {
            type: feedbackType,
            frequency: this.getFrequencyForFeedback(feedbackType),
            duration: this.getDurationForFeedback(feedbackType),
            intensity: intensity
        };

        // Send to audio synthesis system
        this.synthesizeFeedbackSound(audioParams);
    }

    synthesizeFeedbackSound(params) {
        // Simple Web Audio API feedback synthesis
        if (!this.audioDirector.audioContext) return;

        const oscillator = this.audioDirector.audioContext.createOscillator();
        const gainNode = this.audioDirector.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioDirector.audioContext.destination);

        oscillator.frequency.setValueAtTime(params.frequency, this.audioDirector.audioContext.currentTime);
        gainNode.gain.setValueAtTime(0, this.audioDirector.audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(params.intensity * 0.3, this.audioDirector.audioContext.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioDirector.audioContext.currentTime + params.duration);

        oscillator.start(this.audioDirector.audioContext.currentTime);
        oscillator.stop(this.audioDirector.audioContext.currentTime + params.duration);
    }

    // Scheduled Feedback Processing
    processScheduledFeedback() {
        const now = Date.now();

        for (let i = this.syncBuffer.length - 1; i >= 0; i--) {
            const event = this.syncBuffer[i];

            if (now >= event.triggerTime) {
                this.executeScheduledEvent(event);
                this.syncBuffer.splice(i, 1);
            }
        }
    }

    executeScheduledEvent(event) {
        switch (event.type) {
            case 'haptic':
                this.triggerHaptic(event.pattern, event.intensity || 1.0);
                break;
            case 'visual':
                this.executeVisualEvent(event);
                break;
            case 'audio':
                this.triggerAudioFeedback(event.feedbackType, event.intensity);
                break;
        }
    }

    scheduleInteractionGuide(x, y, interactionType, delay) {
        this.syncBuffer.push({
            type: 'visual',
            subtype: 'interaction_guide',
            x, y, interactionType,
            triggerTime: Date.now() + delay
        });
    }

    executeVisualEvent(event) {
        switch (event.subtype) {
            case 'interaction_guide':
                this.telegraphSystem.telegraphInteractionGuide(
                    event.x, event.y, event.interactionType
                );
                break;
        }
    }

    updateContinuousFeedback() {
        // Continuous feedback based on current game state
        this.updateComboVisualization();
        this.updateEnergyVisualization();
    }

    updateComboVisualization() {
        if (this.currentState.combo > 5) {
            // Maintain subtle combo feedback
            const comboIntensity = Math.min(1.0, this.currentState.combo / 20);
            // Apply continuous visual effects for high combos
        }
    }

    updateEnergyVisualization() {
        // Continuous energy-based feedback
        const energyLevel = this.currentState.energy;

        if (energyLevel > 0.8) {
            // High energy state - enhance all feedback
            this.visualizerEngine.setEnergyMultiplier(1.2);
        } else if (energyLevel < 0.2) {
            // Low energy state - subtle feedback
            this.visualizerEngine.setEnergyMultiplier(0.8);
        }
    }

    // Utility Methods
    getSuccessFeedbackType(hitType) {
        switch (hitType) {
            case 'perfect': return 'perfect';
            case 'great': return 'success';
            case 'good': return 'success';
            default: return 'success';
        }
    }

    getDominantFrequencyBand(frequencyData) {
        // Analyze frequency data to determine dominant band
        const bands = {
            bass: this.calculateBandEnergy(frequencyData, 0, 64),
            lowMid: this.calculateBandEnergy(frequencyData, 64, 256),
            mid: this.calculateBandEnergy(frequencyData, 256, 512),
            highMid: this.calculateBandEnergy(frequencyData, 512, 1024),
            high: this.calculateBandEnergy(frequencyData, 1024, 2048)
        };

        let maxEnergy = 0;
        let dominantBand = 'mid';

        for (const [band, energy] of Object.entries(bands)) {
            if (energy > maxEnergy) {
                maxEnergy = energy;
                dominantBand = band;
            }
        }

        return dominantBand;
    }

    calculateBandEnergy(frequencyData, startBin, endBin) {
        let energy = 0;
        for (let i = startBin; i < endBin && i < frequencyData.length; i++) {
            energy += Math.pow(10, frequencyData[i] / 20);
        }
        return energy / (endBin - startBin);
    }

    getQuadrantCenter(quadrant) {
        const centers = {
            0: { x: this.canvas.width * 0.25, y: this.canvas.height * 0.25 },
            1: { x: this.canvas.width * 0.75, y: this.canvas.height * 0.25 },
            2: { x: this.canvas.width * 0.25, y: this.canvas.height * 0.75 },
            3: { x: this.canvas.width * 0.75, y: this.canvas.height * 0.75 }
        };
        return centers[quadrant] || centers[0];
    }

    getFrequencyForFeedback(feedbackType) {
        const frequencies = {
            beat: 220,      // A3
            success: 440,   // A4
            perfect: 880,   // A5
            failure: 110,   // A2
            combo: 660      // E5
        };
        return frequencies[feedbackType] || 440;
    }

    getDurationForFeedback(feedbackType) {
        const durations = {
            beat: 0.1,
            success: 0.2,
            perfect: 0.3,
            failure: 0.15,
            combo: 0.25
        };
        return durations[feedbackType] || 0.2;
    }

    // Public API
    onPlayerHit(x, y, hitType, energy) {
        this.triggerSuccessFeedback(x, y, hitType, energy);
    }

    onPlayerMiss(x, y, reason) {
        this.triggerFailureFeedback(x, y, reason);
    }

    onComboAchieved(level, quadrant1, quadrant2) {
        this.triggerComboFeedback(level, quadrant1, quadrant2);
    }

    onDangerZoneWarning(quadrant, timeUntilActive) {
        this.triggerDangerWarning(quadrant, timeUntilActive);
    }

    onGeometrySpawning(x, y, geometry, interaction, timeUntilSpawn) {
        return this.triggerGeometrySpawnWarning(x, y, geometry, interaction, timeUntilSpawn);
    }

    setHapticEnabled(enabled) {
        this.hapticSupported = enabled && ('vibrate' in navigator);
    }

    setLatencyCompensation(ms) {
        this.latencyCompensation = Math.max(0, Math.min(100, ms));
    }
}