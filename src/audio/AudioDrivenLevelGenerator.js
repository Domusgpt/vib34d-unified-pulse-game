/**
 * AudioDrivenLevelGenerator - Procedural roguelike level generation based entirely on audio analysis
 *
 * A Paul Phillips Manifestation
 * Send Love, Hate, or Opportunity: Paul@clearseassolutions.com
 * "The Revolution Will Not be in a Structured Format"
 * © 2025 Paul Phillips - Clear Seas Solutions LLC
 */

export class AudioDrivenLevelGenerator {
    constructor(audioDirector, gameState) {
        this.audioDirector = audioDirector;
        this.gameState = gameState;

        // Audio analysis buffers
        this.frequencyData = new Float32Array(2048);
        this.timeData = new Float32Array(2048);

        // Level generation state
        this.currentSegment = null;
        this.segmentQueue = [];
        this.analysisHistory = [];
        this.difficultyScale = 1.0;

        // Audio-to-geometry mappings
        this.frequencyRanges = {
            bass: { min: 0, max: 250, geometry: 'hypersphere', interaction: 'pulse' },
            lowMid: { min: 250, max: 500, geometry: 'tesseract', interaction: 'tap' },
            mid: { min: 500, max: 2000, geometry: '24cell', interaction: 'hold' },
            highMid: { min: 2000, max: 4000, geometry: '600cell', interaction: 'swipe' },
            treble: { min: 4000, max: 8000, geometry: '120cell', interaction: 'avoid' }
        };

        // Quadrant assignment based on stereo/spatial analysis
        this.quadrantMapping = {
            bass: 3,        // Bottom-left (rhythm section)
            lowMid: 1,      // Top-left (melody lead)
            mid: 2,         // Top-right (harmony)
            highMid: 4,     // Bottom-right (effects)
            treble: 0       // Center/all (special events)
        };

        // Roguelike progression
        this.runStats = {
            segmentsCompleted: 0,
            totalBeats: 0,
            perfectHits: 0,
            comboMax: 0,
            adaptivesDifficulty: 1.0
        };

        this.init();
    }

    init() {
        // Start real-time audio analysis
        this.startAudioAnalysis();

        // Initialize first segment
        this.generateNextSegment();
    }

    startAudioAnalysis() {
        const analyzeAudio = () => {
            // Get real-time frequency and time domain data
            this.audioDirector.getFrequencyData(this.frequencyData);
            this.audioDirector.getTimeData(this.timeData);

            // Analyze current audio frame
            const analysis = this.analyzeAudioFrame();

            // Store analysis history for pattern recognition
            this.analysisHistory.push(analysis);
            if (this.analysisHistory.length > 100) {
                this.analysisHistory.shift();
            }

            // Generate level events based on audio
            this.generateEventsFromAudio(analysis);

            requestAnimationFrame(analyzeAudio);
        };

        analyzeAudio();
    }

    analyzeAudioFrame() {
        const analysis = {
            timestamp: Date.now(),
            energy: this.calculateTotalEnergy(),
            frequencies: this.analyzeFrequencyBands(),
            rhythm: this.detectRhythmicPatterns(),
            dynamics: this.analyzeDynamics(),
            spatialInfo: this.analyzeSpatialCharacteristics()
        };

        return analysis;
    }

    calculateTotalEnergy() {
        let total = 0;
        for (let i = 0; i < this.frequencyData.length; i++) {
            total += this.frequencyData[i] * this.frequencyData[i];
        }
        return Math.sqrt(total / this.frequencyData.length);
    }

    analyzeFrequencyBands() {
        const bands = {};
        const nyquist = this.audioDirector.sampleRate / 2;
        const binSize = nyquist / this.frequencyData.length;

        for (const [bandName, range] of Object.entries(this.frequencyRanges)) {
            const startBin = Math.floor(range.min / binSize);
            const endBin = Math.floor(range.max / binSize);

            let energy = 0;
            let peak = 0;
            for (let i = startBin; i < endBin && i < this.frequencyData.length; i++) {
                energy += this.frequencyData[i];
                peak = Math.max(peak, this.frequencyData[i]);
            }

            bands[bandName] = {
                energy: energy / (endBin - startBin),
                peak: peak,
                dominance: this.calculateBandDominance(bandName, energy)
            };
        }

        return bands;
    }

    detectRhythmicPatterns() {
        // Onset detection for rhythm analysis
        const onsets = this.detectOnsets();
        const tempo = this.audioDirector.getCurrentBPM();

        return {
            onsets: onsets,
            tempo: tempo,
            rhythmComplexity: this.calculateRhythmComplexity(onsets),
            syncopation: this.detectSyncopation(onsets, tempo)
        };
    }

