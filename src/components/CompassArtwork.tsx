export function CompassArtwork() {
  return (
    <div className="compass-art" aria-hidden="true">
      <div className="art-caption">
        <span className="tiny-dot" /> A little perspective. A possible next
        step.
      </div>
      <svg viewBox="0 0 440 390" className="compass-drawing">
        <defs>
          <pattern
            id="grid"
            width="24"
            height="24"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1" cy="1" r="0.7" fill="#b7c8ba" opacity=".45" />
          </pattern>
        </defs>
        <rect width="440" height="390" fill="url(#grid)" />
        <g transform="translate(220 192)">
          <circle r="149" fill="#f0f3e9" stroke="#cbd7c7" />
          <circle r="128" fill="none" stroke="#d7dfd0" strokeDasharray="2 7" />
          <circle r="103" fill="#f8f9f1" stroke="#b3c8b7" />
          <circle r="78" fill="none" stroke="#e0e6d9" />
          <path
            d="M0-96V96M-96 0H96M-67-67 67 67M67-67-67 67"
            stroke="#dde4d7"
          />
          <path d="m45-70-20 93-70 47 20-93z" fill="#d5dfce" />
          <path d="m45-70-20 93-50-46z" fill="#245d50" />
          <path d="m45-70-20 93L0 0z" fill="#3e7864" />
          <circle r="8" fill="#f9faf4" stroke="#245d50" strokeWidth="2" />
          <g
            fontFamily="system-ui,sans-serif"
            fontSize="11"
            fill="#50694f"
            textAnchor="middle"
          >
            <text y="-111">POSSIBILITY</text>
            <text y="119">PRACTICE</text>
          </g>
          {[
            [-0, -149],
            [129, -74],
            [129, 74],
            [0, 149],
            [-129, 74],
            [-129, -74],
          ].map(([x, y], i) => (
            <g key={i} transform={`translate(${x} ${y})`}>
              <circle
                r="13"
                fill={
                  [
                    "#e3e7d4",
                    "#d6e4d2",
                    "#c7decf",
                    "#b6d4ca",
                    "#b7cfd3",
                    "#c6d2df",
                  ][i]
                }
                stroke="#f8f9f2"
                strokeWidth="4"
              />
              <text
                y="3.5"
                textAnchor="middle"
                fill="#244f46"
                fontFamily="system-ui"
                fontSize="10"
              >
                {i + 1}
              </text>
            </g>
          ))}
        </g>
      </svg>
      <div className="art-note">
        <span className="note-line" />
        <div>
          <strong>Your own starting point.</strong>
          <span>More than one way to grow.</span>
        </div>
      </div>
      <div className="art-footer">
        <span>FIVE DOMAINS</span>
        <span className="art-divider" />
        <span>SIX DEVELOPMENTAL LANDMARKS</span>
      </div>
    </div>
  );
}
