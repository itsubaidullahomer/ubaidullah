"""Finds a track's tempo and first downbeat, for content/reel.ts.

    pip install librosa
    python video/beats.py public/video/music.mp3

Prints the bpm and the offset (seconds into the track where the film should
start) to paste into `reel.bpm` and `reel.music`. The offset is the first
strong beat after any quiet intro, so the opening cut lands on it.
"""

import sys

import librosa
import numpy as np

path = sys.argv[1]
y, sr = librosa.load(path, mono=True)
tempo, beats = librosa.beat.beat_track(y=y, sr=sr, units="time")
bpm = float(np.atleast_1d(tempo)[0])
# Refine with a straight-line fit through the detected beats: steadier than
# the tracker's own estimate.
if len(beats) >= 8:
    k = np.arange(len(beats))
    period, _ = np.polyfit(k, beats, 1)
    bpm = 60.0 / period

# Prefer a whole-number tempo when the estimate is within a hair of one.
if abs(bpm - round(bpm)) < 0.6:
    bpm = float(round(bpm))

onset = librosa.onset.onset_strength(y=y, sr=sr)
times = librosa.times_like(onset, sr=sr)
loud = onset > np.percentile(onset, 60)
first_loud = times[np.argmax(loud)] if loud.any() else 0.0
offset = next((float(b) for b in beats if b >= first_loud - 0.05), float(beats[0]) if len(beats) else 0.0)

duration = librosa.get_duration(y=y, sr=sr)
bar = 4 * 60 / bpm
print(f"bpm:      {bpm:.2f}")
print(f"offset:   {offset:.3f}s  (first strong beat)")
print(f"bar:      {bar:.3f}s")
print(f"track:    {duration:.1f}s, {int((duration - offset) / bar)} bars after the offset")
