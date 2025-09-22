/**
 * CandyCrushStyleProgression - Exponential difficulty scaling with VIB34D visualizer integration
 *
 * A Paul Phillips Manifestation
 * Send Love, Hate, or Opportunity: Paul@clearseassolutions.com
 * "The Revolution Will Not be in a Structured Format"
 * © 2025 Paul Phillips - Clear Seas Solutions LLC
 */

export class CandyCrushStyleProgression {
    constructor(vib34dEngine, audioDirector, visualCoherence) {
        this.vib34d = vib34dEngine;
        this.audio = audioDirector;
        this.visualCoherence = visualCoherence;

        // Candy Crush-style progression mechanics
        this.progression = {
            level: 1,
            score: 0,
            moves: 0,
            timeElapsed: 0,

            // Exponential scaling factors (like Candy Crush)
            difficultyMultiplier: 1.0,
            speedMultiplier: 1.0,
            complexityMultiplier: 1.0,

            // Score thresholds for level progression
            scoreThresholds: this.generateScoreThresholds(),

            // Performance tracking
            recentPerformance: [],
            streakCount: 0,
            perfectStreak: 0
        };

        // Fidget toy mechanics - satisfying, addictive interactions
        this.fidgetMechanics = {
            // Visual satisfaction systems
            satisfactionLevel: 0,
            lastSatisfactionBoost: 0,

            // Tactile feedback patterns
            hapticPatterns: {
                gentle: [30, 20, 30],
                satisfying: [50, 30, 50, 30, 80],
                explosive: [20, 30, 20, 30, 20, 30, 120]
            },

            // Visual "juice" - particles, screen shake, etc.
            juiceLevel: 1.0,
            screenShakeIntensity: 0,
            particleBurstIntensity: 0
        };

        // Trippy visualizer scaling with difficulty
        this.visualizerProgression = {
            // 4D complexity increases with level
            rotationComplexity: 1,
            morphingIntensity: 0.5,
            chaosLevel: 0.1,

            // Color palette evolution
            colorComplexity: 1,
            hueShiftSpeed: 1,
            saturationBoost: 0,

            // Geometry complexity scaling
            geometryTypes: ['tesseract'], // Start simple
            maxActiveGeometries: 3,

            // Effects scaling
            particleDensity: 1.0,
            glowIntensity: 0.5,
            trailLength: 1.0
        };

        // Exponential scaling curves (Candy Crush formula)
        this.scalingCurves = {
            // Difficulty increases exponentially but caps to prevent impossibility
            difficulty: (level) => Math.min(5.0, 1 + Math.pow(level * 0.1, 1.8)),

            // Speed increases more gradually
            speed: (level) => Math.min(3.0, 1 + Math.pow(level * 0.05, 1.4)),

            // Complexity adds layers
            complexity: (level) => Math.min(4.0, 1 + Math.pow(level * 0.08, 1.6)),

            // Score requirements grow exponentially
            scoreRequired: (level) => Math.floor(1000 * Math.pow(level, 1.5)),

            // Visual complexity scales with player mastery
            visualComplexity: (level, performance) => {
                const baseComplexity = Math.min(3.0, 1 + level * 0.1);
                const performanceBonus = performance > 0.8 ? 0.5 : 0;
                return baseComplexity + performanceBonus;
            }
        };

        this.init();
    }

    init() {
        this.setupProgressionSystem();
        this.startProgressionLoop();
    }

    setupProgressionSystem() {
        // Initialize starting state
        this.updateVisualizerComplexity();
        this.calculateCurrentDifficulty();
    }

    startProgressionLoop() {
        const progressionUpdate = () => {
            this.updateProgression();
            this.updateVisualizerProgression();
            this.updateFidgetSatisfaction();
            this.checkLevelProgression();

            requestAnimationFrame(progressionUpdate);
        };

        progressionUpdate();
    }

    updateProgression() {
        // Update time-based progression
        this.progression.timeElapsed += 16; // Assume 60fps

        // Calculate current difficulty multipliers
        this.progression.difficultyMultiplier = this.scalingCurves.difficulty(this.progression.level);
        this.progression.speedMultiplier = this.scalingCurves.speed(this.progression.level);
        this.progression.complexityMultiplier = this.scalingCurves.complexity(this.progression.level);

        // Update performance tracking
        this.updatePerformanceTracking();
    }

