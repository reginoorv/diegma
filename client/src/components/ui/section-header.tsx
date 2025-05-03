interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

const SectionHeader = ({ title, subtitle }: SectionHeaderProps) => {
  return (
    <div className="text-center mb-12">
      <div className="section-divider"></div>
      <h2 className="text-3xl md:text-4xl font-bold mb-2">{title}</h2>
      {subtitle && <p className="text-center text-gray-500">{subtitle}</p>}
    </div>
  );
};

export default SectionHeader;
