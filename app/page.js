import Header from '../components/Header'
import Converter from '../components/Converter'

export default function Page() {
  return (
    <main className="relative">
      {/* Background ambient effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-terminal rounded-full opacity-30 animate-pulse" style={{animationDelay: '0s'}}></div>
        <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-neon-blue rounded-full opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-1/3 left-1/2 w-1 h-1 bg-neon-purple rounded-full opacity-25 animate-pulse" style={{animationDelay: '4s'}}></div>
        
        {/* Ambient light rays */}
        <div className="absolute top-0 left-1/4 w-px h-32 bg-gradient-to-b from-terminal/10 to-transparent rotate-12 animate-pulse"></div>
        <div className="absolute top-0 right-1/4 w-px h-24 bg-gradient-to-b from-neon-blue/10 to-transparent -rotate-12 animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <Header />
        
        {/* System Status Bar */}
        <div className="mb-6 px-4 py-3 retro-card bg-black/30">
          <div className="status-bar font-terminal text-xs">
            <div className="flex items-center gap-4 text-muted flex-wrap">
              <div className="flex items-center gap-2">
                <div className="status-dot status-online"></div>
                <span>NEURAL_NETWORK: ACTIVE</span>
              </div>
              <div className="opacity-50 hidden sm:block">|</div>
              <div className="flex items-center gap-2">
                <div className="status-dot status-online"></div>
                <span>API_CONNECTION: STABLE</span>
              </div>
              <div className="opacity-50 hidden sm:block">|</div>
              <div className="hidden md:block">PROCESSING_UNITS: 4/4</div>
            </div>
            
            <div className="flex items-center gap-4 text-muted flex-wrap">
              <div className="hidden sm:block">UPTIME: 24:07:45</div>
              <div className="opacity-50 hidden sm:block">|</div>
              <div className="text-terminal font-semibold">READY</div>
            </div>
          </div>
        </div>

        {/* Main Converter Interface */}
        <div className="converter-interface">
          <Converter />
        </div>
        
        {/* System Performance Metrics */}
        <div className="mt-12 info-grid">
          <div className="retro-card p-4 text-center">
            <div className="font-terminal text-xs text-muted uppercase tracking-wider mb-2">Processing Speed</div>
            <div className="font-terminal text-2xl text-terminal mb-1">~2.3s</div>
            <div className="font-terminal text-xs text-muted">Average Response Time</div>
          </div>
          
          <div className="retro-card p-4 text-center">
            <div className="font-terminal text-xs text-muted uppercase tracking-wider mb-2">Accuracy Rate</div>
            <div className="font-terminal text-2xl text-terminal mb-1">97.8%</div>
            <div className="font-terminal text-xs text-muted">Professional Conversion</div>
          </div>
          
          <div className="retro-card p-4 text-center">
            <div className="font-terminal text-xs text-muted uppercase tracking-wider mb-2">System Load</div>
            <div className="font-terminal text-2xl text-terminal mb-1">23%</div>
            <div className="font-terminal text-xs text-muted">Current Utilization</div>
          </div>
        </div>
      </div>
    </main>
  )
}