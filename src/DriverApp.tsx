import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { Button, Header, Icon, IconButton, MapView, ScreenShell, type IconName } from "./App";

type DriverScreen =
  | "home" | "onboarding" | "vehicle" | "documents" | "pending" | "approved" | "blocked"
  | "offers" | "incoming" | "accepted" | "pickup-route" | "pickup-arrived" | "pickup-proof"
  | "pickup-complete" | "transit" | "destination" | "code" | "delivery-proof" | "complete"
  | "problem" | "cancel" | "earnings" | "payouts" | "history" | "ratings" | "account" | "notifications";

type NavKey = "home" | "offers" | "active" | "earnings" | "account";

const deliveryFlow: DriverScreen[] = ["accepted", "pickup-route", "pickup-arrived", "pickup-proof", "pickup-complete", "transit", "destination", "code", "delivery-proof", "complete"];
const progressLabels = ["Accepted", "To pickup", "At pickup", "Collected", "In transit", "At destination", "Verified", "Delivered"];

function DriverNav({ active, go }: { active: NavKey; go: (screen: DriverScreen) => void }) {
  const items: [NavKey, IconName, string, DriverScreen][] = [
    ["home", "home", "Home", "home"], ["offers", "package", "Offers", "offers"], ["active", "route", "Active Job", "pickup-route"],
    ["earnings", "wallet", "Earnings", "earnings"], ["account", "user", "Account", "account"],
  ];
  return <nav className="driver-nav" aria-label="Driver navigation">{items.map(([key, icon, label, screen]) =>
    <button key={key} className={active === key ? "active" : ""} onClick={() => go(screen)}><span><Icon name={icon} size={20} />{key === "offers" && <i />}</span><small>{label}</small></button>
  )}</nav>;
}

function StatusPill({ children, tone = "blue" }: { children: ReactNode; tone?: "blue" | "green" | "amber" | "red" | "neutral" }) {
  return <span className={`driver-pill ${tone}`}>{children}</span>;
}

function Metric({ label, value, note, icon, tone = "blue" }: { label: string; value: string; note?: string; icon: IconName; tone?: string }) {
  return <div className={`driver-metric ${tone}`}><span className="metric-icon"><Icon name={icon} size={18} /></span><small>{label}</small><strong>{value}</strong>{note && <em>{note}</em>}</div>;
}

function DriverProgress({ stage }: { stage: number }) {
  return <div className="driver-progress" aria-label={`Delivery progress: ${progressLabels[stage]}`}>
    <div className="driver-progress-head"><span>Delivery progress</span><strong>{progressLabels[stage]}</strong></div>
    <div className="driver-progress-track">{progressLabels.map((label, i) => <span key={label} className={i < stage ? "done" : i === stage ? "current" : ""}><i>{i < stage ? <Icon name="check" size={10} /> : null}</i></span>)}</div>
  </div>;
}

const offers = [
  { from: "Richmond", to: "South Yarra", distance: "4.2 km", time: "18 min", vehicle: "Car", speed: "ASAP", earn: "$28.40", expiry: "01:42" },
  { from: "Footscray", to: "Docklands", distance: "7.8 km", time: "26 min", vehicle: "Van", speed: "Same day", earn: "$42.60", expiry: "03:08" },
  { from: "Truganina", to: "Point Cook", distance: "12.4 km", time: "31 min", vehicle: "Van", speed: "Scheduled", earn: "$58.20", expiry: "04:31" },
  { from: "Melbourne CBD", to: "Carlton", distance: "3.1 km", time: "14 min", vehicle: "Bike", speed: "ASAP", earn: "$21.80", expiry: "00:54" },
];

function OfferCard({ offer, open }: { offer: typeof offers[number]; open: () => void }) {
  return <button className="offer-card" onClick={open}>
    <div className="offer-top"><StatusPill tone={offer.speed === "ASAP" ? "amber" : "blue"}>{offer.speed}</StatusPill><span className="offer-timer"><Icon name="clock" size={14} /> {offer.expiry}</span></div>
    <div className="offer-route"><div><i /><span><small>PICKUP AREA</small><strong>{offer.from}</strong></span></div><div><i /><span><small>DROP-OFF AREA</small><strong>{offer.to}</strong></span></div></div>
    <div className="offer-bottom"><span><Icon name="route" size={15} />{offer.distance}</span><span><Icon name="clock" size={15} />{offer.time}</span><span><Icon name={offer.vehicle === "Bike" ? "car" : "van"} size={15} />{offer.vehicle}</span><strong>{offer.earn}</strong></div>
  </button>;
}

function ActiveJobCard({ go }: { go: () => void }) {
  return <button className="active-job-card" onClick={go}><div className="active-job-head"><StatusPill tone="green">ACTIVE DELIVERY</StatusPill><span>PT-48291</span></div><div className="active-job-main"><span className="job-icon"><Icon name="van" size={24} /></span><div><small>NEXT ACTION</small><strong>Head to pickup</strong><span>12 Easey Street, Collingwood</span></div><Icon name="chevron" /></div><div className="active-job-foot"><span><Icon name="clock" size={15} /> 8 min away</span><strong>$42.60 earnings</strong></div></button>;
}

