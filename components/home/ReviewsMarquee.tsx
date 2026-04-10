"use client";

import { useEffect, useRef, useState } from "react";

type Review = {
  author: string;
  initials: string;
  rating: number;
  date_relative?: string;
  date?: string;
  text: string;
};

const FALLBACK: Review[] = [
  { author: "Jan P.", initials: "JP", rating: 5, date_relative: "před rokem", text: "Profesionální přístup, jasná doporučení." },
  { author: "Marie K.", initials: "MK", rating: 5, date_relative: "před rokem", text: "Komplexní pohled na osobní i firemní finance." },
  { author: "Lucie V.", initials: "LV", rating: 5, date_relative: "před rokem", text: "Spolupráce na hypotéce byla bez stresu." },
];

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

function ReviewCard({ r }: { r: Review }) {
  const stars = "★".repeat(r.rating || 5);
  const quote = (r.text || "").replace(/^["„]|[""]$/g, "");
  return (
    <article className="review-scroll-card">
      <div className="review-scroll-stars">{stars}</div>
      <p className="review-scroll-quote">{quote}</p>
      <div className="review-scroll-footer">
        <div className="review-scroll-avatar">{r.initials || "?"}</div>
        <div className="review-scroll-meta">
          <h4>{r.author || ""}</h4>
          <span>{r.date_relative || r.date || "Google recenze"}</span>
        </div>
        <div className="review-scroll-google">
          <GoogleIcon />
        </div>
      </div>
    </article>
  );
}

function Track({ id, reviews, ariaHidden }: { id: string; reviews: Review[]; ariaHidden?: boolean }) {
  return (
    <div className="marquee-track animate-marquee" id={id} aria-hidden={ariaHidden}>
      {reviews.map((r, i) => (
        <ReviewCard key={`${id}-${i}-${r.author}`} r={r} />
      ))}
    </div>
  );
}

export function ReviewsMarquee() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/data/reviews-marek.json");
        if (res.ok) {
          const d = (await res.json()) as Review[];
          if (!cancelled && Array.isArray(d) && d.length) {
            setReviews(d);
            return;
          }
        }
      } catch {
        /* use fallback */
      }
      if (!cancelled) setReviews(FALLBACK);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!reviews.length || !marqueeRef.current) return;
    const refMarquee = marqueeRef.current.closest(".reference-marquee");
    if (!refMarquee) return;
    const marqueeEl = refMarquee;

    function pauseMarquee() {
      marqueeEl.classList.add("marquee-paused");
    }
    function resumeMarquee() {
      marqueeEl.classList.remove("marquee-paused");
    }

    const cards = marqueeEl.querySelectorAll(".review-scroll-card");
    cards.forEach((c) => {
      c.addEventListener("mouseenter", pauseMarquee);
      c.addEventListener("mouseleave", resumeMarquee);
    });
    return () => {
      cards.forEach((c) => {
        c.removeEventListener("mouseenter", pauseMarquee);
        c.removeEventListener("mouseleave", resumeMarquee);
      });
    };
  }, [reviews]);

  if (!reviews.length) return null;

  return (
    <div className="marquee-viewport" ref={marqueeRef}>
      <div className="marquee-wrapper">
        <Track id="reviews-scroll" reviews={reviews} />
        <Track id="reviews-scroll-dup" reviews={reviews} ariaHidden />
      </div>
    </div>
  );
}
