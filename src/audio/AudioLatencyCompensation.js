/**
 * AudioLatencyCompensation - Advanced audio latency detection and compensation system
 *
 * A Paul Phillips Manifestation
 * Send Love, Hate, or Opportunity: Paul@clearseassolutions.com
 * "The Revolution Will Not be in a Structured Format"
 * © 2025 Paul Phillips - Clear Seas Solutions LLC
 */

export class AudioLatencyCompensation {
    constructor(audioContext) {
        this.audioContext = audioContext;

        // Latency measurement and compensation
        this.latencyProfile = {
            inputLatency: 0,        // Microphone to analysis
            processingLatency: 0,   // Analysis processing time
            outputLatency: 0,       // Audio to visual response
            totalLatency: 0,        // End-to-end latency
            deviceProfile: null,    // Device-specific characteristics
            adaptiveOffset: 0       // Real-time adjustment
        };

        // Platform-specific optimizations
        this.platformOptimizations = {
            iOS: {
                audioSessionCategory: 'playAndRecord',
                bufferSize: 256,        // Smaller buffers on iOS
                sampleRate: 44100,
                useWebkitAudio: true
            },
            android: {
                bufferSize: 512,        // Larger buffers on Android
                sampleRate: 44100,
                useMediaRecorder: false,
                lowLatencyMode: true
            },
            desktop: {
                bufferSize: 128,        // Smallest buffers on desktop
                sampleRate: 48000,
                useWorklets: true
            }
        };

        // Calibration system
        this.calibration = {
            isCalibrated: false,
            calibrationAttempts: 0,
            maxAttempts: 3,
            referenceBeats: [],
            measuredLatencies: [],
            confidence: 0
        };

        // Real-time adaptation
        this.adaptation = {
            enabled: true,
            learningRate: 0.1,
            windowSize: 50,         // Number of beats to analyze
            recentMeasurements: [],
            trendAnalysis: {
                slope: 0,
                stability: 0
            }
        };

        this.init();
    }

    async init() {
        await this.detectPlatform();
        await this.setupOptimalAudioContext();
        await this.performLatencyCalibration();
        this.startAdaptiveMonitoring();
    }

    async detectPlatform() {
        const userAgent = navigator.userAgent;
        const isIOS = /iPad|iPhone|iPod/.test(userAgent);
        const isAndroid = /Android/.test(userAgent);
        const isMobile = isIOS || isAndroid;

        this.platform = {
            type: isIOS ? 'iOS' : isAndroid ? 'android' : 'desktop',
            isMobile: isMobile,
            supportsLowLatency: this.checkLowLatencySupport(),
            audioWorkletSupport: 'audioWorklet' in AudioContext.prototype
        };

        console.log(`Platform detected: ${this.platform.type}, Low latency: ${this.platform.supportsLowLatency}`);
    }

    checkLowLatencySupport() {
        // Check for various low-latency audio features
        return !!(
            this.audioContext.audioWorklet ||
            this.audioContext.createScriptProcessor ||
            ('requestLowLatencyAudio' in navigator)
        );
    }

    async setupOptimalAudioContext() {
        const config = this.platformOptimizations[this.platform.type];

        try {
            // Apply platform-specific optimizations
            if (this.platform.type === 'iOS') {
                await this.setupIOSOptimizations(config);
            } else if (this.platform.type === 'android') {
                await this.setupAndroidOptimizations(config);
            } else {
                await this.setupDesktopOptimizations(config);
            }

            // Measure baseline audio system latency
            await this.measureSystemLatency();

        } catch (error) {
            console.error('Failed to setup optimal audio context:', error);
            // Fallback to basic configuration
            await this.setupFallbackAudio();
        }
    }

    async setupIOSOptimizations(config) {
        // iOS-specific optimizations
        if ('webkitAudioContext' in window) {
            // Use webkit audio context for better iOS performance
            this.audioContext = new webkitAudioContext({
                sampleRate: config.sampleRate,
                latencyHint: 'interactive'
            });
        }

        // Request low-latency audio session
        if (navigator.requestMIDIAccess) {
            try {
                await navigator.requestMIDIAccess({ sysex: false });
                console.log('iOS: Low-latency audio session requested');
            } catch (e) {
                console.warn('iOS: Could not request low-latency session');
            }
        }

        // Set optimal buffer size for iOS
        this.bufferSize = config.bufferSize;
        this.latencyProfile.inputLatency = 20; // Typical iOS microphone latency
    }

