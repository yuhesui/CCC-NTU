OCR NOTE

The repo task asked for local OCR (Tesseract/Python) of poster images.
In this workspace environment, neither `tesseract` nor Python (`python`/`py`) was available on PATH,
so automated OCR extraction could not be executed from within the repo tooling.

What we did instead:
- Kept the posters as the display source of truth (assets/posters/*Roadshow_{E,C}.jpg)
- Made all Events-page labels and metadata bilingual via the existing i18n toggle
- Documented how to run OCR locally (outside the repo) in the main README

If you install Tesseract locally, you can re-OCR and replace/update the Events strings in:
- Webpage/js/i18n.js (events_* keys)
