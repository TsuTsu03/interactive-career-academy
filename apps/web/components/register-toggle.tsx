import { copy, type Copy, type Register } from "@/lib/lesson-ir";

const TOGGLE_COPY = {
  label: { simple: "Reading level", standard: "Reading level" },
  simple: { simple: "Simple", standard: "Simple" },
  standard: { simple: "Standard", standard: "Standard" },
} satisfies Record<string, Copy>;

export function RegisterToggle({
  register,
  onChange,
}: {
  register: Register;
  onChange: (register: Register) => void;
}) {
  return (
    <div
      className="flex min-h-11 items-center rounded-lg border border-hairline bg-panel p-1"
      aria-label={copy(TOGGLE_COPY.label, register)}
    >
      {(["simple", "standard"] as const).map((option) => (
        <button
          key={option}
          type="button"
          aria-pressed={register === option}
          onClick={() => onChange(option)}
          className={`min-h-9 rounded-md px-3 text-sm transition-colors ${
            register === option ? "bg-raised text-chalk" : "text-ash hover:text-chalk"
          }`}
        >
          {copy(option === "simple" ? TOGGLE_COPY.simple : TOGGLE_COPY.standard, register)}
        </button>
      ))}
    </div>
  );
}
