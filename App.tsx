import { useState } from "react"

function Icon({
  d,
  size = 16,
  stroke = "currentColor",
  fill = "none",
  strokeWidth = 1.75,
}: {
  d: string
  size?: number
  stroke?: string
  fill?: string
  strokeWidth?: number
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={d} />
    </svg>
  )
}

const ICONS = {
  home: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10",
  map: "M1 6v16l7-4 8 4 7-4V2l-7 4-8-4-7 4z M8 2v16 M16 6v16",
  search2: "M11 4a7 7 0 100 14 7 7 0 000-14z M21 21l-4.35-4.35",
  calendar:
    "M3 4h18a2 2 0 012 2v14a2 2 0 01-2 2H3a2 2 0 01-2-2V6a2 2 0 012-2z M16 2v4 M8 2v4 M2 10h20",
  backup: "M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4 M17 8l-5-5-5 5 M12 3v12",
  sparkle:
    "M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5L12 2z M5 17l.75 2.25L8 20l-2.25.75L5 23l-.75-2.25L2 20l2.25-.75L5 17z",
  shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  check: "M20 6L9 17l-5-5",
  clock: "M12 22a10 10 0 100-20 10 10 0 000 20z M12 6v6l4 2",
  chevronDown: "M6 9l6 6 6-6",
  chevronRight: "M9 18l6-6-6-6",
  arrowRight: "M5 12h14 M12 5l7 7-7 7",
  book: "M4 19.5A2.5 2.5 0 016.5 17H20 M4 19.5A2.5 2.5 0 006.5 22H20V2H6.5A2.5 2.5 0 004 4.5v15z",
  wand: "M15 4l5 5-11.5 11.5a2 2 0 01-1.4.5H5v-2.5a2 2 0 01.5-1.4L15 4z M8 7l9 9",
  question:
    "M12 22a10 10 0 100-20 10 10 0 000 20z M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3 M12 17h.01",
  courses:
    "M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z",
  grad: "M22 10v6M2 10l10-5 10 5-10 5z M6 12v5c3 3 9 3 12 0v-5",
  briefcase:
    "M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2",
  upload: "M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4 M17 8l-5-5-5 5 M12 3v12",
  plus: "M12 5v14 M5 12h14",
  warning:
    "M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z M12 9v4 M12 17h.01",
  alert: "M12 22a10 10 0 100-20 10 10 0 000 20z M12 8v4 M12 16h.01",
  sliders:
    "M4 21v-7 M4 10V3 M12 21v-9 M12 8V3 M20 21v-5 M20 12V3 M1 14h6 M9 8h6 M17 16h6",
  externalLink:
    "M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6 M15 3h6v6 M10 14L21 3",
}

// ─── Design tokens ────────────────────────────────────────────────────────────
const T = {
  canvas: "#121824",
  sidebar: "#1A2235",
  card: "#212B3D",
  cardAlt: "#283246",
  cardBorder: "#3B4A66",
  cyan: "#38BDF8",
  cyanDim: "rgba(56,189,248,0.12)",
  cyanBorder: "rgba(56,189,248,0.25)",
  mint: "#10B981",
  amber: "#F59E0B",
  gold: "#FACC15",
  textPrimary: "#FFFFFF",
  textSecondary: "#E2E8F0",
  textMuted: "#CBD5E1",
  hoverBg: "rgba(59,74,102,0.45)",
  focusRing: "0 0 0 2px #38BDF8",
  radius: 14,
  radiusSm: 10,
  radiusXs: 8,
}

// ─── Shared: Donut Chart ──────────────────────────────────────────────────────
function DonutChart({
  pct = 68,
  size = 130,
  strokeW = 13,
}: {
  pct?: number
  size?: number
  strokeW?: number
}) {
  const r = size / 2 - strokeW
  const circ = 2 * Math.PI * r
  const dash = (pct / 100) * circ
  const c = size / 2
  const gradId = `ringGrad-${size}`
  return (
    <div
      style={{ position: "relative", width: size, height: size, flexShrink: 0 }}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#0284C7" />
          </linearGradient>
        </defs>
        <circle
          cx={c}
          cy={c}
          r={r}
          fill="none"
          stroke="rgba(59,74,102,0.5)"
          strokeWidth={strokeW}
        />
        <circle
          cx={c}
          cy={c}
          r={r}
          fill="none"
          stroke={`url(#${gradId})`}
          strokeWidth={strokeW}
          strokeDasharray={`${dash} ${circ - dash}`}
          strokeDashoffset={circ / 4}
          strokeLinecap="round"
        />
      </svg>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontSize: size * 0.17,
            fontWeight: 700,
            letterSpacing: -1,
            lineHeight: 1,
            color: "#fff",
          }}
        >
          {pct}%
        </span>
        <span
          style={{
            fontSize: size * 0.085,
            color: T.textMuted,
            fontWeight: 500,
            marginTop: 2,
          }}
        >
          Complete
        </span>
      </div>
    </div>
  )
}

