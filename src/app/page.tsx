import { Suspense } from "react";
import AuthPage from "@/components/auth/AuthPage";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
export default function Home() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <AuthPage type="login" />
    </Suspense>
  );
}
