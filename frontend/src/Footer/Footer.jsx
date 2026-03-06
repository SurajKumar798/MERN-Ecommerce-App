import { Link } from 'react-router';

function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 mt-auto">

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <Link to="/" className="inline-block mb-3">
              <span className="text-xl font-black text-white tracking-tight">
                ⚡ quickystore<span className="text-slate-500 font-light">.in</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400">
              Your one-stop shop for the latest gadgets, electronics, and accessories — delivered fast.
            </p>
            {/* Socials */}
            <div className="flex gap-3 mt-5">
              {[
                { icon: "in", href: "#", label: "LinkedIn" },
                { icon: "▶", href: "#", label: "YouTube" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-amber-500 hover:text-white flex items-center justify-center text-xs font-bold transition-all duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-4">Shop</h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: "All Products", to: "/" },
                { label: "Mobiles", to: "/?category=Mobiles" },
                { label: "Laptops", to: "/?category=Laptops" },
                { label: "Tablets", to: "/?category=Tablets" },
              ].map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="hover:text-amber-400 transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-4">Account</h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: "Login", to: "/login" },
                { label: "Sign Up", to: "/signup" },
              ].map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="hover:text-amber-400 transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-4">Support</h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: "📧 support@quickystore.in", href: "mailto:surajkumarsethy09@gmail.com" },
                { label: "📞 +91 7978037549", href: "tel:+917978037549" },
                { label: "📍 Bhubaneswar, Odisha", href: "#" },
              ].map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="hover:text-amber-400 transition-colors duration-200">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Trust badges */}
            <div className="mt-5 flex flex-wrap gap-2">
              {["🔒 Secure", "🚚 Free Delivery", "↩️ Easy Returns"].map((badge) => (
                <span key={badge} className="text-xs bg-slate-800 text-slate-300 px-2.5 py-1 rounded-full">
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} quickystore.in — All rights reserved.</p>
          <div className="flex gap-5">
            {["Privacy Policy", "Terms of Service", "Refund Policy"].map((item) => (
              <a key={item} href="#" className="hover:text-amber-400 transition-colors duration-200">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;