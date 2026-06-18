import React, { useState, useRef, useEffect } from 'react';
import { 
  Plus, 
  Minus, 
  ChevronLeft, 
  ChevronRight, 
  ChevronUp,
  Star, 
  Shield, 
  Wrench, 
  Search, 
  Menu, 
  X, 
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Clock,
  ThumbsUp,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Custom SVG Logo for DS Plomberie Électricité matching the user's custom layout
const DsLogo = ({ className = "size-10" }: { className?: string }) => {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" referrerPolicy="no-referrer">
      {/* Circle Background */}
      <circle cx="50" cy="50" r="48" fill="#1b3644" stroke="#ffffff" strokeWidth="2" />
      {/* Crossing Lines (X) */}
      <line x1="22" y1="22" x2="78" y2="78" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="78" y1="22" x2="22" y2="78" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" />
      {/* Letter D on the left */}
      <text x="18" y="56" fill="#ffffff" fontFamily="'Outfit', sans-serif" fontSize="19" fontWeight="800" textAnchor="middle">D</text>
      {/* Letter S on the right */}
      <text x="82" y="56" fill="#ffffff" fontFamily="'Outfit', sans-serif" fontSize="19" fontWeight="800" textAnchor="middle">S</text>
      
      {/* Faucet at the Top */}
      <path d="M44 26 h12 m-6 0 v4 m-4 4 C46 31, 54 31, 54 34 v2 m-4 -2 v5" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
      {/* Water droplet */}
      <path d="M50 42 c0 0.8 -0.6 1.2 -1.2 1.2 s-1.2 -0.4 -1.2 -1.2 c0 -0.8 1.2 -2.1 1.2 -2.1 s1.2 1.3 1.2 2.1z" fill="#38bdf8" />

      {/* Lightbulb / Hanging Lamp at the bottom */}
      <line x1="50" y1="58" x2="50" y2="64" stroke="#ffffff" strokeWidth="1.5" />
      {/* Lamp cup */}
      <path d="M42 69 c0-3 16-3 16 0" stroke="#ffffff" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      {/* Horizontal base */}
      <line x1="39" y1="69" x2="61" y2="69" stroke="#ffffff" strokeWidth="1.8" />
      {/* Lightbulb glass dome */}
      <path d="M47 69 v2 c0 2.2 1.3 3.5 3 3.5 s3-1.3 3-3.5 v-2" fill="#fef08a" stroke="#ffffff" strokeWidth="1.2" />
      {/* Light rays */}
      <line x1="50" y1="78" x2="50" y2="81" stroke="#fbbf24" strokeWidth="1" strokeLinecap="round" />
      <line x1="43" y1="76" x2="40" y2="79" stroke="#fbbf24" strokeWidth="1" strokeLinecap="round" />
      <line x1="57" y1="76" x2="60" y2="79" stroke="#fbbf24" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
};

// Unified absolute asset references 
const IMAGES = {
  avatarJeanLuc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300",
  avatarLaetitia: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300",
  avatarSebastien: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300",
  avatarMartine: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=300",
  heroMain: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=1600", // Plumbing copper works
  heroAbout: "/assets/uploads/van_st_malo_1781783092907.jpg",
  installation: "/assets/uploads/modern_bathroom_1781783112628.jpg",
  repair: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=600", // Electrical installations
  inspection: "https://images.unsplash.com/photo-1621905252507-b354bc25edac?q=80&w=600", // Electrical circuit inspection
  emergency: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=600", // Sinks & tools work
  completed: "/assets/uploads/modern_bathroom_1781783112628.jpg",
  yearsExperience: "https://images.unsplash.com/photo-1581094288338-2314dddb7eed?q=80&w=600", // Engineering / work tools
  satisfaction: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=600", // Kitchen layout
  process1: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=600", // Plumbing assessment
  process2: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=600", // Custom document / quote
  process3: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=600", // Physical expert install
  contact: "/assets/uploads/van_st_malo_1781783092907.jpg"
};

// Services Data with exact details from original template
const SERVICES = [
  {
    id: 1,
    title: "Plomberie & Chauffage",
    desc: "Création et rénovation complète de salles de bain, remplacement de chauffe-eau, pose d'équipements sanitaires et réparation de fuites. Produits professionnels esthétiques et durables.",
    image: IMAGES.installation,
  },
  {
    id: 2,
    title: "Électricité Générale",
    desc: "Mise en conformité (NF C 15-100), câblage de tableaux électriques, ajouts de prises et d'éclairages, dépannage de circuits et motorisations.",
    image: IMAGES.repair,
  },
  {
    id: 3,
    title: "Débouchage Canalisation",
    desc: "Curage de canalisations bouchées, éviers, toilettes et réseaux d'eaux usées. Équipement professionnel adapté pour débloquer rapidement tout type d'engorgement.",
    image: IMAGES.inspection,
  },
  {
    id: 4,
    title: "Dépannage Urgent 24h/7",
    desc: "Intervention express en moins d'une heure pour fuites majeures, pannes électriques et sanitaires bouchés. Service fiable assuré de jour comme de nuit.",
    image: IMAGES.emergency,
  }
];

// Testimonials Data with exact avatars and descriptions
const TESTIMONIALS = [
  {
    name: "Jean-Luc G.",
    role: "Propriétaire",
    location: "Rennes (35)",
    avatar: IMAGES.avatarJeanLuc,
    text: "DS Plomberie Électricité est intervenue chez moi pour une rénovation complète de salle de bain. Travail d'une finesse exemplaire, délais au jour près et propreté irréprochable. Un excellent artisan."
  },
  {
    name: "Laëtitia B.",
    role: "Propriétaire",
    location: "Saint-Malo (35)",
    avatar: IMAGES.avatarLaetitia,
    text: "Appelée pour un débouchage de WC un samedi soir. L'artisan est arrivé en 45 minutes, le prix m'a été communiqué avant l'intervention et le problème a été réglé avec efficacité. Confiance absolue."
  },
  {
    name: "Sébastien & Céline M.",
    role: "Co-propriétaires",
    location: "Cesson-Sévigné (35)",
    avatar: IMAGES.avatarSebastien,
    text: "Nous avons fait refaire notre tableau électrique général et mettre aux normes l'ensemble de la maison de 1970. Explications extrêmement claires, chantier propre et travail très soigné."
  },
  {
    name: "Martine L.",
    role: "Propriétaire",
    location: "Noyal-sur-Vilaine (35)",
    avatar: IMAGES.avatarMartine,
    text: "Remplacement de chauffe-eau ultra-rapide un lundi matin après une panne le week-end. Artisan honnête, poli et compétent. Je recommande vivement ses services !"
  }
];

// FAQ Data with rich descriptive answers
const FAQS = [
  {
    id: 1,
    question: "Quels sont vos délais en cas d'intervention urgente ?",
    answer: "Pour toute urgence vitale de plomberie ou d'électricité (grosse fuite d'eau, panne de courant intégrale, canalisation principale bouchée), nous intervenons généralement en moins d'une heure sur Rennes, Saint-Malo et leurs environs directes, 24h/24 et 7j/7."
  },
  {
    id: 2,
    question: "Proposez-vous des devis gratuits pour les travaux ?",
    answer: "Oui ! Tous nos devis d'installation, de rénovation ou de mise en conformité sont 100% gratuits, détaillés par poste et sans aucun engagement de votre part. Les tarifs sont expliqués avant d'engager les travaux."
  },
  {
    id: 3,
    question: "Quels types de garanties proposez-vous ?",
    answer: "Toutes nos réalisations d'installation et de rénovation (salle de bain, réseau électrique, chauffe-eau) bénéficient de notre assurance Garantie Décennale d'Artisan. De plus, les matériels installés profitent de la garantie constructeur totale."
  },
  {
    id: 4,
    question: "Intervenez-vous pour de petits travaux d'appoint ?",
    answer: "Tout à fait. Qu'il s'agisse de changer un robinet usé, de réparer une prise de courant arrachée, d'ajouter de simples luminaires ou de déboucher un évier récalcitrant, nous accordons le même soin méticuleux aux petites interventions."
  },
  {
    id: 5,
    question: "Quelle zone géographique couvrez-vous ?",
    answer: "Notre équipe se déplace sur l'ensemble du département d'Ille-et-Vilaine (35), incluant principalement la grande métropole de Rennes (Noyal-sur-Vilaine, Cesson, Pacé, Liffré...) ainsi que toute la Côte d'Émeraude jusqu'à Saint-Malo, Dinard et Cancale."
  },
  {
    id: 6,
    question: "Vos interventions respectent-elles les normes en vigueur ?",
    answer: "Oui, absolument. Toutes nos installations électriques respectent scrupuleusement la norme NF C 15-100 pour votre sécurité. Nos travaux de plomberie et raccordements suivent précisément les règles de l'art du DTU de la plomberie française."
  }
];

export default function App() {
  // Navigation states
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Accordion state
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Scroll references for sliders
  const servicesScrollRef = useRef<HTMLDivElement>(null);
  const testimonialsScrollRef = useRef<HTMLDivElement>(null);

  // Content state — defaults from hardcoded values, overridden by /content/*.json on mount
  const [services, setServices] = useState(SERVICES);
  const [testimonials, setTestimonials] = useState(TESTIMONIALS);
  const [faqs, setFaqs] = useState(FAQS);
  const [heroContent, setHeroContent] = useState({
    title: 'Votre Confort.',
    titleGradient: 'Notre Exigence.',
    subtitle: 'Artisan qualifié à Rennes et Saint-Malo. De la rénovation complète de votre plomberie et électricité aux dépannages d\'urgence 24h/7, profitez d\'une expertise rigoureuse et de tarifs transparents.',
    heroImage: IMAGES.heroMain,
    badgeCount: '500+ Clients Satisfaits',
  });
  const [contact, setContact] = useState({
    phone: '06 12 34 56 78',
    email: 'contact@dsplomberieelectricite.com',
    zone: 'Rennes, Saint-Malo & alentours',
    contactImage: IMAGES.contact,
  });

  // Sync navbar background on scroll
  useEffect(() => {
    const handleScroll = () => { setScrolled(window.scrollY > 20); };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Load editable content from JSON (populated by admin CMS)
  useEffect(() => {
    const load = async (url: string) => {
      try { const r = await fetch(url); return r.ok ? r.json() : null; } catch { return null; }
    };
    Promise.all([
      load('/content/hero.json'),
      load('/content/services.json'),
      load('/content/testimonials.json'),
      load('/content/faq.json'),
      load('/content/contact.json'),
    ]).then(([hero, svc, testi, faqData, cnt]) => {
      if (hero) setHeroContent(h => ({ ...h, ...(hero.title_plain && { title: hero.title_plain }), ...(hero.title_gradient && { titleGradient: hero.title_gradient }), ...(hero.subtitle && { subtitle: hero.subtitle }), ...(hero.hero_image && { heroImage: hero.hero_image }), ...(hero.badge_count && { badgeCount: hero.badge_count }) }));
      if (svc?.items?.length) setServices(svc.items);
      if (testi?.items?.length) setTestimonials(testi.items);
      if (faqData?.items?.length) setFaqs(faqData.items);
      if (cnt) setContact(c => ({ ...c, ...(cnt.phone && { phone: cnt.phone }), ...(cnt.email && { email: cnt.email }), ...(cnt.zone && { zone: cnt.zone }), ...(cnt.contact_image && { contactImage: cnt.contact_image }) }));
    });
  }, []);

  // Smooth carousel scroll control
  const handleScrollRef = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (ref.current) {
      ref.current.scrollBy({ left: direction === 'left' ? -340 : 340, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-50/50 text-slate-900 selection:bg-sky-500 selection:text-white">
      
      {/* 1. TOP HEADER / NAVIGATION */}
      <nav 
        id="navbar"
        className={`fixed z-50 top-0 left-0 w-full transition-all duration-500 ${
          scrolled 
            ? 'h-16 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100' 
            : 'h-20 bg-transparent'
        }`}
      >
        <div className="mx-auto flex items-center justify-between h-full w-content-width">
          {/* Logo / Brand Name */}
          <a href="#" className="flex items-center gap-2.5 text-xl font-bold font-display tracking-tight text-slate-950">
            <DsLogo className="size-11 shadow-sm transition-transform duration-300 hover:scale-105" />
            <div className="flex flex-col">
              <span className="text-base font-black leading-none text-slate-950">DS Plomberie</span>
              <span className="text-[11px] font-bold leading-normal text-slate-500 mt-0.5 tracking-wide">ÉLECTRICITÉ</span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-8">
            <a href="#about" className="text-sm font-medium text-slate-600 hover:text-sky-600 transition-colors">À Propos</a>
            <a href="#services" className="text-sm font-medium text-slate-600 hover:text-sky-600 transition-colors">Nos Services</a>
            <a href="#testimonials" className="text-sm font-medium text-slate-600 hover:text-sky-600 transition-colors">Avis Clients</a>
            <a href="#faq" className="text-sm font-medium text-slate-600 hover:text-sky-600 transition-colors">FAQ</a>
            <a href="#contact" className="text-sm font-medium text-slate-600 hover:text-sky-600 transition-colors">Contact</a>
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center gap-3">
            <a 
              href="#contact" 
              className="hidden sm:flex items-center justify-center h-10 px-5 text-sm font-medium rounded-md cursor-pointer primary-button"
            >
              Devis Gratuit
            </a>

            {/* Mobile Menu Trigger */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex md:hidden items-center justify-center size-9 rounded-md border border-slate-200 bg-white shadow-xs focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="size-5 text-slate-700" /> : <Menu className="size-5 text-slate-700" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute top-16 left-0 w-full bg-white border-b border-slate-200 shadow-xl overflow-hidden md:hidden"
            >
              <div className="flex flex-col p-6 gap-4">
                <a 
                  href="#about" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-semibold text-slate-700 hover:text-sky-600 transition-colors py-1"
                >
                  À Propos de nous
                </a>
                <a 
                  href="#services" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-semibold text-slate-700 hover:text-sky-600 transition-colors py-1"
                >
                  Nos Services
                </a>
                <a 
                  href="#testimonials" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-semibold text-slate-700 hover:text-sky-600 transition-colors py-1"
                >
                  Avis Clients
                </a>
                <a 
                  href="#faq" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-semibold text-slate-700 hover:text-sky-600 transition-colors py-1"
                >
                  Questions fréquentes (FAQ)
                </a>
                <a 
                  href="#contact" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-semibold text-slate-700 hover:text-sky-600 transition-colors py-1"
                >
                  Contact d'urgence
                </a>
                <div className="h-px bg-slate-100 my-1"></div>
                <a 
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center w-full h-11 rounded-md text-base font-medium primary-button"
                >
                  Demander un Devis Gratuit
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* 2. HERO SECTION */}
      <section 
        id="hero" 
        className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden"
      >
        <div className="flex flex-col gap-10 md:gap-14 w-content-width mx-auto relative z-10">
          
          {/* Top Avatars Counter */}
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="flex items-center gap-3 mb-1">
              <div className="flex items-center">
                <div className="relative shrink-0 overflow-hidden rounded-full border-2 border-white size-10 shadow-sm">
                  <img alt="Jean-Luc G." className="h-full w-full object-cover" src={IMAGES.avatarJeanLuc} />
                </div>
                <div className="relative shrink-0 overflow-hidden rounded-full border-2 border-white size-10 -ml-3.5 shadow-sm">
                  <img alt="Laëtitia B." className="h-full w-full object-cover" src={IMAGES.avatarLaetitia} />
                </div>
                <div className="relative shrink-0 overflow-hidden rounded-full border-2 border-white size-10 -ml-3.5 shadow-sm">
                  <img alt="Sébastien M." className="h-full w-full object-cover" src={IMAGES.avatarSebastien} />
                </div>
                <div className="relative shrink-0 overflow-hidden rounded-full border-2 border-white size-10 -ml-3.5 shadow-sm">
                  <img alt="Martine L." className="h-full w-full object-cover" src={IMAGES.avatarMartine} />
                </div>
              </div>
              <span className="text-sm font-semibold text-slate-700 bg-white px-3 py-1 rounded-full shadow-xs border border-slate-100 flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                {heroContent.badgeCount}
              </span>
            </div>

            {/* Typography Heading & Subtext */}
            <h1 className="pb-[0.1em] text-slate-900 font-display font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[1.1] md:max-w-9/10 text-balance">
              {heroContent.title} <span className="bg-gradient-to-r from-sky-600 to-cyan-500 bg-clip-text text-transparent">{heroContent.titleGradient}</span>
            </h1>

            <p className="md:max-w-7/10 text-lg md:text-xl text-slate-600 leading-relaxed text-balance font-light">
              {heroContent.subtitle}
            </p>

            {/* Hero Buttons */}
            <div className="flex flex-wrap justify-center gap-3 mt-4">
              <a href="#contact" className="flex items-center justify-center h-11 px-6 text-sm font-semibold rounded-md cursor-pointer primary-button">
                Devis Gratuit <ArrowRight className="size-4 ml-1.5" />
              </a>
              <a href="#services" className="flex items-center justify-center h-11 px-6 text-sm font-semibold rounded-md cursor-pointer secondary-button">
                Nos Services
              </a>
            </div>
          </div>

          {/* Large Aspect Card Hero Image */}
          <div className="w-full p-2.5 md:p-4 bg-white border border-slate-200/60 rounded-xl shadow-lg shadow-slate-100 overflow-hidden">
            <img 
              alt="DS Plomberie Électricité Chantiers Réalisations" 
              className="w-full object-cover rounded-lg aspect-[4/5] sm:aspect-video" 
              src={heroContent.heroImage}
            />
          </div>
        </div>
      </section>

      {/* 3. ABOUT US SECTION */}
      <section 
        id="about" 
        className="py-16 md:py-24 bg-gradient-to-b from-transparent to-slate-100/50"
      >
        <div className="flex flex-col gap-10 md:gap-14 mx-auto w-content-width">
          
          {/* Header Block */}
          <div className="flex flex-col items-center gap-2">
            <div className="px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-sky-600 bg-sky-600/10 rounded-full w-fit">
              DOUBLES COMPÉTENCES
            </div>
            <h2 className="text-slate-950 font-display font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-tight text-center leading-[1.12] text-balance">
              Un savoir-faire unique. Une écoute attentive.
            </h2>
            <p className="md:max-w-7/10 text-base md:text-lg text-slate-600 leading-relaxed text-center text-balance font-light">
              DS Plomberie Électricité intervient avec rigueur technique et disponibilité. Nous mettons un point d'honneur à allier réactivité et finitions parfaites pour sécuriser et valoriser votre habitat.
            </p>
          </div>

          {/* About Split Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-10 gap-6 items-stretch">
            {/* Left Pillar Cards (About Points list) */}
            <div className="md:col-span-4 flex flex-col justify-between gap-6 p-6 md:p-8 bg-white border border-slate-200/50 rounded-xl shadow-sm">
              
              {/* Feature Point 1 */}
              <div className="flex gap-4 items-start">
                <div className="flex items-center justify-center shrink-0 mt-1 size-10 bg-sky-600 text-white rounded-lg shadow-md shadow-sky-600/20">
                  <Shield className="size-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 font-display">Agréé &amp; Assuré</h3>
                  <p className="text-sm text-slate-600 mt-1 leading-relaxed">Responsabilité civile professionnelle et garantie décennale sur tous vos chantiers.</p>
                </div>
              </div>

              <div className="border-b border-dashed border-slate-100"></div>

              {/* Feature Point 2 */}
              <div className="flex gap-4 items-start">
                <div className="flex items-center justify-center shrink-0 mt-1 size-10 bg-sky-600 text-white rounded-lg shadow-md shadow-sky-600/20">
                  <Wrench className="size-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 font-display">Garantie Décennale</h3>
                  <p className="text-sm text-slate-600 mt-1 leading-relaxed">Sérénité absolue avec des équipements robustes, certifiés et garantis pendant 10 ans.</p>
                </div>
              </div>

              <div className="border-b border-dashed border-slate-100"></div>

              {/* Feature Point 3 */}
              <div className="flex gap-4 items-start">
                <div className="flex items-center justify-center shrink-0 mt-1 size-10 bg-sky-600 text-white rounded-lg shadow-md shadow-sky-600/20">
                  <Search className="size-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 font-display">Devis &amp; Conseils Gratuits</h3>
                  <p className="text-sm text-slate-600 mt-1 leading-relaxed">Évaluation sur-mesure de vos projets, tarification transparente et diagnostic objectif.</p>
                </div>
              </div>

            </div>

            {/* Right Pillar Cover Card */}
            <div className="md:col-span-6 relative rounded-xl border border-slate-200/50 overflow-hidden shadow-sm h-[320px] md:h-auto min-h-[300px]">
              <img 
                alt="Notre camion de service DS Plomberie Électricité à Saint-Malo" 
                className="w-full h-full object-cover" 
                src={IMAGES.heroAbout} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent"></div>
              
              {/* Overlay Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/95 backdrop-blur-md rounded-lg shadow-lg border border-slate-100/50 flex items-center gap-3 max-w-[280px]">
                <div className="p-2.5 rounded-full bg-emerald-50 text-emerald-600">
                  <ThumbsUp className="size-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Qualité Garantie</p>
                  <p className="text-sm font-bold text-slate-900">Artisan RGE &amp; Certifié</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SERVICES SECTION (Premium Hover Slide Up effect) */}
      <section 
        id="services" 
        className="py-16 md:py-24"
      >
        <div className="flex flex-col gap-10 md:gap-14">
          
          {/* Header block */}
          <div className="flex flex-col items-center w-content-width mx-auto gap-2">
            <div className="px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-sky-600 bg-sky-600/10 rounded-full w-fit">
              Nos Prestations
            </div>
            <h2 className="text-slate-950 font-display font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-tight text-center leading-[1.15] text-balance">
              Solutions Électricité &amp; Plomberie
            </h2>
            <p className="md:max-w-7/10 text-base md:text-lg text-slate-600 leading-relaxed text-center text-balance font-light">
              De l'installation neuve au dépannage urgent 24h/24 et 7j/7, nous couvrons tous vos besoins.
            </p>
          </div>

          {/* Desktop Grid Layout (2xl) */}
          <div className="hidden 2xl:grid grid-cols-4 gap-6 mx-auto w-content-width">
            {services.map((srv) => (
              <div 
                key={srv.id}
                className="group relative overflow-hidden aspect-[6/7] rounded-xl border border-slate-200/50 shadow-md transform transition-transform duration-300 hover:-translate-y-1.5"
              >
                {/* Background Image */}
                <img 
                  alt={srv.title} 
                  className="w-full h-full object-cover rounded-xl absolute inset-0" 
                  src={srv.image} 
                />
                
                {/* Visual Black Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent z-10"></div>

                {/* Flip Indicator Pill Block */}
                <div className="absolute top-5 left-5 z-20 perspective-1000">
                  <div className="relative size-8 transform-3d transition-transform duration-500 group-hover:rotate-y-180">
                    {/* Front: Step Number */}
                    <div className="absolute inset-0 flex items-center justify-center text-sm font-bold rounded-lg bg-white/95 backdrop-blur-md backface-hidden text-slate-900 border border-slate-100 shadow-sm">
                      <p>{srv.id}</p>
                    </div>
                    {/* Back: Info Icon */}
                    <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-sky-600 text-white backface-hidden rotate-y-180 shadow-md">
                      <Info className="size-4" />
                    </div>
                  </div>
                </div>

                {/* Interactive Dynamic Text Slider Container */}
                <div className="absolute inset-x-2.5 bottom-2.5 z-20 overflow-hidden rounded-lg">
                  <div className="relative flex flex-col gap-1 p-4 transition-all duration-400">
                    
                    {/* Slide up Container panel background */}
                    <div className="absolute inset-0 -z-10 bg-white/95 backdrop-blur-md rounded-lg translate-y-full opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 border border-slate-100 shadow-xl"></div>
                    
                    {/* Title */}
                    <h3 className="text-xl font-bold font-display text-white transition-colors duration-400 group-hover:text-slate-900">
                      {srv.title}
                    </h3>
                    
                    {/* Drop Description block */}
                    <div className="grid grid-rows-[0fr] transition-all duration-400 ease-out group-hover:grid-rows-[1fr]">
                      <p className="overflow-hidden text-xs leading-relaxed text-slate-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pt-1.5 border-t border-slate-100 mt-1.5">
                        {srv.desc}
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>

          {/* Smaller Screen Slider Interface (Under 2xl) */}
          <div className="flex flex-col gap-6 w-full overflow-hidden 2xl:hidden">
            {/* Scrollable Container */}
            <div 
              ref={servicesScrollRef}
              className="flex gap-5 overflow-x-auto pb-6 pt-2 scrollbar-none snap-x snap-mandatory scroll-smooth"
              style={{ paddingLeft: '4%', paddingRight: '4%' }}
            >
              {services.map((srv) => (
                <div 
                  key={srv.id}
                  className="shrink-0 w-[290px] sm:w-[325px] snap-start relative overflow-hidden aspect-[6/7] rounded-xl border border-slate-200/50 shadow-md group"
                >
                  {/* Background Image */}
                  <img 
                    alt={srv.title} 
                    className="w-full h-full object-cover rounded-xl absolute inset-0" 
                    src={srv.image} 
                  />
                  
                  {/* Visual Black Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent z-10"></div>

                  {/* Flip Indicator Pill Block */}
                  <div className="absolute top-5 left-5 z-20 perspective-1000">
                    <div className="relative size-8 transform-3d transition-transform duration-500 hover:rotate-y-180">
                      <div className="absolute inset-0 flex items-center justify-center text-sm font-bold rounded-lg bg-white/95 backface-hidden text-slate-900 border border-slate-100">
                        <p>{srv.id}</p>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-sky-600 text-white backface-hidden rotate-y-180">
                        <Info className="size-4" />
                      </div>
                    </div>
                  </div>

                  {/* Mobile Simple description overlay container */}
                  <div className="absolute inset-x-3 bottom-3 z-20 rounded-lg bg-white/95 backdrop-blur-md p-4 border border-slate-100/50 shadow-lg">
                    <h3 className="text-lg font-bold font-display text-slate-900">
                      {srv.title}
                    </h3>
                    <p className="text-xs leading-relaxed text-slate-600 mt-1.5 pt-1.5 border-t border-slate-100">
                      {srv.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Slider Navigation Dots and Controls */}
            <div className="flex items-center justify-between w-content-width mx-auto pb-2">
              <div className="flex gap-1.5 items-center">
                <span className="h-1.5 w-6 rounded-full bg-sky-600"></span>
                <span className="h-1.5 w-1.5 rounded-full bg-slate-300"></span>
                <span className="h-1.5 w-1.5 rounded-full bg-slate-300"></span>
              </div>

              <div className="flex items-center gap-2">
                <button 
                  onClick={() => handleScrollRef(servicesScrollRef, 'left')}
                  className="flex items-center justify-center size-9 bg-white border border-slate-200 text-slate-700 hover:bg-sky-600 hover:text-white hover:border-sky-600 rounded-md shadow-xs transition-colors cursor-pointer"
                  aria-label="Previous service"
                >
                  <ChevronLeft className="size-4" />
                </button>
                <button 
                  onClick={() => handleScrollRef(servicesScrollRef, 'right')}
                  className="flex items-center justify-center size-9 bg-white border border-slate-200 text-slate-700 hover:bg-sky-600 hover:text-white hover:border-sky-600 rounded-md shadow-xs transition-colors cursor-pointer"
                  aria-label="Next service"
                >
                  <ChevronRight className="size-4" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 5. METRICS SECTION (Our Track Record) */}
      <section 
        id="metrics" 
        className="py-16 md:py-24 bg-gradient-to-b from-slate-100/80 to-transparent"
      >
        <div className="flex flex-col gap-10 md:gap-14 w-content-width mx-auto">
          
          {/* Header Block */}
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-sky-600 bg-sky-600/10 rounded-full w-fit">
              Notre Sérieux
            </div>
            <h2 className="text-slate-950 font-display font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.12] text-balance">
              Le professionnalisme au quotidien
            </h2>
            <p className="md:max-w-7/10 text-base md:text-lg text-slate-600 leading-relaxed text-balance font-light">
              Des centaines d'interventions réussies auprès de clients particuliers et professionnels en Ille-et-Vilaine.
            </p>
          </div>

          {/* Metrics Layout grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-[1000px] mx-auto w-full">
            
            {/* Metric Cell 1 */}
            <div className="grid grid-cols-2 gap-4 items-stretch">
              <div className="flex flex-col justify-between gap-4 p-5 sm:p-7 bg-white border border-slate-200/50 rounded-xl shadow-xs aspect-square">
                <span className="text-4xl sm:text-5xl md:text-6xl font-black font-display text-sky-600 tracking-tight">500+</span>
                <div className="flex flex-col gap-2 min-w-0">
                  <span className="text-md sm:text-lg font-bold text-slate-900 font-display leading-tight truncate">Interventions réalisées</span>
                  <div className="w-full h-px bg-slate-100"></div>
                  <p className="text-xs text-slate-500 leading-relaxed">Dépannages d'urgence, rénovations et installations conformes.</p>
                </div>
              </div>
              <div className="rounded-xl border border-slate-200/50 overflow-hidden shadow-xs aspect-square">
                <img alt="Rénovation haut de gamme d'une salle de bain moderne" className="w-full h-full object-cover" src={IMAGES.completed} />
              </div>
            </div>

            {/* Metric Cell 2 */}
            <div className="grid grid-cols-2 gap-4 items-stretch">
              <div className="flex flex-col justify-between gap-4 p-5 sm:p-7 bg-white border border-slate-200/50 rounded-xl shadow-xs aspect-square">
                <span className="text-4xl sm:text-5xl md:text-6xl font-black font-display text-sky-600 tracking-tight">10+ Années</span>
                <div className="flex flex-col gap-2 min-w-0">
                  <span className="text-md sm:text-lg font-bold text-slate-900 font-display leading-tight truncate">D'Expérience</span>
                  <div className="w-full h-px bg-slate-100"></div>
                  <p className="text-xs text-slate-500 leading-relaxed">Une parfaite expertise et maîtrise des techniques réglementaires françaises.</p>
                </div>
              </div>
              <div className="rounded-xl border border-slate-200/50 overflow-hidden shadow-xs aspect-square">
                <img alt="Travaux d'électricité générale et de raccordement conformes" className="w-full h-full object-cover" src={IMAGES.yearsExperience} />
              </div>
            </div>

            {/* Metric Cell 3 (Sized column spanning) */}
            <div className="grid grid-cols-2 gap-4 items-stretch md:col-span-2">
              <div className="flex flex-col justify-between gap-4 p-5 sm:p-8 bg-white border border-slate-200/50 rounded-xl shadow-xs aspect-square md:aspect-[2.1/1]">
                <span className="text-4xl sm:text-5xl md:text-6xl font-black font-display text-sky-600 tracking-tight">99%</span>
                <div className="flex flex-col gap-2 min-w-0">
                  <span className="text-md sm:text-lg font-bold text-slate-900 font-display leading-tight">Satisfaction positive</span>
                  <div className="w-full h-px bg-slate-100"></div>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-[340px]">
                    La transparence de nos prix, notre ponctualité et la propreté méticuleuse de nos fins de chantiers fidélisent nos clients.
                  </p>
                </div>
              </div>
              <div className="rounded-xl border border-slate-200/50 overflow-hidden shadow-xs aspect-square md:aspect-[2.1/1]">
                <img alt="Salle d'eau moderne rénovée et livrée avec soin" className="w-full h-full object-cover" src={IMAGES.satisfaction} />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. HOW WE WORK (Step-by-step Process Section) */}
      <section 
        id="process" 
        className="py-16 md:py-24"
      >
        <div className="flex flex-col gap-10 md:gap-14">
          
          {/* Header block */}
          <div className="flex flex-col items-center w-content-width mx-auto gap-2 text-center">
            <div className="px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-sky-600 bg-sky-600/10 rounded-full w-fit">
              Notre Méthode
            </div>
            <h2 className="text-slate-950 font-display font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.12] text-balance">
              Un Accompagnement en 3 Étapes
            </h2>
            <p className="md:max-w-7/10 text-base md:text-lg text-slate-600 leading-relaxed text-balance font-light">
              De votre premier appel à la livraison finale du chantier, nous assurons un parcours simple et serein.
            </p>
          </div>

          <div className="flex flex-col w-content-width mx-auto gap-6 sm:gap-8">
            
            {/* Step 1: Free Inspection */}
            <div className="flex flex-col md:grid md:grid-cols-2 mx-auto gap-6 md:gap-14 p-6 md:p-8 bg-white border border-slate-200/50 rounded-xl group hover:shadow-lg transition-shadow">
              <div className="flex flex-col justify-between gap-4 md:py-4">
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-bold text-sky-600 tracking-wider font-display bg-sky-50 px-2.5 py-1 rounded-md w-fit">ÉTAPE 01</span>
                  <h3 className="text-3xl sm:text-4xl font-extrabold font-display leading-tight text-slate-900">
                    Diagnostic précis &amp; Écoute
                  </h3>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 text-xs text-slate-500 bg-slate-50 border border-slate-100 rounded-full">Rendez-vous rapide</span>
                    <span className="px-3 py-1 text-xs text-slate-500 bg-slate-50 border border-slate-100 rounded-full">Conseils éclairés</span>
                    <span className="px-3 py-1 text-xs text-slate-500 bg-slate-50 border border-slate-100 rounded-full">Visite gratuite</span>
                  </div>
                  <p className="text-sm sm:text-base leading-relaxed text-slate-600 font-light">
                    Qu'il s'agisse d'un projet de salle de bain ou d'un réseau électrique vétuste, nous nous déplaçons rapidement. Nous réalisons un état des lieux rigoureux de vos réseaux sanitaires et électriques pour vous proposer la solution optimale.
                  </p>
                </div>
              </div>
              <div className="aspect-[5/4] rounded-lg overflow-hidden border border-slate-100 shadow-xs max-h-[300px]">
                <img 
                  alt="Analyse technique d'une installation de plomberie" 
                  className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105" 
                  src={IMAGES.process1} 
                />
              </div>
            </div>

            {/* Step 2: Custom Proposal */}
            <div className="flex flex-col md:grid md:grid-cols-2 mx-auto gap-6 md:gap-14 p-6 md:p-8 bg-white border border-slate-200/50 rounded-xl group hover:shadow-lg transition-shadow">
              <div className="flex flex-col justify-between gap-4 md:py-4">
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-bold text-sky-600 tracking-wider font-display bg-sky-50 px-2.5 py-1 rounded-md w-fit">ÉTAPE 02</span>
                  <h3 className="text-3xl sm:text-4xl font-extrabold font-display leading-tight text-slate-900">
                    Devis gratuit transparent
                  </h3>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 text-xs text-slate-500 bg-slate-50 border border-slate-100 rounded-full">Sélection de matériaux</span>
                    <span className="px-3 py-1 text-xs text-slate-500 bg-slate-50 border border-slate-100 rounded-full">Prix ultra-clairs</span>
                    <span className="px-3 py-1 text-xs text-slate-500 bg-slate-50 border border-slate-100 rounded-full">Sans aucun engagement</span>
                  </div>
                  <p className="text-sm sm:text-base leading-relaxed text-slate-600 font-light">
                    Vous recevez sous 24 à 48 heures une proposition chiffrée avec exactitude par poste. Aucun coût caché ni mauvaise surprise à la facturation. Vous choisissez vos équipements (chauffe-eau, appareillages, robinetterie) conseillés par nos soins.
                  </p>
                </div>
              </div>
              <div className="aspect-[5/4] rounded-lg overflow-hidden border border-slate-100 shadow-xs max-h-[300px]">
                <img 
                  alt="Rédaction d'une étude de devis pour électricité et plomberie" 
                  className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105" 
                  src={IMAGES.process2} 
                />
              </div>
            </div>

            {/* Step 3: Expert Installation */}
            <div className="flex flex-col md:grid md:grid-cols-2 mx-auto gap-6 md:gap-14 p-6 md:p-8 bg-white border border-slate-200/50 rounded-xl group hover:shadow-lg transition-shadow">
              <div className="flex flex-col justify-between gap-4 md:py-4">
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-bold text-sky-600 tracking-wider font-display bg-sky-50 px-2.5 py-1 rounded-md w-fit">ÉTAPE 03</span>
                  <h3 className="text-3xl sm:text-4xl font-extrabold font-display leading-tight text-slate-900">
                    Mise en œuvre &amp; Finitions
                  </h3>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 text-xs text-slate-500 bg-slate-50 border border-slate-100 rounded-full">Normes de sécurité</span>
                    <span className="px-3 py-1 text-xs text-slate-500 bg-slate-50 border border-slate-100 rounded-full">Matériaux professionnels</span>
                    <span className="px-3 py-1 text-xs text-slate-500 bg-slate-50 border border-slate-100 rounded-full">Nettoyage impeccable</span>
                  </div>
                  <p className="text-sm sm:text-base leading-relaxed text-slate-600 font-light">
                    Notre équipe qualifiée effectue les raccordements et rhabillages avec soin esthétique. Toutes nos opérations électriques sont validées conformes à la norme NF C 15-100, et nous nettoyons intégralement le chantier après travaux.
                  </p>
                </div>
              </div>
              <div className="aspect-[5/4] rounded-lg overflow-hidden border border-slate-100 shadow-xs max-h-[300px]">
                <img 
                  alt="Réalisation soignée des conduits et câbles électriques conformes" 
                  className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105" 
                  src={IMAGES.process3} 
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. TESTIMONIALS SECTION */}
      <section 
        id="testimonials" 
        className="py-16 md:py-24 bg-gradient-to-b from-transparent to-slate-100/60"
      >
        <div className="flex flex-col gap-10 md:gap-14">
          
          {/* Header block */}
          <div className="flex flex-col items-center gap-2 w-content-width mx-auto text-center">
            <div className="px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-sky-600 bg-sky-600/10 rounded-full w-fit">
              Témoignages
            </div>
            <h2 className="text-slate-950 font-display font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.15] text-balance text-center">
              Ce que disent nos clients
            </h2>
            <p className="md:max-w-7/10 text-base md:text-lg text-slate-600 leading-relaxed text-balance text-center mx-auto font-light">
              Notre récompense réside dans la fidélité de nos clients. Découvrez leurs témoignages suite à nos interventions.
            </p>
          </div>

          {/* Desktop Grid Layout (2xl) */}
          <div className="hidden 2xl:grid grid-cols-4 gap-6 mx-auto w-content-width">
            {testimonials.map((t, idx) => (
              <div 
                key={idx} 
                className="relative aspect-[3/4] rounded-xl overflow-hidden border border-slate-200/40 shadow-sm group hover:shadow-md transition-shadow"
              >
                {/* Visual Avatar Cover */}
                <img alt={t.name} className="w-full h-full object-cover rounded-xl" src={t.avatar} />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent z-10"></div>
                
                {/* Floating Content Card */}
                <div className="absolute inset-x-4 bottom-4 z-20 flex flex-col gap-2 p-4 sm:p-5 bg-white/95 backdrop-blur-sm rounded-lg border border-slate-100/40 shadow-lg">
                  <div className="flex gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="size-4 text-amber-500 fill-amber-500" />
                    ))}
                  </div>

                  <span className="text-lg font-bold font-display text-slate-900 truncate">
                    {t.name}
                  </span>
                  
                  <p className="text-[11px] leading-relaxed text-slate-600 line-clamp-3">
                    "{t.text}"
                  </p>

                  <div className="text-[11px] font-semibold text-slate-400 mt-1 border-t border-slate-50 pt-1.5 flex justify-between">
                    <span>{t.role}</span>
                    <span className="text-sky-600">{t.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Swiper Layout Grid (Under 2xl) */}
          <div className="flex flex-col gap-6 w-full overflow-hidden 2xl:hidden">
            {/* Scrollable container */}
            <div 
              ref={testimonialsScrollRef}
              className="flex gap-5 overflow-x-auto pb-6 pt-2 scrollbar-none snap-x snap-mandatory scroll-smooth"
              style={{ paddingLeft: '4%', paddingRight: '4%' }}
            >
              {testimonials.map((t, idx) => (
                <div 
                  key={idx}
                  className="shrink-0 w-[290px] sm:w-[320px] snap-start relative aspect-[3/4] rounded-xl overflow-hidden border border-slate-100/50 shadow-md"
                >
                  <img alt={t.name} className="w-full h-full object-cover rounded-xl" src={t.avatar} />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent z-10"></div>

                  {/* Feedback Card */}
                  <div className="absolute inset-x-3 bottom-3 z-20 flex flex-col gap-1.5 p-4 bg-white/95 backdrop-blur-sm rounded-lg border border-slate-100/40 shadow-lg">
                    <div className="flex gap-0.5 mb-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="size-3.5 text-amber-500 fill-amber-500" />
                      ))}
                    </div>

                    <span className="text-md font-bold font-display text-slate-900 truncate">
                      {t.name}
                    </span>

                    <p className="text-[10px] leading-relaxed text-slate-600 line-clamp-4">
                      "{t.text}"
                    </p>

                    <div className="text-[10px] text-slate-400 mt-1 pt-1.5 border-t border-slate-100 flex justify-between font-semibold">
                      <span>{t.role}</span>
                      <span className="text-sky-600">{t.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Slider Dots & Indicators */}
            <div className="flex items-center justify-between w-content-width mx-auto pb-2">
              <div className="flex gap-1.5 items-center">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-300"></span>
                <span className="h-1.5 w-6 rounded-full bg-sky-600"></span>
                <span className="h-1.5 w-1.5 rounded-full bg-slate-300"></span>
                <span className="h-1.5 w-1.5 rounded-full bg-slate-300"></span>
              </div>

              <div className="flex items-center gap-2">
                <button 
                  onClick={() => handleScrollRef(testimonialsScrollRef, 'left')}
                  className="flex items-center justify-center size-9 bg-white border border-slate-200 text-slate-700 hover:bg-sky-600 hover:text-white hover:border-sky-600 rounded-md shadow-xs transition-colors cursor-pointer"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="size-4" />
                </button>
                <button 
                  onClick={() => handleScrollRef(testimonialsScrollRef, 'right')}
                  className="flex items-center justify-center size-9 bg-white border border-slate-200 text-slate-700 hover:bg-sky-600 hover:text-white hover:border-sky-600 rounded-md shadow-xs transition-colors cursor-pointer"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="size-4" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 8. FAQ ACCORDION PANEL */}
      <section 
        id="faq" 
        className="py-16 md:py-24"
      >
        <div className="w-content-width mx-auto flex flex-col gap-10 md:gap-14">
          
          {/* Header block */}
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-sky-600 bg-sky-600/10 rounded-full w-fit">
              FAQ
            </div>
            <h2 className="text-slate-950 font-display font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.12]">
              Questions Fréquentes
            </h2>
            <p className="md:max-w-7/10 text-base md:text-lg text-slate-600 leading-relaxed font-light">
              Retrouvez toutes les réponses concernant nos devis gratuits, nos normes de conformité et de dépannage électricité et plomberie.
            </p>
          </div>

          <div className="max-w-[880px] mx-auto w-full p-6 md:p-8 bg-white border border-slate-200/50 rounded-xl shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Left Column FAQs */}
              <div className="flex flex-col gap-4">
                {faqs.slice(0, 3).map((faq) => {
                  const isOpen = activeFaq === faq.id;
                  return (
                    <div 
                      key={faq.id}
                      onClick={() => setActiveFaq(isOpen ? null : faq.id)}
                      className="p-4 sm:p-5 rounded-lg border border-slate-100 hover:border-slate-200 bg-slate-50/50 hover:bg-white cursor-pointer select-none transition-all"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="text-sm sm:text-base font-bold text-slate-950 font-display leading-tight">
                          {faq.question}
                        </h3>
                        <div className={`flex shrink-0 items-center justify-center size-8 rounded-md transition-all ${
                          isOpen ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20' : 'bg-slate-200/70 text-slate-700'
                        }`}>
                          {isOpen ? <Minus className="size-4" /> : <Plus className="size-4" />}
                        </div>
                      </div>

                      {/* Expandable answer */}
                      <div className={`grid transition-all duration-300 ease-in-out ${
                        isOpen ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'
                      }`}>
                        <div className="overflow-hidden">
                          <p className="text-xs sm:text-sm leading-relaxed text-slate-600 font-light border-t border-slate-100 pt-3">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Right Column FAQs */}
              <div className="flex flex-col gap-4">
                {faqs.slice(3, 6).map((faq) => {
                  const isOpen = activeFaq === faq.id;
                  return (
                    <div 
                      key={faq.id}
                      onClick={() => setActiveFaq(isOpen ? null : faq.id)}
                      className="p-4 sm:p-5 rounded-lg border border-slate-100 hover:border-slate-200 bg-slate-50/50 hover:bg-white cursor-pointer select-none transition-all"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="text-sm sm:text-base font-bold text-slate-950 font-display leading-tight">
                          {faq.question}
                        </h3>
                        <div className={`flex shrink-0 items-center justify-center size-8 rounded-md transition-all ${
                          isOpen ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20' : 'bg-slate-200/70 text-slate-700'
                        }`}>
                          {isOpen ? <Minus className="size-4" /> : <Plus className="size-4" />}
                        </div>
                      </div>

                      {/* Expandable answer */}
                      <div className={`grid transition-all duration-300 ease-in-out ${
                        isOpen ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'
                      }`}>
                        <div className="overflow-hidden">
                          <p className="text-xs sm:text-sm leading-relaxed text-slate-600 font-light border-t border-slate-100 pt-3">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 9. CONTACT FORM SECTION (With rich feedback alerts) */}
      <section 
        id="contact" 
        className="py-16 md:py-24 bg-gradient-to-t from-slate-100/50 to-transparent"
      >
        <div className="w-content-width mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch max-w-[1100px] mx-auto">
            
            {/* Left Column Details / Interactive Form */}
            <div className="p-6 sm:p-10 bg-white border border-slate-200/50 rounded-xl shadow-md">
              {/* FormSubmit — remplace l'email ci-dessous par l'adresse du client */}
              {/* La première soumission envoie un email de confirmation à activer */}
              <form
                method="POST"
                action={`https://formsubmit.co/${contact.email}`}
                className="flex flex-col gap-6"
              >
                {/* FormSubmit config */}
                <input type="hidden" name="_next" value="https://VOTRE-SITE.netlify.app/merci.html" />
                <input type="hidden" name="_subject" value="Nouveau devis — DS Plomberie Électricité" />
                <input type="hidden" name="_template" value="table" />
                <input type="hidden" name="_captcha" value="false" />
                <input type="text" name="_honey" style={{ display: 'none' }} />

                {/* Header elements */}
                <div className="flex flex-col items-center gap-2 text-center md:items-start md:text-left">
                  <div className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-sky-600 bg-sky-600/10 rounded-full w-fit">
                    Contactez-nous
                  </div>
                  <h2 className="text-slate-900 font-display font-black text-3xl sm:text-4xl tracking-tight leading-[1.12]">
                    Demandez votre devis gratuit
                  </h2>
                  <p className="text-sm sm:text-base leading-relaxed text-slate-600 font-light">
                    Remplissez notre formulaire rapide pour obtenir une estimation détaillée et personnalisée de vos travaux sous 24h.
                  </p>
                </div>

                <div className="flex flex-col gap-3.5">
                  <div className="relative">
                    <input
                      name="name"
                      placeholder="Votre Nom & Prénom"
                      required
                      aria-label="Votre Nom"
                      type="text"
                      className="w-full px-4 py-3 text-sm sm:text-base text-slate-900 bg-slate-50 border border-slate-200 placeholder:text-slate-400 focus:outline-none hover:bg-white focus:bg-white focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 rounded-lg transition-all"
                    />
                  </div>
                  <div className="relative">
                    <input
                      name="email"
                      placeholder="Votre Adresse Email"
                      required
                      aria-label="Votre Email"
                      type="email"
                      className="w-full px-4 py-3 text-sm sm:text-base text-slate-900 bg-slate-50 border border-slate-200 placeholder:text-slate-400 focus:outline-none hover:bg-white focus:bg-white focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 rounded-lg transition-all"
                    />
                  </div>
                  <div className="relative">
                    <input
                      name="phone"
                      placeholder="Votre Numéro de Téléphone"
                      aria-label="Votre Téléphone"
                      type="tel"
                      className="w-full px-4 py-3 text-sm sm:text-base text-slate-900 bg-slate-50 border border-slate-200 placeholder:text-slate-400 focus:outline-none hover:bg-white focus:bg-white focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 rounded-lg transition-all"
                    />
                  </div>
                  <div className="relative">
                    <textarea
                      name="message"
                      placeholder="Décrivez votre besoin (rénovation de salle de bain, tableau électrique, recherche de fuite, dépannage...)"
                      required
                      rows={4}
                      aria-label="Décrivez votre besoin..."
                      className="w-full px-4 py-3 text-sm sm:text-base text-slate-900 bg-slate-50 border border-slate-200 placeholder:text-slate-400 focus:outline-none hover:bg-white focus:bg-white resize-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 rounded-lg transition-all"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="flex items-center justify-center w-full h-11 px-6 text-sm font-semibold text-white primary-button rounded-lg cursor-pointer uppercase tracking-wider"
                  >
                    Demander mon devis gratuit
                  </button>
                </div>
              </form>
            </div>

            {/* Right Column Cover visual Card */}
            <div className="hidden md:block relative rounded-xl border border-slate-200/50 overflow-hidden shadow-md h-full">
              <img
                alt="Travaux soignés de plomberie et d'électricité"
                className="w-full h-full object-cover rounded-xl"
                src={contact.contactImage}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent"></div>
              
              {/* Contact direct overlays for instant reach out */}
              <div className="absolute bottom-8 left-8 right-8 flex flex-col gap-4 text-white z-20">
                <div className="flex gap-3 items-center">
                  <div className="p-2 bg-white/10 backdrop-blur-md rounded-lg">
                    <Phone className="size-5 text-sky-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-300 font-medium leading-none">Ligne Directe</p>
                    <p className="text-base font-bold font-display mt-1">{contact.phone}</p>
                  </div>
                </div>

                <div className="flex gap-3 items-center">
                  <div className="p-2 bg-white/10 backdrop-blur-md rounded-lg">
                    <Mail className="size-5 text-sky-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-300 font-medium leading-none">Demandes Devis &amp; Infos</p>
                    <p className="text-base font-bold font-display mt-1">{contact.email}</p>
                  </div>
                </div>

                <div className="flex gap-3 items-center">
                  <div className="p-2 bg-white/10 backdrop-blur-md rounded-lg">
                    <MapPin className="size-5 text-sky-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-300 font-medium leading-none">Zone de déplacement</p>
                    <p className="text-base font-bold font-display mt-1">{contact.zone}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer 
        aria-label="Site footer" 
        className="relative bg-gradient-to-br from-slate-900 to-slate-950 text-white py-16"
      >
        <div className="w-content-width mx-auto relative z-10 flex flex-col gap-12">
          
          <div className="flex flex-col md:flex-row gap-10 md:gap-4 justify-between items-start border-b border-white/5 pb-10">
            {/* Column 1: Info and logo */}
            <div className="flex flex-col gap-4 max-w-sm">
              <h2 className="text-2.5xl font-black font-display tracking-tight text-white flex items-center gap-2.5">
                <DsLogo />
              </h2>
              <p className="text-sm leading-relaxed text-slate-400 font-light">
                Artisan qualifié en installation de plomberie, création de salle de bain sur-mesure et remises aux normes électriques à Rennes et Saint-Malo.
              </p>
              
              {/* Quick credentials badges */}
              <div className="flex gap-3 mt-1 items-center">
                <div className="text-[10px] font-bold text-slate-500 tracking-wider uppercase border border-slate-800 px-2.5 py-1 rounded-md bg-slate-900/40">
                  ★ ASSURANCE DÉCENNALE
                </div>
                <div className="text-[10px] font-bold text-slate-500 tracking-wider uppercase border border-slate-800 px-2.5 py-1 rounded-md bg-slate-900/40">
                  CERTIFIÉ CONFORME
                </div>
              </div>
            </div>

            {/* Column group */}
            <div className="w-full md:w-auto flex flex-wrap gap-y-10 md:gap-16">
              
              {/* Pillar 1: Services Links */}
              <div className="w-1/2 md:w-auto flex flex-col items-start gap-4">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none font-display">Prestations</h3>
                <a href="#services" className="text-sm text-slate-300 hover:text-white transition-colors">Création de Salle de Bain</a>
                <a href="#services" className="text-sm text-slate-300 hover:text-white transition-colors">Électricité Générale</a>
                <a href="#services" className="text-sm text-slate-300 hover:text-white transition-colors">Dépannage Plomberie</a>
                <a href="#services" className="text-sm text-slate-300 hover:text-white transition-colors">Bornes &amp; Chauffages</a>
              </div>

              {/* Pillar 2: Company Info links */}
              <div className="w-1/2 md:w-auto flex flex-col items-start gap-4 col-span-1">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none font-display">Entreprise</h3>
                <a href="#about" className="text-sm text-slate-300 hover:text-white transition-colors">À Propos</a>
                <a href="#testimonials" className="text-sm text-slate-300 hover:text-white transition-colors">Témoignages</a>
                <a href="#faq" className="text-sm text-slate-300 hover:text-white transition-colors font-display text-left font-display">Questions &amp; Réponses</a>
                <a href="#contact" className="text-sm text-slate-300 hover:text-white transition-colors">Devis gratuit</a>
              </div>

              {/* Pillar 3: Contact */}
              <div className="w-full md:w-auto flex flex-col items-start gap-4 col-span-2 md:col-span-1">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none font-display">Contact Direct</h3>
                <p className="text-sm text-slate-300 flex items-center gap-2">
                  <Phone className="size-4 text-sky-500 shrink-0" />
                  {contact.phone}
                </p>
                <p className="text-sm text-slate-300 flex items-center gap-2">
                  <Mail className="size-4 text-sky-500 shrink-0" />
                  {contact.email}
                </p>
                <p className="text-sm text-slate-300 flex items-center gap-2">
                  <MapPin className="size-4 text-sky-500 shrink-0" />
                  {contact.zone}
                </p>
              </div>

            </div>
          </div>

          {/* Sub footer blocks */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-2 text-center sm:text-left">
            <span className="text-xs text-slate-500 font-medium">
              © 2026 DS Plomberie Électricité. Tous droits réservés. Réalisation haute technicité et réactivité.
            </span>
            
            <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
              <a href="#" className="hover:text-white transition-colors">Politique de confidentialité</a>
              <span className="size-1 rounded-full bg-slate-700"></span>
              <a href="#" className="hover:text-white transition-colors">Mentions légales</a>
            </div>
          </div>

        </div>
      </footer>

      {/* 11. WEBILD FLOATING BOTTOM WATERMARK BRANDING */}
      <button 
        onClick={() => {
          const doc = document.getElementById('hero');
          if (doc) doc.scrollIntoView({ behavior: 'smooth' });
        }}
        className="fixed z-40 bottom-6 right-6 flex items-center gap-2.5 p-1.5 pr-4 rounded-full cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg text-slate-800 bg-white shadow-[0_4px_12px_rgba(15,23,42,0.08),0_1px_2px_rgba(15,23,42,0.04)] border border-slate-100"
      >
        <div className="relative flex items-center justify-center h-8 w-8 rounded-full text-white bg-gradient-to-b from-[#3d8bfa] to-[#5ba2f9] shadow-md shadow-blue-500/20">
          <ChevronUp className="size-4 text-white" />
        </div>
        <span className="flex items-center gap-1 text-sm font-bold tracking-tight text-slate-700">
          Retour en haut
        </span>
      </button>

    </div>
  );
}
