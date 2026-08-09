export function NbaBoxScore({ boxscore }: { boxscore: any }) {
  if (!boxscore || !boxscore.players) return null;

  return (
    <div className="space-y-8">
      {boxscore.players.map((teamData: any) => {
        // NBA usually just has one main stat category block
        const stats = teamData.statistics[0]; 

        return (
          <div key={teamData.team.id} className="bg-card/40 border border-border rounded-2xl overflow-hidden">
            <div className="bg-muted px-4 py-3 border-b border-border">
              <h3 className="font-display font-bold uppercase">{teamData.team.displayName} Box Score</h3>
            </div>
            <div className="p-4 overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="border-b border-border text-muted-foreground">
                    <th className="pb-2 font-medium">Player</th>
                    {stats.labels.map((label: string) => (
                      <th key={label} className="pb-2 px-2 font-medium text-right">{label}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {stats.athletes.map((athleteData: any) => (
                    <tr key={athleteData.athlete.id} className="border-b border-border/50 last:border-0">
                      <td className="py-2 font-medium">
                        {athleteData.athlete.shortName}
                        <span className="text-xs text-muted-foreground ml-2">{athleteData.athlete.position?.abbreviation}</span>
                      </td>
                      {athleteData.stats.map((stat: string, i: number) => (
                        <td key={i} className="py-2 px-2 text-right text-muted-foreground">{stat}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
    </div>
  );
}