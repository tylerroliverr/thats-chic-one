"use client";
import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const CustomScript = () => {
    // Define event handler functions
    const handleMouseMove = (e) => {
        const customCursor = document.getElementById('custom-cursor');
        const cursorContainer = document.getElementById('cursor-container');
        const x = e.clientX;
        const y = e.clientY;
        customCursor.style.transform = `translate(${x - customCursor.clientWidth / 2}px, ${y - customCursor.clientHeight / 2}px)`;
    };

    const handleMouseLeave = () => {
        const customCursor = document.getElementById('custom-cursor');
        const cursorContainer = document.getElementById('cursor-container');
        customCursor.classList.remove('visible');
        cursorContainer.classList.remove('visible');
        customCursor.classList.add('hidden');
        cursorContainer.classList.add('hidden');
    };

    const handleMouseEnter = () => {
        const customCursor = document.getElementById('custom-cursor');
        const cursorContainer = document.getElementById('cursor-container');
        customCursor.classList.remove('hidden');
        customCursor.classList.add('visible');
        cursorContainer.classList.add('visible');
    };

    // Add other event handler functions here...

    useEffect(() => {

        // Active link logic
        const path = window.location.pathname;
        let activeId;

        if (path.includes("chaos.html")) {
            activeId = "chaos";
        } else if (path.includes("system.html")) {
            activeId = "system";
        }

        if (activeId && document.getElementById(activeId)) {
            document.getElementById(activeId).classList.add("active");
        }
        // Add event listeners
        document.addEventListener('mousemove', handleMouseMove);
        document.documentElement.addEventListener('mouseleave', handleMouseLeave);
        document.documentElement.addEventListener('mouseenter', handleMouseEnter);

        // Register GSAP plugin
        gsap.registerPlugin(ScrollTrigger);

        // GSAP animations with ScrollTrigger
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
        
        gsap.from("#memories-feed", {
            scrollTrigger: {
                trigger: ".before-memories",
                // markers: true,
                scrub: 2,
                start: "top 50%",
                end: "90% 20%",
            },
            opacity: 0,
            duration: 1.5
        });
        
        gsap.from(".logo-svg", {
            scrollTrigger: {
                trigger: ".after-nav",
                // markers: true,
                scrub: 2,
                start: "bottom 30%",
                end: "bottom top",
            },
            opacity: 0,
            duration: 1.5
        });
        
        gsap.from(".full-logo-svg", {
            scrollTrigger: {
                trigger: ".after-nav",
                // markers: true,
                scrub: 2,
                start: "bottom 30%",
                end: "bottom top",
            },
            opacity: 0,
            duration: 1.5
        });

        return () => {
            // Remove event listeners
            // document.removeEventListener('mousemove', handleMouseMove);
            // document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
            // document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, []);

    return null; // Since this component only handles side effects, return null
};

export default CustomScript;