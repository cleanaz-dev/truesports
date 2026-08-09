export function MlbBoxScore({ boxscore }: { boxscore: any }) {
  if (!boxscore || !boxscore.players) return null;

  return (
    <div className="space-y-8">
      {boxscore.players.map((teamData: any) => (
        <div key={teamData.team.id} className="bg-card/40 border border-border rounded-2xl overflow-hidden">
          <div className="bg-muted px-4 py-3 border-b border-border">
            <h3 className="font-display font-bold uppercase">{teamData.team.displayName} Stats</h3>
          </div>
          
          {/* MLB Data has specific objects inside statistics array like "batting" and "pitching" */}
          {teamData.statistics.map((statCategory: any, idx: number) => (
            <div key={idx} className="p-4">
              <h4 className="text-sm font-bold text-muted-foreground uppercase mb-2">
                {statCategory.name} {/* e.g., "batting", "pitching" */}
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead>
                    <tr className="border-b border-border text-muted-foreground">
                      <th className="pb-2 font-medium">Player</th>
                      {statCategory.labels.map((label: string) => (
                        <th key={label} className="pb-2 px-2 font-medium text-right">{label}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {statCategory.athletes.map((athleteData: any) => (
                      <tr key={athleteData.athlete.id} className="border-b border-border/50 last:border-0">
                        <td className="py-2 font-medium">{athleteData.athlete.shortName}</td>
                        {athleteData.stats.map((stat: string, i: number) => (
                          <td key={i} className="py-2 px-2 text-right text-muted-foreground">{stat}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}