"use client";
import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link'; // Import Link from Next.js

const Navbar = () => {
    const hoverContainerRef = useRef(null);
    const hoverFixedContainerRef = useRef(null);
    const memoriesHoverTextRef = useRef(null);
    const chaosHoverTextRef = useRef(null);
    const systemHoverTextRef = useRef(null);
    const memoriesHoveredImageRef = useRef(null);
    const chaosHoveredImageRef = useRef(null);
    const systemHoveredImageRef = useRef(null);
    const memoriesActiveTextRef = useRef(null);
    const [listenersAdded, setListenersAdded] = useState(false);

    const handleMouseMove = (event, imageElementRef) => {
        const hoverContainer = hoverContainerRef.current;
        const hoverFixedContainer = hoverFixedContainerRef.current;
        const x = event.clientX;
        const y = event.clientY;

        hoverContainer.style.transform = `translate(${x - hoverContainer.clientWidth / 2}px, ${y - hoverContainer.clientHeight / 2}px)`;

        clearTimeout(handleMouseMove.leaveTimeout); // clear to prevent 'stuck' images
        handleMouseMove.leaveTimeout = setTimeout(() => {
            // to allow for center hover popup (instead of top and left 0)
            hoverFixedContainer.style.left = '0';
            hoverFixedContainer.style.top = '0';
            hoverFixedContainer.style.visibility = 'visible';
            imageElementRef.current.style.visibility = 'visible';
            imageElementRef.current.style.opacity = '1';
        }, 100);
    };

    const handleMouseLeave = (imageElementRef) => {
        clearTimeout(handleMouseMove.leaveTimeout); // clear to prevent 'stuck' images
        imageElementRef.current.style.visibility = 'hidden';
        imageElementRef.current.style.opacity = '0';
        hoverFixedContainerRef.current.style.visibility = 'hidden';
    };

    const addEventListeners = () => {
        memoriesHoverTextRef.current.addEventListener('mousemove', (event) => handleMouseMove(event, memoriesHoveredImageRef));
        memoriesHoverTextRef.current.addEventListener('mouseleave', () => handleMouseLeave(memoriesHoveredImageRef));

        chaosHoverTextRef.current.addEventListener('mousemove', (event) => handleMouseMove(event, chaosHoveredImageRef));
        chaosHoverTextRef.current.addEventListener('mouseleave', () => handleMouseLeave(chaosHoveredImageRef));

        systemHoverTextRef.current.addEventListener('mousemove', (event) => handleMouseMove(event, systemHoveredImageRef));
        systemHoverTextRef.current.addEventListener('mouseleave', () => handleMouseLeave(systemHoveredImageRef));
    };

    const handleIntersection = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (!listenersAdded) {
                    addEventListeners();
                    setListenersAdded(true);
                }
                memoriesActiveTextRef.current.classList.remove('active');
            }
        });
    };

    useEffect(() => {
        const observer = new IntersectionObserver(handleIntersection, {
            rootMargin: '-1px 0px 0px 0px',
            threshold: [1],
        });

        observer.observe(document.getElementById('sticky-nav'));

        return () => {
            observer.disconnect();
        };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            <div className="nav-div" id="sticky-nav">
                <div className="memories nav-item" id="memories-text" ref={memoriesHoverTextRef}>
                    <Link href="/memories">
                        <p className="nav-text link memories-active-text" ref={memoriesActiveTextRef}>memories</p>
                    </Link>
                </div>
                <div className="line"></div>
                <div className="chaos nav-item" id="chaos-text" ref={chaosHoverTextRef}>
                    <Link href="/chaos">
                        <p className="nav-text link">chaos</p>
                    </Link>
                </div>
                <div className="line"></div>
                <div className="system nav-item" id="system-text" ref={systemHoverTextRef}>
                    <Link href="/systems">
                        <p className="nav-text link">systems</p>
                    </Link>
                </div>
            </div>
            <div className="hover-fixed-container" ref={hoverFixedContainerRef}>
                <div className="hoverContainer" ref={hoverContainerRef}>
                    <img id="memories-hover" className="hoverstate-img" src="/images/memories-hover.webp" alt="" ref={memoriesHoveredImageRef} />
                    <img id="chaos-hover" className="hoverstate-img" src="/images/chaos-hover.png" alt="" ref={chaosHoveredImageRef} />
                    <img id="system-hover" className="hoverstate-img" src="/images/system-hover.webp" alt="" ref={systemHoveredImageRef} />
                </div>
            </div>
        </>
    );
};

export default Navbar;