import { ElementType, ReactNode } from "react";

interface AdminPageHeaderProps {
  title: string;
  description?: string;
  icon?: ElementType;
  badges?: ReactNode;
  buttons?: ReactNode;
}

export function AdminPageHeader({
  title,
  description,
  icon: Icon,
  badges,
  buttons,
}: AdminPageHeaderProps) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      
      {/* LEFT SIDE: Icon, Title, Badges, and Description */}
      <div className="flex items-start gap-4">
        
        {/* Optional Icon */}
        {Icon && (
          <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Icon className="h-5 w-5" />
          </div>
        )}

        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              {title}
            </h1>
            
            {/* Optional Badges (Rendered right next to the title) */}
            {badges && (
              <div className="flex items-center gap-2">
                {badges}
              </div>
            )}
          </div>

          {/* Optional Description */}
          {description && (
            <p className="mt-1 text-sm text-muted-foreground">
              {description}
            </p>
          )}
        </div>
      </div>

      {/* RIGHT SIDE: Action Buttons */}
      {buttons && (
        <div className="flex shrink-0 items-center gap-2">
          {buttons}
        </div>
      )}
      
    </div>
  );
}