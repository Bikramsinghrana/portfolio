# Developer & Debugging Guide

This guide explains how to re-enable **Right-Click**, **Inspect Element / DevTools**, and **Text Selection** whenever you need to debug or develop your portfolio website.

---

## 🚀 Quick Methods to Enable Inspect / DevTools

### Method 1: URL Parameter (No code change needed!)
You can temporarily bypass all right-click and shortcut blocks simply by adding `?debug=true` to the URL in your browser:

- **Local:** `http://portfolio.test/?debug=true` or `file:///.../index.html?debug=true`
- **Resume Page:** `http://portfolio.test/resume.html?debug=true`

Whenever `?debug=true` is in the URL, right-click and all keyboard shortcuts (`F12`, `Ctrl+Shift+I`, `Ctrl+U`) will work immediately.

---

### Method 2: Toggle Flag in `scripts/main.js`
Open [scripts/main.js](file:///c:/laragon/www/Github_project/portfolio/scripts/main.js):

Find line ~170:
```javascript
const DEBUG_MODE = false; // <-- Change to true while developing/debugging
```

Change it to:
```javascript
const DEBUG_MODE = true;
```
Save the file and refresh your browser. Right-click, `F12`, and DevTools will be completely enabled.

---

### Method 3: Commenting Out Code Directly

#### 1. In `scripts/main.js`
To permanently disable the security scripts during development, open [scripts/main.js](file:///c:/laragon/www/Github_project/portfolio/scripts/main.js) and comment out the protection block:

```javascript
/*
if (!isDebugActive) {
    // 1. Disable right-click context menu
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        return false;
    });

    // 2. Disable keyboard shortcuts (F12, Ctrl+U, Ctrl+Shift+I, etc.)
    document.addEventListener('keydown', (e) => { ... });

    // 3. Disable dragging images/text
    document.addEventListener('dragstart', (e) => { ... });

    // 4. Disable copy
    document.addEventListener('copy', (e) => { ... });
}
*/
```

#### 2. In `styles/style.css` (For Text Selection)
To re-enable text selection (highlighting text), open [styles/style.css](file:///c:/laragon/www/Github_project/portfolio/styles/style.css) around line 211:

```css
/* Comment out these lines: */
/*
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
*/
```

---

## 🔒 Security Summary

| Feature | File | Purpose | How to Disable |
| :--- | :--- | :--- | :--- |
| **Right-Click Block** | `scripts/main.js` | Prevents context menu & Inspect | Set `DEBUG_MODE = true` or use `?debug=true` |
| **DevTools Shortcuts** | `scripts/main.js` | Blocks `F12`, `Ctrl+Shift+I`, `Ctrl+U`, `Ctrl+S` | Set `DEBUG_MODE = true` or use `?debug=true` |
| **Text Selection Block** | `styles/style.css` | Disables text highlighting & copying | Remove/comment `user-select: none;` on `body` |
| **Directory Browsing** | `.htaccess` | Prevents viewing `/styles/` or `/scripts/` folder lists | Remove `Options -Indexes` |
