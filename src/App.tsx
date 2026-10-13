import { useEffect, useState, type ReactNode } from "react";

type Screen =
  | "home"
  | "addresses"
  | "items"
  | "vehicle"
  | "speed"
  | "quote"
  | "payment"
  | "searching"
  | "assigned"
  | "tracking"
  | "completed"
  | "rate"
  | "dispute"
  | "dispute-status";

const screens: Screen[] = [
  "home",
  "addresses",
  "items",
  "vehicle",
  "speed",
  "quote",
  "payment",
  "searching",
  "assigned",
  "tracking",
  "completed",
  "rate",
  "dispute",
  "dispute-status",
];

export type IconName =
  | "arrow"
  | "back"
  | "box"
  | "briefcase"
  | "calendar"
  | "camera"
  | "car"
  | "card"
  | "check"
  | "chevron"
  | "clock"
  | "document"
  | "home"
  | "location"
  | "message"
  | "minus"
  | "package"
  | "phone"
  | "plus"
  | "route"
  | "search"
  | "shield"
  | "star"
  | "support"
  | "user"
  | "van"
  | "wallet"
  | "x";

export function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, ReactNode> = {
    arrow: <><path d="M5 12h14M14 7l5 5-5 5" /></>,
    back: <><path d="m15 18-6-6 6-6" /></>,
    box: <><path d="m4 7 8-4 8 4-8 4-8-4Z" /><path d="M4 7v10l8 4 8-4V7M12 11v10" /></>,
    briefcase: <><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V4h8v3M3 12h18" /></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /></>,
    camera: <><path d="M14.5 5 13 3h-2L9.5 5H5a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-4.5Z" /><circle cx="12" cy="13" r="4" /></>,
    car: <><path d="m5 11 1.5-5h11l1.5 5" /><path d="M4 11h16v7H4zM7 18v2M17 18v2" /><circle cx="7.5" cy="14.5" r=".5" /><circle cx="16.5" cy="14.5" r=".5" /></>,
    card: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 10h18M7 15h3" /></>,
    check: <><path d="m5 12 4 4L19 6" /></>,
    chevron: <><path d="m9 18 6-6-6-6" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    document: <><path d="M6 3h9l3 3v15H6zM14 3v4h4M9 12h6M9 16h6" /></>,
    home: <><path d="m3 11 9-8 9 8M5 10v11h14V10M9 21v-7h6v7" /></>,
    location: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    message: <><path d="M21 15a3 3 0 0 1-3 3H9l-6 3 2-5a7 7 0 0 1-2-5V8a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3z" /></>,
    minus: <><path d="M5 12h14" /></>,
    package: <><path d="m4 8 8-4 8 4v9l-8 4-8-4Z" /><path d="m4 8 8 4 8-4M12 12v9" /></>,
    phone: <><path d="M7 3 4 5c0 8 7 15 15 15l2-3-5-3-2 2c-3-1-5-3-6-6l2-2Z" /></>,
    plus: <><path d="M12 5v14M5 12h14" /></>,
    route: <><circle cx="6" cy="18" r="2" /><circle cx="18" cy="6" r="2" /><path d="M8 18h3a3 3 0 0 0 3-3V9a3 3 0 0 1 3-3" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    shield: <><path d="M12 3 4 6v6c0 5 3.5 8 8 10 4.5-2 8-5 8-10V6z" /><path d="m9 12 2 2 4-4" /></>,
    star: <><path d="m12 3 2.8 5.8 6.2.9-4.5 4.5 1.1 6.3-5.6-3-5.6 3 1.1-6.3L3 9.7l6.2-.9Z" /></>,
    support: <><circle cx="12" cy="12" r="9" /><path d="M8 15v-3a4 4 0 0 1 8 0v3M8 15H6v-4h2M16 15h2v-4h-2M16 15c0 2-1 3-3 3" /></>,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
    van: <><path d="M3 6h11v12H3zM14 10h4l3 4v4h-7z" /><circle cx="7" cy="18" r="2" /><circle cx="18" cy="18" r="2" /></>,
    wallet: <><path d="M4 6h15a2 2 0 0 1 2 2v11H4a2 2 0 0 1-2-2V6a3 3 0 0 1 3-3h12" /><path d="M16 11h5v4h-5a2 2 0 0 1 0-4Z" /></>,
    x: <><path d="m6 6 12 12M18 6 6 18" /></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

export function Button({
  children,
  onClick,
  variant = "primary",
  icon,
  disabled,
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  icon?: IconName;
  disabled?: boolean;
}) {
  return <button className={`button ${variant}`} onClick={onClick} disabled={disabled}><span>{children}</span>{icon && <Icon name={icon} size={19} />}</button>;
}

export function IconButton({ icon, onClick, label }: { icon: IconName; onClick?: () => void; label: string }) {
  return <button className="icon-button" onClick={onClick} aria-label={label}><Icon name={icon} /></button>;
}

export function Header({ title, eyebrow, back }: { title: string; eyebrow?: string; back: () => void }) {
  return <div className="header"><IconButton icon="back" label="Go back" onClick={back} /><div className="header-copy">{eyebrow && <div className="eyebrow">{eyebrow}</div>}<div className="header-title">{title}</div></div><div className="header-spacer" /></div>;
}

function Progress({ step }: { step: number }) {
  return <div className="progress-wrap"><div className="progress-meta"><span>Booking details</span><span>{step} of 6</span></div><div className="progress-track"><div className="progress-value" style={{ width: `${(step / 6) * 100}%` }} /></div></div>;
}

function BottomNav() {
  return <div className="bottom-nav">
    {[["home", "Home"], ["package", "Deliveries"], ["message", "Messages"], ["user", "Account"]].map(([icon, label], i) =>
      <button className={`nav-item ${i === 0 ? "active" : ""}`} key={label}><Icon name={icon as IconName} size={21} /><span>{label}</span></button>
    )}
  </div>;
}

function AddressRoute({ compact = false }: { compact?: boolean }) {
  return <div className={`address-route ${compact ? "compact" : ""}`}>
    <div className="route-rail"><span className="dot pickup" /><span className="rail" /><span className="dot dropoff" /></div>
    <div className="route-addresses">
      <div><span>Pickup</span><strong>12 Easey Street, Collingwood</strong>{!compact && <small>Apartment 4B · Meet at door</small>}</div>
      <div><span>Drop-off</span><strong>85 Coventry Street, Southbank</strong>{!compact && <small>Reception · Level 2</small>}</div>
    </div>
  </div>;
}

export function MapView({ driver = false, complete = false }: { driver?: boolean; complete?: boolean }) {
  return <div className={`map ${complete ? "complete" : ""}`}>
    <div className="river" />
    <div className="road r1" /><div className="road r2" /><div className="road r3" /><div className="road r4" />
    <span className="map-label fitzroy">FITZROY</span><span className="map-label cbd">MELBOURNE CBD</span><span className="map-label richmond">RICHMOND</span>
    <svg className="map-route" viewBox="0 0 390 350" preserveAspectRatio="none"><path d="M72 63 C102 95 100 126 140 148 S238 165 251 206 S268 255 326 282" /></svg>
    <span className="map-pin start"><Icon name="package" size={16} /></span>
    <span className="map-pin end"><Icon name="location" size={16} /></span>
    {driver && <span className="driver-pin"><Icon name="van" size={18} /></span>}
  </div>;
}

function DriverCard({ tracking = false }: { tracking?: boolean }) {
  return <div className="driver-card">
    <div className="avatar-wrap"><img src="https://images.unsplash.com/photo-1587558779223-5c39b4096e22?crop=faces&fit=crop&w=160&h=160&q=85" alt="Your driver, Marcus" /><span className="online" /></div>
    <div className="driver-info"><div className="driver-top"><strong>Marcus T.</strong><span className="rating"><Icon name="star" size={13} /> 4.9</span></div><span>{tracking ? "White Toyota HiAce" : "Top-rated Porter driver"}</span>{tracking && <small>1ABC 2DE</small>}</div>
    <div className="driver-actions"><IconButton icon="message" label="Message driver" /><IconButton icon="phone" label="Call driver" /></div>
  </div>;
}

export function ScreenShell({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <main className={`screen ${className}`}>{children}</main>;
}

function Home({ next }: { next: () => void }) {
  return <ScreenShell className="home-screen">
    <div className="home-top"><div className="brand"><span className="brand-mark">P</span><span>PORTER</span></div><button className="profile-button"><span>JM</span><i /></button></div>
    <div className="welcome"><div className="eyebrow">GOOD MORNING, JAMIE</div><div className="display-title">Move anything.<br /><em>Effortlessly.</em></div><p>Melbourne’s trusted on-demand delivery network.</p></div>
    <button className="hero-action" onClick={next}><span className="hero-icon"><Icon name="package" size={25} /></span><span><small>NEED SOMETHING MOVED?</small><strong>Create a delivery</strong></span><span className="hero-arrow"><Icon name="arrow" /></span></button>
    <div className="section-heading"><span>Recent delivery</span><button>View all</button></div>
    <div className="delivery-card"><div className="delivery-card-top"><div className="mini-icon"><Icon name="box" /></div><div><strong>Dining table</strong><span>Today, 9:42 am</span></div><span className="badge success">Delivered</span></div><div className="mini-route"><span>Collingwood</span><i /><span>Southbank</span></div><div className="delivery-price"><span>PORTER VAN · 4.8 KM</span><strong>$42.60</strong></div></div>
    <div className="promise"><div className="promise-icon"><Icon name="shield" /></div><div><strong>Porter Protection</strong><span>Every delivery is tracked and covered.</span></div><Icon name="chevron" size={18} /></div>
    <BottomNav />
  </ScreenShell>;
}

function Addresses({ next, back }: { next: () => void; back: () => void }) {
  return <ScreenShell><Header title="Where’s it going?" eyebrow="CREATE DELIVERY" back={back} /><Progress step={1} /><div className="content">
    <div className="field-route"><div className="field-icons"><span className="dot pickup" /><span className="rail" /><span className="dot dropoff" /></div><div className="fields">
      <button className="address-field"><span><small>PICKUP</small><strong>12 Easey Street</strong><em>Collingwood VIC 3066</em></span><Icon name="x" size={17} /></button>
      <button className="address-field active"><span><small>DROP-OFF</small><strong>85 Coventry Street</strong><em>Southbank VIC 3006</em></span><Icon name="location" size={19} /></button>
    </div></div>
    <button className="add-stop"><Icon name="plus" size={18} /> Add another stop</button>
    <div className="subheading">Pickup details</div>
    <div className="option-row"><div className="option-icon"><Icon name="user" /></div><div><strong>Meet at door</strong><span>Apartment 4B · Ring buzzer 04</span></div><Icon name="chevron" size={18} /></div>
    <div className="option-row"><div className="option-icon"><Icon name="calendar" /></div><div><strong>Today, as soon as possible</strong><span>Usually picked up in 15–25 min</span></div><Icon name="chevron" size={18} /></div>
  </div><div className="sticky-action"><Button onClick={next} icon="arrow">Continue</Button></div></ScreenShell>;
}

function Items({ next, back }: { next: () => void; back: () => void }) {
  const [count, setCount] = useState(1);
  return <ScreenShell><Header title="What are we moving?" eyebrow="ITEM DETAILS" back={back} /><Progress step={2} /><div className="content">
    <label className="input-label">ITEM CATEGORY</label><button className="select-field"><span><Icon name="box" /><strong>Furniture</strong></span><Icon name="chevron" size={18} /></button>
    <label className="input-label">DESCRIBE YOUR ITEM</label><div className="text-field"><span>Oak dining table, seats six</span><small>30 / 200</small></div>
    <div className="two-col"><div><label className="input-label">QUANTITY</label><div className="stepper"><IconButton icon="minus" label="Decrease quantity" onClick={() => setCount(Math.max(1, count - 1))} /><strong>{count}</strong><IconButton icon="plus" label="Increase quantity" onClick={() => setCount(count + 1)} /></div></div><div><label className="input-label">EST. WEIGHT</label><button className="select-field compact"><strong>35–50 kg</strong><Icon name="chevron" size={16} /></button></div></div>
    <label className="input-label">PHOTOS <span>OPTIONAL</span></label><div className="upload-grid"><button className="upload-card"><Icon name="camera" /><strong>Add photos</strong><span>Helps drivers prepare</span></button><div className="item-photo"><div className="table-illustration"><i /><i /><i /></div><button><Icon name="x" size={14} /></button></div></div>
    <div className="notice"><Icon name="shield" /><span><strong>Protected in transit</strong>Your delivery includes up to $500 coverage.</span></div>
  </div><div className="sticky-action"><Button onClick={next} icon="arrow">Choose a vehicle</Button></div></ScreenShell>;
}

const vehicleData = [
  { icon: "car", title: "Porter Car", meta: "Fits small items", sub: "Up to 20 kg", price: "$28.40", time: "4 min" },
  { icon: "van", title: "Porter Van", meta: "Best for your item", sub: "Up to 500 kg", price: "$42.60", time: "7 min", recommended: true },
  { icon: "briefcase", title: "Porter XL", meta: "Large van + 2 helpers", sub: "Up to 1,000 kg", price: "$76.20", time: "12 min" },
];

function Vehicle({ next, back }: { next: () => void; back: () => void }) {
  const [selected, setSelected] = useState(1);
  return <ScreenShell><Header title="Choose your vehicle" eyebrow="VEHICLE" back={back} /><Progress step={3} /><div className="vehicle-map"><MapView /><div className="route-pill"><Icon name="route" /><span><strong>4.8 km</strong><small>Est. 16 min drive</small></span></div></div><div className="sheet vehicle-sheet">
    <div className="sheet-handle" /><div className="sheet-heading"><strong>Vehicles nearby</strong><span>Prices include GST</span></div>
    <div className="vehicle-list">{vehicleData.map((v, i) => <button key={v.title} onClick={() => setSelected(i)} className={`vehicle-card ${selected === i ? "selected" : ""}`}>
      {v.recommended && <span className="recommendation">RECOMMENDED</span>}<div className="vehicle-art"><Icon name={v.icon as IconName} size={34} /></div><div className="vehicle-copy"><strong>{v.title}</strong><span>{v.meta}</span><small>{v.sub}</small></div><div className="vehicle-price"><strong>{v.price}</strong><span><Icon name="clock" size={13} /> {v.time}</span></div>{selected === i && <span className="selected-check"><Icon name="check" size={13} /></span>}
    </button>)}</div><Button onClick={next} icon="arrow">Continue with {vehicleData[selected].title.replace("Porter ", "")}</Button>
  </div></ScreenShell>;
}

function Speed({ next, back }: { next: () => void; back: () => void }) {
  const [selected, setSelected] = useState(0);
  return <ScreenShell><Header title="When do you need it?" eyebrow="DELIVERY SPEED" back={back} /><Progress step={4} /><div className="content">
    <div className="speed-hero"><div className="speed-orbit"><Icon name="clock" size={34} /></div><strong>Choose your timing</strong><span>Flexible options, always tracked in real time.</span></div>
    {[["ASAP", "Pickup in 15–25 min", "Delivered by 11:10 am", "+ $8.00", "clock"], ["Same day", "Pickup between 12–2 pm", "Delivered by 5:00 pm", "Included", "package"], ["Schedule", "Choose a date and time", "Plan up to 14 days ahead", "Included", "calendar"]].map((s, i) =>
      <button key={s[0]} onClick={() => setSelected(i)} className={`speed-card ${selected === i ? "selected" : ""}`}><div className="speed-icon"><Icon name={s[4] as IconName} /></div><div><strong>{s[0]}</strong><span>{s[1]}</span><small>{s[2]}</small></div><em>{s[3]}</em><span className="radio">{selected === i && <i />}</span></button>
    )}
    <div className="eco-note"><span className="leaf">↓</span><div><strong>Save $8 with Same day</strong><span>We’ll match your delivery with an efficient route.</span></div></div>
  </div><div className="sticky-action"><Button onClick={next} icon="arrow">Review quote</Button></div></ScreenShell>;
}

function Quote({ next, back }: { next: () => void; back: () => void }) {
  return <ScreenShell><Header title="Your quote" eyebrow="REVIEW" back={back} /><Progress step={5} /><div className="content quote-content">
    <div className="quote-hero"><div className="quote-label">TOTAL ESTIMATE</div><div className="quote-total"><sup>$</sup>42<sup>.60</sup></div><span>Price locked for 10:00</span></div>
    <div className="card route-card"><AddressRoute /></div>
    <div className="card summary-card"><div className="summary-title"><span>Delivery summary</span><button>Edit</button></div><div className="summary-row"><Icon name="box" /><span><strong>Oak dining table</strong><small>1 item · 35–50 kg</small></span></div><div className="summary-row"><Icon name="van" /><span><strong>Porter Van</strong><small>Same day · By 5:00 pm</small></span></div></div>
    <div className="price-lines"><div><span>Vehicle base fare</span><strong>$35.00</strong></div><div><span>Distance fee</span><strong>$3.73</strong></div><div><span>GST</span><strong>$3.87</strong></div><div className="total-line"><span>Total</span><strong>$42.60 AUD</strong></div></div>
    <div className="guarantee"><Icon name="shield" /><span><strong>Porter Price Guarantee</strong><small>No surge, no hidden costs. What you see is what you pay.</small></span></div>
  </div><div className="sticky-action"><Button onClick={next} icon="arrow">Continue to payment</Button></div></ScreenShell>;
}

function Payment({ next, back }: { next: () => void; back: () => void }) {
  const [method, setMethod] = useState(0);
  return <ScreenShell><Header title="Payment" eyebrow="SECURE CHECKOUT" back={back} /><Progress step={6} /><div className="content">
    <div className="secure-strip"><Icon name="shield" /><span>Your payment details are encrypted</span></div>
    <div className="subheading">Payment method</div>
    {[["card", "••••  4242", "Personal · Expires 08/28"], ["wallet", "Apple Pay", "Pay instantly and securely"]].map((m, i) => <button className={`payment-method ${method === i ? "selected" : ""}`} onClick={() => setMethod(i)} key={m[1]}><div className="payment-icon"><Icon name={m[0] as IconName} /></div><span><strong>{m[1]}</strong><small>{m[2]}</small></span><span className="radio">{method === i && <i />}</span></button>)}
    <button className="add-payment"><Icon name="plus" /> Add payment method</button>
    <div className="promo-row"><Icon name="document" /><span><strong>Add a promo code</strong><small>Have a Porter voucher?</small></span><Icon name="chevron" size={18} /></div>
    <div className="payment-total"><span><small>YOU’LL PAY</small><strong>$42.60</strong></span><em>AUD · Includes GST</em></div>
    <label className="terms"><input type="checkbox" defaultChecked /><span><i><Icon name="check" size={13} /></i>I agree to Porter’s delivery terms and cancellation policy.</span></label>
  </div><div className="sticky-action"><Button onClick={next} icon="arrow">Confirm & find a driver</Button><div className="powered"><Icon name="shield" size={14} /> SECURE PAYMENT</div></div></ScreenShell>;
}

function Searching({ next, back }: { next: () => void; back: () => void }) {
  useEffect(() => { const timer = window.setTimeout(next, 3800); return () => window.clearTimeout(timer); }, [next]);
  return <ScreenShell className="search-screen"><div className="search-top"><IconButton icon="x" label="Cancel search" onClick={back} /><span>Finding your driver</span><div className="header-spacer" /></div><div className="search-visual"><div className="radar r-a" /><div className="radar r-b" /><div className="radar r-c" /><span className="search-package"><Icon name="package" size={28} /></span><span className="candidate c1"><Icon name="van" /></span><span className="candidate c2"><Icon name="car" /></span><span className="candidate c3"><Icon name="van" /></span></div><div className="search-copy"><div className="pulse-dots"><i /><i /><i /></div><div className="screen-title">Matching you with<br />the best driver</div><p>Checking nearby Porter drivers for your delivery to Southbank.</p></div><div className="search-card"><AddressRoute compact /><div className="skeleton-row"><span /><span /></div><div className="search-note"><Icon name="shield" size={18} /> You won’t be charged until a driver accepts</div></div><button className="text-action" onClick={next}>Skip preview · Driver found</button></ScreenShell>;
}

function Assigned({ next, back }: { next: () => void; back: () => void }) {
  return <ScreenShell className="assigned-screen"><div className="confetti"><i /><i /><i /><i /><i /></div><div className="assigned-top"><span className="success-ring"><Icon name="check" size={30} /></span><div className="screen-title">Driver assigned!</div><p>Marcus is heading to your pickup.</p><span className="badge success">ARRIVING IN 8 MIN</span></div><div className="driver-panel"><DriverCard tracking /><div className="divider" /><div className="arrival-row"><span><small>VEHICLE</small><strong>Toyota HiAce · 1ABC 2DE</strong></span><div className="plate">1ABC 2DE</div></div></div><div className="card route-card assigned-route"><AddressRoute compact /></div><div className="info-banner"><Icon name="support" /><span><strong>Stay available</strong><small>Marcus may contact you about access or parking.</small></span></div><div className="sticky-action"><Button onClick={next} icon="route">Track live delivery</Button><Button onClick={back} variant="ghost">Cancel delivery</Button></div></ScreenShell>;
}

function Tracking({ next, back }: { next: () => void; back: () => void }) {
  return <ScreenShell className="tracking-screen"><MapView driver /><div className="floating-header"><IconButton icon="back" label="Go back" onClick={back} /><span>Live delivery</span><IconButton icon="support" label="Get support" /></div><div className="map-eta"><span><Icon name="clock" size={17} /> 7 min</span><small>2.1 km away</small></div><div className="sheet tracking-sheet"><div className="sheet-handle" /><div className="status-head"><div><span className="badge blue">IN TRANSIT</span><div className="screen-title">Arriving by 11:08 am</div><p>Marcus has picked up your item.</p></div><div className="live-pulse"><i /></div></div><div className="timeline"><div className="timeline-item done"><i><Icon name="check" size={12} /></i><span><strong>Driver assigned</strong><small>10:32 am</small></span></div><div className="timeline-item done"><i><Icon name="check" size={12} /></i><span><strong>Item picked up</strong><small>10:47 am</small></span></div><div className="timeline-item current"><i><Icon name="van" size={14} /></i><span><strong>On the way to Southbank</strong><small>Live location</small></span></div><div className="timeline-item"><i /><span><strong>Delivery</strong><small>Est. 11:08 am</small></span></div></div><DriverCard tracking /><button className="text-action" onClick={next}>Preview delivery completion</button></div></ScreenShell>;
}

function Completed({ next, back, dispute }: { next: () => void; back: () => void; dispute: () => void }) {
  return <ScreenShell className="complete-screen"><div className="complete-map"><MapView complete /><div className="floating-header"><IconButton icon="back" label="Go back" onClick={back} /><span>Delivery #PT-48291</span><IconButton icon="support" label="Get support" /></div></div><div className="sheet completion-sheet"><div className="sheet-handle" /><div className="complete-badge"><Icon name="check" size={26} /></div><div className="screen-title">Delivered safely</div><p>Your dining table arrived at 11:06 am.</p><span className="badge success">ON TIME</span><div className="proof-card"><div className="proof-image"><Icon name="package" size={30} /><span>PROOF OF DELIVERY</span></div><div><strong>Left with reception</strong><span>85 Coventry Street, Southbank</span><small><Icon name="clock" size={13} /> Today at 11:06 am</small></div></div><DriverCard /><div className="completion-actions"><Button onClick={next} icon="star">Rate your delivery</Button><Button onClick={dispute} variant="danger" icon="support">Raise a dispute</Button></div><button className="receipt"><Icon name="document" size={17} /> View receipt · $42.60</button></div></ScreenShell>;
}

function Rate({ next, back }: { next: () => void; back: () => void }) {
  const [rating, setRating] = useState(0);
  const [sent, setSent] = useState(false);
  if (sent) return <ScreenShell className="center-state"><div className="success-illustration"><Icon name="check" size={38} /></div><div className="screen-title">Thanks for your feedback</div><p>Your rating helps us keep Porter exceptional.</p><Button onClick={next} icon="arrow">Back to home</Button></ScreenShell>;
  return <ScreenShell><Header title="Rate your delivery" eyebrow="DELIVERY COMPLETE" back={back} /><div className="content rate-content"><div className="driver-large"><div className="avatar-wrap"><img src="https://images.unsplash.com/photo-1587558779223-5c39b4096e22?crop=faces&fit=crop&w=200&h=200&q=85" alt="Marcus" /></div><strong>How was Marcus?</strong><span>Toyota HiAce · Delivery #PT-48291</span></div><div className="stars">{[1,2,3,4,5].map(i => <button onClick={() => setRating(i)} className={i <= rating ? "active" : ""} key={i}><Icon name="star" size={34} /></button>)}</div><div className="rating-label">{rating ? (rating === 5 ? "Excellent!" : "Thanks for your feedback") : "Tap to rate"}</div><div className="subheading">WHAT WENT WELL?</div><div className="chips">{["Friendly driver", "Careful handling", "On time", "Great communication"].map(x => <button key={x}><Icon name="check" size={14} />{x}</button>)}</div><div className="text-field feedback"><span>Share a few words (optional)</span><small>0 / 300</small></div></div><div className="sticky-action"><Button onClick={() => setSent(true)} disabled={!rating}>Submit rating</Button><Button onClick={next} variant="ghost">Skip for now</Button></div></ScreenShell>;
}

function Dispute({ next, back }: { next: () => void; back: () => void }) {
  const [reason, setReason] = useState("Item was damaged");
  return <ScreenShell><Header title="Raise a dispute" eyebrow="WE’RE HERE TO HELP" back={back} /><div className="content dispute-content"><div className="support-intro"><div><Icon name="support" size={25} /></div><span><strong>Something not right?</strong><small>Tell us what happened. Our Melbourne support team usually responds within 2 hours.</small></span></div><label className="input-label">WHAT HAPPENED?</label><div className="reason-grid">{["Item was damaged", "Item is missing", "Delivery was late", "Driver conduct"].map(x => <button key={x} className={reason === x ? "selected" : ""} onClick={() => setReason(x)}><span className="radio">{reason === x && <i />}</span>{x}</button>)}</div><label className="input-label">TELL US MORE</label><div className="text-field dispute-text"><span>There is a visible scratch along the left edge of the table.</span><small>73 / 500</small></div><label className="input-label">ADD EVIDENCE <span>RECOMMENDED</span></label><div className="upload-grid"><button className="upload-card"><Icon name="camera" /><strong>Add photos</strong><span>JPG or PNG · Max 10 MB</span></button><button className="upload-card"><Icon name="document" /><strong>Add document</strong><span>Receipt or invoice</span></button></div><div className="dispute-delivery"><Icon name="package" /><span><strong>Dining table · #PT-48291</strong><small>Delivered today at 11:06 am</small></span><Icon name="chevron" size={17} /></div></div><div className="sticky-action"><Button onClick={next} icon="arrow">Submit dispute</Button><div className="powered"><Icon name="shield" size={14} /> Your information is private and secure</div></div></ScreenShell>;
}

function DisputeStatus({ next, back }: { next: () => void; back: () => void }) {
  const [tab, setTab] = useState(1);
  const states = [
    { title: "Dispute submitted", text: "We’ve received your report and sent a confirmation to your email.", badge: "SUBMITTED", className: "blue" },
    { title: "We’re reviewing it", text: "A Porter specialist is reviewing your evidence. We’ll update you within 2 hours.", badge: "UNDER REVIEW", className: "amber" },
    { title: "Resolved in your favour", text: "We’ve issued a $42.60 refund to your Visa ending in 4242.", badge: "RESOLVED", className: "success" },
  ];
  const s = states[tab];
  return <ScreenShell><Header title="Dispute status" eyebrow="CASE #PD-1048" back={back} /><div className="status-tabs">{["Submitted", "Review", "Resolved"].map((x, i) => <button key={x} onClick={() => setTab(i)} className={tab === i ? "active" : ""}>{x}</button>)}</div><div className="content status-content"><div className={`status-visual state-${tab}`}><div className="status-orbit"><Icon name={tab === 2 ? "check" : tab === 1 ? "search" : "document"} size={35} /></div><span className={`badge ${s.className}`}>{s.badge}</span><div className="screen-title">{s.title}</div><p>{s.text}</p></div><div className="case-timeline"><div className="case-line active"><i><Icon name="check" size={12} /></i><span><strong>Dispute submitted</strong><small>Today, 11:24 am</small></span></div><div className={`case-line ${tab >= 1 ? "active" : ""}`}><i>{tab >= 1 && <Icon name="check" size={12} />}</i><span><strong>Under review</strong><small>{tab >= 1 ? "Today, 11:31 am · Assigned to Mia" : "Usually within 2 hours"}</small></span></div><div className={`case-line ${tab >= 2 ? "active" : ""}`}><i>{tab >= 2 && <Icon name="check" size={12} />}</i><span><strong>Resolution</strong><small>{tab >= 2 ? "Refund issued · Allow 3–5 business days" : "We’ll notify you in the app"}</small></span></div></div><div className="case-card"><div className="case-row"><span>CASE ID</span><strong>#PD-1048</strong></div><div className="case-row"><span>REASON</span><strong>Item was damaged</strong></div><div className="case-row"><span>DELIVERY</span><strong>#PT-48291</strong></div></div><div className="info-banner"><Icon name="message" /><span><strong>Need to add something?</strong><small>Message Mia, your Porter support specialist.</small></span><Icon name="chevron" size={17} /></div></div><div className="sticky-action"><Button onClick={tab === 2 ? next : () => setTab(tab + 1)} icon={tab === 2 ? "home" : "arrow"}>{tab === 2 ? "Return home" : "Preview next status"}</Button><Button onClick={next} variant="ghost">View all deliveries</Button></div></ScreenShell>;
}

export default function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const index = screens.indexOf(screen);
  const next = () => setScreen(screens[Math.min(index + 1, screens.length - 1)]);
  const back = () => setScreen(screens[Math.max(index - 1, 0)]);
  const home = () => setScreen("home");
  return <div className="app-shell">
    {screen === "home" && <Home next={next} />}
    {screen === "addresses" && <Addresses next={next} back={back} />}
    {screen === "items" && <Items next={next} back={back} />}
    {screen === "vehicle" && <Vehicle next={next} back={back} />}
    {screen === "speed" && <Speed next={next} back={back} />}
    {screen === "quote" && <Quote next={next} back={back} />}
    {screen === "payment" && <Payment next={next} back={back} />}
    {screen === "searching" && <Searching next={next} back={back} />}
    {screen === "assigned" && <Assigned next={next} back={back} />}
    {screen === "tracking" && <Tracking next={next} back={back} />}
    {screen === "completed" && <Completed next={next} back={back} dispute={() => setScreen("dispute")} />}
    {screen === "rate" && <Rate next={home} back={back} />}
    {screen === "dispute" && <Dispute next={next} back={() => setScreen("completed")} />}
    {screen === "dispute-status" && <DisputeStatus next={home} back={back} />}
  </div>;
}
