import type { Metadata } from "next";
import { CapstonesScreen } from "@/components/capstones-screen";

export const metadata: Metadata = { title: "Front-End Capstones | CodeDaddy", description: "Five independent front-end project briefs with automated acceptance checks." };
export default function CapstonesPage() { return <CapstonesScreen />; }
