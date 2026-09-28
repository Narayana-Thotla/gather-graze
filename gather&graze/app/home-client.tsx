"use client";

import { useMemo, useState } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, BadgeCheck, CalendarDays, Check, ChefHat, ChevronDown, Clock3, Flame, Heart, MapPin, Menu, Minus, Plus, Search, ShieldCheck, Sparkles, Star, UtensilsCrossed, Users, X } from "lucide-react";
import { createInquiry } from "@/lib/api";


const eventOptions = ["Wedding", "Birthday", "Corporate", "House party", "Kitty party"];
const eventValues = ["wedding", "birthday", "corporate", "house-party", "kitty-party"];
const categories = [
  { title: "Caterers", subtitle: "Menus made for a moment", icon: UtensilsCrossed, image: "photo-1555244162-803834f70033" },
  { title: "Private chefs", subtitle: "A chef at your place", icon: ChefHat, image: "photo-1577219491135-ce391730fb2c" },
  { title: "Service staff", subtitle: "The helping hands", icon: Users, image: "photo-1556909114-f6e7ad7d3136" },
  { title: "Restaurant feasts", subtitle: "Big flavours, big batches", icon: Flame, image: "photo-1563379091339-03246963d96c" },
];
const caterers = [
  { name: "Saffron & Sage", category: "Caterers", type: "Modern Indian · North Indian", rating: "4.9", reviews: "128", price: "₹850", tag: "MOST LOVED", image: "photo-1555939594-58d7cb561ad1", color: "#d88b59", description: "Comfort classics, dressed for the occasion." },
  { name: "The Good Grain", category: "Caterers", type: "Seasonal · Global", rating: "4.8", reviews: "96", price: "₹1,200", tag: "SEASONAL MENU", image: "photo-1547592180-85f173990554", color: "#83a38a", description: "Thoughtful plates with ingredients in season." },
  { name: "Daawat at Home", category: "Restaurant feasts", type: "Mughlai · Hyderabadi", rating: "4.9", reviews: "214", price: "₹650", tag: "GREAT FOR GROUPS", image: "photo-1565299624946-b28f40a0ae38", color: "#bc6d48", description: "Biryani, kebabs, and all the reasons to gather." },
  { name: "Chef Mira", category: "Private chefs", type: "In-home chef · Multi-cuisine", rating: "4.9", reviews: "84", price: "₹1,500", tag: "COOKS AT YOUR HOME", image: "photo-1577219491135-ce391730fb2c", color: "#718970", description: "A dedicated cook, a menu made around you." },
  { name: "Supper Club Kitchen", category: "Private chefs", type: "Private cook · Regional Indian", rating: "4.8", reviews: "57", price: "₹1,100", tag: "FAMILY FAVOURITE", image: "photo-1556909114-f6e7ad7d3136", color: "#a37a55", description: "A warm, hands-on cook for your gathering." },
  { name: "The Hosting Hands", category: "Service staff", type: "Servers · Event support", rating: "4.9", reviews: "73", price: "₹900", tag: "STAFF YOUR TABLE", image: "photo-1517248135467-4c7edcad34c4", color: "#756d91", description: "Friendly servers to keep your evening flowing." },
];
const img = (id: string, width = 700) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;

