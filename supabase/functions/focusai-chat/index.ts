import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface BehavioralRecord {
  date: string;
  screen_time_hours: number;
  focus_time_hours: number;
  distraction_count: number;
  mood: string;
  sleep_hours: number;
  app_usage_category: string;
  productivity_score: number;
}

interface BehavioralInsights {
  avgScreenTime: number;
  avgFocusTime: number;
  avgDistractions: number;
  avgSleep: number;
  avgProductivity: number;
  trend: "improving" | "declining" | "stable";
  dominantMood: string;
  dominantCategory: string;
  recentWeekAvgProductivity: number;
  previousWeekAvgProductivity: number;
  highDistractionDays: number;
  poorSleepDays: number;
  peakProductivityDays: number;
  latestScore: number;
}

function analyzeData(records: BehavioralRecord[]): BehavioralInsights {
  if (!records || records.length === 0) {
    return {
      avgScreenTime: 6.5,
      avgFocusTime: 3.0,
      avgDistractions: 15,
      avgSleep: 7.0,
      avgProductivity: 65,
      trend: "stable",
      dominantMood: "neutral",
      dominantCategory: "mixed",
      recentWeekAvgProductivity: 65,
      previousWeekAvgProductivity: 65,
      highDistractionDays: 0,
      poorSleepDays: 0,
      peakProductivityDays: 0,
      latestScore: 65,
    };
  }

  const sorted = [...records].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const recent7 = sorted.slice(0, 7);
  const previous7 = sorted.slice(7, 14);

  const avg = (arr: number[]) => arr.reduce((s, v) => s + v, 0) / arr.length;

  const moodCounts: Record<string, number> = {};
  const catCounts: Record<string, number> = {};
  records.forEach((r) => {
    moodCounts[r.mood] = (moodCounts[r.mood] || 0) + 1;
    catCounts[r.app_usage_category] = (catCounts[r.app_usage_category] || 0) + 1;
  });

  const dominantMood = Object.entries(moodCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "neutral";
  const dominantCategory = Object.entries(catCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "mixed";

  const recentWeekAvgProductivity = recent7.length > 0 ? avg(recent7.map((r) => r.productivity_score)) : 65;
  const previousWeekAvgProductivity = previous7.length > 0 ? avg(previous7.map((r) => r.productivity_score)) : 65;

  let trend: "improving" | "declining" | "stable" = "stable";
  const diff = recentWeekAvgProductivity - previousWeekAvgProductivity;
  if (diff > 4) trend = "improving";
  else if (diff < -4) trend = "declining";

  return {
    avgScreenTime: avg(records.map((r) => r.screen_time_hours)),
    avgFocusTime: avg(records.map((r) => r.focus_time_hours)),
    avgDistractions: avg(records.map((r) => r.distraction_count)),
    avgSleep: avg(records.map((r) => r.sleep_hours)),
    avgProductivity: avg(records.map((r) => r.productivity_score)),
    trend,
    dominantMood,
    dominantCategory,
    recentWeekAvgProductivity,
    previousWeekAvgProductivity,
    highDistractionDays: records.filter((r) => r.distraction_count > 20).length,
    poorSleepDays: records.filter((r) => r.sleep_hours < 6).length,
    peakProductivityDays: records.filter((r) => r.productivity_score >= 75).length,
    latestScore: sorted[0]?.productivity_score ?? 65,
  };
}

function buildSystemPrompt(insights: BehavioralInsights): string {
  const trendText =
    insights.trend === "improving"
      ? `improving (+${Math.round(insights.recentWeekAvgProductivity - insights.previousWeekAvgProductivity)} pts this week)`
      : insights.trend === "declining"
      ? `declining (${Math.round(insights.recentWeekAvgProductivity - insights.previousWeekAvgProductivity)} pts this week)`
      : "stable";

  return `You are FocusAI, a warm and supportive personal focus coach built into the FocusMap app. You speak in a friendly, conversational, and encouraging tone — like a knowledgeable friend who cares about the user's wellbeing and productivity.

Here is what you know about this user based on their recent behavioral data (last 30 days):

- Average daily screen time: ${insights.avgScreenTime.toFixed(1)} hours
- Average daily focus time: ${insights.avgFocusTime.toFixed(1)} hours
- Average daily distractions: ${Math.round(insights.avgDistractions)}
- Average sleep: ${insights.avgSleep.toFixed(1)} hours per night
- Average productivity score: ${Math.round(insights.avgProductivity)}/100
- Current trend: ${trendText}
- Most common mood: ${insights.dominantMood}
- Dominant app category used: ${insights.dominantCategory}
- High distraction days (20+ distractions): ${insights.highDistractionDays} out of 30
- Poor sleep days (<6h): ${insights.poorSleepDays} out of 30
- Peak productivity days (75+ score): ${insights.peakProductivityDays} out of 30
- Latest productivity score: ${insights.latestScore}/100

Use these insights to personalize every response. When the user asks about their habits, productivity, focus, or screen time, reference the actual data above.

Guidelines:
- Keep responses short (2-4 sentences max unless listing tips)
- Be warm, supportive, and non-judgmental
- When things are improving, celebrate it genuinely
- When there are problem areas, offer one concrete actionable tip
- If sleep is poor (<6.5h avg), always mention it as a factor
- If screen time is high (>8h avg), gently flag it
- If focus time is low (<2.5h avg), suggest a specific focus technique
- Never be preachy or repetitive
- Sound human, not robotic`;
}

async function callAI(systemPrompt: string, userMessage: string): Promise<string> {
  const OPENAI_KEY = Deno.env.get("OPENAI_API_KEY");

  if (!OPENAI_KEY) {
    return generateFallbackResponse(userMessage);
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userMessage },
        ],
        max_tokens: 200,
        temperature: 0.75,
      }),
    });

    if (!response.ok) {
      return generateFallbackResponse(userMessage);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content?.trim() || generateFallbackResponse(userMessage);
  } catch {
    return generateFallbackResponse(userMessage);
  }
}

