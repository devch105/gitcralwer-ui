import ProtectedRoute from "@/components/auth/ProtectedRoute";
import type { ReactNode } from "react";

export default function ChatLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}