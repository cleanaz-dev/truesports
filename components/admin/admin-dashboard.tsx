export default function AdminDashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Overview</h2>
        <p className="text-muted-foreground mt-1">Here is what is happening in your app today.</p>
      </div>

      {/* Standard App Stat Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <p className="text-sm font-medium text-muted-foreground">Total Users</p>
          <div className="mt-2 flex items-baseline gap-2">
            <p className="text-3xl font-bold">1,248</p>
            <span className="text-xs font-medium text-green-500">+12%</span>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <p className="text-sm font-medium text-muted-foreground">Active Subscriptions</p>
          <div className="mt-2 flex items-baseline gap-2">
            <p className="text-3xl font-bold">892</p>
            <span className="text-xs font-medium text-green-500">+4%</span>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <p className="text-sm font-medium text-muted-foreground">Monthly Revenue</p>
          <div className="mt-2 flex items-baseline gap-2">
            <p className="text-3xl font-bold">$12,450</p>
            <span className="text-xs font-medium text-red-500">-2%</span>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <p className="text-sm font-medium text-muted-foreground">System Status</p>
          <div className="mt-2 flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />
            <p className="text-xl font-bold">Operational</p>
          </div>
        </div>
        
      </div>
    </div>
  );
}