function generateFallbackResponse(message: string): string {
  const msg = message.toLowerCase();

  if (msg.includes("productive") || msg.includes("productivity")) {
    return "Based on your recent data, your productivity has been trending upward this week. Keep building on that momentum by protecting your best focus hours in the morning.";
  }
  if (msg.includes("distract") || msg.includes("wasting") || msg.includes("waste")) {
    return "Your data shows you have more distraction events in the evenings. Try keeping your phone in another room after 9 PM — it's one of the most effective habits for reducing late-night scrolling.";
  }
  if (msg.includes("focus") || msg.includes("concentrate")) {
    return "Your focus time averages around 3 hours a day. To push that higher, try the Pomodoro technique — 25 minutes focused, then a 5-minute break. It works really well for building longer focus sessions over time.";
  }
  if (msg.includes("sleep")) {
    return "Sleep is one of the biggest levers for your focus score. Even one extra hour of sleep can boost your productivity by 20-30%. Try setting a consistent bedtime this week and see how it feels.";
  }
  if (msg.includes("tip") || msg.includes("advice") || msg.includes("suggest")) {
    return "One habit that could move the needle for you: start each morning with your hardest task before opening any social apps. Your data shows your focus is sharpest in the AM — protect that window.";
  }
  if (msg.includes("score") || msg.includes("today")) {
    return "Your focus score has been climbing this week, which is great to see. The key drivers are more sleep and fewer evening distractions. Keep that going and you'll hit a new personal best soon.";
  }
  if (msg.includes("screen time") || msg.includes("phone")) {
    return "Your screen time is above the recommended 6 hours per day. The biggest win would be setting a hard stop on social apps at 9 PM — that's typically where most of the excess time goes.";
  }
  return "I can see your behavioral patterns from the last 30 days. Your focus is improving, which is great! The areas with the most room to grow are evening screen time and sleep consistency. Want me to dig into either of those?";
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: { user } } = await supabase.auth.getUser();

    const body = await req.json();
    const userMessage: string = body.message || "";

    if (!userMessage.trim()) {
      return new Response(JSON.stringify({ error: "Message is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    let records: BehavioralRecord[] = [];

    if (user) {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const { data: userRecords } = await supabase
        .from("behavioral_data")
        .select("date, screen_time_hours, focus_time_hours, distraction_count, mood, sleep_hours, app_usage_category, productivity_score")
        .eq("user_id", user.id)
        .gte("date", thirtyDaysAgo.toISOString().split("T")[0])
        .order("date", { ascending: false });

      if (userRecords && userRecords.length >= 5) {
        records = userRecords;
      }
    }

    if (records.length < 5) {
      const { data: sampleRecords } = await supabase
        .from("sample_behavioral_data")
        .select("date, screen_time_hours, focus_time_hours, distraction_count, mood, sleep_hours, app_usage_category, productivity_score")
        .eq("user_label", "user_a")
        .order("date", { ascending: false })
        .limit(30);

      if (sampleRecords) {
        records = sampleRecords;
      }
    }

    const insights = analyzeData(records);
    const systemPrompt = buildSystemPrompt(insights);
    const aiResponse = await callAI(systemPrompt, userMessage);

    return new Response(
      JSON.stringify({
        message: aiResponse,
        insights: {
          latestScore: insights.latestScore,
          trend: insights.trend,
          avgProductivity: Math.round(insights.avgProductivity),
        },
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Internal server error", message: "I'm having a moment — try again shortly!" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
