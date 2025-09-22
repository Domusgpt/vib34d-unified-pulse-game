/**
 * MathematicallyCoherentVisualSystem - Unified mathematical principles for VIB34D, particles, and telegraphs
 *
 * A Paul Phillips Manifestation
 * Send Love, Hate, or Opportunity: Paul@clearseassolutions.com
 * "The Revolution Will Not be in a Structured Format"
 * © 2025 Paul Phillips - Clear Seas Solutions LLC
 */

export class MathematicallyCoherentVisualSystem {
    constructor(vib34dEngine, particleSystem, telegraphSystem, audioDirector) {
        this.vib34d = vib34dEngine;
        this.particles = particleSystem;
        this.telegraph = telegraphSystem;
        this.audio = audioDirector;

        // Core mathematical principles that drive ALL visual systems
        this.unifiedMath = {
            // Primary 4D rotation matrices - ALL systems use these
            rotation4D: {
                XW: 0, YW: 0, ZW: 0, // 4th dimension rotations
                XY: 0, XZ: 0, YZ: 0  // 3D rotations
            },

            // Universal phase system - drives all animations
            phase: {
                master: 0,           // Master phase from audio beat
                harmony: [0, 0, 0],  // 3 harmonic phases
                chaos: 0             // Chaos perturbation
            },

            // Frequency-driven parameters - shared across all systems
            frequency: {
                fundamental: 440,    // Base frequency from audio
                harmonics: [],       // Harmonic series
                spectralCentroid: 0, // Brightness
                bandwidth: 0         // Spread
            },

            // Energy distribution - powers all visual intensity
            energy: {
                bass: 0, mid: 0, treble: 0,
                total: 0,
                distribution: [0, 0, 0, 0] // Per quadrant
            },

            // Temporal sync - keeps everything rhythmically aligned
            tempo: {
                bpm: 120,
                beatPhase: 0,        // 0-1 within current beat
                measurePhase: 0,     // 0-1 within current measure
                subdivision: 1       // Beat subdivision level
            }
        };

        // Mathematical transformations that ALL systems share
        this.sharedTransforms = {
            // 4D rotation matrices
            rotateXW: (angle) => this.createRotationMatrix4D('XW', angle),
            rotateYW: (angle) => this.createRotationMatrix4D('YW', angle),
            rotateZW: (angle) => this.createRotationMatrix4D('ZW', angle),

            // Phase-driven oscillations
            beatOscillation: (amplitude, phase) => amplitude * Math.sin(this.unifiedMath.phase.master + phase),
            harmonicOscillation: (amplitude, harmonic, phase) => amplitude * Math.sin(this.unifiedMath.phase.harmony[harmonic] + phase),

            // Energy-driven scaling
            energyScale: (baseValue, energyChannel) => baseValue * (1 + this.unifiedMath.energy[energyChannel]),

            // Frequency-driven color mapping
            frequencyToHue: (freq) => (Math.log2(freq / 440) * 60 + 240) % 360,
            spectralColor: () => this.calculateSpectralColor(),

            // Spatial projections from 4D to screen
            project4DTo2D: (point4D) => this.project4DPoint(point4D)
        };

        this.init();
    }

    init() {
        this.setupMathematicalSync();
        this.startUnifiedUpdate();
    }

    setupMathematicalSync() {
        // Ensure all systems use the same mathematical foundation
        this.syncAllSystems();
    }

    startUnifiedUpdate() {
        const updateCycle = () => {
            // Update unified mathematical state from audio
            this.updateUnifiedMathFromAudio();

            // Propagate to all visual systems using same math
            this.updateVIB34DFromUnifiedMath();
            this.updateParticlesFromUnifiedMath();
            this.updateTelegraphFromUnifiedMath();

            requestAnimationFrame(updateCycle);
        };

        updateCycle();
    }

    updateUnifiedMathFromAudio() {
        const audioData = this.audio.getCurrentAnalysis();
        const beatInfo = this.audio.getBeatInfo();

        // Update 4D rotations based on frequency bands
        this.unifiedMath.rotation4D.XW = audioData.frequencyBands.bass.energy * 2;
        this.unifiedMath.rotation4D.YW = audioData.frequencyBands.mid.energy * 2;
        this.unifiedMath.rotation4D.ZW = audioData.frequencyBands.treble.energy * 2;

        // Update phase system from beat detection
        this.unifiedMath.phase.master = (beatInfo.timeSinceLastBeat / (60000 / beatInfo.bpm)) * Math.PI * 2;
        this.unifiedMath.phase.harmony[0] = this.unifiedMath.phase.master * 2;   // Octave
        this.unifiedMath.phase.harmony[1] = this.unifiedMath.phase.master * 1.5; // Perfect fifth
        this.unifiedMath.phase.harmony[2] = this.unifiedMath.phase.master * 1.25; // Major third

        // Update chaos from audio complexity
        this.unifiedMath.phase.chaos = audioData.complexityScore * 0.5;

        // Update frequency parameters
        this.unifiedMath.frequency.fundamental = audioData.pitch?.frequency || 440;
        this.unifiedMath.frequency.spectralCentroid = audioData.spectralCentroid;
        this.unifiedMath.frequency.bandwidth = audioData.spectralBandwidth;

        // Update energy distribution
        this.unifiedMath.energy.bass = audioData.frequencyBands.bass.energy;
        this.unifiedMath.energy.mid = audioData.frequencyBands.mid.energy;
        this.unifiedMath.energy.treble = audioData.frequencyBands.treble.energy;
        this.unifiedMath.energy.total = this.unifiedMath.energy.bass + this.unifiedMath.energy.mid + this.unifiedMath.energy.treble;

        // Update temporal sync
        this.unifiedMath.tempo.bpm = beatInfo.bpm;
        this.unifiedMath.tempo.beatPhase = (beatInfo.timeSinceLastBeat / (60000 / beatInfo.bpm)) % 1;
        this.unifiedMath.tempo.measurePhase = (this.unifiedMath.tempo.beatPhase / 4) % 1; // 4/4 time
    }

