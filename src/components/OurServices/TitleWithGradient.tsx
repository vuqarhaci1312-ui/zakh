type TitleWithGradientProps = {
  title: string;
  accent?: string;
};

export default function TitleWithGradient({ title, accent }: TitleWithGradientProps) {
  if (!accent || !title.includes(accent)) {
    return <>{title}</>;
  }

  const index = title.indexOf(accent);
  const before = title.slice(0, index);
  const after = title.slice(index + accent.length);

  return (
    <>
      {before}
      <span className="text-gradient-orange">{accent}</span>
      {after}
    </>
  );
}

export function BrochureTitle({ title }: { title: string }) {
  const spaceIndex = title.indexOf(" ");
  if (spaceIndex === -1) {
    return <span className="text-gradient-orange">{title}</span>;
  }

  return (
    <>
      <span className="text-gradient-orange">{title.slice(0, spaceIndex)}</span>
      {title.slice(spaceIndex)}
    </>
  );
}
