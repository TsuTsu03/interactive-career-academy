import type { Metadata } from "next";
import { EvidenceScreen } from "@/components/evidence-screen";

export const metadata: Metadata = { robots: { index: false, follow: false }, title: "Skill Evidence Ledger", description: "Exact completed checks, concepts, projects, rebuilds, and repairs recorded in this browser." };

export default function EvidencePage() { return <EvidenceScreen />; }
