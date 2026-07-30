'use client'

import Image from 'next/image'
import styles from './gallery.module.css'
import { gallery } from '@/data/gallery'

export default function GalleryPage() {
  return (
    <main className="section container">

      <div className={styles.hero}>

        <p className={styles.tag}>
          OUR MEMORIES
        </p>

        <h1 className={styles.title}>
          Gallery
        </h1>

        <p className={styles.subtitle}>
          Moments that define our entrepreneurial journey.
        </p>

      </div>

      <div className={styles.grid}>

        {gallery.map((event)=>(
          <div key={event.id} className={styles.card}>

            <div className={styles.imageContainer}>

              <Image
                src={event.cover}
                fill
                alt={event.title}
                className={styles.image}
              />

            </div>

            <div className={styles.content}>

              <h2>{event.title}</h2>

              <p>{event.description}</p>

              <div className={styles.footer}>

                <span>{event.photos} Photos</span>

                <button className={styles.button}>
                  View Gallery →
                </button>

              </div>

            </div>

          </div>
        ))}

      </div>

    </main>
  )
}