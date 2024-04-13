"use client";
import LogosWatermarkOnly from "../../components/logosWatermarkOnly";
import { client } from "../../lib/sanity";
import React, { useEffect, useState, CSSProperties } from 'react';
import { fullSlideshow } from '../../lib/interface';
import styles from "../../page.module.css";
import BackButton from "../../components/backButton";

type BackgroundColor = string | CSSProperties;
type Color = string | CSSProperties;

async function getDataSlideshowSlug(slug: string) {
    const querySlideshow = `
    *[_type == "slideshow" && MainImage.slug.current == '${slug}'] {
        mainTitle,
        backgroundColor,
        textColor,
        MainImage {
          "heroImagePath": asset->url,
          "currentSlug": slug.current,
          slides[] {
            "slideImagePath": image.asset->url,
            "date": date,
            "caption": caption,
            "description": description,
            "descAlign": leftOrRight,
            "key": _key
          }
        }
      }[0]`;

    const data = await client.fetch(querySlideshow);
    return data;
}

export default function SlideShow({ params }: { params: { slug: string } }) {

    const [slides, setSlides] = useState([]);
    const [title, setTitle] = useState('');
    const [backgroundColor, setBackgroundColor] = useState<BackgroundColor>('#FFF5F5');
    const [color, setColor] = useState<Color>('black');
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

    useEffect(() => {
        async function fetchData() {
            try {
                const data: fullSlideshow = await getDataSlideshowSlug(params.slug);
                if (data && data.MainImage.slides && data.mainTitle) {
                    setSlides(data.MainImage.slides);
                    setTitle(data.mainTitle);
                    setBackgroundColor(data.backgroundColor || '#FFF5F5');
                    setColor(data.textColor || 'black');
                }

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        const slideInterval = setInterval(() => {
            setCurrentSlideIndex((prevIndex) =>
                prevIndex === slides.length - 1 ? 0 : prevIndex + 1
            );
        }, 10000); // Change slide every 3 seconds

        return () => clearInterval(slideInterval);
    }, [slides]);

    const goToPreviousSlide = () => {
        setCurrentSlideIndex((prevIndex) =>
            prevIndex === 0 ? slides.length - 1 : prevIndex - 1
        );
    };

    const goToNextSlide = () => {
        setCurrentSlideIndex((prevIndex) =>
            prevIndex === slides.length - 1 ? 0 : prevIndex + 1
        );
    };

    return (
        <>
            <BackButton />
            <LogosWatermarkOnly />
            <div className={styles.slideshowContainer} style={typeof backgroundColor === 'string' ? { backgroundColor } : backgroundColor}>
                <div className={styles.slideTitleContainer}>
                    <p className={`${styles.slideTitle} ${typeof color === 'string' ? styles.textWithColor : styles.textWithCustomColor}`}
                        style={typeof color === 'string' ? { color } : color}>
                        {title} {/*TITLE TEXT*/}
                    </p>
                </div>
                {slides && slides.length > 0 && slides.map((slide, index) => (
                    <div key={slide.key}>
                        <div className={`${styles.slide} ${index === currentSlideIndex ? styles.active : ''}`}>
                            <div className={slide.descAlign === 'left' ? styles.leftContainer : styles.rightContainer}>
                                {slide.descAlign === 'left' && (
                                    <p className={`${styles.descText} ${typeof color === 'string' ? styles.textWithColor : styles.textWithCustomColor}`} style={typeof color === 'string' ? { color } : color}>
                                        {slide.description} {/*DESCRIPTION TEXT for left*/}
                                    </p>
                                )}
                            </div>
                            <div className={styles.imgContainer} onClick={goToNextSlide}>
                                <img className={styles.slideImage} src={slide.slideImagePath} alt={slide.key} />
                                <div className={styles.slideInfo}>
                                    <p className=
                                        {`${styles.dateText} ${typeof color === 'string' ? styles.textWithColor : styles.textWithCustomColor}
                                            ${index === currentSlideIndex ? styles.active : ''}`}
                                        style={typeof color === 'string' ? { color } : color}>
                                        {slide.date} {/*DATE TEXT*/}
                                    </p>
                                    <p className=
                                        {`${styles.captionText} ${typeof color === 'string' ? styles.textWithColor : styles.textWithCustomColor}`}
                                        style={typeof color === 'string' ? { color } : color}>
                                        {slide.caption} {/*CAPTION TEXT*/}
                                    </p>
                                </div>
                            </div>
                            <div className={slide.descAlign === 'right' ? styles.rightContainer : styles.leftContainer}>
                                {slide.descAlign === 'right' && (
                                    <p className={`${styles.descText} ${typeof color === 'string' ? styles.textWithColor : styles.textWithCustomColor}`} style={typeof color === 'string' ? { color } : color}>
                                        {slide.description} {/*DESCRIPTION TEXT for right*/}
                                    </p>
                                )}
                            </div>
                        </div>
                        {/* <div className={styles.dateContainer}>
                            <p className={`${styles.dateText} ${index === currentSlideIndex ? styles.active : ''}`}>{slide.date}</p>
                        </div> */}
                    </div>
                ))}
            </div>
        </>
    );
}