function DriverHome({ go }: { go: (s: DriverScreen) => void }) {
  const [online, setOnline] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const toggle = () => {
    if (!online && blocked) go("blocked");
    else setOnline(!online);
  };
  return <ScreenShell className={`driver-home ${online ? "is-online" : ""}`}>
    <div className="driver-home-top"><div className="porter-driver-brand"><span className="brand-mark">P</span><div><strong>PORTER</strong><small>DRIVER</small></div></div><button className="driver-avatar" onClick={() => go("notifications")}><img src="https://images.unsplash.com/photo-1587558779223-5c39b4096e22?crop=faces&fit=crop&w=120&h=120&q=85" alt="Marcus" /><i /></button></div>
    <div className="driver-welcome"><div><span>GOOD MORNING</span><strong>Ready to move,<br />Marcus?</strong></div><StatusPill tone="green"><Icon name="shield" size={12} /> APPROVED</StatusPill></div>
    <section className={`online-card ${online ? "online" : ""}`}><div className="online-copy"><span className="online-orb"><i /></span><div><small>DRIVER STATUS</small><strong>{online ? "You’re online" : "You’re offline"}</strong><p>{online ? "Looking for delivery offers nearby" : "Go online when you’re ready to earn"}</p></div></div><button className="online-switch" onClick={toggle} aria-pressed={online}><span>{online ? "ON" : "OFF"}</span><i /></button>{online && <div className="online-wave" />}</section>
    <div className="eligibility-demo"><label><input type="checkbox" checked={blocked} onChange={e => setBlocked(e.target.checked)} /> Demo expired-document block</label></div>
    <div className="today-head"><div><span>TODAY</span><strong>Your performance</strong></div><button onClick={() => go("earnings")}>View earnings</button></div>
    <div className="driver-metrics"><Metric label="EARNINGS" value="$186.40" note="+12% vs yesterday" icon="wallet" tone="cyan" /><Metric label="DELIVERIES" value="4" note="2.3 hrs online" icon="package" /><Metric label="RATING" value="4.96" note="128 ratings" icon="star" tone="amber" /><Metric label="PENDING" value="$342.80" note="Pays Monday" icon="clock" tone="purple" /></div>
    <div className="driver-section-head"><strong>{online ? "Available now" : "Your active delivery"}</strong>{online && <button onClick={() => go("offers")}>See all 6</button>}</div>
    {online ? <OfferCard offer={offers[0]} open={() => go("incoming")} /> : <ActiveJobCard go={() => go("pickup-route")} />}
    <button className="application-strip" onClick={() => go("onboarding")}><Icon name="document" /><span><strong>Driver setup preview</strong><small>View onboarding & compliance flows</small></span><Icon name="chevron" size={18} /></button>
    <DriverNav active="home" go={go} />
  </ScreenShell>;
}

const onboardingSteps = ["Personal", "Identity", "Vehicle", "Business", "Documents", "Terms", "Review"];

function Onboarding({ go, step, setStep }: { go: (s: DriverScreen) => void; step: number; setStep: (step: number) => void }) {
  const [error, setError] = useState(false);
  const next = () => {
    if (step === 0 && !error) { setError(true); return; }
    if (step === 2) { go("vehicle"); return; }
    if (step === 4) { go("documents"); return; }
    if (step === 6) go("pending"); else { setStep(step + 1); setError(false); }
  };
  return <ScreenShell className="driver-form-screen"><Header title="Become a Porter driver" eyebrow={`STEP ${step + 1} OF 7`} back={() => step ? setStep(step - 1) : go("home")} />
    <div className="onboarding-progress"><div style={{ width: `${((step + 1) / 7) * 100}%` }} /><span>{onboardingSteps.map((x, i) => <i key={x} className={i <= step ? "active" : ""} />)}</span></div>
    <div className="draft-state"><Icon name="check" size={13} /> Draft saved just now</div>
    <div className="driver-form-content"><div className="form-step-intro"><span className="form-step-icon"><Icon name={["user","shield","van","briefcase","document","document","check"][step] as IconName} size={25} /></span><div><small>{onboardingSteps[step].toUpperCase()}</small><strong>{["Let’s get to know you","Verify your identity","Tell us about your wheels","Business details","Required documents","Driver agreement","Check everything"][step]}</strong><p>{["Use your legal name as shown on your licence.","A quick secure check keeps Porter safe.","Add the vehicle you’ll use for deliveries.","Your ABN helps us process your payouts.","Upload clear, current documents.","Review the essentials before continuing.","Make sure your details are accurate."][step]}</p></div></div>
      {step === 0 && <div className="form-card"><label>LEGAL FIRST NAME<input defaultValue="Marcus" /></label><label>LEGAL LAST NAME<input defaultValue="Taylor" /></label><label>MOBILE NUMBER<input defaultValue="+61 412 555 018" /></label><label className={error ? "has-error" : ""}>EMAIL ADDRESS<input placeholder="you@example.com" />{error && <em><Icon name="x" size={13} /> Enter a valid email to continue</em>}</label></div>}
      {step === 1 && <div className="form-card"><label>DATE OF BIRTH<input defaultValue="14 / 06 / 1992" /></label><label>RESIDENTIAL ADDRESS<input defaultValue="44 Johnston Street, Fitzroy VIC" /></label><button className="verify-card"><Icon name="camera" /><span><strong>Start identity check</strong><small>Secure selfie and ID match · 2 minutes</small></span><Icon name="chevron" /></button></div>}
      {step === 3 && <div className="form-card"><label>AUSTRALIAN BUSINESS NUMBER<input defaultValue="51 824 753 556" /></label><label>BUSINESS NAME <span>OPTIONAL</span><input defaultValue="Marcus Moves" /></label><div className="validation-success"><Icon name="check" /> ABN verified with the Australian Business Register</div></div>}
      {step === 5 && <div className="terms-stack">{["Porter Driver Agreement","Safety & Community Standards","Privacy and location sharing","Payment and fee schedule"].map(x => <label key={x}><input type="checkbox" defaultChecked /><span><i><Icon name="check" size={12} /></i>{x}</span><Icon name="chevron" size={16} /></label>)}</div>}
      {step === 6 && <div className="review-stack">{[["Personal details","Marcus Taylor · Verified"],["Identity","Identity matched"],["Vehicle","2021 Toyota HiAce · 1ABC 2DE"],["Business","ABN 51 824 753 556"],["Documents","5 of 5 uploaded"],["Terms","All accepted"]].map(x => <div key={x[0]}><span><Icon name="check" size={14} /></span><p><strong>{x[0]}</strong><small>{x[1]}</small></p><button>Edit</button></div>)}</div>}
    </div><div className="sticky-action driver-sticky"><Button onClick={next} icon={step === 6 ? "check" : "arrow"}>{step === 6 ? "Submit application" : "Save & continue"}</Button></div>
  </ScreenShell>;
}

function VehicleDetails({ go, advanceOnboarding }: { go: (s: DriverScreen) => void; advanceOnboarding: () => void }) {
  const [selected, setSelected] = useState(3);
  return <ScreenShell><Header title="Vehicle details" eyebrow="DRIVER APPLICATION" back={() => go("onboarding")} /><div className="driver-form-content vehicle-details"><div className="form-step-intro"><span className="form-step-icon"><Icon name="van" /></span><div><small>YOUR DELIVERY VEHICLE</small><strong>What do you drive?</strong><p>This helps us match you with the right offers.</p></div></div>
    <div className="driver-vehicle-grid">{["Bike","Car","Ute","Van"].map((x,i) => <button key={x} onClick={() => setSelected(i)} className={selected === i ? "selected" : ""}><Icon name={i === 3 ? "van" : "car"} size={28} /><strong>{x}</strong>{selected === i && <i><Icon name="check" size={11} /></i>}</button>)}</div>
    <div className="form-card compact-form"><div className="form-two"><label>MAKE<input defaultValue="Toyota" /></label><label>MODEL<input defaultValue="HiAce" /></label></div><div className="form-two"><label>YEAR<input defaultValue="2021" /></label><label>COLOUR<input defaultValue="White" /></label></div><label>REGISTRATION<input defaultValue="1ABC 2DE" /></label></div>
    <label className="driver-label">VEHICLE PHOTO</label><button className="vehicle-photo-upload"><span className="vehicle-silhouette"><Icon name="van" size={42} /></span><span><strong>Add a clear side photo</strong><small>Show the entire vehicle and registration</small></span><Icon name="camera" /></button>
  </div><div className="sticky-action driver-sticky"><Button onClick={advanceOnboarding} icon="arrow">Save vehicle</Button></div></ScreenShell>;
}

