export interface Track {
  id: string;
  title: string;
  artist: string;
  youtubeId: string;
  duration?: string;
  artworkUrl?: string;
  description?: string;
}

export interface PujaConfig {
  backgroundVideo: string;
  countdownDate: string; // ISO date string e.g. "2026-10-16T00:00:00"
  youtubePlaylistId?: string;
  title: string;
  subtitle: string;
  shareText: string;
  shareUrl?: string;
  enableAmbientParticles: boolean;
  defaultTracks: Track[];
}

export interface PlayerState {
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  currentTime: number;
  duration: number;
  currentTrackIndex: number;
  isBuffering: boolean;
  shuffle: boolean;
  repeat: boolean;
}