    updateVIB34DFromUnifiedMath() {
        // VIB34D visualizer uses the exact same mathematical principles
        const params = {
            // 4D rotations - same as particles and telegraphs
            rotXW: this.unifiedMath.rotation4D.XW,
            rotYW: this.unifiedMath.rotation4D.YW,
            rotZW: this.unifiedMath.rotation4D.ZW,

            // Phase-driven morphing
            morphFactor: this.sharedTransforms.beatOscillation(0.5, 0) + 0.5,

            // Energy-driven intensity
            intensity: this.sharedTransforms.energyScale(0.5, 'total'),

            // Frequency-driven color
            hue: this.sharedTransforms.frequencyToHue(this.unifiedMath.frequency.fundamental),

            // Chaos from audio complexity
            chaos: this.unifiedMath.phase.chaos,

            // Beat-synchronized speed
            speed: this.unifiedMath.tempo.bpm / 120,

            // Grid density from spectral characteristics
            gridDensity: 0.5 + this.unifiedMath.frequency.spectralCentroid * 0.5
        };

        this.vib34d.updateParameters(params);
    }

    updateParticlesFromUnifiedMath() {
        // Particles use same 4D math as VIB34D for visual coherence
        const particleParams = {
            // Same rotation matrices as VIB34D
            rotation4D: this.unifiedMath.rotation4D,

            // Same phase oscillations
            beatPhase: this.unifiedMath.phase.master,
            harmonicPhases: this.unifiedMath.phase.harmony,

            // Same energy distribution
            energyQuadrants: [
                this.unifiedMath.energy.bass,
                this.unifiedMath.energy.mid,
                this.unifiedMath.energy.treble,
                this.unifiedMath.energy.total * 0.25
            ],

            // Same spectral color system
            baseColor: this.sharedTransforms.spectralColor(),

            // Same temporal sync
            tempoSync: this.unifiedMath.tempo
        };

        this.particles.updateFromUnifiedMath(particleParams);
    }

    updateTelegraphFromUnifiedMath() {
        // Telegraph system uses same mathematical foundation for coherence
        const telegraphParams = {
            // Same phase system for pulsing warnings
            warningPhase: this.unifiedMath.phase.master,

            // Same color mapping as VIB34D and particles
            colorSystem: {
                hue: this.sharedTransforms.frequencyToHue(this.unifiedMath.frequency.fundamental),
                saturation: this.unifiedMath.energy.total,
                brightness: 0.5 + this.sharedTransforms.beatOscillation(0.3, 0)
            },

            // Same spatial projections
            spatialTransform: this.unifiedMath.rotation4D,

            // Same temporal rhythm
            beatSync: this.unifiedMath.tempo.beatPhase
        };

        this.telegraph.updateFromUnifiedMath(telegraphParams);
    }

    // Mathematical foundation methods
    createRotationMatrix4D(plane, angle) {
        // 4D rotation matrices that all systems share
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);