type DocState = "Not uploaded" | "Uploading" | "Uploaded" | "Under review" | "Approved" | "Rejected" | "Expired";
const documentSeed: { name: string; detail: string; state: DocState }[] = [
  { name: "Driver Licence", detail: "Expires 14 Jun 2027", state: "Approved" }, { name: "Identity document", detail: "Australian Passport", state: "Under review" },
  { name: "Vehicle Registration", detail: "Expired 02 Mar 2025", state: "Expired" }, { name: "Insurance", detail: "Policy photo is unclear", state: "Rejected" },
  { name: "ABN / business document", detail: "Uploaded today", state: "Uploaded" },
];

function DocumentCard({ doc, update }: { doc: typeof documentSeed[number]; update: (s: DocState) => void }) {
  const tone = doc.state === "Approved" ? "green" : doc.state === "Rejected" || doc.state === "Expired" ? "red" : doc.state === "Under review" ? "amber" : "blue";
  const action = doc.state === "Rejected" || doc.state === "Expired" ? "Resubmit" : doc.state === "Not uploaded" ? "Upload" : "Replace";
  return <div className={`document-card ${tone}`}><div className="doc-main"><span className="doc-icon"><Icon name="document" /></span><div><strong>{doc.name}</strong><small>{doc.detail}</small></div><StatusPill tone={tone as "blue"}>{doc.state}</StatusPill></div>
    {doc.state === "Rejected" && <div className="doc-alert"><Icon name="x" size={15} /><span><strong>Photo could not be verified</strong>All four corners must be visible and text must be clear.</span></div>}
    {doc.state === "Expired" && <div className="doc-alert"><Icon name="shield" size={15} /><span><strong>You cannot go Online</strong>Upload current registration to restore eligibility.</span></div>}
    {doc.state === "Uploading" && <div className="upload-progress"><span><i /></span><small>Uploading securely… 68%</small></div>}
    <div className="doc-actions"><button onClick={() => update("Uploaded")}><Icon name="camera" size={16} /> Camera</button><button onClick={() => update(doc.state === "Uploading" ? "Uploaded" : "Uploading")}><Icon name="document" size={16} /> {action}</button><button>Preview</button></div></div>;
}

function Documents({ go, advanceOnboarding }: { go: (s: DriverScreen) => void; advanceOnboarding: () => void }) {
  const [docs, setDocs] = useState(documentSeed);
  return <ScreenShell><Header title="Driver documents" eyebrow="COMPLIANCE CENTRE" back={() => go("account")} /><div className="document-summary"><div><strong>3 of 5</strong><span>ready to drive</span></div><div><span><i style={{ width: "60%" }} /></span><small>2 documents need attention</small></div></div><div className="driver-form-content document-list">{docs.map((doc,i) => <DocumentCard key={doc.name} doc={doc} update={state => setDocs(docs.map((d,di) => di === i ? {...d,state,detail: state === "Uploaded" ? "Uploaded just now" : d.detail} : d))} />)}</div><div className="sticky-action driver-sticky"><Button onClick={advanceOnboarding} icon="arrow">Continue application</Button></div></ScreenShell>;
}

function Pending({ go }: { go: (s: DriverScreen) => void }) {
  return <StatusScreen icon="search" badge="APPLICATION SUBMITTED" title="We’re reviewing your application" text="Most Porter applications are reviewed within 1–2 business days." go={go}>
    <div className="review-timeline">{[["Application submitted","Today, 10:42 am","done"],["Identity & document review","In progress","active"],["Vehicle verification","Up next",""],["Ready to drive","We’ll notify you",""]].map(x => <div className={x[2]} key={x[0]}><i>{x[2] === "done" && <Icon name="check" size={12} />}</i><span><strong>{x[0]}</strong><small>{x[1]}</small></span></div>)}</div>
    <div className="what-next"><Icon name="clock" /><span><strong>What happens next?</strong><small>We’ll email and notify you when the review is complete. You can update documents at any time.</small></span></div>
    <Button onClick={() => go("approved")} icon="arrow">Preview approval</Button><Button variant="ghost" onClick={() => go("account")} icon="support">Contact support</Button>
  </StatusScreen>;
}

function StatusScreen({ icon, badge, title, text, children, go }: { icon: IconName; badge: string; title: string; text: string; children: ReactNode; go: (s: DriverScreen) => void }) {
  return <ScreenShell className="driver-status-screen"><div className="status-screen-top"><IconButton icon="back" label="Back" onClick={() => go("home")} /></div><div className="driver-status-hero"><span className="driver-status-orbit"><Icon name={icon} size={36} /></span><StatusPill tone="blue">{badge}</StatusPill><div className="screen-title">{title}</div><p>{text}</p></div><div className="driver-status-body">{children}</div></ScreenShell>;
}

function Approved({ go }: { go: (s: DriverScreen) => void }) {
  return <StatusScreen icon="check" badge="APPROVED TO DRIVE" title="Welcome to Porter, Marcus" text="You’re verified and ready to start earning across Melbourne." go={go}>
    <div className="approved-vehicle"><span><Icon name="van" size={34} /></span><div><small>APPROVED VEHICLE</small><strong>2021 Toyota HiAce</strong><p>White · 1ABC 2DE</p></div><StatusPill tone="green">VERIFIED</StatusPill></div>
    <div className="verification-grid">{[["shield","Identity","Verified"],["document","Documents","5 approved"],["briefcase","Business","ABN active"]].map(x => <div key={x[1]}><Icon name={x[0] as IconName} /><strong>{x[1]}</strong><small>{x[2]}</small></div>)}</div>
    <Button onClick={() => go("home")} icon="arrow">Go Online</Button><p className="status-footnote">By going Online, you agree to receive nearby delivery offers.</p>
  </StatusScreen>;
}

