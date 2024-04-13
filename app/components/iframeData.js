import { client } from '../lib/sanity';

async function getData() {
    const query = `
    *[_type == "iframe"] {
      MainImage {
        "iframelink": iFrameLink,
        "imagePath": asset -> url,
        "currentSlug": slug.current
      }
    }`;

  const data = await client.fetch(query);
  return data;
}

export default async function getFrameData() {
    const data = await getData();
    return data;
}