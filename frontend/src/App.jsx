import { useState, useEffect, useRef } from 'react'

// ── CONTACT MODAL ──────────────────────────────────────────────
function ContactModal({ type, onClose }) {
  const [form, setForm] = useState({ name: '', email: '', company: '', role: '', message: '', interest: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const isBrand = type === 'brand'

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, type })
      })
      if (!res.ok) throw new Error('Server error')
      setSuccess(true)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <button className="modal-close" onClick={onClose}>✕</button>
        {success ? (
          <div className="form-success">
            <div className="success-icon">✅</div>
            <h3>We got your message!</h3>
            <p>Thanks for reaching out. We'll be in touch within 2 business days.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mono" style={{ marginBottom: 12 }}>{isBrand ? '-- For brands' : '-- For creators'}</div>
            <h2>{isBrand ? "Let's build a campaign" : "Join the crew"}</h2>
            <p className="modal-sub">{isBrand ? "Tell us about your brand and campaign goals. We'll get back to you within 2 business days." : "Tell us about your content and what you're looking for. We'll reach out when there's a great fit."}</p>
            <div className="form-row">
              <div className="form-group">
                <label>Your name</label>
                <input name="name" required value={form.name} onChange={handleChange} placeholder="Alex Johnson" />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input name="email" type="email" required value={form.email} onChange={handleChange} placeholder="alex@example.com" />
              </div>
            </div>
            {isBrand ? (
              <>
                <div className="form-row">
                  <div className="form-group">
                    <label>Company / Brand</label>
                    <input name="company" required value={form.company} onChange={handleChange} placeholder="Your brand name" />
                  </div>
                  <div className="form-group">
                    <label>Your role</label>
                    <input name="role" value={form.role} onChange={handleChange} placeholder="Marketing Manager" />
                  </div>
                </div>
                <div className="form-group">
                  <label>Campaign interest</label>
                  <select name="interest" value={form.interest} onChange={handleChange}>
                    <option value="">Select a goal...</option>
                    <option>Brand awareness</option>
                    <option>Product launch</option>
                    <option>Community building</option>
                    <option>Performance / conversions</option>
                    <option>Other</option>
                  </select>
                </div>
              </>
            ) : (
              <div className="form-group">
                <label>What do you create?</label>
                <select name="interest" value={form.interest} onChange={handleChange}>
                  <option value="">Select a category...</option>
                  <option>Food &amp; Cooking</option>
                  <option>Lifestyle &amp; Home</option>
                  <option>Beauty &amp; Wellness</option>
                  <option>Tech &amp; Gaming</option>
                  <option>Fashion</option>
                  <option>Fitness &amp; Health</option>
                  <option>Travel</option>
                  <option>Other</option>
                </select>
              </div>
            )}
            <div className="form-group">
              <label>Anything else?</label>
              <textarea name="message" value={form.message} onChange={handleChange} placeholder={isBrand ? "Tell us about your product, budget range, timeline or any specific goals..." : "Tell us about your audience, your platforms, and the kind of brands you'd love to work with..."} />
            </div>
            {error && <p style={{ color: 'var(--orange)', fontSize: 13, marginBottom: 12 }}>{error}</p>}
            <button className="form-submit" type="submit" disabled={loading}>
              {loading ? 'Sending...' : (isBrand ? 'Send campaign brief →' : 'Apply to join →')}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

// ── REVEAL HOOK ────────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible')
          observer.unobserve(e.target)
        }
      }),
      { threshold: 0.12 }
    )
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

// ── NAVBAR ─────────────────────────────────────────────────────
function Navbar({ onLetsTalk }) {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <>
      <div className="topline" />
      <div className="wrap">
        <nav>
          <a className="brand" href="#home">
            <span className="brand-mark">✳</span> creator's crew
          </a>
          <div className={`navlinks${menuOpen ? ' open' : ''}`} id="navlinks">
            <a href="#industry" onClick={() => setMenuOpen(false)}>The shift</a>
            <a href="#approach" onClick={() => setMenuOpen(false)}>Our approach</a>
            <a href="#difference" onClick={() => setMenuOpen(false)}>Why us</a>
            <a href="#creators" onClick={() => setMenuOpen(false)}>For creators</a>
            <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
          </div>
          <button className="nav-cta" onClick={() => { onLetsTalk('brand'); setMenuOpen(false) }}>
            Let's talk <span>↗</span>
          </button>
          <button className="menu" aria-label="Open navigation" onClick={() => setMenuOpen(o => !o)}>
            {menuOpen ? '✕' : '☰'}
          </button>
        </nav>
      </div>
    </>
  )
}

