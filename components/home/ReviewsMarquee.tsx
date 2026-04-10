"use client";

import { useEffect, useRef, useState } from "react";
import { GoogleMark } from "@/components/ui/GoogleMark";

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
          <GoogleMark className="h-6 w-6" />
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
