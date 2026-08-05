"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Users, TrendingUp, Download, RefreshCw, Target } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { getAdminWaitlistAction, getAdminStatsAction } from "@/actions/admin";
import type { WaitlistEntry, WaitlistStats } from "@/types/waitlist";
import { APP_NAME, BRAND_NAME } from "@/lib/constants";

function StatCard({ label, value, icon: Icon }: { label: string; value: string | number; icon: React.ElementType }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
      <div className="flex items-center gap-3 mb-2">
        <Icon className="w-5 h-5 text-brand-accent" />
        <p className="text-sm text-purple-400">{label}</p>
      </div>
      <p className="text-3xl font-bold text-white">{value}</p>
    </div>
  );
}

function exportToCSV(entries: WaitlistEntry[]) {
  const headers = [
    "Position", "Business Name", "Owner", "Email", "WhatsApp",
    "Niche", "City", "Country", "Points", "Referrals", "Code", "Status", "Joined",
  ];
  const rows = entries.map((e) => [
    e.position, `"${e.businessName}"`, `"${e.ownerName}"`, e.email, e.whatsapp,
    e.businessNiche, e.city, e.country, e.points, e.referralsCount,
    e.referralCode, e.status, e.createdAt,
  ]);

  const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `hunter-ai-waitlist-${new Date().toISOString().split("T")[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function AdminPage() {
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);
  const [stats, setStats] = useState<WaitlistStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);

    const [listResult, statsResult] = await Promise.all([
      getAdminWaitlistAction(),
      getAdminStatsAction(),
    ]);

    if (!listResult.success) {
      setError(listResult.error ?? "Failed to load data.");
    } else {
      setEntries(listResult.data?.entries ?? []);
    }

    if (statsResult.success && statsResult.data) {
      setStats(statsResult.data);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const filtered = entries.filter(
    (e) =>
      e.businessName.toLowerCase().includes(filter.toLowerCase()) ||
      e.email.toLowerCase().includes(filter.toLowerCase()) ||
      e.country.toLowerCase().includes(filter.toLowerCase()) ||
      e.businessNiche.toLowerCase().includes(filter.toLowerCase())
  );

  const STATUS_VARIANT: Record<string, "purple" | "emerald" | "amber" | "red"> = {
    pending: "amber",
    approved: "emerald",
    active: "purple",
    onboarded: "emerald",
  };

  return (
    <div className="min-h-screen bg-[#0d0820]">
      {/* Top bar */}
      <header className="border-b border-white/10 bg-glass sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-purple to-brand-accent flex items-center justify-center">
              <Target className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="font-bold text-white leading-none">{APP_NAME}</p>
              <p className="text-[10px] text-purple-400 tracking-widest uppercase leading-none mt-0.5">
                {BRAND_NAME} · Admin
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="amber">Phase 0 — Waitlist</Badge>
            <Button variant="ghost" size="sm" onClick={load}>
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {error && (
          <div className="mb-6 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm">
            {error}
          </div>
        )}

        {/* Stats */}
        {stats && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          >
            <StatCard label="Total Signups" value={stats.totalCount} icon={Users} />
            <StatCard label="Total Referrals" value={stats.totalReferrals} icon={TrendingUp} />
            <StatCard label="Avg Points" value={stats.averagePoints} icon={TrendingUp} />
            <StatCard label="Top Country" value={Object.entries(stats.byLocation).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "—"} icon={TrendingUp} />
          </motion.div>
        )}

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="text"
            placeholder="Filter by name, email, niche, country..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-purple-400/50 focus:outline-none focus:border-brand-accent text-sm"
          />
          <Button
            variant="secondary"
            size="sm"
            onClick={() => exportToCSV(filtered)}
            disabled={filtered.length === 0}
          >
            <Download className="w-4 h-4" />
            Export CSV ({filtered.length})
          </Button>
        </div>

        {/* Table */}
        {loading ? (
          <div className="text-center py-20 text-purple-400">Loading waitlist data...</div>
        ) : (
          <div className="bg-glass rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-left">
                    {["#", "Business", "Owner", "Niche", "Country", "Points", "Referrals", "Status", "Joined"].map((h) => (
                      <th key={h} className="px-4 py-3 text-xs font-semibold text-purple-400 uppercase tracking-wider whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="px-4 py-12 text-center text-purple-500">
                        {filter ? "No entries match your filter." : "No entries yet."}
                      </td>
                    </tr>
                  ) : (
                    filtered.map((entry) => (
                      <tr
                        key={entry.id}
                        className="border-b border-white/5 hover:bg-white/5 transition-colors"
                      >
                        <td className="px-4 py-3 text-purple-400 font-mono">{entry.position}</td>
                        <td className="px-4 py-3">
                          <div>
                            <p className="text-white font-medium">{entry.businessName}</p>
                            <p className="text-purple-400 text-xs">{entry.email}</p>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-purple-200">{entry.ownerName}</td>
                        <td className="px-4 py-3 text-purple-300 whitespace-nowrap">{entry.businessNiche}</td>
                        <td className="px-4 py-3 text-purple-300">{entry.country}</td>
                        <td className="px-4 py-3 text-brand-accent font-semibold">{entry.points}</td>
                        <td className="px-4 py-3 text-purple-300">{entry.referralsCount}</td>
                        <td className="px-4 py-3">
                          <Badge variant={STATUS_VARIANT[entry.status] ?? "purple"}>
                            {entry.status}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 text-purple-500 whitespace-nowrap text-xs">
                          {new Date(entry.createdAt).toLocaleDateString("en-GB")}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