// ── HERO ───────────────────────────────────────────────────────
function Hero({ onLetsTalk }) {
  return (
    <section className="hero" id="home">
      <div className="wrap hero-grid">
        <div className="reveal">
          <div className="eyebrow mono"><span className="dot" /> The next wave of creator marketing</div>
          <h1>Small creators.<br /><em>Serious impact.</em></h1>
          <p className="hero-copy">We help ambitious brands turn everyday creators into a powerful growth community. The right voices, working together, can make your brand part of more real conversations.</p>
          <div className="hero-actions">
            <button className="btn btn-primary" onClick={() => onLetsTalk('brand')}>Build a campaign <span>↗</span></button>
            <a className="text-link" href="#approach">Explore our approach <span>↓</span></a>
          </div>
          <div className="hero-note">
            <div className="avatars"><i /><i /><i /></div>
            <span>Built around people, not just follower counts.</span>
          </div>
        </div>
        <div className="visual reveal">
          <div className="orbit" />
          <div className="float-tag tag-a"><span className="mono">One brief</span><strong>Many voices</strong></div>
          <div className="hero-card">
            <div className="card-head">
              <span className="mono">Creator network / 001</span>
              <span className="live">● IN MOTION</span>
            </div>
            <div className="creator-grid">
              {['🍳','🪴','🧴','☕','🏡','✨'].map((e, i) => <div key={i} className="creator">{e}</div>)}
            </div>
            <div className="campaign-row">
              <div><strong>One community</strong><small>Connected by a shared campaign</small></div>
              <div className="mini-bars">{[10,17,13,25,21].map((h, i) => <b key={i} style={{height: h}} />)}</div>
            </div>
          </div>
          <div className="float-tag tag-b"><span className="mono">The idea</span><strong>Reach × relevance</strong></div>
        </div>
      </div>
    </section>
  )
}

// ── TICKER ─────────────────────────────────────────────────────
function Ticker() {
  return (
    <div className="ticker">
      <div className="wrap ticker-track">
        {['Creator-first thinking', 'Culture-led campaigns', 'Real people, real stories', 'Built for measurable learning'].map(t => (
          <span key={t}>{t}</span>
        ))}
      </div>
    </div>
  )
}

// ── INDUSTRY ───────────────────────────────────────────────────
function Industry() {
  return (
    <section className="industry" id="industry">
      <div className="wrap industry-grid">
        <div className="industry-copy reveal">
          <div className="mono">01 / The shift</div>
          <h2>Influence is no longer reserved for the famous.</h2>
          <p>People discover products through creators who feel familiar: the home chef, the local reviewer, the parent sharing a routine, the person whose recommendations fit a specific community. Creator marketing is moving beyond a handful of celebrity-sized placements toward many voices with clear audience fit.</p>
          <p>Creator's Crew is being built to make that fragmented ecosystem easier for brands to activate, coordinate and learn from.</p>
        </div>
        <div className="stat-stack reveal">
          <div className="stat"><strong>Many</strong><span>distinct creator voices<br />in one coordinated campaign</span></div>
          <div className="stat dark"><strong>01 → 100s</strong><span>one brand brief, scaled across<br />the right creator mix</span></div>
          <div className="stat dark"><strong>Fit first</strong><span>audience relevance over<br />follower count alone</span></div>
          <div className="stat"><strong>Learn</strong><span>use campaign outcomes to<br />make the next one smarter</span></div>
        </div>
      </div>
    </section>
  )
}

