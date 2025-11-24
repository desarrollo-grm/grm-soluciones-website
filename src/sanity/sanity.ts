import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "no20m7ap",
  dataset: "mocks", // Change to 'production' for live data
  apiVersion: "2024-01-01",
  useCdn: false,
});