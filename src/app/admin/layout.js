import AdminShell from "@/components/AdminShell";
import { AuthProvider } from "@/components/AuthProvider";

export default function AdminLayout({ children }) {
  return (
    <AuthProvider>
      <AdminShell>{children}</AdminShell>
    </AuthProvider>
  );
}
