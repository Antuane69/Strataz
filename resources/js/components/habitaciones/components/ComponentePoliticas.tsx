import type { ComponentType, ReactNode } from "react";

interface ComponentePoliticasInterface {
  title: string;
  icon: ComponentType<{ size?: number }>;
  tone?: 'teal' | 'gold' | 'coral' | 'blue';
  className?: string;
  children: ReactNode;
}

export default function ComponentePoliticas({ title, icon: Icon, tone = 'teal', className = '', children }: ComponentePoliticasInterface) {
  return (
    <article className={`habitacion-policy-card habitacion-policy-card-${tone} ${className}`}>
      <div className="habitacion-policy-card-heading">
        <span className="habitacion-policy-icon">
          <Icon size={22} />
        </span>
        <h4>{title}</h4>
      </div>
      {children}
    </article>
  );
}