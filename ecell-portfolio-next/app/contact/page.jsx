'use client'

import { useState } from 'react'
import styles from './contact.module.css'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  function handleChange(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    // Wire this up to your backend/email service of choice.
    setSubmitted(true)
  }

  return (
    <section className={`section container ${styles.contact}`}>
      <div className={styles.intro}>
        <span className="eyebrow">Get in touch</span>
        <h1 className={styles.title}>Let&rsquo;s talk about what you&rsquo;re building.</h1>
        <p className={styles.lede}>
          Applying for membership, pitching an idea, or looking to partner with E-Cell —
          this reaches our board directly.
        </p>

        <dl className={styles.details}>
          <div>
            <dt>Email</dt>
            <dd>
              <a href="mailto:hello@ecell.club">hello@ecell.club</a>
            </dd>
          </div>
          <div>
            <dt>Phone</dt>
            <dd>
              <a href="tel:+911234567890">+91 123 456 7890</a>
            </dd>
          </div>
          <div>
            <dt>Visit</dt>
            <dd>Innovation Block, Campus</dd>
          </div>
          <div>
            <dt>Hours</dt>
            <dd>Mon - Fri: 9:00 AM - 6:00 PM</dd>
          </div>
        </dl>
      </div>

      {!submitted ? (
        <form className={`card ${styles.form}`} onSubmit={handleSubmit}>
          <label className={styles.field}>
            <span>Name</span>
            <input
              type="text"
              required
              placeholder="Your name"
              value={form.name}
              onChange={handleChange('name')}
            />
          </label>
          <label className={styles.field}>
            <span>Email</span>
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange('email')}
            />
          </label>
          <label className={styles.field}>
            <span>Message</span>
            <textarea
              rows={5}
              required
              placeholder="What are you building?"
              value={form.message}
              onChange={handleChange('message')}
            />
          </label>
          <button type="submit" className="btn btn-primary">
            Send message
          </button>
        </form>
      ) : (
        <div className={`card ${styles.form} ${styles.success}`}>
          <h3>Message sent.</h3>
          <p>Someone from the board will get back to you within a couple of days.</p>
        </div>
      )}

      {/* Google Map Section */}
      <div className={styles.mapSection}>
        <span className="eyebrow">Find Us</span>
        <h3 className={styles.mapTitle}>Our Location</h3>
        <div className={styles.mapContainer}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.5!2d77.2066!3d28.6139!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x52c2b7494e204d19!2sNoida%20Institute%20of%20Technology%20and%20Engineering!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
            width="100%"
            height="400"
            style={{ border: 0, borderRadius: 'var(--radius-md)' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="E-Cell NIET Location"
          />
        </div>
        <a
          href="https://www.google.com/maps/search/?api=1&query=Noida+Institute+of+Technology+and+Engineering"
          target="_blank"
          rel="noreferrer"
          className={`btn btn-ghost ${styles.directionsBtn}`}
        >
          Get Directions
        </a>
      </div>
    </section>
  )
}
