"use client";

import { useEffect, useRef, useState } from "react";
import { flowNodes, flowScenarios, type FlowNodeId } from "@/content/site";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { logoFor } from "@/content/logos";

const NODE_W = 166;
const NODE_H = 58;

// All connections drawn faintly; the selected scenario lights up its own path.
const ALL_EDGES: [FlowNodeId, FlowNodeId][] = [
  ["browser", "cloudflare"], ["courier", "cloudflare"], ["midtrans", "cloudflare"], ["browser", "midtrans"],
  ["cloudflare", "gateway"], ["gateway", "backend"], ["backend", "oracle"], ["backend", "redis"],
  ["backend", "kafka"], ["backend", "courier"], ["backend", "browser"], ["github", "jenkins"],
  ["jenkins", "registry"], ["registry", "backend"],
];

function edgePath(a: FlowNodeId, b: FlowNodeId) {
  const p = flowNodes[a];
  const q = flowNodes[b];
  // gentle curve so parallel edges stay readable
  const mx = (p.x + q.x) / 2;
  const my = (p.y + q.y) / 2 - (Math.abs(p.x - q.x) > 300 ? 46 : 0);
  return `M${p.x} ${p.y} Q ${mx} ${my} ${q.x} ${q.y}`;
}

const key = (a: string, b: string) => [a, b].sort().join("~");

/** Interactive architecture: choose a scenario and watch the request travel through the system. */
export function FlowDiagram() {
  const [scenarioId, setScenarioId] = useState(flowScenarios[0].id);
  const scenario = flowScenarios.find((s) => s.id === scenarioId) ?? flowScenarios[0];
  const activeEdges = new Set(scenario.path.map(([a, b]) => key(a, b)));
  const activeNodes = new Set(scenario.path.flat());
  const reduced = usePrefersReducedMotion();
  const svgRef = useRef<SVGSVGElement>(null);

  // A packet rides each leg of the path in order, then the whole trip repeats.
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg || reduced) return;
    const legMs = 700;
    const cycleMs = scenario.path.length * legMs + 1200;
    const legs = Array.from(svg.querySelectorAll<SVGPathElement>(".flow__edge--active"));
    const packets = Array.from(svg.querySelectorAll<SVGCircleElement>(".flow__packet"));
    const lengths = legs.map((p) => p.getTotalLength());
    const t0 = performance.now();
    let frame = requestAnimationFrame(function tick(now) {
      const elapsed = (now - t0) % cycleMs;
      packets.forEach((dot, i) => {
        const local = elapsed - i * legMs;
        const leg = legs[i];
        if (!leg || local < 0 || local > legMs) {
          dot.style.opacity = "0";
          return;
        }
        const t = local / legMs;
        const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        const pt = leg.getPointAtLength(lengths[i] * eased);
        dot.setAttribute("cx", String(pt.x));
        dot.setAttribute("cy", String(pt.y));
        dot.style.opacity = "1";
      });
      frame = requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(frame);
  }, [scenario, reduced]);

  return (
    <div className="flow">
      <div className="flow__tabs" role="tablist" aria-label="Choose a scenario">
        {flowScenarios.map((s) => (
          <button
            key={s.id}
            type="button"
            role="tab"
            id={`flow-tab-${s.id}`}
            aria-selected={s.id === scenarioId}
            aria-controls="flow-panel"
            className={`flow__tab ${s.id === scenarioId ? "is-active" : ""}`}
            onClick={() => setScenarioId(s.id)}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="flow__body" id="flow-panel" role="tabpanel" aria-labelledby={`flow-tab-${scenario.id}`}>
        <div className="flow__canvas">
          <svg ref={svgRef} viewBox="0 0 1000 620" className="flow__svg" role="img" aria-label={`Architecture diagram: ${scenario.label}`}>
            {ALL_EDGES.filter(([a, b]) => !activeEdges.has(key(a, b))).map(([a, b]) => (
              <path key={key(a, b)} d={edgePath(a, b)} className="flow__edge" />
            ))}
            {scenario.path.map(([a, b], i) => (
              <path key={`${scenario.id}-e${i}`} d={edgePath(a, b)} className="flow__edge flow__edge--active" />
            ))}

            {/* packets travel the active path in order, then repeat (not rendered for reduced motion) */}
            {!reduced && scenario.path.map(([a, b], i) => (
              <circle
                key={`${scenario.id}-p${i}`}
                r="7"
                className="flow__packet"
                style={{ opacity: 0 }}
              />
            ))}

            {(Object.keys(flowNodes) as FlowNodeId[]).map((id) => {
              const n = flowNodes[id];
              const on = activeNodes.has(id);
              const logo = n.logo ? logoFor(n.logo) : null;
              // with a logo the text is left-aligned next to it, otherwise centred
              const tx = logo ? 50 : NODE_W / 2;
              const anchor = logo ? "start" : "middle";
              return (
                <g key={id} className={`flow__node ${on ? "is-on" : ""}`} transform={`translate(${n.x - NODE_W / 2} ${n.y - NODE_H / 2})`}>
                  <rect width={NODE_W} height={NODE_H} rx="6" />
                  {logo && <image href={logo.darkSrc ?? logo.src} x="14" y="16" width="26" height="26" className="flow__logo" />}
                  <text x={tx} y="25" textAnchor={anchor} className="flow__label">
                    {n.label}
                  </text>
                  <text x={tx} y="44" textAnchor={anchor} className="flow__detail">
                    {n.detail}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <ol className="flow__steps" key={scenario.id}>
          {scenario.steps.map((s, i) => (
            <li key={s} style={{ animationDelay: `${i * 90}ms` }}>
              {s}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
