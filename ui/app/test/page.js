"use client";
import { useCallback, useEffect, useRef, useState } from "react";

/* ---------- data and logic (simulated, in memory) ---------- */

// [symbol, name, start price, today's open as a ratio of start price]
const SEED = [
  ["BTC", "Bitcoin", 64200, 0.985],
  ["ETH", "Ethereum", 3150, 1.012],
  ["SOL", "Solana", 148, 0.97],
  ["BNB", "BNB", 590, 1.004],
  ["XRP", "XRP", 0.52, 0.99],
  ["DOGE", "Dogecoin", 0.14, 1.03],
  ["MNT", "Mantle", 0.78, 0.975],
];
const NGN_RATE = 1550; // demo rate
const fmt = (n, d) => n.toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d });
const decimals = (p) => (p < 1 ? 4 : 2);

function useExchange() {
  const [pairs, setPairs] = useState(() => SEED.map(([s, n, p, r]) => ({ s, n, p, o: p * r })));
  const [wallet, setWallet] = useState({
    USDT: 150000, BTC: 0.6, ETH: 4, SOL: 60, BNB: 0, XRP: 0, DOGE: 0, MNT: 0,
  });

  // Simulated price movement. Replace with a real feed later.
  useEffect(() => {
    const id = setInterval(() => {
      if (document.hidden) return;
      setPairs((prev) => prev.map((x) => ({ ...x, p: x.p * (1 + (Math.random() - 0.5) * 0.003) })));
    }, 1800);
    return () => clearInterval(id);
  }, []);

  const px = useCallback((s) => (s === "USDT" ? 1 : pairs.find((x) => x.s === s)?.p ?? 0), [pairs]);
  const total = Object.keys(wallet).reduce((a, s) => a + wallet[s] * px(s), 0);
  const pnl = pairs.reduce((a, x) => a + (wallet[x.s] ?? 0) * (x.p - x.o), 0);

  // Each action returns an error message, or null when it worked.
  const buy = (s, q) => {
    if (!(q > 0)) return "Enter an amount greater than zero.";
    const cost = q * px(s);
    if (cost > wallet.USDT + 1e-9) return "Not enough USDT. Use Deposit to add demo funds.";
    setWallet((w) => ({ ...w, USDT: w.USDT - cost, [s]: w[s] + q }));
    return null;
  };
  const sell = (s, q) => {
    if (!(q > 0)) return "Enter an amount greater than zero.";
    if (q > wallet[s] + 1e-12) return `You only have ${fmt(wallet[s], 6)} ${s} to sell.`;
    setWallet((w) => ({ ...w, USDT: w.USDT + q * px(s), [s]: w[s] - q }));
    return null;
  };
  const convert = (from, to, a) => {
    if (!(a > 0)) return "Enter an amount greater than zero.";
    if (from === to) return "Choose two different assets.";
    if (a > wallet[from] + 1e-12) return `You only have ${fmt(wallet[from], 6)} ${from}.`;
    const got = (a * px(from)) / px(to);
    setWallet((w) => ({ ...w, [from]: w[from] - a, [to]: w[to] + got }));
    return null;
  };
  const deposit = (a) => {
    if (!(a >= 1)) return "Enter at least 1 USDT.";
    setWallet((w) => ({ ...w, USDT: w.USDT + a }));
    return null;
  };

  return { pairs, wallet, px, total, pnl, buy, sell, convert, deposit };
}

/* ---------- small UI pieces ---------- */

const inputCls =
  "mt-1.5 w-full rounded-xl border border-[var(--line)] bg-[var(--chip)] px-3 py-3 outline-none focus:border-[var(--acc)]";
const labelCls = "mt-4 block text-sm font-semibold text-[var(--muted)]";
const primaryBtn = "rounded-full bg-[var(--acc)] px-6 py-3 font-bold text-[#1B1304]";
const ghostBtn = "rounded-full bg-[var(--chip)] px-6 py-3 font-bold";

const Icon = ({ children }) => (
  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    {children}
  </svg>
);

function Modal({ title, subtitle, onClose, children }) {
  const ref = useRef(null);
  useEffect(() => {
    const d = ref.current;
    if (d && !d.open) d.showModal();
  }, []);
  return (
    <dialog ref={ref} onClose={onClose} className="m-auto w-[min(420px,92vw)] rounded-3xl bg-white p-6 text-[var(--ink)] backdrop:bg-black/50">
      <h3 className="text-xl font-semibold">{title}</h3>
      {subtitle && <p className="mt-1 text-sm text-[var(--muted)]">{subtitle}</p>}
      {children}
    </dialog>
  );
}

