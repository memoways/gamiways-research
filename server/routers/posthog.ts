/**
 * PostHog proxy router
 * Proxifies PostHog HogQL queries server-side so the API key is never exposed to the client.
 *
 * PostHog project IDs:
 *   - Dilemme Light  : 107669
 *   - Dilemme Flowise: 171071
 *   - AVA            : 137897
 *
 * EU endpoint: https://eu.posthog.com
 */

import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { ENV } from "../_core/env";

const POSTHOG_BASE = "https://eu.posthog.com";

// ── Types ────────────────────────────────────────────────────────────────────

export type PostHogRow = Record<string, unknown>;

// ── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Build a date range filter for HogQL based on the requested period.
 * "all" returns no date filter (all data).
 */
function buildDateFilter(period: "30d" | "90d" | "all"): { date_from?: string; days?: number } {
  if (period === "30d") return { date_from: "-30d", days: 30 };
  if (period === "90d") return { date_from: "-90d", days: 90 };
  return {}; // all data
}

/**
 * Execute a HogQL query against a PostHog project.
 */
async function runHogQL(
  projectId: number,
  query: string,
  apiKey: string
): Promise<PostHogRow[]> {
  const url = `${POSTHOG_BASE}/api/projects/${projectId}/query/`;

  const body = {
    query: {
      kind: "HogQLQuery",
      query,
    },
  };

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`PostHog API error ${res.status}: ${text}`);
  }

  const json = (await res.json()) as { results?: unknown[][]; columns?: string[] };
  const columns = json.columns ?? [];
  const rows = json.results ?? [];

  // Convert array-of-arrays to array-of-objects
  return rows.map((row) =>
    Object.fromEntries(columns.map((col, i) => [col, row[i]]))
  );
}

// ── Input schemas ─────────────────────────────────────────────────────────────

const periodSchema = z.enum(["30d", "90d", "all"]);

// ── Router ────────────────────────────────────────────────────────────────────