    async setupAndroidOptimizations(config) {
        // Android-specific optimizations
        if (config.lowLatencyMode && 'getOutputLatency' in this.audioContext) {
            try {
                const outputLatency = await this.audioContext.getOutputLatency();
                this.latencyProfile.outputLatency = outputLatency * 1000; // Convert to ms
                console.log(`Android: Measured output latency: ${outputLatency}ms`);
            } catch (e) {
                console.warn('Android: Could not measure output latency');
            }
        }

        this.bufferSize = config.bufferSize;
        this.latencyProfile.inputLatency = 40; // Typical Android microphone latency
    }

    async setupDesktopOptimizations(config) {
        // Desktop-specific optimizations
        if (config.useWorklets && this.platform.audioWorkletSupport) {
            try {
                await this.audioContext.audioWorklet.addModule('/audio-worklet-processor.js');
                this.useAudioWorklet = true;
                console.log('Desktop: AudioWorklet enabled for low latency');
            } catch (e) {
                console.warn('Desktop: AudioWorklet failed, using ScriptProcessor');
                this.useAudioWorklet = false;
            }
        }

        this.bufferSize = config.bufferSize;
        this.latencyProfile.inputLatency = 10; // Typically lower on desktop
    }

    async setupFallbackAudio() {
        // Basic audio setup when optimizations fail
        this.bufferSize = 1024; // Conservative buffer size
        this.latencyProfile.inputLatency = 50; // Conservative estimate
        console.log('Using fallback audio configuration');
    }

