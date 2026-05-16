/**
 * Realistic fake app UIs rendered inside window mockups. Recognisable content
 * is the point — it's what makes the frost effect read as "a real window went
 * blurry" rather than an abstract placeholder.
 */

const kw = "text-[#8250df]";
const ty = "text-[#0a7ea4]";
const nm = "text-[#bc4c00]";
const cm = "text-ink-faint";

export function CodeMock() {
  const lines = [
    <>
      <span className={kw}>import</span> <span className={ty}>AppKit</span>
    </>,
    <span key="b" className={cm}>
      {"// one sharp window, the rest behind glass"}
    </span>,
    <>
      <span className={kw}>final class</span>{" "}
      <span className={ty}>FrostController</span> {"{"}
    </>,
    <>
      {"  "}
      <span className={kw}>let</span> blurRadius ={" "}
      <span className={nm}>18</span>
    </>,
    <>
      {"  "}
      <span className={kw}>func</span>{" "}
      <span className="text-[#1f6feb]">apply</span>
      (to window: <span className={ty}>NSWindow</span>) {"{"}
    </>,
    <>
      {"    "}
      <span className={kw}>let</span> glass ={" "}
      <span className={ty}>NSVisualEffectView</span>()
    </>,
    <>
      {"    "}glass.material = <span className={nm}>.hudWindow</span>
    </>,
    <>
      {"    "}glass.state = <span className={nm}>.active</span>
    </>,
    <>{"    "}window.contentView?.addSubview(glass)</>,
    <>{"  }"}</>,
    <>{"}"}</>,
  ];
  return (
    <div className="flex h-full bg-white">
      <div className="w-8 shrink-0 bg-frost-mist py-3 font-mono text-[9px] text-ink-faint">
        {lines.map((_, i) => (
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: fixed gutter
            key={i}
            className="pr-2 text-right leading-[1.65]"
          >
            {i + 1}
          </div>
        ))}
      </div>
      <pre className="flex-1 overflow-hidden py-3 pl-3 font-mono text-[10px] text-ink leading-[1.65]">
        {lines.map((line, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: fixed source listing
          <div key={i}>{line}</div>
        ))}
      </pre>
    </div>
  );
}

const chat = [
  {
    who: "Mia K.",
    at: "10:24",
    color: "bg-[#e8743b]",
    init: "MK",
    msg: "the frost layer ships tonight 🎉",
  },
  {
    who: "Arup B.",
    at: "10:25",
    color: "bg-glacier",
    init: "AB",
    msg: "can you bump the blur radius? feels light",
  },
  {
    who: "Mia K.",
    at: "10:26",
    color: "bg-[#e8743b]",
    init: "MK",
    msg: "done — 18pt now, looks like real glass",
  },
];

export function ChatMock() {
  return (
    <div className="flex h-full flex-col bg-white">
      <div className="border-frost-edge/60 border-b px-4 py-2.5">
        <p className="font-semibold text-[12px] text-ink"># design-sync</p>
        <p className="text-[9px] text-ink-faint">14 members · 3 online</p>
      </div>
      <div className="flex flex-1 flex-col justify-end gap-3 p-4">
        {chat.map((c) => (
          <div key={c.at} className="flex gap-2.5">
            <span
              className={`flex size-7 shrink-0 items-center justify-center rounded-md ${c.color} font-semibold text-[9px] text-white`}
            >
              {c.init}
            </span>
            <div>
              <p className="text-[10px] leading-none">
                <span className="font-semibold text-ink">{c.who}</span>{" "}
                <span className="text-ink-faint">{c.at}</span>
              </p>
              <p className="mt-1 text-[11px] text-ink-muted leading-snug">
                {c.msg}
              </p>
            </div>
          </div>
        ))}
        <div className="mt-1 rounded-md border border-frost-edge px-3 py-2 text-[10px] text-ink-faint">
          Message #design-sync
        </div>
      </div>
    </div>
  );
}

