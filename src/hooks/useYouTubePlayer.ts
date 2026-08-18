"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Track, PlayerState } from "../types/player";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export function useYouTubePlayer(
  tracks: Track[],
  youtubePlaylistId?: string
) {
  const [playerState, setPlayerState] = useState<PlayerState>({
    isPlaying: false,
    isMuted: false,
    volume: 80,
    currentTime: 0,
    duration: 0,
    currentTrackIndex: 0,
    isBuffering: false,
    shuffle: false,
    repeat: false,
  });

  const [isApiReady, setIsApiReady] = useState(false);
  const playerRef = useRef<any>(null);
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const currentTrackIndexRef = useRef(0);
  const tracksRef = useRef(tracks);
  const repeatRef = useRef(playerState.repeat);
  const shuffleRef = useRef(playerState.shuffle);
  const lastErrorTimeRef = useRef<number>(0);

  // Keep refs in sync
  useEffect(() => {
    tracksRef.current = tracks;
  }, [tracks]);

  useEffect(() => {
    currentTrackIndexRef.current = playerState.currentTrackIndex;
    repeatRef.current = playerState.repeat;
    shuffleRef.current = playerState.shuffle;
  }, [playerState.currentTrackIndex, playerState.repeat, playerState.shuffle]);

  // Load official YouTube IFrame Player API
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (window.YT && window.YT.Player) {
      setIsApiReady(true);
      return;
    }

    const prevCallback = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (prevCallback) prevCallback();
      setIsApiReady(true);
    };

    if (!document.getElementById("yt-iframe-script")) {
      const tag = document.createElement("script");
      tag.id = "yt-iframe-script";
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      if (firstScriptTag && firstScriptTag.parentNode) {
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      } else {
        document.head.appendChild(tag);
      }
    }
  }, []);

  // Initialize YT Player
  useEffect(() => {
    if (!isApiReady || typeof window === "undefined" || playerRef.current) return;

    const initialTrack = tracks[0];
    if (!initialTrack) return;

    try {
      playerRef.current = new window.YT.Player("hidden-yt-player", {
        height: "200",
        width: "200",
        videoId: initialTrack.youtubeId,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          rel: 0,
          modestbranding: 1,
          playsinline: 1,
          enablejsapi: 1,
          origin: window.location.origin,
        },
        events: {
          onReady: (event: any) => {
            event.target.setVolume(80);
            try {
              const dur = event.target.getDuration();
              if (dur > 0) {
                setPlayerState((prev) => ({ ...prev, duration: dur }));
              }
            } catch (e) {}
          },
          onStateChange: (event: any) => {
            const YTState = window.YT?.PlayerState;
            if (!YTState) return;

            if (event.data === YTState.PLAYING) {
              const dur = event.target.getDuration() || 0;
              setPlayerState((prev) => ({
                ...prev,
                isPlaying: true,
                isBuffering: false,
                duration: dur > 0 ? dur : prev.duration,
              }));
            } else if (event.data === YTState.PAUSED) {
              setPlayerState((prev) => ({ ...prev, isPlaying: false, isBuffering: false }));
            } else if (event.data === YTState.BUFFERING) {
              setPlayerState((prev) => ({ ...prev, isBuffering: true }));
            } else if (event.data === YTState.ENDED) {
              handleTrackEnded();
            }
          },
          onError: (err: any) => {
            console.warn("YouTube Player error event:", err);
            const now = Date.now();
            // Prevent rapid loop on continuous errors
            if (now - lastErrorTimeRef.current > 3000) {
              lastErrorTimeRef.current = now;
              handleNextTrack();
            }
          },
        },
      });
    } catch (e) {
      console.error("Failed to instantiate YouTube Player:", e);
    }
  }, [isApiReady, tracks]);

  // Track progress updater
  useEffect(() => {
    if (playerState.isPlaying) {
      progressTimerRef.current = setInterval(() => {
        if (playerRef.current && typeof playerRef.current.getCurrentTime === "function") {
          try {
            const time = playerRef.current.getCurrentTime() || 0;
            const dur = playerRef.current.getDuration();
            setPlayerState((prev) => ({
              ...prev,
              currentTime: time,
              duration: dur > 0 ? dur : prev.duration,
            }));
          } catch (e) {}
        }
      }, 500);
    } else {
      if (progressTimerRef.current) {
        clearInterval(progressTimerRef.current);
      }
    }

    return () => {
      if (progressTimerRef.current) {
        clearInterval(progressTimerRef.current);
      }
    };
  }, [playerState.isPlaying]);

  const handleTrackEnded = useCallback(() => {
    if (repeatRef.current) {
      if (playerRef.current && typeof playerRef.current.seekTo === "function") {
        playerRef.current.seekTo(0);
        playerRef.current.playVideo();
      }
      return;
    }
    handleNextTrack();
  }, []);

  const playTrackByIndex = useCallback(
    (index: number, autoPlay: boolean = true) => {
      const targetList = tracksRef.current;
      if (!targetList || targetList.length === 0) return;

      const validIndex = (index + targetList.length) % targetList.length;
      const track = targetList[validIndex];
      if (!track) return;

      setPlayerState((prev) => ({
        ...prev,
        currentTrackIndex: validIndex,
        currentTime: 0,
      }));

      if (playerRef.current && typeof playerRef.current.loadVideoById === "function") {
        try {
          if (autoPlay) {
            playerRef.current.loadVideoById(track.youtubeId);
            setPlayerState((prev) => ({ ...prev, isPlaying: true }));
          } else {
            playerRef.current.cueVideoById(track.youtubeId);
          }
        } catch (e) {
          console.error("Error loading video ID:", e);
        }
      }
    },
    []
  );

  const handleNextTrack = useCallback(() => {
    const list = tracksRef.current;
    if (list.length === 0) return;

    if (shuffleRef.current) {
      const randomIndex = Math.floor(Math.random() * list.length);
      playTrackByIndex(randomIndex, true);
    } else {
      const nextIdx = (currentTrackIndexRef.current + 1) % list.length;
      playTrackByIndex(nextIdx, true);
    }
  }, [playTrackByIndex]);

  const handlePrevTrack = useCallback(() => {
    const list = tracksRef.current;
    if (list.length === 0) return;

    if (playerRef.current && typeof playerRef.current.getCurrentTime === "function") {
      try {
        const curr = playerRef.current.getCurrentTime();
        if (curr > 3) {
          playerRef.current.seekTo(0);
          return;
        }
      } catch (e) {}
    }

    const prevIdx = (currentTrackIndexRef.current - 1 + list.length) % list.length;
    playTrackByIndex(prevIdx, true);
  }, [playTrackByIndex]);

  const togglePlay = useCallback(() => {
    if (!playerRef.current) return;

    try {
      if (playerState.isPlaying) {
        playerRef.current.pauseVideo();
        setPlayerState((prev) => ({ ...prev, isPlaying: false }));
      } else {
        playerRef.current.playVideo();
        setPlayerState((prev) => ({ ...prev, isPlaying: true }));
      }
    } catch (e) {
      console.error("Error toggling play:", e);
    }
  }, [playerState.isPlaying]);

  const seekTo = useCallback((seconds: number) => {
    if (playerRef.current && typeof playerRef.current.seekTo === "function") {
      try {
        playerRef.current.seekTo(seconds, true);
        setPlayerState((prev) => ({ ...prev, currentTime: seconds }));
      } catch (e) {
        console.error("Error seeking:", e);
      }
    }
  }, []);

  const setVolume = useCallback((vol: number) => {
    const clamped = Math.max(0, Math.min(100, vol));
    if (playerRef.current && typeof playerRef.current.setVolume === "function") {
      try {
        playerRef.current.setVolume(clamped);
        if (clamped > 0 && playerState.isMuted) {
          playerRef.current.unMute();
          setPlayerState((prev) => ({ ...prev, isMuted: false, volume: clamped }));
        } else {
          setPlayerState((prev) => ({ ...prev, volume: clamped }));
        }
      } catch (e) {
        console.error("Error setting volume:", e);
      }
    }
  }, [playerState.isMuted]);

  const toggleMute = useCallback(() => {
    if (playerRef.current) {
      try {
        if (playerState.isMuted) {
          playerRef.current.unMute();
          setPlayerState((prev) => ({ ...prev, isMuted: false }));
        } else {
          playerRef.current.mute();
          setPlayerState((prev) => ({ ...prev, isMuted: true }));
        }
      } catch (e) {
        console.error("Error toggling mute:", e);
      }
    }
  }, [playerState.isMuted]);

  const toggleShuffle = useCallback(() => {
    setPlayerState((prev) => ({ ...prev, shuffle: !prev.shuffle }));
  }, []);

  const toggleRepeat = useCallback(() => {
    setPlayerState((prev) => ({ ...prev, repeat: !prev.repeat }));
  }, []);

  const currentTrack = tracks[playerState.currentTrackIndex] || tracks[0];

  return {
    playerState,
    currentTrack,
    togglePlay,
    playTrackByIndex,
    handleNextTrack,
    handlePrevTrack,
    seekTo,
    setVolume,
    toggleMute,
    toggleShuffle,
    toggleRepeat,
    isApiReady,
  };
}
