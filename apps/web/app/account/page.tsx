import type { Metadata } from "next";
import { AccountScreen } from "@/components/account-screen";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: "Account",
  description: "Account connection status for CodeDaddy.",
};

export default function AccountPage() {
  return <AccountScreen />;
}
