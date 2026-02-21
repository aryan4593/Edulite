/**
 * Text-to-speech via Web Speech API (SpeechSynthesis).
 * Uses system voices; works offline where supported.
 */

export function isSupported() {
  return typeof window !== 'undefined' && !!window.speechSynthesis
}

export function stop() {
  if (isSupported()) {
    window.speechSynthesis.cancel()
  }
}

export function pause() {
  if (isSupported()) {
    window.speechSynthesis.pause()
  }
}

export function resume() {
  if (isSupported()) {
    window.speechSynthesis.resume()
  }
}

/**
 * Speak text. Call stop() to cancel (e.g. on step change or unmount).
 * Use pause() / resume() to pause and resume.
 * @param {string} text - Plain text to speak (no HTML).
 * @param {object} options - Optional: { rate?: number, pitch?: number, onEnd?: () => void }
 */
export function speak(text, options = {}) {
  if (!isSupported() || !text || !String(text).trim()) return
  stop()
  const u = new window.SpeechSynthesisUtterance(String(text).trim())
  u.rate = options.rate ?? 1
  u.pitch = options.pitch ?? 1
  if (options.lang) u.lang = options.lang
  if (typeof options.onEnd === 'function') u.onend = options.onEnd
  window.speechSynthesis.speak(u)
}

/**
 * Speech-to-text via Web Speech API (SpeechRecognition).
 * Returns a promise that resolves with the transcript when speech recognition completes.
 * @param {object} options - Optional: { lang?: string, onStart?: () => void, onEnd?: () => void }
 * @returns {Promise<string>} - Transcript of recognized speech
 */
export function startListening(options = {}) {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('Speech recognition not available'))
      return
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      reject(new Error('Speech recognition not supported'))
      return
    }

    const recognition = new SpeechRecognition()
    if (options.lang) {
      recognition.lang = options.lang
    }
    recognition.interimResults = false
    recognition.maxAlternatives = 1

    recognition.onstart = () => {
      if (typeof options.onStart === 'function') {
        options.onStart()
      }
    }

    recognition.onresult = (event) => {
      let transcript = ''
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript
      }
      resolve(transcript)
    }

    recognition.onerror = (event) => {
      reject(new Error(event.error))
    }

    recognition.onend = () => {
      if (typeof options.onEnd === 'function') {
        options.onEnd()
      }
    }

    recognition.start()
  })
}
