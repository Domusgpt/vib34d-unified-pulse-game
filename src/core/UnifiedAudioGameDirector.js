/**
 * UnifiedAudioGameDirector - Merges AudioGameplayDirector with GameState for complete audio-driven gameplay
 *
 * A Paul Phillips Manifestation
 * Send Love, Hate, or Opportunity: Paul@clearseassolutions.com
 * "The Revolution Will Not be in a Structured Format"
 * © 2025 Paul Phillips - Clear Seas Solutions LLC
 */

export class UnifiedAudioGameDirector {
    constructor(audioContext) {
        this.gameEngine = null; // Will be set later if needed
        this.audioContext = audioContext;

        // Audio analysis components (from Branch #1)
        // this.audioContext already set above
        this.analyser = null;
        this.microphone = null;
        this.audioSource = null;

        // Game state components (from Branch #4)
        this.gameState = null;
        this.levelGenerator = null;

        // Audio processing buffers
        this.frequencyData = new Float32Array(2048);
        this.timeData = new Float32Array(2048);
        this.energyHistory = [];
        this.beatHistory = [];

        // Real-time audio analysis
        this.currentBPM = 120;
        this.lastBeatTime = 0;
        this.energyThreshold = 0.3;
        this.beatConfidence = 0;

        // Audio modes
        this.inputMode = 'microphone'; // microphone, track, synthetic
        this.isActive = false;

        // Roguelike progression driven by audio
        this.runState = {
            currentRun: 0,
            totalTime: 0,
            audioComplexity: 1.0,
            performanceMultiplier: 1.0,
            unlockLevel: 1
        };

        this.init();
    }

    async init() {
        await this.initializeAudioContext();
        await this.setupMicrophoneInput();
        this.initializeGameState();
        this.initializeLevelGenerator();
        this.startAudioProcessing();

        // Start with demo mode if no microphone
        if (this.inputMode === 'synthetic') {
            this.startDemoMode();
        }
    }

    async initializeAudioContext() {
        try {
            if (!this.audioContext) {
                this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            }
            this.analyser = this.audioContext.createAnalyser();
            this.analyser.fftSize = 4096;
            this.analyser.smoothingTimeConstant = 0.8;

            console.log('Audio context initialized');
        } catch (error) {
            console.error('Failed to initialize audio context:', error);
            this.inputMode = 'synthetic';
        }
    }