export default function Home() {
  const [eventIndex, setEventIndex] = useState(1);
  const [guests, setGuests] = useState(40);
  const [date, setDate] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [saved, setSaved] = useState<string[]>([]);
  const [added, setAdded] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [location, setLocation] = useState("Bengaluru");

  const visibleCaterers = useMemo(() => activeCategory === "All" ? caterers : caterers.filter((c) => c.category === activeCategory), [activeCategory]);

  async function searchEvents() {
    if (!date) { setMessage("Choose a date for your gathering to see who’s available."); return; }
    setLoading(true); setMessage("");
    try {
      const result = await createInquiry({ eventType: eventValues[eventIndex], guests, date, services: added });
      setMessage(result.message);
      document.getElementById("discover")?.scrollIntoView({ behavior: "smooth" });
    } catch (error) { setMessage(error instanceof Error ? error.message : "Please try again."); }
    finally { setLoading(false); }
  }
  const toggleSaved = (name: string) => setSaved((items) => items.includes(name) ? items.filter((x) => x !== name) : [...items, name]);
  const toggleAdded = (name: string) => setAdded((items) => items.includes(name) ? items.filter((x) => x !== name) : [...items, name]);

  return <main>
    <div className="announcement"><Sparkles size={13} /> A little more magic for your next get-together <span className="announcement-divider">·</span> Discover something delicious <ArrowUpRight size={13} /></div>
    <header className="nav-shell">
      <a className="brand" href="#top" aria-label="Gather and Graze home"><span className="brand-mark"><UtensilsCrossed size={20} strokeWidth={2.4} /></span><span>gather<span className="brand-amp">&</span>graze<span className="brand-dot">.</span></span></a>
      <nav className={menuOpen ? "nav-links mobile-open" : "nav-links"} aria-label="Main navigation"><a href="#discover">Explore food <ChevronDown size={14} /></a><a href="#services">Services</a><a href="#how-it-works">How it works</a></nav>
      <div className="nav-right"><button className="location-button" onClick={() => setLocation(location === "Bengaluru" ? "Mumbai" : "Bengaluru")} aria-label="Change city"><MapPin size={15} /><span>{location}</span><ChevronDown size={13} /></button><button className="login-button" onClick={() => setMessage("Sign-in will be available when accounts are connected.")}>Log in</button><a className="host-button" href="#discover">Plan an event <ArrowUpRight size={15} /></a></div>
      <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"}>{menuOpen ? <X /> : <Menu />}</button>
    </header>

    <section className="hero" id="top"><div className="hero-grain" />
      <div className="hero-copy"><div className="eyebrow"><span className="eyebrow-line" /> LESS PLANNING. MORE PASSING PLATES.</div><h1>Good food.<br /><em>Great together.</em></h1><p>From the first hello to the last bite, find everything you need to make a gathering feel like yours.</p><div className="hero-proof"><span className="avatar-stack"><i>R</i><i>M</i><i>A</i><i>+</i></span><span>Loved by <strong>2,400+</strong> happy hosts</span><span className="proof-stars"><Star size={13} fill="currentColor" /> 4.9</span></div></div>
      <div className="hero-art" aria-label="A table of colorful food to share"><div className="hero-photo" /><div className="hero-sticker"><span>made for</span><strong>the<br />moments<br />that matter</strong><span className="sticker-flower">✳</span></div><div className="hero-note"><span className="note-icon"><Heart size={16} fill="currentColor" /></span><span><strong>Made to be shared</strong><small>Gather around something good</small></span></div><div className="hero-sparkle sparkle-one">✳</div><div className="hero-sparkle sparkle-two">✳</div></div>
      <div className="hero-side-note">A table full of stories starts here <ArrowDown size={14} /></div>
    </section>

    <section className="planner-wrap" aria-label="Find food for your event"><div className="planner-top"><span className="planner-kicker"><span className="pulse-dot" /> YOUR NEXT GATHERING, SORTED</span><span className="planner-scribble">Tell us a little about it <span>↘</span></span></div><div className="planner-fields">
      <label className="planner-field event-field"><span className="field-icon"><Sparkles size={17} /></span><span className="field-text"><span>WHAT ARE WE CELEBRATING?</span><select aria-label="Event type" value={eventIndex} onChange={(e) => setEventIndex(Number(e.target.value))}>{eventOptions.map((option, i) => <option key={option} value={i}>{option}</option>)}</select></span><ChevronDown className="field-chevron" size={16} /></label>
      <div className="planner-field guest-field"><span className="field-icon"><Users size={18} /></span><div className="field-text"><span>AROUND HOW MANY?</span><span className="counter"><button onClick={() => setGuests(Math.max(2, guests - 5))} aria-label="Decrease guests"><Minus size={13} /></button><strong>{guests} guests</strong><button onClick={() => setGuests(Math.min(10000, guests + 5))} aria-label="Increase guests"><Plus size={13} /></button></span></div></div>
      <label className="planner-field date-field"><span className="field-icon"><CalendarDays size={17} /></span><span className="field-text"><span>WHEN IS THE BIG DAY?</span><input aria-label="Event date" type="date" value={date} min={new Date().toISOString().slice(0, 10)} required onChange={(e) => setDate(e.target.value)} /></span></label>
      <button className="find-button" onClick={searchEvents} disabled={loading}>{loading ? "Finding your feast…" : <>Find your feast <ArrowRight size={17} /></>}</button>
    </div>{message && <div className="inline-message" role="status"><Check size={15} /> {message}</div>}<div className="planner-bottom"><span><ShieldCheck size={14} /> Good people. Vetted partners.</span><span><Clock3 size={14} /> Takes about 2 minutes</span><span><BadgeCheck size={14} /> No guesswork, just good food</span></div></section>

    <section className="section-wrap category-section" id="services"><div className="section-heading"><div><span className="section-eyebrow">A LITTLE BIT OF EVERYTHING</span><h2>Everything on the <em>table.</em></h2></div><a className="text-link" href="#discover">See all services <ArrowUpRight size={15} /></a></div><div className="category-grid">{categories.map(({ title, subtitle, icon: Icon, image }, index) => <button className="category-card" key={title} onClick={() => { setActiveCategory(title); document.getElementById("discover")?.scrollIntoView({ behavior: "smooth" }); }}><div className="category-image" style={{ backgroundImage: `url('${img(image, 500)}')` }}><span className="category-number">0{index + 1}</span><span className="category-icon"><Icon size={19} /></span><span className="category-arrow"><ArrowUpRight size={17} /></span></div><div className="category-info"><div><h3>{title}</h3><p>{subtitle}</p></div><ArrowRight size={16} /></div></button>)}</div></section>

    <section className="popular-band"><div className="popular-inner"><div className="popular-copy"><span className="section-eyebrow light-eyebrow">LITTLE PARTY, BIG FLAVOUR</span><h2>Hosting a cozy one?<br /><em>We’ve got a handi</em><br />for that.</h2><p>Restaurant favourites, ordered in the quantities your table actually needs. Yes, even enough chicken biryani for 40.</p><button onClick={() => { setActiveCategory("Restaurant feasts"); document.getElementById("discover")?.scrollIntoView({ behavior: "smooth" }); }}>Explore bulk restaurant menus <ArrowRight size={16} /></button><div className="popular-rating"><span><Star size={13} fill="currentColor" /> 4.9 from 2,400+ hosts</span><span>·</span><span>Serves 20–200</span></div></div><div className="popular-art"><div className="popular-photo"/><span className="popular-stamp">A FEAST<br/>WORTH<br/>GATHERING<br/>FOR</span><span className="popular-caption"><span>✳</span> good things<br/>come in handi</span></div></div><div className="band-leaf leaf-left">✳</div><div className="band-leaf leaf-right">✳</div></section>

    <section className="section-wrap discover-section" id="discover"><div className="section-heading discover-heading"><div><span className="section-eyebrow">THE GOOD STUFF, CLOSE BY</span><h2>Worth gathering <em>for.</em></h2><p>Thoughtful menus from people who care how your table feels.</p></div><a className="text-link" href="#vendors">Meet all our hosts <ArrowUpRight size={15} /></a></div><div className="filter-row"><div className="filter-chips">{["All", "Caterers", "Private chefs", "Service staff", "Restaurant feasts"].map((filter) => <button key={filter} className={activeCategory === filter ? "filter-chip active" : "filter-chip"} onClick={() => setActiveCategory(filter)}>{filter}</button>)}</div><button className="filter-control" onClick={() => setMessage("More filters are coming as partner menus are connected.")}><span>⌘</span> Filters <span className="filter-count">2</span></button></div>
      <div className="vendor-grid" id="vendors">{visibleCaterers.map((vendor, i) => <article className="vendor-card" key={vendor.name} style={{ animationDelay: `${i * 90}ms` }}><div className="vendor-image-wrap"><div className="vendor-image" style={{ backgroundImage: `url('${img(vendor.image)}')` }} /><span className="vendor-tag" style={{ background: vendor.color }}>{vendor.tag}</span><button className={saved.includes(vendor.name) ? "save-button saved" : "save-button"} onClick={() => toggleSaved(vendor.name)} aria-label={saved.includes(vendor.name) ? `Remove ${vendor.name} from saved` : `Save ${vendor.name}`}><Heart size={18} fill={saved.includes(vendor.name) ? "currentColor" : "none"} /></button><span className="delivery-pill"><Clock3 size={12} /> 45–60 min</span></div><div className="vendor-info"><div className="vendor-title-row"><div><h3>{vendor.name}</h3><p>{vendor.type}</p></div><span className="vendor-rating"><Star size={13} fill="currentColor" /> {vendor.rating} <small>({vendor.reviews})</small></span></div><p className="vendor-description">{vendor.description}</p><div className="vendor-bottom"><span><strong>{vendor.price}</strong> <small>/ person</small></span><button className={added.includes(vendor.name) ? "add-button is-added" : "add-button"} onClick={() => toggleAdded(vendor.name)}>{added.includes(vendor.name) ? <><Check size={14} /> Added</> : <><Plus size={14} /> Add to plan</>}</button></div></div></article>)}</div>
    </section>

    <section className="how-section" id="how-it-works"><div className="how-inner"><div className="how-heading"><span className="section-eyebrow">FROM “WHAT SHOULD WE DO?” TO “THAT WAS LOVELY”</span><h2>Three little steps.<br/><em>A very good time.</em></h2><p>You bring the people. We’ll help with the plates.</p></div><div className="steps-grid"><div className="step-card"><span className="step-number">01</span><span className="step-icon"><Search size={20}/></span><h3>Tell us the occasion</h3><p>Pick your date, guest count, and the kind of gathering you have in mind.</p><span className="step-doodle">✳</span></div><div className="step-card"><span className="step-number">02</span><span className="step-icon"><Heart size={20}/></span><h3>Find your kind of good</h3><p>Compare lovely local caterers, cooks, staff, and big-batch restaurant menus.</p><span className="step-doodle">⌁</span></div><div className="step-card"><span className="step-number">03</span><span className="step-icon"><UtensilsCrossed size={20}/></span><h3>Make room at the table</h3><p>Choose your dishes and package. We’ll help bring the whole thing together.</p><span className="step-doodle">✿</span></div></div></div></section>

    <section className="cta-section"><div className="cta-sprig">✳</div><span className="section-eyebrow">YOUR PEOPLE. YOUR TABLE. YOUR CALL.</span><h2>Something lovely<br/>starts with <em>“come over.”</em></h2><a className="cta-button" href="#top">Let’s plan your gathering <ArrowUpRight size={16}/></a><p>Good food has a way of bringing everyone a little closer.</p></section>
    <footer className="footer"><a className="brand footer-brand" href="#top"><span className="brand-mark"><UtensilsCrossed size={18}/></span><span>gather<span className="brand-amp">&</span>graze<span className="brand-dot">.</span></span></a><span>Made for the moments we make together.</span><div className="footer-links"><a href="#services">For hosts</a><a href="#discover">For partners</a><a href="#how-it-works">Our story</a></div><span className="footer-copy">© 2026 Gather & Graze</span></footer>
    <button className="scroll-top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Scroll to top"><ArrowRight size={16} /></button>
  </main>;
}
