"use client";
import { client } from "../lib/sanity";
import React, { useEffect, useState } from 'react';
import styles from "../page.module.css";

async function getData() {
    const query = `
  *[_type == "heroSlide"] {
    heroSlides[] {
      "heroImage": asset -> url
    }
  }`;

    const data = await client.fetch(query);
    return data;
}

export default function Hero() {

    const [hero, setHero] = useState([]);
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getData();
                if (data) {
                    setHero(data[0].heroSlides.map(hero => hero.heroImage));
                }
            } catch (err) {
                console.error("Error fetching data:", err);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        const slideInterval = setInterval(() => {
            setCurrentSlideIndex((prevIndex) =>
                prevIndex === hero.length - 1 ? 0 : prevIndex + 1
            );
        }, 10000); // Change slide every 3 seconds

        return () => clearInterval(slideInterval);
    }, [hero]);

    const goToNextSlide = () => {
        setCurrentSlideIndex((prevIndex) =>
            prevIndex === hero.length - 1 ? 0 : prevIndex + 1
        );
    };

    return (
        <section className="hero-section" id="hero-section">
            <div className={styles.rotatingHeroDiv}>
                <img className="hero-logo" src="/images/TCFullLogo.png" alt="" />
                <img className="hero-sub-logo" src="/images/TCMiniLogo.png" alt="" />
                {hero && hero.length > 0 && hero.map((heroSlide, index) => (
                    <div className={`${styles.heroContainer} ${index === currentSlideIndex ? styles.active : ''}`} key={index}>
                        <img className={styles.heroImage} src={heroSlide} />
                    </div>
                ))}
            </div>
        </section>
    )
}
