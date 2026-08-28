import type { Metadata } from "next";
import { PublicCertificate } from "@/components/public-certificate";

export const metadata: Metadata = { title: "Certificate Record | CodeDaddy", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function PublicCertificatePage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  return <PublicCertificate code={code} />;
}
