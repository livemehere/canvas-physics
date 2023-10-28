export class AudioManager {
  constructor() {
    this.audios = {};
  }

  init() {
    this.loadAudio("firework", "/fire_sound.mp3");
    this.loadAudio("explosion", "/explosion.m4a");
  }

  loadAudio(name, path) {
    const audio = new Audio(path);
    audio.volume = 0;
    this.audios[name] = audio;
  }

  play(name, vol = 1) {
    const audio = this.audios[name].cloneNode();
    audio.volume = vol;
    audio.play();
    audio.addEventListener("ended", () => {
      audio.remove();
    });
  }
}
