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
            <dt>Visit</dt>
            <dd>Innovation Block, Campus</dd>
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
    </section>
  )
}
