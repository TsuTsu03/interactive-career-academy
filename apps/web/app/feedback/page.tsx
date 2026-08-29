import type { Metadata } from "next";
import { FeedbackScreen } from "@/components/feedback-screen";
import { pageOpenGraph } from "@/lib/site";

const DESCRIPTION =
  "Report a confusing step, a checker that will not pass, or something you wish CodeDaddy had. No account needed.";

export const metadata: Metadata = {
  title: "Feedback",
  description: DESCRIPTION,
  alternates: { canonical: "/feedback" },
  openGraph: pageOpenGraph({
    url: "/feedback",
    title: "Feedback | CodeDaddy",
    description: DESCRIPTION,
  }),
};

export default function Page() {
  return <FeedbackScreen />;
}
