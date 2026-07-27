"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
  FaFacebookF,
} from "react-icons/fa";

import { RiTwitterXFill } from "react-icons/ri";

import styles from "./SocialSidebar.module.css";

const socials = [
  {
    icon: FaLinkedinIn,
    href: "https://linkedin.com",
    label: "LinkedIn",
  },
  {
    icon: FaInstagram,
    href: "https://instagram.com",
    label: "Instagram",
  },
  {
    icon: RiTwitterXFill,
    href: "https://x.com",
    label: "X",
  },
  {
    icon: FaYoutube,
    href: "https://youtube.com",
    label: "YouTube",
  },
  {
    icon: FaFacebookF,
    href: "https://facebook.com",
    label: "Facebook",
  },
];

export default function SocialSidebar() {
  return (
    <motion.div
      className={styles.sidebar}
      initial={{ x: -70, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{
        duration: 0.7,
        ease: "easeOut",
      }}
    >
      {socials.map(({ icon: Icon, href, label }, index) => (
        <motion.div
          key={label}
          initial={{ x: -25, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            delay: index * 0.1,
          }}
        >
          <Link
            href={href}
            target="_blank"
            className={styles.icon}
            aria-label={label}
          >
            {console.log(label, Icon)}
<Icon size={24} strokeWidth={2} />
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}