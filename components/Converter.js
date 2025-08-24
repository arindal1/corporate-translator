'use client'

import { useState, useRef, useEffect } from 'react'
import { Zap, Copy, RotateCcw, Terminal, Cpu } from 'lucide-react'

export default function Converter() {
  const [phase, setPhase] = useState('start') // 'start' | 'loading' | 'result'
  const [input, setInput] = useState('')
  const [result, setResult] = useState('')
  const [error, setError] = useState(null)
  const [copied, setCopied] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [sessionId, setSessionId] = useState('')
  const textareaRef = useRef(null)
  const matrixRef = useRef(null)

  // Generate session ID on client side only
  useEffect(() => {
    setSessionId(Math.random().toString(16).substr(2, 8).toUpperCase())
  }, [])

  // Matrix rain effect for loading
  useEffect(() => {
    if (phase === 'loading' && matrixRef.current) {
      const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン'
      const container = matrixRef.current

      const createChar = () => {
        const char = document.createElement('div')
        char.className = 'matrix-char'
        char.textContent = chars[Math.floor(Math.random() * chars.length)]
        char.style.left = Math.random() * 100 + '%'
        char.style.animationDelay = Math.random() * 3 + 's'
        char.style.animationDuration = (Math.random() * 3 + 2) + 's'
        container.appendChild(char)

        setTimeout(() => {
          if (container.contains(char)) {
            container.removeChild(char)
          }
        }, 5000)
      }

      const interval = setInterval(createChar, 100)
      return () => clearInterval(interval)
    }
  }, [phase])

  // Loading progress simulation
  useEffect(() => {
    if (phase === 'loading') {
      setLoadingProgress(0)
      const interval = setInterval(() => {
        setLoadingProgress((prev) => {
          if (prev >= 95) return prev
          return prev + Math.random() * 15
        })
      }, 200)
      return () => clearInterval(interval)
    }
  }, [phase])

  // helper: do the fetch with a timeout using AbortController
  async function fetchWithTimeout(url, options = {}, timeout = 10000) {
    const controller = new AbortController()
    const id = setTimeout(() => controller.abort(), timeout)
    try {
      const res = await fetch(url, { signal: controller.signal, ...options })
      clearTimeout(id)
      return res
    } catch (e) {
      clearTimeout(id)
      throw e
    }
  }

  async function handleSubmit(e) {
    e?.preventDefault()
    setError(null)
    if (!input.trim()) {
      setError('> ERROR: Input buffer empty. Please provide data to process.')
      return
    }

    try {
      setPhase('loading')
      setLoadingProgress(0)
      console.log('[TERMINAL] Initializing corporate conversion protocol...')

      const res = await fetchWithTimeout(
        '/api/generate',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: input }),
        },
        15000
      ) // 15s timeout

      // network-level failure
      if (!res) throw new Error('Connection terminated. Signal lost.')

      const data = await res.json().catch(() => null)
      console.log('[TERMINAL] Received transmission:', res.status, data)

      if (!res.ok) {
        const msg = data?.error || data?.message || `Server returned ${res.status}`
        setError(`> SYSTEM ERROR [${res.status}]: ${msg}`)
        setPhase('start')
        return
      }

      // Accept several shapes: {result: '...'} or a string
      const converted = data?.result ?? (typeof data === 'string' ? data : null)
      setResult(converted || JSON.stringify(data))
      setLoadingProgress(100)

      // Dramatic pause before showing result
      setTimeout(() => setPhase('result'), 800)
    } catch (err) {
      console.error('[TERMINAL] Fatal error:', err)
      if (err.name === 'AbortError') {
        setError('> TIMEOUT: Operation exceeded maximum processing time.')
      } else {
        setError(`> CRITICAL ERROR: ${err.message || 'Unknown system failure detected.'}`)
      }
      setPhase('start')
    }
  }

  function resetAll() {
    setInput('')
    setResult('')
    setPhase('start')
    setError(null)
    setLoadingProgress(0)
    setCopied(false)
    setSessionId(Math.random().toString(16).substr(2, 8).toUpperCase())
    textareaRef.current?.focus()
  }

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(result)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Copy failed:', err)
    }
  }

  // submit on Enter (no Shift)
  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  /* ---------------------------
     LAYOUT NOTE:
     - The outer container below has a stable minHeight so the page doesn't jump.
     - Each phase wrapper is absolutely positioned (inset-0) and centered via flex.
     - Active phase gets higher z-index to sit on top.
     - Inactive phases are opacity:0 + pointer-events:none to avoid interaction and visual presence.
     --------------------------- */

  return (
    <div
      className="w-full max-w-4xl mx-auto relative"
      // stable height for the converter area — adjust value if you need taller content
      style={{ minHeight: 420 }}
    >
      {/* Phase slot (absolute children will overlay each other here) */}
      {/* Input Phase */}
      <div
        className={`interface-transition absolute inset-0 flex items-center justify-center px-4 ${
          phase === 'start'
            ? 'opacity-100 translate-y-0 scale-100 z-30 pointer-events-auto'
            : 'opacity-0 -translate-y-2 scale-95 z-10 pointer-events-none'
        }`}
      >
        <div className="retro-card crt-container static-noise p-6 md:p-8 w-full">
          <div className="flex items-center gap-3 mb-6 flex-wrap">
            <div className="status-dot status-online"></div>
            <div className="font-terminal text-sm text-terminal">
              <span className="glitch" data-text="CORPORATE_CONVERTER_v2.1">
                CORPORATE_CONVERTER_v2.1
              </span>
            </div>
            <div className="retro-badge ml-auto">ONLINE</div>
          </div>

          <div className="mb-4">
            <label className="block text-xs font-terminal text-muted uppercase tracking-wider mb-2">
              &gt; Input Buffer [Casual Text]
            </label>
            <div className="relative">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={6}
                className="terminal-input resize-none"
                placeholder={"> Initialize input sequence...\n> Hey team, quick heads up...\n> Just wanted to let you know..."}
                disabled={phase === 'loading'}
              />
            </div>
          </div>

          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="font-terminal text-xs text-muted flex items-center gap-2">
              <Terminal className="w-3 h-3" />
              <span>Mode: CASUAL → CORPORATE</span>
            </div>
            <div className="button-group">
              <div className="font-terminal text-xs text-muted">Buffer: {input.length}/2048</div>
              <button
                type="button"
                onClick={handleSubmit}
                className="retro-btn retro-shimmer"
                disabled={phase === 'loading' || !input.trim()}
              >
                <Zap className="w-3 h-3" />
                Execute
              </button>
            </div>
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
              <p className="font-terminal text-sm text-red-400">{error}</p>
            </div>
          )}
        </div>
      </div>

      {/* Processing Phase */}
      <div
        className={`interface-transition absolute inset-0 flex items-center justify-center px-4 ${
          phase === 'loading'
            ? 'opacity-100 translate-y-0 scale-100 z-30 pointer-events-auto'
            : 'opacity-0 -translate-y-2 scale-95 z-10 pointer-events-none'
        }`}
      >
        <div className="retro-card crt-container p-6 md:p-8 relative overflow-hidden w-full">
          <div ref={matrixRef} className="matrix-rain"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-6 flex-wrap">
              <div className="w-12 h-12 md:w-16 md:h-16 retro-card flex items-center justify-center">
                <Cpu className="w-6 h-6 md:w-8 md:h-8 text-terminal animate-spin" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <div className="status-dot status-processing"></div>
                  <div className="font-terminal text-sm text-terminal glitch" data-text="PROCESSING...">
                    PROCESSING...
                  </div>
                </div>
                <div className="font-terminal text-xs text-muted">
                  Analyzing linguistic patterns and corporate syntax structures
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="glitch-progress">
                <div
                  className="bg-gradient-to-r from-terminal via-neon-blue to-terminal transition-all duration-300"
                  style={{ width: `${loadingProgress}%` }}
                />
              </div>

              <div className="font-terminal text-xs text-muted feature-grid">
                <div className="enhanced-loading">
                  <span className="status-dot status-processing"></span>Tokenizing input
                  <span className="loading-dots"></span>
                </div>
                <div className="enhanced-loading">
                  <span className="status-dot status-processing"></span>Neural processing
                  <span className="loading-dots"></span>
                </div>
                <div className="enhanced-loading">
                  <span className="status-dot status-processing"></span>Formatting output
                  <span className="loading-dots"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Result Phase */}

