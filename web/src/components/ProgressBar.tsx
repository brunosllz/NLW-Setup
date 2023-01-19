interface ProgresBarProps {
  progress: number
}

export function ProgressBar({ progress }: ProgresBarProps) {
  return (
    <div className="h-3 rounded-xl bg-zinc-700 w-full mt-4">
      <div
        role="progressbar"
        aria-label="Progresso de hábitos completados neste dia"
        aria-valuenow={75}
        className="h-3 rounded-xl bg-violet-600 w-3/4"
        style={{
          width: `${progress}%`,
        }}
      />
    </div>
  )
}
