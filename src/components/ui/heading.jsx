export const Heading = ({ title, description }) => {
  return (
    <div>
      <h2 className="text-3xl font-bold tracking-tight line-clamp-1">
        {title}
      </h2>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};
