import React, { useEffect } from 'react';

const machineNames = {
  pl: 'Plana',
  fl: 'Fileteadora',
  fi: 'Fileteadora',
  re: 'Recubridora',
  rec: 'Recubridora',
};

export const RadarChart = ({ data, size = 300, setArraySamplings }) => {
  const total = data.length;
  const center = size / 2;
  const radius = center - 40;
  const maxValue = Math.max(...data.map(d => d.average_percent || 0), 1);

  const points = data.map((item, index) => {
    const angle = (Math.PI * 2 / total) * index - Math.PI / 2;
    const normalizedValue = (item.average_percent / maxValue) * 100;
    const valueRadius = (normalizedValue / 100) * radius;
    const x = center + valueRadius * Math.cos(angle);
    const y = center + valueRadius * Math.sin(angle);

    const machineRaw = item.machine != null && typeof item.machine === 'object'
      ? item.machine.machine
      : item.machine;
    const shortKey = machineRaw != null ? String(machineRaw).toLowerCase() : '';
    const label = machineNames[shortKey] || String(machineRaw ?? '');

    return {
      x,
      y,
      machine: item.machine,
      average_percent: item.average_percent,
      label,
    };
  });

  const polygonPoints = points.map(p => `${p.x},${p.y}`).join(' ');

  useEffect(() => {
    if (setArraySamplings) {
      setArraySamplings([...points]);
    }
  }, [data]);

  return (
    <div className="radar-chart-container" style={{ padding: '20px' }}>
      <svg width={size} height={size}>
        {[0.25, 0.5, 0.75, 1].map((r, i) => (
          <circle key={i} cx={center} cy={center} r={r * radius} fill="none" stroke="#ddd" />
        ))}
        {points.map((p, i) => (
          <line key={i} x1={center} y1={center} x2={p.x} y2={p.y} stroke="#eee" />
        ))}
        <polygon points={polygonPoints} fill="rgba(128, 183, 174, 0.5)" stroke="#444" strokeWidth="1" />

        {points.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r={3} fill="#333" />
            <text x={p.x} y={p.y - 8} fontSize="10" textAnchor="middle">
              {p.average_percent.toFixed(1)}
            </text>
            <title>{`${p.label}: ${p.average_percent.toFixed(1)}%`}</title>
          </g>
        ))}

        {points.map((p, i) => {
          const angle = (Math.PI * 2 / total) * i - Math.PI / 2;
          const labelX = center + (radius + 30) * Math.cos(angle);
          const labelY = center + (radius + 30) * Math.sin(angle);
          return (
            <text key={`label-${i}`} x={labelX} y={labelY} fontSize="10" textAnchor="middle" fill="#222">
              {p.label}
            </text>
          );
        })}
      </svg>
    </div>
  );
};