function Row({ k, v }) {
  return (
    <div className="mt-2.5 flex justify-between text-sm text-[var(--muted)]">
      <span>{k}</span><b className="font-medium text-[var(--ink)]">{v}</b>
    </div>
  );
}

function Actions({ onClose, onOk, ok }) {
  return (
    <div className="mt-3 flex justify-end gap-2.5">
      <button className={ghostBtn} onClick={onClose}>Cancel</button>
      <button className={primaryBtn} onClick={onOk}>{ok}</button>
    </div>
  );
}

function MarketRow({ x, onOpen }) {
  const c = (x.p / x.o - 1) * 100;
  const up = c >= 0;
  return (
    <button onClick={onOpen} className="flex w-full items-center gap-3 border-b border-[var(--line)] py-3.5 text-left">
      <div className="flex-1">
        <b className="block text-base">{x.s}/USDT</b>
        <small className="text-[var(--muted)]">{x.n}</small>
      </div>
      <div className="text-right">
        <div>{fmt(x.p, decimals(x.p))}</div>
        <span className={`mt-0.5 inline-block min-w-[74px] rounded-lg px-2 py-1.5 text-center text-sm font-semibold text-white ${up ? "bg-[var(--up)]" : "bg-[var(--down)]"}`}>
          {up ? "+" : ""}{fmt(c, 2)}%
        </span>
      </div>
    </button>
  );
}

/* ---------- dialogs ---------- */

function TradeDialog({ symbol, ex, onClose, onDone }) {
  const [side, setSide] = useState("buy");
  const [qty, setQty] = useState("");
  const [error, setError] = useState("");
  const pair = ex.pairs.find((p) => p.s === symbol);
  const q = parseFloat(qty) || 0;

  const submit = () => {
    const err = side === "buy" ? ex.buy(symbol, q) : ex.sell(symbol, q);
    if (err) return setError(err);
    onDone(`${side === "buy" ? "Bought" : "Sold"} ${fmt(q, 6)} ${symbol}`);
    onClose();
  };
  const seg = (s, on) => `rounded-lg py-2 font-semibold ${side === s ? `${on} text-white` : "text-[var(--muted)]"}`;

  return (
    <Modal title={`${symbol}/USDT`} subtitle={`Market price $${fmt(pair.p, decimals(pair.p))}`} onClose={onClose}>
      <div className="mt-4 grid grid-cols-2 rounded-xl bg-[var(--chip)] p-1">
        <button className={seg("buy", "bg-[var(--up)]")} onClick={() => { setSide("buy"); setError(""); }}>Buy</button>
        <button className={seg("sell", "bg-[var(--down)]")} onClick={() => { setSide("sell"); setError(""); }}>Sell</button>
      </div>
      <label className={labelCls} htmlFor="qty">Amount ({symbol})</label>
      <input id="qty" className={inputCls} inputMode="decimal" placeholder="0.00" value={qty} autoFocus
        onChange={(e) => { setQty(e.target.value); setError(""); }} />
      <Row k="Order total" v={`$${fmt(q * pair.p, 2)}`} />
      <Row k="Available" v={side === "buy" ? `${fmt(ex.wallet.USDT, 2)} USDT` : `${fmt(ex.wallet[symbol], 6)} ${symbol}`} />
      <p role="alert" className="mt-2 min-h-5 text-sm text-[var(--down)]">{error}</p>
      <Actions onClose={onClose} onOk={submit} ok="Confirm" />
    </Modal>
  );
}

function ConvertDialog({ ex, onClose, onDone }) {
  const symbols = ["USDT", ...ex.pairs.map((p) => p.s)];
  const [from, setFrom] = useState("USDT");
  const [to, setTo] = useState("BTC");
  const [amt, setAmt] = useState("");
  const [error, setError] = useState("");
  const a = parseFloat(amt) || 0;
  const got = a && from !== to ? (a * ex.px(from)) / ex.px(to) : 0;

  const submit = () => {
    const err = ex.convert(from, to, a);
    if (err) return setError(err);
    onDone(`Converted to ${fmt(got, 6)} ${to}`);
    onClose();
  };
  const pick = (value, set) => (
    <select className={inputCls} value={value} onChange={(e) => { set(e.target.value); setError(""); }}>
      {symbols.map((s) => <option key={s}>{s}</option>)}
    </select>
  );

  return (
    <Modal title="Convert" onClose={onClose}>
      <label className={labelCls}>From{pick(from, setFrom)}</label>
      <label className={labelCls}>To{pick(to, setTo)}</label>
      <label className={labelCls} htmlFor="camt">Amount to convert</label>
      <input id="camt" className={inputCls} inputMode="decimal" placeholder="0.00" value={amt}
        onChange={(e) => { setAmt(e.target.value); setError(""); }} />
      <Row k="You get" v={got ? `${fmt(got, 6)} ${to}` : "–"} />
      <p role="alert" className="mt-2 min-h-5 text-sm text-[var(--down)]">{error}</p>
      <Actions onClose={onClose} onOk={submit} ok="Convert" />
    </Modal>
  );
}

