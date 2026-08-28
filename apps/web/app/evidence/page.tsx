import type { Metadata } from "next";
import { EvidenceScreen } from "@/components/evidence-screen";

export const metadata: Metadata = { title: "Skill Evidence Ledger | CodeDaddy", description: "Exact completed checks, concepts, projects, rebuilds, and repairs recorded in this browser." };

export default function EvidencePage() { return <EvidenceScreen />; }