    updatePerformanceTracking() {
        // Calculate recent performance for adaptive scaling
        if (this.progression.recentPerformance.length >= 10) {
            const recentAvg = this.progression.recentPerformance
                .slice(-10)
                .reduce((sum, p) => sum + p, 0) / 10;

            // Adjust difficulty based on performance
            if (recentAvg > 0.9) {
                // Player is crushing it - increase challenge
                this.progression.difficultyMultiplier *= 1.1;
            } else if (recentAvg < 0.5) {
                // Player struggling - ease up slightly
                this.progression.difficultyMultiplier *= 0.95;
            }
        }
    }

    updateVisualizerProgression() {
        // Scale VIB34D complexity with level progression
        const level = this.progression.level;
        const performance = this.calculateCurrentPerformance();

        // Update 4D rotation complexity
        this.visualizerProgression.rotationComplexity = this.scalingCurves.visualComplexity(level, performance);

        // Increase morphing and chaos gradually
        this.visualizerProgression.morphingIntensity = Math.min(1.0, 0.3 + level * 0.05);
        this.visualizerProgression.chaosLevel = Math.min(0.8, level * 0.02);

        // Color complexity evolution
        this.visualizerProgression.colorComplexity = Math.min(3.0, 1 + level * 0.1);
        this.visualizerProgression.hueShiftSpeed = Math.min(2.0, 1 + level * 0.03);

        // Unlock new geometry types as player progresses
        this.updateGeometryUnlocks(level);

        // Apply to VIB34D engine
        this.applyVisualizerSettings();
    }

    updateGeometryUnlocks(level) {
        const allGeometries = ['tesseract', 'hypersphere', '24cell', '600cell', '120cell'];
        const unlockedCount = Math.min(allGeometries.length, Math.floor(1 + level / 5));

        this.visualizerProgression.geometryTypes = allGeometries.slice(0, unlockedCount);
        this.visualizerProgression.maxActiveGeometries = Math.min(8, 2 + Math.floor(level / 3));
    }

    applyVisualizerSettings() {
        // Apply progression settings to VIB34D visualizer
        const settings = {
            // 4D rotations scale with complexity
            rotXW: this.audio.getAudioParam('bass') * this.visualizerProgression.rotationComplexity,
            rotYW: this.audio.getAudioParam('mid') * this.visualizerProgression.rotationComplexity,
            rotZW: this.audio.getAudioParam('treble') * this.visualizerProgression.rotationComplexity,

            // Morphing and chaos
            morphFactor: this.visualizerProgression.morphingIntensity,
            chaos: this.visualizerProgression.chaosLevel,

            // Color evolution
            hue: (Date.now() * 0.001 * this.visualizerProgression.hueShiftSpeed) % 360,
            intensity: 0.5 + this.visualizerProgression.colorComplexity * 0.2,
            saturation: 0.7 + this.visualizerProgression.saturationBoost,

            // Geometry density
            gridDensity: 0.5 + this.visualizerProgression.colorComplexity * 0.2,

            // Speed scaling
            speed: this.progression.speedMultiplier
        };

        this.vib34d.updateParameters(settings);
    }

    updateFidgetSatisfaction() {
        // Decrease satisfaction over time (need to keep playing)
        this.fidgetMechanics.satisfactionLevel *= 0.998;

        // Update visual juice effects
        this.fidgetMechanics.screenShakeIntensity *= 0.95;
        this.fidgetMechanics.particleBurstIntensity *= 0.9;

        // Apply current juice to visual systems
        this.applyJuiceEffects();
    }

    applyJuiceEffects() {
        // Apply satisfying visual effects
        const juiceSettings = {
            particleMultiplier: 1 + this.fidgetMechanics.particleBurstIntensity,
            glowIntensity: 0.5 + this.fidgetMechanics.satisfactionLevel * 0.5,
            screenShake: this.fidgetMechanics.screenShakeIntensity
        };

        // Send to visual systems
        this.visualCoherence.applyJuiceEffects(juiceSettings);
    }