    analyzeDynamics() {
        const currentEnergy = this.calculateTotalEnergy();
        const recentHistory = this.analysisHistory.slice(-10);

        let trend = 'stable';
        if (recentHistory.length > 5) {
            const oldAvg = recentHistory.slice(0, 5).reduce((sum, a) => sum + a.energy, 0) / 5;
            const newAvg = recentHistory.slice(-5).reduce((sum, a) => sum + a.energy, 0) / 5;

            if (newAvg > oldAvg * 1.2) trend = 'building';
            else if (newAvg < oldAvg * 0.8) trend = 'dropping';
        }

        return {
            currentLevel: currentEnergy,
            trend: trend,
            volatility: this.calculateVolatility(recentHistory)
        };
    }

    analyzeSpatialCharacteristics() {
        // For stereo/spatial audio analysis
        // This would be expanded with actual stereo analysis
        return {
            stereoSpread: this.calculateStereoSpread(),
            dominantSide: this.getDominantStereoSide(),
            spatialMovement: this.detectSpatialMovement()
        };
    }

    generateEventsFromAudio(analysis) {
        const events = [];

        // Generate events for each frequency band
        for (const [bandName, bandData] of Object.entries(analysis.frequencies)) {
            if (bandData.energy > this.getThresholdForBand(bandName)) {
                const event = this.createEventFromBand(bandName, bandData, analysis);
                if (event) events.push(event);
            }
        }

        // Generate special events based on overall dynamics
        const specialEvents = this.generateSpecialEvents(analysis);
        events.push(...specialEvents);

        // Apply roguelike difficulty scaling
        this.scaleDifficultyBasedOnPerformance(events);

        // Queue events for spawning
        this.queueEvents(events);
    }

    createEventFromBand(bandName, bandData, analysis) {
        const range = this.frequencyRanges[bandName];
        const quadrant = this.quadrantMapping[bandName];

        // Calculate spawn timing based on tempo and band characteristics
        const spawnDelay = this.calculateSpawnDelay(bandName, analysis.rhythm);

        // Determine interaction difficulty based on band energy and run progression
        const difficulty = this.calculateEventDifficulty(bandData, this.runStats.adaptivesDifficulty);

        const event = {
            type: 'geometry_spawn',
            geometry: range.geometry,
            interaction: range.interaction,
            quadrant: quadrant,
            energy: bandData.energy,
            peak: bandData.peak,
            spawnTime: Date.now() + spawnDelay,
            difficulty: difficulty,
            audioSource: {
                band: bandName,
                frequency: (range.min + range.max) / 2,
                dominance: bandData.dominance
            },
            visualParams: this.generateVisualParams(bandData, analysis),
            telegraphDuration: this.calculateTelegraphDuration(difficulty)
        };

        return event;
    }

    generateSpecialEvents(analysis) {
        const specialEvents = [];

        // Beat-synchronized major events
        if (analysis.rhythm.onsets.length > 0) {
            for (const onset of analysis.rhythm.onsets) {
                if (onset.strength > 0.8) {
                    specialEvents.push({
                        type: 'beat_event',
                        strength: onset.strength,
                        quadrant: this.selectQuadrantForBeat(analysis),
                        spawnTime: onset.time,
                        effect: 'particle_burst'
                    });
                }
            }
        }

        // Dynamic events based on energy trends
        if (analysis.dynamics.trend === 'building' && analysis.dynamics.currentLevel > 0.7) {
            specialEvents.push({
                type: 'intensity_buildup',
                quadrant: 'all',
                spawnTime: Date.now() + 1000,
                effect: 'quadrant_danger_mode'
            });
        }

        // Silence/breakdown events
        if (analysis.dynamics.currentLevel < 0.1) {
            specialEvents.push({
                type: 'silence_event',
                quadrant: 'all',
                spawnTime: Date.now() + 500,
                effect: 'calm_particles'
            });
        }

        return specialEvents;
    }

    scaleDifficultyBasedOnPerformance(events) {
        // Adaptive difficulty based on player performance
        const recentPerformance = this.calculateRecentPerformance();

        if (recentPerformance > 0.8) {
            // Player doing well, increase difficulty
            this.runStats.adaptivesDifficulty = Math.min(3.0, this.runStats.adaptivesDifficulty * 1.05);
        } else if (recentPerformance < 0.5) {
            // Player struggling, ease up
            this.runStats.adaptivesDifficulty = Math.max(0.5, this.runStats.adaptivesDifficulty * 0.95);
        }

        // Apply scaling to events
        events.forEach(event => {
            if (event.difficulty) {
                event.difficulty *= this.runStats.adaptivesDifficulty;
            }
        });
    }

