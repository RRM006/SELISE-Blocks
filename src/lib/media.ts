import { useAuthStore } from '@/state/store/auth';

const BASE_URL = import.meta.env.VITE_BLOCKS_API_URL || import.meta.env.VITE_API_BASE_URL || 'https://api.seliseblocks.com';
const projectKey = import.meta.env.VITE_BLOCKS_KEY || import.meta.env.VITE_X_BLOCKS_KEY || '';

export interface MediaUploadResponse {
  url?: string;
  fileUrl?: string;
  publicUrl?: string;
  [key: string]: any;
}

export const uploadMedia = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);

  const token = useAuthStore.getState().accessToken;

  const headers: Record<string, string> = {
    'x-blocks-key': projectKey,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // Try multiple possible endpoints
  const endpoints = [
    `${BASE_URL}/media/v1/upload`,
    `${BASE_URL}/v1/media/upload`,
    `https://dotved-dzcgr.seliseblocks.com/media/v1/upload`,
  ];

  let lastError: Error | null = null;

  for (const endpoint of endpoints) {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers,
        body: formData,
      });

      if (response.ok) {
        const data: MediaUploadResponse = await response.json();
        return data.url || data.fileUrl || data.publicUrl || '';
      }
      
      const err = await response.json().catch(() => ({ error: 'Upload failed' }));
      lastError = new Error(err.message || err.error || `Upload failed: ${response.status}`);
    } catch (e: any) {
      lastError = e;
    }
  }

  // If we get here, all endpoints failed
  console.error('Media upload failed:', lastError?.message);
  throw lastError || new Error('Media upload failed - check if Media Block is enabled in Selise dashboard');
};