function Blocked({ go }: { go: (s: DriverScreen) => void }) {
  const [reason, setReason] = useState(0);
  const reasons = [["Expired registration","Your vehicle registration expired on 2 March 2025.","Upload current registration","documents"],["Application pending","We’re still reviewing your identity documents.","View application status","pending"],["Account suspended","Your account requires a safety review before you can drive.","Contact driver support","account"],["Terms incomplete","The latest Driver Agreement needs your acceptance.","Review terms","onboarding"]] as const;
  const r = reasons[reason];
  return <ScreenShell className="blocked-screen"><Header title="Can’t go Online" eyebrow="ACTION REQUIRED" back={() => go("home")} /><div className="blocked-content"><div className="blocked-icon"><Icon name="shield" size={36} /></div><StatusPill tone="red">NOT ELIGIBLE TO DRIVE</StatusPill><div className="screen-title">{r[0]}</div><p>{r[1]}</p><div className="fix-card"><span>WHAT YOU NEED TO DO</span><div><i>1</i><p><strong>{r[2]}</strong><small>We’ll verify your update and restore Online access.</small></p></div><div><i>2</i><p><strong>Wait for confirmation</strong><small>Usually within 2 hours for document updates.</small></p></div></div><label className="driver-label">PREVIEW OTHER BLOCKED STATES</label><div className="blocked-reasons">{reasons.map((x,i) => <button key={x[0]} onClick={() => setReason(i)} className={i === reason ? "active" : ""}>{x[0]}</button>)}</div><Button onClick={() => go(r[3])} icon="arrow">{r[2]}</Button><Button variant="ghost" onClick={() => go("account")} icon="support">Get help</Button></div></ScreenShell>;
}

function Offers({ go }: { go: (s: DriverScreen) => void }) {
  return <ScreenShell className="offers-screen"><div className="driver-page-header"><div><small>YOU’RE ONLINE <i /></small><strong>Delivery offers</strong></div><IconButton icon="support" label="Help" /></div><div className="offers-filter"><button className="active">All offers <span>6</span></button><button>Near me</button><button>Scheduled</button></div><div className="offers-content"><div className="offers-map-mini"><MapView driver /><span>6 offers nearby</span></div><div className="driver-section-head"><strong>Best matches</strong><span>Updated just now</span></div>{offers.map((o,i) => <OfferCard key={i} offer={o} open={() => go("incoming")} />)}</div><DriverNav active="offers" go={go} /></ScreenShell>;
}

function Incoming({ go }: { go: (s: DriverScreen) => void }) {
  const [seconds, setSeconds] = useState(18);
  useEffect(() => { if (!seconds) return; const id = window.setInterval(() => setSeconds(s => Math.max(0,s-1)),1000); return () => clearInterval(id); }, [seconds]);
  if (!seconds) return <StatusScreen icon="clock" badge="OFFER EXPIRED" title="This offer is no longer available" text="No worries — we’ll keep looking for another match." go={go}><Button onClick={() => go("offers")} icon="search">View available offers</Button></StatusScreen>;
  return <ScreenShell className="incoming-screen"><MapView driver /><div className="incoming-top"><IconButton icon="x" label="Close offer" onClick={() => go("offers")} /><StatusPill tone="green"><i className="pulse-mini" /> NEW OFFER</StatusPill><span /></div><div className="incoming-sheet"><div className="sheet-handle" /><div className="countdown-ring" style={{ "--progress": `${seconds * 20}deg` } as CSSProperties}><span><strong>{seconds}</strong><small>SECONDS</small></span></div><div className="incoming-title"><small>ASAP DELIVERY · PORTER VAN</small><strong>Richmond <Icon name="arrow" /> South Yarra</strong><span>Pickup area and suburb only until accepted</span></div><div className="incoming-stats"><div><Icon name="route" /><strong>4.2 km</strong><small>Distance</small></div><div><Icon name="clock" /><strong>18 min</strong><small>Estimated</small></div><div><Icon name="van" /><strong>Van</strong><small>Required</small></div></div><div className="earnings-breakdown"><div><span>Gross delivery price</span><strong>$35.50</strong></div><div><span>Porter service fee</span><strong>− $7.10</strong></div><div className="net"><span>YOUR NET EARNINGS</span><strong>$28.40</strong></div></div><Button onClick={() => go("accepted")} icon="check">Accept Delivery · $28.40</Button><Button variant="ghost" onClick={() => go("offers")}>Decline</Button></div></ScreenShell>;
}

function Accepted({ go }: { go: (s: DriverScreen) => void }) {
  return <ScreenShell className="accepted-screen"><div className="accept-burst"><span><Icon name="check" size={38} /></span></div><StatusPill tone="green">DELIVERY ACCEPTED</StatusPill><div className="screen-title">This one’s yours</div><p>Head to Collingwood to collect the dining table.</p><div className="accepted-earn"><small>YOU’LL EARN</small><strong>$28.40</strong><span>after Porter fee</span></div><div className="accepted-route"><MapView driver /><div><span><small>PICKUP</small><strong>12 Easey Street, Collingwood</strong></span><em>8 min · 2.4 km</em></div></div><div className="sticky-action driver-sticky"><Button onClick={() => go("pickup-route")} icon="route">Navigate to Pickup</Button></div></ScreenShell>;
}

function DriverMapScreen({ mode, stage, go }: { mode: "pickup" | "transit"; stage: number; go: (s: DriverScreen) => void }) {
  const pickup = mode === "pickup";
  return <ScreenShell className="driver-map-screen"><MapView driver /><div className="floating-header"><IconButton icon="back" label="Back" onClick={() => go(pickup ? "accepted" : "pickup-complete")} /><span>{pickup ? "Heading to pickup" : "In transit"}</span><IconButton icon="support" label="Report a problem" onClick={() => go("problem")} /></div><div className="navigation-cue"><Icon name="arrow" size={25} /><span><small>IN 300 M</small><strong>Turn right onto Smith St</strong></span></div><div className="driver-map-sheet"><div className="sheet-handle" /><DriverProgress stage={stage} /><div className="map-destination"><div><StatusPill tone={pickup ? "blue" : "green"}>{pickup ? "PICKUP" : "DROP-OFF"}</StatusPill><strong>{pickup ? "12 Easey Street, Collingwood" : "85 Coventry Street, Southbank"}</strong><span>{pickup ? "Apartment 4B · Ring buzzer 04" : "Reception · Level 2"}</span></div><div><strong>{pickup ? "8" : "16"} min</strong><small>{pickup ? "2.4" : "4.8"} km</small></div></div><div className="job-notes"><div><Icon name="box" /><span><strong>Oak dining table · 35–50 kg</strong><small>1 item · No helper required</small></span></div><div><Icon name="briefcase" /><span><strong>{pickup ? "One flight of stairs" : "Loading zone on Coventry St"}</strong><small>{pickup ? "Customer will assist with access" : "Meet reception at Level 2"}</small></span></div></div><div className="map-primary"><Button onClick={() => go(pickup ? "pickup-arrived" : "destination")} icon="location">{pickup ? "Arrived at Pickup" : "Arrived at Destination"}</Button></div><button className="cancel-link" onClick={() => go("cancel")}>{pickup ? "Can’t complete this delivery?" : "Report a delivery problem"}</button></div></ScreenShell>;
}

