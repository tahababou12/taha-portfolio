import { supabase } from './supabase';

export interface Award {
  id: string;
  title: string;
  organization: string;
  description: string;
  image?: string;
  year?: string;
  full_description?: string;
  link?: string;
  created_at?: string;
  gallery?: GalleryImage[];
}

export interface GalleryImage {
  id: string;
  award_id: string;
  image_url: string;
  display_order: number;
}

/**
 * Fetch all awards from the database with their gallery images
 */
export async function fetchAwards(): Promise<Award[]> {
  // Fetch the awards
  const { data: awards, error } = await supabase
    .from('awards')
    .select('*')
    .order('year', { ascending: false });

  if (error) {
    console.error('Error fetching awards:', error);
    return [];
  }

  // For each award, fetch its gallery images
  const awardIds = awards.map((award: Award) => award.id);
  const { data: galleryImages, error: galleryError } = await supabase
    .from('award_gallery')
    .select('*')
    .in('award_id', awardIds)
    .order('display_order', { ascending: true });

  if (galleryError) {
    console.error('Error fetching gallery images:', galleryError);
  }

  // Group gallery images by award_id
  const galleryByAwardId: Record<string, GalleryImage[]> = {};
  if (galleryImages) {
    galleryImages.forEach((image: GalleryImage) => {
      if (!galleryByAwardId[image.award_id]) {
        galleryByAwardId[image.award_id] = [];
      }
      galleryByAwardId[image.award_id].push(image);
    });
  }

  // Combine awards with their gallery images
  const awardsWithGallery = awards.map((award: Award) => ({
    ...award,
    gallery: galleryByAwardId[award.id] || []
  }));

  return awardsWithGallery;
}

/**
 * Get the URL for an award image, either from Supabase storage or a temporary placeholder
 */
export function getAwardImageUrl(imagePath?: string): string {
  if (!imagePath) {
    return '/images/placeholder-award.jpg'; // Fallback image
  }

  // If this is a full URL, use it directly
  if (imagePath.startsWith('http')) {
    return imagePath;
  }

  // Check if this is from the award-images bucket
  if (imagePath.includes('/award-images/')) {
    return imagePath;
  }

  // If this is a path to a Supabase storage item for old awards
  if (imagePath.startsWith('awards/')) {
    // Use environment variable for Supabase URL
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    return `${supabaseUrl}/storage/v1/object/public/images/${imagePath}`;
  }

  // Otherwise, assume it's a local image path
  return `/images/${imagePath}`;
} 