interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

const SectionHeader = ({ title, subtitle }: SectionHeaderProps) => {
  return (
    <div className="text-center mb-12 relative">
      <div className="section-divider"></div>
      <h2 className="text-3xl md:text-4xl font-bold mb-3 text-foreground transition-colors duration-300">{title}</h2>
      {subtitle && (
        <p className="text-center text-muted-foreground max-w-2xl mx-auto transition-colors duration-300">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
