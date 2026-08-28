import type { Metadata } from "next";
import { EvidenceScreen } from "@/components/evidence-screen";

export const metadata: Metadata = { robots: { index: false, follow: false }, title: "Learning Proof", description: "A browser-generated preview of the evidence a CodeDaddy learner can export." };

export default function ProofPage() { return <EvidenceScreen proof />; }