    // Public API for game events
    onPlayerHit(accuracy, energy, combo) {
        // Update score with Candy Crush-style scoring
        const basePoints = Math.floor(100 * accuracy);
        const levelBonus = basePoints * (this.progression.level * 0.1);
        const comboBonus = basePoints * (combo * 0.2);
        const energyBonus = basePoints * (energy * 0.5);

        const totalPoints = Math.floor(basePoints + levelBonus + comboBonus + energyBonus);
        this.progression.score += totalPoints;
        this.progression.moves++;

        // Update performance tracking
        this.progression.recentPerformance.push(accuracy);
        if (this.progression.recentPerformance.length > 20) {
            this.progression.recentPerformance.shift();
        }

        // Update streaks
        if (accuracy > 0.9) {
            this.progression.perfectStreak++;
            this.progression.streakCount++;
        } else if (accuracy > 0.7) {
            this.progression.streakCount++;
            this.progression.perfectStreak = 0;
        } else {
            this.progression.streakCount = 0;
            this.progression.perfectStreak = 0;
        }

        // Trigger satisfaction feedback
        this.triggerSatisfactionFeedback(accuracy, energy, combo);

        return totalPoints;
    }

    triggerSatisfactionFeedback(accuracy, energy, combo) {
        // Boost satisfaction based on hit quality
        const satisfactionBoost = accuracy * energy * (1 + combo * 0.1);
        this.fidgetMechanics.satisfactionLevel = Math.min(1.0,
            this.fidgetMechanics.satisfactionLevel + satisfactionBoost);

        // Trigger appropriate haptic pattern
        let hapticPattern;
        if (accuracy > 0.95) {
            hapticPattern = this.fidgetMechanics.hapticPatterns.explosive;
            this.fidgetMechanics.particleBurstIntensity = 1.0;
        } else if (accuracy > 0.8) {
            hapticPattern = this.fidgetMechanics.hapticPatterns.satisfying;
            this.fidgetMechanics.particleBurstIntensity = 0.6;
        } else {
            hapticPattern = this.fidgetMechanics.hapticPatterns.gentle;
            this.fidgetMechanics.particleBurstIntensity = 0.3;
        }

        // Trigger haptic feedback
        if (navigator.vibrate) {
            navigator.vibrate(hapticPattern);
        }

        // Screen shake for high-energy hits
        if (energy > 0.8) {
            this.fidgetMechanics.screenShakeIntensity = Math.min(1.0, energy);
        }
    }

    checkLevelProgression() {
        // Check if player should advance to next level
        const requiredScore = this.scalingCurves.scoreRequired(this.progression.level);

        if (this.progression.score >= requiredScore) {
            this.advanceLevel();
        }
    }

    advanceLevel() {
        this.progression.level++;

        // Level advancement celebration
        this.triggerLevelUpCelebration();

        // Update visualizer complexity for new level
        this.updateVisualizerComplexity();

        // Reset some progression metrics
        this.progression.moves = 0;
        this.progression.streakCount = 0;
        this.progression.perfectStreak = 0;

        console.log(`Level up! Now at level ${this.progression.level}`);
    }

    triggerLevelUpCelebration() {
        // Massive satisfaction boost
        this.fidgetMechanics.satisfactionLevel = 1.0;
        this.fidgetMechanics.particleBurstIntensity = 1.5;
        this.fidgetMechanics.screenShakeIntensity = 0.8;

        // Special level-up haptic pattern
        const levelUpPattern = [100, 50, 100, 50, 100, 50, 200];
        if (navigator.vibrate) {
            navigator.vibrate(levelUpPattern);
        }

        // Temporary visualizer boost
        this.boostVisualizerForCelebration();
    }

    boostVisualizerForCelebration() {
        // Temporary visual celebration effects
        const celebrationDuration = 3000; // 3 seconds

        const originalSettings = this.vib34d.getCurrentParameters();

        // Celebration boost settings
        const celebrationBoost = {
            intensity: originalSettings.intensity * 2,
            chaos: Math.min(1.0, originalSettings.chaos + 0.5),
            speed: originalSettings.speed * 1.5,
            particleMultiplier: 3.0
        };

        this.vib34d.applyTemporaryBoost(celebrationBoost, celebrationDuration);
    }

