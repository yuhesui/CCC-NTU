// Source of truth: Archived/v1/components/audio_player.js

export class AudioPlayer {
  constructor() {
    this.container = document.getElementById('audio-control-bar');

    // Important: keep paths stable from Webpage/*.html
    this.music = new Audio('assets/audio/background_music.mp3');

    // Remote speech file is kept to preserve original behavior.
    // If offline support is required later, copy it into Webpage/assets/audio and update this URL.
    this.speech = new Audio('https://v3b.fal.media/files/b/0a8a640e/5lWH1-6_CPpgYy6k6qcju_speech.mp3');

    this.music.loop = true;
    this.music.volume = 0.4;

    this.isPlayingMusic = false;
    this.isPlayingSpeech = false;
  }

  init() {
    if (!this.container) return;
    this.render();
    this.setupListeners();
  }

  render() {
    this.container.innerHTML = `
      <div class="flex flex-col items-end gap-2">
        <button id="speech-play" class="flex items-center gap-2 bg-white/90 backdrop-blur px-4 py-2 rounded-full shadow-lg border border-gold hover:bg-gold hover:text-white transition-all">
          <span class="text-xs font-bold uppercase tracking-widest">Welcome Speech</span>
          <i data-lucide="${this.isPlayingSpeech ? 'pause' : 'play'}" class="w-4 h-4"></i>
        </button>
        <button id="music-toggle" class="p-4 bg-midnight-blue text-gold rounded-full shadow-2xl hover:scale-110 transition-transform ${
          this.isPlayingMusic ? 'audio-playing' : ''
        }">
          <i data-lucide="${this.isPlayingMusic ? 'volume-2' : 'volume-x'}" class="w-6 h-6"></i>
        </button>
      </div>
    `;

    if (window.lucide?.createIcons) window.lucide.createIcons();
  }

  setupListeners() {
    this.container.addEventListener('click', (e) => {
      const musicBtn = e.target.closest('#music-toggle');
      const speechBtn = e.target.closest('#speech-play');

      if (musicBtn) {
        if (this.isPlayingMusic) {
          this.music.pause();
        } else {
          void this.music.play();
        }
        this.isPlayingMusic = !this.isPlayingMusic;
        this.render();
      }

      if (speechBtn) {
        if (this.isPlayingSpeech) {
          this.speech.pause();
        } else {
          void this.speech.play();
        }
        this.isPlayingSpeech = !this.isPlayingSpeech;
        this.render();
      }
    });

    this.speech.addEventListener('ended', () => {
      this.isPlayingSpeech = false;
      this.render();
    });
  }
}
