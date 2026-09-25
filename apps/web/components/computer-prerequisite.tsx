import { Icon } from "@/components/icon";

export function ComputerPrerequisite() {
  return <p data-computer-prerequisite className="flex items-start gap-2 text-sm leading-relaxed text-on-surface-variant">
    <Icon name="terminal" size={18} />
    <span><strong>Computer needed.</strong> Use a laptop or desktop for the terminal and local development tools in this course.</span>
  </p>;
}
