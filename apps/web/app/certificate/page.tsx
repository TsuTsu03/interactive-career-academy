import type { Metadata } from "next";
import { CertificateScreen } from "@/components/certificate-screen";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: "Certificate",
  description: "Certificate of Completion requirements and unverified frontend preview.",
};

export default function CertificatePage() {
  return <CertificateScreen />;
}
