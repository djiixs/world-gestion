interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function SectionTitle({ children, className = "" }: Props) {
  return (
    <div className="text-center">
      <h2
        className={`text-2xl md:text-3xl font-bold tracking-tight leading-tight ${className}`}
      >
        {children}
      </h2>
      <div className="mt-3 mx-auto h-0.5 w-10 rounded-full bg-primary/30" />
    </div>
  );
}
