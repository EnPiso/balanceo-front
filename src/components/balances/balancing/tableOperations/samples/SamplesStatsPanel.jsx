import { timeToSeconds } from '../../../../../ui/utils';

const SamplesStatsPanel = ({ samples, samSeg }) => {
  if (!samples || samples.length < 2) return null;

  const values = samples.map(s => timeToSeconds(s.sample));
  const n = values.length;
  const mean = values.reduce((a, b) => a + b, 0) / n;
  const variance = values.reduce((acc, v) => acc + (v - mean) ** 2, 0) / n;
  const stdDev = Math.sqrt(variance);
  const diff = mean - samSeg;

  return (
    <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded px-3 py-2">
      <span className="flex items-center gap-1">
        <span className="text-zinc-400">Media</span>
        <span className="font-bold text-zinc-800 dark:text-zinc-100">{mean.toFixed(1)} s</span>
      </span>
      <span className="flex items-center gap-1">
        <span className="text-zinc-400">Desv.</span>
        <span className="font-semibold text-zinc-500 dark:text-zinc-300">± {stdDev.toFixed(1)} s</span>
      </span>
      <span className="flex items-center gap-1">
        <span className="text-zinc-400">SAM</span>
        <span className="font-bold text-secondary_one dark:text-secondary_two">{samSeg} s</span>
      </span>
      <span className={`font-bold ${diff > 0 ? 'text-red-500' : 'text-green-600'}`}>
        Δ {diff > 0 ? '+' : ''}{diff.toFixed(1)} s
      </span>
    </div>
  );
};

export default SamplesStatsPanel;
