"use client";
import React, { useEffect, useState } from 'react';
import getMemoriesData from './getMemoriesData';
import getStoryData from './getMemoriesStoryData';
import getFrameData from './iframeData';
import Link from 'next/link';
import Image from 'next/image';

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function isSafariOnMac() {
    const userAgent = navigator.userAgent.toLowerCase();
    return userAgent.includes('macintosh') && /safari/.test(userAgent) && !/chrome|android/.test(userAgent);
}

const OriginalRGBA = {
    red: 20,
    green: 40,
    blue: 210,
    alpha: 1
};

// Calculate the normalized RGBA values
const NormalizedRGBA = {
    r: OriginalRGBA.red / 255,
    g: OriginalRGBA.green / 255,
    b: OriginalRGBA.blue / 255,
    a: OriginalRGBA.alpha / 255
};

const FeFuncElements = () => {
    const feFuncElements = ['R', 'G', 'B', 'A'].map(component => {
        const tagName = `feFunc${component}`;
        return React.createElement(tagName, {
            key: component,
            type: 'table',
            tableValues: `${NormalizedRGBA[component.toLowerCase()]} 1`
        });
    });

    return feFuncElements;
};

const Memories = () => {

    const slideFromLeft = () => {
        const chaosFeed = document.getElementById('memories-feed');
        const sanityFeed = document.getElementById('memories-feed-sanity');
        // chaosFeed.classList.add('active');
        sanityFeed.classList.add('active');
    };

    const [slides, setSlides] = useState([]);
    const [stories, setStories] = useState([]);
    const [iframe, setIframe] = useState([]);


    useEffect(() => {
        async function fetchData() {
            try {
                let dataSlideshow = await getMemoriesData();
                let dataStories = await getStoryData();
                let iframe = await getFrameData();
                let slideshowData = dataSlideshow.map(item => item.MainImage);
                let storyData = dataStories.map(item => item.MainImage);
                let iframeData = iframe.map(item => item.MainImage);
                if (dataSlideshow && dataStories && slideshowData && storyData && iframeData && iframe) {
                    setSlides(slideshowData);
                    setStories(storyData);
                    setIframe(iframeData);
                    shuffleArray(slideshowData, storyData, iframeData);
                    slideFromLeft();
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchData();
    }, []);

    return (
        <main>
            <div>
                <div className='super-small-space'></div>
                <div id='memories-feed-sanity'>
                    {stories && stories.length > 0 && stories.map((story, index) => (
                        <div key={index}>
                            <Link href={`/storyContainer/${story.currentSlug}`}>
                                <div className={!isSafariOnMac ? 'memories-image-wrapper-no-filter' : 'memories-image-wrapper'}>
                                    <Image priority={true} sizes='80vw' fill className='memories-feed-img' src={story.heroImagePath} alt={story.currentSlug} />
                                </div>
                            </Link>
                        </div>
                    ))}

                    {slides && slides.length > 0 && slides.map((slide, index) => (
                        <div key={index}>
                            <Link href={`/slideshow/${slide.currentSlug}`}>
                                <div className={!isSafariOnMac ? 'memories-image-wrapper-no-filter' : 'memories-image-wrapper'}>
                                    <Image priority={true} sizes='80vw' fill className='memories-feed-img' src={slide.heroImagePath} alt={slide.currentSlug} />
                                </div>
                            </Link>
                        </div>
                    ))}

                    {iframe && iframe.length > 0 && iframe.map((iframe, index) => (
                        <div key={index}>
                            <Link href={`/iframe/${iframe.currentSlug}`}>
                                <div className={!isSafariOnMac ? 'memories-image-wrapper-no-filter' : 'memories-image-wrapper'}>
                                    <Image priority={true} sizes='80vw' fill className='memories-feed-img' src={iframe.imagePath} alt={iframe.currentSlug} />
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
                <svg>
                    <defs>
                        <filter id="duotone">
                            <feColorMatrix type="matrix" result="grayscale" values="1 0 0 0 0
                        1 0 0 0 0
                        1 0 0 0 0
                        0 0 0 1 0">
                            </feColorMatrix>
                            <feComponentTransfer colorInterpolationFilters="sRGB" result="duotone" id="duotone-component">
                                <FeFuncElements />
                            </feComponentTransfer>
                        </filter>
                    </defs>
                </svg>
            </div>
        </main>
    );
};

export default Memories;