export const postHogRouter = router({
  /**
   * Health-check: verify the API key is set and PostHog is reachable.
   */
  ping: publicProcedure.query(async () => {
    const apiKey = ENV.postHogApiKey;
    if (!apiKey) return { ok: false, error: "POSTHOG_API_KEY not configured" };

    try {
      // Lightweight call: list projects
      const res = await fetch(`${POSTHOG_BASE}/api/projects/`, {
        headers: { Authorization: `Bearer ${apiKey}` },
      });
      return { ok: res.ok, status: res.status };
    } catch (e) {
      return { ok: false, error: String(e) };
    }
  }),

  // ── Dilemme Light (107669) ──────────────────────────────────────────────

  /**
   * Weekly TTS Phase 1 latency (p50 / p95) for Dilemme Light.
   */
  dilemmeLightTtsPhase1: publicProcedure
    .input(z.object({ period: periodSchema }))
    .query(async ({ input }) => {
      const apiKey = ENV.postHogApiKey;
      const { date_from } = buildDateFilter(input.period);
      const dateClause = date_from
        ? `AND toDate(timestamp) >= today() - INTERVAL ${(date_from as string).replace("-", "").replace("d", "")} DAY`
        : "";

      const query = `
        SELECT
          toStartOfWeek(timestamp) AS week,
          quantile(0.50)(toFloat(toString(properties.latency_ms))) AS p50,
          quantile(0.95)(toFloat(toString(properties.latency_ms))) AS p95,
          count() AS n
        FROM events
        WHERE event = 'tts_phase1_ready'
          AND properties.latency_ms IS NOT NULL
          ${dateClause}
        GROUP BY week
        ORDER BY week ASC
      `;

      return runHogQL(107669, query, apiKey);
    }),

  /**
   * Weekly TTS Phase 2 latency (p50 / p95) for Dilemme Light.
   */
  dilemmeLightTtsPhase2: publicProcedure
    .input(z.object({ period: periodSchema }))
    .query(async ({ input }) => {
      const apiKey = ENV.postHogApiKey;
      const { date_from } = buildDateFilter(input.period);
      const dateClause = date_from
        ? `AND toDate(timestamp) >= today() - INTERVAL ${(date_from as string).replace("-", "").replace("d", "")} DAY`
        : "";

      const query = `
        SELECT
          toStartOfWeek(timestamp) AS week,
          quantile(0.50)(toFloat(toString(properties.latency_ms))) AS p50,
          quantile(0.95)(toFloat(toString(properties.latency_ms))) AS p95,
          quantile(0.50)(toFloat(toString(properties.phase1_to_phase2_ms))) AS p50_delta,
          count() AS n
        FROM events
        WHERE event = 'tts_phase2_ready'
          AND properties.latency_ms IS NOT NULL
          ${dateClause}
        GROUP BY week
        ORDER BY week ASC
      `;

      return runHogQL(107669, query, apiKey);
    }),

  /**
   * Weekly voice turn total latency + STT latency (p50 / p95) for Dilemme Light.
   */
  dilemmeLightVoiceTurn: publicProcedure
    .input(z.object({ period: periodSchema }))
    .query(async ({ input }) => {
      const apiKey = ENV.postHogApiKey;
      const { date_from } = buildDateFilter(input.period);
      const dateClause = date_from
        ? `AND toDate(timestamp) >= today() - INTERVAL ${date_from.replace("-", "").replace("d", "")} DAY`
        : "";

      const query = `
        SELECT
          toStartOfWeek(timestamp) AS week,
          quantile(0.50)(toFloat(toString(properties.total_ms))) AS total_p50,
          quantile(0.95)(toFloat(toString(properties.total_ms))) AS total_p95,
          quantile(0.50)(toFloat(toString(properties.stt_latency_ms))) AS stt_p50,
          quantile(0.95)(toFloat(toString(properties.stt_latency_ms))) AS stt_p95,
          count() AS n
        FROM events
        WHERE event = 'voice_turn_complete'
          AND properties.total_ms IS NOT NULL
          ${dateClause}
        GROUP BY week
        ORDER BY week ASC
      `;

      return runHogQL(107669, query, apiKey);
    }),

  /**
   * Weekly welcome audio latency (cache hit vs miss) for Dilemme Light.
   */
  dilemmeLightWelcome: publicProcedure
    .input(z.object({ period: periodSchema }))
    .query(async ({ input }) => {
      const apiKey = ENV.postHogApiKey;
      const { date_from } = buildDateFilter(input.period);
      const dateClause = date_from
        ? `AND toDate(timestamp) >= today() - INTERVAL ${date_from.replace("-", "").replace("d", "")} DAY`
        : "";

      const query = `
        SELECT
          toStartOfWeek(timestamp) AS week,
          toString(properties.used_pregen) AS cache_hit,
          quantile(0.50)(toFloat(toString(properties.latency_ms))) AS p50,
          count() AS n
        FROM events
        WHERE event = 'welcome_audio_latency'
          AND properties.latency_ms IS NOT NULL
          ${dateClause}
        GROUP BY week, cache_hit
        ORDER BY week ASC, cache_hit ASC
      `;

      return runHogQL(107669, query, apiKey);
    }),

  /**
   * Weekly session stats (count, avg duration, avg actions) for Dilemme Light.
   */
  dilemmeLightSessions: publicProcedure
    .input(z.object({ period: periodSchema }))
    .query(async ({ input }) => {
      const apiKey = ENV.postHogApiKey;
      const { date_from } = buildDateFilter(input.period);
      const dateClause = date_from
        ? `AND toDate(timestamp) >= today() - INTERVAL ${date_from.replace("-", "").replace("d", "")} DAY`
        : "";

      const query = `
        SELECT
          toStartOfWeek(timestamp) AS week,
          count() AS sessions,
          avg(toFloat(toString(properties.duration_seconds))) AS avg_duration_s,
          avg(toFloat(toString(properties.actions_completed))) AS avg_actions
        FROM events
        WHERE event = 'session_ended'
          AND properties.duration_seconds IS NOT NULL
          ${dateClause}
        GROUP BY week
        ORDER BY week ASC
      `;

      return runHogQL(107669, query, apiKey);
    }),

  // ── Dilemme Flowise (171071) ────────────────────────────────────────────

  /**
   * Weekly TTS latency (p50 / p95, cache hit vs miss) for Dilemme Flowise.
   */
  dilemmeFlowiseTts: publicProcedure
    .input(z.object({ period: periodSchema }))
    .query(async ({ input }) => {
      const apiKey = ENV.postHogApiKey;
      const { date_from } = buildDateFilter(input.period);
      const dateClause = date_from
        ? `AND toDate(timestamp) >= today() - INTERVAL ${date_from.replace("-", "").replace("d", "")} DAY`
        : "";

      const query = `
        SELECT
          toStartOfWeek(timestamp) AS week,
          toString(properties.cacheHit) AS cache_hit,
          quantile(0.50)(toFloat(toString(properties.latencyMs))) AS p50,
          quantile(0.95)(toFloat(toString(properties.latencyMs))) AS p95,
          count() AS n
        FROM events
        WHERE event = 'tts_completed'
          AND properties.latencyMs IS NOT NULL
          ${dateClause}
        GROUP BY week, cache_hit
        ORDER BY week ASC, cache_hit ASC
      `;

      return runHogQL(171071, query, apiKey);
    }),

  /**
   * Weekly session duration + TTS request count for Dilemme Flowise.
   */
  dilemmeFlowiseSessions: publicProcedure
    .input(z.object({ period: periodSchema }))
    .query(async ({ input }) => {
      const apiKey = ENV.postHogApiKey;
      const { date_from } = buildDateFilter(input.period);
      const dateClause = date_from
        ? `AND toDate(timestamp) >= today() - INTERVAL ${date_from.replace("-", "").replace("d", "")} DAY`
        : "";

      const query = `
        SELECT
          toStartOfWeek(timestamp) AS week,
          count() AS sessions,
          avg(toFloat(toString(properties.durationMs))) / 1000 AS avg_duration_s
        FROM events
        WHERE event = 'session_complete'
          AND properties.durationMs IS NOT NULL
          ${dateClause}
        GROUP BY week
        ORDER BY week ASC
      `;

      return runHogQL(171071, query, apiKey);
    }),

  /**
   * Weekly TTS request count for Dilemme Flowise.
   */
  dilemmeFlowiseTtsRequests: publicProcedure
    .input(z.object({ period: periodSchema }))
    .query(async ({ input }) => {
      const apiKey = ENV.postHogApiKey;
      const { date_from } = buildDateFilter(input.period);
      const dateClause = date_from
        ? `AND toDate(timestamp) >= today() - INTERVAL ${date_from.replace("-", "").replace("d", "")} DAY`
        : "";

      const query = `
        SELECT
          toStartOfWeek(timestamp) AS week,
          count() AS tts_requests,
          avg(toFloat(toString(properties.charCount))) AS avg_chars
        FROM events
        WHERE event = 'tts_requested'
          ${dateClause}
        GROUP BY week
        ORDER BY week ASC
      `;

      return runHogQL(171071, query, apiKey);
    }),

  // ── AVA (137897) ────────────────────────────────────────────────────────

  /**
   * Weekly game sessions + completions for AVA.
   */
  avaSessions: publicProcedure
    .input(z.object({ period: periodSchema }))
    .query(async ({ input }) => {
      const apiKey = ENV.postHogApiKey;
      const { date_from } = buildDateFilter(input.period);
      const dateClause = date_from
        ? `AND toDate(timestamp) >= today() - INTERVAL ${date_from.replace("-", "").replace("d", "")} DAY`
        : "";

      const query = `
        SELECT
          toStartOfWeek(timestamp) AS week,
          event,
          count() AS n
        FROM events
        WHERE event IN ('game_started', 'game_over')
          ${dateClause}
        GROUP BY week, event
        ORDER BY week ASC, event ASC
      `;

      return runHogQL(137897, query, apiKey);
    }),

  /**
   * Character selection distribution for AVA.
   */
  avaCharacters: publicProcedure
    .input(z.object({ period: periodSchema }))
    .query(async ({ input }) => {
      const apiKey = ENV.postHogApiKey;
      const { date_from } = buildDateFilter(input.period);
      const dateClause = date_from
        ? `AND toDate(timestamp) >= today() - INTERVAL ${date_from.replace("-", "").replace("d", "")} DAY`
        : "";

      const query = `
        SELECT
          toString(properties.character) AS character,
          count() AS n
        FROM events
        WHERE event = 'character_selected'
          ${dateClause}
        GROUP BY character
        ORDER BY n DESC
      `;

      return runHogQL(137897, query, apiKey);
    }),

  /**
   * Phase completion distribution for AVA.
   */
  avaPhases: publicProcedure
    .input(z.object({ period: periodSchema }))
    .query(async ({ input }) => {
      const apiKey = ENV.postHogApiKey;
      const { date_from } = buildDateFilter(input.period);
      const dateClause = date_from
        ? `AND toDate(timestamp) >= today() - INTERVAL ${date_from.replace("-", "").replace("d", "")} DAY`
        : "";

      const query = `
        SELECT
          toString(properties.phase) AS phase,
          count() AS n
        FROM events
        WHERE event = 'phase_changed'
          ${dateClause}
        GROUP BY phase
        ORDER BY n DESC
      `;

      return runHogQL(137897, query, apiKey);
    }),

  /**
   * Voice modality distribution for AVA.
   */
  avaVoiceModality: publicProcedure
    .input(z.object({ period: periodSchema }))
    .query(async ({ input }) => {
      const apiKey = ENV.postHogApiKey;
      const { date_from } = buildDateFilter(input.period);
      const dateClause = date_from
        ? `AND toDate(timestamp) >= today() - INTERVAL ${date_from.replace("-", "").replace("d", "")} DAY`
        : "";

      const query = `
        SELECT
          toString(properties.modality) AS modality,
          count() AS n
        FROM events
        WHERE event = 'voice_modality_assigned'
          ${dateClause}
        GROUP BY modality
        ORDER BY n DESC
      `;

      return runHogQL(137897, query, apiKey);
    }),
});
