"use client";
import Logos from "./components/logos";
import Hero from "./components/hero";
import Prologue from "./components/prologue";
import Navbar from "./components/navbar";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Home() {

  const container = useRef();
  useGSAP(() => {

    gsap.registerPlugin(ScrollTrigger);

    gsap.to(".hero-section", {
      opacity: 1,
      duration: 1
    });

    gsap.to(".rotating-hero-div", {
      scrollTrigger: {
        trigger: ".after-hero",
        // markers: true,
        scrub: 2,
        start: "50% 80%",
        end: "bottom top",
      },
      opacity: 0,
      duration: 1.5
    });

    gsap.from(".prologue-svg", {
      scrollTrigger: {
        trigger: ".after-hero",
        // markers: true,
        scrub: 2,
        start: "90% 50%",
        end: "bottom top",
      },
      opacity: 0,
      duration: 1.5
    });

    gsap.from(".nav-div", {
      scrollTrigger: {
        trigger: ".after-prologue",
        // markers: true,
        scrub: 2,
        start: "80% 65%",
        end: "bottom 50%",
      },
      opacity: 0,
      duration: 1.5
    });

    gsap.to(".logo-svg", {
      scrollTrigger: {
        trigger: ".prologue-section",
        // markers: true,
        scrub: 2,
        start: "50% 50%",
        end: "50% top",
      },
      opacity: 1,
      duration: 1.5
    });

    gsap.to(".full-logo-svg", {
      scrollTrigger: {
        trigger: ".prologue-section",
        // markers: true,
        scrub: 2,
        start: "50% 50%",
        end: "50% top",
      },
      opacity: 1,
      duration: 1.5
    });
  }, { scope: container });

  return (
    <main ref={container}>
      <Logos />
      <Hero />
      <div className="small-space after-hero"></div>
      <Prologue />
      <div className="small-space after-prologue"></div>
      <Navbar />
      <div className="space after-nav"></div>
      <div className="small-space"></div>
    </main>
  );
}
