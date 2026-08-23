import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ContributionStatsChart({ dailyData = [], loading = false }) {
  const [hoveredPoint, setHoveredPoint] = useState(null)

  // Safe data extraction
  const data = Array.isArray(dailyData) ? dailyData : []
  const isLoading = loading

  const counts = data.map(d => (d && typeof d.count === 'number' && !isNaN(d.count)) ? d.count : 0)
  const rawMax = Math.max(...counts, 0)
  const maxVal = Math.max(isNaN(rawMax) ? 0 : rawMax, 3)

  // Clean Y-axis ticks: 3 or 4 clean evenly spaced integers
  const yTicks = maxVal <= 4 
    ? Array.from({ length: maxVal + 1 }, (_, i) => maxVal - i)
    : [maxVal, Math.round(maxVal * 0.66), Math.round(maxVal * 0.33), 0]

  // Chart dimensions & margins
  const width = 360
  const height = 105
  const padLeft = 24
  const padRight = 10
  const padTop = 12
  const padBottom = 20

  const plotW = width - padLeft - padRight
  const plotH = height - padTop - padBottom

  // Calculate coordinates with zero-division safety
  const divisor = Math.max(data.length - 1, 1)
  const points = data.map((d, i) => {
    const count = d && typeof d.count === 'number' && !isNaN(d.count) ? d.count : 0
    const dayNumber = d?.dayNumber ?? (i + 1)
    const x = padLeft + (i / divisor) * plotW
    const y = padTop + plotH - (count / maxVal) * plotH
    return { ...d, dayNumber, count, x: isNaN(x) ? padLeft : x, y: isNaN(y) ? padTop : y, index: i }
  })

  // Generate smooth SVG curve path (Catmull-Rom to Cubic Bezier)
  const buildSmoothPath = (pts) => {
    if (pts.length === 0) return ''
    if (pts.length === 1) return `M ${pts[0].x} ${pts[0].y}`

    let d = `M ${pts[0].x} ${pts[0].y}`
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = i > 0 ? pts[i - 1] : pts[i]
      const p1 = pts[i]
      const p2 = pts[i + 1]
      const p3 = i < pts.length - 2 ? pts[i + 2] : p2

      const cp1x = p1.x + (p2.x - p0.x) / 6
      const cp1y = p1.y + (p2.y - p0.y) / 6

      const cp2x = p2.x - (p3.x - p1.x) / 6
      const cp2y = p2.y - (p3.y - p1.y) / 6

      d += ` C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)}, ${cp2x.toFixed(2)} ${cp2y.toFixed(2)}, ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`
    }
    return d
  }

  const linePath = buildSmoothPath(points)
  const areaPath = points.length > 0 
    ? `${linePath} L ${points[points.length - 1].x} ${padTop + plotH} L ${points[0].x} ${padTop + plotH} Z`
    : ''

  // Filter X-axis labels to avoid congestion
  const xTickInterval = Math.max(Math.floor(data.length / 7), 1)

  const fontStyle = {
    fontFamily: "'JetBrains Mono', 'Fira Code', ui-monospace, SFMono-Regular, Menlo, monospace",
    fontWeight: 500,
  }

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="flex flex-col w-full font-mono select-none relative h-full justify-center"
        >
          <div className="relative w-full aspect-[360/105] flex items-center justify-center">
            <svg viewBox="0 0 360 117" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="shimmerGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#c28000" stopOpacity="0.14" />
                  <stop offset="100%" stopColor="#c28000" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Y-Axis Skeleton Ticks & Dotted Grid Lines */}
              {[12, 8, 4, 0].map((val, idx) => {
                const y = 12 + (idx / 3) * 73
                return (
                  <g key={val}>
                    <text
                      x={18}
                      y={y + 3}
                      textAnchor="end"
                      fill="#3f3f46"
                      fontSize="8"
                      style={fontStyle}
                    >
                      {val}
                    </text>
                    <line
                      x1="24"
                      y1={y}
                      x2="350"
                      y2={y}
                      stroke="#27272a"
                      strokeWidth="0.8"
                      strokeDasharray="2 2"
                    />
                  </g>
                )
              })}

              {/* Vertical dotted grid lines */}
              {[24, 70, 116, 162, 208, 254, 300, 350].map((xVal, i) => (
                <line
                  key={i}
                  x1={xVal}
                  y1="12"
                  x2={xVal}
                  y2="85"
                  stroke="#27272a"
                  strokeWidth="0.7"
                  strokeDasharray="2 2"
                />
              ))}

              {/* Smooth Skeleton Area & Wave Line */}
              <g className="animate-pulse">
                <path
                  d="M 24 75 C 65 30, 95 75, 130 40 C 170 15, 200 60, 240 32 C 280 18, 315 50, 350 25 L 350 85 L 24 85 Z"
                  fill="url(#shimmerGradient)"
                />
                <path
                  d="M 24 75 C 65 30, 95 75, 130 40 C 170 15, 200 60, 240 32 C 280 18, 315 50, 350 25"
                  fill="none"
                  stroke="#c28000"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeOpacity="0.7"
                />

                {/* Subtle Nodes */}
                {[
                  { x: 24, y: 75 },
                  { x: 70, y: 35 },
                  { x: 116, y: 65 },
                  { x: 162, y: 25 },
                  { x: 208, y: 55 },
                  { x: 254, y: 32 },
                  { x: 300, y: 42 },
                  { x: 350, y: 25 },
                ].map((pt, i) => (
                  <circle
                    key={i}
                    cx={pt.x}
                    cy={pt.y}
                    r="2.2"
                    fill="#3d2800"
                    stroke="#c28000"
                    strokeWidth="1"
                  />
                ))}
              </g>

              {/* X-Axis Skeleton Day Numbers */}
              {[27, 31, 4, 8, 12, 16, 20, 23].map((day, idx) => {
                const x = 24 + (idx / 7) * 326
                return (
                  <text
                    key={idx}
                    x={x}
                    y={94.5}
                    textAnchor="middle"
                    fill="#3f3f46"
                    fontSize="7.5"
                    style={fontStyle}
                  >
                    {day}
                  </text>
                )
              })}
            </svg>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="loaded"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, ease: [0.25, 1, 0.5, 1] }}
          className="flex flex-col w-full font-mono select-none relative"
        >
          {/* Chart Canvas */}
          <div className="relative w-full" style={{ minHeight: 105 }}>
            <svg 
              viewBox={`0 0 ${width} ${height + 12}`} 
              className="w-full h-full overflow-visible"
            >
              <defs>
                <linearGradient id="amberCurveGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#c28000" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="#c28000" stopOpacity="0.0" />
                </linearGradient>
                <filter id="amberGlowEffect" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="0" stdDeviation="1" floodColor="#c28000" floodOpacity="0.25" />
                </filter>
              </defs>

              {/* Y-Axis Clean Numeric Ticks & Dotted Grid Lines */}
              {yTicks.map((val) => {
                const y = padTop + plotH - (val / maxVal) * plotH
                return (
                  <g key={val}>
                    <text
                      x={padLeft - 6}
                      y={y + 3}
                      textAnchor="end"
                      fill="#71717a"
                      fontSize="8"
                      style={fontStyle}
                    >
                      {val}
                    </text>
                    {/* Horizontal dotted grid line */}
                    <line
                      x1={padLeft}
                      y1={y}
                      x2={width - padRight}
                      y2={y}
                      stroke="#3f3f46"
                      strokeWidth="0.8"
                      strokeDasharray="2 2"
                      strokeOpacity="0.85"
                    />
                  </g>
                )
              })}

              {/* Vertical dotted lines for all day columns */}
              {points.map((pt, idx) => (
                <line
                  key={idx}
                  x1={pt.x}
                  y1={padTop}
                  x2={pt.x}
                  y2={padTop + plotH}
                  stroke="#3f3f46"
                  strokeWidth="0.7"
                  strokeDasharray="2 2"
                  strokeOpacity="0.75"
                />
              ))}

              {/* Smooth Warm Amber Filled Area */}
              {areaPath && (
                <path
                  d={areaPath}
                  fill="url(#amberCurveGradient)"
                />
              )}

              {/* Smooth Warm Golden Amber Wave Line */}
              {linePath && (
                <path
                  d={linePath}
                  fill="none"
                  stroke="#c28000"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#amberGlowEffect)"
                />
              )}

              {/* Data Points (Dots) & X-Axis Labels */}
              {points.map((pt, idx) => {
                const isHovered = hoveredPoint?.index === idx
                const showXLabel = idx % xTickInterval === 0 || idx === points.length - 1

                return (
                  <g key={idx} className="cursor-pointer">
                    {/* X-axis day numbers */}
                    {showXLabel && (
                      <text
                        x={pt.x}
                        y={padTop + plotH + 9.5}
                        textAnchor="middle"
                        fill="#71717a"
                        fontSize="7.5"
                        style={fontStyle}
                      >
                        {pt.dayNumber}
                      </text>
                    )}

                    {/* Visible Data Dot */}
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={isHovered ? 3.6 : 2.2}
                      fill={isHovered ? '#ffdd00' : '#3d2800'}
                      stroke={isHovered ? '#ffdd00' : '#c28000'}
                      strokeWidth={isHovered ? 1.5 : 1}
                      style={{ transition: 'all 150ms ease' }}
                      onMouseEnter={() => setHoveredPoint(pt)}
                      onMouseLeave={() => setHoveredPoint(null)}
                    />
                  </g>
                )
              })}
            </svg>

            {/* Dynamic Tooltip on Dot Hover */}
            {hoveredPoint && (
              <div
                className="pointer-events-none absolute z-30 px-2.5 py-1.5 rounded-[5px] bg-[#0a0a0a] border border-zinc-800 text-[10px] shadow-lg whitespace-nowrap"
                style={{
                  left: `${(hoveredPoint.x / width) * 100}%`,
                  top: `${(hoveredPoint.y / height) * 100}%`,
                  transform: 'translate(-50%, -130%)',
                }}
              >
                <div className="text-zinc-400 text-[9px] leading-none mb-1">{hoveredPoint.date}</div>
                <div className="font-bold text-white leading-none">
                  <span className="text-[#ffdd00]">{hoveredPoint.count}</span>
                  <span className="text-zinc-400 font-normal"> contribution{hoveredPoint.count !== 1 ? 's' : ''}</span>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
