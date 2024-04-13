"use client";
import LogosUniversal from "../../components/logosUniversal";
import { client } from "../../lib/sanity";
import React, { useEffect, useState } from 'react';
import { fullSlideshow } from '../../lib/interface';
import styles from "../../page.module.css";
import BackButton from "../../components/backButton";

async function getStoryDataSlug(slug: string) {
    const queryStoryData = `
    *[_type == "slideshow-test" && MainImage.slug.current == '${slug}'] {
        mainTitle,
        MainImage {
            "heroImagePath": asset->url,
            "currentSlug": slug.current,
        slides[] {
            "slideImagePath": image.asset->url,
            "key": _key,
            "description": description
            }
        }
    }[0]`;

    const data = await client.fetch(queryStoryData);
    return data;
}

export default function StoryData({ params }: { params: { slug: string } }) {

    const [slides, setSlides] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                let data: fullSlideshow = await getStoryDataSlug(params.slug);
                if (data && data.MainImage.slides) {
                    setSlides(data.MainImage.slides);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchData();
    }, []);

    return (
        <>
            <BackButton/>
            <LogosUniversal />
            {/* <Navbar /> */}
            <div className={styles.storyOuterContainer}>
                {slides && slides.length > 0 && slides.map((slide, index) => (
                    <div key={slide.key} className={`${styles.storyInnerContainer}}`}>
                        <div className={styles.storyTitleWrapper}>
                            <p className={styles.storyTitle}>{slide.description}</p>
                        </div>
                        <img className={styles.storyImage} src={slide.slideImagePath} alt={slide.key} />
                    </div>
                ))}
            </div>
        </>
    );
}