function LocationAction({ destination = false, go }: { destination?: boolean; go: (s: DriverScreen) => void }) {
  return <ScreenShell><Header title={destination ? "At the destination" : "At the pickup"} eyebrow={`DELIVERY #PT-48291`} back={() => go(destination ? "transit" : "pickup-route")} /><DriverProgress stage={destination ? 5 : 2} /><div className="driver-action-content"><div className="location-hero"><span><Icon name="location" size={28} /></span><small>{destination ? "DROP-OFF ADDRESS" : "PICKUP ADDRESS"}</small><strong>{destination ? "85 Coventry Street" : "12 Easey Street"}</strong><p>{destination ? "Southbank VIC 3006 · Reception, Level 2" : "Collingwood VIC 3066 · Apartment 4B"}</p></div><div className="instruction-card"><div><Icon name="message" /><span><small>{destination ? "RECIPIENT INSTRUCTIONS" : "CUSTOMER INSTRUCTIONS"}</small><strong>{destination ? "Ask reception for Priya. Recipient code is required before handover." : "Ring buzzer 04. Please call if there’s no answer after two minutes."}</strong></span></div><button><Icon name="phone" /> Call</button></div>{destination ? <div className="requirements-list">{[["shield","4-digit recipient code","Required"],["camera","Delivery photo","Required"],["user","Recipient confirmation","Required"]].map(x => <div key={x[1]}><Icon name={x[0] as IconName} /><span><strong>{x[1]}</strong><small>{x[2]}</small></span><Icon name="check" size={15} /></div>)}</div> : <><div className="item-detail-card"><span className="item-thumb"><Icon name="box" size={30} /></span><div><small>ITEM TO COLLECT</small><strong>Oak dining table</strong><span>1 item · 35–50 kg · No helper</span></div></div><div className="condition-note"><Icon name="camera" /><span><strong>Pickup photos required</strong><small>Photograph the item before moving it and note any existing damage.</small></span></div></>}</div><div className="sticky-action driver-sticky"><Button onClick={() => go(destination ? "code" : "pickup-proof")} icon={destination ? "shield" : "package"}>{destination ? "Verify Recipient" : "Confirm Pickup"}</Button></div></ScreenShell>;
}

function ProofUploader({ delivery = false }: { delivery?: boolean }) {
  const [status, setStatus] = useState<"empty"|"uploading"|"failed"|"done">("empty");
  useEffect(() => { if (status === "uploading") { const id = setTimeout(() => setStatus("failed"), 1200); return () => clearTimeout(id); } }, [status]);
  if (status === "done") return <div className="proof-preview"><div><Icon name={delivery ? "location" : "box"} size={40} /><StatusPill tone="green">UPLOADED</StatusPill></div><span><strong>Photo looks clear</strong><small>1.8 MB · Uploaded securely</small></span><button onClick={() => setStatus("empty")}>Retake</button></div>;
  return <button className={`proof-uploader ${status}`} onClick={() => setStatus(status === "failed" ? "done" : "uploading")}><span><Icon name={status === "failed" ? "x" : "camera"} size={30} /></span><strong>{status === "empty" ? "Open camera" : status === "uploading" ? "Uploading photo…" : "Upload failed"}</strong><small>{status === "empty" ? "Take a clear, well-lit photo" : status === "uploading" ? "68% · Keep this screen open" : "Check your connection and tap to retry"}</small>{status === "uploading" && <i><b /></i>}{status === "failed" && <em>Retry upload</em>}</button>;
}

function PickupProof({ go }: { go: (s: DriverScreen) => void }) {
  return <ScreenShell><Header title="Pickup proof" eyebrow="PROTECT EVERY DELIVERY" back={() => go("pickup-arrived")} /><DriverProgress stage={2} /><div className="driver-action-content"><div className="proof-instruction"><Icon name="camera" /><span><strong>Photograph before moving</strong><small>Make sure the full item and its condition are visible.</small></span></div><ProofUploader /><label className="driver-label">CONDITION NOTES</label><div className="driver-textarea">Small existing scratch on the left edge.<small>43 / 300</small></div><button className="report-issue-button" onClick={() => go("problem")}><Icon name="support" /><span><strong>Report an issue with this item</strong><small>Damage, wrong item, or safety concern</small></span><Icon name="chevron" /></button></div><div className="sticky-action driver-sticky"><Button onClick={() => go("pickup-complete")} icon="check">Confirm Item Collected</Button></div></ScreenShell>;
}

function PickupComplete({ go }: { go: (s: DriverScreen) => void }) {
  return <StatusScreen icon="package" badge="PICKUP COMPLETE" title="Item collected safely" text="You’re ready to head to Southbank." go={go}><DriverProgress stage={3} /><div className="next-destination"><span><Icon name="location" /></span><div><small>DELIVER TO</small><strong>85 Coventry Street, Southbank</strong><p>16 min · 4.8 km</p></div></div><div className="accepted-earn compact"><small>DELIVERY EARNINGS</small><strong>$28.40</strong><span>Locked in</span></div><Button onClick={() => go("transit")} icon="route">Start Delivery</Button></StatusScreen>;
}

