# Custom cursors

Drop your own cursor image here and it'll be used wherever `.cursor-dot` (or
any class using `var(--cursor-pointer)`) is applied — right now that's the
Portfolio page's side map links.

## Adding your own

1. Put your image in this folder, e.g. `public/cursors/pointer.png`.
2. Update the `--cursor-pointer` variable in `src/assets/styles/tokens.css`:

   ```css
   --cursor-pointer: url('/cursors/pointer.png') 4 4, pointer;
   ```

   The two numbers after the URL are the cursor's "hotspot" — the pixel
   offset from the image's top-left corner that acts as the actual click
   point. For a small centered dot/arrow, roughly half the image's width
   and height works well (e.g. `4 4` for a 8x8 image).

## Format notes

- **PNG or SVG** both work in modern browsers. PNG (`.png`) has the most
  consistent cross-browser support; SVG can render inconsistently at very
  small sizes in some browsers, so keep SVG cursors simple.
- Keep the image small — most browsers cap custom cursors around 32x32 to
  128x128px and will silently ignore anything larger.
- The comma-separated fallback (`, pointer`) means if your image ever fails
  to load (wrong path, unsupported format), the browser just falls back to
  the normal pointer cursor instead of breaking.

A placeholder red dot (`pointer.svg`) is included so the effect is visible
immediately — replace it whenever you're ready.
