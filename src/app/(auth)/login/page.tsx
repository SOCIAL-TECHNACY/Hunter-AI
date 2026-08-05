import { redirect } from "next/navigation";

/**
 * Placeholder login page — authentication will be implemented in Phase 1.
 * This route exists to support the middleware auth guard and future Supabase Auth integration.
 */
export default function LoginPage() {
  // Placeholder: redirect to home until auth is implemented
  redirect("/");
}
