import { client } from '../lib/sanity';

async function getData() {
    const query = `
    *[_type == "slideshow-test"] {
        mainTitle,
    MainImage {
      "heroImagePath": asset->url,
      "currentSlug": slug.current,
      slides[] {
        "slideImagePath": image.asset->url,
        "key": _key
      }
    }
  }`;

  const data = await client.fetch(query);
  return data;
}

export default async function getStoryData() {
    const data = await getData();
    return data;
}