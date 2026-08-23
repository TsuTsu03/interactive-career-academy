import type { Metadata } from "next";
import { AccountScreen } from "@/components/account-screen";

export const metadata: Metadata = {
  title: "Account | Web Foundations",
  description: "Account connection status for the Web Foundations learning app.",
};

export default function AccountPage() {
  return <AccountScreen />;
}