export function BrowserMock() {
  return (
    <div className="flex h-full flex-col bg-white">
      <div className="flex items-center gap-2 border-frost-edge/60 border-b bg-frost-mist px-3 py-2">
        <span className="rounded-md bg-white px-2 py-1 text-[9px] text-ink-muted ring-1 ring-frost-edge">
          Flights · Lisbon
        </span>
        <span className="flex-1 rounded-full bg-white px-3 py-1 text-[9px] text-ink-faint ring-1 ring-frost-edge">
          google.com/travel/flights
        </span>
      </div>
      <div className="flex-1 space-y-2 p-3">
        <p className="font-semibold text-[12px] text-ink">
          San Francisco → Lisbon
        </p>
        {[
          { air: "TAP Air Portugal", time: "09:40 → 13:15", price: "$214" },
          { air: "United + Lufthansa", time: "11:05 → 16:40", price: "$268" },
          { air: "Delta One", time: "14:20 → 19:55", price: "$391" },
        ].map((f) => (
          <div
            key={f.air}
            className="flex items-center justify-between rounded-lg border border-frost-edge px-3 py-2"
          >
            <div>
              <p className="text-[10px] text-ink">{f.air}</p>
              <p className="font-mono text-[9px] text-ink-faint">{f.time}</p>
            </div>
            <span className="font-semibold text-[11px] text-glacier-deep">
              {f.price}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CalendarMock() {
  const events = [
    {
      day: 1,
      top: "10%",
      h: "16%",
      label: "Standup",
      tone: "bg-glacier/25 text-glacier-deep",
    },
    {
      day: 2,
      top: "34%",
      h: "26%",
      label: "Design review",
      tone: "bg-[#e8743b]/25 text-[#bc4c00]",
    },
    {
      day: 0,
      top: "52%",
      h: "18%",
      label: "Focus block",
      tone: "bg-[#28c840]/25 text-[#1d7a32]",
    },
    {
      day: 3,
      top: "64%",
      h: "16%",
      label: "1:1 Mia",
      tone: "bg-glacier/25 text-glacier-deep",
    },
  ];
  return (
    <div className="flex h-full flex-col bg-white">
      <div className="border-frost-edge/60 border-b px-4 py-2.5">
        <p className="font-semibold text-[12px] text-ink">May 2026</p>
      </div>
      <div className="grid flex-1 grid-cols-5">
        {["Mon", "Tue", "Wed", "Thu", "Fri"].map((d, col) => (
          <div
            key={d}
            className="relative border-frost-edge/50 border-r last:border-r-0"
          >
            <p className="py-1.5 text-center text-[9px] text-ink-faint">{d}</p>
            {events
              .filter((e) => e.day === col)
              .map((e) => (
                <div
                  key={e.label}
                  className={`absolute inset-x-1 rounded-md px-1.5 py-1 text-[8px] leading-tight ${e.tone}`}
                  style={{ top: e.top, height: e.h }}
                >
                  {e.label}
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function MailMock() {
  const mail = [
    {
      from: "GitHub",
      subj: "FrostController — 2 new reviews",
      time: "9:12",
      unread: true,
    },
    {
      from: "Mia Kovač",
      subj: "Re: blur radius tuning",
      time: "8:47",
      unread: true,
    },
    {
      from: "Stripe",
      subj: "Your payout of $1,204 is on the way",
      time: "Mon",
    },
    {
      from: "TestFlight",
      subj: "Frosty 1.2 build is ready to test",
      time: "Mon",
    },
  ];
  return (
    <div className="flex h-full flex-col bg-white">
      <div className="border-frost-edge/60 border-b px-4 py-2.5">
        <p className="font-semibold text-[12px] text-ink">Inbox</p>
        <p className="text-[9px] text-ink-faint">2 unread</p>
      </div>
      <div className="flex-1 divide-y divide-frost-edge/50">
        {mail.map((m) => (
          <div key={m.subj} className="flex items-start gap-2 px-4 py-2.5">
            {m.unread ? (
              <span className="mt-1 size-1.5 shrink-0 rounded-full bg-glacier" />
            ) : (
              <span className="mt-1 size-1.5 shrink-0" />
            )}
            <div className="min-w-0 flex-1">
              <p className="flex justify-between text-[10px]">
                <span
                  className={
                    m.unread
                      ? "font-semibold text-ink"
                      : "font-medium text-ink-muted"
                  }
                >
                  {m.from}
                </span>
                <span className="text-ink-faint">{m.time}</span>
              </p>
              <p className="truncate text-[10px] text-ink-muted">{m.subj}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function DocMock() {
  return (
    <div className="h-full bg-white px-6 py-5">
      <p className="font-mono text-[9px] text-glacier-deep uppercase tracking-[0.18em]">
        Draft
      </p>
      <p className="mt-1 font-semibold text-[15px] text-ink leading-tight">
        Why the screen competes with you
      </p>
      <p className="mt-3 text-[10.5px] text-ink-muted leading-relaxed">
        You don't have a focus problem. You have twelve windows quietly
        screaming for your attention — a half-read thread, a file from last
        Tuesday, a terminal you forgot you opened.
      </p>
      <p className="mt-2.5 text-[10.5px] text-ink-muted leading-relaxed">
        The window you're working in should stay sharp and vivid. Everything
        else can soften into a calm backdrop you see past, but no longer get
        lost in.
      </p>
      <div className="mt-3 h-1.5 w-2/5 rounded-full bg-glacier/30" />
    </div>
  );
}

export function PrefsMock() {
  const sliders = [
    { label: "Frost intensity", fill: "72%" },
    { label: "Dim inactive windows", fill: "40%" },
    { label: "Edge falloff", fill: "55%" },
  ];
  return (
    <div className="h-full bg-white px-6 py-5">
      <p className="font-semibold text-[13px] text-ink">Frosty — Preferences</p>
      <div className="mt-4 space-y-3.5">
        {sliders.map((s) => (
          <div key={s.label}>
            <p className="mb-1 flex justify-between text-[10px]">
              <span className="text-ink-muted">{s.label}</span>
              <span className="font-mono text-glacier-deep">{s.fill}</span>
            </p>
            <div className="h-1.5 rounded-full bg-frost-edge">
              <div
                className="h-full rounded-full bg-glacier"
                style={{ width: s.fill }}
              />
            </div>
          </div>
        ))}
        <div className="flex items-center justify-between pt-1">
          <span className="text-[10px] text-ink-muted">
            Shake cursor to toggle
          </span>
          <span className="flex h-4 w-7 items-center rounded-full bg-glacier px-0.5">
            <span className="ml-auto size-3 rounded-full bg-white" />
          </span>
        </div>
      </div>
    </div>
  );
}

export function TerminalMock() {
  return (
    <div className="h-full bg-[#0f1720] px-5 py-4 font-mono text-[10px] leading-[1.7]">
      <p className="text-frost-edge">$ frosty --status</p>
      <p className="text-[#5b9fc9]">● active window: FrostController.swift</p>
      <p className="text-[#28c840]"> idle cpu ......... 0.0%</p>
      <p className="text-[#28c840]"> active cpu ....... 0.3%</p>
      <p className="text-[#28c840]"> memory ........... 38 MB</p>
      <p className="mt-1 text-frost-edge/60">
        $ the window that matters, in focus
        <span className="ml-1 inline-block h-3 w-1.5 translate-y-0.5 bg-frost-edge" />
      </p>
    </div>
  );
}
