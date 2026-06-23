// Edge Function: submit-lead
// Accepts POST { name, email, company?, phone?, message?, source?, website? }
// `website` is a honeypot — if filled, we silently return success.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Max-Age": "86400",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders },
  });

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }
  if (req.method !== "POST") {
    return json({ ok: false, error: "Method not allowed" }, 405);
  }

  let payload: Record<string, unknown>;
  try {
    payload = await req.json();
  } catch {
    return json({ ok: false, error: "Invalid JSON" }, 400);
  }

  // Honeypot — bots fill hidden fields. Pretend success, don't insert.
  const honeypot = typeof payload.website === "string" ? payload.website.trim() : "";
  if (honeypot.length > 0) {
    return json({ ok: true });
  }

  const str = (v: unknown, max: number) =>
    typeof v === "string" ? v.trim().slice(0, max) : "";

  const name = str(payload.name, 200);
  const email = str(payload.email, 255).toLowerCase();
  const company = str(payload.company, 200) || null;
  const phone = str(payload.phone, 50) || null;
  const message = str(payload.message, 2000) || null;
  const source = str(payload.source, 100) || "website";

  if (!name) return json({ ok: false, error: "Name is required" }, 400);
  if (!email || !EMAIL_RE.test(email)) {
    return json({ ok: false, error: "A valid email is required" }, 400);
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !serviceKey) {
    console.error("submit-lead: missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
    return json({ ok: false, error: "Server misconfigured" }, 500);
  }

  const supabase = createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { error } = await supabase
    .from("leads")
    .insert({ name, email, company, phone, message, source });

  if (error) {
    console.error("submit-lead insert error:", error);
    return json({ ok: false, error: "Could not save your details. Please try again." }, 500);
  }

  return json({ ok: true });
});
