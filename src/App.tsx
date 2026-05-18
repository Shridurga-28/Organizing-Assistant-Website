import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles, Palette, LayoutGrid, Users, Flower2, Zap, Briefcase,
  Search, User, CheckCircle2, Scale, Layers, Leaf, ChevronRight,
  Share2, Mail, MapPin, Menu, X, PersonStanding, Palette as PaletteIcon
} from "lucide-react";

type PageKey = "home" | "products" | "themes" | "about";

// ─────────────────────────── THEME CONSTANTS ──────────────────────────────

const THEME_IMAGES = {
  modern: {
    main: "https://lh3.googleusercontent.com/aida-public/AB6AXuDClcv7oJ_9yY93gCc9P1coUCJ7QQ9U3ILjNWs9RihgGfCcKVYtPAJSbL-P-3YUbM3HU168AlVrwqo86b-RpiXjnRD_gb3utPf_HebgQ2j0SrLRqlC9FL2hv9UXCqWrijpYbZxW2bibF-kQT5J05u5lM8rMXw3Hks_3aFje5jPtCHvyGumKcYX6eBbElRS-jawh3ns-2iBrzygx5Pxat_60P7hhLHsW39poOPczbt_dfR6DRtBxsMSbJKFn68CoLt2pjCdE_9uyug",
    bento: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC8FfglwVVujyunT3Wgsoq70NuWKp-dFaQO0fi7hVAyK0hqAJiY119bJKH1ehXlvoGbEQutm20_yESW51kImfPdtOJtT-wU2ZTWGBKVM1lx9crQ8VDCLCjfiXmBMk1kEUIQKllpqxf8cHslUIQPBpWIgg0e4Cg7vrb5g4W888M9APjuTThcuA2c3W_MRY7_qYqECmXXfnHKg9a1nJGZY4b833ghetmDYNoFkdB3K2Sq1b48i2u9Z0Tq3yMMFUdWVIEYl4jneIcDyA",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD1qb9TjoJSb07vdzWmjVtOnw_wxg_pIR2xKOJtonzCRZAFClK7xy7JIjl41sv5ZfyjKl9Jxgd7chv62mVdqpe8ZOI-gENAa5nncIp5P_xkaMKd3bbbsKM4lzpf1CNBZJIYpnbHbwumj_swAbpR50paPAshvRYTiSxAoTqLu0p-iWoWgqzHXVAKquo5yd3CkNAocYzYLdfoUatqXr5DM8UvCz-I5Tum7fbUyJ5XUJ3aPeEFJKxdDbixRIa_vBmLin5IGGE4in9wGg",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBpQPP_rR6iSnZ_pt61UjBL2yf43CZMo_F1UXjO0SBUffTEgMGuUf0dzFN8ix5xx4V7wrnE_krXUDR-3HhXhSCYztXz84h_464zmq3So_QTkLng2I-lvnfVZDjyU3u7cgZdihlO6KcRX87wkUdBxY1CkhNbISzVyGPLyjwqfwbRJpyf09fxeKVth8AEvz4Ep4kJ2S1hJ-MUi775MggzGAweFIaGYHU22a5ZWv0fbiM8y5UT7t3NNNRQBiz40AuP9AF7ImDbYy9mow",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA8BqWYBHgGxKnPSSSfU8UW57kkmqBnQ3Lp0k7C8Bm2Dxnmx2NQimTFzUp4fsosPiakLENGHW0DX8EtyNiUE4Yli5lyG-LSCKwgCRNBEAX0kehEQW3hKrxDFAGLEtv9Ow-FXXO3ArQka3-0lKYXuvb5NMkte5JoYedJBo2CItubzRSzHRgXHz0Qbj5C9V_NFgIFQUoL-gJD5yDQF8PdeoCWQJ6dDMXDlJzZingnJwxlLBjkymGTPruweJ7n1MT0_dyRiyHWOehFyA",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAU9gPq_eECYwjli3Rz_zgNprSzeKlIr1xtK86qWtWgx3nUtqmY44jXGOFjJ3_qp9XZHJNCNtDBTeYFOruz0V1tyiRW3FBhcOGm7ODMPsgNktqyBcq3NI26OhDMZAQvl0ODSNaQouP4KXT7uY-G3eHAWBHJeOwnnFFIiBWycv_Uyu70bdsqDI7No88Q8URY_pb0GKYGT_X8xkzPnzETU-tCD5ccoWlfR2AYcNNRshlUEEsHE2EtLGLNDhnp7u8Ejn14CaWjbivx8w"
    ]
  },
  classic: {
    main: "https://lh3.googleusercontent.com/aida-public/AB6AXuBROTssUl7UxFjElWslNI_YJF4-Fw5kJGF2NFBQ6yGcnuo3lr9T1Qqkdvv1REedDv-KL6-9Cr0kO2AJT-b-mOK4ldXTR7QVRbvGQ9BsRoq15pRNhcS_DpGJqfBMdfGCpWbSioMsE1HX6eJVzQhcZSWFLi4ZVE1DxLmCdt8PlQOA-tsizmxYGfcixnws-RooFp2Xn1CYziqZfmVXA71jITyJEd5XjXYNxN0zTHYYSEB9dCntzFOaAER8voO5RoQgopB2yIrWsZ0mAA",
    gallery: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA6yYCBoNHysyYY9wd1ePKbMtosBv6ae8ljVmjOp-dRNMJol8guDw2xd3i1wwM4y0TVuWfxD9MgkLMGCMABK0tUxMgvYTCA0zbwdT-kWwumpo0Ip4pd9Cjhk0TMGhUHnH_68qdaWMv7hwTxwK5GfwFbkwNqw8jvcosHtUrOa27KQUg7Qjzft2Aozwvm9eIhJWi84I-jcOXi3h1bB7CtI1MNPkfjkj5fFEZHyL5y7jYBNnWIJBfJM3cnmNU_Cm8wI6-op5_TpuSROA",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAod15GAwuou0KQCUImzUDGjhNHMqz8jEOmyo9iIfFpKTOyJPBCosXQd7gXar4vz6YTsrgtPnBON2dRqgoz0M4AUFLhsuaFjitnzWkVS3Eoq0SXVL4l_okBWlbw96yqiS9Lr__I3o2omemjOjD8MXZBIg0X_A8rot6Jkj5-W0KpzQermYmptfLB1jkNhBR-kMjpAkbO9nr5hB7U53oJ56uPpoJnAnOGOQ2enxm4pqpWei33L9IzoxPIyGF87RswfT059MO9XrveFA",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB46KVe_54GonQNtBIGZcsNtjCLMdriP_hw8QmT613Io1_HsFlukQq7MQn62SPTFGWTaPRIEBSK4rCzxzhLPD2EAZFQDiZ7wYw3_F-nA9PNU6oxGvkjBSUQ2qLZKEvfwHgqoSY-7-ENFvbj3HypKphWZyrs2259YooVnVpV9KL7dd9BT1lgv3UTn17lSFGTehRvf97SFqunQU4hP6drEHIG_q2tzzX_UdXs4euMkzA2N7HwFedUEo8AkJjBUYjkMr4Bl7FiUyw1SA"
    ]
  },
  bohemian: {
    main: "https://lh3.googleusercontent.com/aida-public/AB6AXuDA5RVEQgW1Ik9y8KBDLxtR3rvITgdwi00ZjUXcZ1s-aQCEGBncl86hxcBN7OTvrE6RKJOcCy-ah59iOuTfuDAbgQZl6a-psIncBQQisXVwr2ow_Prt4Qxhy9gQSOnB8xekMwwg5sgSZRg5PagNSry_LJ5M4UIb0DOCFjE8ls6uHp1UamMW-ynAI5HNqLFY3IQIi0Iz8tC2-AQvIVMaKiv6pfp5XXv7C--DTe-dpX493tvvkgctbaKEKfW3D2LW3hX31SXbpwDnfQ",
    gallery: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDQGaL6iSKAqZDq-m6vhYrsvUSLaTBy3YNPTV5m_JDPyn0VnTfEKjhLCAu7eMZ80r9zq5aU95x4pHqxTmZGMYYTpFqV_q_UyXou4CiibQiREpaZHKHiLJ7JGhy3CEX5xQfDKI9L1KPaVDpxhKEPmtU_ozIggnpdubwsS8GuXUxqEc5rEEf0Ze3X9VLDDR8n5FyoYpJdLs9BC9uyhJxS1xwUchBMKnBYOUwd67BnTCGULUGSr0faAEFbbBCn-mdzTPbI43Z4fpV23Q",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDirFwsOZ9kzw7Bsezz_XZHJY-uhEEYnraGg-pF1oh5_DN2g10llos4XeInogpmQGSPndiWxFHAPmgCkOj5-oFLGe5AJ3MLfmixhI-WdDdCfROJ4LziUvWqAt5YhQ1NujSnugukAOc2yvKNu3hD6fp0HyqlCANuQO0wiqMFCVxJlHkU1IF6mNGqddW4zHdsIjXRHNmKPOx33OTX1rDsVsYi-JK12xExnCjQBTCO-w26n-hyRwMoXPoQvxcLiLUL0ryW8cHGk07eYA",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDkIV_2W6p8_rpP7P9Ehgaoo0wfof0leqtUxRMDNLm_C0HoysmxQQmEhBjYZfUxvIqvX_EdkYSwGfpYQJfJ50ZQpx1fLN9p2E3NSINhtp7fp7c4xNoaZJYyvBLp0nw17-MvoMOad4y74vVJyP-H1KrltZnRKpBFMDrTQ8QqGHbK5ZHVzomPEA1ACknfTsBDV3NZA323_xi897fSR7JZtuoHJisYT3u_gwefKq9_5N2qt04NBoiRckbNQc4gVGuypOoxj3ZBPWVjOg",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAx11KbfT3Vnj5QVYJjqD8MGIZw9300iNQh_S90TdNLpDv1IOGxSMXDdNWGMViVIS8xJGrIxHVRaOCKbTW0pvzH3XfPBDeaQLSlVv_3nGGxVXPtRQ45yOfjheVmNV2wbH8K0ibfTssQ-Q3UDR_uk3AhaNZI4RIjywFLOqyD6wJ_qxjmkubGPm-D8ihfZ2uJGMiFcG0n-NxgVtAwcGUa3_1hvM2LuO-PDnqijB38qlOe7D6Y9fAoYw9gNkYQvXH_tNWI1U-jY57R2A"
    ]
  }
};