        switch (plane) {
            case 'XW':
                return [
                    [cos, 0, 0, -sin],
                    [0, 1, 0, 0],
                    [0, 0, 1, 0],
                    [sin, 0, 0, cos]
                ];
            case 'YW':
                return [
                    [1, 0, 0, 0],
                    [0, cos, 0, -sin],
                    [0, 0, 1, 0],
                    [0, sin, 0, cos]
                ];
            case 'ZW':
                return [
                    [1, 0, 0, 0],
                    [0, 1, 0, 0],
                    [0, 0, cos, -sin],
                    [0, 0, sin, cos]
                ];
            default:
                return [[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]]; // Identity
        }
    }

    project4DPoint(point4D) {
        // Project 4D point to 2D screen coordinates
        // This ensures particles, telegraphs, and VIB34D use same spatial mapping
        const w_distance = 2; // Distance to 4D viewing hyperplane
        const perspective = w_distance / (w_distance + point4D[3]);

        return {
            x: point4D[0] * perspective,
            y: point4D[1] * perspective,
            z: point4D[2] * perspective,
            perspective: perspective
        };
    }

    calculateSpectralColor() {
        // Unified color calculation used by all systems
        const centroid = this.unifiedMath.frequency.spectralCentroid;
        const energy = this.unifiedMath.energy.total;

        const hue = (centroid / 1000) * 360; // Map spectral centroid to hue
        const saturation = Math.min(100, energy * 100);
        const lightness = 50 + this.sharedTransforms.beatOscillation(20, 0);

        return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    }

    // Rhythmic pattern generation (not monotonous beats)
    generateRhythmicPattern(complexityLevel) {
        // Create musical rhythm patterns based on detected audio
        const patterns = {
            simple: [1, 0, 0.5, 0], // Basic rock beat
            complex: [1, 0.3, 0.7, 0.2, 0.5, 0, 0.8, 0.1], // Complex polyrhythm
            syncopated: [0.8, 0, 0.2, 0.9, 0, 0.6, 0.3, 0] // Jazz-like syncopation
        };

        const patternType = complexityLevel < 0.3 ? 'simple' :
                           complexityLevel < 0.7 ? 'complex' : 'syncopated';

        return patterns[patternType];
    }

    applyRhythmToSpawning(pattern, currentBeat) {
        // Use rhythmic patterns to drive spawn events
        const patternIndex = Math.floor(currentBeat) % pattern.length;
        const spawnIntensity = pattern[patternIndex];

        // Modulate spawn rate by pattern intensity
        const shouldSpawn = Math.random() < spawnIntensity;
        const spawnEnergy = spawnIntensity * this.unifiedMath.energy.total;

        return { shouldSpawn, spawnEnergy, patternIntensity: spawnIntensity };
    }

    // Public API for game systems
    getUnifiedParameters() {
        return {
            math: this.unifiedMath,
            transforms: this.sharedTransforms,
            currentPattern: this.getCurrentRhythmPattern(),
            colorPalette: this.getCurrentColorPalette()
        };
    }

    getCurrentRhythmPattern() {
        const complexity = this.unifiedMath.phase.chaos;
        return this.generateRhythmicPattern(complexity);
    }

    getCurrentColorPalette() {
        // Generate coherent color palette for all systems
        const baseHue = this.sharedTransforms.frequencyToHue(this.unifiedMath.frequency.fundamental);

        return {
            primary: baseHue,
            secondary: (baseHue + 120) % 360,   // Triad
            tertiary: (baseHue + 240) % 360,    // Triad
            accent: (baseHue + 30) % 360,       // Analogous
            warning: 0,  // Red
            success: 120 // Green
        };
    }

    // Candy Crush style progression mechanics
    calculateDifficultyProgression(score, timeElapsed) {
        // Exponential difficulty scaling like Candy Crush
        const baseComplexity = Math.min(2.0, 1 + (score / 1000) * 0.5);
        const timeMultiplier = Math.min(1.5, 1 + (timeElapsed / 60000) * 0.2); // Increase over time
        const audioMultiplier = 0.5 + this.unifiedMath.phase.chaos;

        return baseComplexity * timeMultiplier * audioMultiplier;
    }

    // Visual coherence validation
    validateVisualCoherence() {
        // Ensure all systems are using same mathematical foundation
        const vib34dParams = this.vib34d.getCurrentParameters();
        const particleParams = this.particles.getCurrentParameters();
        const telegraphParams = this.telegraph.getCurrentParameters();

        const coherenceCheck = {
            rotationSync: this.checkRotationSync(vib34dParams, particleParams),
            colorSync: this.checkColorSync(vib34dParams, particleParams, telegraphParams),
            phaseSync: this.checkPhaseSync(vib34dParams, particleParams, telegraphParams),
            overallCoherence: 0
        };

        coherenceCheck.overallCoherence = (
            coherenceCheck.rotationSync +
            coherenceCheck.colorSync +
            coherenceCheck.phaseSync
        ) / 3;

        return coherenceCheck;
    }

    checkRotationSync(vib34d, particles) {
        const rotDiff = Math.abs(vib34d.rotXW - particles.rotation4D.XW) +
                       Math.abs(vib34d.rotYW - particles.rotation4D.YW) +
                       Math.abs(vib34d.rotZW - particles.rotation4D.ZW);
        return Math.max(0, 1 - (rotDiff / 6)); // Normalize to 0-1
    }

    checkColorSync(vib34d, particles, telegraph) {
        // Check if color systems are using same spectral mapping
        const hueDiff = Math.abs(vib34d.hue - particles.baseHue) +
                       Math.abs(vib34d.hue - telegraph.baseHue);
        return Math.max(0, 1 - (hueDiff / 720)); // Normalize to 0-1
    }

    checkPhaseSync(vib34d, particles, telegraph) {
        // Check if all systems are synchronized to same beat phase
        const phaseDiff = Math.abs(vib34d.beatPhase - particles.beatPhase) +
                         Math.abs(vib34d.beatPhase - telegraph.beatPhase);
        return Math.max(0, 1 - (phaseDiff / (Math.PI * 4))); // Normalize to 0-1
    }
}