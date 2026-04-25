export default function Card({ className = "", children, ...props }) {
  return (
    <div
      className={`rounded-2xl border border-line bg-surface ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className = "", children }) {
  return (
    <div className={`px-5 pt-5 pb-3 border-b border-line-muted ${className}`}>
      {children}
    </div>
  );
}

export function CardBody({ className = "", children }) {
  return <div className={`px-5 py-5 ${className}`}>{children}</div>;
}

export function CardFooter({ className = "", children }) {
  return (
    <div className={`px-5 py-4 border-t border-line-muted ${className}`}>
      {children}
    </div>
  );
}
