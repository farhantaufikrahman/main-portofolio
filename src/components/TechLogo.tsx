import { logoFor } from "@/content/logos";

/**
 * Small brand logo for a technology label. Plain <img> on purpose: the files are tiny SVGs,
 * and next/image does not optimise SVG anyway.
 * Mostly-black logos ship a light variant that CSS swaps in on the night theme.
 */
export function TechLogo({ name, size = 18 }: { name: string; size?: number }) {
  const logo = logoFor(name);
  if (!logo) return null;
  return (
    <span className="logo" style={{ width: size, height: size }} aria-hidden>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={logo.src} alt="" width={size} height={size} loading="lazy" className={logo.darkSrc ? "logo--day" : undefined} />
      {logo.darkSrc && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={logo.darkSrc} alt="" width={size} height={size} loading="lazy" className="logo--night" />
      )}
    </span>
  );
}

/** A tag chip: logo (when we have one) plus the label. */
export function TechChip({ name }: { name: string }) {
  return (
    <li className="chip">
      <TechLogo name={name} />
      <span>{name}</span>
    </li>
  );
}