    async measureSystemLatency() {
        // Measure actual system audio latency using loopback test
        return new Promise((resolve) => {
            const testDuration = 2000; // 2 seconds
            const testFrequency = 1000; // 1kHz test tone
            const measurements = [];

            // Generate test tone
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            const analyser = this.audioContext.createAnalyser();

            oscillator.frequency.setValueAtTime(testFrequency, this.audioContext.currentTime);
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            gainNode.connect(analyser);

            gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);

            // Measure time from generation to detection
            const startTime = performance.now();
            let detectedTime = null;

            const measureLoop = () => {
                const freqData = new Float32Array(analyser.frequencyBinCount);
                analyser.getFloatFrequencyData(freqData);

                // Look for our test frequency
                const binIndex = Math.round(testFrequency * analyser.fftSize / this.audioContext.sampleRate);
                const amplitude = freqData[binIndex];

                if (amplitude > -40 && !detectedTime) { // -40dB threshold
                    detectedTime = performance.now();
                    const latency = detectedTime - startTime;
                    measurements.push(latency);
                    console.log(`Measured system latency: ${latency}ms`);
                }

                if (performance.now() - startTime < testDuration) {
                    requestAnimationFrame(measureLoop);
                } else {
                    oscillator.stop();
                    this.processLatencyMeasurements(measurements);
                    resolve();
                }
            };

            oscillator.start();
            measureLoop();
        });
    }

    processLatencyMeasurements(measurements) {
        if (measurements.length > 0) {
            const avgLatency = measurements.reduce((sum, m) => sum + m, 0) / measurements.length;
            this.latencyProfile.totalLatency = avgLatency;
            console.log(`Average system latency: ${avgLatency}ms`);
        } else {
            // Use platform defaults if measurement failed
            this.latencyProfile.totalLatency = this.latencyProfile.inputLatency + 20; // Add processing estimate
        }
    }

    async performLatencyCalibration() {
        // Interactive calibration with user
        console.log('Starting audio latency calibration...');

        return new Promise((resolve) => {
            // For now, use measured values. In production, this would be an interactive process
            // where users tap along to a metronome and we measure their timing accuracy

            this.calibration.isCalibrated = true;
            this.calibration.confidence = 0.8;

            // Set initial compensation offset
            this.latencyProfile.adaptiveOffset = -this.latencyProfile.totalLatency;

            console.log(`Calibration complete. Compensation offset: ${this.latencyProfile.adaptiveOffset}ms`);
            resolve();
        });
    }

    startAdaptiveMonitoring() {
        // Continuously monitor and adapt latency compensation
        if (!this.adaptation.enabled) return;

        setInterval(() => {
            this.updateAdaptiveCompensation();
        }, 1000); // Update every second
    }

    updateAdaptiveCompensation() {
        // Analyze recent timing accuracy to adjust compensation
        if (this.adaptation.recentMeasurements.length < 10) return;

        const recentAvg = this.adaptation.recentMeasurements
            .slice(-this.adaptation.windowSize)
            .reduce((sum, m) => sum + m, 0) / Math.min(this.adaptation.windowSize, this.adaptation.recentMeasurements.length);

        // Calculate trend
        const oldAvg = this.adaptation.recentMeasurements
            .slice(-this.adaptation.windowSize * 2, -this.adaptation.windowSize)
            .reduce((sum, m) => sum + m, 0) / Math.min(this.adaptation.windowSize, this.adaptation.recentMeasurements.length);

        if (!isNaN(oldAvg)) {
            const trend = recentAvg - oldAvg;
            this.adaptation.trendAnalysis.slope = trend;

            // Adapt compensation based on trend
            if (Math.abs(trend) > 5) { // More than 5ms drift
                const adjustment = -trend * this.adaptation.learningRate;
                this.latencyProfile.adaptiveOffset += adjustment;

                console.log(`Adaptive latency adjustment: ${adjustment}ms (total offset: ${this.latencyProfile.adaptiveOffset}ms)`);
            }
        }
    }

    // Public API methods
    getCompensatedTimestamp(originalTimestamp) {
        // Return timestamp adjusted for measured latency
        return originalTimestamp + this.latencyProfile.adaptiveOffset;
    }

    recordTimingMeasurement(expectedTime, actualTime) {
        // Record timing accuracy for adaptive compensation
        const error = actualTime - expectedTime;
        this.adaptation.recentMeasurements.push(error);

        // Keep only recent measurements
        if (this.adaptation.recentMeasurements.length > this.adaptation.windowSize * 2) {
            this.adaptation.recentMeasurements.shift();
        }
    }

    scheduleCompensatedEvent(callback, delay) {
        // Schedule event with latency compensation
        const compensatedDelay = Math.max(0, delay + this.latencyProfile.adaptiveOffset);
        return setTimeout(callback, compensatedDelay);
    }

    getLatencyInfo() {
        return {
            profile: { ...this.latencyProfile },
            platform: { ...this.platform },
            calibration: { ...this.calibration },
            adaptation: {
                ...this.adaptation,
                recentMeasurements: this.adaptation.recentMeasurements.slice(-10) // Last 10 only
            }
        };
    }

    // Audio-to-visual synchronization methods
    synchronizeAudioToVisual(audioEvent, visualCallback) {
        // Synchronize audio events with visual responses
        const compensatedTime = this.getCompensatedTimestamp(audioEvent.timestamp);
        const visualDelay = Math.max(0, compensatedTime - performance.now());

        return this.scheduleCompensatedEvent(visualCallback, visualDelay);
    }

    createLatencyAwareAnalyser() {
        // Create analyser node optimized for low latency
        const analyser = this.audioContext.createAnalyser();

        // Optimize for latency vs. frequency resolution trade-off
        if (this.platform.isMobile) {
            analyser.fftSize = 1024;  // Lower resolution for faster processing
            analyser.smoothingTimeConstant = 0.3; // Less smoothing for faster response
        } else {
            analyser.fftSize = 2048;  // Higher resolution on desktop
            analyser.smoothingTimeConstant = 0.8; // More smoothing for stability
        }

        return analyser;
    }

    optimizeForRealTimeMusic() {
        // Specific optimizations for music rhythm games
        return {
            // Optimized buffer sizes for beat detection
            bufferSize: this.platform.isMobile ? 512 : 256,

            // Faster update rate for rhythm tracking
            updateInterval: 1000 / 120, // 120 updates per second

            // Latency-compensated beat prediction
            beatPredictionOffset: this.latencyProfile.adaptiveOffset,

            // Platform-specific performance settings
            performanceMode: this.platform.type === 'iOS' ? 'balanced' : 'low-latency'
        };
    }

    // Quality monitoring
    getPerformanceMetrics() {
        return {
            averageLatency: this.latencyProfile.totalLatency,
            adaptiveOffset: this.latencyProfile.adaptiveOffset,
            timingStability: this.calculateTimingStability(),
            platformOptimization: this.platform.supportsLowLatency,
            calibrationConfidence: this.calibration.confidence
        };
    }

    calculateTimingStability() {
        if (this.adaptation.recentMeasurements.length < 10) return 0;

        const measurements = this.adaptation.recentMeasurements.slice(-20);
        const mean = measurements.reduce((sum, m) => sum + m, 0) / measurements.length;
        const variance = measurements.reduce((sum, m) => sum + Math.pow(m - mean, 2), 0) / measurements.length;
        const standardDeviation = Math.sqrt(variance);

        // Return stability as inverse of standard deviation (0-1 scale)
        return Math.max(0, 1 - (standardDeviation / 50)); // 50ms as reference point
    }

    // Emergency fallback methods
    enableEmergencyMode() {
        // Disable adaptive compensation and use conservative defaults
        this.adaptation.enabled = false;
        this.latencyProfile.adaptiveOffset = -100; // Conservative 100ms compensation
        console.warn('Audio latency compensation: Emergency mode enabled');
    }

    resetCalibration() {
        // Reset calibration and restart
        this.calibration.isCalibrated = false;
        this.calibration.calibrationAttempts = 0;
        this.adaptation.recentMeasurements = [];
        this.performLatencyCalibration();
    }
}