import Replicate from 'replicate';
import { createApi } from 'unsplash-js';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

const unsplash = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY || '',
});

export async function generateImage(prompt: string) {
  try {
    const output = await replicate.run(
      "stability-ai/stable-diffusion:db21e45d3f7023abc2a46ee38a23973f6dce16bb082a930b0c49861f96d1e5bf",
      {
        input: {
          prompt,
          num_outputs: 1,
          guidance_scale: 7.5,
          num_inference_steps: 50,
        },
      }
    );
    return output;
  } catch (error) {
    console.error('Error generating image:', error);
    return null;
  }
}

export async function searchStockPhotos(query: string) {
  try {
    const result = await unsplash.search.getPhotos({
      query,
      perPage: 10,
      orientation: 'landscape',
    });
    
    if (result.errors) {
      console.error('Error searching Unsplash:', result.errors);
      return [];
    }
    
    return result.response.results.map(photo => ({
      url: photo.urls.regular,
      thumb: photo.urls.thumb,
      alt: photo.alt_description,
      photographer: photo.user.name,
      photographerUrl: photo.user.links.html,
    }));
  } catch (error) {
    console.error('Error searching stock photos:', error);
    return [];
  }
}
