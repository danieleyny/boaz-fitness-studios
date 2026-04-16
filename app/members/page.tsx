import type { Metadata } from "next";
import MembersPortal from "@/components/sections/MembersPortal";

export const metadata: Metadata = {
  title: "Members Portal — Boaz Fitness Studios",
  description: "Sign in to your Boaz member account.",
};

export default function MembersPage() {
  return <MembersPortal />;
}
