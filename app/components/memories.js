"use client";
import React, { useEffect, useState } from 'react';
import getMemoriesData from './getMemoriesData';
import getStoryData from './getMemoriesStoryData';
import getFrameData from './iframeData';
import Link from 'next/link';

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

    // const [images, setImages] = useState([]);

    // useEffect(() => {
    //     const fetchImages = async () => {
    //         let imagesFromMemories = memoriesImages[0].images;
    //         imagesFromMemories = shuffleArray(imagesFromMemories);

    //         if (isSafariOnMac()) {
    //             imagesFromMemories = imagesFromMemories.map(image => ({
    //                 ...image,
    //                 filterClass: 'memories-image-wrapper-no-filter'
    //             }));
    //         }

    //         setImages(imagesFromMemories);
    //         slideFromLeft();
    //     };

    //     fetchImages();
    // }, []);

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
                            <div className={story.filterClass || 'memories-image-wrapper'}>
                                <Link href={`/storyContainer/${story.currentSlug}`}>
                                    <img className='memories-feed-img' src={story.heroImagePath} alt={story.currentSlug} />
                                </Link>
                            </div>
                        </div>
                    ))}
                    {slides && slides.length > 0 && slides.map((slide, index) => (
                        <div key={index}>
                            <div className={slide.filterClass || 'memories-image-wrapper'}>
                                <Link href={`/slideshow/${slide.currentSlug}`}>
                                    <img className='memories-feed-img' src={slide.heroImagePath} alt={slide.currentSlug} />
                                </Link>
                            </div>
                        </div>
                    ))}
                        {iframe && iframe.length > 0 && iframe.map((iframe, index) => (
                        <div key={index}>
                            <div className={iframe.filterClass || 'memories-image-wrapper'}>
                                <Link href={`/iframe/${iframe.currentSlug}`}>
                                    <img className='memories-feed-img' src={iframe.imagePath} alt={iframe.currentSlug} /> {/*alt needs to slug????*/}
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
                {/* <div id="memories-feed">
                    {images.map((image, index) => (
                        <div key={index} className="memories-image-box">
                            <div className={image.filterClass || 'memories-image-wrapper'}>
                                <img src={image.path} alt="Image from Memories" className="memories-feed-img" />
                            </div>
                        </div>
                    ))}
                </div> */}
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

const memoriesImages = [
    {
        name: "memories",
        images: [
            { path: "/images/Memories-Thats-Chic/FIRST.webp", text: "unsure" },
            { path: "/images/Memories-Thats-Chic/1 (1).jpg", text: "unsure" },
            { path: "/images/Memories-Thats-Chic/1 (2).jpg", text: "unsure" },
            { path: "/images/Memories-Thats-Chic/1 (3).jpg", text: "unsure" },
            { path: "/images/Memories-Thats-Chic/1 (4).jpg", text: "unsure" },
            { path: "/images/Memories-Thats-Chic/1 (5).jpg", text: "unsure" },
            { path: "/images/Memories-Thats-Chic/1 (6).jpg", text: "unsure" },
            { path: "/images/Memories-Thats-Chic/1 (7).jpg", text: "unsure" },
            { path: "/images/Memories-Thats-Chic/1 (8).jpg", text: "unsure" },
            { path: "/images/Memories-Thats-Chic/1 (9).jpg", text: "unsure" },
            { path: "/images/Memories-Thats-Chic/1 (10).jpg", text: "unsure" },
            { path: "/images/Memories-Thats-Chic/1 (11).jpg", text: "unsure" },
            { path: "/images/Memories-Thats-Chic/1 (12).jpg", text: "unsure" },
            { path: "/images/Memories-Thats-Chic/1 (13).jpg", text: "unsure" },
            { path: "/images/Memories-Thats-Chic/1 (14).jpg", text: "unsure" },
            { path: "/images/Memories-Thats-Chic/1 (15).jpg", text: "unsure" },
            { path: "/images/Memories-Thats-Chic/1 (16).jpg", text: "unsure" },
            { path: "/images/Memories-Thats-Chic/1 (17).jpg", text: "unsure" },
            { path: "/images/Memories-Thats-Chic/1 (18).jpg", text: "unsure" },
            { path: "/images/Memories-Thats-Chic/1 (19).jpg", text: "unsure" },
            { path: "/images/Memories-Thats-Chic/1 (20).jpg", text: "unsure" },
            { path: "/images/Memories-Thats-Chic/1 (21).jpg", text: "unsure" },
            { path: "/images/Memories-Thats-Chic/1 (22).jpg", text: "unsure" },
            { path: "/images/Memories-Thats-Chic/1 (23).jpg", text: "unsure" },
            { path: "/images/Memories-Thats-Chic/1 (24).jpg", text: "unsure" },
            { path: "/images/Memories-Thats-Chic/1 (25).jpg", text: "unsure" },
            { path: "/images/Memories-Thats-Chic/1 (26).jpg", text: "unsure" },
            { path: "/images/Memories-Thats-Chic/1 (27).jpg", text: "unsure" },
            { path: "/images/Memories-Thats-Chic/1 (28).jpg", text: "unsure" },
            { path: "/images/Memories-Thats-Chic/1 (29).jpg", text: "unsure" },
            { path: "/images/Memories-Thats-Chic/1 (30).jpg", text: "unsure" },
            { path: "/images/Memories-Thats-Chic/1 (31).jpg", text: "unsure" },
            { path: "/images/Memories-Thats-Chic/1 (32).jpg", text: "unsure" },
            { path: "/images/Memories-Thats-Chic/1 (33).jpg", text: "unsure" },
            { path: "/images/Memories-Thats-Chic/1 (34).jpg", text: "unsure" },
            { path: "/images/Memories-Thats-Chic/1 (35).jpg", text: "unsure" },
            { path: "/images/Memories-Thats-Chic/1 (36).jpg", text: "unsure" },
            { path: "/images/Memories-Thats-Chic/1 (37).jpg", text: "unsure" },
            { path: "/images/Memories-Thats-Chic/1 (38).jpg", text: "unsure" },
            { path: "/images/Memories-Thats-Chic/1 (39).jpg", text: "unsure" },
            { path: "/images/Memories-Thats-Chic/1 (40).jpg", text: "unsure" },
            { path: "/images/Memories-Thats-Chic/1 (41).jpg", text: "unsure" }
        ]
    }
];