function RecipientCode({ go }: { go: (s: DriverScreen) => void }) {
  const [code, setCode] = useState(["","","",""]);
  const [state, setState] = useState<"idle"|"error"|"success">("idle");
  const key = (n: string) => { if (state === "error") setState("idle"); const i = code.findIndex(x => !x); if (i >= 0) { const next = [...code]; next[i] = n; setCode(next); } };
  const verify = () => { if (code.join("") === "4829") setState("success"); else { setState("error"); setTimeout(() => setCode(["","","",""]), 450); } };
  if (state === "success") return <StatusScreen icon="check" badge="RECIPIENT VERIFIED" title="Code confirmed" text="You can now hand the item to Priya and capture delivery proof." go={go}><DriverProgress stage={6} /><Button onClick={() => go("delivery-proof")} icon="camera">Capture Delivery Proof</Button></StatusScreen>;
  return <ScreenShell><Header title="Verify recipient" eyebrow="SECURE HANDOVER" back={() => go("destination")} /><DriverProgress stage={5} /><div className="code-content"><span className="code-shield"><Icon name="shield" size={31} /></span><div className="screen-title">Enter recipient code</div><p>Ask Priya for the 4-digit code shown in their Porter app.</p><div className={`code-boxes ${state === "error" ? "error" : ""}`}>{code.map((x,i) => <span key={i}>{x || "•"}</span>)}</div>{state === "error" ? <div className="code-error"><Icon name="x" /> Incorrect code. Ask the recipient to check and try again.</div> : <div className="code-hint">Demo correct code: <strong>4829</strong></div>}<div className="keypad">{["1","2","3","4","5","6","7","8","9","0"].map(n => <button key={n} onClick={() => key(n)}>{n}</button>)}<button className="key-delete" onClick={() => { const next=[...code]; const i=next.findLastIndex(Boolean); if(i>=0) next[i]=""; setCode(next); }}><Icon name="back" /></button></div></div><div className="sticky-action driver-sticky"><Button onClick={verify} disabled={code.some(x => !x)} icon="shield">Verify Code</Button></div></ScreenShell>;
}

function DeliveryProof({ go }: { go: (s: DriverScreen) => void }) {
  return <ScreenShell><Header title="Delivery proof" eyebrow="FINAL STEP" back={() => go("code")} /><DriverProgress stage={6} /><div className="driver-action-content"><div className="proof-instruction"><Icon name="camera" /><span><strong>Capture the completed handover</strong><small>Photograph the item in its delivered location. Avoid faces.</small></span></div><ProofUploader delivery /><label className="driver-label">DELIVERY NOTES</label><div className="driver-textarea muted">Delivered to Priya at reception…<small>0 / 300</small></div><label className="recipient-confirm"><input type="checkbox" defaultChecked /><span><i><Icon name="check" size={12} /></i>I confirm the item was handed to the verified recipient.</span></label></div><div className="sticky-action driver-sticky"><Button onClick={() => go("complete")} icon="check">Complete Delivery</Button></div></ScreenShell>;
}

function Complete({ go }: { go: (s: DriverScreen) => void }) {
  return <ScreenShell className="driver-complete"><div className="completion-rays"><span><Icon name="check" size={40} /></span></div><StatusPill tone="green">DELIVERED · 11:06 AM</StatusPill><div className="screen-title">Great work, Marcus</div><p>Delivery complete and your earnings are secured.</p><div className="completion-earnings"><small>YOU EARNED</small><strong>$28.40</strong><span>Added to Monday’s payout</span></div><div className="completion-breakdown"><div><span>Gross delivery price</span><strong>$35.50</strong></div><div><span>Porter fee</span><strong>− $7.10</strong></div><div><span>Payout amount</span><strong>$28.40</strong></div></div><div className="completion-summary"><div><Icon name="route" /><span><strong>Collingwood → Southbank</strong><small>4.8 km · 34 min total</small></span></div><div><Icon name="star" /><span><strong>Customer rating pending</strong><small>We’ll notify you when Priya rates</small></span></div></div><div className="complete-buttons"><Button onClick={() => go("offers")} icon="search">Find Another Delivery</Button><Button variant="ghost" onClick={() => go("home")} icon="home">Back to Home</Button></div></ScreenShell>;
}

function Problem({ go }: { go: (s: DriverScreen) => void }) {
  const [selected, setSelected] = useState(0); const [submitted, setSubmitted] = useState(0);
  const issues = ["Recipient unavailable","Incorrect recipient code","Unsafe location","Damaged item","Customer issue","Cannot access address","Other"];
  if (submitted) return <StatusScreen icon={submitted === 2 ? "check" : "support"} badge={submitted === 2 ? "RESOLVED" : "WAITING FOR SUPPORT"} title={submitted === 2 ? "Issue resolved" : "Your report is with support"} text={submitted === 2 ? "Mia confirmed the delivery can continue with reception." : "Stay at the location if it’s safe. Mia from Porter Support will respond shortly."} go={go}><div className="support-case"><div><span>CASE</span><strong>#PS-2041</strong></div><div><span>ISSUE</span><strong>{issues[selected]}</strong></div><div><span>STATUS</span><StatusPill tone={submitted === 2 ? "green" : "amber"}>{submitted === 2 ? "RESOLVED" : "LIVE"}</StatusPill></div></div><Button onClick={() => submitted === 1 ? setSubmitted(2) : go("transit")} icon="arrow">{submitted === 1 ? "Preview resolution" : "Continue delivery"}</Button><Button variant="ghost" icon="message">Message support</Button></StatusScreen>;
  return <ScreenShell><Header title="Report a problem" eyebrow="DELIVERY SUPPORT" back={() => go("transit")} /><div className="driver-action-content"><div className="safety-banner"><Icon name="shield" /><span><strong>Are you in immediate danger?</strong><small>Move to a safe place and call emergency services on 000.</small></span></div><label className="driver-label">WHAT’S HAPPENING?</label><div className="issue-grid">{issues.map((x,i) => <button onClick={() => setSelected(i)} className={i===selected ? "selected" : ""} key={x}><span className="radio">{i===selected && <i />}</span>{x}</button>)}</div><label className="driver-label">NOTES</label><div className="driver-textarea">Recipient isn’t answering the intercom or phone.<small>56 / 500</small></div><label className="driver-label">IMAGE EVIDENCE <span>OPTIONAL</span></label><button className="small-upload"><Icon name="camera" /><span><strong>Add photo</strong><small>Do not photograph people without consent</small></span></button></div><div className="sticky-action driver-sticky"><Button onClick={() => setSubmitted(1)} icon="support">Submit Report</Button></div></ScreenShell>;
}