<div
  className={`interface-transition absolute inset-0 flex items-center justify-center px-4 ${
    phase === 'result'
      ? 'opacity-100 translate-y-0 scale-100 z-30 pointer-events-auto'
      : 'opacity-0 -translate-y-2 scale-95 z-10 pointer-events-none'
  }`}
>
  <div className="retro-card crt-container static-noise p-6 md:p-8 w-full">
    <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
      <div className="flex items-center gap-3">
        <div className="status-dot status-online"></div>
        <div>
          <div className="font-terminal text-sm text-terminal">CONVERSION COMPLETE</div>
          <div className="font-terminal text-xs text-muted">Output buffer ready for extraction</div>
        </div>
      </div>

      <div className="button-group">
        <button onClick={copyToClipboard} className="retro-btn retro-shimmer">
          <Copy className="w-3 h-3" />
          {copied ? 'Copied!' : 'Extract'}
        </button>
        <button
          onClick={resetAll}
          className="retro-btn"
          style={{ background: 'linear-gradient(135deg, rgba(255,170,0,0.1), rgba(255,68,68,0.05))' }}
        >
          <RotateCcw className="w-3 h-3" />
          Reset
        </button>
      </div>
    </div>

    {/* Label + badge row: badge moved outside the textarea */}
    <div className="mb-4">
      <div className="flex items-start justify-between gap-4">
        <label className="block text-xs font-terminal text-muted uppercase tracking-wider">
          &gt; Output Buffer [Corporate Text]
        </label>

        {/* Badge is now outside the textarea and aligned to the right */}
        <div className="flex-shrink-0">
          <div className="retro-badge text-xs">PROCESSED</div>
        </div>
      </div>

      <div className="relative mt-3">
        <textarea readOnly value={result} rows={6} className="terminal-input bg-black/80 resize-none border-terminal text-terminal" />
      </div>
    </div>

    <div className="flex items-center justify-between text-xs font-terminal text-muted flex-wrap gap-4">
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <Terminal className="w-3 h-3" />
          <span>Output Length: {result.length} chars</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="status-dot status-online"></div>
          <span>Status: Ready</span>
        </div>
      </div>
      <div className="font-terminal text-xs opacity-60">Session ID: {sessionId || 'INITIALIZING'}</div>
    </div>
  </div>
</div>

    </div>
  )
}
