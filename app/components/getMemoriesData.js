import { client } from "../lib/sanity";

async function getData() {
  const query = `
  *[_type == "slideshow"] {
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
  }`;

  const data = await client.fetch(query);
  return data;
}

export default async function getMemoriesData() {
  const data = await getData();
  return data;
}