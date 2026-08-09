// components/leagues/standings-widget.tsx
export function StandingsWidget({ standingsData }: { standingsData: any[] }) {
  if (!standingsData?.length) return null;

  // Grab just the first group (e.g., Eastern Conference or AL East) to keep it small
  const group = standingsData[0]; 

  return (
    <div className="rounded-2xl bg-card/40 p-6 shadow-sm border border-border">
      <h3 className="font-display text-lg font-bold uppercase tracking-tight mb-4">
        {group.name} Standings
      </h3>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-muted-foreground text-left border-b border-border">
            <th className="pb-2">Team</th>
            <th className="pb-2 text-right">W</th>
            <th className="pb-2 text-right">L</th>
          </tr>
        </thead>
        <tbody>
          {group.standings.entries.slice(0, 5).map((team: any) => (
            <tr key={team.team.id} className="border-b border-border/50 last:border-0">
              <td className="py-2 font-medium flex items-center gap-2">
                <img src={team.team.logos[0].href} alt="logo" className="w-5 h-5" />
                {team.team.abbreviation}
              </td>
              {/* Note: stats array indexes vary by sport, inspect the JSON! */}
              <td className="py-2 text-right">{team.stats.find((s:any) => s.name === "wins")?.value}</td>
              <td className="py-2 text-right">{team.stats.find((s:any) => s.name === "losses")?.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}