function Cancel({ go }: { go: (s: DriverScreen) => void }) {
  const [reason,setReason]=useState(""); const [confirm,setConfirm]=useState(false);
  return <ScreenShell><Header title="Cancel delivery?" eyebrow="PLEASE REVIEW" back={() => go("pickup-route")} /><div className="cancel-content"><div className="cancel-warning"><Icon name="shield" size={33} /></div><div className="screen-title">Only cancel if you can’t continue</div><p>The delivery will return to search. Repeated cancellations after accepting may affect your offer priority.</p><div className="cancel-impact"><div><Icon name="package" /><span><strong>Customer impact</strong><small>A new driver will need to be found.</small></span></div><div><Icon name="star" /><span><strong>Account impact</strong><small>Emergencies and safety concerns won’t count against you.</small></span></div></div><label className="driver-label">CANCELLATION REASON</label>{["Vehicle breakdown","Personal emergency","Unsafe pickup","Item doesn’t match description","Other"].map(x => <button className={`cancel-reason ${reason===x?"selected":""}`} onClick={()=>setReason(x)} key={x}><span className="radio">{reason===x&&<i/>}</span>{x}</button>)}<label className="cancel-confirm"><input type="checkbox" checked={confirm} onChange={e=>setConfirm(e.target.checked)} /><span><i>{confirm&&<Icon name="check" size={12}/>}</i>I understand this delivery will be reassigned.</span></label><Button variant="danger" disabled={!reason||!confirm} onClick={()=>go("offers")}>Cancel & Release Delivery</Button><Button variant="ghost" onClick={()=>go("pickup-route")}>Keep Delivery</Button></div></ScreenShell>;
}

function Earnings({ go }: { go: (s: DriverScreen) => void }) {
  return <ScreenShell className="earnings-screen"><div className="driver-page-header"><div><small>DRIVER WALLET</small><strong>Earnings</strong></div><IconButton icon="document" label="Payout history" onClick={()=>go("payouts")} /></div><div className="earnings-hero"><span>THIS WEEK</span><strong>$842.60</strong><small><b>↑ 14.8%</b> vs last week</small><div className="earnings-bars">{[42,66,48,82,71,94,58].map((h,i)=><i key={i} className={i===5?"active":""} style={{height:`${h}%`}}><em>{["M","T","W","T","F","S","S"][i]}</em></i>)}</div></div><div className="earnings-content"><div className="earning-periods"><button>Today<strong>$186</strong></button><button className="active">Week<strong>$843</strong></button><button>Month<strong>$3.2k</strong></button></div><div className="driver-metrics earnings-grid"><Metric label="DELIVERIES" value="22" note="4.4 per day" icon="package"/><Metric label="AVG / DELIVERY" value="$38.30" note="+ $2.40" icon="route" tone="cyan"/></div><div className="earn-card"><div className="earn-card-head"><strong>Earnings summary</strong><StatusPill tone="blue">16–22 JUN</StatusPill></div>{[["Gross delivery earnings","$1,053.25"],["Porter commission","− $189.59"],["Adjustments","− $21.06"],["Net earnings","$842.60"]].map((x,i)=><div className={i===3?"net":""} key={x[0]}><span>{x[0]}</span><strong>{x[1]}</strong></div>)}</div><button className="payout-card" onClick={()=>go("payouts")}><span className="payout-icon"><Icon name="wallet"/></span><div><small>NEXT PAYOUT · MONDAY</small><strong>$342.80 pending</strong><span>$499.80 available now</span></div><Icon name="chevron"/></button><Button onClick={()=>go("payouts")} icon="wallet">View payout history</Button></div><DriverNav active="earnings" go={go}/></ScreenShell>;
}

function Payouts({ go }: { go:(s:DriverScreen)=>void }) {
  const rows=[["$342.80","23 Jun 2025","Pending","8 deliveries","PY-80492"],["$518.20","16 Jun 2025","Paid","12 deliveries","PY-80317"],["$74.40","12 Jun 2025","Adjusted","2 deliveries · +$8.00","PY-80198"],["$461.70","9 Jun 2025","Processing","11 deliveries","PY-80041"],["$126.00","2 Jun 2025","Held","3 deliveries","PY-79882"]];
  return <ScreenShell><Header title="Payout history" eyebrow="DRIVER WALLET" back={()=>go("earnings")}/><div className="payout-summary"><small>AVAILABLE FOR INSTANT PAYOUT</small><strong>$499.80</strong><Button>Transfer now · $0.85 fee</Button></div><div className="payout-list">{rows.map((x,i)=><div className="payout-row" key={x[4]}><span className="payout-row-icon"><Icon name="wallet"/></span><div><strong>{x[0]}</strong><small>{x[1]} · {x[3]}</small><em>{x[4]}</em></div><StatusPill tone={x[2]==="Paid"?"green":x[2]==="Held"?"red":x[2]==="Pending"||x[2]==="Processing"?"amber":"blue"}>{x[2]}</StatusPill></div>)}</div></ScreenShell>;
}

function History({ go }: { go:(s:DriverScreen)=>void }) {
  const [tab,setTab]=useState(0);
  return <ScreenShell><Header title="Delivery history" eyebrow="YOUR ACTIVITY" back={()=>go("account")}/><div className="driver-tabs">{["Completed","Cancelled","Issues"].map((x,i)=><button className={tab===i?"active":""} onClick={()=>setTab(i)} key={x}>{x}<span>{[24,2,1][i]}</span></button>)}</div><div className="history-list">{(tab===0?offers.slice(0,3):tab===1?offers.slice(2,4):offers.slice(1,2)).map((o,i)=><button key={i} className="history-card"><div className="history-head"><span>18 JUN · {10+i}:42 AM</span><StatusPill tone={tab===0?"green":tab===1?"red":"amber"}>{tab===0?"COMPLETED":tab===1?"CANCELLED":"ISSUE RESOLVED"}</StatusPill></div><div className="history-route"><i/><span><strong>{o.from}</strong><small>to {o.to}</small></span></div><div className="history-foot"><span><Icon name="van"/>{o.vehicle}</span><span>{o.distance}</span><strong>{tab===1?"$0.00":o.earn}</strong></div></button>)}</div></ScreenShell>;
}

