// Supabase Edge Function: send-application-email
//
// Forwards a Careers "Apply now" submission to the RGTvertex inbox using
// Resend (https://resend.com). Deployed separately from the frontend
// build — see SUPABASE_SETUP.md -> "Email forwarding" for deploy steps.
//
// Required secret (set with `supabase secrets set`) — shared with the
// send-contact-email function, no need to set it twice if already done:
//   RESEND_API_KEY   your Resend API key
//
// Optional secrets:
//   CONTACT_TO_EMAIL     defaults to rgtvertex.ai@outlook.com
//   CONTACT_FROM_EMAIL   defaults to onboarding@resend.dev (Resend's shared
//                        sandbox sender — swap for a verified domain sender
//                        once you've added a domain you own to Resend)

import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { job_role, name, email, phone, linkedin, portfolio, duration, resume_url } = await req.json();

    if (!job_role || !name || !email) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    const toEmail = Deno.env.get("CONTACT_TO_EMAIL") || "rgtvertex.ai@outlook.com";
    const fromEmail = Deno.env.get("CONTACT_FROM_EMAIL") || "onboarding@resend.dev";

    if (!RESEND_API_KEY) {
      return new Response(JSON.stringify({ error: "RESEND_API_KEY is not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const html = `
      <h2>New job application</h2>
      <p><strong>Role:</strong> ${escapeHtml(job_role)}</p>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      ${phone ? `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : ""}
      ${duration ? `<p><strong>Preferred duration:</strong> ${escapeHtml(duration)}</p>` : ""}
      ${linkedin ? `<p><strong>LinkedIn:</strong> ${escapeHtml(linkedin)}</p>` : ""}
      ${portfolio ? `<p><strong>Portfolio:</strong> ${escapeHtml(portfolio)}</p>` : ""}
      ${resume_url ? `<p><strong>Resume:</strong> <a href="${escapeHtml(resume_url)}">${escapeHtml(resume_url)}</a></p>` : "<p><em>No resume link was captured.</em></p>"}
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `RGTvertex Careers <${fromEmail}>`,
        to: [toEmail],
        reply_to: email,
        subject: `New application: ${job_role} - ${name}`,
        html,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      return new Response(JSON.stringify({ error: `Resend error: ${errText}` }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

function escapeHtml(str: string) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}