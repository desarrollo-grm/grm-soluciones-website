import { createClient } from "next-sanity";
import imageUrlBuilder from '@sanity/image-url'
import type { Image } from "sanity"

export const client = createClient({
  projectId: "no20m7ap",
  dataset: "mocks", // Change to 'production' for live data
  apiVersion: "2024-01-01",
  useCdn: false,
});

const builder = imageUrlBuilder(client)

export function urlFor(source: Image) {
  return builder.image(source)
}