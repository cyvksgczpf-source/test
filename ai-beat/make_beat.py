# UK hood jerk / Nemzzz-type beat generator -> MIDI files for Ableton
# 148 BPM, C# minor, 8-bar loop (4-bar progression x2, second half varied)
import mido
from mido import MidiFile, MidiTrack, Message, MetaMessage

BPM, PPQ, BARS = 148, 480, 8
S = PPQ // 4            # one 16th note
BAR = 16 * S

def save(name, notes, ch=0, prog=None):
    """notes: list of (start_ticks, length_ticks, pitch, velocity)"""
    mid = MidiFile(ticks_per_beat=PPQ)
    tr = MidiTrack(); mid.tracks.append(tr)
    tr.append(MetaMessage('track_name', name=name, time=0))
    tr.append(MetaMessage('set_tempo', tempo=mido.bpm2tempo(BPM), time=0))
    tr.append(MetaMessage('time_signature', numerator=4, denominator=4, time=0))
    ev = []
    for st, ln, p, v in notes:
        ev.append((st, 1, Message('note_on', channel=ch, note=p, velocity=v)))
        ev.append((st + ln, 0, Message('note_off', channel=ch, note=p, velocity=0)))
    ev.sort(key=lambda e: (e[0], e[1]))
    t = 0
    for at, _, m in ev:
        m.time = at - t; t = at; tr.append(m)
    tr.append(MetaMessage('end_of_track', time=BAR * BARS - t if BAR * BARS > t else 0))
    mid.save(f'{name}.mid')
    return mid

# ---------- harmony: C#m | A | F#m | G#7  (i - VI - iv - V) ----------
CHORDS = [[61, 64, 68, 73], [57, 61, 64, 69], [54, 57, 61, 66], [56, 60, 63, 66]]
ROOTS_808 = [49, 45, 42, 44]   # C#2, A1, F#1, G#1 (Ableton naming)

chords = []
for b in range(BARS):
    for p in CHORDS[b % 4]:
        chords.append((b * BAR, BAR - S // 2, p, 70))
save('chords_pad', chords)

# ---------- bell / piano lead (dark, catchy) ----------
MEL = [
    [(0, 3, 80), (3, 1, 78), (4, 2, 76), (6, 2, 75), (8, 3, 76), (11, 1, 73), (12, 4, 68)],
    [(0, 3, 76), (3, 1, 75), (4, 2, 73), (6, 2, 76), (8, 4, 81), (12, 2, 80), (14, 2, 76)],
    [(0, 3, 78), (3, 1, 76), (4, 2, 73), (6, 2, 69), (8, 3, 73), (11, 1, 76), (12, 4, 78)],
    [(0, 3, 84), (3, 1, 80), (4, 2, 75), (6, 2, 78), (8, 6, 80), (14, 2, 72)],
]
lead = []
for b in range(BARS):
    for st, ln, p in MEL[b % 4]:
        v = 100 if st in (0, 8) else 82
        lead.append((b * BAR + st * S, ln * S, p, v))
        if b >= 4:  # second half: add octave-up doubling for lift
            lead.append((b * BAR + st * S, ln * S, p + 12, v - 25))
save('bell_lead', lead)

# ---------- drums (Drum Rack: C1 kick, C#1 rim, D1 snare, D#1 clap, F#1 hat, A#1 open hat) ----------
KICK, RIM, SNARE, CLAP, HAT, OHAT = 36, 37, 38, 39, 42, 46
KICK_A = [0, 7, 10]
KICK_B = [0, 3, 10, 13]
kick_steps = {b: (KICK_A if b % 2 == 0 else KICK_B) for b in range(BARS)}
kick_steps[7] = [0, 3, 6, 10]   # last bar: switch-up before loop

drums = []
for b in range(BARS):
    o = b * BAR
    for s in kick_steps[b]:
        drums.append((o + s * S, S, KICK, 120))
    # half-time clap + snare layer on beat 3
    drums.append((o + 8 * S, S, CLAP, 120))
    drums.append((o + 8 * S, S, SNARE, 95))
    # jerk bounce: ghost snare before the clap / at end of bar
    if b % 2 == 1:
        drums.append((o + 15 * S, S, SNARE, 55))
    if b % 4 == 2:
        drums.append((o + 7 * S, S, SNARE, 50))
    # rim/perc offbeats
    for s in ([6, 13] if b % 2 == 0 else [5, 11]):
        drums.append((o + s * S, S, RIM, 85))
    # hats: bouncy 8ths with 16th pickups + triplet rolls on bars 2,4,6,8
    roll = b % 2 == 1
    for s in range(16):
        if roll and s >= 12:
            continue
        if s % 2 == 0:
            drums.append((o + s * S, S // 2, HAT, 105 if s % 4 == 0 else 80))
        elif s in (3, 11) or (b % 4 == 3 and s == 7):
            drums.append((o + s * S, S // 2, HAT, 60))
    if roll:
        # 1/32-note triplet roll rising in velocity over beat 4
        step = (4 * S) // 12
        for i in range(12):
            drums.append((o + 12 * S + i * step, step, HAT, 55 + i * 5))
    # open hat accent
    if b % 4 in (0, 2):
        drums.append((o + 14 * S, 2 * S, OHAT, 80))
# last bar: snare fill
for i, s in enumerate([12, 13, 14, 15]):
    drums.append((7 * BAR + s * S, S, SNARE, 70 + i * 12))
save('drums', drums, ch=9)

# ---------- 808 (follows the kick, slides between notes) ----------
b808 = []
for b in range(BARS):
    o = b * BAR
    root = ROOTS_808[b % 4]
    ks = kick_steps[b]
    for i, s in enumerate(ks):
        end = ks[i + 1] if i + 1 < len(ks) else 16
        pitch = root
        if b % 2 == 1 and i == len(ks) - 1:
            pitch = root + 12          # octave jump on last hit of every 2nd bar
        b808.append((o + s * S, (end - s) * S, pitch, 120))
    # slide: overlapping note into the next bar's root (turn on Glide/Legato)
    if b % 2 == 1:
        nxt = ROOTS_808[(b + 1) % 4]
        b808.append((o + 15 * S, S, nxt, 110))
save('808', b808)

# ---------- combined multitrack file (drag in = all tracks at once) ----------
full = MidiFile(type=1, ticks_per_beat=PPQ)
for n in ['drums', '808', 'chords_pad', 'bell_lead']:
    full.tracks.append(MidiFile(f'{n}.mid').tracks[0])
full.save('FULL_beat_148bpm_Csharp_minor.mid')
print('done')
