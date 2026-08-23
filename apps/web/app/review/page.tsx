import type { Metadata } from "next";
import { ReviewSession } from "@/components/review-session";

export const metadata: Metadata = {
  title: "Spaced Review | Web Foundations",
  description: "Review completed web development concepts at useful intervals.",
};

export default function ReviewPage() {
  return <ReviewSession />;
}