function Ratings({ go }: { go:(s:DriverScreen)=>void }) {
  return <ScreenShell><Header title="Driver ratings" eyebrow="YOUR PERFORMANCE" back={()=>go("account")}/><div className="ratings-content"><div className="rating-hero"><div><strong>4.96</strong><span>{[1,2,3,4,5].map(x=><Icon name="star" key={x}/>)}</span><small>128 ratings · 214 deliveries</small></div><div className="rating-bars">{[[5,94],[4,5],[3,1],[2,0],[1,0]].map(x=><div key={x[0]}><span>{x[0]} <Icon name="star" size={10}/></span><i><b style={{width:`${x[1]}%`}}/></i><small>{x[1]}%</small></div>)}</div></div><div className="driver-metrics earnings-grid"><Metric label="COMPLETION" value="98.2%" note="Excellent" icon="check" tone="cyan"/><Metric label="ON-TIME" value="96.4%" note="Top 10%" icon="clock"/></div><div className="driver-section-head"><strong>Recent feedback</strong><span>Last 30 days</span></div>{[["5","“Marcus handled our table with real care. Fantastic service.”","Priya · Southbank"],["5","“On time, friendly and great communication.”","Alex · Richmond"],["4","“Smooth delivery, thank you.”","Sophie · Carlton"]].map(x=><div className="feedback-card" key={x[2]}><span><Icon name="star" size={14}/>{x[0]}.0</span><p>{x[1]}</p><small>{x[2]}</small></div>)}</div></ScreenShell>;
}

function Account({ go }: { go:(s:DriverScreen)=>void }) {
  const menu: [IconName,string,string,DriverScreen?][]=[["user","Profile","Marcus Taylor"],["van","Vehicle","Toyota HiAce · 1ABC 2DE","vehicle"],["document","Documents","2 need attention","documents"],["briefcase","Business / ABN","Verified"],["wallet","Bank & payout details","•••• 4821","payouts"],["star","Ratings","4.96 overall","ratings"],["clock","Delivery history","24 completed","history"],["message","Notifications","3 unread","notifications"],["shield","Privacy",""],["support","Support","24/7 driver help"],["document","Terms","Driver Agreement"]];
  return <ScreenShell className="account-screen"><div className="account-head"><div className="account-profile"><img src="https://images.unsplash.com/photo-1587558779223-5c39b4096e22?crop=faces&fit=crop&w=150&h=150&q=85" alt="Marcus"/><span><small>PORTER DRIVER</small><strong>Marcus Taylor</strong><em><i/> Approved · 4.96 rating</em></span></div><IconButton icon="message" label="Notifications" onClick={()=>go("notifications")}/></div><button className="expiry-warning" onClick={()=>go("documents")}><Icon name="shield"/><span><strong>Registration has expired</strong><small>Update now to restore Online access</small></span><Icon name="chevron"/></button><div className="account-menu">{menu.map(([icon,title,detail,screen])=><button key={title} onClick={()=>screen&&go(screen)}><span><Icon name={icon}/></span><div><strong>{title}</strong>{detail&&<small>{detail}</small>}</div>{title==="Documents"&&<StatusPill tone="red">ACTION</StatusPill>}<Icon name="chevron" size={17}/></button>)}</div><button className="logout"><Icon name="arrow"/> Log out</button><DriverNav active="account" go={go}/></ScreenShell>;
}

function Notifications({ go }: { go:(s:DriverScreen)=>void }) {
  const items:[[IconName,string,string,string,boolean]]=[["package","New delivery offer","Richmond → South Yarra · Earn $28.40","Just now",true],["check","Application approved","You’re ready to start driving with Porter.","2h",true],["shield","Document expiring","Your insurance expires in 14 days.","Yesterday",true],["x","Document rejected","Your registration photo needs to be clearer.","Yesterday",false],["route","Delivery reassigned","Delivery #PT-47102 has a new driver.","Mon",false],["wallet","Payout completed","$518.20 was paid to your account.","Mon",false],["support","Dispute opened","Support is reviewing delivery #PT-46918.","Sun",false],["message","Account message","New safety guidance is available.","Fri",false]];
  return <ScreenShell><Header title="Notifications" eyebrow="DRIVER UPDATES" back={()=>go("account")}/><div className="notification-actions"><span>3 unread</span><button>Mark all as read</button></div><div className="notification-list">{items.map((x,i)=><button className={x[4]?"unread":""} key={i} onClick={()=>i===0?go("incoming"):i===2||i===3?go("documents"):undefined}><span className={`notification-icon n${i}`}><Icon name={x[0]}/></span><div><strong>{x[1]}</strong><p>{x[2]}</p><small>{x[3]}</small></div>{x[4]&&<i/>}</button>)}</div></ScreenShell>;
}

export default function DriverApp() {
  const [screen,setScreen]=useState<DriverScreen>("home");
  const [onboardingStep,setOnboardingStep]=useState(0);
  const go=(next:DriverScreen)=>{setScreen(next); window.scrollTo(0,0);};
  if(screen==="home") return <DriverHome go={go}/>;
  if(screen==="onboarding") return <Onboarding go={go} step={onboardingStep} setStep={setOnboardingStep}/>;
  if(screen==="vehicle") return <VehicleDetails go={go} advanceOnboarding={() => { setOnboardingStep(3); go("onboarding"); }}/>;
  if(screen==="documents") return <Documents go={go} advanceOnboarding={() => { setOnboardingStep(5); go("onboarding"); }}/>;
  if(screen==="pending") return <Pending go={go}/>;
  if(screen==="approved") return <Approved go={go}/>;
  if(screen==="blocked") return <Blocked go={go}/>;
  if(screen==="offers") return <Offers go={go}/>;
  if(screen==="incoming") return <Incoming go={go}/>;
  if(screen==="accepted") return <Accepted go={go}/>;
  if(screen==="pickup-route") return <DriverMapScreen mode="pickup" stage={1} go={go}/>;
  if(screen==="pickup-arrived") return <LocationAction go={go}/>;
  if(screen==="pickup-proof") return <PickupProof go={go}/>;
  if(screen==="pickup-complete") return <PickupComplete go={go}/>;
  if(screen==="transit") return <DriverMapScreen mode="transit" stage={4} go={go}/>;
  if(screen==="destination") return <LocationAction destination go={go}/>;
  if(screen==="code") return <RecipientCode go={go}/>;
  if(screen==="delivery-proof") return <DeliveryProof go={go}/>;
  if(screen==="complete") return <Complete go={go}/>;
  if(screen==="problem") return <Problem go={go}/>;
  if(screen==="cancel") return <Cancel go={go}/>;
  if(screen==="earnings") return <Earnings go={go}/>;
  if(screen==="payouts") return <Payouts go={go}/>;
  if(screen==="history") return <History go={go}/>;
  if(screen==="ratings") return <Ratings go={go}/>;
  if(screen==="account") return <Account go={go}/>;
  return <Notifications go={go}/>;
}
