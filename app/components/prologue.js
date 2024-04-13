"use client";
import { client } from "../lib/sanity";

async function getData() {
  const query = `
  *[_type == "prologue"] {
    lineOne,
      lineTwo,
      lineThree,
      lineFour
  }`;

  const data = await client.fetch(query);
  return data;
}

export default async function Prologue() {

    const data = await getData();

    return (
        <section className="prologue-section">
            <div className="prologue-svg">
                <p>{data[0].lineOne}</p>
                <p>{data[0].lineTwo}</p>
                <p>{data[0].lineThree}</p>
                <p>{data[0].lineFour}</p>
            </div>
        </section>
    )
}