    generateVisualParams(bandData, analysis) {
        // Convert audio characteristics to visual parameters
        return {
            hue: this.frequencyToHue(bandData),
            intensity: Math.min(1.0, bandData.energy * 2),
            saturation: Math.min(1.0, bandData.peak),
            chaos: analysis.dynamics.volatility,
            speed: analysis.rhythm.tempo / 120, // Normalized to 120 BPM
            morphFactor: bandData.dominance,
            particleCount: Math.floor(bandData.energy * 100),
            particleSpeed: analysis.dynamics.currentLevel
        };
    }

    queueEvents(events) {
        // Add events to spawn queue with proper timing
        events.forEach(event => {
            this.segmentQueue.push(event);
        });

        // Sort queue by spawn time
        this.segmentQueue.sort((a, b) => a.spawnTime - b.spawnTime);
    }

    // Utility methods for audio analysis
    detectOnsets() {
        // Simplified onset detection - would use more sophisticated algorithm
        const onsets = [];
        const threshold = 0.3;

        for (let i = 1; i < this.timeData.length; i++) {
            const diff = Math.abs(this.timeData[i] - this.timeData[i-1]);
            if (diff > threshold) {
                onsets.push({
                    time: Date.now() + (i * 1000 / this.audioDirector.sampleRate),
                    strength: diff
                });
            }
        }

        return onsets;
    }

    calculateBandDominance(bandName, energy) {
        const totalEnergy = Object.values(this.frequencyRanges).reduce((sum, range) => {
            // Would calculate actual energy for each range
            return sum + energy; // Simplified
        }, 0);

        return energy / (totalEnergy || 1);
    }

    getThresholdForBand(bandName) {
        // Dynamic thresholds based on band and difficulty
        const baseThresholds = {
            bass: 0.1,
            lowMid: 0.15,
            mid: 0.2,
            highMid: 0.25,
            treble: 0.3
        };

        return baseThresholds[bandName] * this.runStats.adaptivesDifficulty;
    }

    calculateSpawnDelay(bandName, rhythmData) {
        // Synchronize spawn timing with detected tempo
        const beatInterval = 60000 / rhythmData.tempo; // ms per beat

        // Different bands spawn at different beat subdivisions
        const subdivisions = {
            bass: 1,        // On beat
            lowMid: 0.5,    // Eighth notes
            mid: 0.25,      // Sixteenth notes
            highMid: 0.75,  // Dotted eighths
            treble: 2       // Half notes
        };

        return beatInterval * (subdivisions[bandName] || 1);
    }

    frequencyToHue(bandData) {
        // Map frequency ranges to hue spectrum
        const hueMap = {
            bass: 0,        // Red
            lowMid: 60,     // Yellow
            mid: 120,       // Green
            highMid: 240,   // Blue
            treble: 300     // Purple
        };

        // Add some variation based on energy
        const variation = (bandData.energy - 0.5) * 30;
        return (hueMap[bandData.band] + variation) % 360;
    }

    calculateRecentPerformance() {
        // Calculate performance over recent gameplay
        const recentHits = this.gameState.getRecentHits(10);
        if (recentHits.length === 0) return 0.5;

        const successRate = recentHits.filter(hit => hit.success).length / recentHits.length;
        return successRate;
    }

    // Public interface for game system
    getNextEvent() {
        const now = Date.now();
        if (this.segmentQueue.length > 0 && this.segmentQueue[0].spawnTime <= now) {
            return this.segmentQueue.shift();
        }
        return null;
    }

    updateRunStats(stats) {
        Object.assign(this.runStats, stats);
    }

    generateNextSegment() {
        // Called when moving to next section/level
        this.runStats.segmentsCompleted++;

        // Analyze overall audio characteristics for this segment
        const segmentAnalysis = this.analyzeSegmentCharacteristics();

        // Generate segment-wide parameters
        this.currentSegment = {
            id: this.runStats.segmentsCompleted,
            duration: this.calculateSegmentDuration(segmentAnalysis),
            theme: this.determineSegmentTheme(segmentAnalysis),
            difficulty: this.runStats.adaptivesDifficulty,
            specialRules: this.generateSpecialRules(segmentAnalysis)
        };

        return this.currentSegment;
    }
}