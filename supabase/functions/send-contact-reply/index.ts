import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { name, email, message } = await req.json();

    // 1️⃣ Send mail to admin
    // await resend.emails.send({
    //   from: "FertiBase <noreply@fertibase.com>",
    //   to: ["admin@fertibase.com"],
    //   subject: "New Contact Message",
    //   html: `
    //     <h3>New Message</h3>
    //     <p><b>Name:</b> ${name}</p>
    //     <p><b>Email:</b> ${email}</p>
    //     <p>${message}</p>
    //   `,
    // });

    // 2️⃣ AUTO-REPLY to user ✅
    await resend.emails.send({
      from: "FertiBase <support@fertibase.com>",
      to: [email],
      subject: "We received your message 🌱",
      html: `
        <p>Hi ${name},</p>
        <p>Thank you for contacting <b>FertiBase</b>.</p>
        <p>Our team has received your message and will get back to you shortly.</p>
        <br/>
        <p>🌱 Team FertiBase</p>
      `,
    });

    return new Response(
      JSON.stringify({ success: true }),
      { headers: corsHeaders }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Email failed" }),
      { status: 500, headers: corsHeaders }
    );
  }
});