const PRODUCTS = [
  { id: 1, title: "Organic Sculptural Vessel", price: "20,335", description: "A centerpiece that breathes life into any room, individually thrown by master potter Elara Vance.", category: "Ceramics", location: "Studio Vance, Portland", featured: true, aspect: "aspect-[4/5]", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAD6mHlQzChZYPis0m807zfkdmk5LR8X-Yu0yARURluwIYh3_iwMFYj_h5Fma8_dOV-B3O_ZP0Q9ofNmYw77X7BzBfG_hs0Hm0jCU6bXT2DlCHqloV6KD-ILFrBhh00ojSZPcOgSegwatG6315QQm84XKTJGLZhJpJtEguQQaPwoJlXm-lhGe1uH94yOFpEv8D6XHElsVQ-tInNGuOgynTGr0gLaeHJAzo1CATBl-v3eDP-aSLXfudC7UkW6izSPKp5y6PWguEBIA" },
  { id: 3, title: "Heritage Linen Set", price: "9,960", description: "Woven using traditional floor looms with sustainable Belgian flax.", category: "Textiles", location: "Loom & Thread Collective", aspect: "aspect-[3/4]", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuChEoKu6pRYFNyebdFy-mp03uRJ15BRF9NKUwAoyINkRKCIn9Eb1-wbjIEJjMpqRqfAawk75sSabUiZmR1q1h_z_6WZdSw52aJhv4jQOUsnu5WQskinjtkCOUCvhikKF5uo-4lp3O9CijLnrjvTYXuVgqH5Gf-YdWyzM_KknSyCUdISYien9zMxNf4edm_kx4t113voreMhnX1LjzenbGT6Hlev_iMmBor5-x6Yhfpo9TaYoZbnWwFupHiMPEdsgx-lKxWFXJaiQA" },
  { id: 5, title: "Carrara Bath Tray", price: "12,865", description: "Sculpted from a single block of Italian Carrara marble. Water resistant.", category: "Woodwork", location: "Vinci Carvings", aspect: "aspect-[4/5]", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCO-Mu3YNwQwH0lXRa31KS4GnRhLn2p9Guo7ZopISBFEKCCZ_NAW5HyPGXjDU8o66sAJeUbpP75kJ3zs7dsbhEWuJL4VaV50kah_zBk7TTm2-IBAStfpY6Cb0bDktLYRJkFhNAv1rb_oD7z5vgnnTG5J2j5oWScDhunmAHu2q_fVzus5B3fqyyZz1amwbsecJx5EJc5vzSuOCJGl96TJQcLTy1pNlc7f_4harr1kjp3PcgJsBgRVqWI9DYfJO1ZiHbdgZFRm6DfZg" },
  { id: 2, title: "Floating Oak Grid", price: "14,940", description: "Modular organization for the focused creative. Solid Japanese Oak.", category: "Woodwork", location: "Handcrafted in Kyoto", aspect: "aspect-square", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD_OaMs5ZIHZuwRno3WRyBOmd-4hvzP7qhp3LFe-LMcUg5T_IuqvXQKTTzsYutibBlhEP59hnOhUkZcsvg-Ek5MTwxTPIh6OKrQ5nmksJE98KqLtRHkmgpiAFHnRUjdGPsjX8ucoFEGqobSUCX-329o3BVZBlgs3TwbXhUZLUdNlHSrb_cBEc9VHqjHSOIYWJsYvC_JuUkujHeR55PAPoEgkcRsGRWkUv2SEOiX1mN6yC4IqhFSvEHOt42udKJv0vVQ82o4FqKNnw" },
  { id: 4, title: "Aurora Brass Lamp", price: "32,370", description: "A study in light and shadow. Smoked glass meets polished brass.", category: "Sustainable Glass", location: "Studio Lux, Berlin", aspect: "aspect-video", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC48zcvtiMm2aRI_rOasnV9uf2a1sSNsoiKYxmwQEtkWbxrgkMXFl4PQHyuG2EqfIKYsQ_rtDX5eav809YxZovMzi9v90yd2Gzz6Ge2rGOTCVNG6LsC6bIUU2kW9MTpdcO-jkiUr-E-sBpPFRJ4YUaQFbtdnB7jQq-ekju_1WA0eRq93ySNj8KTp12uVWxF31agZbDt1ugBI1zBlLbNIC9167lRPk-lNDshAb1zWRIIm1SFt9l4lWEeVQhUGKsEQkS_AlvHW7Xj-g" },
  { id: 6, title: "Foresight Tapestry", price: "17,430", description: "Textured wall art made from recycled cotton rope. Each piece unique.", category: "Textiles", location: "Knot & Fibre Studio", aspect: "aspect-square", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDA5RVEQgW1Ik9y8KBDLxtR3rvITgdwi00ZjUXcZ1s-aQCEGBncl86hxcBN7OTvrE6RKJOcCy-ah59iOuTfuDAbgQZl6a-psIncBQQisXVwr2ow_Prt4Qxhy9gQSOnB8xekMwwg5sgSZRg5PagNSry_LJ5M4UIb0DOCFjE8ls6uHp1UamMW-ynAI5HNqLFY3IQIi0Iz8tC2-AQvIVMaKiv6pfp5XXv7C--DTe-dpX493tvvkgctbaKEKfW3D2LW3hX31SXbpwDnfQ" }
];

// ─────────────────────────── SHARED COMPONENTS ────────────────────────────

function Navbar({ activePage, setPage }: { activePage: PageKey; setPage: (page: PageKey) => void }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const links = ["Home", "Products", "Themes", "About"] as const;
  const pageMap: Record<(typeof links)[number], PageKey> = { Home: "home", Products: "products", Themes: "themes", About: "about" };

  return (
    <nav className="sticky top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-stone-100 shadow-sm">
      <div className="flex justify-between items-center w-full max-w-7xl mx-auto px-6 md:px-16 h-20">
        <button
          onClick={() => setPage("home")}
          className="font-serif text-3xl font-bold tracking-tight"
          style={{ color: "var(--primary)" }}
        >
          ho'ololi
        </button>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => {
            const isActive = activePage === pageMap[link];
            return (
              <button
                key={link}
                onClick={() => setPage(pageMap[link])}
                className={`text-sm font-semibold tracking-wide transition-colors ${
                  isActive
                    ? "border-b-2 pb-0.5"
                    : "text-stone-500 hover:text-stone-800"
                }`}
                style={isActive ? { color: "var(--primary)", borderColor: "var(--primary)" } : {}}
              >
                {link}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:block text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-lg"
            style={{ background: "var(--primary)" }}
          >
            Get Started
          </motion.button>
          <button
            className="md:hidden p-2"
            style={{ color: "var(--primary)" }}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white border-b border-stone-100 px-6 py-4 flex flex-col gap-3"
        >
          {links.map((link) => (
            <button
              key={link}
              onClick={() => { setPage(pageMap[link]); setMobileOpen(false); }}
              className="text-left py-2 text-sm font-medium text-stone-600"
            >
              {link}
            </button>
          ))}
          <button
            className="text-white py-3 rounded-full font-semibold mt-1"
            style={{ background: "var(--primary)" }}
          >
            Get Started
          </button>
        </motion.div>
      )}
    </nav>
  );
}

function SharedFooter({ setPage }: { setPage: (page: PageKey) => void }) {
  return (
    <footer className="bg-stone-50 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <button
            onClick={() => setPage("home")}
            className="font-serif text-2xl font-bold mb-4 block"
            style={{ color: "var(--primary)" }}
          >
            ho'ololi
          </button>
          <p className="text-stone-500 text-sm leading-relaxed">
            Creating intentional living spaces for the modern era.
          </p>
        </div>
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "var(--primary)" }}>Navigate</h4>
          <ul className="space-y-3">
            {[["Home","home"],["Products","products"],["Themes","themes"],["About","about"]].map(([label, page]) => (
              <li key={page}>
                <button onClick={() => setPage(page as PageKey)} className="text-stone-500 hover:text-stone-800 text-sm transition-colors">{label}</button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "var(--primary)" }}>Company</h4>
          <ul className="space-y-3">
            {["Our Story", "Press Kit", "Careers"].map(item => (
              <li key={item}><a href="#" className="text-stone-500 hover:text-stone-800 text-sm transition-colors">{item}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "var(--primary)" }}>Connect</h4>
          <div className="flex gap-3 mb-6">
            {[Share2, Mail, MapPin].map((Icon, i) => (
              <a key={i} href="#" className="p-2 bg-white rounded-full border border-stone-200 text-stone-500 hover:text-white transition-all"
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--primary)'; e.currentTarget.style.borderColor = 'var(--primary)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.borderColor = '#e7e5e4'; }}
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
          <p className="text-xs text-stone-400">© {new Date().getFullYear()} ho'ololi Interior Design Studio.</p>
        </div>
      </div>
    </footer>
  );
}

// ─────────────────────────── HOME PAGE ────────────────────────────────────

function HeroSection({ setPage }: { setPage: (page: PageKey) => void }) {
  return (
    <section className="relative w-full overflow-hidden pt-12 pb-24 md:pb-32">
      <div className="max-w-7xl mx-auto px-6 md:px-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="z-10 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-6"
            style={{ background: "var(--secondary-container)", color: "var(--on-secondary-container)" }}>
            <Sparkles size={16} />
            <span>Reimagine your lifestyle</span>
          </div>
          <h1 className="font-serif text-5xl md:text-7xl leading-tight mb-6" style={{ color: "var(--on-surface)" }}>
            Transform Your <span className="italic" style={{ color: "var(--primary)" }}>Space</span>,<br />
            Find Your Peace.
          </h1>
          <p className="text-lg md:text-xl text-stone-500 max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed">
            ho'ololi brings professional interior curation and intelligent organization to your fingertips.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <motion.button whileHover={{ scale: 1.05, translateY: -2 }} whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto text-white px-8 py-4 rounded-xl text-sm font-bold shadow-lg"
              style={{ background: "var(--primary)" }}>
              Start Redesigning
            </motion.button>
            <motion.button whileHover={{ scale: 1.05, translateY: -2 }} whileTap={{ scale: 0.95 }}
              onClick={() => setPage("themes")}
              className="w-full sm:w-auto border-2 px-8 py-4 rounded-xl text-sm font-bold hover:bg-stone-50 transition-colors"
              style={{ borderColor: "var(--secondary)", color: "var(--secondary)" }}>
              View Themes
            </motion.button>
          </div>
        </motion.div>

        <div className="relative">
          <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full blur-3xl animate-pulse" style={{ background: "var(--tertiary-container)", opacity: 0.15 }} />
          <div className="absolute -bottom-12 -left-12 w-64 h-64 rounded-full blur-3xl" style={{ background: "var(--primary-container)", opacity: 0.15 }} />
          <div className="relative grid grid-cols-2 gap-4">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="space-y-4 pt-12">
              <div className="rounded-3xl overflow-hidden shadow-lg">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAk2yrOPNHJgM0Hbz7MK4LstMxb-qNzqDOBl9L2rXtK15K8oNxHdEKocIVJfXJ827ANMkCvUOqG-s0qAruwwFUQGm6OZ5PTP6N7zs-yhNsDuJ-qku9IXMSEcjTLsnWYEkHw7nQvxCL59KIAOZKOskm-ua9oN2KguoTyozZtWo8Pm5bj_W-KVqQia6rLyyaKl7SbTIn3bPi11X42RMx4FevCqRZTePTN0JfDOx6NZnn28iiubdJQveRe6zsWoGSbB8Px_pQqDkP2BA" alt="Minimalist Living" className="w-full h-64 object-cover" />
              </div>
              <div className="rounded-3xl overflow-hidden shadow-lg">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCp1q-8b8TQsmqiq3WCXG2FdV6hHe8t0RMZ_rT2VuiqTgCvRropqcBXwstM81-HLbdeGPNkZToDHqa9iWlgvcNNyza2PiK7Evo7qyw5rV0Z-w-rAtH26DgjthuvqX3DgkRjSQiEy6SNE911rTumKBGsHU6wMuwMrIf4uBhpkcZLXkRfCBzYKmcqj7egpZvY7Lb9WY5vYW4EIUyNCDVRxJAVIugOdHpgd6LG3heGo_ig3naqSekXb1i4GEJXHuVLsHts5pzTxrWb6g" alt="Kitchen" className="w-full h-48 object-cover" />
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }} className="space-y-4">
              <div className="rounded-3xl overflow-hidden shadow-lg">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCis02ieGLzwNBJegwj29TMyBg4AesFiiZQMB-yfG4D6wqoUeqVjSlRjkq14jE2mIJ_xCbiH7PaT1Ijg3ZYETinngjBzC6rxlMLI4L3tMA3Ocl0_o5rImruaYTrIgh-o1FYnWXoeI4ze2beU5g_0079d8NOgCTDbZ9pIJuvbMyazOUpUXExGvNpYBavREYf1WHWUAhvMc3exvVfKk5P5kW8HJ_YxGgweSue6uLjy0NdeIIW9DxhE7eQH9aYO-SQpAH7yDr-Rdx4Pg" alt="Bedroom" className="w-full h-48 object-cover" />
              </div>
              <div className="rounded-3xl overflow-hidden shadow-lg">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBg9ZwhiQ87S5DMCX7T_KsHmNVFyiNSCYlsbFlrArb2U9lZonc8yl49Ix2G324ejKjca6pVFRD1qK80G9k-caiqRYTLxEyto5dYzGF27e5Wuu7p7-YQcmrUHlNueT6rTDkOtGSBhf40H8upVRg-_Mhh5lN2og0eu7NLBBxXRpYLMWn3mfHo49HfLTOhKcxGwx10T-YMACQjjmjzdVTJ0lmWXYQMYSnuJu6Vz0nnTEdMfbCHdu7KqNWhnmpNSieZ2cWHzY_66VVgUQ" alt="Office" className="w-full h-64 object-cover" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PhilosophySection({ setPage }: { setPage: (page: PageKey) => void }) {
  return (
    <section className="py-24" style={{ background: "rgba(249,249,255,0.5)" }}>
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        <div className="text-center mb-16">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="font-serif text-3xl md:text-5xl mb-4" style={{ color: "var(--on-surface)" }}>
            Our Curation Philosophy
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="text-stone-500 max-w-2xl mx-auto text-lg">
            We blend aesthetic beauty with functional intelligence to create homes that don't just look good—they feel right.
          </motion.p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            className="md:col-span-3 bg-white rounded-[2rem] p-8 shadow-md border border-stone-100 flex flex-col justify-between group hover:shadow-xl transition-all">
            <div>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
                style={{ background: "rgba(159,64,45,0.12)", color: "var(--primary)" }}>
                <Palette size={24} />
              </div>
              <h3 className="font-serif text-2xl mb-3" style={{ color: "var(--on-surface)" }}>Room Redesign</h3>
              <p className="text-stone-500 mb-8 leading-relaxed">Virtual consultations and mood boards tailored to your unique style and emotional needs.</p>
            </div>
            <div className="rounded-2xl overflow-hidden h-52">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2eRPZ4qp-WV8v2e5Jr5SbDpNWzTCVuvGxBuenpxTvJCxCwqpB-tHZ5iP7X7DtpNgteYbC8lJCT_aUHRMoa2YAaXDIkrKFH0J1YOWkaOSvOVNoAN-pGdzIMaPB-C-hNTee6TC1KywSR_KIWGv9WxIE_EPuoMdJ0ekWvCsKXSHcK7KhLZBIahZPL502HOZy-Mt1KK-p0DOZbt-IMyRnLiXOEabkXgYoTRbdeFrvTRdNQB9f6SPgS5YxMgesBxgdwskQlrVzET7Xpg"
                alt="Room Curation" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="md:col-span-3 bg-white rounded-[2rem] p-8 shadow-md border border-stone-100 flex flex-col justify-between group hover:shadow-xl transition-all">
            <div>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
                style={{ background: "var(--secondary-container)", color: "var(--on-secondary-container)" }}>
                <LayoutGrid size={24} />
              </div>
              <h3 className="font-serif text-2xl mb-3" style={{ color: "var(--on-surface)" }}>Smart Organization</h3>
              <p className="text-stone-500 mb-8 leading-relaxed">Intelligent storage solutions that maximize space while maintaining a high-end visual flow.</p>
            </div>
            <div className="rounded-2xl overflow-hidden h-52">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIaGv-1XVJjMcc_ZpDLMf-RPnd6h3AStEf59aTZcaMJ_VJx1uv7xFxzzqKtXNv-nSPUi2KyMb_QmTav7plYtXLZJXO1WN8X32JdiOBttRtEC3PuDma4kAsl96q4gQLOISswDrEGTLgzB2mJMnxUpFtHMRzyf3ER6EDXqJlDl4Xh45_ZzGVKbI8GdZCUH5_aVfBxtKWSy5hwi2E9sD7mGQxJtG4ZU3gSDfwis7_4hhOPtAD1hRbIi-DXJteJ-6GVF5198a0mEt5Qg"
                alt="Smart Storage" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="md:col-span-2 rounded-[2rem] p-8 border flex flex-col items-center text-center justify-center"
            style={{ background: "rgba(118,90,5,0.05)", borderColor: "rgba(118,90,5,0.15)" }}>
            <Sparkles size={48} className="mb-6" style={{ color: "var(--tertiary)" }} />
            <h4 className="font-serif text-xl mb-2" style={{ color: "var(--on-surface)" }}>Mood Themes</h4>
            <button onClick={() => setPage("themes")} className="text-sm font-bold uppercase tracking-widest px-4 transition-opacity hover:opacity-70"
              style={{ color: "var(--tertiary)" }}>
              Explore →
            </button>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
            className="md:col-span-4 rounded-[2rem] p-8 flex flex-col md:flex-row items-center gap-8 overflow-hidden relative shadow-lg"
            style={{ background: "var(--primary)", color: "var(--on-primary)" }}>
            <div className="z-10 flex-1">
              <h4 className="font-serif text-3xl mb-3">Join the Studio</h4>
              <p className="opacity-80 text-lg mb-6 max-w-sm">Connect with 50,000+ design enthusiasts reimagining their homes daily.</p>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className="bg-white px-8 py-3 rounded-full font-bold text-sm"
                style={{ color: "var(--primary)" }}>
                Sign Up Free
              </motion.button>
            </div>
            <div className="relative shrink-0 hidden md:block">
              <Users size={180} className="opacity-10" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function MoodSwitcher() {
  type MoodId = "Calm" | "Energetic" | "Professional";
  const [activeMood, setActiveMood] = useState<MoodId>("Calm");
  const MOODS = [
    { id: "Calm", icon: Flower2 },
    { id: "Energetic", icon: Zap },
    { id: "Professional", icon: Briefcase },
  ] as const;
  const moodColor: Record<MoodId, string> = { Calm: "var(--secondary)", Energetic: "var(--primary)", Professional: "var(--tertiary)" };

  return (
    <section className="py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        <div className="bg-white rounded-[3rem] p-8 md:p-16 shadow-md border border-stone-50">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-serif text-3xl md:text-5xl mb-6" style={{ color: "var(--on-surface)" }}>The Mood Switcher</h2>
              <p className="text-lg text-stone-500 mb-12 leading-relaxed">
                Visualize your room in different "energy states" before committing. Our unique toggle adjusts colors, textures, and lighting recommendations in real-time.
              </p>
              <div className="inline-flex p-1.5 bg-stone-100 rounded-2xl mb-12 shadow-inner">
                {MOODS.map((mood) => {
                  const Icon = mood.icon;
                  const isActive = activeMood === mood.id;
                  return (
                    <button key={mood.id} onClick={() => setActiveMood(mood.id)}
                      className={`relative px-6 py-3 rounded-xl flex items-center gap-2 text-sm font-bold transition-all ${isActive ? "text-white" : "text-stone-500 hover:text-stone-800"}`}
                      style={isActive ? { background: moodColor[mood.id] } : {}}>
                      <Icon size={18} />
                      <span>{mood.id}</span>
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="relative aspect-square">
              <AnimatePresence mode="wait">
                <motion.div key={activeMood} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }} transition={{ duration: 0.4 }} className="w-full h-full">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBskmlm2axas97qpdaCWTaO6M4a5U4JYL1nsRDct2lFRXaskg0FsB9rVfzIzZ_HJmV2JluAf92NEMdyV4uWxeSpYzlVKg22nZPGUB47rIvPy6_cshpi8MaliLyNCOBN8ibV7ul4IJ9EegHtfovQsxWv_aXKIv2TWJ3GgBphoCMqqTyr_FKslxyELZ0YUi_yyXODu73YtWrDuXHyzToGYzgaL0tQPb8GIQb7zPXwwNMo6YUTCvfG2EtBvgfziBO4aKYX8HkF3hqFhw"
                    alt={`${activeMood} Mood Preview`}
                    className={`w-full h-full object-cover rounded-[2.5rem] shadow-2xl transition-all duration-700 ${
                      activeMood === "Calm" ? "sepia-[0.3] hue-rotate-[60deg] saturate-[0.8]" :
                      activeMood === "Energetic" ? "sepia-[0.2] saturate-[1.2]" : "grayscale-[0.3] contrast-[1.1]"
                    }`} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HomeCTA() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl"
          style={{ background: "var(--primary-container)", color: "var(--on-primary-container)" }}>
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" />
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white rounded-full blur-3xl" />
          </div>
          <div className="relative z-10">
            <h2 className="font-serif text-4xl md:text-7xl mb-8 leading-tight">Ready to rediscover<br />your home?</h2>
            <p className="text-lg md:text-xl max-w-2xl mx-auto mb-12 opacity-90 leading-relaxed">
              Join thousands of happy homeowners who have transformed their spaces into curated sanctuaries with ho'ololi.
            </p>
            <motion.button whileHover={{ scale: 1.05, translateY: -4 }} whileTap={{ scale: 0.95 }}
              className="bg-stone-900 text-white px-12 py-5 rounded-full font-serif text-2xl shadow-2xl hover:bg-black transition-colors">
              Get Started Now
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function HomePage({ setPage }: { setPage: (page: PageKey) => void }) {
  return (
    <div>
      <HeroSection setPage={setPage} />
      <PhilosophySection setPage={setPage} />
      <MoodSwitcher />
      <HomeCTA />
    </div>
  );
}

// ─────────────────────────── PRODUCTS PAGE ────────────────────────────────

const CATEGORIES = ["All Works", "Ceramics", "Textiles", "Woodwork", "Sustainable Glass"];

function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("All Works");
  const filtered = PRODUCTS.filter(p => activeCategory === "All Works" || p.category === activeCategory);

  return (
    <div>
      <main className="max-w-7xl mx-auto px-6 md:px-16 py-20">
        <header className="mb-16 text-center max-w-3xl mx-auto">
          <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="font-bold text-sm tracking-[0.2em] uppercase mb-4 block" style={{ color: "var(--primary)" }}>
            Handcrafted Excellence
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="font-serif text-4xl md:text-6xl mb-6 leading-tight" style={{ color: "var(--on-surface)" }}>
            The Artisan Collection
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-stone-500 text-lg">
            A curated marketplace of unique, handcrafted organization and decor items sourced directly from independent studios.
          </motion.p>
        </header>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {CATEGORIES.map((cat, i) => (
            <motion.button key={cat} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 + i * 0.05 }}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                activeCategory === cat ? "shadow-md text-white" : "bg-stone-100 text-stone-500 hover:bg-stone-200"
              }`}
              style={activeCategory === cat ? { background: "var(--primary)" } : {}}>
              {cat}
            </motion.button>
          ))}
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          <AnimatePresence>
            {filtered.map((product) => (
              <motion.div key={product.id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.4 }}
                className="break-inside-avoid group cursor-pointer">
                <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500">
                  <div className={`relative overflow-hidden ${product.aspect}`}>
                    <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={product.image} alt={product.title} referrerPolicy="no-referrer" />
                    {product.featured && (
                      <div className="absolute top-4 left-4">
                        <span className="backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                          style={{ background: "rgba(159,64,45,0.85)" }}>Featured</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2 gap-4">
                      <h3 className="font-serif text-lg leading-tight" style={{ color: "var(--on-surface)" }}>{product.title}</h3>
                      <span className="font-bold text-base shrink-0" style={{ color: "var(--primary)" }}>₹{product.price}</span>
                    </div>
                    <p className="text-stone-500 text-sm mb-4 line-clamp-2">{product.description}</p>
                    <div className="flex items-center gap-2 pt-4 border-t border-stone-100">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                        style={{ background: "var(--secondary-container)" }}>
                        <User className="w-3.5 h-3.5" style={{ color: "var(--secondary)" }} />
                      </div>
                      <span className="text-xs font-medium truncate" style={{ color: "var(--secondary)" }}>{product.location}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <motion.section initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
          className="mt-24 rounded-[2rem] p-12 md:p-16 text-center border shadow-sm"
          style={{ background: "var(--surface-container-low, #f5f5f0)", borderColor: "rgba(0,0,0,0.06)" }}>
          <h2 className="font-serif text-3xl mb-4" style={{ color: "var(--on-surface)" }}>Are you an Artisan?</h2>
          <p className="text-stone-500 text-lg mb-8 max-w-xl mx-auto">
            We are always looking for unique, high-quality products to feature in our curated collection. Join our network of independent makers.
          </p>
          <button className="text-white px-10 py-4 rounded-full font-bold hover:opacity-90 active:scale-95 transition-all duration-300 shadow-xl"
            style={{ background: "var(--secondary)" }}>
            Apply to the Marketplace
          </button>
        </motion.section>
      </main>
    </div>
  );
}

// ─────────────────────────── THEMES PAGE ──────────────────────────────────

type ThemeSectionProps = {
  id: string;
  badge: string;
  title: string;
  description: string;
  features: string[];
  mainImage?: string;
  images: string[];
  layout: "modern" | "classic" | "bohemian";
  bgColor?: string;
};

function ThemeSection({ id, badge, title, description, features, mainImage, images, layout, bgColor = "bg-white" }: ThemeSectionProps) {
  const isReverse = layout === "classic";
  const accentColor = layout === "modern" ? "var(--secondary)" : layout === "classic" ? "var(--primary)" : "var(--tertiary)";

  return (
    <section id={id} className={`py-20 md:py-32 overflow-hidden ${bgColor}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        <div className={`flex flex-col ${isReverse ? "md:flex-row-reverse" : "md:flex-row"} gap-12 md:gap-24 items-center mb-16 md:mb-24`}>
          <motion.div initial={{ opacity: 0, x: isReverse ? 40 : -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex-1">
            <span className="inline-block px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
              style={layout === "modern" ? { background: "var(--secondary-container)", color: "var(--on-secondary-container)" } :
                layout === "classic" ? { background: "rgba(159,64,45,0.12)", color: "var(--primary)" } :
                { background: "rgba(118,90,5,0.12)", color: "var(--tertiary)" }}>
              {badge}
            </span>
            <h2 className="font-serif text-3xl md:text-5xl mb-8 leading-tight" style={{ color: "var(--on-surface)" }}>{title}</h2>
            <div className="space-y-6 text-stone-500 font-medium leading-relaxed max-w-xl">
              <p className="text-lg opacity-90">{description}</p>
              <ul className="space-y-4">
                {features.map((feature, i) => (
                  <motion.li key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 * i }} viewport={{ once: true }}
                    className="flex items-start gap-4">
                    <CheckCircle2 className="w-5 h-5 shrink-0 mt-1" style={{ color: accentColor }} />
                    <span className="text-base">{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {mainImage && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="flex-1 w-full">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl relative group">
                <img src={mainImage} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
            </motion.div>
          )}
        </div>

        {layout === "modern" && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-[500px] md:h-[600px]">
            <div className="col-span-1 row-span-2 rounded-2xl md:rounded-3xl overflow-hidden shadow-lg"><img src={images[0]} className="w-full h-full object-cover" alt="Detail 1" /></div>
            <div className="col-span-2 rounded-2xl md:rounded-3xl overflow-hidden shadow-lg"><img src={images[1]} className="w-full h-full object-cover" alt="Detail 2" /></div>
            <div className="col-span-1 rounded-2xl md:rounded-3xl overflow-hidden shadow-lg"><img src={images[2]} className="w-full h-full object-cover" alt="Detail 3" /></div>
            <div className="col-span-1 rounded-2xl md:rounded-3xl overflow-hidden shadow-lg"><img src={images[3]} className="w-full h-full object-cover" alt="Detail 4" /></div>
            <div className="col-span-1 rounded-2xl md:rounded-3xl overflow-hidden shadow-lg"><img src={images[4]} className="w-full h-full object-cover" alt="Detail 5" /></div>
          </div>
        )}

        {layout === "classic" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Heritage Materials", desc: "Focus on long-lasting materials like genuine leather, brass, and heavy wool.", img: images[0] },
              { title: "Grand Proportions", desc: "Scaling elements to the room's height to create a sense of awe and importance.", img: images[1] },
              { title: "Formal Balance", desc: "Using mirrored placement to instill a feeling of structural stability and calm.", img: images[2] },
            ].map((card, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 * i }} viewport={{ once: true }}
                className="bg-white/50 backdrop-blur-sm p-6 rounded-3xl border border-stone-200 shadow-sm hover:shadow-md transition-all group">
                <div className="aspect-square rounded-2xl overflow-hidden mb-6">
                  <img src={card.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={card.title} />
                </div>
                <h3 className="font-serif text-2xl mb-3" style={{ color: "var(--on-surface)" }}>{card.title}</h3>
                <p className="text-stone-500 leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        )}

        {layout === "bohemian" && (
          <div className="grid grid-cols-2 gap-6 h-[600px] md:h-[700px]">
            {images.map((img, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 * i }}
                className={`rounded-3xl overflow-hidden shadow-xl ${i % 2 === 0 ? "h-[80%]" : "h-[80%] mt-[20%]"}`}>
                <img src={img} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt={`Boho ${i + 1}`} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function ThemesPage() {
  return (
    <div>
      <header className="max-w-7xl mx-auto px-6 md:px-16 py-20 md:py-32 text-center">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="font-serif text-4xl md:text-6xl lg:text-7xl mb-8 tracking-tight" style={{ color: "var(--on-surface)" }}>
          Curated Design Worlds
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="text-lg md:text-xl text-stone-500 max-w-2xl mx-auto leading-relaxed font-medium">
          Explore our signature interior themes. Each one is a masterclass in balance, texture, and creative expression.
        </motion.p>
      </header>

      <ThemeSection id="modern" badge="Modern" title="Sleek Minimalism & Function"
        description="The Modern theme celebrates geometric precision and the beauty of industrial materials. It is a philosophy of 'less is more', where every piece serves a purpose and negative space is treated as a luxury."
        features={["Monochromatic bases with bold primary accents.", "Natural materials like polished concrete and dark oak.", "Clean horizontal lines and architectural lighting."]}
        mainImage={THEME_IMAGES.modern.main} images={THEME_IMAGES.modern.bento} layout="modern" bgColor="bg-stone-50" />

      <ThemeSection id="classic" badge="Classic" title="Timeless Heritage & Elegance"
        description="Classic design is an homage to symmetry and refined tradition. It features rich color palettes, ornate details, and a sense of permanence that transcends passing trends."
        features={["Velvet upholstery and intricate textile patterns.", "Dark walnut and mahogany furniture with carved details.", "Balanced, symmetrical room layouts with a focal fireplace."]}
        mainImage={THEME_IMAGES.classic.main} images={THEME_IMAGES.classic.gallery} layout="classic" bgColor="bg-white" />

      <ThemeSection id="bohemian" badge="Bohemian" title="Eclectic Spirit & Comfort"
        description="The Bohemian theme is a free-spirited mix of cultures and artistic expressions. It prioritizes comfort over convention, filling spaces with plants, textiles, and personal treasures."
        features={["Layered rugs and floor pillows for a relaxed vibe.", "Vibrant greenery and macramé wall hangings.", "Warm, earthy tones mixed with saturated jewel colors."]}
        mainImage={THEME_IMAGES.bohemian.main}
        images={THEME_IMAGES.bohemian.gallery} layout="bohemian" bgColor="bg-stone-50" />
    </div>
  );
}

// ─────────────────────────── ABOUT PAGE ───────────────────────────────────

function AboutPage({ setPage }: { setPage: (page: PageKey) => void }) {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCN6SrH3SOmu42dEBZTj_gp0IdGhiWLGMBYLhA4MXPRFlvCPENupc2i5qZrXXZN0QYMJA0wBSLxB3FEzTEqsdbbNbhv4nWJrCoEiWYLC1wK9tOSTv6vhHa3E0kP86olz5o8Vi9YQWrmzcJaDa_cM97h4hTNhAbJmetnEmf9qHycfM32izv8rQR8CR7_bE82GrKKgdViTtV0nmB6dU8UyrxHI4Z_H8-Yy0VzFyPn_3fnNry3LR0KbUa7vQs6IX4GSkHDLtHO-mbqWA"
            className="w-full h-full object-cover" alt="Serene minimalist living room" />
          <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 w-full text-white">
          <motion.h1 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="font-serif text-5xl md:text-7xl font-bold max-w-3xl leading-[1.1] drop-shadow-2xl">
            Creating Harmony Through Thoughtful Design
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-8 text-lg md:text-xl max-w-2xl text-white/90 font-light leading-relaxed drop-shadow-md">
            At ho'ololi, we believe your home should be a reflection of your inner peace. We blend high-end aesthetics with functional organization to transform living spaces into sanctuaries.
          </motion.p>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div>
              <span className="font-bold text-sm uppercase tracking-[0.2em] block mb-4" style={{ color: "var(--primary)" }}>Our Philosophy</span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-8 leading-tight">The Art of Balanced Living</h2>
              <div className="space-y-6 text-stone-500 text-lg leading-relaxed font-light">
                <p>Derived from the Hawaiian word for "transformation," ho'ololi was founded on the principle that our environment directly impacts our well-being. A cluttered space leads to a cluttered mind.</p>
                <p>We don't just design rooms; we curate experiences. By marrying the warmth of natural textures with the precision of modern minimalism, we create homes that breathe, move, and evolve with you.</p>
              </div>
              <div className="mt-12 flex flex-col sm:flex-row gap-6">
                <div className="flex-1 p-8 rounded-2xl border flex flex-col gap-4 group hover:shadow-lg transition-all duration-300"
                  style={{ background: "var(--secondary-container)", borderColor: "rgba(0,0,0,0.08)" }}>
                  <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center shadow-sm" style={{ color: "var(--secondary)" }}>
                    <Scale size={24} />
                  </div>
                  <h4 className="font-bold" style={{ color: "var(--on-secondary-container)" }}>Harmony</h4>
                </div>
                <div className="flex-1 p-8 rounded-2xl border flex flex-col gap-4 group hover:shadow-lg transition-all duration-300"
                  style={{ background: "rgba(159,64,45,0.08)", borderColor: "rgba(0,0,0,0.08)" }}>
                  <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center shadow-sm" style={{ color: "var(--primary)" }}>
                    <Layers size={24} />
                  </div>
                  <h4 className="font-bold" style={{ color: "var(--on-surface)" }}>Flow</h4>
                </div>
              </div>
            </div>

            <div className="relative group">
              <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}
                className="rounded-3xl overflow-hidden shadow-2xl relative z-10">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXVBTy50UOKa8-TOrREPD3CmPBY7yuuErosw8Q8JVmaXwiZsSOpQrRNDntwKRu8LnDPFh4W7pq3-B-cXHGYNFgHrOW2INtDrSx6-GNSRINZ86Bv9MyDpiW57V2jwOrdwh9lgoZ_lZSMhvbvQ1IwOKdDhIly7yvNsmlEgMqQI0FwEztsTfXXuWzcheEmBlslgjAZg92DCu2z2B4JKI9ojO6v03dKyMHlUMi7p1aUS_iEnngBtjGTFjUk8cJbDWaYzflJ_NB82hWxw"
                  className="w-full aspect-[4/5] object-cover" alt="Artistic minimalist setup" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid */}
      <section className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">Why We Do It</h2>
            <p className="text-stone-500 max-w-2xl mx-auto text-lg font-light">Our mission is to empower homeowners to take control of their environment through intuitive tools and professional insight.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 md:row-span-2 bg-white p-10 rounded-[2.5rem] shadow-md flex flex-col justify-between group overflow-hidden border border-stone-100">
              <div>
                <h3 className="font-serif text-3xl font-bold mb-4">Empowerment Through Choice</h3>
                <p className="text-stone-500 max-w-md text-lg font-light leading-relaxed">We provide the framework, but you provide the soul. Our platform allows for deep customization, ensuring that every design journey is as unique as the person embarking on it.</p>
              </div>
              <div className="mt-12 overflow-hidden rounded-2xl">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwgywJ5dN7NZ9dJz8FC1vTocAFTyHMGkRZ1aSeIhuXKB_xlg3XhrdqjWYeiO5QpWdFHwib0MDEr1gfal408eFHhPuZmTOcIXThZG6BHCNPuC8nvGVHRJzCKLde4o3qd1oLekw442FzC2OFc8zg4N02ds8KE-mbGI3cb_ffzkyfAWCJLwYZ11fod7I5TO0A0pbcV0vtPlhJyQKzxAt6M4k5yGAQJVIV0fCwzBskJE0oVfmCloqHs_YnzzJbPk87HKUt--abuW-s6Q"
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700" alt="Modern living room" />
              </div>
            </div>
            <div className="p-10 rounded-[2.5rem] flex flex-col items-center text-center justify-center gap-6 group hover:translate-y-[-8px] transition-all duration-300"
              style={{ background: "var(--secondary-container)" }}>
              <div className="p-4 rounded-full" style={{ background: "rgba(255,255,255,0.5)", color: "var(--secondary)" }}>
                <Leaf size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3" style={{ color: "var(--on-secondary-container)" }}>Sustainability</h3>
                <p className="text-base font-medium leading-relaxed" style={{ color: "var(--on-secondary-container)" }}>Curating long-lasting designs that respect both your home and the planet.</p>
              </div>
            </div>
            <div className="p-10 rounded-[2.5rem] flex flex-col items-center text-center justify-center gap-6 group hover:translate-y-[-8px] transition-all duration-300"
              style={{ background: "var(--tertiary-container, #af8f3b)", color: "white" }}>
              <div className="p-4 rounded-full" style={{ background: "rgba(255,255,255,0.3)" }}>
                <ChevronRight size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3">Precision</h3>
                <p className="text-base font-medium leading-relaxed">Every measurement, texture, and color is chosen with absolute intent.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <span className="font-bold text-sm uppercase tracking-widest block mb-4" style={{ color: "var(--primary)" }}>Meet the Visionaries</span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold">The Creative Minds Behind ho'ololi</h2>
            </div>
            <button className="px-8 py-3 rounded-full border-2 font-bold hover:text-white transition-all duration-300"
              style={{ borderColor: "var(--primary)", color: "var(--primary)" }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--primary)'; e.currentTarget.style.color = 'white'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--primary)'; }}>
              Join the Team
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { name: "Shridurga K P", role: "Founder, Designer & Developer", img: "https://drive.google.com/uc?export=view&id=1u2-5in_l3vFkE0y9_C-ITcV6jUwFAR-5" },
              { name: "Harini S", role: "Co-Founder & Developer", img: "https://drive.google.com/uc?export=view&id=1IUZfS5VbXUfYqaIiY5fSBx1ZTAvH3OQ9" },
              { name: "Nivedhitha S", role: "Co-Founder & Developer", img: "https://drive.google.com/uc?export=view&id=1VkQZu7EAcC3OKwCIUKufthuxlyLLUF4x" }
            ].map((person, i) => (
              <motion.div key={i} whileHover={{ y: -10 }} className="group">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden mb-6 shadow-md group-hover:shadow-2xl transition-all duration-500">
                  <img src={person.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={person.name} />
                </div>
                <h4 className="text-xl font-bold mb-1">{person.name}</h4>
                <p className="font-medium tracking-wide text-sm" style={{ color: "var(--primary)" }}>{person.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-white" style={{ background: "var(--primary)" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-16 text-center">
          <h2 className="font-serif text-4xl md:text-6xl font-bold mb-8 max-w-4xl mx-auto leading-tight">Ready to transform your sanctuary?</h2>
          <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto opacity-90 font-light">Join thousands of homeowners who have found their perfect balance with ho'ololi.</p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-white px-12 py-4 rounded-full font-bold hover:scale-105 transition-transform shadow-xl"
              style={{ color: "var(--primary)" }}>
              Start Your Project
            </button>
            <button onClick={() => setPage("themes")}
              className="border-2 border-white/50 text-white px-12 py-4 rounded-full font-bold hover:bg-white/10 transition-all">
              Explore Themes
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─────────────────────────── ROOT APP ─────────────────────────────────────

const CSS_VARS = `
  :root {
    --primary: #9f402d;
    --primary-container: #e2725b;
    --on-primary: #ffffff;
    --secondary: #4e635a;
    --secondary-container: #cee5da;
    --on-secondary-container: #52675e;
    --tertiary: #765a05;
    --tertiary-container: #af8f3b;
    --on-tertiary-container: #fff;
    --surface: #f9f9ff;
    --on-surface: #001b3c;
    --on-surface-variant: #56423e;
    --surface-container-low: #f5f5f0;
    --outline-variant: #d4c4bf;
  }

  @import url('https://fonts.googleapis.com/css2?family=Libre+Caslon+Text:wght@400;700&family=Be+Vietnam+Pro:wght@400;500;600;700&display=swap');

  body {
    font-family: 'Be Vietnam Pro', sans-serif;
    background: #f9f9ff;
    color: #001b3c;
    -webkit-font-smoothing: antialiased;
  }

  .font-serif {
    font-family: 'Libre Caslon Text', serif;
  }
`;

export default function App() {
  const [page, setPage] = useState<PageKey>("home");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const pages = { home: HomePage, products: ProductsPage, themes: ThemesPage, about: AboutPage };
  const PageComponent = pages[page] || HomePage;

  return (
    <>
      <style>{CSS_VARS}</style>
      <div className="min-h-screen">
        <Navbar activePage={page} setPage={setPage} />
        <AnimatePresence mode="wait">
          <motion.div key={page} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
            <PageComponent setPage={setPage} />
          </motion.div>
        </AnimatePresence>
        <SharedFooter setPage={setPage} />
      </div>
    </>
  );
}
