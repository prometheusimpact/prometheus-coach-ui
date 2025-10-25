interface ProgramTileProps {
  label: string;
  value: string;
}

export const ProgramTile = ({ label, value }: ProgramTileProps) => {
  return (
    <div className="glass rounded-2xl p-6 text-center transition-smooth glass-hover">
      <p className="text-sm text-foreground mb-2">{label}</p>
      <p className="text-2xl font-heading text-primary">{value}</p>
    </div>
  );
};
