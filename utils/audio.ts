
// Tone.js interface
declare const Tone: any;

class AudioEngine {
  synth: any;
  noise: any;
  isInitialized: boolean = false;

  async init() {
    if (this.isInitialized) return;
    
    await Tone.start();
    
    // Synth for musical cues
    this.synth = new Tone.PolySynth(Tone.Synth).toDestination();
    this.synth.volume.value = -10;

    // Noise for chaos
    this.noise = new Tone.Noise("pink").toDestination();
    this.noise.volume.value = -20;
    
    this.isInitialized = true;
  }

  playWin() {
    if (!this.isInitialized) return;
    // Major Triad: C4, E4, G4
    this.synth.triggerAttackRelease(["C5", "E5", "G5"], "8n");
  }

  playLoss() {
    if (!this.isInitialized) return;
    // Low dissonant sawtooth
    const now = Tone.now();
    this.synth.triggerAttackRelease(["C2", "F#2"], "4n", now);
  }

  playCrash() {
    if (!this.isInitialized) return;
    // Pink noise + Dissonant cluster
    this.noise.start();
    this.noise.stop("+2"); // Play for 2 seconds
    this.synth.triggerAttackRelease(["C2", "C#2", "D2", "D#2"], "2n");
  }

  playClick() {
    if (!this.isInitialized) return;
    this.synth.triggerAttackRelease(["C6"], "32n");
  }

  playAchievement() {
      if (!this.isInitialized) return;
      // Steam-like pop sound (Bright high pitch rising)
      this.synth.triggerAttackRelease(["G5", "C6"], "16n");
  }
}

export const audio = new AudioEngine();
