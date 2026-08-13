const PortfolioContact = () => {
  const [formData, setFormData] = React.useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = React.useState({});
  const [submitted, setSubmitted] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitError, setSubmitError] = React.useState('');

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Required';
    if (!formData.email.trim()) {
      newErrors.email = 'Required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email';
    }
    if (!formData.message.trim()) newErrors.message = 'Required';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitError('');
    setIsSubmitting(true);

    // Web3Forms lets a static, backend-less page send real email: it POSTs
    // form data to Web3Forms, which relays it to the inbox tied to the
    // access key below (see config.js). No server of ours is involved.
    const accessKey = (typeof CONFIG !== 'undefined' && CONFIG.WEB3FORMS_ACCESS_KEY) || '';

    if (!accessKey) {
      setIsSubmitting(false);
      setSubmitError("Email isn't configured yet — add a Web3Forms access key in config.js.");
      return;
    }

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `New message from ${formData.name} via portfolio site`,
          from_name: formData.name,
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitted(true);
      } else {
        setSubmitError(result.message || 'Something went wrong sending that. Please try again.');
      }
    } catch (err) {
      setSubmitError("Couldn't reach the mail service — check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" style={{ padding: '80px 0' }}>
      <SectionHeader 
        eyebrow="let's connect" 
        title="get in touch"
        kicker="open to opportunities & collaborations"
      />
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: 40,
        alignItems: 'start'
      }}>
        {/* LEFT COLUMN: Contact Cards & Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: 20
          }}>
            {/* Email Card */}
            <PaperCard tilt={-1.5} tape>
              <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                <div style={{
                  background: 'var(--rose-pale)',
                  borderRadius: '50%',
                  width: 50,
                  height: 50,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1.5px solid var(--ink)'
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--ink)" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <div>
                  <h4 className="marker" style={{ fontSize: 20, color: 'var(--ink)', margin: '0 0 4px 0' }}>
                    Email
                  </h4>
                  <a href="mailto:arun.ggit.bca@gmail.com" className="hand" style={{ fontSize: 18, color: 'var(--rose-deep)', textDecoration: 'none' }}>
                    arun.ggit.bca@gmail.com
                  </a>
                </div>
              </div>
            </PaperCard>

            {/* Phone Card */}
            <PaperCard tilt={1.2} tape>
              <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                <div style={{
                  background: 'var(--moss)',
                  borderRadius: '50%',
                  width: 50,
                  height: 50,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1.5px solid var(--ink)',
                  opacity: 0.95
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--ink)" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </div>
                <div>
                  <h4 className="marker" style={{ fontSize: 20, color: 'var(--ink)', margin: '0 0 4px 0' }}>
                    Phone
                  </h4>
                  <a href="tel:+919506050288" className="hand" style={{ fontSize: 18, color: 'var(--rose-deep)', textDecoration: 'none' }}>
                    +91 9506050288
                  </a>
                </div>
              </div>
            </PaperCard>

            {/* LinkedIn Card */}
            <PaperCard tilt={-1} tape>
              <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                <div style={{
                  background: 'var(--sky)',
                  borderRadius: '50%',
                  width: 50,
                  height: 50,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1.5px solid var(--ink)'
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--ink)" strokeWidth="2">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                    <rect x="2" y="9" width="4" height="12"/>
                    <circle cx="4" cy="4" r="2"/>
                  </svg>
                </div>
                <div>
                  <h4 className="marker" style={{ fontSize: 20, color: 'var(--ink)', margin: '0 0 4px 0' }}>
                    LinkedIn
                  </h4>
                  <a href="https://linkedin.com/in/arunkumar" target="_blank" rel="noopener noreferrer" className="hand" style={{ fontSize: 18, color: 'var(--rose-deep)', textDecoration: 'none' }}>
                    Connect on LinkedIn
                  </a>
                </div>
              </div>
            </PaperCard>
          </div>

          <div style={{
            padding: 24,
            background: 'var(--paper)',
            borderRadius: 3,
            transform: 'rotate(-0.5deg)',
            border: '1.5px solid var(--ink)',
            boxShadow: '0 4px 10px rgba(0,0,0,0.06)'
          }}>
            <p className="hand" style={{ fontSize: 20, color: 'var(--ink-soft)', margin: '8px 0', display: 'flex', alignItems: 'center', gap: 10 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              Unnao, Uttar Pradesh, India
            </p>
            <p className="hand" style={{ fontSize: 20, color: 'var(--ink-soft)', margin: '8px 0', display: 'flex', alignItems: 'center', gap: 10 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                <line x1="12" y1="19" x2="12" y2="23"/>
                <line x1="8" y1="23" x2="16" y2="23"/>
              </svg>
              English, Hindi
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: Contact Form Notepad */}
        <PaperCard tilt={1.5} tape style={{ padding: '32px 32px 40px', overflow: 'hidden' }}>
          {/* ruled line background overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'repeating-linear-gradient(0deg, transparent 0 32px, rgba(169,193,201,0.2) 32px 33px)',
            paddingTop: 80,
            pointerEvents: 'none'
          }} />
          <div style={{ position: 'absolute', top: 0, bottom: 0, left: 40, width: 1, background: 'rgba(178,107,107,0.3)', pointerEvents: 'none' }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '40px 0 20px' }}>
                <div style={{ display: 'inline-block', transform: 'rotate(-4deg)', marginBottom: 20 }}>
                  <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="var(--moss)" strokeWidth="1.5">
                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="marker" style={{ fontSize: 32, color: 'var(--ink)', marginBottom: 12 }}>
                  Letter Sent!
                </h3>
                <p className="hand" style={{ fontSize: 20, color: 'var(--ink-soft)', lineHeight: 1.6, maxWidth: 300, margin: '0 auto 24px' }}>
                  Thanks, <span style={{ color: 'var(--rose-deep)' }}>{formData.name}</span>! I've received your note and will get back to you at <span style={{ textDecoration: 'underline' }}>{formData.email}</span> shortly.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', message: '' }); }}
                  style={{
                    background: 'var(--ink)',
                    color: 'var(--paper)',
                    border: 'none',
                    borderRadius: 4,
                    padding: '8px 16px',
                    fontFamily: "'Kalam', cursive",
                    fontSize: 16,
                    cursor: 'pointer'
                  }}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <h3 className="marker" style={{ fontSize: 32, color: 'var(--ink)', marginBottom: 24, paddingLeft: 30 }}>
                  Leave a Note
                </h3>

                <div style={{ paddingLeft: 30, display: 'flex', flexDirection: 'column', gap: 28 }}>
                  {/* Name field */}
                  <div style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
                    <label className="beanie" style={{ fontSize: 22, color: 'var(--rose-deep)', marginBottom: -4 }}>
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      style={{
                        border: 'none',
                        borderBottom: '1.5px solid var(--ink)',
                        background: 'transparent',
                        padding: '6px 2px',
                        fontSize: 18,
                        fontFamily: "'Kalam', cursive",
                        color: 'var(--ink)',
                        outline: 'none'
                      }}
                    />
                    {errors.name && (
                      <span className="beanie" style={{ position: 'absolute', right: 0, bottom: -20, color: 'var(--rose-deep)', fontSize: 18, fontWeight: 'bold' }}>
                        * required
                      </span>
                    )}
                  </div>

                  {/* Email field */}
                  <div style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
                    <label className="beanie" style={{ fontSize: 22, color: 'var(--rose-deep)', marginBottom: -4 }}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      style={{
                        border: 'none',
                        borderBottom: '1.5px solid var(--ink)',
                        background: 'transparent',
                        padding: '6px 2px',
                        fontSize: 18,
                        fontFamily: "'Kalam', cursive",
                        color: 'var(--ink)',
                        outline: 'none'
                      }}
                    />
                    {errors.email && (
                      <span className="beanie" style={{ position: 'absolute', right: 0, bottom: -20, color: 'var(--rose-deep)', fontSize: 18, fontWeight: 'bold' }}>
                        * {errors.email}
                      </span>
                    )}
                  </div>

                  {/* Message field */}
                  <div style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
                    <label className="beanie" style={{ fontSize: 22, color: 'var(--rose-deep)', marginBottom: -4 }}>
                      Message Note
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="4"
                      style={{
                        border: 'none',
                        borderBottom: '1.5px solid var(--ink)',
                        background: 'transparent',
                        padding: '6px 2px',
                        fontSize: 18,
                        fontFamily: "'Kalam', cursive",
                        color: 'var(--ink)',
                        outline: 'none',
                        resize: 'none',
                        lineHeight: '32px' /* align with rule lines */
                      }}
                    />
                    {errors.message && (
                      <span className="beanie" style={{ position: 'absolute', right: 0, bottom: -20, color: 'var(--rose-deep)', fontSize: 18, fontWeight: 'bold' }}>
                        * required
                      </span>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 12 }}>
                    <ScribbleButton 
                      fill="var(--rose)" 
                      style={{ fontSize: 24, padding: '10px 24px', opacity: isSubmitting ? 0.7 : 1, pointerEvents: isSubmitting ? 'none' : 'auto' }}
                      onClick={handleSubmit}
                    >
                      {isSubmitting ? 'sending...' : 'send note →'}
                    </ScribbleButton>
                    {submitError && (
                      <p className="hand" style={{
                        margin: 0,
                        fontSize: 16,
                        color: 'var(--rose-deep)',
                        maxWidth: 320,
                        lineHeight: 1.5
                      }}>
                        ⚠ {submitError}
                      </p>
                    )}
                  </div>
                </div>
              </form>
            )}
          </div>
        </PaperCard>
      </div>
    </section>
  );
};

Object.assign(window, { PortfolioContact });