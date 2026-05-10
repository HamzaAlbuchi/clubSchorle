export default function Footer() {
  return (
    <footer id="contact" className="bg-background border-t border-muted py-20 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-14">
          {/* Brand */}
          <div>
            <h3 className="font-display text-2xl text-cream mb-4">Club Schorle</h3>
            <p className="font-body text-cream/38 text-sm leading-relaxed">
              Ein Ort für Kunst, Kulinarik und ehrliche Begegnungen — mitten in München.
            </p>
          </div>

          {/* Kontakt */}
          <div>
            <h4 className="font-body text-[10px] tracking-[0.35em] text-wine uppercase mb-5">Kontakt</h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="mailto:clubschorle@gmail.com"
                  className="font-body text-sm text-cream/45 hover:text-cream transition-colors duration-300"
                >
                  clubschorle@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="font-body text-sm text-cream/45 hover:text-cream transition-colors duration-300"
                >
                  @clubschorle
                </a>
              </li>
              <li>
                <span className="font-body text-sm text-cream/30">München, Bayern</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-body text-[10px] tracking-[0.35em] text-wine uppercase mb-5">Newsletter</h4>
            <p className="font-body text-cream/38 text-sm mb-5 leading-relaxed">
              Kein Spam. Nur Einladungen zu den besten Abenden Münchens.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="deine@email.de"
                className="bg-charcoal border border-muted text-cream text-sm px-4 py-2.5 flex-1 focus:outline-none focus:border-wine placeholder:text-cream/18 font-body min-w-0"
              />
              <button
                type="button"
                className="bg-wine text-cream text-[10px] font-body tracking-[0.2em] px-5 py-2.5 hover:bg-wine-dark transition-colors duration-300 uppercase shrink-0"
              >
                Ok
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-muted/50 gap-3">
          <p className="font-body text-[10px] text-cream/20 tracking-wider">
            © 2024 Club Schorle — München
          </p>
          <div className="flex gap-6">
            <a href="#" className="font-body text-[10px] text-cream/20 hover:text-cream/50 tracking-wider transition-colors duration-300">
              Impressum
            </a>
            <a href="#" className="font-body text-[10px] text-cream/20 hover:text-cream/50 tracking-wider transition-colors duration-300">
              Datenschutz
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
