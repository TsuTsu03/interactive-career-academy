import type { Metadata } from "next";
import { ReviewSession } from "@/components/review-session";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: "Spaced review",
  description: "Review completed web development concepts at useful intervals.",
};

export default function ReviewPage() {
  return <ReviewSession />;
}
