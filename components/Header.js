'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Github, Linkedin, Wifi, Signal, Zap } from 'lucide-react'

export default function Header() {
  const [currentTime, setCurrentTime] = useState('')
  const [systemStatus, setSystemStatus] = useState('ONLINE')
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
    
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(now.toLocaleTimeString('en-US', { 
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }))
    }
    
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleLogoClick = () => {
    // Easter egg: toggle system status
    setSystemStatus(prev => prev === 'ONLINE' ? 'STANDBY' : 'ONLINE')
  }

  return (
    <header className="retro-card crt-container mb-8 p-4">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        {/* Main Logo/Brand Section */}
        <div className="flex items-center gap-4 min-w-0 flex-1">
          <div 
            className="w-12 h-12 md:w-16 md:h-16 retro-card static-noise flex items-center justify-center rounded-2xl cursor-pointer hover:scale-105 transition-transform duration-200 flex-shrink-0" 
            onClick={handleLogoClick}
          >
            <span className="font-retro text-xs md:text-sm glitch" data-text="CC">CT</span>
          </div>
          
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h1 className="text-lg md:text-xl font-terminal font-semibold text-terminal truncate">
                <span className="glitch" data-text="CORPORATE CONVERTER">
                  CORPORATE TRANSLATOR
                </span>
              </h1>
              <div className="retro-badge">v2.1</div>
            </div>
            <div className="flex items-center gap-3 text-xs font-terminal text-muted flex-wrap">
              <div className="flex items-center gap-1">
                <div className={`status-dot ${systemStatus === 'ONLINE' ? 'status-online' : 'status-processing'}`}></div>
                <span>{systemStatus}</span>
              </div>
              <div className="opacity-50 hidden sm:block">|</div>
              <div className="flex items-center gap-1">
                <Signal className="w-3 h-3" />
                <span className="hidden sm:inline">signal detected :: coherence = 0.993</span>
                <span className="sm:hidden">C→C</span>
              </div>
            </div>
          </div>
        </div>

        {/* System Info & Navigation */}
        <div className="flex items-center gap-3 md:gap-4 flex-shrink-0">
          {/* System Clock */}
          <div className="hidden lg:flex flex-col items-end">
            <div className="font-terminal text-sm text-terminal tracking-wider">
              {mounted ? currentTime : '--:--:--'}
            </div>
            <div className="font-terminal text-xs text-muted">
              SYS_TIME
            </div>
          </div>

          {/* Connection Status */}
          <div className="hidden md:flex items-center gap-2 px-3 py-2 retro-card">
            <Wifi className="w-4 h-4 text-terminal" />
            <div className="font-terminal text-xs">
              <div className="text-terminal">CONNECTED</div>
              <div className="text-muted opacity-60">API_READY</div>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-2">
            <Link 
              href="https://github.com/arindal1/corporate-translator" 
              target="_blank"
              aria-label="GitHub Repository" 
              className="retro-btn p-2 hover:scale-110 transition-transform"
            >
              <Github className="w-4 h-4" />
            </Link>
            <Link 
              href="https://linkedin.com/in/arindalchar" 
              target="_blank"
              aria-label="LinkedIn Profile" 
              className="retro-btn p-2 hover:scale-110 transition-transform"
            >
              <Linkedin className="w-4 h-4" />
            </Link>
          </div>

          {/* Power Indicator */}
          <div className="flex flex-col items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-terminal shadow-[0_0_10px_currentColor] animate-pulse"></div>
            <div className="font-terminal text-[8px] text-muted uppercase">PWR</div>
          </div>
        </div>
      </div>
      
      {/* Mobile-only time display */}
      <div className="lg:hidden mt-3 pt-3 border-t border-terminal/20">
        <div className="flex items-center justify-between text-xs font-terminal text-muted">
          <div className="flex items-center gap-2">
            <div className="status-dot status-online"></div>
            <span>SYSTEM TIME: {mounted ? currentTime : '--:--:--'}</span>
          </div>
          <div className="flex items-center gap-1">
            <Wifi className="w-3 h-3" />
            <span>READY</span>
          </div>
        </div>
      </div>
    </header>
  )
}