/**
 * Page-level frost layer. A single fixed element controlled by GSAP via its id
 * (`#page-frost`) — used by the wrist-shake gesture and the footer scrub.
 */
export function FrostOverlay() {
  return (
    <div
      id="page-frost"
      aria-hidden
      className="pointer-events-none fixed inset-0 z-40 backdrop-blur-lg"
      style={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-frost-pale/45" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.6),transparent_55%),radial-gradient(circle_at_75%_75%,rgba(194,214,230,0.5),transparent_50%)]" />
    </div>
  );
}