function DepositDialog({ ex, onClose, onDone }) {
  const [amt, setAmt] = useState("");
  const [error, setError] = useState("");
  const submit = () => {
    const a = parseFloat(amt);
    const err = ex.deposit(a);
    if (err) return setError(err);
    onDone(`Added ${fmt(a, 2)} USDT`);
    onClose();
  };
  return (
    <Modal title="Add demo funds" subtitle="No real payment is made." onClose={onClose}>
      <label className={labelCls} htmlFor="damt">Amount (USDT)</label>
      <input id="damt" className={inputCls} inputMode="decimal" placeholder="1000" value={amt} autoFocus
        onChange={(e) => { setAmt(e.target.value); setError(""); }} />
      <p role="alert" className="mt-2 min-h-5 text-sm text-[var(--down)]">{error}</p>
      <Actions onClose={onClose} onOk={submit} ok="Add funds" />
    </Modal>
  );
}

/* ---------- the page ---------- */

const TABS = ["home", "markets", "assets"];

export default function Page() {
  const ex = useExchange();
  const [tab, setTab] = useState("home");
  const [hide, setHide] = useState(false);
  const [cur, setCur] = useState("USD");
  const [query, setQuery] = useState("");
  const [trade, setTrade] = useState(null);
  const [convertOpen, setConvertOpen] = useState(false);
  const [depositOpen, setDepositOpen] = useState(false);
  const [toast, setToast] = useState("");
  const timer = useRef(null);

  const say = (m) => {
    setToast(m);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(""), 2000);
  };

  const cv = (v) => fmt(cur === "USD" ? v : v * NGN_RATE, 0);
  const base = ex.total - ex.pnl;
  const pct = base ? (ex.pnl / base) * 100 : 0;
  const up = ex.pnl >= 0;
  const q = query.trim().toLowerCase();
  const filtered = ex.pairs.filter((p) => p.s.toLowerCase().includes(q) || p.n.toLowerCase().includes(q));
  const held = Object.keys(ex.wallet).filter((s) => ex.wallet[s] > 0);

  const quick = [
    ["Deposit", <Icon key="d"><path d="M17 7L7 17M7 9v8h8" /></Icon>, () => setDepositOpen(true)],
    ["Card", <Icon key="c"><rect x="3" y="6" width="18" height="13" rx="2" /><path d="M3 10h18" /></Icon>, () => say("Card is not in this demo")],
    ["Convert", <Icon key="v"><path d="M4 12a8 8 0 0113.7-5.7L20 8M20 4v4h-4M20 12a8 8 0 01-13.7 5.7L4 16M4 20v-4h4" /></Icon>, () => setConvertOpen(true)],
    ["More", <Icon key="m"><circle cx="5" cy="12" r="1.2" /><circle cx="12" cy="12" r="1.2" /><circle cx="19" cy="12" r="1.2" /></Icon>, () => say("More options are not in this demo")],
  ];

  return (
    <div className="mx-auto min-h-screen max-w-[520px] bg-white px-[18px] pb-24 pt-[max(14px,env(safe-area-inset-top))]">
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 flex-none place-items-center rounded-full bg-gradient-to-br from-[#FFB950] to-[#F26B3A] font-bold text-white" aria-hidden="true">T</div>
        <label className="flex h-10 flex-1 items-center gap-2 rounded-full bg-[var(--chip)] px-3.5">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="M20 20l-4-4" /></svg>
          <input className="h-full w-full bg-transparent outline-none" placeholder="Search BTC/USDT" aria-label="Search markets"
            value={query} onChange={(e) => { setQuery(e.target.value); if (e.target.value) setTab("markets"); }} />
        </label>
        <button className="p-1.5" aria-label="Scan" onClick={() => say("Scan is not in this demo")}>
          <Icon><path d="M4 8V5a1 1 0 011-1h3M16 4h3a1 1 0 011 1v3M20 16v3a1 1 0 01-1 1h-3M8 20H5a1 1 0 01-1-1v-3M8 12h8" /></Icon>
        </button>
        <button className="p-1.5" aria-label="Notifications" onClick={() => say("No new notifications")}>
          <Icon><path d="M6 17V11a6 6 0 1112 0v6l1.5 2h-15zM10 21h4" /></Icon>
        </button>
      </div>

      {tab === "home" && (
        <section>
          <div className="mb-1 mt-7 flex items-center gap-2 text-[var(--muted)]">
            Total Assets
            <button className="text-[13px] font-semibold" onClick={() => setHide(!hide)}>{hide ? "Show" : "Hide"}</button>
          </div>
          <div className="flex items-center justify-between gap-3">
            <div>
              <span className="text-[clamp(32px,9vw,40px)] font-bold tracking-tight">{hide ? "••••••" : cv(ex.total)}</span>
              <select className="ml-1 bg-transparent text-sm text-[var(--muted)]" aria-label="Currency" value={cur} onChange={(e) => setCur(e.target.value)}>
                <option>USD</option><option>NGN</option>
              </select>
            </div>
            <button className={`${primaryBtn} whitespace-nowrap`} onClick={() => setDepositOpen(true)}>Deposit</button>
          </div>
          <div className="mt-1.5 text-sm text-[var(--muted)]">
            Today’s PNL{" "}
            {hide ? "••••" : (
              <span className={up ? "text-[var(--up)]" : "text-[var(--down)]"}>
                {up ? "+" : "−"}{cv(Math.abs(ex.pnl))} {cur} ({fmt(Math.abs(pct), 1)}%)
              </span>
            )}
          </div>

          <div className="mb-2 mt-7 grid grid-cols-4 text-center text-[13px]">
            {quick.map(([label, icon, fn]) => (
              <button key={label} onClick={fn} className="flex flex-col items-center gap-2">
                <span className="grid h-[52px] w-[52px] place-items-center rounded-full bg-[var(--chip)]">{icon}</span>
                {label}
              </button>
            ))}
          </div>

          <h2 className="mb-1 mt-7 text-lg font-semibold">Hot markets</h2>
          {ex.pairs.slice(0, 4).map((x) => <MarketRow key={x.s} x={x} onOpen={() => setTrade(x.s)} />)}
          <p className="mt-5 text-xs text-[var(--muted)]">Demo only. Prices are simulated and no real money is used.</p>
        </section>
      )}

      {tab === "markets" && (
        <section>
          <h2 className="mb-1 mt-6 text-lg font-semibold">Markets</h2>
          {filtered.length
            ? filtered.map((x) => <MarketRow key={x.s} x={x} onOpen={() => setTrade(x.s)} />)
            : <p className="py-4 text-[var(--muted)]">No pair matches your search.</p>}
        </section>
      )}

      {tab === "assets" && (
        <section>
          <h2 className="mb-1 mt-6 text-lg font-semibold">Your assets</h2>
          {held.length ? held.map((s) => (
            <div key={s} className="flex justify-between border-b border-[var(--line)] py-3.5">
              <div><b>{s}</b><br /><small className="text-[var(--muted)]">{fmt(ex.wallet[s], s === "USDT" ? 2 : 6)}</small></div>
              <div>{hide ? "••••" : `$${fmt(ex.wallet[s] * ex.px(s), 2)}`}</div>
            </div>
          )) : <p className="py-4 text-[var(--muted)]">No assets yet. Tap Deposit to add demo funds.</p>}
        </section>
      )}

      <nav aria-label="Main" className="fixed inset-x-0 bottom-0 z-10 flex justify-center border-t border-[var(--line)] bg-white px-2.5 pb-[max(6px,env(safe-area-inset-bottom))] pt-1.5">
        {TABS.map((t) => (
          <button key={t} aria-current={tab === t ? "page" : undefined} onClick={() => setTab(t)}
            className={`max-w-[160px] flex-1 rounded-xl p-2.5 font-semibold capitalize ${tab === t ? "text-[var(--ink)]" : "text-[var(--muted)]"}`}>
            {t}
          </button>
        ))}
      </nav>

      {trade && <TradeDialog key={trade} symbol={trade} ex={ex} onClose={() => setTrade(null)} onDone={say} />}
      {convertOpen && <ConvertDialog ex={ex} onClose={() => setConvertOpen(false)} onDone={say} />}
      {depositOpen && <DepositDialog ex={ex} onClose={() => setDepositOpen(false)} onDone={say} />}

      <div role="status" className={`pointer-events-none fixed bottom-20 left-1/2 z-30 -translate-x-1/2 whitespace-nowrap rounded-full bg-[var(--ink)] px-[18px] py-2.5 text-white transition-opacity ${toast ? "opacity-100" : "opacity-0"}`}>
        {toast}
      </div>
    </div>
  );
}