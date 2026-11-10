# Top Juice — Arabic Menu Website

An Arabic product menu built with HTML, CSS and JavaScript.

## Overview
Visitors can browse product cards, filter products by name and open larger product images. The site is a static frontend; it does not implement checkout, payments or a backend.

## Features
- Product-name search with a clear action.
- Mobile navigation and section scrolling.
- Image lightbox with loading fallback and Escape-key dismissal.
- Back-to-top navigation.

## Tech stack
HTML5, CSS3 and vanilla JavaScript.

## Run locally
Clone the repository, then serve its root with a static HTTP server:
```bash
python3 -m http.server 8080
```
Open http://localhost:8080. No npm installation, build step, database or environment variables are required.

## Structure
- `index.html`: menu markup and product content.
- `CSS/`: styles.
- `script.js`: search, navigation and image interactions.
- `Image/`: product images.
- `fonts/`: bundled icon assets.

## Screenshots
<!-- Add real screenshots here: desktop menu, filtered results, mobile navigation. -->

## Live demo
[Open Top Juice](https://top-juice.vercel.app). The URL returned HTTP 200 on 10 November 2026; this is an availability check, not a complete functional or accessibility test.

## Contribution
The repository contains commits linked to [hemo-n90](https://github.com/hemo-n90). This describes the application, not a claim that all assets or third-party libraries were authored by one person.

## Next improvements
Optimize image and icon payloads; verify image paths on case-sensitive hosting; add keyboard focus management to the lightbox; test small screens and reduced-motion preferences.
