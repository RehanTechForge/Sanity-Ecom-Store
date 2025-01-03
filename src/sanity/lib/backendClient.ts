import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

console.log("projectId", process.env.SANITY_API_TOKEN);

// if (!process.env.SANITY_API_TOKEN) {
//   throw new Error(
//     "The environment variable SANITY_API_TOKEN is missing. Please add it to .env.local"
//   );
// }

export const backendClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
  token: process.env.SANITY_API_TOKEN,
});
