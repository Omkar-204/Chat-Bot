# Roo AI Chatbot

![Project Status](https://img.shields.io/badge/Status-Completed-success)
![Language](https://img.shields.io/badge/Language-HTML%20%7C%20CSS%20%7C%20JavaScript-blue)

## 📋 Overview

Roo AI is a lightweight floating chat widget that connects to Google Gemini through the Generative Language REST API. The interface is built with vanilla HTML, CSS, and JavaScript, offering a polished support-style conversation experience while showcasing how to embed Gemini responses into a static site.

## 🚀 Features

- Floating chatbot button that expands into a full conversation panel.
- Distinct styling for incoming (bot) and outgoing (user) messages, including avatars.
- Auto-resizing message composer with desktop enter-to-send support.
- Gemini integration with a "Thinking..." placeholder, graceful error handling, and scroll-to-latest behavior.

## 🔍 How It Works

1. User text is captured from the chat form and rendered immediately as an outgoing bubble.
2. A temporary incoming bubble shows a thinking state while the network call is dispatched.
3. The app sends `userMessage` to the Gemini `generateContent` endpoint using the configured API key.
4. When the response returns, the placeholder bubble is replaced with the model output; failure conditions display a friendly error message.

## 💻 Tech Stack

- **HTML5** for structure and accessibility hooks.
- **CSS3** with Flexbox, responsive sizing, and subtle animations for the chat widget.
- **JavaScript (ES6)** for DOM manipulation, textarea autosizing, and Gemini REST integration.

## ✅ Prerequisites

- Google Cloud project with the Generative Language API enabled.
- Gemini API key that grants access to `models/gemini-flash-latest` (or another supported model).
- Local static server such as VS Code Live Server, `python -m http.server`, or `npx serve`.


## 📂 File Structure

```text
├── index.html        # Chat widget markup and asset hooks
├── style.css         # Layout, theming, and responsive styling
├── script.js         # Gemini integration and UI behavior
└── README.md         # Project documentation
```