    async setupMicrophoneInput() {
        if (this.inputMode !== 'microphone') return;

        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    echoCancellation: false,
                    noiseSuppression: false,
                    autoGainControl: false
                }
            });

            this.microphone = this.audioContext.createMediaStreamSource(stream);
            this.microphone.connect(this.analyser);

            console.log('Microphone input established');
        } catch (error) {
            console.warn('Microphone access denied, switching to synthetic mode:', error);
            this.inputMode = 'synthetic';
        }
    }

    initializeGameState() {
        // Enhanced game state that integrates with audio
        this.gameState = {
            // Audio-driven state
            currentAudioSegment: null,
            audioComplexityLevel: 1,
            detectedGenre: 'unknown',
            dominantFrequencies: [],

            // Traditional game state (from Branch #4)
            score: 0,
            combo: 0,
            maxCombo: 0,
            health: 100,
            shield: 0,
            level: 1,
            stage: 1,

            // Roguelike state
            currentRun: this.runState.currentRun,
            runStartTime: Date.now(),
            eventsSpawned: 0,
            eventsCompleted: 0,
            perfectHits: 0,
            goodHits: 0,
            misses: 0,

            // Performance tracking
            recentPerformance: [],
            difficultyModifier: 1.0,

            // Audio responsiveness
            lastAudioEvent: null,
            audioReactivity: 1.0
        };
    }

    initializeLevelGenerator() {
        // Level generator will be initialized later when needed
        this.levelGenerator = null;
    }

    startAudioProcessing() {
        const processAudio = () => {
            if (this.inputMode === 'synthetic') {
                // Generate new synthetic data each frame
                this.generateSyntheticAudioData();
            } else if (this.isActive && this.analyser) {
                // Get real-time audio data
                this.analyser.getFloatFrequencyData(this.frequencyData);
                this.analyser.getFloatTimeDomainData(this.timeData);
            }

            // Perform comprehensive audio analysis
            const audioAnalysis = this.performCompleteAudioAnalysis();

            // Update game state based on audio
            this.updateGameStateFromAudio(audioAnalysis);

            // Generate/update level content
            this.updateLevelContent(audioAnalysis);

            // Process any queued audio events
            this.processAudioEvents();

            requestAnimationFrame(processAudio);
        };

        this.isActive = true;
        processAudio();
    }

    performCompleteAudioAnalysis() {
        const analysis = {
            timestamp: Date.now(),

            // Energy analysis
            totalEnergy: this.calculateTotalEnergy(),
            frequencyBands: this.analyzeFrequencyBands(),

            // Rhythm analysis
            beat: this.detectBeat(),
            tempo: this.calculateTempo(),
            rhythmComplexity: this.analyzeRhythmComplexity(),

            // Musical analysis
            pitch: this.detectPitch(),
            harmony: this.analyzeHarmony(),
            dynamics: this.analyzeDynamics(),

            // Spatial analysis (for quadrant mapping)
            spatialCharacteristics: this.analyzeSpatialAudio(),

            // Genre/style detection
            musicalStyle: this.detectMusicalStyle(),

            // Roguelike difficulty scaling
            complexityScore: this.calculateAudioComplexity()
        };

        return analysis;
    }

    calculateTotalEnergy() {
        let total = 0;
        for (let i = 0; i < this.frequencyData.length; i++) {
            const value = Math.pow(10, this.frequencyData[i] / 20); // Convert from dB
            total += value;
        }
        return total / this.frequencyData.length;
    }

    analyzeFrequencyBands() {
        const bands = {
            subBass: { min: 0, max: 60, energy: 0, peak: 0 },
            bass: { min: 60, max: 250, energy: 0, peak: 0 },
            lowMid: { min: 250, max: 500, energy: 0, peak: 0 },
            mid: { min: 500, max: 2000, energy: 0, peak: 0 },
            highMid: { min: 2000, max: 4000, energy: 0, peak: 0 },
            presence: { min: 4000, max: 6000, energy: 0, peak: 0 },
            brilliance: { min: 6000, max: 20000, energy: 0, peak: 0 }
        };

        const nyquist = this.audioContext.sampleRate / 2;
        const binSize = nyquist / this.frequencyData.length;

        for (const [bandName, band] of Object.entries(bands)) {
            const startBin = Math.floor(band.min / binSize);
            const endBin = Math.floor(band.max / binSize);

            let energy = 0;
            let peak = -Infinity;

            for (let i = startBin; i < endBin && i < this.frequencyData.length; i++) {
                const value = this.frequencyData[i];
                energy += Math.pow(10, value / 20);
                peak = Math.max(peak, value);
            }

            band.energy = energy / (endBin - startBin);
            band.peak = peak;
        }

        return bands;
    }

    detectBeat() {
        const currentEnergy = this.calculateTotalEnergy();
        const now = Date.now();

        // Add to energy history
        this.energyHistory.push({ time: now, energy: currentEnergy });
        if (this.energyHistory.length > 50) {
            this.energyHistory.shift();
        }

        // Simple beat detection based on energy peaks
        let isBeat = false;
        let beatStrength = 0;

        if (this.energyHistory.length > 10) {
            const recentAvg = this.energyHistory.slice(-10).reduce((sum, e) => sum + e.energy, 0) / 10;
            const threshold = recentAvg * 1.5;

            if (currentEnergy > threshold && (now - this.lastBeatTime) > 300) {
                isBeat = true;
                beatStrength = (currentEnergy - threshold) / threshold;
                this.lastBeatTime = now;

                this.beatHistory.push(now);
                if (this.beatHistory.length > 20) {
                    this.beatHistory.shift();
                }
            }
        }

        return {
            detected: isBeat,
            strength: beatStrength,
            confidence: this.beatConfidence,
            timeSinceLastBeat: now - this.lastBeatTime
        };
    }

    calculateTempo() {
        if (this.beatHistory.length < 4) return this.currentBPM;

        const intervals = [];
        for (let i = 1; i < this.beatHistory.length; i++) {
            intervals.push(this.beatHistory[i] - this.beatHistory[i-1]);
        }

        const avgInterval = intervals.reduce((sum, interval) => sum + interval, 0) / intervals.length;
        const newBPM = 60000 / avgInterval;

        // Smooth BPM changes
        this.currentBPM = this.currentBPM * 0.8 + newBPM * 0.2;

        return Math.max(60, Math.min(200, this.currentBPM));
    }

    analyzeRhythmComplexity() {
        if (this.beatHistory.length < 4) return 0.5;

        const intervals = [];
        for (let i = 1; i < this.beatHistory.length; i++) {
            intervals.push(this.beatHistory[i] - this.beatHistory[i-1]);
        }

        // Calculate variance in beat intervals
        const avgInterval = intervals.reduce((sum, interval) => sum + interval, 0) / intervals.length;
        const variance = intervals.reduce((sum, interval) => sum + Math.pow(interval - avgInterval, 2), 0) / intervals.length;

        return Math.min(1.0, variance / 10000); // Normalize to 0-1
    }

    detectPitch() {
        // Simplified pitch detection using autocorrelation
        const autocorrelation = this.autocorrelate(this.timeData);
        const fundamentalFreq = this.audioContext.sampleRate / autocorrelation;

        return {
            frequency: fundamentalFreq,
            confidence: Math.min(1.0, 1000 / fundamentalFreq), // Higher confidence for lower pitches
            note: this.frequencyToNote(fundamentalFreq)
        };
    }

    autocorrelate(buffer) {
        let bestOffset = 0;
        let bestCorrelation = 0;
        let correlations = [];

        for (let offset = 0; offset < buffer.length / 2; offset++) {
            let correlation = 0;
            for (let i = 0; i < buffer.length - offset; i++) {
                correlation += buffer[i] * buffer[i + offset];
            }
            correlations[offset] = correlation;

            if (correlation > bestCorrelation) {
                bestCorrelation = correlation;
                bestOffset = offset;
            }
        }

        return bestOffset;
    }

    calculateAudioComplexity() {
        const bands = this.analyzeFrequencyBands();
        const rhythm = this.analyzeRhythmComplexity();

        // Calculate spectral complexity
        const activeBands = Object.values(bands).filter(band => band.energy > 0.1).length;
        const spectralComplexity = activeBands / 7; // Normalize by total bands

        // Calculate dynamic complexity
        const energyVariance = this.calculateEnergyVariance();
        const dynamicComplexity = Math.min(1.0, energyVariance / 0.1);

        // Combine factors
        const complexity = (spectralComplexity + rhythm + dynamicComplexity) / 3;

        return Math.max(0.1, Math.min(2.0, complexity));
    }

    updateGameStateFromAudio(audioAnalysis) {
        // Update audio-driven game state
        this.gameState.currentAudioSegment = audioAnalysis;
        this.gameState.audioComplexityLevel = audioAnalysis.complexityScore;
        this.gameState.detectedGenre = audioAnalysis.musicalStyle;
        this.gameState.dominantFrequencies = this.getDominantFrequencies(audioAnalysis.frequencyBands);

        // Update difficulty based on audio complexity and player performance
        const performanceModifier = this.calculatePerformanceModifier();
        this.gameState.difficultyModifier = audioAnalysis.complexityScore * performanceModifier;

        // Update roguelike progression
        this.updateRoguelikeProgression(audioAnalysis);
    }

    updateLevelContent(audioAnalysis) {
        // Let the level generator create events based on this audio frame
        this.levelGenerator.generateEventsFromAudio(audioAnalysis);

        // Update visualizer parameters based on audio
        this.updateVisualizerFromAudio(audioAnalysis);
    }

    updateVisualizerFromAudio(audioAnalysis) {
        const visualParams = {
            // Map frequency bands to visual parameters
            hue: this.mapFrequencyToHue(audioAnalysis.frequencyBands),
            intensity: Math.min(1.0, audioAnalysis.totalEnergy * 2),
            chaos: audioAnalysis.rhythmComplexity,
            speed: audioAnalysis.tempo / 120,

            // 4D rotation based on audio characteristics
            rotXW: audioAnalysis.frequencyBands.bass.energy,
            rotYW: audioAnalysis.frequencyBands.mid.energy,
            rotZW: audioAnalysis.frequencyBands.brilliance.energy,

            // Morphing based on harmonic content
            morphFactor: audioAnalysis.harmony?.complexity || 0.5,

            // Grid density based on spectral complexity
            gridDensity: audioAnalysis.complexityScore
        };

        // Send to game engine for visualizer update
        this.gameEngine.updateVisualizerParameters(visualParams);
    }

    processAudioEvents() {
        // Process events generated by the level generator
        const event = this.levelGenerator.getNextEvent();
        if (event) {
            this.gameEngine.spawnGameEvent(event);
            this.gameState.eventsSpawned++;
        }
    }

    // Public interface for game components
    getCurrentBPM() {
        return this.currentBPM;
    }

    getFrequencyData(buffer) {
        if (buffer && this.frequencyData) {
            buffer.set(this.frequencyData);
        }
        return this.frequencyData;
    }

    getTimeData(buffer) {
        if (buffer && this.timeData) {
            buffer.set(this.timeData);
        }
        return this.timeData;
    }

    getCurrentAnalysis() {
        // Return current audio analysis data in the expected format
        const frequencyBands = this.analyzeFrequencyBands();
        const beat = this.detectBeat();
        const pitch = this.detectPitch();
        const totalEnergy = this.calculateTotalEnergy();

        return {
            frequencyBands: {
                bass: { energy: frequencyBands.bass.energy },
                mid: { energy: frequencyBands.mid.energy },
                treble: { energy: frequencyBands.presence.energy + frequencyBands.brilliance.energy }
            },
            totalEnergy: totalEnergy,
            complexityScore: this.calculateAudioComplexity(),
            spectralCentroid: this.calculateSpectralCentroid(),
            spectralBandwidth: this.calculateSpectralBandwidth(),
            pitch: pitch,
            beat: beat,
            rhythmComplexity: this.analyzeRhythmComplexity()
        };
    }

    getBeatInfo() {
        return {
            bpm: this.currentBPM,
            lastBeatTime: this.lastBeatTime,
            timeSinceLastBeat: Date.now() - this.lastBeatTime,
            beatHistory: [...this.beatHistory]
        };
    }

    calculateSpectralCentroid() {
        let numerator = 0;
        let denominator = 0;

        for (let i = 0; i < this.frequencyData.length; i++) {
            const magnitude = Math.pow(10, this.frequencyData[i] / 20);
            const frequency = i * (this.audioContext.sampleRate / 2) / this.frequencyData.length;
            numerator += frequency * magnitude;
            denominator += magnitude;
        }

        return denominator > 0 ? numerator / denominator : 440;
    }

    calculateSpectralBandwidth() {
        const centroid = this.calculateSpectralCentroid();
        let numerator = 0;
        let denominator = 0;

        for (let i = 0; i < this.frequencyData.length; i++) {
            const magnitude = Math.pow(10, this.frequencyData[i] / 20);
            const frequency = i * (this.audioContext.sampleRate / 2) / this.frequencyData.length;
            numerator += Math.pow(frequency - centroid, 2) * magnitude;
            denominator += magnitude;
        }

        return denominator > 0 ? Math.sqrt(numerator / denominator) : 100;
    }

    calculateEnergyVariance() {
        if (this.energyHistory.length < 10) return 0.1;

        const energies = this.energyHistory.slice(-10).map(e => e.energy);
        const mean = energies.reduce((sum, e) => sum + e, 0) / energies.length;
        const variance = energies.reduce((sum, e) => sum + Math.pow(e - mean, 2), 0) / energies.length;

        return variance;
    }

    startDemoMode() {
        // Generate synthetic audio data for demo
        this.inputMode = 'synthetic';
        this.isActive = true;

        // Populate frequency data with synthetic values
        this.generateSyntheticAudioData();

        console.log('Demo mode started');
    }

    generateSyntheticAudioData() {
        // Generate realistic-looking frequency data
        const time = Date.now() / 1000;

        for (let i = 0; i < this.frequencyData.length; i++) {
            // Create synthetic frequency spectrum
            const frequency = i * (22050 / this.frequencyData.length);
            const bassComponent = Math.sin(time * 2) * Math.exp(-frequency / 200) * -20;
            const midComponent = Math.sin(time * 3) * Math.exp(-Math.abs(frequency - 1000) / 500) * -30;
            const trebleComponent = Math.sin(time * 5) * Math.exp(-Math.abs(frequency - 4000) / 1000) * -40;

            this.frequencyData[i] = bassComponent + midComponent + trebleComponent - 60;
        }

        // Generate synthetic time domain data
        for (let i = 0; i < this.timeData.length; i++) {
            this.timeData[i] = Math.sin(time * 440 * 2 * Math.PI / 44100 * i) * 0.1 +
                              Math.sin(time * 220 * 2 * Math.PI / 44100 * i) * 0.05;
        }
    }

    getGameState() {
        return { ...this.gameState };
    }

    updateScore(points, hitType) {
        this.gameState.score += points;

        if (hitType === 'perfect') {
            this.gameState.perfectHits++;
            this.gameState.combo++;
        } else if (hitType === 'good') {
            this.gameState.goodHits++;
            this.gameState.combo++;
        } else {
            this.gameState.misses++;
            this.gameState.combo = 0;
        }

        this.gameState.maxCombo = Math.max(this.gameState.maxCombo, this.gameState.combo);
        this.gameState.eventsCompleted++;

        // Update performance history
        this.gameState.recentPerformance.push({
            time: Date.now(),
            hitType: hitType,
            combo: this.gameState.combo
        });

        if (this.gameState.recentPerformance.length > 50) {
            this.gameState.recentPerformance.shift();
        }
    }

    // Utility methods
    frequencyToNote(frequency) {
        const A4 = 440;
        const C0 = A4 * Math.pow(2, -4.75);
        const h = 12 * Math.log2(frequency / C0);
        const octave = Math.floor(h / 12);
        const n = Math.floor(h % 12);
        const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
        return notes[n] + octave;
    }

    mapFrequencyToHue(frequencyBands) {
        // Map dominant frequency band to hue
        let maxEnergy = 0;
        let dominantBand = 'mid';

        for (const [bandName, band] of Object.entries(frequencyBands)) {
            if (band.energy > maxEnergy) {
                maxEnergy = band.energy;
                dominantBand = bandName;
            }
        }

        const hueMap = {
            subBass: 0,      // Red
            bass: 30,        // Orange
            lowMid: 60,      // Yellow
            mid: 120,        // Green
            highMid: 180,    // Cyan
            presence: 240,   // Blue
            brilliance: 300  // Purple
        };

        return hueMap[dominantBand] || 120;
    }

    // Roguelike progression methods
    updateRoguelikeProgression(audioAnalysis) {
        this.runState.totalTime = Date.now() - this.gameState.runStartTime;
        this.runState.audioComplexity = audioAnalysis.complexityScore;

        // Calculate performance multiplier
        const hitRate = this.gameState.eventsCompleted > 0 ?
            (this.gameState.perfectHits + this.gameState.goodHits) / this.gameState.eventsCompleted : 0;

        this.runState.performanceMultiplier = 0.5 + (hitRate * 1.5);

        // Update unlock level based on sustained performance
        if (hitRate > 0.8 && this.gameState.maxCombo > 20) {
            this.runState.unlockLevel = Math.max(this.runState.unlockLevel, Math.floor(this.runState.totalTime / 60000) + 1);
        }
    }

    startNewRun() {
        this.runState.currentRun++;
        this.gameState.currentRun = this.runState.currentRun;
        this.gameState.runStartTime = Date.now();
        this.gameState.score = 0;
        this.gameState.combo = 0;
        this.gameState.health = 100;
        this.gameState.eventsSpawned = 0;
        this.gameState.eventsCompleted = 0;
        this.gameState.perfectHits = 0;
        this.gameState.goodHits = 0;
        this.gameState.misses = 0;
        this.gameState.recentPerformance = [];

        console.log(`Starting run #${this.runState.currentRun}`);
    }
}