// ─── Shared: Progress Bar ─────────────────────────────────────────────────────
function ProgressBar({
  pct,
  color = "#38BDF8",
}: {
  pct: number
  color?: string
}) {
  return (
    <div
      style={{
        height: 4,
        background: "rgba(59,74,102,0.5)",
        borderRadius: 999,
        overflow: "hidden",
        flex: 1,
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${pct}%`,
          background: `linear-gradient(90deg, ${color}, ${
            color === "#38BDF8" ? "#0284C7" : color
          })`,
          borderRadius: 999,
        }}
      />
    </div>
  )
}

// ─── Shared: Nav Item ─────────────────────────────────────────────────────────
function NavItem({
  icon,
  label,
  active,
  onClick,
}: {
  icon: string
  label: string
  active?: boolean
  onClick?: () => void
}) {
  const [hov, setHov] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        width: "100%",
        padding: "9px 12px",
        borderRadius: 8,
        border: "none",
        cursor: "pointer",
        background: active ? "#1E3A52" : hov ? "#283246" : "transparent",
        color: active ? "#38BDF8" : hov ? "#FFFFFF" : "#CBD5E1",
        fontSize: 13.5,
        fontWeight: active ? 600 : 400,
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        transition: "all 0.15s ease-out",
      }}
    >
      <Icon
        d={ICONS[(icon as keyof typeof ICONS)]}
        size={15}
        stroke={active ? "#38BDF8" : hov ? "#fff" : "#64748B"}
      />
      {label}
      {active && (
        <div
          style={{
            marginLeft: "auto",
            width: 5,
            height: 5,
            borderRadius: "50%",
            background: "#38BDF8",
          }}
        />
      )}
    </button>
  )
}

// ─── Shared: Sidebar ──────────────────────────────────────────────────────────
function Sidebar({
  activeNav,
  setActiveNav,
  onOpenAssistant,
}: {
  activeNav: string
  setActiveNav: (v: string) => void
  onOpenAssistant: () => void
}) {
  const navItems = [
    { icon: "home", label: "Overview" },
    { icon: "map", label: "Degree Planner" },
    { icon: "courses", label: "Course Explorer" },
    { icon: "calendar", label: "Schedule Builder" },
    { icon: "backup", label: "Backup Plans" },
  ]
  return (
    <aside
      style={{
        width: 260,
        flexShrink: 0,
        minHeight: "100%",
        background: "#1A2235",
        borderRight: "1px solid rgba(59,74,102,0.5)",
        display: "flex",
        flexDirection: "column",
        padding: "0 14px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "22px 4px 18px",
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 9,
            background: "linear-gradient(135deg, #0284C7, #38BDF8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 14,
            fontWeight: 800,
            color: "#fff",
            boxShadow: "0 0 14px rgba(56,189,248,0.3)",
          }}
        >
          S
        </div>
        <span
          style={{
            fontWeight: 800,
            fontSize: 17,
            letterSpacing: -0.5,
            color: "#FFFFFF",
          }}
        >
          Slugpath
        </span>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          background: "rgba(59,74,102,0.3)",
          border: "1px solid #3B4A66",
          borderRadius: 10,
          padding: "10px 12px",
          margin: "0 0 20px",
          cursor: "pointer",
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #0A4B6E, #0284C7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 12,
            fontWeight: 800,
            color: "#fff",
            flexShrink: 0,
            boxShadow: "0 0 10px rgba(56,189,248,0.3)",
          }}
        >
          MR
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: "#FFFFFF",
              lineHeight: 1.2,
            }}
          >
            Maya Rivera
          </div>
          <div
            style={{
              fontSize: 11,
              color: "#94A3B8",
              marginTop: 2,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            Computer Science B.S.
          </div>
        </div>
        <Icon d={ICONS.chevronDown} size={14} stroke="#94A3B8" />
      </div>

      <nav
        style={{ display: "flex", flexDirection: "column", gap: 2, flex: 1 }}
      >
        <div
          style={{
            fontSize: 10,
            color: "#94A3B8",
            fontWeight: 700,
            letterSpacing: 1,
            textTransform: "uppercase",
            padding: "2px 12px 8px",
          }}
        >
          Menu
        </div>
        {navItems.map((n) => (
          <NavItem
            key={n.label}
            icon={n.icon}
            label={n.label}
            active={activeNav === n.label}
            onClick={() => setActiveNav(n.label)}
          />
        ))}
      </nav>

      <div
        onClick={onOpenAssistant}
        style={{
          borderRadius: 12,
          padding: "14px 16px",
          margin: "16px 0",
          cursor: "pointer",
          background: "rgba(30,58,138,0.25)",
          borderTop: "1px solid #38BDF8",
          borderRight: "1px solid #38BDF8",
          borderBottom: "1px solid #38BDF8",
          borderLeft: "1px solid #38BDF8",
          boxShadow: "0 0 14px rgba(56,189,248,0.15)",
          transition: "box-shadow 0.2s ease",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 5,
          }}
        >
          <div
            style={{
              width: 26,
              height: 26,
              borderRadius: 7,
              background: "rgba(56,189,248,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon d={ICONS.sparkle} size={13} stroke="#38BDF8" />
          </div>
          <span style={{ fontSize: 13, fontWeight: 700, color: "#FFFFFF" }}>
            Ask the assistant
          </span>
        </div>
        <div style={{ fontSize: 11.5, color: "#CBD5E1", paddingLeft: 34 }}>
          Plan with context
        </div>
      </div>

      <div
        style={{
          padding: "0 4px 18px",
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <div
          style={{
            height: 1,
            background: "rgba(59,74,102,0.5)",
            margin: "0 0 4px",
          }}
        />
        <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
          <div
            style={{
              width: 22,
              height: 22,
              borderRadius: 6,
              background: "rgba(0,230,118,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              marginTop: 1,
            }}
          >
            <Icon
              d={ICONS.check}
              size={11}
              stroke="#00E676"
              strokeWidth={2.5}
            />
          </div>
          <div>
            <div style={{ fontSize: 11.5, fontWeight: 600, color: "#E2E8F0" }}>
              Official-first planning
            </div>
            <div style={{ fontSize: 10.5, color: "#94A3B8", marginTop: 1 }}>
              Unverified data available
            </div>
          </div>
        </div>
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "0 0 0 2px",
          }}
        >
          <Icon d={ICONS.question} size={14} stroke="#94A3B8" />
          <span style={{ fontSize: 11.5, color: "#94A3B8" }}>
            Help & Sources
          </span>
        </button>
      </div>
    </aside>
  )
}
// ─── Shared: Header ───────────────────────────────────────────────────────────
function Header({
  crumbs,
  crumbNav,
  searchPlaceholder = "Search courses…",
}: {
  crumbs: string[]
  crumbNav?: (crumb: string) => void
  searchPlaceholder?: string
}) {
  return (
    <header
      style={{
        height: 64,
        flexShrink: 0,
        borderBottom: "1px solid rgba(59,74,102,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 32px",
        background: "rgba(11,15,23,0.85)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        {crumbs.map((c, i) => {
          const isLast = i === crumbs.length - 1
          const clickable = !isLast && crumbNav
          return (
            <span
              key={c}
              style={{ display: "flex", alignItems: "center", gap: 6 }}
            >
              {i > 0 && (
                <Icon d={ICONS.chevronRight} size={12} stroke="#94A3B8" />
              )}
              <span
                onClick={() => clickable && crumbNav(c)}
                style={{
                  fontSize: 13,
                  fontWeight: isLast ? 600 : 400,
                  color: isLast ? "#F1F5F9" : "#64748B",
                  cursor: clickable ? "pointer" : "default",
                  transition: "color 0.15s",
                }}
                onMouseEnter={(e) => {
                  if (clickable)
                    (e.currentTarget as HTMLElement).style.color = "#F1F5F9"
                }}
                onMouseLeave={(e) => {
                  if (clickable)
                    (e.currentTarget as HTMLElement).style.color = "#64748B"
                }}
              >
                {c}
              </span>
            </span>
          )
        })}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(59,74,102,0.3)",
            border: "1px solid #3B4A66",
            borderRadius: 999,
            padding: "8px 16px",
            width: 230,
            cursor: "text",
          }}
        >
          <Icon d={ICONS.search2} size={14} stroke="#94A3B8" />
          <span style={{ fontSize: 13, color: "#94A3B8" }}>
            {searchPlaceholder}
          </span>
        </div>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #0A4B6E, #0284C7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 12,
            fontWeight: 800,
            cursor: "pointer",
            boxShadow: "0 0 10px rgba(56,189,248,0.3)",
          }}
        >
          MR
        </div>
      </div>
    </header>
  )
}

// ─── PAGE 1: Overview ─────────────────────────────────────────────────────────
function StatPill({
  value,
  sub,
  label,
}: {
  value: string
  sub?: string
  label: string
}) {
  return (
    <div
      style={{
        flex: 1,
        textAlign: "center",
        padding: "12px 10px",
        background: "#212B3D",
        borderRadius: 10,
        border: "1px solid #3B4A66",
      }}
    >
      <div
        style={{
          fontSize: 20,
          fontWeight: 800,
          letterSpacing: -0.5,
          lineHeight: 1,
        }}
      >
        {value}
        {sub && (
          <span
            style={{
              fontSize: 12,
              fontWeight: 500,
              color: "#CBD5E1",
              marginLeft: 3,
            }}
          >
            {sub}
          </span>
        )}
      </div>
      <div
        style={{
          fontSize: 10.5,
          color: "#94A3B8",
          marginTop: 5,
          fontWeight: 500,
        }}
      >
        {label}
      </div>
    </div>
  )
}

function CourseTag({
  name,
  color,
  time,
  room,
}: {
  name: string
  color: string
  time?: string
  room?: string
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 7,
        background: "#1E2A3B",
        borderTop: "1px solid #3B4A66",
        borderRight: "1px solid #3B4A66",
        borderBottom: "1px solid #3B4A66",
        borderLeft: `4px solid ${color}`,
        borderRadius: 6,
        padding: "6px 8px",
        marginBottom: 5,
      }}
    >
      <div>
        <div
          style={{
            fontSize: 10.5,
            fontWeight: 700,
            color,
            fontFamily: "JetBrains Mono",
            letterSpacing: 0.3,
          }}
        >
          {name}
        </div>
        {time && (
          <div style={{ fontSize: 10, color: "#CBD5E1", marginTop: 2 }}>
            {time} · {room}
          </div>
        )}
      </div>
    </div>
  )
}

function DayCard({
  day,
  date,
  events,
  active,
}: {
  day: string
  date: number
  active?: boolean
  events: { name: string color: string time?: string room?: string }[]
}) {
  return (
    <div
      style={{
        flex: 1,
        background: active ? "#1E2E42" : "#212B3D",
        borderRadius: 10,
        borderTop: active ? "1px solid #38BDF8" : "1px solid #3B4A66",
        borderRight: active ? "1px solid #38BDF8" : "1px solid #3B4A66",
        borderBottom: active ? "1px solid #38BDF8" : "1px solid #3B4A66",
        borderLeft: active ? "1px solid #38BDF8" : "1px solid #3B4A66",
        padding: "12px 10px",
        minHeight: 128,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          marginBottom: 10,
        }}
      >
        <span
          style={{
            fontSize: 9.5,
            color: "#CBD5E1",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: 1,
          }}
        >
          {day}
        </span>
        <span
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: active ? "#121824" : "#E2E8F0",
            background: active ? "#38BDF8" : "transparent",
            borderRadius: "50%",
            width: 26,
            height: 26,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: active ? "0 0 12px rgba(56,189,248,0.6)" : "none",
          }}
        >
          {date}
        </span>
      </div>
      {events.map((e, i) => (
        <CourseTag key={i} {...e} />
      ))}
    </div>
  )
}

function ReqRowOverview({
  label,
  done,
  total,
  color = "#38BDF8",
  onNavigate,
}: {
  label: string
  done: number
  total: number
  color?: string
  onNavigate?: () => void
}) {
  const [hov, setHov] = useState(false)
  const pct = total > 0 ? (done / total) * 100 : 0
  return (
    <div
      onClick={onNavigate}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "11px 8px",
        borderBottom: "1px solid rgba(59,74,102,0.3)",
        background: hov ? "#162235" : "transparent",
        borderRadius: 8,
        cursor: "pointer",
        transition: "background 0.15s",
      }}
    >
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: 7,
          flexShrink: 0,
          background: "rgba(6,182,212,0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon d={ICONS.book} size={13} stroke="#38BDF8" />
      </div>
      <span
        style={{
          fontSize: 12.5,
          color: "#E2E8F0",
          flex: "0 0 170px",
          fontWeight: 500,
        }}
      >
        {label}
      </span>
      <ProgressBar pct={pct} color={color} />
      <span
        style={{
          fontSize: 11,
          color: "#94A3B8",
          flexShrink: 0,
          fontFamily: "JetBrains Mono",
          minWidth: 32,
          textAlign: "right",
        }}
      >
        {done}/{total}
      </span>
      <span
        style={{
          transition: "transform 0.2s ease-in-out",
          transform: hov ? "translateX(4px)" : "translateX(0)",
        }}
      >
        <Icon
          d={ICONS.chevronRight}
          size={13}
          stroke={hov ? "#38BDF8" : "#64748B"}
        />
      </span>
    </div>
  )
}

function OverviewPage({ navigateTo }: { navigateTo: (p: string) => void }) {
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <Header crumbs={["Dashboard", "Overview"]} crumbNav={() => {}} />
      <div
        style={{
          flex: 1,
          overflow: "auto",
          padding: "24px 32px 32px",
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        {/* Welcome Banner */}
        <div
          style={{
            borderRadius: 16,
            position: "relative",
            padding: "32px 36px",
            background:
              "linear-gradient(120deg, #026AA7 0%, #0258A0 40%, #004C8C 100%)",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 40,
            minHeight: 140,
            overflow: "hidden",
          }}
        >
          {/* Glowing orbs */}
          <div
            style={{
              position: "absolute",
              right: 260,
              top: -50,
              width: 240,
              height: 240,
              borderRadius: "50%",
              background: "rgba(56,189,248,0.18)",
              filter: "blur(60px)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              right: 40,
              bottom: -40,
              width: 180,
              height: 180,
              borderRadius: "50%",
              background: "rgba(0,100,180,0.35)",
              filter: "blur(50px)",
              pointerEvents: "none",
            }}
          />
          {/* Star motifs */}
          {[...Array(28)].map((_, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                left: `${3 + ((i * 47) % 90)}%`,
                top: `${5 + ((i * 31) % 88)}%`,
                width: i % 5 === 0 ? 3 : 1.5,
                height: i % 5 === 0 ? 3 : 1.5,
                borderRadius: "50%",
                background: `rgba(255,255,255,${i % 3 === 0 ? 0.45 : 0.18})`,
                pointerEvents: "none",
              }}
            />
          ))}
          <div style={{ position: "relative", flex: 1 }}>
            <div
              style={{
                fontSize: 12.5,
                color: "rgba(255,255,255,0.75)",
                fontWeight: 500,
                marginBottom: 8,
                letterSpacing: 0.2,
              }}
            >
              Friday, July 24th
            </div>
            <div
              style={{
                fontSize: 30,
                fontWeight: 800,
                letterSpacing: -0.8,
                lineHeight: 1.2,
                marginBottom: 10,
                color: "#FFFFFF",
                whiteSpace: "nowrap",
              }}
            >
              Good Morning, Maya.
            </div>
            <div
              style={{
                fontSize: 13.5,
                color: "rgba(255,255,255,0.82)",
                lineHeight: 1.65,
              }}
            >
              Your Spring Plan is almost ready. One course still needs a backup.
            </div>
          </div>
          <button
            onClick={() => navigateTo("Degree Planner")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              flexShrink: 0,
              background: "#FBBF24",
              color: "#0B1320",
              border: "none",
              borderRadius: 999,
              padding: "13px 24px",
              fontSize: 13.5,
              fontWeight: 800,
              cursor: "pointer",
              boxShadow: "0 4px 20px rgba(251,191,36,0.45)",
              whiteSpace: "nowrap",
            }}
          >
            Continue Planning{" "}
            <Icon
              d={ICONS.arrowRight}
              size={15}
              stroke="#0B1320"
              strokeWidth={2.5}
            />
          </button>
        </div>

        {/* Middle Row */}
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}
        >
          {/* Degree Progress */}
          <div
            style={{
              background: "#212B3D",
              borderRadius: 16,
              border: "1px solid #3B4A66",
              padding: "24px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <div>
                <div
                  style={{ fontSize: 14, fontWeight: 700, color: "#FFFFFF" }}
                >
                  Degree Progress
                </div>
                <div style={{ fontSize: 11.5, color: "#94A3B8", marginTop: 3 }}>
                  Computer Science B.S.
                </div>
              </div>
              <button
                style={{
                  background: "rgba(59,74,102,0.5)",
                  border: "1px solid #3B4A66",
                  borderRadius: 7,
                  width: 30,
                  height: 30,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#94A3B8",
                  fontSize: 16,
                  fontWeight: 700,
                }}
              >
                ···
              </button>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 24,
                marginBottom: 20,
              }}
            >
              <DonutChart pct={68} />
              <div style={{ flex: 1, display: "flex", gap: 10 }}>
                <StatPill value="91" sub="/180" label="Credits Earned" />
                <StatPill value="14" label="Requirements Left" />
                <StatPill value="Sp '27" label="Graduation" />
              </div>
            </div>
            <div
              style={{
                paddingTop: 14,
                borderTop: "1px solid rgba(59,74,102,0.5)",
              }}
            >
              <button
                onClick={() => navigateTo("Degree Planner")}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  color: "#38BDF8",
                  fontSize: 12.5,
                  fontWeight: 600,
                  transition: "all 0.15s",
                }}
              >
                View Degree Map{" "}
                <Icon
                  d={ICONS.arrowRight}
                  size={13}
                  stroke="#38BDF8"
                  strokeWidth={2}
                />
              </button>
            </div>
          </div>

          {/* Next Action */}
          <div
            style={{
              background: "#212B3D",
              borderRadius: 16,
              border: "1px solid #3B4A66",
              padding: "24px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: 16,
              }}
            >
              <div style={{ fontSize: 14, fontWeight: 700, color: "#FFFFFF" }}>
                Recommended Next Action
              </div>
              <span
                style={{
                  fontSize: 10.5,
                  fontWeight: 700,
                  color: "#FFB703",
                  background: "rgba(255,183,3,0.1)",
                  border: "1px solid rgba(255,183,3,0.22)",
                  borderRadius: 999,
                  padding: "3px 10px",
                  letterSpacing: 0.3,
                }}
              >
                Priority
              </span>
            </div>
            <div style={{ marginBottom: 14 }}>
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 800,
                  marginBottom: 8,
                  letterSpacing: -0.4,
                  color: "#FFFFFF",
                  lineHeight: 1.2,
                }}
              >
                Add a backup for CSE 101
              </div>
              <div style={{ fontSize: 13, color: "#CBD5E1", lineHeight: 1.65 }}>
                CSE 101 is important for your Fall sequence. Build a second
                schedule before your enrollment appointment.
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 9,
                background: "rgba(255,183,3,0.06)",
                border: "1px solid rgba(255,183,3,0.12)",
                borderRadius: 9,
                padding: "10px 14px",
                marginBottom: 16,
              }}
            >
              <Icon d={ICONS.clock} size={14} stroke="#FFB703" />
              <span
                style={{ fontSize: 12.5, color: "#FFD97D", fontWeight: 600 }}
              >
                Enrollment Appointment: Aug 5 – 11:00 AM
              </span>
            </div>
            <button
              onClick={() => navigateTo("Backup Plans")}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                background: "rgba(59,74,102,0.5)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 999,
                padding: "12px 20px",
                color: "#fff",
                fontSize: 13.5,
                fontWeight: 600,
                cursor: "pointer",
                marginTop: "auto",
              }}
            >
              <Icon d={ICONS.wand} size={15} stroke="#FFB703" /> Generate Backup
              Options
            </button>
          </div>
        </div>

        {/* Weekly Schedule */}
        <div
          style={{
            background: "#212B3D",
            borderRadius: 16,
            border: "1px solid #3B4A66",
            padding: "20px 24px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <div>
              <div
                style={{
                  display: "inline-block",
                  fontSize: 10,
                  color: "#38BDF8",
                  fontWeight: 700,
                  letterSpacing: 0.9,
                  textTransform: "uppercase",
                  background: "rgba(56,189,248,0.1)",
                  borderRadius: 999,
                  padding: "2px 9px",
                  marginBottom: 6,
                }}
              >
                Winter Quarter · Current
              </div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#FFFFFF" }}>
                This week
              </div>
            </div>
            <button
              onClick={() => navigateTo("Schedule Builder")}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#38BDF8",
                fontSize: 12.5,
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: 4,
                padding: 0,
              }}
            >
              Open Calendar{" "}
              <Icon d={ICONS.chevronRight} size={13} stroke="#38BDF8" />
            </button>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <DayCard
              day="MON"
              date={26}
              active
              events={[
                {
                  name: "CSE 13S",
                  color: "#38BDF8",
                  time: "9:20",
                  room: "J Baskin",
                },
                {
                  name: "ART 10 D",
                  color: "#FFB703",
                  time: "2:00",
                  room: "DARC",
                },
              ]}
            />
            <DayCard
              day="TUE"
              date={27}
              events={[
                {
                  name: "CSE 13S",
                  color: "#00E676",
                  time: "9:20",
                  room: "J Baskin",
                },
              ]}
            />
            <DayCard
              day="WED"
              date={28}
              events={[
                {
                  name: "CSE 13S",
                  color: "#38BDF8",
                  time: "9:20",
                  room: "J Baskin",
                },
                {
                  name: "ART 10 D",
                  color: "#FFB703",
                  time: "2:00",
                  room: "DARC",
                },
              ]}
            />
            <DayCard
              day="THU"
              date={29}
              events={[
                {
                  name: "CSE 13S",
                  color: "#00E676",
                  time: "9:20",
                  room: "J Baskin",
                },
              ]}
            />
            <DayCard
              day="FRI"
              date={30}
              events={[
                {
                  name: "CSE 13S",
                  color: "#38BDF8",
                  time: "9:20",
                  room: "J Baskin",
                },
              ]}
            />
          </div>
        </div>

        {/* Bottom Row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 18,
            paddingBottom: 4,
          }}
        >
          <div
            style={{
              background: "#212B3D",
              borderRadius: 16,
              border: "1px solid #3B4A66",
              padding: "24px",
            }}
          >
            <div style={{ marginBottom: 4 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#FFFFFF" }}>
                Remaining Requirements
              </div>
              <div style={{ fontSize: 11.5, color: "#94A3B8", marginTop: 3 }}>
                What's left to graduate
              </div>
            </div>
            <ReqRowOverview
              label="Major Core"
              done={5}
              total={8}
              color="#38BDF8"
              onNavigate={() => navigateTo("Degree Planner")}
            />
            <ReqRowOverview
              label="Upper Division Electives"
              done={3}
              total={8}
              color="#38BDF8"
              onNavigate={() => navigateTo("Degree Planner")}
            />
            <ReqRowOverview
              label="General Education"
              done={8}
              total={10}
              color="#38BDF8"
              onNavigate={() => navigateTo("Degree Planner")}
            />
            <ReqRowOverview
              label="DC Requirement"
              done={0}
              total={4}
              color="#475569"
              onNavigate={() => navigateTo("Degree Planner")}
            />
          </div>

          <div
            style={{
              background: "#212B3D",
              borderRadius: 16,
              border: "1px solid #3B4A66",
              padding: "24px",
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#FFFFFF" }}>
                Academic Assistant
              </div>
              <div style={{ fontSize: 11.5, color: "#94A3B8", marginTop: 3 }}>
                Plan with context
              </div>
            </div>
            <div
              style={{
                background: "#212B3D",
                border: "1px solid #3B4A66",
                borderRadius: 10,
                padding: "14px 16px",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 12,
                  left: 14,
                  fontSize: 28,
                  color: "#38BDF8",
                  opacity: 0.2,
                  lineHeight: 1,
                  fontFamily: "Georgia, serif",
                }}
              >
                "
              </div>
              <p
                style={{
                  fontSize: 13.5,
                  color: "#E2E8F0",
                  lineHeight: 1.65,
                  margin: "6px 0 8px",
                  fontStyle: "italic",
                  paddingLeft: 14,
                }}
              >
                Your current plan keeps CSE 101 before CSE 130 and leaves
                Tuesday mornings open for your commute preference.
              </p>
              <div style={{ fontSize: 11, color: "#94A3B8", paddingLeft: 14 }}>
                Aug 5 – 11:00 AM
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 6,
                  background: "rgba(0,230,118,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Icon
                  d={ICONS.check}
                  size={11}
                  stroke="#00E676"
                  strokeWidth={2.5}
                />
              </div>
              <span style={{ fontSize: 11.5, color: "#94A3B8" }}>
                Uses official requirements + your saved preferences
              </span>
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: "auto" }}>
              <button
                onClick={() => navigateTo("Degree Planner")}
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                  background: "rgba(56,189,248,0.1)",
                  border: "1px solid rgba(56,189,248,0.2)",
                  borderRadius: 999,
                  padding: "10px 12px",
                  color: "#38BDF8",
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
              >
                <Icon d={ICONS.grad} size={13} stroke="#38BDF8" /> Check
                graduation
              </button>
              <button
                onClick={() => navigateTo("Course Explorer")}
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                  background: "rgba(56,189,248,0.1)",
                  border: "1px solid rgba(56,189,248,0.2)",
                  borderRadius: 999,
                  padding: "10px 12px",
                  color: "#38BDF8",
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                <Icon d={ICONS.briefcase} size={13} stroke="#38BDF8" /> Career
                electives
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── PAGE 2: Degree Planner ───────────────────────────────────────────────────

type QuarterStatus = "completed" | "current" | "planning" | "suggested"

interface Quarter {
  label: string
  term: string
  units: number
  status: QuarterStatus
  courses: { code: string name: string }[]
}

const QUARTERS: Quarter[] = [
  {
    label: "COMPLETED",
    term: "Fall 2025",
    units: 15,
    status: "completed",
    courses: [
      { code: "CSE 30", name: "Programming Abstractions" },
      { code: "MATH 23A", name: "Vector Calculus" },
      { code: "WRIT 2", name: "Rhetoric & Inquiry" },
    ],
  },
  {
    label: "CURRENT",
    term: "Winter 2026",
    units: 15,
    status: "current",
    courses: [
      { code: "CSE 13S", name: "Computer Systems & C" },
      { code: "CSE 16", name: "Applied Discrete Math" },
      { code: "ART 10D", name: "Design Foundations" },
    ],
  },
  {
    label: "PLANNING",
    term: "Spring 2026",
    units: 15,
    status: "planning",
    courses: [
      { code: "CSE 101", name: "Data Structures & Algorithms" },
      { code: "STAT 131", name: "Probability Theory" },
      { code: "GE: ER", name: "Ethnicity & Race" },
    ],
  },
  {
    label: "SUGGESTED",
    term: "Fall 2026",
    units: 15,
    status: "suggested",
    courses: [
      { code: "CSE 130", name: "Computer Systems & C" },
      { code: "CSE 115A", name: "Applied Discrete Math" },
      { code: "Elective", name: "Design Foundations" },
    ],
  },
]

const STATUS_COLORS: Record<QuarterStatus, {
  border: string
  badge: string
  badgeBg: string
  dot: string
}> = {
  completed: {
    border: "rgba(34,197,94,0.3)",
    badge: "#00E676",
    badgeBg: "rgba(0,230,118,0.08)",
    dot: "#00E676",
  },
  current: {
    border: "rgba(56,189,248,0.5)",
    badge: "#38BDF8",
    badgeBg: "rgba(56,189,248,0.12)",
    dot: "#38BDF8",
  },
  planning: {
    border: "rgba(59,74,102,0.9)",
    badge: "#94A3B8",
    badgeBg: "rgba(59,74,102,0.5)",
    dot: "#94A3B8",
  },
  suggested: {
    border: "rgba(59,74,102,0.9)",
    badge: "#64748B",
    badgeBg: "rgba(59,74,102,0.3)",
    dot: "#64748B",
  },
}

function CourseCard({
  code,
  name,
  status,
}: {
  code: string
  name: string
  status: QuarterStatus
}) {
  const [hov, setHov] = useState(false)
  const accent =
    status === "completed"
      ? "#00E676"
      : status === "current"
        ? "#38BDF8"
        : "#64748B"
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? "#3B4A66" : "rgba(255,255,255,0.0)",
        borderTop: `1px solid ${
          hov ? "rgba(56,189,248,0.3)" : "rgba(59,74,102,0.8)"
        }`,
        borderRight: `1px solid ${
          hov ? "rgba(56,189,248,0.3)" : "rgba(59,74,102,0.8)"
        }`,
        borderBottom: `1px solid ${
          hov ? "rgba(56,189,248,0.3)" : "rgba(59,74,102,0.8)"
        }`,
        borderLeft: `3px solid ${accent}`,
        borderRadius: 8,
        padding: "9px 11px",
        cursor: "pointer",
        transition: "all 0.15s ease-out",
      }}
    >
      <div
        style={{
          fontSize: 11.5,
          fontWeight: 700,
          color: accent,
          fontFamily: "JetBrains Mono",
          marginBottom: 2,
          letterSpacing: 0.2,
        }}
      >
        {code}
      </div>
      <div style={{ fontSize: 12, color: "#E2E8F0", lineHeight: 1.4 }}>
        {name}
      </div>
    </div>
  )
}

function QuarterColumn({
  q,
  onAddCourse,
}: {
  q: Quarter
  onAddCourse?: () => void
}) {
  const col = STATUS_COLORS[q.status]
  const isCurrent = q.status === "current"
  return (
    <div
      style={{
        flex: 1,
        background: isCurrent
          ? "linear-gradient(170deg,#162D45,#131E30)"
          : "linear-gradient(170deg,#141E2E,#0F1726)",
        border: `1px solid ${col.border}`,
        borderRadius: 16,
        padding: "16px 16px 14px",
        display: "flex",
        flexDirection: "column",
        gap: 10,
        boxShadow: isCurrent
          ? "0 0 0 1px rgba(56,189,248,0.1), 0 8px 32px rgba(56,189,248,0.06)"
          : "none",
      }}
    >
      {/* Column header */}
      <div style={{ marginBottom: 2 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 6,
          }}
        >
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: 0.8,
              textTransform: "uppercase",
              color: col.badge,
              background: col.badgeBg,
              borderRadius: 999,
              padding: "2px 8px",
            }}
          >
            {q.label}
          </span>
          <span
            style={{
              fontSize: 11,
              color: "#94A3B8",
              fontFamily: "JetBrains Mono",
            }}
          >
            {q.units} units
          </span>
        </div>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#FFFFFF" }}>
          {q.term}
        </div>
      </div>

      {/* Courses */}
      <div
        style={{ display: "flex", flexDirection: "column", gap: 7, flex: 1 }}
      >
        {q.courses.map((c) => (
          <CourseCard
            key={c.code}
            code={c.code}
            name={c.name}
            status={q.status}
          />
        ))}
      </div>

      {/* Add Course */}
      <button
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
          background: "#212B3D",
          border: "1px dashed rgba(255,255,255,0.12)",
          borderRadius: 8,
          padding: "9px",
          color: "#94A3B8",
          fontSize: 12,
          fontWeight: 500,
          cursor: "pointer",
          transition: "all 0.15s",
          marginTop: 4,
        }}
        onClick={onAddCourse}
        onMouseEnter={(e) => {
          ;(e.currentTarget as HTMLElement).style.borderColor =
            "rgba(56,189,248,0.35)"
          ;(e.currentTarget as HTMLElement).style.color = "#38BDF8"
        }}
        onMouseLeave={(e) => {
          ;(e.currentTarget as HTMLElement).style.borderColor =
            "rgba(255,255,255,0.12)"
          ;(e.currentTarget as HTMLElement).style.color = "#64748B"
        }}
      >
        <Icon d={ICONS.plus} size={13} stroke="currentColor" /> Add Course
      </button>
    </div>
  )
}

function ReqRowPlanner({
  label,
  done,
  total,
  pct,
}: {
  label: string
  done: number
  total: number
  pct: number
}) {
  const [hov, setHov] = useState(false)
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "10px 8px",
        borderBottom: "1px solid rgba(59,74,102,0.3)",
        background: hov ? "rgba(255,255,255,0.0)" : "transparent",
        borderRadius: 8,
        cursor: "pointer",
        transition: "background 0.15s",
      }}
    >
      <span
        style={{
          fontSize: 12.5,
          color: "#E2E8F0",
          flex: "0 0 180px",
          fontWeight: 500,
        }}
      >
        {label}
      </span>
      <ProgressBar pct={pct} color="#38BDF8" />
      <span
        style={{
          fontSize: 11,
          color: "#94A3B8",
          flexShrink: 0,
          fontFamily: "JetBrains Mono",
          minWidth: 36,
          textAlign: "right",
        }}
      >
        {done}/{total}
      </span>
      <span
        style={{
          transition: "transform 0.2s ease-in-out",
          transform: hov ? "translateX(4px)" : "translateX(0)",
        }}
      >
        <Icon
          d={ICONS.chevronRight}
          size={13}
          stroke={hov ? "#38BDF8" : "#64748B"}
        />
      </span>
    </div>
  )
}

function DegreePlannerPage({
  navigateTo,
}: {
  navigateTo: (p: string) => void
}) {
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <Header
        crumbs={["Overview", "Degree Planner"]}
        crumbNav={(c) => {
          if (c === "Overview") navigateTo("Overview")
        }}
      />
      <div
        style={{
          flex: 1,
          overflow: "auto",
          padding: "28px 32px 32px",
          display: "flex",
          flexDirection: "column",
          gap: 22,
        }}
      >
        {/* Page Title Row */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div
              style={{
                fontSize: 24,
                fontWeight: 800,
                letterSpacing: -0.6,
                color: "#FFFFFF",
                marginBottom: 6,
              }}
            >
              Your Path to Graduation
            </div>
            <div style={{ fontSize: 13.5, color: "#94A3B8" }}>
              See how each quarter connects to requirements and your Spring 2027
              goal.
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, flexShrink: 0 }}>
            <button
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: 8,
                padding: "9px 16px",
                color: "#E2E8F0",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.15s",
              }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLElement).style.borderColor = "#38BDF8"
                ;(e.currentTarget as HTMLElement).style.background = "#0F2A4A"
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLElement).style.borderColor =
                  "rgba(255,255,255,0.15)"
                ;(e.currentTarget as HTMLElement).style.background =
                  "transparent"
              }}
            >
              <Icon d={ICONS.upload} size={14} stroke="currentColor" /> Export
              Plan
            </button>
            <button
              onClick={() => navigateTo("Course Explorer")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                background: "#0284C7",
                border: "none",
                borderRadius: 8,
                padding: "9px 18px",
                color: "#fff",
                fontSize: 13,
                fontWeight: 700,
                cursor: "pointer",
                boxShadow: "0 0 16px rgba(0,102,255,0.35)",
                transition: "all 0.15s",
              }}
            >
              <Icon d={ICONS.plus} size={14} stroke="#fff" strokeWidth={2.5} />{" "}
              Add Course
            </button>
          </div>
        </div>

        {/* Summary Banner */}
        <div
          style={{
            background: "linear-gradient(115deg,#0D3A55,#0F2A40,#0B1D30)",
            border: "1px solid rgba(56,189,248,0.12)",
            borderRadius: 16,
            padding: "22px 28px",
            display: "flex",
            alignItems: "center",
            gap: 32,
          }}
        >
          <DonutChart pct={68} size={110} strokeW={11} />
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: 10.5,
                color: "#94A3B8",
                fontWeight: 700,
                letterSpacing: 0.8,
                textTransform: "uppercase",
                marginBottom: 6,
              }}
            >
              Computer Science B.S. · Technology & Information Management Minor
            </div>
            <div
              style={{
                fontSize: 18,
                fontWeight: 800,
                color: "#FFFFFF",
                marginBottom: 4,
                letterSpacing: -0.4,
              }}
            >
              On track for Spring 2027
            </div>
            <div style={{ fontSize: 12.5, color: "#94A3B8", lineHeight: 1.5 }}>
              Based on the illustrative plan below. Verify against your official
              Degree Progress Report.
            </div>
          </div>
          <div style={{ display: "flex", gap: 16, flexShrink: 0 }}>
            {[
              { val: "7", label: "Quarters Planned" },
              { val: "3.0", label: "Avg. courses/qtr" },
              { val: "1", label: "Risk to view", warn: true },
            ].map((s) => (
              <div
                key={s.label}
                style={{
                  textAlign: "center",
                  padding: "12px 20px",
                  background: "rgba(59,74,102,0.3)",
                  borderRadius: 10,
                  border: `1px solid ${
                    s.warn ? "rgba(250,204,21,0.2)" : "rgba(59,74,102,0.8)"
                  }`,
                }}
              >
                <div
                  style={{
                    fontSize: 24,
                    fontWeight: 800,
                    color: s.warn ? "#FFB703" : "#F8FAFC",
                    letterSpacing: -0.5,
                    lineHeight: 1,
                  }}
                >
                  {s.val}
                </div>
                <div
                  style={{
                    fontSize: 10.5,
                    color: "#94A3B8",
                    marginTop: 5,
                    fontWeight: 500,
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Academic Plan Board */}
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginBottom: 14,
            }}
          >
            <span style={{ fontSize: 14, fontWeight: 700, color: "#FFFFFF" }}>
              Academic plan
            </span>
            <div style={{ display: "flex", gap: 12 }}>
              {[
                { dot: "#00E676", label: "Completed" },
                { dot: "#38BDF8", label: "In Progress" },
              ].map((l) => (
                <div
                  key={l.label}
                  style={{ display: "flex", alignItems: "center", gap: 5 }}
                >
                  <div
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      background: l.dot,
                    }}
                  />
                  <span style={{ fontSize: 12, color: "#CBD5E1" }}>
                    {l.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", gap: 14 }}>
            {QUARTERS.map((q) => (
              <QuarterColumn
                key={q.term}
                q={q}
                onAddCourse={() => navigateTo("Course Explorer")}
              />
            ))}
          </div>
        </div>

        {/* Bottom Split */}
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}
        >
          {/* Requirement Audit */}
          <div
            style={{
              background: "#212B3D",
              borderRadius: 16,
              border: "1px solid #3B4A66",
              padding: "24px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 16,
              }}
            >
              <div>
                <div
                  style={{ fontSize: 14, fontWeight: 700, color: "#FFFFFF" }}
                >
                  Requirement Audit
                </div>
                <div style={{ fontSize: 11.5, color: "#94A3B8", marginTop: 3 }}>
                  14 requirements remaining
                </div>
              </div>
              <span
                style={{
                  marginLeft: "auto",
                  fontSize: 10,
                  fontWeight: 700,
                  color: "#CBD5E1",
                  background: "rgba(59,74,102,0.8)",
                  borderRadius: 999,
                  padding: "2px 10px",
                  letterSpacing: 0.5,
                }}
              >
                Demo
              </span>
            </div>
            <ReqRowPlanner
              label="Lower-division Core"
              done={7}
              total={8}
              pct={85}
            />
            <ReqRowPlanner
              label="Upper Division Core"
              done={2}
              total={5}
              pct={40}
            />
            <ReqRowPlanner
              label="Major Electives"
              done={3}
              total={6}
              pct={50}
            />
            <ReqRowPlanner
              label="General Education"
              done={8}
              total={10}
              pct={80}
            />
          </div>

          {/* Risk Warning */}
          <div
            style={{
              background: "rgba(255,183,3,0.04)",
              borderRadius: 16,
              border: "1px solid rgba(255,183,3,0.18)",
              padding: "24px",
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 9,
                  background: "rgba(255,183,3,0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Icon
                  d={ICONS.warning}
                  size={17}
                  stroke="#FFB703"
                  fill="rgba(255,183,3,0.1)"
                  strokeWidth={2}
                />
              </div>
              <div>
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: "#FFB703",
                    letterSpacing: 0.8,
                    textTransform: "uppercase",
                    marginBottom: 2,
                  }}
                >
                  Potential Graduation Risk
                </div>
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 800,
                    color: "#FFFFFF",
                    letterSpacing: -0.3,
                  }}
                >
                  CSE 101 unlocks 3 later courses
                </div>
              </div>
            </div>
            <div style={{ fontSize: 13.5, color: "#CBD5E1", lineHeight: 1.65 }}>
              If unavailable this spring, your sequence may shift. Add a backup
              section and a future-quarter option to protect your timeline.
            </div>
            <div style={{ display: "flex", gap: 4, marginTop: 4 }}>
              {["CSE 130", "CSE 115A", "CSE 102"].map((c) => (
                <span
                  key={c}
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: "#FFB703",
                    background: "rgba(255,183,3,0.08)",
                    border: "1px solid rgba(255,183,3,0.18)",
                    borderRadius: 6,
                    padding: "3px 9px",
                    fontFamily: "JetBrains Mono",
                  }}
                >
                  {c}
                </span>
              ))}
            </div>
            <button
              onClick={() => navigateTo("Backup Plans")}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 7,
                background: "#1E2D3D",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 999,
                padding: "12px 20px",
                color: "#E2E8F0",
                fontSize: 13.5,
                fontWeight: 600,
                cursor: "pointer",
                marginTop: "auto",
                transition: "all 0.15s",
              }}
            >
              Review Backup Strategy{" "}
              <Icon
                d={ICONS.arrowRight}
                size={15}
                stroke="#CBD5E1"
                strokeWidth={2}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── PAGE 3: Course Explorer ──────────────────────────────────────────────────

interface Course {
  code: string
  name: string
  tags: { label: string color: string bg?: string }[]
  units: number
  quarters: string
  career: string
  official: boolean
  description: string
  requirement: string
  interest: string
}

const ALL_COURSES: Course[] = [
  {
    code: "CSE 101",
    name: "Introduction to Data Structures and Algorithms",
    tags: [
      { label: "📘 Major Core", color: "#7DD3FA", bg: "#1E3A8A" },
      { label: "Upper Division", color: "#C7D2FE", bg: "#3730A3" },
    ],
    units: 5,
    official: true,
    quarters: "Illustrative: Winter / Spring",
    career:
      "Builds foundations used in software engineering interviews and systems work",
    description:
      "Fundamental data structures and algorithm design. Required before CSE 130 and CSE 115A.",
    requirement: "Major Core",
    interest: "Software Engineering",
  },
  {
    code: "CSE 130",
    name: "Principles of Computer Systems",
    tags: [
      { label: "Major Elective", color: "#DDD6FE", bg: "#4C1D95" },
      { label: "Upper Division", color: "#C7D2FE", bg: "#3730A3" },
    ],
    units: 5,
    official: false,
    quarters: "Illustrative: Winter / Spring",
    career: "Systems and infrastructure pathway",
    description:
      "Operating systems concepts, process management, memory, and file systems.",
    requirement: "Major Elective",
    interest: "Systems",
  },
  {
    code: "CSE 120",
    name: "Game Development Experience",
    tags: [
      { label: "Major Elective", color: "#DDD6FE", bg: "#4C1D95" },
      { label: "🎮 Interest: Games", color: "#FBCFE8", bg: "#831843" },
    ],
    units: 5,
    official: false,
    quarters: "Quarter availability not connected in this prototype",
    career: "Collaborative product development and game systems",
    description:
      "Hands-on game development using industry tools. Great for portfolio building.",
    requirement: "Major Elective",
    interest: "Game Development",
  },
  {
    code: "CSE 115A",
    name: "Introduction to Software Engineering",
    tags: [
      { label: "🎓 Capstone Pathway", color: "#FDE68A", bg: "#92400E" },
      { label: "Upper Division", color: "#C7D2FE", bg: "#3730A3" },
    ],
    units: 5,
    official: false,
    quarters: "Illustrative: Winter / Spring",
    career: "Team software development and project delivery",
    description:
      "Team-based software development, agile methodologies, and project lifecycle.",
    requirement: "Major Elective",
    interest: "Software Engineering",
  },
]

// Filtered set for the "Major Elective + Winter 2027 + Software Engineering" scenario
const FILTERED_COURSES = ALL_COURSES.filter(
  (c) =>
    c.requirement === "Major Elective" && c.interest === "Software Engineering",
)

const REQ_OPTIONS = [
  "Any Requirement",
  "Major Core",
  "Major Elective",
  "General Education",
]
const QTR_OPTIONS = ["Spring 2026", "Fall 2026", "Winter 2027", "Spring 2027"]
const INT_OPTIONS = [
  "All Interests",
  "Software Engineering",
  "Systems",
  "Game Development",
]

function FilterDropdown({
  label,
  options,
  value,
  onChange,
  activeColor,
}: {
  label: string
  options: string[]
  value: string
  onChange: (v: string) => void
  activeColor?: (opt: string) => boolean
}) {
  const [open, setOpen] = useState(false)
  const [hov, setHov] = useState(false)
  const isFiltered = value !== options[0]
  return (
    <div style={{ marginBottom: 12, position: "relative" }}>
      <div
        style={{
          fontSize: 11,
          fontWeight: 600,
          color: "#CBD5E1",
          letterSpacing: 0.5,
          textTransform: "uppercase",
          marginBottom: 6,
        }}
      >
        {label}
      </div>
      <div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        onClick={() => setOpen((o) => !o)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: isFiltered ? "#1E3A52" : "#1E2A3B",
          borderTop: `1px solid ${
            open || hov ? "#38BDF8" : isFiltered ? "#38BDF8" : "#3B4A66"
          }`,
          borderRight: `1px solid ${
            open || hov ? "#38BDF8" : isFiltered ? "#38BDF8" : "#3B4A66"
          }`,
          borderBottom: `1px solid ${
            open || hov ? "#38BDF8" : isFiltered ? "#38BDF8" : "#3B4A66"
          }`,
          borderLeft: `1px solid ${
            open || hov ? "#38BDF8" : isFiltered ? "#38BDF8" : "#3B4A66"
          }`,
          borderRadius: open ? "8px 8px 0 0" : 8,
          padding: "9px 12px",
          cursor: "pointer",
          transition: "all 0.15s",
        }}
      >
        <span
          style={{
            fontSize: 13,
            color: isFiltered ? "#F1F5F9" : "#64748B",
            fontWeight: isFiltered ? 600 : 400,
          }}
        >
          {value}
        </span>
        <span
          style={{
            transition: "transform 0.15s",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            display: "flex",
          }}
        >
          <Icon
            d={ICONS.chevronDown}
            size={14}
            stroke={open || hov ? "#38BDF8" : "#64748B"}
          />
        </span>
      </div>
      {open && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            zIndex: 50,
            background: "#1A2638",
            borderTop: "none",
            borderRight: "1px solid #38BDF8",
            borderBottom: "1px solid #38BDF8",
            borderLeft: "1px solid #38BDF8",
            borderRadius: "0 0 8px 8px",
            overflow: "hidden",
          }}
        >
          {options.map((opt) => {
            const isActive = activeColor ? activeColor(opt) : false
            const isSelected = opt === value
            return (
              <DropdownItem
                key={opt}
                label={opt}
                selected={isSelected}
                active={isActive}
                onClick={() => {
                  onChange(opt)
                  setOpen(false)
                }}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}

function DropdownItem({
  label,
  selected,
  active,
  onClick,
}: {
  label: string
  selected: boolean
  active?: boolean
  onClick: () => void
}) {
  const [hov, setHov] = useState(false)
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={onClick}
      style={{
        padding: "9px 12px",
        fontSize: 13,
        cursor: "pointer",
        background: active
          ? "#1E3A8A"
          : selected
            ? "rgba(56,189,248,0.12)"
            : hov
              ? "rgba(59,74,102,0.5)"
              : "transparent",
        color: active
          ? "#fff"
          : selected
            ? "#38BDF8"
            : hov
              ? "#F1F5F9"
              : "#94A3B8",
        fontWeight: selected || active ? 600 : 400,
        transition: "background 0.1s, color 0.1s",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {label}
      {selected && !active && (
        <Icon d={ICONS.check} size={12} stroke="#38BDF8" strokeWidth={2.5} />
      )}
    </div>
  )
}

function FilterCheckbox({ label }: { label: string }) {
  const [checked, setChecked] = useState(false)
  const [hov, setHov] = useState(false)
  const c = checked
    ? "#38BDF8"
    : hov
      ? "rgba(56,189,248,0.5)"
      : "rgba(255,255,255,0.18)"
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={() => setChecked((v) => !v)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        cursor: "pointer",
        padding: "7px 6px",
        borderRadius: 6,
        background: hov ? "rgba(56,189,248,0.04)" : "transparent",
        transition: "background 0.15s",
      }}
    >
      <div
        style={{
          width: 16,
          height: 16,
          borderRadius: 4,
          flexShrink: 0,
          borderTop: `1.5px solid ${c}`,
          borderRight: `1.5px solid ${c}`,
          borderBottom: `1.5px solid ${c}`,
          borderLeft: `1.5px solid ${c}`,
          background: checked ? "rgba(0,242,254,0.15)" : "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.15s",
        }}
      >
        {checked && (
          <Icon d={ICONS.check} size={10} stroke="#38BDF8" strokeWidth={2.5} />
        )}
      </div>
      <span
        style={{
          fontSize: 13,
          color: hov ? "#CBD5E1" : "#94A3B8",
          transition: "color 0.15s",
        }}
      >
        {label}
      </span>
    </div>
  )
}

function MetaTag({
  icon,
  text,
  color = "#64748B",
  bg = "rgba(59,74,102,0.3)",
}: {
  icon: string
  text: string
  color?: string
  bg?: string
}) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        background: bg,
        borderRadius: 6,
        padding: "4px 9px",
        borderTop: "1px solid #3B4A66",
        borderRight: "1px solid #3B4A66",
        borderBottom: "1px solid #3B4A66",
        borderLeft: "1px solid #3B4A66",
        flexShrink: 0,
      }}
    >
      <Icon d={ICONS[(icon as keyof typeof ICONS)]} size={11} stroke={color} />
      <span style={{ fontSize: 11, color, fontWeight: 500, lineHeight: 1.4 }}>
        {text}
      </span>
    </div>
  )
}

function AddToPlanButton({ onClick }: { onClick?: () => void } = {}) {
  const [hov, setHov] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        background: hov ? "#0369A1" : "#0284C7",
        border: "none",
        borderRadius: 8,
        padding: "8px 14px",
        color: "#fff",
        fontSize: 12.5,
        fontWeight: 700,
        cursor: "pointer",
        boxShadow: hov
          ? "0 4px 14px rgba(2,132,199,0.4)"
          : "0 2px 6px rgba(2,132,199,0.2)",
        transition: "all 0.15s ease-in-out",
        whiteSpace: "nowrap",
      }}
    >
      <Icon d={ICONS.plus} size={13} stroke="#fff" strokeWidth={2.5} /> Add to
      Plan
    </button>
  )
}

function CourseCard3({
  course,
  navigateTo,
}: {
  course: Course
  navigateTo?: (p: string) => void
}) {
  const [hov, setHov] = useState(false)
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={() => navigateTo?.("Course Insights")}
      style={{
        background: hov ? "#3B4A66" : "rgba(255,255,255,0.0)",
        borderTop: `1px solid ${hov ? "#38BDF8" : "rgba(59,74,102,0.8)"}`,
        borderRight: `1px solid ${hov ? "#38BDF8" : "rgba(59,74,102,0.8)"}`,
        borderBottom: `1px solid ${hov ? "#38BDF8" : "rgba(59,74,102,0.8)"}`,
        borderLeft: `1px solid ${hov ? "#38BDF8" : "rgba(59,74,102,0.8)"}`,
        borderRadius: 12,
        padding: "18px 20px",
        transform: hov ? "scale(1.005)" : "scale(1)",
        transition: "all 0.15s ease-out",
        boxShadow: hov
          ? "0 0 0 1px rgba(6,182,212,0.15), 0 8px 24px rgba(6,182,212,0.06)"
          : "none",
        cursor: "pointer",
      }}
    >
      {/* Code + requirement tags */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 7,
          marginBottom: 6,
          flexWrap: "wrap",
        }}
      >
        <span
          style={{
            fontSize: 12.5,
            fontWeight: 700,
            color: "#38BDF8",
            fontFamily: "JetBrains Mono",
            letterSpacing: 0.3,
          }}
        >
          {course.code}
        </span>
        {course.tags.map((t) => (
          <span
            key={t.label}
            style={{
              fontSize: 10.5,
              fontWeight: 700,
              color: t.color,
              background: t.bg ?? t.color + "22",
              borderRadius: 6,
              padding: "2px 9px",
              letterSpacing: 0.1,
            }}
          >
            {t.label}
          </span>
        ))}
      </div>

      {/* Title */}
      <div
        style={{
          fontSize: 14.5,
          fontWeight: 700,
          color: "#FFFFFF",
          marginBottom: 10,
          lineHeight: 1.3,
        }}
      >
        {course.name}
      </div>

      {/* Three metadata pills */}
      <div
        style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 12 }}
      >
        <MetaTag icon="book" text={`${course.units} units`} color="#94A3B8" />
        <MetaTag icon="calendar" text={course.quarters} color="#64748B" />
        <MetaTag
          icon="briefcase"
          text={course.career}
          color="#8B9FC7"
          bg="rgba(139,159,199,0.07)"
        />
      </div>

      {/* Description */}
      <div
        style={{
          fontSize: 12.5,
          color: "#94A3B8",
          lineHeight: 1.6,
          marginBottom: 14,
        }}
      >
        {course.description}
      </div>

      {/* Footer */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: 12,
          borderTop: "1px solid rgba(59,74,102,0.5)",
        }}
      >
        <span
          style={{
            fontSize: 10.5,
            fontWeight: 700,
            letterSpacing: 0.3,
            borderRadius: 999,
            padding: "3px 10px",
            color: course.official ? "#00E676" : "#FFB703",
            background: course.official
              ? "rgba(34,197,94,0.08)"
              : "rgba(255,183,3,0.08)",
            borderTop: `1px solid ${
              course.official ? "rgba(34,197,94,0.2)" : "rgba(250,204,21,0.2)"
            }`,
            borderRight: `1px solid ${
              course.official ? "rgba(34,197,94,0.2)" : "rgba(250,204,21,0.2)"
            }`,
            borderBottom: `1px solid ${
              course.official ? "rgba(34,197,94,0.2)" : "rgba(250,204,21,0.2)"
            }`,
            borderLeft: `1px solid ${
              course.official ? "rgba(34,197,94,0.2)" : "rgba(250,204,21,0.2)"
            }`,
          }}
        >
          {course.official
            ? "✓ Official UCSC Catalog"
            : "◆ Illustrative prototype data"}
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button
            onClick={() => navigateTo?.("Course Insights")}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#38BDF8",
              fontSize: 12.5,
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: 4,
              padding: 0,
              whiteSpace: "nowrap",
            }}
          >
            View Insights{" "}
            <Icon d={ICONS.chevronRight} size={13} stroke="#38BDF8" />
          </button>
          <AddToPlanButton onClick={() => navigateTo?.("Course Insights")} />
        </div>
      </div>
    </div>
  )
}

function CourseExplorerPage({
  navigateTo,
}: {
  navigateTo: (p: string) => void
}) {
  const [req, setReq] = useState("Any Requirement")
  const [qtr, setQtr] = useState("Spring 2026")
  const [interest, setInterest] = useState("All Interests")

  // Derive filtered courses and whether filters are "active scenario"
  const isFiltered = req !== "Any Requirement" || interest !== "All Interests"
  const visibleCourses = isFiltered
    ? ALL_COURSES.filter(
        (c) =>
          (req === "Any Requirement" || c.requirement === req) &&
          (interest === "All Interests" || c.interest === interest),
      )
    : ALL_COURSES

  const resetFilters = () => {
    setReq("Any Requirement")
    setQtr("Spring 2026")
    setInterest("All Interests")
  }

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <Header
        crumbs={["Degree Planner", "Course Explorer"]}
        crumbNav={(c) => {
          if (c === "Degree Planner") navigateTo("Degree Planner")
        }}
      />
      <div
        style={{
          flex: 1,
          overflow: "auto",
          padding: "28px 32px 32px",
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        {/* Page Title */}
        <div>
          <div
            style={{
              fontSize: 24,
              fontWeight: 800,
              letterSpacing: -0.6,
              color: "#FFFFFF",
              marginBottom: 6,
            }}
          >
            Find courses with purpose
          </div>
          <div style={{ fontSize: 13.5, color: "#94A3B8" }}>
            Compare requirement fit, interests, schedule impact, and career
            relevance.
          </div>
        </div>

        {/* Search Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            background: "#212B3D",
            borderTop: "1px solid rgba(56,189,248,0.2)",
            borderRight: "1px solid rgba(56,189,248,0.2)",
            borderBottom: "1px solid rgba(56,189,248,0.2)",
            borderLeft: "1px solid rgba(56,189,248,0.2)",
            borderRadius: 12,
            padding: "13px 18px",
          }}
        >
          <Icon d={ICONS.search2} size={18} stroke="#38BDF8" />
          <input
            placeholder="Search by course, topic, skill, or requirement"
            style={{
              flex: 1,
              background: "none",
              border: "none",
              outline: "none",
              fontSize: 15,
              color: "#FFFFFF",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          />
        </div>

        {/* Two-Column Layout */}
        <div style={{ display: "flex", gap: 22, alignItems: "flex-start" }}>
          {/* ── Left Filter Panel ── */}
          <div
            style={{
              width: 232,
              flexShrink: 0,
              background: "#212B3D",
              borderTop: "1px solid rgba(59,74,102,0.8)",
              borderRight: "1px solid rgba(59,74,102,0.8)",
              borderBottom: "1px solid rgba(59,74,102,0.8)",
              borderLeft: "1px solid rgba(59,74,102,0.8)",
              borderRadius: 16,
              padding: "20px 18px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 18,
              }}
            >
              <span
                style={{ fontSize: 13.5, fontWeight: 700, color: "#FFFFFF" }}
              >
                Filters
              </span>
              <button
                onClick={resetFilters}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 12.5,
                  color: "#38BDF8",
                  fontWeight: 600,
                  padding: 0,
                }}
              >
                Reset
              </button>
            </div>

            <FilterDropdown
              label="Requirement"
              options={REQ_OPTIONS}
              value={req}
              onChange={setReq}
            />
            <FilterDropdown
              label="Quarter"
              options={QTR_OPTIONS}
              value={qtr}
              onChange={setQtr}
            />
            <FilterDropdown
              label="Interest"
              options={INT_OPTIONS}
              value={interest}
              onChange={setInterest}
              activeColor={(opt) =>
                opt === "Software Engineering" &&
                interest === "Software Engineering"
              }
            />

            <div
              style={{ height: 1, background: "#3B4A66", margin: "12px 0" }}
            />
            <div
              style={{
                fontSize: 10.5,
                fontWeight: 700,
                color: "#94A3B8",
                letterSpacing: 0.7,
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              Preferences
            </div>
            <FilterCheckbox label="Avoid classes before 10 AM" />
            <FilterCheckbox label="Fits commute days" />
            <FilterCheckbox label="No Friday classes" />

            <div
              style={{
                marginTop: 18,
                background: "rgba(6,182,212,0.05)",
                borderTop: "1px solid rgba(6,182,212,0.14)",
                borderRight: "1px solid rgba(6,182,212,0.14)",
                borderBottom: "1px solid rgba(6,182,212,0.14)",
                borderLeft: "1px solid rgba(6,182,212,0.14)",
                borderRadius: 10,
                padding: "12px 14px",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "flex-start", gap: 8 }}
              >
                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 5,
                    background: "rgba(0,230,118,0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    marginTop: 1,
                  }}
                >
                  <Icon
                    d={ICONS.check}
                    size={10}
                    stroke="#00E676"
                    strokeWidth={2.5}
                  />
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 11.5,
                      fontWeight: 700,
                      color: "#E2E8F0",
                      marginBottom: 4,
                    }}
                  >
                    Official-first recommendations
                  </div>
                  <div
                    style={{ fontSize: 11, color: "#94A3B8", lineHeight: 1.55 }}
                  >
                    Catalog facts come from UCSC sources. All other content is
                    marked.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right Feed ── */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: 14,
              minWidth: 0,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span style={{ fontSize: 14, fontWeight: 700, color: "#FFFFFF" }}>
                {visibleCourses.length} course{" "}
                {visibleCourses.length === 1 ? "match" : "matches"}
                {isFiltered && (
                  <span
                    style={{
                      fontSize: 12,
                      color: "#38BDF8",
                      fontWeight: 500,
                      marginLeft: 8,
                    }}
                  >
                    · Filtered
                  </span>
                )}
              </span>
              <button
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 7,
                  background: "rgba(59,74,102,0.3)",
                  borderTop: "1px solid rgba(255,255,255,0.1)",
                  borderRight: "1px solid rgba(255,255,255,0.1)",
                  borderBottom: "1px solid rgba(255,255,255,0.1)",
                  borderLeft: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 8,
                  padding: "7px 14px",
                  color: "#E2E8F0",
                  fontSize: 12.5,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                <Icon d={ICONS.sliders} size={13} stroke="#94A3B8" /> Best Fit
              </button>
            </div>

            {/* Recommendation Alert */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 12,
                background: "rgba(250,204,21,0.05)",
                borderTop: "1px solid rgba(255,183,3,0.12)",
                borderRight: "1px solid rgba(255,183,3,0.12)",
                borderBottom: "1px solid rgba(255,183,3,0.12)",
                borderLeft: "3px solid #FFB703",
                borderRadius: 10,
                padding: "13px 16px",
              }}
            >
              <Icon d={ICONS.sparkle} size={16} stroke="#FFB703" />
              <div style={{ flex: 1 }}>
                <span
                  style={{ fontSize: 13, color: "#E2E8F0", lineHeight: 1.6 }}
                >
                  <strong style={{ color: "#FFFFFF" }}>
                    Recommended for your plan:
                  </strong>{" "}
                  CSE 101 supports your major sequence and unblocks CSE 130, CSE
                  115A, and two electives.{" "}
                </span>
                <button
                  onClick={() => navigateTo("Course Insights")}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#38BDF8",
                    fontSize: 13,
                    fontWeight: 600,
                    padding: 0,
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}
                >
                  Why this course?
                </button>
              </div>
            </div>

            {visibleCourses.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "48px 0",
                  color: "#94A3B8",
                  fontSize: 14,
                }}
              >
                No courses match the selected filters.{" "}
                <button
                  onClick={resetFilters}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#38BDF8",
                    cursor: "pointer",
                    fontSize: 14,
                    fontWeight: 600,
                  }}
                >
                  Reset filters
                </button>
              </div>
            ) : (
              visibleCourses.map((c) => (
                <CourseCard3 key={c.code} course={c} navigateTo={navigateTo} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── PAGE 4: Course Insights ──────────────────────────────────────────────────

const INSIGHT_TABS = ["Overview", "Sections", "Insights", "Syllabi", "Related"]

function InsightTabBar({
  active,
  setActive,
}: {
  active: string
  setActive: (t: string) => void
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: 0,
        flexShrink: 0,
        borderBottom: "1px solid rgba(59,74,102,0.5)",
        padding: "0 32px",
      }}
    >
      {INSIGHT_TABS.map((tab) => {
        const isActive = tab === active
        return (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "12px 18px",
              fontSize: 13.5,
              fontWeight: isActive ? 700 : 500,
              color: isActive ? "#38BDF8" : "#94A3B8",
              borderBottom: isActive
                ? "2px solid #38BDF8"
                : "2px solid transparent",
              marginBottom: -1,
              transition: "all 0.15s",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          >
            {tab}
          </button>
        )
      })}
    </div>
  )
}

function PlanningFitCard({
  icon,
  title,
  text,
}: {
  icon: string
  title: string
  text: string
}) {
  return (
    <div
      style={{
        flex: 1,
        background: "#212B3D",
        border: "1px solid rgba(56,189,248,0.2)",
        boxShadow: "0 0 0 1px rgba(56,189,248,0.06) inset",
        borderRadius: 12,
        padding: "16px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 10,
        }}
      >
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 8,
            background: T.cyanDim,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Icon
            d={ICONS[(icon as keyof typeof ICONS)]}
            size={14}
            stroke={T.cyan}
          />
        </div>
        <span
          style={{
            fontSize: 12,
            fontWeight: 700,
            color: T.textSecondary,
            textTransform: "uppercase",
            letterSpacing: 0.5,
          }}
        >
          {title}
        </span>
      </div>
      <p
        style={{
          fontSize: 12.5,
          color: "#E2E8F0",
          lineHeight: 1.65,
          margin: 0,
        }}
      >
        {text}
      </p>
    </div>
  )
}

function SectionRow({
  number,
  days,
  time,
  location,
  status,
  selected,
  onClick,
}: {
  number: string
  days: string
  time: string
  location: string
  status: "open" | "waitlist"
  selected?: boolean
  onClick?: () => void
}) {
  const isOpen = status === "open"
  return (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "14px 16px",
        background: selected ? "rgba(56,189,248,0.06)" : "#283246",
        borderRadius: 10,
        cursor: "pointer",
        transition: "all 0.15s",
        border: `1.5px solid ${selected ? "#38BDF8" : "#3B4A66"}`,
        boxShadow: selected ? "0 0 0 1px rgba(56,189,248,0.15)" : "none",
      }}
    >
      {/* Radio indicator */}
      <div
        style={{
          width: 18,
          height: 18,
          borderRadius: "50%",
          flexShrink: 0,
          border: `2px solid ${selected ? "#38BDF8" : "#475569"}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.15s",
        }}
      >
        {selected && (
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#38BDF8",
            }}
          />
        )}
      </div>
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 9,
          flexShrink: 0,
          background: isOpen ? "rgba(5,150,105,0.12)" : "rgba(217,119,6,0.12)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon
          d={ICONS.calendar}
          size={15}
          stroke={isOpen ? "#059669" : "#D97706"}
        />
      </div>
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: "#FFFFFF",
            marginBottom: 3,
          }}
        >
          Lecture {number}
        </div>
        <div style={{ fontSize: 12, color: "#CBD5E1" }}>
          {days} · {time}
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 12, color: "#CBD5E1" }}>
          <span style={{ marginRight: 4 }}>📍</span>
          {location}
        </span>
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            padding: "3px 10px",
            borderRadius: 999,
            color: isOpen ? "#fff" : "#0B131E",
            background: isOpen ? "#059669" : "#D97706",
            letterSpacing: 0.3,
          }}
        >
          {isOpen ? "Open" : "Waitlist"}
        </span>
      </div>
    </div>
  )
}