// ── APPROACH ───────────────────────────────────────────────────
function Approach() {
  return (
    <section id="approach">
      <div className="wrap">
        <div className="section-top reveal">
          <div>
            <div className="mono">02 / What we do</div>
            <h2>We make creator campaigns feel less complicated.</h2>
          </div>
          <p>From finding the right people to getting the campaign over the finish line, we bring the moving parts into one managed process.</p>
        </div>
        <div className="cards">
          {[
            { n: '01 -- MATCH', h: 'Creators with a reason to fit', p: 'Build a shortlist around category relevance, recent content, audience signals, geography and brand suitability--not a big follower number alone.' },
            { n: '02 -- COORDINATE', h: 'One brief. Clear execution.', p: "Align deliverables, timelines, approvals, disclosures, usage rights and creator communication so brands aren't chasing dozens of conversations." },
            { n: '03 -- LEARN', h: 'Make every campaign count', p: 'Bring delivery evidence and performance signals together in a clear report, then identify which creators and creative approaches are worth testing again.' },
          ].map(c => (
            <article key={c.n} className="info-card reveal">
              <span className="number">{c.n}</span>
              <h3>{c.h}</h3>
              <p>{c.p}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── COMPARISON ─────────────────────────────────────────────────
function Comparison() {
  return (
    <section className="comparison" id="difference">
      <div className="wrap">
        <div className="section-top reveal">
          <div>
            <div className="mono">03 / The difference</div>
            <h2>Not one big voice. A chorus of the right ones.</h2>
          </div>
          <p>Macro creators can play an important role. But for many product stories, a portfolio of smaller, relevant voices can create a more flexible testing strategy.</p>
        </div>
        <div className="comparison-grid">
          <div className="compare reveal">
            <div className="mono">The traditional one-big-bet approach</div>
            <h3>A few macro placements</h3>
            <ul>
              <li>A large share of budget can sit with a small number of creators.</li>
              <li>Fewer creative perspectives and audience pockets in a single test.</li>
              <li>One campaign result can be heavily influenced by a single post.</li>
              <li>Can be useful for broad awareness and major launches.</li>
            </ul>
          </div>
          <div className="compare highlight reveal">
            <div className="mono">The Creator's Crew approach</div>
            <h3>A coordinated creator mix</h3>
            <ul>
              <li>Spread experiments across multiple relevant audiences.</li>
              <li>Test different stories, formats and creator communities.</li>
              <li>Find promising content angles before scaling what works.</li>
              <li>Build repeatable relationships with creators who fit the brand.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── REASONS ────────────────────────────────────────────────────
function Reasons() {
  const items = [
    { icon: '◎', h: 'More specific communities', p: 'Smaller creators may speak to focused interests, needs and local contexts that broad-reach campaigns can miss.' },
    { icon: '✳', h: 'More creative experiments', p: 'Test multiple hooks, formats and product use cases instead of relying on one creative direction.' },
    { icon: '↗', h: 'Flexible campaign design', p: 'Build a creator mix around the brief, budget, geography and objective--with room to adjust as evidence comes in.' },
    { icon: '⌁', h: 'Potential for authentic fit', p: 'A creator who already makes relevant content can tell a product story in a way that feels native to their audience.' },
  ]
  return (
    <section>
      <div className="wrap">
        <div className="section-top reveal">
          <div>
            <div className="mono">04 / Why smaller creators</div>
            <h2>Relevance can travel further than reach.</h2>
          </div>
          <p>It's not about declaring small creators universally better. It's about giving brands more ways to find the right fit and learn what resonates.</p>
        </div>
        <div className="reasons">
          {items.map(r => (
            <div key={r.h} className="reason reveal">
              <div className="reason-icon">{r.icon}</div>
              <div><h3>{r.h}</h3><p>{r.p}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── PROCESS ────────────────────────────────────────────────────
function Process() {
  const steps = [
    { n: 'STEP 01', h: 'Understand', p: 'We get to know your product, audience, objective, budget and campaign constraints.' },
    { n: 'STEP 02', h: 'Curate', p: 'We shortlist suitable creators and align expectations, rates and deliverables.' },
    { n: 'STEP 03', h: 'Activate', p: 'We coordinate briefs, content checks, timelines, disclosures and live-post evidence.' },
    { n: 'STEP 04', h: 'Optimise', p: 'We review the results and recommend what to repeat, change or test next.' },
  ]
  return (
    <section className="industry" style={{ padding: '90px 0' }}>
      <div className="wrap">
        <div className="section-top reveal">
          <div>
            <div className="mono">05 / How it comes together</div>
            <h2>From a brand brief to a smarter next move.</h2>
          </div>
          <p>A clear operating rhythm keeps campaigns organised while leaving room for creators to make the content their own.</p>
        </div>
        <div className="process">
          {steps.map(s => (
            <div key={s.n} className="step reveal"><b>{s.n}</b><h3>{s.h}</h3><p>{s.p}</p></div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── CONTACT SECTION ────────────────────────────────────────────
function ContactSection({ onOpen }) {
  return (
    <section id="contact" style={{ background: '#13150f' }}>
      <div className="wrap">
        <div className="section-top reveal" style={{ marginBottom: 56 }}>
          <div>
            <div className="mono">06 / Get in touch</div>
            <h2>Ready to start the conversation?</h2>
          </div>
          <p>Whether you're a brand looking to run your next campaign or a creator looking for meaningful partnerships, we'd love to hear from you.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="contact-grid reveal">
          <div style={{ background: 'var(--panel)', border: '1px solid var(--line)', borderRadius: 22, padding: 40 }}>
            <div className="mono" style={{ marginBottom: 16 }}>For brands</div>
            <h3 style={{ fontSize: 28, letterSpacing: '-0.05em', marginBottom: 12 }}>Build a campaign with us</h3>
            <p style={{ color: 'var(--muted)', fontSize: 13, lineHeight: 1.8, marginBottom: 28 }}>Tell us about your brand, campaign goals, and timeline. We'll put together a tailored creator mix for you.</p>
            <button className="btn btn-primary" onClick={() => onOpen('brand')}>Let's talk <span>↗</span></button>
          </div>
          <div style={{ background: 'var(--lime)', borderRadius: 22, padding: 40, color: '#171910' }}>
            <div className="mono" style={{ color: '#4f5b28', marginBottom: 16 }}>For creators</div>
            <h3 style={{ fontSize: 28, letterSpacing: '-0.05em', marginBottom: 12 }}>Join the creator network</h3>
            <p style={{ color: '#4c542e', fontSize: 13, lineHeight: 1.8, marginBottom: 28 }}>Make content you believe in? We want to hear from you. Tell us what you create and what kind of brands you'd love to work with.</p>
            <button className="btn" style={{ background: '#171910', color: 'var(--lime)' }} onClick={() => onOpen('creator')}>Apply as creator <span>↗</span></button>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── JOIN (FOR CREATORS) ─────────────────────────────────────────
function Join({ onOpen }) {
  return (
    <section className="join" id="creators">
      <div className="wrap">
        <div className="join-box reveal">
          <div>
            <div className="mono">For the creators</div>
            <h2>Your content deserves the right opportunities.</h2>
            <p>Make content you believe in? Join the Creator's Crew community. Tell us what you create, who you reach and the kind of brand collaborations you're interested in. We'll reach out when there's a relevant fit.</p>
          </div>
          <div className="join-actions">
            <button onClick={() => onOpen('creator')}>Apply as a creator ↗</button>
            <button className="secondary" onClick={() => onOpen('brand')}>I'm a brand ↗</button>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── FOOTER ─────────────────────────────────────────────────────
function Footer({ onLetsTalk }) {
  return (
    <div className="wrap">
      <footer>
        <div className="footer-row">
          <div>
            <a className="brand" href="#home"><span className="brand-mark">✳</span> creator's crew</a>
            <p className="footer-note">Small creators. Serious impact.<br />© {new Date().getFullYear()} Creator's Crew. All rights reserved.</p>
          </div>
          <div className="socials">
            <a href="#industry">The shift</a>
            <a href="#approach">Our approach</a>
            <a href="#contact">Contact</a>
            <button onClick={() => onLetsTalk('brand')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', font: 'inherit', fontSize: 11 }}>Let's talk ↗</button>
          </div>
        </div>
        <p className="footer-note" style={{ marginTop: 25 }}>© {new Date().getFullYear()} Creator's Crew. Building the future of creator marketing.</p>
      </footer>
    </div>
  )
}

// ── APP ────────────────────────────────────────────────────────
export default function App() {
  const [modal, setModal] = useState(null) // null | 'brand' | 'creator'

  useReveal()

  const openModal = type => setModal(type)
  const closeModal = () => setModal(null)

  // Close modal on Escape
  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') closeModal() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  // Prevent body scroll when modal open
  useEffect(() => {
    document.body.style.overflow = modal ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [modal])

  return (
    <>
      <Navbar onLetsTalk={openModal} />
      <main id="home">
        <Hero onLetsTalk={openModal} />
        <Ticker />
        <Industry />
        <Approach />
        <Comparison />
        <Reasons />
        <Process />
        <ContactSection onOpen={openModal} />
        <Join onOpen={openModal} />
      </main>
      <Footer onLetsTalk={openModal} />
      {modal && <ContactModal type={modal} onClose={closeModal} />}
    </>
  )
}