    updateVisualizerComplexity() {
        // Update visualizer based on current level
        const complexity = this.scalingCurves.visualComplexity(
            this.progression.level,
            this.calculateCurrentPerformance()
        );

        // Apply complexity to all visual systems
        this.visualizerProgression.rotationComplexity = complexity;
        this.applyVisualizerSettings();
    }

    calculateCurrentPerformance() {
        if (this.progression.recentPerformance.length === 0) return 0.5;

        return this.progression.recentPerformance
            .slice(-10)
            .reduce((sum, p) => sum + p, 0) / Math.min(10, this.progression.recentPerformance.length);
    }

    calculateCurrentDifficulty() {
        // Calculate overall current difficulty
        const levelDifficulty = this.progression.difficultyMultiplier;
        const speedDifficulty = this.progression.speedMultiplier;
        const complexityDifficulty = this.progression.complexityMultiplier;

        return (levelDifficulty + speedDifficulty + complexityDifficulty) / 3;
    }

    generateScoreThresholds() {
        // Generate score thresholds for first 100 levels
        const thresholds = [];
        for (let level = 1; level <= 100; level++) {
            thresholds.push(this.scalingCurves.scoreRequired(level));
        }
        return thresholds;
    }

    // Game state management
    getProgressionState() {
        return {
            ...this.progression,
            currentDifficulty: this.calculateCurrentDifficulty(),
            visualizerComplexity: this.visualizerProgression.rotationComplexity,
            satisfactionLevel: this.fidgetMechanics.satisfactionLevel,
            nextLevelScore: this.scalingCurves.scoreRequired(this.progression.level + 1),
            progressToNextLevel: this.progression.score / this.scalingCurves.scoreRequired(this.progression.level + 1)
        };
    }

    setLevel(newLevel) {
        // Allow setting level for testing/debugging
        this.progression.level = Math.max(1, newLevel);
        this.updateVisualizerComplexity();
        this.calculateCurrentDifficulty();
    }

    reset() {
        // Reset progression for new game
        this.progression.level = 1;
        this.progression.score = 0;
        this.progression.moves = 0;
        this.progression.timeElapsed = 0;
        this.progression.recentPerformance = [];
        this.progression.streakCount = 0;
        this.progression.perfectStreak = 0;

        this.fidgetMechanics.satisfactionLevel = 0;
        this.fidgetMechanics.screenShakeIntensity = 0;
        this.fidgetMechanics.particleBurstIntensity = 0;

        this.updateVisualizerComplexity();
    }

    // Performance monitoring
    getPerformanceMetrics() {
        return {
            averageAccuracy: this.calculateCurrentPerformance(),
            currentStreak: this.progression.streakCount,
            perfectStreak: this.progression.perfectStreak,
            movesPerLevel: this.progression.moves,
            timePerLevel: this.progression.timeElapsed / 1000,
            difficultyAdaptation: this.progression.difficultyMultiplier,
            satisfactionLevel: this.fidgetMechanics.satisfactionLevel
        };
    }

    // Candy Crush style features
    getStars(levelScore, moves) {
        // 3-star rating system like Candy Crush
        const targetScore = this.scalingCurves.scoreRequired(this.progression.level);
        const efficiency = targetScore / moves; // Points per move

        if (levelScore >= targetScore * 2 && efficiency > 200) return 3;
        if (levelScore >= targetScore * 1.5 && efficiency > 150) return 2;
        if (levelScore >= targetScore) return 1;
        return 0;
    }

    getBoosts() {
        // Power-ups/boosts unlocked by progression
        const availableBoosts = [];

        if (this.progression.level >= 3) {
            availableBoosts.push('tempo_slow'); // Slow down time briefly
        }
        if (this.progression.level >= 7) {
            availableBoosts.push('score_multiplier'); // 2x score for 30 seconds
        }
        if (this.progression.level >= 12) {
            availableBoosts.push('auto_hit'); // Automatic perfect hits for 10 seconds
        }
        if (this.progression.level >= 20) {
            availableBoosts.push('chaos_mode'); // Extreme visual effects with bonus points
        }

        return availableBoosts;
    }
}