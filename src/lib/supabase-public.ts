// Client for the user's own Supabase project (configured via Vercel env vars).
// Kept separate from src/integrations/supabase/client.ts, which is Lovable-managed.
import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

if (!url || !anonKey) {
  // Surfaces a clear error in the browser console if Vercel env vars are missing.
  console.error(
    "Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY. " +
      "Set them in Vercel → Project Settings → Environment Variables.",
  );
}

export const supabasePublic = createClient(url ?? "", anonKey ?? "", {
  auth: { persistSession: false, autoRefreshToken: false },
});
