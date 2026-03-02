# After Sign-Off: Interference

Mini CRT TV experience with channels.
Some channels are video clips rendered into the canvas with a slow "serious" glitch build-up.

## Folder structure

- index.html
- style.css
- script.js
- assets/
  - videos/   (put your .mp4 clips here)

## How to add your clips

1) Drop your files inside: `assets/videos/`
2) Open `script.js` and edit the `CHANNELS` array:
   - set `type: 'video'`
   - set `src: './assets/videos/your-file.mp4'`

Example:
```js
{ ch: 2, type: 'video', name: 'Tape', hex:'#2e3d4f', r:46, g:61, b:79, desc:'archive fragment', src:'./assets/videos/clip-01.mp4' }
```

## Secret channel

Typing 7, 3, 9, 1 unlocks CH 11 (expects `assets/videos/clip-secret.mp4`).

## Notes

- Browser autoplay rules can block audio until the first user interaction (click/keyboard).
- The distortion is intentionally subtle and grows over time and channel switching.
