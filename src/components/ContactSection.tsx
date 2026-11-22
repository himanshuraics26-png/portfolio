import { useState, type FormEvent } from 'react';
import {
  AlertCircle,
  Check,
  Copy,
  Dribbble,
  Github,
  Linkedin,
  Mail,
  Send,
  Twitter,
} from 'lucide-react';
import { PROFILE } from '../data/portfolioData';

const SOCIAL_ICONS = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Dribbble: Dribbble,
  X: Twitter,
} as const;

export function ContactSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [projectType, setProjectType] = useState('UI/UX Design & Frontend');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      setError('Please complete your name, email address, and project message.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError('Please enter a valid email address so I can reply.');
      return;
    }

    setError('');
    setSubmitted(true);
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setMessage('');
    setSubmitted(false);
    setError('');
  };

  return (
    <section
      id="contact"
      className="relative z-10 mx-auto max-w-[1200px] px-5 py-20 sm:px-8 lg:py-28"
    >
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
        {/* Left Info Column */}
        <div className="flex flex-col justify-between lg:col-span-5">
          <div>
            <p className="text-sm font-medium tracking-wide text-[#4cd7f6]">
              05. Get In Touch
            </p>
            <h2
              className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl"
              style={{ textWrap: 'balance' }}
            >
              Let&apos;s Build Something Amazing Together.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#cbc3d7]">
              Have an ambitious product idea, design system initiative, or interactive web
              experience in mind? Reach out directly or send a brief — I typically respond within
              24 hours.
            </p>

            {/* Direct Email Box */}
            <div className="mt-8 glass-panel rounded-2xl p-5">
              <p className="text-xs font-medium text-[#958ea0]">Direct Email</p>
              <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="inline-flex items-center gap-2.5 text-sm font-medium text-white transition-colors hover:text-[#4cd7f6] sm:text-base"
                >
                  <Mail className="h-4 w-4 text-[#8B5CF6]" aria-hidden="true" />
                  <span>{PROFILE.email}</span>
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex min-h-[36px] items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-[#e2e1f3] transition-colors hover:border-cyan-400/60 hover:text-white cursor-pointer focus-visible:outline-2 focus-visible:outline-cyan-400"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-[#4cd7f6]" aria-hidden="true" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="mt-8 border-t border-white/10 pt-6">
            <p className="text-xs font-medium text-[#958ea0]">Elsewhere</p>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {PROFILE.socials.map((social) => {
                const Icon =
                  SOCIAL_ICONS[social.label as keyof typeof SOCIAL_ICONS] || Github;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex min-h-[44px] items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-[#e2e1f3] transition-colors hover:border-cyan-400/50 hover:bg-white/[0.06] hover:text-white"
                  >
                    <Icon className="h-4 w-4 text-[#d0bcff]" aria-hidden="true" />
                    <span className="truncate">{social.label}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Contact Form */}
        <div className="lg:col-span-7">
          <div className="glass-panel rounded-3xl p-6 sm:p-8">
            {submitted ? (
              <div className="flex min-h-[360px] flex-col items-center justify-center text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/40 bg-cyan-400/15 text-[#4cd7f6]">
                  <Check className="h-7 w-7" aria-hidden="true" />
                </div>
                <h3 className="mt-5 font-display text-2xl font-semibold text-white">
                  Message Received
                </h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-[#cbc3d7]">
                  Thanks for reaching out, {name}. Your inquiry regarding{' '}
                  <span className="text-white">{projectType}</span> is ready and I will reply to{' '}
                  <span className="text-[#4cd7f6]">{email}</span> shortly.
                </p>
                <button
                  type="button"
                  onClick={handleReset}
                  className="mt-6 inline-flex min-h-[44px] items-center justify-center rounded-full px-6 py-2.5 text-sm font-semibold text-white cta-secondary cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-medium text-[#cbc3d7]"
                    >
                      Your Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Alex Rivera"
                      required
                      className="mt-2 w-full rounded-xl border border-white/12 bg-[#070814]/85 px-4 py-3 text-sm text-white placeholder-[#958ea0] shadow-inner transition-colors focus:border-[#06B6D4] focus:outline-none focus:ring-2 focus:ring-[#06B6D4]/25"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-medium text-[#cbc3d7]"
                    >
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex@studio.com"
                      required
                      className="mt-2 w-full rounded-xl border border-white/12 bg-[#070814]/85 px-4 py-3 text-sm text-white placeholder-[#958ea0] shadow-inner transition-colors focus:border-[#06B6D4] focus:outline-none focus:ring-2 focus:ring-[#06B6D4]/25"
                    />
                  </div>
                </div>

                <div>
                  <span className="block text-xs font-medium text-[#cbc3d7]">
                    Project Focus
                  </span>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {[
                      'UI/UX Design & Frontend',
                      'Design System',
                      '3D Web Experience',
                      'Full-Time Role',
                    ].map((option) => {
                      const active = projectType === option;
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => setProjectType(option)}
                          className={`rounded-xl border px-3.5 py-2 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-cyan-400 ${
                            active
                              ? 'border-[#8B5CF6] bg-[#8B5CF6]/25 text-white'
                              : 'border-white/12 bg-[#070814]/70 text-[#cbc3d7] hover:border-white/25 hover:text-white'
                          }`}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-medium text-[#cbc3d7]"
                  >
                    Project Details
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell me about your product goals, timeline, and what we are building together..."
                    required
                    className="mt-2 w-full resize-none rounded-xl border border-white/12 bg-[#070814]/85 px-4 py-3 text-sm text-white placeholder-[#958ea0] shadow-inner transition-colors focus:border-[#06B6D4] focus:outline-none focus:ring-2 focus:ring-[#06B6D4]/25"
                  />
                </div>

                {error && (
                  <div
                    role="alert"
                    className="flex items-center gap-2 rounded-xl border border-[#ffb4ab]/35 bg-[#93000a]/30 px-4 py-3 text-xs text-[#ffdad6]"
                  >
                    <AlertCircle className="h-4 w-4 shrink-0 text-[#ffb4ab]" aria-hidden="true" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                  <p className="text-xs text-[#958ea0]">
                    Protected · Zero spam, direct studio reply
                  </p>
                  <button
                    type="submit"
                    className="inline-flex min-h-[46px] items-center gap-2.5 rounded-full px-7 py-3 text-sm font-semibold text-white cta-primary whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
                  >
                    <span>Send Message</span>
                    <Send className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
