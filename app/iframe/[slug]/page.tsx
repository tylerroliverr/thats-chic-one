"use client";
import LogosUniversal from "../../components/logosUniversal";
import { client } from "../../lib/sanity";
import React, { useEffect, useState } from 'react';
import { iFrame } from '../../lib/interface';
import styles from "../../page.module.css";
import BackButton from "../../components/backButton";

async function getIFrameData(slug: string) {
    const iframeData = `
    *[_type == "iframe" && MainImage.slug.current == '${slug}'] {
        MainImage {
            "iframelink": iFrameLink,
            "imagePath": asset -> url,
            "currentSlug": slug.current
        }
      }[0]`;

    const data = await client.fetch(iframeData);
    return data;
}

export default function Iframe({ params }: { params: { slug: string } }) {

    const [iframe, setIframe] = useState('');

    useEffect(() => {
        async function fetchData() {
            try {
                const data: iFrame = await getIFrameData(params.slug);
                if (data && data.MainImage) {
                    setIframe(data.MainImage.iframelink);
                    console.log(data.MainImage);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchData();
    }, []);

    return (
        <>
            <BackButton />
            <LogosUniversal />
            <div className={styles.iFrameContainer}>
                <iframe className={styles.iFrameContent} src={iframe}></iframe>
            </div>
        </>
    );
}