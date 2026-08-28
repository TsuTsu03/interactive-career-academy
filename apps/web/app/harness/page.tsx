import { HarnessRunner } from "@/components/harness-runner";

export const metadata = {
  title: "Authoring harness",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <HarnessRunner />;
}