function CourseInsightsPage({
  navigateTo,
}: {
  navigateTo: (p: string) => void
}) {
  const [activeTab, setActiveTab] = useState("Overview")
  const [selectedLecture, setSelectedLecture] = useState<string | null>(null)
  const [added, setAdded] = useState(false)

  // Tabs other than Overview show the data empty state (Page 5)
  const showEmptyState = activeTab !== "Overview"

  const handleTabChange = (tab: string) => setActiveTab(tab)

  return (
    <div
      style={{
        width: "calc(1512px - 260px)",
        height: 982,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <Header
        crumbs={["Course Explorer", "Course Insights"]}
        crumbNav={(c) => {
          if (c === "Course Explorer") navigateTo("Course Explorer")
        }}
        searchPlaceholder="Search courses…"
      />

      {/* Course Hero Banner — persists across all tabs */}
      <div
        style={{
          background: "#1A2235",
          borderBottom: "1px solid #3B4A66",
          padding: "22px 32px 18px",
          flexShrink: 0,
        }}
      >
        <button
          onClick={() => navigateTo("Course Explorer")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#94A3B8",
            fontSize: 12.5,
            fontWeight: 500,
            padding: 0,
            marginBottom: 16,
            transition: "color 0.15s",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}
          onMouseEnter={(e) => {
            ;(e.currentTarget as HTMLElement).style.color = "#38BDF8"
          }}
          onMouseLeave={(e) => {
            ;(e.currentTarget as HTMLElement).style.color = "#94A3B8"
          }}
        >
          <Icon d="M19 12H5 M12 19l-7-7 7-7" size={14} stroke="currentColor" />{" "}
          Back to results
        </button>

        <div
          style={{
            background: "#283246",
            borderRadius: 16,
            border: "1px solid #3B4A66",
            padding: "22px 26px",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 24,
          }}
        >
          <div style={{ flex: 1 }}>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 7,
                marginBottom: 12,
              }}
            >
              {[
                { label: "📘 Major Core", color: "#7DD3FA", bg: "#1E3A8A" },
                { label: "Upper Division", color: "#C7D2FE", bg: "#3730A3" },
                {
                  label: "✓ Official UCSC Catalog",
                  color: "#6EE7B7",
                  bg: "rgba(5,150,105,0.2)",
                },
              ].map((t) => (
                <span
                  key={t.label}
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    padding: "3px 10px",
                    borderRadius: 6,
                    color: t.color,
                    background: t.bg,
                    letterSpacing: 0.1,
                  }}
                >
                  {t.label}
                </span>
              ))}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 12,
                flexWrap: "wrap",
                marginBottom: 10,
              }}
            >
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#38BDF8",
                  fontFamily: "JetBrains Mono",
                  letterSpacing: 0.5,
                }}
              >
                CSE 101
              </span>
              <span style={{ fontSize: 10.5, color: "#3B4A66" }}>—</span>
              <span
                style={{
                  fontSize: 20,
                  fontWeight: 800,
                  color: "#FFFFFF",
                  letterSpacing: -0.4,
                  lineHeight: 1.2,
                }}
              >
                Introduction to Data Structures and Algorithms
              </span>
            </div>
            <p
              style={{
                fontSize: 13.5,
                color: "#CBD5E1",
                lineHeight: 1.65,
                margin: 0,
                maxWidth: 640,
              }}
            >
              Introduction to abstract data types and algorithms, including
              linked lists, stacks, queues, hash tables, trees, heaps, graphs,
              and big-Oh analysis. Assignments use C/C++.
            </p>
          </div>
          <div
            style={{
              display: "flex",
              gap: 10,
              flexShrink: 0,
              alignItems: "center",
              paddingTop: 4,
            }}
          >
            <button
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                background: "transparent",
                border: "1px solid #3B4A66",
                borderRadius: 9,
                padding: "10px 18px",
                color: "#E2E8F0",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.15s",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLElement).style.borderColor = "#38BDF8"
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLElement).style.borderColor = "#3B4A66"
              }}
            >
              <Icon d={ICONS.plus} size={14} stroke="currentColor" /> Save
            </button>
            {/* Add to Spring Plan — toggles to success state */}
            <button
              onClick={() => setAdded((v) => !v)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                background: added ? "#4ADE80" : "#0284C7",
                border: "none",
                borderRadius: 9,
                padding: "10px 20px",
                color: added ? "#0F172A" : "#fff",
                fontSize: 13,
                fontWeight: 700,
                cursor: "pointer",
                boxShadow: added
                  ? "0 0 18px rgba(74,222,128,0.4)"
                  : "0 0 18px rgba(2,132,199,0.4)",
                transition: "all 0.2s ease-in-out",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              {added ? (
                <>
                  <Icon
                    d={ICONS.check}
                    size={14}
                    stroke="#0F172A"
                    strokeWidth={2.5}
                  />{" "}
                  Added to Spring
                </>
              ) : (
                <>
                  <Icon d={ICONS.calendar} size={14} stroke="#fff" /> Add to
                  Spring Plan
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Tab Bar */}
      <InsightTabBar active={activeTab} setActive={handleTabChange} />

      {/* Body — scrollable area */}
      <div style={{ flex: 1, overflow: "auto", minHeight: 0 }}>
        {showEmptyState ? (
          /* ── Page 5: Data Empty State ── */
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 20,
              padding: "56px 32px",
              minHeight: "100%",
            }}
          >
            {/* Pulsing signal icon */}
            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  border: "1.5px solid rgba(56,189,248,0.2)",
                  animation: "pulse 2s ease-out infinite",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  width: 110,
                  height: 110,
                  borderRadius: "50%",
                  border: "1px solid rgba(56,189,248,0.1)",
                  animation: "pulse 2s ease-out 0.5s infinite",
                }}
              />
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  background: "rgba(56,189,248,0.08)",
                  border: "1px solid rgba(56,189,248,0.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg
                  width={26}
                  height={26}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#38BDF8"
                  strokeWidth={1.75}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12.55a11 11 0 0114.08 0 M1.42 9a16 16 0 0121.16 0 M8.53 16.11a6 6 0 016.95 0 M12 20h.01" />
                </svg>
              </div>
            </div>

            <div style={{ textAlign: "center", maxWidth: 420 }}>
              <div
                style={{
                  fontSize: 20,
                  fontWeight: 800,
                  color: "#FFFFFF",
                  letterSpacing: -0.4,
                  marginBottom: 10,
                }}
              >
                Live data is not connected
              </div>
              <p
                style={{
                  fontSize: 14,
                  color: "#94A3B8",
                  lineHeight: 1.7,
                  margin: "0 0 20px",
                }}
              >
                A production version would read times, locations, capacity, and
                instructor data from official UCSC systems.
              </p>
              <button
                onClick={() => setActiveTab("Overview")}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  color: "#38BDF8",
                  fontSize: 14,
                  fontWeight: 600,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 5,
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              >
                <Icon d="M19 12H5 M12 5l-7 7 7 7" size={14} stroke="#38BDF8" />{" "}
                Return to overview
              </button>
            </div>

            {/* Decorative skeleton */}
            <div
              style={{
                width: "100%",
                maxWidth: 560,
                height: 120,
                borderRadius: 14,
                background: "#212B3D",
                border: "1px solid #3B4A66",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: 0.4,
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  width: "85%",
                }}
              >
                {[80, 60, 45].map((w, i) => (
                  <div
                    key={i}
                    style={{
                      height: 8,
                      borderRadius: 999,
                      background: "#3B4A66",
                      width: `${w}%`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* ── Page 4: Overview content ── */
          <div style={{ padding: "26px 32px 32px" }}>
            <div style={{ display: "flex", gap: 22, alignItems: "flex-start" }}>
              {/* Left Main Column */}
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  gap: 20,
                  minWidth: 0,
                }}
              >
                {/* Official Catalog Card */}
                <div
                  style={{
                    background: "#212B3D",
                    borderRadius: 16,
                    border: "1px solid #3B4A66",
                    padding: "22px 24px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 9,
                      marginBottom: 14,
                    }}
                  >
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: 7,
                        background: "rgba(5,150,105,0.12)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Icon
                        d={ICONS.check}
                        size={14}
                        stroke="#059669"
                        strokeWidth={2.5}
                      />
                    </div>
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: "#6EE7B7",
                        letterSpacing: 0.6,
                        textTransform: "uppercase",
                      }}
                    >
                      Official UCSC Catalog
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: 15,
                      fontWeight: 700,
                      color: "#FFFFFF",
                      marginBottom: 12,
                    }}
                  >
                    What you'll learn
                  </div>
                  <p
                    style={{
                      fontSize: 13.5,
                      color: "#CBD5E1",
                      lineHeight: 1.7,
                      margin: "0 0 16px",
                    }}
                  >
                    Fundamental abstract data types and algorithms including
                    linked lists, stacks, queues, hash tables, trees, heaps, and
                    graphs. Analysis of algorithm complexity using big-Oh
                    notation. Programming assignments in C/C++ develop practical
                    implementation skills.
                  </p>
                  <a
                    href="https://catalog.ucsc.edu/en/current/general-catalog/courses/cse-computer-science-and-engineering/upper-division/cse-101"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 5,
                      color: "#38BDF8",
                      fontSize: 13,
                      fontWeight: 600,
                      textDecoration: "none",
                    }}
                  >
                    Open official catalog{" "}
                    <Icon d={ICONS.externalLink} size={13} stroke="#38BDF8" />
                  </a>
                </div>

                {/* Planning Fit Grid */}
                <div>
                  <div
                    style={{
                      fontSize: 13.5,
                      fontWeight: 700,
                      color: "#FFFFFF",
                      marginBottom: 12,
                    }}
                  >
                    Planning Fit
                  </div>
                  <div style={{ display: "flex", gap: 14 }}>
                    <PlanningFitCard
                      icon="check"
                      title="Requirement Fit"
                      text="Illustrative: satisfies a major-core slot and supports later coursework including CSE 130, CSE 115A, and CSE 102."
                    />
                    <PlanningFitCard
                      icon="briefcase"
                      title="Career Relevance"
                      text="Algorithms, complexity, and data structures support software engineering preparation and technical interview foundations."
                    />
                    <PlanningFitCard
                      icon="sparkle"
                      title="Goal Alignment"
                      text="Matches your saved goal: build stronger technical interview foundations. Prerequisite for 3 later courses in your plan."
                    />
                  </div>
                </div>

                {/* Sections & Schedule */}
                <div
                  style={{
                    background: "#212B3D",
                    borderRadius: 16,
                    border: "1px solid #3B4A66",
                    padding: "22px 24px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: 16,
                    }}
                  >
                    <div
                      style={{
                        fontSize: 15,
                        fontWeight: 700,
                        color: "#FFFFFF",
                      }}
                    >
                      Sections & Schedule
                    </div>
                    <span
                      style={{
                        fontSize: 11,
                        color: "#94A3B8",
                        background: "rgba(59,74,102,0.5)",
                        borderRadius: 999,
                        padding: "3px 10px",
                      }}
                    >
                      Spring 2026
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 10,
                    }}
                  >
                    <SectionRow
                      number="101"
                      days="Mon / Wed / Fri"
                      time="10:40–11:45 AM"
                      location="J Baskin Eng"
                      status="open"
                      selected={selectedLecture === "101"}
                      onClick={() =>
                        setSelectedLecture((l) => (l === "101" ? null : "101"))
                      }
                    />
                    <SectionRow
                      number="02"
                      days="Tue / Thu"
                      time="1:30–3:05 PM"
                      location="Classroom Unit 2"
                      status="waitlist"
                      selected={selectedLecture === "02"}
                      onClick={() =>
                        setSelectedLecture((l) => (l === "02" ? null : "02"))
                      }
                    />
                  </div>
                  <div
                    style={{
                      marginTop: 14,
                      padding: "11px 14px",
                      background: "rgba(56,189,248,0.05)",
                      borderRadius: 9,
                      border: "1px solid rgba(56,189,248,0.1)",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 12,
                        color: "#94A3B8",
                        lineHeight: 1.6,
                      }}
                    >
                      <span style={{ color: "#38BDF8", fontWeight: 600 }}>
                        Note:
                      </span>{" "}
                      Section data is illustrative. Verify availability in the
                      UCSC Class Search before enrolling.
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Sidebar */}
              <div
                style={{
                  width: 260,
                  flexShrink: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                }}
              >
                <div
                  style={{
                    background: "#212B3D",
                    borderRadius: 16,
                    border: "1px solid #3B4A66",
                    padding: "20px",
                  }}
                >
                  <div
                    style={{
                      fontSize: 13.5,
                      fontWeight: 700,
                      color: "#FFFFFF",
                      marginBottom: 14,
                    }}
                  >
                    At a Glance
                  </div>
                  {[
                    { label: "Units", value: "5", icon: "book", muted: false },
                    {
                      label: "Availability",
                      value: "Not Connected",
                      icon: "calendar",
                      muted: true,
                    },
                    {
                      label: "Professor",
                      value: "Not connected",
                      icon: "grad",
                      muted: true,
                    },
                  ].map((row) => (
                    <div
                      key={row.label}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "10px 0",
                        borderBottom: "1px solid rgba(59,74,102,0.3)",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                        }}
                      >
                        <Icon
                          d={ICONS[(row.icon as keyof typeof ICONS)]}
                          size={13}
                          stroke="#64748B"
                        />
                        <span style={{ fontSize: 12.5, color: "#94A3B8" }}>
                          {row.label}
                        </span>
                      </div>
                      <span
                        style={{
                          fontSize: 12.5,
                          fontWeight: row.muted ? 400 : 700,
                          color: row.muted ? "#64748B" : "#FFFFFF",
                          fontStyle: row.muted ? "italic" : "normal",
                        }}
                      >
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>

                <div
                  style={{
                    background: "#212B3D",
                    borderRadius: 16,
                    border: "1px solid #3B4A66",
                    padding: "20px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      marginBottom: 12,
                    }}
                  >
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: 7,
                        background: "rgba(56,189,248,0.1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Icon
                        d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"
                        size={14}
                        stroke="#38BDF8"
                      />
                    </div>
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        color: "#FFFFFF",
                      }}
                    >
                      Student Insights
                    </span>
                  </div>
                  <div
                    style={{
                      background: "#283246",
                      borderRadius: 9,
                      border: "1px solid #3B4A66",
                      padding: "12px 14px",
                    }}
                  >
                    <p
                      style={{
                        fontSize: 12,
                        color: "#94A3B8",
                        lineHeight: 1.65,
                        margin: 0,
                      }}
                    >
                      Verified review sources are not connected in this
                      prototype. Student insights require integration with
                      approved campus data.
                    </p>
                  </div>
                  <button
                    onClick={() => handleTabChange("Sections")}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "#38BDF8",
                      fontSize: 13,
                      fontWeight: 600,
                      padding: "8px 0 0",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 5,
                    }}
                  >
                    View Source Policy{" "}
                    <Icon d={ICONS.chevronRight} size={13} stroke="#38BDF8" />
                  </button>
                </div>

                <div
                  style={{
                    background: "#212B3D",
                    borderRadius: 16,
                    border: "1px solid #3B4A66",
                    padding: "20px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      marginBottom: 12,
                    }}
                  >
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: 7,
                        background: "rgba(250,204,21,0.08)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Icon d={ICONS.clock} size={14} stroke="#FACC15" />
                    </div>
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        color: "#FFFFFF",
                      }}
                    >
                      Workload
                    </span>
                  </div>
                  <div
                    style={{
                      background: "#283246",
                      borderRadius: 9,
                      border: "1px solid #3B4A66",
                      padding: "12px 14px",
                    }}
                  >
                    <p
                      style={{
                        fontSize: 12,
                        color: "#94A3B8",
                        lineHeight: 1.65,
                        margin: 0,
                      }}
                    >
                      Not enough verified data sources to estimate weekly hours
                      for this course.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CTA lives inside the scroll area — always below all content */}
        <div
          style={{
            background: "#0F2942",
            border: "1px solid rgba(16,185,129,0.35)",
            boxShadow: "0 0 18px rgba(16,185,129,0.35)",
            padding: "16px 32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            margin: "24px 0 0",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: "rgba(16,185,129,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Icon
                d={ICONS.check}
                size={16}
                stroke="#10B981"
                strokeWidth={2.5}
              />
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#FFFFFF" }}>
                Ready to add CSE 101?
              </div>
              <div style={{ fontSize: 12.5, color: "#94A3B8", marginTop: 2 }}>
                Next, check it against your weekly constraints.
              </div>
            </div>
          </div>
          <button
            onClick={() => navigateTo("Schedule Builder")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "#0284C7",
              border: "none",
              borderRadius: 9,
              padding: "11px 22px",
              color: "#fff",
              fontSize: 13.5,
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "0 0 20px rgba(2,132,199,0.45)",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              transition: "all 0.15s",
            }}
          >
            Check Schedule{" "}
            <Icon
              d={ICONS.arrowRight}
              size={15}
              stroke="#fff"
              strokeWidth={2.5}
            />
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── PAGE 6: Schedule Builder ────────────────────────────────────────────────

const GRID_START_MIN = 8 * 60
const GRID_END_MIN = 18 * 60
const HOUR_PX = 90 // pixels per hour
const PX_PER_MIN = HOUR_PX / 60
const GRID_H = (GRID_END_MIN - GRID_START_MIN) * PX_PER_MIN // 900px

function fmtCalTime(min: number) {
  const h = Math.floor(min / 60)
  const m = min % 60
  const suffix = h >= 12 ? "PM" : "AM"
  const h12 = h > 12 ? h - 12 : h === 0 ? 12 : h
  return m === 0
    ? `${h12} ${suffix}`
    : `${h12}:${String(m).padStart(2, "0")} ${suffix}`
}

interface CalEvent {
  id: string
  name: string
  room: string
  days: number[]
  start: number
  end: number
  fill: string
  text: string
  accent: string
  travelRisk?: boolean
  isWork?: boolean
}

const CAL_EVENTS: CalEvent[] = [
  {
    id: "cse101",
    name: "CSE 101",
    room: "J BASKIN 101",
    days: [0, 2, 4],
    start: 10 * 60 + 40,
    end: 11 * 60 + 45,
    fill: "#0D2744",
    text: "#BAE6FD",
    accent: "#38BDF8",
  },
  {
    id: "stat131",
    name: "STAT 131",
    room: "THIMANN 3",
    days: [1, 3],
    start: 11 * 60 + 40,
    end: 13 * 60 + 15,
    fill: "#052E1C",
    text: "#A7F3D0",
    accent: "#10B981",
  },
  {
    id: "geer",
    name: "GE: ER",
    room: "OAKES 105",
    days: [1, 3],
    start: 14 * 60 + 0,
    end: 15 * 60 + 35,
    fill: "#2D1B07",
    text: "#FDE68A",
    accent: "#FBBF24",
    travelRisk: true,
  },
  {
    id: "work",
    name: "Work Shift",
    room: "DINING HALL",
    days: [4],
    start: 13 * 60,
    end: 17 * 60,
    fill: "transparent",
    text: "#64748B",
    accent: "#475569",
    isWork: true,
  },
]

function CalEventBlock({ ev, dayIdx }: { ev: CalEvent dayIdx: number }) {
  const top = (ev.start - GRID_START_MIN) * PX_PER_MIN
  const height = (ev.end - ev.start) * PX_PER_MIN
  const showTravel = !!ev.travelRisk && dayIdx === 1
  return (
    <div
      style={{
        position: "absolute",
        top: top + 2,
        left: 3,
        right: 3,
        height: height - 4,
        background: ev.isWork
          ? "repeating-linear-gradient(45deg, rgba(148,163,184,0.03) 0px, rgba(148,163,184,0.03) 5px, rgba(148,163,184,0.09) 5px, rgba(148,163,184,0.09) 6px)"
          : ev.fill,
        borderRadius: 8,
        padding: "8px 8px 8px 9px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        gap: 3,
        alignItems: "flex-start",
        justifyContent: "flex-start",
        borderTop: `1px solid ${
          ev.isWork ? "rgba(148,163,184,0.2)" : ev.accent + "33"
        }`,
        borderRight: `1px solid ${
          ev.isWork ? "rgba(148,163,184,0.2)" : ev.accent + "33"
        }`,
        borderBottom: `1px solid ${
          ev.isWork ? "rgba(148,163,184,0.2)" : ev.accent + "33"
        }`,
        borderLeft: `3px solid ${ev.accent}`,
      }}
    >
      <div
        style={{
          fontSize: 10.5,
          fontWeight: 700,
          color: ev.text,
          lineHeight: 1.4,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {ev.name}
      </div>
      {height > 40 && (
        <div
          style={{
            fontSize: 9.5,
            color: ev.text,
            opacity: 0.7,
            lineHeight: 1.4,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {fmtCalTime(ev.start)} – {fmtCalTime(ev.end)}
        </div>
      )}
      {height > 60 && (
        <div
          style={{
            fontSize: 9.5,
            color: ev.text,
            opacity: 0.55,
            lineHeight: 1.4,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {ev.room}
        </div>
      )}
      {showTravel && height > 80 && (
        <div
          style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 2 }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              background: "rgba(245,158,11,0.18)",
              borderTop: "1px solid rgba(245,158,11,0.35)",
              borderRight: "1px solid rgba(245,158,11,0.35)",
              borderBottom: "1px solid rgba(245,158,11,0.35)",
              borderLeft: "1px solid rgba(245,158,11,0.35)",
              borderRadius: 4,
              padding: "2px 6px",
            }}
          >
            <div
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: "#F59E0B",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontSize: 9,
                fontWeight: 700,
                color: "#FCD34D",
                letterSpacing: 0.6,
              }}
            >
              TRAVEL RISK
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

function ScheduleBuilderPage({
  navigateTo,
}: {
  navigateTo: (p: string) => void
}) {
  const [noEarly, setNoEarly] = useState(false)
  const [commute, setCommute] = useState(true)
  const [workProt, setWorkProt] = useState(false)
  const [constraintsOpen, setConstraintsOpen] = useState(true)
  const [calView, setCalView] = useState<"Week" | "Day">("Week")
  const [activeDayIdx, setActiveDayIdx] = useState(0)
  const [conflictResolved, setConflictResolved] = useState(false)

  const HOURS = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
  const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"]
  const DAY_FULL = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]

  function fmtHour(h: number) {
    if (h === 12) return "12 PM"
    return h > 12 ? `${h - 12} PM` : `${h} AM`
  }

  const fmtTime = fmtCalTime

  // current-time indicator — hardcoded at 11:40 AM for demo
  const NOW_TOP = (11 * 60 + 40 - GRID_START_MIN) * PX_PER_MIN

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <Header
        crumbs={["Course Explorer", "Schedule Builder"]}
        crumbNav={(c) => {
          if (c === "Course Explorer") navigateTo("Course Explorer")
        }}
      />

      {/* Page title + actions */}
      <div style={{ padding: "20px 32px 0", flexShrink: 0 }}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            marginBottom: 14,
          }}
        >
          <div>
            <div
              style={{
                fontSize: 22,
                fontWeight: 800,
                letterSpacing: -0.5,
                color: "#FFFFFF",
                marginBottom: 4,
              }}
            >
              Shape a week that works
            </div>
            <div style={{ fontSize: 13, color: "#94A3B8" }}>
              Balance courses with commute, work, accessibility, and preferred
              class times.
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, flexShrink: 0 }}>
            <button
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: 8,
                padding: "9px 16px",
                color: "#E2E8F0",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              <Icon d={ICONS.sliders} size={14} stroke="currentColor" />{" "}
              Preferences
            </button>
            <button
              onClick={() => navigateTo("Backup Plans")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                background: "#0284C7",
                border: "none",
                borderRadius: 8,
                padding: "9px 18px",
                color: "#fff",
                fontSize: 13,
                fontWeight: 700,
                cursor: "pointer",
                boxShadow: "0 0 16px rgba(2,132,199,0.35)",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              Build backups{" "}
              <Icon
                d={ICONS.arrowRight}
                size={13}
                stroke="#fff"
                strokeWidth={2.5}
              />
            </button>
          </div>
        </div>

        {/* Conflict alert banner — toggles resolved state */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            background: conflictResolved
              ? "rgba(6,44,30,0.7)"
              : "rgba(245,158,11,0.05)",
            borderTop: `1px solid ${
              conflictResolved
                ? "rgba(16,185,129,0.4)"
                : "rgba(245,158,11,0.18)"
            }`,
            borderRight: `1px solid ${
              conflictResolved
                ? "rgba(16,185,129,0.4)"
                : "rgba(245,158,11,0.18)"
            }`,
            borderBottom: `1px solid ${
              conflictResolved
                ? "rgba(16,185,129,0.4)"
                : "rgba(245,158,11,0.18)"
            }`,
            borderLeft: `3px solid ${conflictResolved ? "#10B981" : "#F59E0B"}`,
            borderRadius: 10,
            padding: "11px 16px",
            marginBottom: 18,
            transition: "all 0.3s ease-out",
          }}
        >
          {conflictResolved ? (
            <Icon
              d={ICONS.check}
              size={15}
              stroke="#22C55E"
              strokeWidth={2.5}
            />
          ) : (
            <Icon
              d={ICONS.warning}
              size={15}
              stroke="#F59E0B"
              strokeWidth={2}
            />
          )}
          <div
            style={{
              flex: 1,
              fontSize: 12.5,
              color: "#E2E8F0",
              lineHeight: 1.55,
            }}
          >
            {conflictResolved ? (
              <>
                <strong style={{ color: "#22C55E" }}>
                  ✓ Conflict Resolved
                </strong>{" "}
                — The alternative CSE 101 section fits your commute buffer.
              </>
            ) : (
              <>
                <strong style={{ color: "#FCD34D" }}>
                  1 travel-time conflict found:
                </strong>{" "}
                CSE 101 ends 15 minutes before ART 10D across campus. Your saved
                buffer is 20 minutes.
              </>
            )}
          </div>
          {!conflictResolved && (
            <button
              onClick={() => setConflictResolved(true)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#38BDF8",
                fontSize: 12.5,
                fontWeight: 600,
                padding: 0,
                whiteSpace: "nowrap",
                flexShrink: 0,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              Apply alternative section
            </button>
          )}
        </div>
      </div>

      {/* Scrollable body */}
      <div
        style={{
          flex: 1,
          overflow: "auto",
          minHeight: 0,
          padding: "0 32px 32px",
        }}
      >
        <div style={{ display: "flex", gap: 18, alignItems: "flex-start" }}>
          {/* Left column */}
          <div
            style={{
              width: 256,
              flexShrink: 0,
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            {/* Course Facts */}
            <div
              style={{
                background: "#212B3D",
                borderRadius: 14,
                border: "1px solid #3B4A66",
                padding: "18px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 12,
                }}
              >
                <span
                  style={{ fontSize: 13, fontWeight: 700, color: "#FFFFFF" }}
                >
                  Spring 2026
                </span>
                <span
                  style={{
                    fontSize: 11,
                    color: "#94A3B8",
                    background: "rgba(59,74,102,0.5)",
                    borderRadius: 999,
                    padding: "2px 9px",
                  }}
                >
                  15 units
                </span>
              </div>
              {[
                {
                  code: "CSE 101",
                  sched: "MWF · 10:40–11:45",
                  accent: "#38BDF8",
                },
                {
                  code: "STAT 131",
                  sched: "TTH · 11:40–1:15",
                  accent: "#10B981",
                },
                { code: "GE: ER", sched: "TTH · 2:00–3:35", accent: "#FBBF24" },
              ].map((c) => (
                <div
                  key={c.code}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "9px 0",
                    borderBottom: "1px solid rgba(59,74,102,0.25)",
                  }}
                >
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
                  >
                    <div
                      style={{
                        width: 3,
                        height: 34,
                        borderRadius: 999,
                        background: c.accent,
                        flexShrink: 0,
                      }}
                    />
                    <div>
                      <div
                        style={{
                          fontSize: 12,
                          fontWeight: 700,
                          color: c.accent,
                          fontFamily: "JetBrains Mono",
                          letterSpacing: 0.3,
                        }}
                      >
                        {c.code}
                      </div>
                      <div
                        style={{ fontSize: 11, color: "#64748B", marginTop: 2 }}
                      >
                        {c.sched}
                      </div>
                    </div>
                  </div>
                  <button
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "#475569",
                      fontSize: 15,
                      lineHeight: 1,
                      letterSpacing: 1,
                    }}
                  >
                    ···
                  </button>
                </div>
              ))}
            </div>

            {/* Personal Constraints */}
            <div
              style={{
                background: "#212B3D",
                borderRadius: 14,
                border: "1px solid #3B4A66",
                padding: "18px",
                overflow: "hidden",
              }}
            >
              <button
                onClick={() => setConstraintsOpen((v) => !v)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  marginBottom: constraintsOpen ? 12 : 0,
                  transition: "margin 0.25s ease-in-out",
                }}
              >
                <span
                  style={{ fontSize: 13, fontWeight: 700, color: "#FFFFFF" }}
                >
                  Personal Constraints
                </span>
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 22,
                    height: 22,
                    borderRadius: 6,
                    background: "rgba(59,74,102,0.45)",
                    transition: "transform 0.25s ease-in-out",
                    transform: constraintsOpen
                      ? "rotate(0deg)"
                      : "rotate(180deg)",
                  }}
                >
                  <Icon
                    d="M5 15l7-7 7 7"
                    size={11}
                    stroke="#94A3B8"
                    strokeWidth={2}
                  />
                </span>
              </button>
              <div
                style={{
                  maxHeight: constraintsOpen ? 300 : 0,
                  overflow: "hidden",
                  transition: "max-height 0.25s ease-in-out",
                }}
              >
                {([
                  {
                    label: "Avoid early classes",
                    sub: "Before 10:00 AM",
                    val: noEarly,
                    set: setNoEarly,
                  },
                  {
                    label: "Commute buffer",
                    sub: "20 min between campuses",
                    val: commute,
                    set: setCommute,
                  },
                  {
                    label: "Work schedule",
                    sub: "Friday after 1:00 PM",
                    val: workProt,
                    set: setWorkProt,
                  },
                ] as {
                  label: string
                  sub: string
                  val: boolean
                  set: (f: (v: boolean) => boolean) => void
                }[]).map((item) => (
                  <div
                    key={item.label}
                    onClick={() => item.set((v) => !v)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 11,
                      padding: "9px 0",
                      borderBottom: "1px solid rgba(59,74,102,0.22)",
                      cursor: "pointer",
                    }}
                  >
                    <div
                      style={{
                        width: 17,
                        height: 17,
                        borderRadius: 4,
                        flexShrink: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all 0.15s",
                        borderTop: `1.5px solid ${
                          item.val ? "#38BDF8" : "#475569"
                        }`,
                        borderRight: `1.5px solid ${
                          item.val ? "#38BDF8" : "#475569"
                        }`,
                        borderBottom: `1.5px solid ${
                          item.val ? "#38BDF8" : "#475569"
                        }`,
                        borderLeft: `1.5px solid ${
                          item.val ? "#38BDF8" : "#475569"
                        }`,
                        background: item.val
                          ? "rgba(56,189,248,0.15)"
                          : "transparent",
                      }}
                    >
                      {item.val && (
                        <Icon
                          d={ICONS.check}
                          size={10}
                          stroke="#38BDF8"
                          strokeWidth={2.5}
                        />
                      )}
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: 12.5,
                          fontWeight: 600,
                          color: "#E2E8F0",
                        }}
                      >
                        {item.label}
                      </div>
                      <div
                        style={{ fontSize: 11, color: "#64748B", marginTop: 1 }}
                      >
                        {item.sub}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Calendar */}
          <div
            style={{
              flex: 1,
              background: "#212B3D",
              borderRadius: 14,
              border: "1px solid #3B4A66",
              overflow: "hidden",
              minWidth: 0,
            }}
          >
            {/* Calendar header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "14px 18px",
                borderBottom: "1px solid rgba(59,74,102,0.5)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <button
                  onClick={() =>
                    calView === "Day" &&
                    setActiveDayIdx((i) => Math.max(0, i - 1))
                  }
                  style={{
                    background: "rgba(59,74,102,0.4)",
                    border: "none",
                    borderRadius: 6,
                    width: 27,
                    height: 27,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: calView === "Day" && activeDayIdx === 0 ? 0.35 : 1,
                  }}
                >
                  <Icon d="M15 18l-6-6 6-6" size={13} stroke="#94A3B8" />
                </button>
                <span
                  style={{ fontSize: 13, fontWeight: 700, color: "#FFFFFF" }}
                >
                  {calView === "Week"
                    ? "Spring plan · Week view"
                    : `${DAY_FULL[activeDayIdx]}, Spring 2026`}
                </span>
                <button
                  onClick={() =>
                    calView === "Day" &&
                    setActiveDayIdx((i) => Math.min(4, i + 1))
                  }
                  style={{
                    background: "rgba(59,74,102,0.4)",
                    border: "none",
                    borderRadius: 6,
                    width: 27,
                    height: 27,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: calView === "Day" && activeDayIdx === 4 ? 0.35 : 1,
                  }}
                >
                  <Icon d={ICONS.chevronRight} size={13} stroke="#94A3B8" />
                </button>
              </div>
              {/* Segmented view toggle */}
              <div
                style={{
                  display: "flex",
                  background: "rgba(30,40,58,0.8)",
                  borderRadius: 8,
                  padding: 3,
                  gap: 2,
                }}
              >
                {(["Week", "Day"] as const).map((v) => (
                  <button
                    key={v}
                    onClick={() => setCalView(v)}
                    style={{
                      background:
                        calView === v ? "rgba(56,189,248,0.15)" : "transparent",
                      borderTop: `1px solid ${
                        calView === v ? "rgba(56,189,248,0.3)" : "transparent"
                      }`,
                      borderRight: `1px solid ${
                        calView === v ? "rgba(56,189,248,0.3)" : "transparent"
                      }`,
                      borderBottom: `1px solid ${
                        calView === v ? "rgba(56,189,248,0.3)" : "transparent"
                      }`,
                      borderLeft: `1px solid ${
                        calView === v ? "rgba(56,189,248,0.3)" : "transparent"
                      }`,
                      borderRadius: 6,
                      padding: "5px 16px",
                      color: calView === v ? "#38BDF8" : "#64748B",
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: "pointer",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      transition: "all 0.2s ease-in-out",
                    }}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            {calView === "Week" ? (
              <>
                {/* Day headers */}
                <div
                  style={{
                    display: "flex",
                    borderBottom: "1px solid rgba(59,74,102,0.4)",
                  }}
                >
                  <div style={{ width: 54, flexShrink: 0 }} />
                  {DAYS.map((d) => (
                    <div
                      key={d}
                      style={{
                        flex: 1,
                        padding: "9px 0",
                        textAlign: "center",
                        fontSize: 11,
                        fontWeight: 600,
                        color: "#FFFFFF",
                        letterSpacing: "0.03em",
                        textTransform: "uppercase",
                      }}
                    >
                      {d}
                    </div>
                  ))}
                </div>

                {/* Week Grid */}
                <div style={{ display: "flex", position: "relative" }}>
                  <div
                    style={{
                      width: 54,
                      flexShrink: 0,
                      position: "relative",
                      height: GRID_H,
                    }}
                  >
                    {HOURS.map((h, i) => (
                      <div
                        key={h}
                        style={{
                          position: "absolute",
                          top: i * HOUR_PX - 7,
                          right: 8,
                          fontSize: 10,
                          fontWeight: 600,
                          color: "#CBD5E1",
                          fontFamily: "JetBrains Mono",
                          textAlign: "right",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {fmtHour(h)}
                      </div>
                    ))}
                  </div>
                  {DAYS.map((day, dayIdx) => {
                    const dayEvents = CAL_EVENTS.filter((e) =>
                      e.days.includes(dayIdx),
                    )
                    return (
                      <div
                        key={day}
                        style={{
                          flex: 1,
                          position: "relative",
                          height: GRID_H,
                          borderLeft: "1px solid rgba(255,255,255,0.05)",
                        }}
                      >
                        {HOURS.map((_, i) => (
                          <div
                            key={i}
                            style={{
                              position: "absolute",
                              top: i * HOUR_PX,
                              left: 0,
                              right: 0,
                              height: 1,
                              background:
                                i === 0
                                  ? "transparent"
                                  : "rgba(255,255,255,0.05)",
                            }}
                          />
                        ))}
                        {HOURS.slice(0, -1).map((_, i) => (
                          <div
                            key={`h${i}`}
                            style={{
                              position: "absolute",
                              top: i * HOUR_PX + HOUR_PX / 2,
                              left: 0,
                              right: 0,
                              height: 1,
                              background: "rgba(255,255,255,0.025)",
                            }}
                          />
                        ))}
                        <div
                          style={{
                            position: "absolute",
                            top: NOW_TOP,
                            left: 0,
                            right: 0,
                            height: 1.5,
                            background: "rgba(56,189,248,0.5)",
                            zIndex: 2,
                          }}
                        >
                          {dayIdx === 0 && (
                            <div
                              style={{
                                position: "absolute",
                                left: -4,
                                top: -3.5,
                                width: 8,
                                height: 8,
                                borderRadius: "50%",
                                background: "#38BDF8",
                              }}
                            />
                          )}
                        </div>
                        {dayEvents.map((ev) => (
                          <CalEventBlock key={ev.id} ev={ev} dayIdx={dayIdx} />
                        ))}
                      </div>
                    )
                  })}
                </div>
              </>
            ) : (
              <>
                {/* Day View header */}
                <div
                  style={{
                    display: "flex",
                    borderBottom: "1px solid rgba(59,74,102,0.4)",
                  }}
                >
                  <div style={{ width: 62, flexShrink: 0 }} />
                  <div
                    style={{
                      flex: 1,
                      padding: "9px 16px",
                      fontSize: 11,
                      fontWeight: 600,
                      color: "#FFFFFF",
                      letterSpacing: "0.03em",
                      textTransform: "uppercase",
                    }}
                  >
                    {DAY_FULL[activeDayIdx]}
                  </div>
                </div>

                {/* Day Grid */}
                <div style={{ display: "flex", position: "relative" }}>
                  {/* Time labels */}
                  <div
                    style={{
                      width: 62,
                      flexShrink: 0,
                      position: "relative",
                      height: GRID_H,
                    }}
                  >
                    {HOURS.map((h, i) => (
                      <div
                        key={h}
                        style={{
                          position: "absolute",
                          top: i * HOUR_PX - 7,
                          right: 10,
                          fontSize: 10,
                          fontWeight: 600,
                          color: "#CBD5E1",
                          fontFamily: "JetBrains Mono",
                          textAlign: "right",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {fmtHour(h)}
                      </div>
                    ))}
                  </div>

                  {/* Single expanded day column */}
                  <div
                    style={{
                      flex: 1,
                      position: "relative",
                      height: GRID_H,
                      borderLeft: "1px solid rgba(255,255,255,0.05)",
                    }}
                  >
                    {HOURS.map((_, i) => (
                      <div
                        key={i}
                        style={{
                          position: "absolute",
                          top: i * HOUR_PX,
                          left: 0,
                          right: 0,
                          height: 1,
                          background:
                            i === 0 ? "transparent" : "rgba(255,255,255,0.05)",
                        }}
                      />
                    ))}
                    {HOURS.slice(0, -1).map((_, i) => (
                      <div
                        key={`h${i}`}
                        style={{
                          position: "absolute",
                          top: i * HOUR_PX + HOUR_PX / 2,
                          left: 0,
                          right: 0,
                          height: 1,
                          background: "rgba(255,255,255,0.025)",
                        }}
                      />
                    ))}
                    {/* Current time line */}
                    <div
                      style={{
                        position: "absolute",
                        top: NOW_TOP,
                        left: 0,
                        right: 0,
                        height: 1.5,
                        background: "rgba(56,189,248,0.5)",
                        zIndex: 2,
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          left: -4,
                          top: -3.5,
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          background: "#38BDF8",
                        }}
                      />
                    </div>

                    {/* Expanded day-view event cards */}
                    {CAL_EVENTS.filter((e) =>
                      e.days.includes(activeDayIdx),
                    ).map((ev) => {
                      const top = (ev.start - GRID_START_MIN) * PX_PER_MIN
                      const height = (ev.end - ev.start) * PX_PER_MIN
                      const DAY_META: Record<string, {
                        title: string
                        instructor: string
                        req: string
                      }> = {
                        cse101: {
                          title: "Introduction to Data Structures",
                          instructor: "Prof. Alex Miller",
                          req: "Major Core",
                        },
                        stat131: {
                          title: "Intro to Probability Theory",
                          instructor: "Prof. Dana Reyes",
                          req: "Major Elective",
                        },
                        geer: {
                          title: "Ethnicity & Race in America",
                          instructor: "Prof. C. Okafor",
                          req: "GE Requirement",
                        },
                        work: {
                          title: "Work Shift",
                          instructor: "Dining Services",
                          req: "Personal",
                        },
                      }
                      const meta = DAY_META[ev.id] ?? {
                        title: ev.name,
                        instructor: "",
                        req: "",
                      }
                      return (
                        <div
                          key={ev.id}
                          style={{
                            position: "absolute",
                            top: top + 3,
                            left: 8,
                            right: 8,
                            minHeight: height - 6,
                            background: ev.isWork
                              ? "repeating-linear-gradient(45deg, rgba(148,163,184,0.04) 0px, rgba(148,163,184,0.04) 5px, rgba(148,163,184,0.1) 5px, rgba(148,163,184,0.1) 6px)"
                              : ev.fill,
                            borderRadius: 12,
                            borderTop: `1px solid ${ev.accent}22`,
                            borderRight: `1px solid ${ev.accent}22`,
                            borderBottom: `1px solid ${ev.accent}22`,
                            borderLeft: `6px solid ${ev.accent}`,
                            padding: "10px 12px",
                            display: "flex",
                            flexDirection: "column",
                            gap: 4,
                            alignItems: "flex-start",
                            justifyContent: "flex-start",
                          }}
                        >
                          <div
                            style={{
                              fontSize: 14,
                              fontWeight: 600,
                              color: ev.text,
                              lineHeight: 1.4,
                              width: "100%",
                            }}
                          >
                            {ev.name} — {meta.title}
                          </div>
                          <div
                            style={{
                              fontSize: 12,
                              color: "#CBD5E1",
                              lineHeight: 1.4,
                              width: "100%",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {fmtTime(ev.start)} – {fmtTime(ev.end)} · 📍{" "}
                            {ev.room}
                          </div>
                          {!ev.isWork && (
                            <div
                              style={{
                                fontSize: 12,
                                color: "#CBD5E1",
                                lineHeight: 1.4,
                                width: "100%",
                              }}
                            >
                              {meta.instructor}
                            </div>
                          )}
                          <div
                            style={{
                              display: "flex",
                              gap: 5,
                              flexWrap: "wrap",
                              alignItems: "center",
                              width: "100%",
                              marginTop: 2,
                            }}
                          >
                            <span
                              style={{
                                fontSize: 11,
                                fontWeight: 600,
                                color: ev.accent,
                                background: `${ev.accent}18`,
                                borderRadius: 4,
                                padding: "2px 6px",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {meta.req}
                            </span>
                            {ev.travelRisk && (
                              <span
                                style={{
                                  fontSize: 11,
                                  fontWeight: 600,
                                  color: "#FCD34D",
                                  background: "rgba(245,158,11,0.15)",
                                  borderRadius: 4,
                                  padding: "2px 6px",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                ⚠ 20-min commute buffer
                              </span>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Bottom Score Bar */}
        <div
          style={{
            marginTop: 18,
            background: "#212B3D",
            borderRadius: 14,
            border: "1px solid #3B4A66",
            padding: "18px 24px",
            display: "flex",
            alignItems: "center",
            gap: 20,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: 54,
                height: 54,
                borderRadius: 13,
                background: "linear-gradient(135deg, #0284C7, #38BDF8)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 18px rgba(56,189,248,0.3)",
              }}
            >
              <span
                style={{
                  fontSize: 22,
                  fontWeight: 800,
                  color: "#fff",
                  letterSpacing: -1,
                }}
              >
                78
              </span>
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#FFFFFF" }}>
                Schedule fit score
              </div>
              <div style={{ fontSize: 11.5, color: "#94A3B8", marginTop: 2 }}>
                Good fit, with one commute risk
              </div>
            </div>
          </div>
          <div
            style={{
              width: 1,
              height: 38,
              background: "rgba(59,74,102,0.6)",
              flexShrink: 0,
            }}
          />
          <div
            style={{
              display: "flex",
              gap: 8,
              flex: 1,
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            {[
              {
                label: "No early classes",
                color: "#059669",
                bg: "rgba(5,150,105,0.15)",
                border: "rgba(5,150,105,0.3)",
              },
              {
                label: "Work protected",
                color: "#059669",
                bg: "rgba(5,150,105,0.15)",
                border: "rgba(5,150,105,0.3)",
              },
              {
                label: "Commute buffer",
                color: "#D97706",
                bg: "rgba(217,119,6,0.15)",
                border: "rgba(217,119,6,0.3)",
              },
            ].map((tag) => (
              <span
                key={tag.label}
                style={{
                  fontSize: 11.5,
                  fontWeight: 600,
                  color: tag.color,
                  background: tag.bg,
                  borderTop: `1px solid ${tag.border}`,
                  borderRight: `1px solid ${tag.border}`,
                  borderBottom: `1px solid ${tag.border}`,
                  borderLeft: `1px solid ${tag.border}`,
                  borderRadius: 999,
                  padding: "4px 12px",
                }}
              >
                {tag.label}
              </span>
            ))}
          </div>
          <button
            onClick={() => navigateTo("Backup Plans")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "#0284C7",
              border: "none",
              borderRadius: 9,
              padding: "10px 18px",
              color: "#fff",
              fontSize: 13,
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "0 0 16px rgba(2,132,199,0.4)",
              flexShrink: 0,
              whiteSpace: "nowrap",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          >
            Generate Backup Options 🪄
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── PAGE 7: Backup Options ───────────────────────────────────────────────────

function BackupOptionsPage({
  navigateTo,
}: {
  navigateTo: (p: string) => void
}) {
  const [selectedPlan, setSelectedPlan] = useState<"A" | "B" | "C">("B")

  const PLANS = [
    {
      id: "A" as const,
      pill: "Plan A",
      pillColor: "#38BDF8",
      pillBg: "rgba(56,189,248,0.12)",
      tag: "Preferred",
      tagColor: "#94A3B8",
      subtitle: "Best overall fit",
      score: 92,
      courses: ["CSE 101 · LEC 01", "STAT 131", "GE: ER"],
      accents: ["#38BDF8", "#10B981", "#FBBF24"],
      warning: null as string | null,
    },
    {
      id: "B" as const,
      pill: "Plan B",
      pillColor: "#10B981",
      pillBg: "rgba(16,185,129,0.12)",
      tag: "If CSE 101 fills",
      tagColor: "#94A3B8",
      subtitle: "Protects Major",
      score: 88,
      courses: ["CSE 101 · LEC 02", "STAT 131", "GE: ER"],
      accents: ["#38BDF8", "#10B981", "#FBBF24"],
      warning: null as string | null,
    },
    {
      id: "C" as const,
      pill: "Plan C",
      pillColor: "#F59E0B",
      pillBg: "rgba(245,158,11,0.12)",
      tag: "Future-quarter path",
      tagColor: "#94A3B8",
      subtitle: "Moves CSE 101 to fall",
      score: 74,
      courses: ["Defer CSE 101", "STAT 131", "ART 10D"],
      accents: ["#64748B", "#10B981", "#A78BFA"],
      warning: "⚠ May shift a later prerequisite" as string | null,
    },
  ]

  const selectedPlanLabel =
    PLANS.find((p) => p.id === selectedPlan)?.pill ?? "Plan B"

  const BENEFIT_CARDS = [
    {
      emoji: "✓",
      color: "#10B981",
      bg: "rgba(16,185,129,0.08)",
      border: "rgba(16,185,129,0.22)",
      title: "Requirement progress",
      body: "Keeps the same illustrative major-core slot. No requirement gaps introduced.",
    },
    {
      emoji: "🕒",
      color: "#38BDF8",
      bg: "rgba(56,189,248,0.08)",
      border: "rgba(56,189,248,0.22)",
      title: "Personal constraints",
      body: "Meets all saved preferences — no early classes, commute buffer intact, Friday protected.",
    },
    {
      emoji: "📅",
      color: "#A78BFA",
      bg: "rgba(167,139,250,0.08)",
      border: "rgba(167,139,250,0.22)",
      title: "Future flexibility",
      body: "Preserves the Fall planning path. No downstream prerequisite shifts.",
    },
  ]

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <Header
        crumbs={["Schedule Builder", "Backup Plans"]}
        crumbNav={(c) => {
          if (c === "Schedule Builder") navigateTo("Schedule Builder")
        }}
      />

      {/* Page title row */}
      <div style={{ padding: "20px 32px 0", flexShrink: 0 }}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            marginBottom: 16,
          }}
        >
          <div>
            <div
              style={{
                fontSize: 22,
                fontWeight: 800,
                letterSpacing: -0.5,
                color: "#FFFFFF",
                marginBottom: 4,
              }}
            >
              Stay ready when plans change
            </div>
            <div style={{ fontSize: 13, color: "#94A3B8" }}>
              Alternatives preserve the same requirements where possible and
              show tradeoffs explicitly.
            </div>
          </div>
          <span
            style={{
              fontSize: 11.5,
              fontWeight: 500,
              color: "#64748B",
              borderTop: "1px solid rgba(100,116,139,0.3)",
              borderRight: "1px solid rgba(100,116,139,0.3)",
              borderBottom: "1px solid rgba(100,116,139,0.3)",
              borderLeft: "1px solid rgba(100,116,139,0.3)",
              borderRadius: 999,
              padding: "5px 13px",
              flexShrink: 0,
              marginTop: 4,
            }}
          >
            ⓘ Prototype data
          </span>
        </div>

        {/* Planning scenario banner */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            background: "#1A2235",
            borderTop: "1px solid #3B4A66",
            borderRight: "1px solid #3B4A66",
            borderBottom: "1px solid #3B4A66",
            borderLeft: "1px solid #3B4A66",
            borderRadius: 12,
            padding: "14px 18px",
            marginBottom: 18,
          }}
        >
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 10,
              background: "rgba(245,158,11,0.12)",
              borderTop: "1px solid rgba(245,158,11,0.3)",
              borderRight: "1px solid rgba(245,158,11,0.3)",
              borderBottom: "1px solid rgba(245,158,11,0.3)",
              borderLeft: "1px solid rgba(245,158,11,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              fontSize: 18,
            }}
          >
            ⚡
          </div>
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: "#FFFFFF",
                marginBottom: 2,
              }}
            >
              If your preferred CSE 101 section is full
            </div>
            <div style={{ fontSize: 12, color: "#64748B" }}>
              Alternatives preserve the same requirements where possible and
              show tradeoffs explicitly.
            </div>
          </div>
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: 7,
              background: "rgba(59,74,102,0.4)",
              border: "none",
              borderRadius: 8,
              padding: "8px 14px",
              color: "#CBD5E1",
              fontSize: 12.5,
              fontWeight: 600,
              cursor: "pointer",
              flexShrink: 0,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          >
            🔄 Regenerate
          </button>
        </div>
      </div>

      {/* Scrollable body */}
      <div
        style={{
          flex: 1,
          overflow: "auto",
          minHeight: 0,
          padding: "0 32px 32px",
        }}
      >
        {/* 3-column plan grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 14,
            marginBottom: 20,
          }}
        >
          {PLANS.map((plan) => {
            const sel = selectedPlan === plan.id
            return (
              <div
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                style={{
                  background: sel ? "rgba(26,42,58,0.9)" : "#212B3D",
                  borderTop: `1px solid ${
                    sel ? "rgba(56,189,248,0.45)" : "#3B4A66"
                  }`,
                  borderRight: `1px solid ${
                    sel ? "rgba(56,189,248,0.45)" : "#3B4A66"
                  }`,
                  borderBottom: `1px solid ${
                    sel ? "rgba(56,189,248,0.45)" : "#3B4A66"
                  }`,
                  borderLeft: `1px solid ${
                    sel ? "rgba(56,189,248,0.45)" : "#3B4A66"
                  }`,
                  borderRadius: 14,
                  padding: "18px",
                  cursor: "pointer",
                  boxShadow: sel
                    ? "0 0 0 1px rgba(56,189,248,0.15), inset 0 0 32px rgba(56,189,248,0.04)"
                    : "none",
                  transition: "all 0.2s ease-out",
                }}
              >
                {/* Card header row */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 4,
                  }}
                >
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: plan.pillColor,
                      background: plan.pillBg,
                      borderRadius: 999,
                      padding: "3px 10px",
                    }}
                  >
                    {plan.pill}
                  </span>
                  {/* Radio */}
                  <div
                    style={{
                      width: 16,
                      height: 16,
                      borderRadius: "50%",
                      borderTop: `2px solid ${sel ? "#38BDF8" : "#3B4A66"}`,
                      borderRight: `2px solid ${sel ? "#38BDF8" : "#3B4A66"}`,
                      borderBottom: `2px solid ${sel ? "#38BDF8" : "#3B4A66"}`,
                      borderLeft: `2px solid ${sel ? "#38BDF8" : "#3B4A66"}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {sel && (
                      <div
                        style={{
                          width: 7,
                          height: 7,
                          borderRadius: "50%",
                          background: "#38BDF8",
                        }}
                      />
                    )}
                  </div>
                </div>
                <div
                  style={{ fontSize: 11, color: "#64748B", marginBottom: 2 }}
                >
                  {plan.tag}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: "#FFFFFF",
                    marginBottom: 14,
                  }}
                >
                  {plan.subtitle}
                </div>

                {/* Score bar */}
                <div style={{ marginBottom: 14 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 5,
                    }}
                  >
                    <span style={{ fontSize: 11, color: "#64748B" }}>
                      Schedule fit
                    </span>
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: "#FFFFFF",
                      }}
                    >
                      {plan.score}
                      <span
                        style={{
                          fontSize: 10.5,
                          color: "#475569",
                          fontWeight: 400,
                        }}
                      >
                        /100
                      </span>
                    </span>
                  </div>
                  <div
                    style={{
                      height: 4,
                      background: "rgba(59,74,102,0.5)",
                      borderRadius: 999,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${plan.score}%`,
                        background: "linear-gradient(90deg, #0284C7, #38BDF8)",
                        borderRadius: 999,
                      }}
                    />
                  </div>
                </div>

                {/* Course strips */}
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 7 }}
                >
                  {plan.courses.map((c, i) => (
                    <div
                      key={c}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        background: "rgba(59,74,102,0.18)",
                        borderTop: "1px solid rgba(59,74,102,0.35)",
                        borderRight: "1px solid rgba(59,74,102,0.35)",
                        borderBottom: "1px solid rgba(59,74,102,0.35)",
                        borderLeft: "1px solid rgba(59,74,102,0.35)",
                        borderRadius: 7,
                        padding: "7px 10px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: 10.5,
                          fontWeight: 700,
                          color: "#475569",
                          minWidth: 14,
                        }}
                      >
                        {i + 1}
                      </span>
                      <div
                        style={{
                          width: 3,
                          height: 20,
                          borderRadius: 999,
                          background: plan.accents[i],
                          flexShrink: 0,
                        }}
                      />
                      <span
                        style={{
                          fontSize: 12,
                          fontWeight: 600,
                          color: "#E2E8F0",
                        }}
                      >
                        {c}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Warning */}
                {plan.warning && (
                  <div
                    style={{
                      marginTop: 12,
                      display: "flex",
                      alignItems: "center",
                      gap: 7,
                      background: "rgba(245,158,11,0.08)",
                      borderTop: "1px solid rgba(245,158,11,0.22)",
                      borderRight: "1px solid rgba(245,158,11,0.22)",
                      borderBottom: "1px solid rgba(245,158,11,0.22)",
                      borderLeft: "1px solid rgba(245,158,11,0.22)",
                      borderRadius: 7,
                      padding: "7px 10px",
                    }}
                  >
                    <span style={{ fontSize: 11.5, color: "#FCD34D" }}>
                      {plan.warning}
                    </span>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Tradeoffs section header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 12,
          }}
        >
          <div>
            <span style={{ fontSize: 12, fontWeight: 600, color: "#38BDF8" }}>
              Selected — {selectedPlanLabel}
            </span>
            <div
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: "#FFFFFF",
                marginTop: 2,
              }}
            >
              Why this backup works
            </div>
          </div>
          <span
            style={{
              fontSize: 11,
              color: "#475569",
              borderTop: "1px solid rgba(71,85,105,0.3)",
              borderRight: "1px solid rgba(71,85,105,0.3)",
              borderBottom: "1px solid rgba(71,85,105,0.3)",
              borderLeft: "1px solid rgba(71,85,105,0.3)",
              borderRadius: 999,
              padding: "4px 11px",
            }}
          >
            ⓘ Illustrative prototype data
          </span>
        </div>

        {/* 3 benefit cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 12,
            marginBottom: 14,
          }}
        >
          {BENEFIT_CARDS.map((card) => (
            <div
              key={card.title}
              style={{
                background: card.bg,
                borderTop: `1px solid ${card.border}`,
                borderRight: `1px solid ${card.border}`,
                borderBottom: `1px solid ${card.border}`,
                borderLeft: `1px solid ${card.border}`,
                borderRadius: 12,
                padding: "16px 18px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 9,
                  marginBottom: 7,
                }}
              >
                <span style={{ fontSize: 15 }}>{card.emoji}</span>
                <span
                  style={{ fontSize: 12.5, fontWeight: 700, color: "#FFFFFF" }}
                >
                  {card.title}
                </span>
              </div>
              <div style={{ fontSize: 12, color: "#94A3B8", lineHeight: 1.6 }}>
                {card.body}
              </div>
            </div>
          ))}
        </div>

        {/* Transfer note box */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            background: "#1A2235",
            borderTop: "1px solid #3B4A66",
            borderRight: "1px solid #3B4A66",
            borderBottom: "1px solid #3B4A66",
            borderLeft: "1px solid #3B4A66",
            borderRadius: 12,
            padding: "14px 18px",
            marginBottom: 20,
          }}
        >
          <span style={{ fontSize: 18, flexShrink: 0 }}>📚</span>
          <div style={{ fontSize: 12.5, color: "#94A3B8", lineHeight: 1.55 }}>
            <strong style={{ color: "#E2E8F0" }}>
              Transfer / community college equivalents
            </strong>{" "}
            — If you completed equivalent coursework, contact your advisor to
            confirm articulation before locking a backup plan.
          </div>
        </div>

        {/* Bottom CTA */}
        <div
          style={{
            background: "#121824",
            borderTop: "2px solid #10B981",
            borderRight: "2px solid #10B981",
            borderBottom: "2px solid #10B981",
            borderLeft: "2px solid #10B981",
            borderRadius: 14,
            padding: "18px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 0 18px rgba(16,185,129,0.35)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 9,
                background: "rgba(16,185,129,0.14)",
                borderTop: "1px solid rgba(16,185,129,0.3)",
                borderRight: "1px solid rgba(16,185,129,0.3)",
                borderBottom: "1px solid rgba(16,185,129,0.3)",
                borderLeft: "1px solid rgba(16,185,129,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Icon
                d={ICONS.check}
                size={14}
                stroke="#10B981"
                strokeWidth={2.5}
              />
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#FFFFFF" }}>
                ✓ {selectedPlanLabel} is selected as your backup
              </div>
              <div style={{ fontSize: 12, color: "#CBD5E1", marginTop: 2 }}>
                You can still compare plans before finalizing.
              </div>
            </div>
          </div>
          <button
            onClick={() => navigateTo("Review Plan")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "#0284C7",
              border: "none",
              borderRadius: 9,
              padding: "11px 22px",
              color: "#fff",
              fontSize: 13,
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "0 0 18px rgba(2,132,199,0.4)",
              flexShrink: 0,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          >
            Review Final Plan{" "}
            <Icon
              d={ICONS.arrowRight}
              size={14}
              stroke="#fff"
              strokeWidth={2.5}
            />
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── PAGE 8: Review Academic Plan ────────────────────────────────────────────

function ReviewPlanPage({ navigateTo }: { navigateTo: (p: string) => void }) {
  const [finalized, setFinalized] = useState(false)

  const CHECKLIST = [
    { label: "Degree requirement mapping reviewed", ok: true },
    { label: "Personal constraints applied", ok: true },
    { label: "Live availability verified", ok: false, link: "Open Source ↗" },
    { label: "Advisor review completed", ok: false, link: "Open Source ↗" },
  ]

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <Header
        crumbs={["Backup Plans", "Finalize"]}
        crumbNav={(c) => {
          if (c === "Backup Plans") navigateTo("Backup Plans")
        }}
      />

      {/* Scrollable body */}
      <div
        style={{
          flex: 1,
          overflow: "auto",
          minHeight: 0,
          padding: "24px 32px 32px",
        }}
      >
        {/* Page title block */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 10,
            }}
          >
            <span style={{ fontSize: 24 }}>🎓</span>
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: "#64748B",
                borderTop: "1px solid rgba(100,116,139,0.3)",
                borderRight: "1px solid rgba(100,116,139,0.3)",
                borderBottom: "1px solid rgba(100,116,139,0.3)",
                borderLeft: "1px solid rgba(100,116,139,0.3)",
                borderRadius: 999,
                padding: "3px 11px",
              }}
            >
              • Prototype data
            </span>
          </div>
          <div
            style={{
              fontSize: 24,
              fontWeight: 800,
              letterSpacing: -0.5,
              color: "#FFFFFF",
              marginBottom: 6,
            }}
          >
            Review your academic plan
          </div>
          <div
            style={{
              fontSize: 13,
              color: "#94A3B8",
              maxWidth: 520,
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            Confirm the choices, tradeoffs, and source checks below. You remain
            in control of every decision.
          </div>
        </div>

        {/* Row 1 — two cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
            marginBottom: 16,
          }}
        >
          {/* Left: What's left */}
          <div
            style={{
              background: "#212B3D",
              borderRadius: 14,
              border: "1px solid #3B4A66",
              padding: "20px 22px",
            }}
          >
            <div
              style={{
                fontSize: 10.5,
                fontWeight: 700,
                color: "#64748B",
                letterSpacing: 0.9,
                textTransform: "uppercase",
                marginBottom: 4,
              }}
            >
              What's left
            </div>
            <div
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: "#FFFFFF",
                marginBottom: 16,
              }}
            >
              Remaining Requirements
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
                marginBottom: 18,
              }}
            >
              {[
                {
                  code: "CSE 101",
                  tag: "Major core",
                  units: "5 units",
                  accent: "#38BDF8",
                },
                {
                  code: "STAT 131",
                  tag: "Major support",
                  units: "5 units",
                  accent: "#10B981",
                },
                {
                  code: "GE: ER",
                  tag: "General education",
                  units: "5 units",
                  accent: "#FBBF24",
                },
              ].map((item) => (
                <div
                  key={item.code}
                  style={{ display: "flex", alignItems: "center", gap: 10 }}
                >
                  <Icon
                    d={ICONS.check}
                    size={14}
                    stroke="#10B981"
                    strokeWidth={2.5}
                  />
                  <div style={{ flex: 1 }}>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 7 }}
                    >
                      <span
                        style={{
                          fontSize: 13,
                          fontWeight: 700,
                          color: item.accent,
                        }}
                      >
                        {item.code}
                      </span>
                      <span style={{ fontSize: 11, color: "#64748B" }}>
                        {item.tag}
                      </span>
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: 11.5,
                      fontWeight: 600,
                      color: "#94A3B8",
                      fontFamily: "JetBrains Mono",
                    }}
                  >
                    {item.units}
                  </span>
                </div>
              ))}
            </div>
            <div
              style={{
                borderTop: "1px solid rgba(59,74,102,0.4)",
                paddingTop: 12,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ fontSize: 12, color: "#64748B" }}>
                Total planned
              </span>
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#FFFFFF",
                  fontFamily: "JetBrains Mono",
                }}
              >
                15 units
              </span>
            </div>
          </div>

          {/* Right: Plan B backup */}
          <div
            style={{
              background: "#212B3D",
              borderRadius: 14,
              border: "1px solid #3B4A66",
              padding: "20px 22px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 4,
              }}
            >
              <div
                style={{
                  fontSize: 10.5,
                  fontWeight: 700,
                  color: "#64748B",
                  letterSpacing: 0.9,
                  textTransform: "uppercase",
                }}
              >
                Plan B
              </div>
              <button
                onClick={() => navigateTo("Backup Plans")}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#38BDF8",
                  fontSize: 12,
                  fontWeight: 600,
                  padding: 0,
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              >
                Edit
              </button>
            </div>
            <div
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: "#FFFFFF",
                marginBottom: 16,
              }}
            >
              Backup strategy
            </div>
            <div
              style={{
                background: "#283246",
                borderTop: "1px solid #3B4A66",
                borderRight: "1px solid #3B4A66",
                borderBottom: "1px solid #3B4A66",
                borderLeft: "1px solid #3B4A66",
                borderRadius: 11,
                padding: "16px",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "flex-start", gap: 12 }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 9,
                    background: "rgba(56,189,248,0.1)",
                    borderTop: "1px solid rgba(56,189,248,0.2)",
                    borderRight: "1px solid rgba(56,189,248,0.2)",
                    borderBottom: "1px solid rgba(56,189,248,0.2)",
                    borderLeft: "1px solid rgba(56,189,248,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    fontSize: 15,
                  }}
                >
                  ⇄
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontSize: 12.5,
                      color: "#CBD5E1",
                      lineHeight: 1.6,
                      marginBottom: 12,
                    }}
                  >
                    Alternative CSE 101 section. Preserves the illustrative
                    requirement path and fits your saved commute buffer.
                  </div>
                  <span
                    style={{
                      fontSize: 11.5,
                      fontWeight: 700,
                      color: "#10B981",
                      background: "rgba(16,185,129,0.12)",
                      borderTop: "1px solid rgba(16,185,129,0.25)",
                      borderRight: "1px solid rgba(16,185,129,0.25)",
                      borderBottom: "1px solid rgba(16,185,129,0.25)",
                      borderLeft: "1px solid rgba(16,185,129,0.25)",
                      borderRadius: 999,
                      padding: "3px 11px",
                    }}
                  >
                    88 / 100 fit
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Row 2 — Before enrollment checklist */}
        <div
          style={{
            background: "#212B3D",
            borderRadius: 14,
            border: "1px solid #3B4A66",
            padding: "20px 22px",
            marginBottom: 16,
          }}
        >
          <div
            style={{
              fontSize: 10.5,
              fontWeight: 700,
              color: "#64748B",
              letterSpacing: 0.9,
              textTransform: "uppercase",
              marginBottom: 4,
            }}
          >
            Confidence check
          </div>
          <div
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: "#FFFFFF",
              marginBottom: 16,
            }}
          >
            Before enrollment
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {CHECKLIST.map((item, i) => (
              <div
                key={item.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "12px 0",
                  borderBottom:
                    i < CHECKLIST.length - 1
                      ? "1px solid rgba(59,74,102,0.3)"
                      : "none",
                }}
              >
                {item.ok ? (
                  <div
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: 999,
                      background: "rgba(16,185,129,0.12)",
                      borderTop: "1px solid rgba(16,185,129,0.25)",
                      borderRight: "1px solid rgba(16,185,129,0.25)",
                      borderBottom: "1px solid rgba(16,185,129,0.25)",
                      borderLeft: "1px solid rgba(16,185,129,0.25)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon
                      d={ICONS.check}
                      size={11}
                      stroke="#10B981"
                      strokeWidth={2.5}
                    />
                  </div>
                ) : (
                  <div
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: 999,
                      background: "rgba(245,158,11,0.1)",
                      borderTop: "1px solid rgba(245,158,11,0.25)",
                      borderRight: "1px solid rgba(245,158,11,0.25)",
                      borderBottom: "1px solid rgba(245,158,11,0.25)",
                      borderLeft: "1px solid rgba(245,158,11,0.25)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <span style={{ fontSize: 11 }}>⚠</span>
                  </div>
                )}
                <span
                  style={{
                    flex: 1,
                    fontSize: 13,
                    color: item.ok ? "#E2E8F0" : "#CBD5E1",
                    fontWeight: item.ok ? 500 : 400,
                  }}
                >
                  {item.label}
                </span>
                {item.link && (
                  <button
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "#38BDF8",
                      fontSize: 12,
                      fontWeight: 600,
                      padding: 0,
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      flexShrink: 0,
                    }}
                  >
                    {item.link}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Row 3 — AI notice */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 14,
            background: "#1A2235",
            borderTop: "1px solid #3B4A66",
            borderRight: "1px solid #3B4A66",
            borderBottom: "1px solid #3B4A66",
            borderLeft: "1px solid #3B4A66",
            borderRadius: 14,
            padding: "18px 20px",
            marginBottom: 24,
          }}
        >
          <span style={{ fontSize: 22, flexShrink: 0, lineHeight: 1 }}>🤖</span>
          <div>
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: "#FFFFFF",
                marginBottom: 4,
              }}
            >
              AI supports your decision — it does not make it.
            </div>
            <div style={{ fontSize: 12.5, color: "#94A3B8", lineHeight: 1.6 }}>
              All suggestions are illustrative and based on prototype data.
              Verify course availability, prerequisites, and requirements
              directly through the official UCSC catalog and your academic
              advisor before acting.
            </div>
          </div>
        </div>

        {/* Bottom action / finalized state */}
        {!finalized ? (
          <button
            onClick={() => setFinalized(true)}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              background: "#0284C7",
              border: "none",
              borderRadius: 12,
              padding: "16px 24px",
              color: "#fff",
              fontSize: 15,
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "0 0 24px rgba(2,132,199,0.4)",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          >
            <Icon d={ICONS.check} size={16} stroke="#fff" strokeWidth={2.5} />{" "}
            Finalize Prototype Plan
          </button>
        ) : (
          <div
            style={{
              background: "#121824",
              borderTop: "2px solid #10B981",
              borderRight: "2px solid #10B981",
              borderBottom: "2px solid #10B981",
              borderLeft: "2px solid #10B981",
              borderRadius: 12,
              padding: "18px 24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              boxShadow: "0 0 18px rgba(16,185,129,0.35)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 9,
                  background: "rgba(16,185,129,0.14)",
                  borderTop: "1px solid rgba(16,185,129,0.3)",
                  borderRight: "1px solid rgba(16,185,129,0.3)",
                  borderBottom: "1px solid rgba(16,185,129,0.3)",
                  borderLeft: "1px solid rgba(16,185,129,0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Icon
                  d={ICONS.check}
                  size={15}
                  stroke="#10B981"
                  strokeWidth={2.5}
                />
              </div>
              <div>
                <div
                  style={{ fontSize: 13, fontWeight: 700, color: "#FFFFFF" }}
                >
                  Plan finalized
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: "#CBD5E1",
                    marginTop: 2,
                    lineHeight: 1.5,
                  }}
                >
                  Saved in this prototype session. Verify official availability
                  and requirements before taking action.
                </div>
              </div>
            </div>
            <button
              onClick={() => navigateTo("Overview")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: "transparent",
                borderTop: "1px solid rgba(56,189,248,0.4)",
                borderRight: "1px solid rgba(56,189,248,0.4)",
                borderBottom: "1px solid rgba(56,189,248,0.4)",
                borderLeft: "1px solid rgba(56,189,248,0.4)",
                borderRadius: 9,
                padding: "10px 18px",
                color: "#38BDF8",
                fontSize: 13,
                fontWeight: 700,
                cursor: "pointer",
                flexShrink: 0,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              Return to Overview{" "}
              <Icon
                d={ICONS.arrowRight}
                size={14}
                stroke="#38BDF8"
                strokeWidth={2.5}
              />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Assistant Drawer ─────────────────────────────────────────────────────────
function AssistantDrawer({ onClose }: { onClose: () => void }) {
  const [chatActive, setChatActive] = useState(false)
  const [inputVal, setInputVal] = useState("")

  function sendMessage() {
    if (inputVal.trim() || !chatActive) setChatActive(true)
    setInputVal("")
  }

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 100,
          background: "rgba(11,15,25,0.6)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
        }}
      />

      {/* Drawer panel */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          zIndex: 101,
          width: 420,
          background: "#0F172A",
          borderLeft: "1px solid rgba(56,189,248,0.2)",
          display: "flex",
          flexDirection: "column",
          boxShadow: "-8px 0 40px rgba(0,0,0,0.5)",
          animation: "slideInRight 0.3s ease-out",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            padding: "20px 20px 16px",
            borderBottom: "1px solid rgba(59,74,102,0.4)",
            flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 11,
                background: "rgba(56,189,248,0.14)",
                borderTop: "1px solid rgba(56,189,248,0.3)",
                borderRight: "1px solid rgba(56,189,248,0.3)",
                borderBottom: "1px solid rgba(56,189,248,0.3)",
                borderLeft: "1px solid rgba(56,189,248,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Icon d={ICONS.sparkle} size={16} stroke="#38BDF8" />
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#FFFFFF" }}>
                Academic assistant
              </div>
              <div style={{ fontSize: 11, color: "#64748B", marginTop: 1 }}>
                Official-first · student-controlled
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "rgba(59,74,102,0.4)",
              border: "none",
              cursor: "pointer",
              color: "#94A3B8",
              fontSize: 16,
              width: 30,
              height: 30,
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              fontFamily: "system-ui",
            }}
          >
            ✕
          </button>
        </div>

        {/* Notice banner */}
        <div
          style={{
            margin: "14px 16px 0",
            background: "rgba(16,185,129,0.06)",
            borderTop: "1px solid rgba(16,185,129,0.3)",
            borderRight: "1px solid rgba(16,185,129,0.3)",
            borderBottom: "1px solid rgba(16,185,129,0.3)",
            borderLeft: "1px solid rgba(16,185,129,0.3)",
            borderRadius: 10,
            padding: "10px 14px",
            display: "flex",
            alignItems: "flex-start",
            gap: 10,
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: "50%",
              background: "rgba(16,185,129,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              marginTop: 1,
            }}
          >
            <Icon
              d={ICONS.check}
              size={10}
              stroke="#10B981"
              strokeWidth={2.5}
            />
          </div>
          <div style={{ fontSize: 11.5, color: "#A7F3D0", lineHeight: 1.55 }}>
            Uses official academic sources and your stated preferences. No
            invented ratings.
          </div>
        </div>

        {/* Chat area */}
        <div
          style={{
            flex: 1,
            overflow: "auto",
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          {/* Initial bot message */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
            <span style={{ fontSize: 20, flexShrink: 0, lineHeight: 1 }}>
              🤖
            </span>
            <div
              style={{
                background: "#1E293B",
                borderRadius: "4px 12px 12px 12px",
                padding: "12px 14px",
                maxWidth: 320,
              }}
            >
              <div style={{ fontSize: 13, color: "#CBD5E1", lineHeight: 1.6 }}>
                I can help you compare paths using official requirements and
                your saved preferences. I'll flag anything that needs
                verification.
              </div>
            </div>
          </div>

          {/* Chat active state */}
          {chatActive && (
            <>
              {/* User bubble */}
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <div
                  style={{
                    background: "#0284C7",
                    borderRadius: "12px 4px 12px 12px",
                    padding: "10px 14px",
                    maxWidth: 280,
                  }}
                >
                  <div style={{ fontSize: 13, color: "#fff", fontWeight: 500 }}>
                    Find a backup for CSE 101
                  </div>
                </div>
              </div>
              {/* Bot response */}
              <div
                style={{ display: "flex", alignItems: "flex-start", gap: 10 }}
              >
                <span style={{ fontSize: 20, flexShrink: 0, lineHeight: 1 }}>
                  🤖
                </span>
                <div
                  style={{
                    background: "#1E293B",
                    borderRadius: "4px 12px 12px 12px",
                    padding: "12px 14px",
                    maxWidth: 320,
                  }}
                >
                  <div
                    style={{ fontSize: 13, color: "#CBD5E1", lineHeight: 1.6 }}
                  >
                    For this prototype, I'd compare the requirement impact,
                    prerequisite sequence, and your commute constraints. Live
                    availability and instructor data still need official
                    verification.
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Bottom — suggestions + input */}
        <div
          style={{
            padding: "12px 16px 16px",
            borderTop: "1px solid rgba(59,74,102,0.4)",
            flexShrink: 0,
          }}
        >
          {/* Suggestion pills */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 7,
              marginBottom: 12,
            }}
          >
            {[
              "Check graduation risk",
              "Find a course backup",
              "Compare schedules",
            ].map((pill) => (
              <button
                key={pill}
                onClick={() => setChatActive(true)}
                style={{
                  background: "transparent",
                  borderTop: "1px solid rgba(59,74,102,0.6)",
                  borderRight: "1px solid rgba(59,74,102,0.6)",
                  borderBottom: "1px solid rgba(59,74,102,0.6)",
                  borderLeft: "1px solid rgba(59,74,102,0.6)",
                  borderRadius: 999,
                  padding: "6px 13px",
                  color: "#94A3B8",
                  fontSize: 12,
                  fontWeight: 500,
                  cursor: "pointer",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  transition: "all 0.15s",
                }}
              >
                {pill}
              </button>
            ))}
          </div>

          {/* Input row */}
          <div style={{ display: "flex", gap: 8 }}>
            <input
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ask about your plan..."
              style={{
                flex: 1,
                background: "#1E293B",
                borderTop: "1px solid rgba(59,74,102,0.5)",
                borderRight: "1px solid rgba(59,74,102,0.5)",
                borderBottom: "1px solid rgba(59,74,102,0.5)",
                borderLeft: "1px solid rgba(59,74,102,0.5)",
                borderRadius: 10,
                padding: "10px 14px",
                color: "#E2E8F0",
                fontSize: 13,
                outline: "none",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            />
            <button
              onClick={sendMessage}
              style={{
                width: 40,
                height: 40,
                background: "#0284C7",
                border: "none",
                borderRadius: 10,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                boxShadow: "0 0 12px rgba(2,132,199,0.4)",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>

          {/* Disclaimer */}
          <div
            style={{
              fontSize: 10.5,
              color: "#475569",
              marginTop: 10,
              lineHeight: 1.5,
              textAlign: "center",
            }}
          >
            Prototype responses are illustrative. Confirm academic decisions
            with official UCSC sources or an advisor.
          </div>
        </div>
      </div>
    </>
  )
}

// ─── Root App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [activeNav, setActiveNav] = useState("Overview")
  const [assistantOpen, setAssistantOpen] = useState(false)

  const renderPage = () => {
    switch (activeNav) {
      case "Degree Planner":
        return <DegreePlannerPage navigateTo={setActiveNav} />
      case "Course Explorer":
        return <CourseExplorerPage navigateTo={setActiveNav} />
      case "Course Insights":
        return <CourseInsightsPage navigateTo={setActiveNav} />
      case "Schedule Builder":
        return <ScheduleBuilderPage navigateTo={setActiveNav} />
      case "Backup Plans":
        return <BackupOptionsPage navigateTo={setActiveNav} />
      case "Review Plan":
        return <ReviewPlanPage navigateTo={setActiveNav} />
      default:
        return <OverviewPage navigateTo={setActiveNav} />
    }
  }

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        width: "100%",
        minHeight: "100vh",
        maxWidth: 1512,
        margin: "0 auto",
        overflow: "hidden",
        background: "#121824",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        color: "#fff",
      }}
    >
      <Sidebar
        activeNav={activeNav}
        setActiveNav={setActiveNav}
        onOpenAssistant={() => setAssistantOpen(true)}
      />
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
          overflowY: "auto",
        }}
      >
        {renderPage()}
      </div>
      {assistantOpen && (
        <AssistantDrawer onClose={() => setAssistantOpen(false)} />
      )}
    </div>
  )
}
