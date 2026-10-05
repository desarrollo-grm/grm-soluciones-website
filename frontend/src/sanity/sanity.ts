import { createClient } from "next-sanity";
import imageUrlBuilder from '@sanity/image-url'
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "no20m7ap",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});

const builder = imageUrlBuilder(client)

export function urlFor(source: unknown) {
  return builder.image(source)
}