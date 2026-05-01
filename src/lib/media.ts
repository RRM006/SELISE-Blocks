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

  const response = await fetch(`${BASE_URL}/media/v1/upload`, {
    method: 'POST',
    headers,
    body: formData,
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({ error: 'Upload failed' }));
    throw new Error(err.message || err.error || 'Upload failed');
  }

  const data: MediaUploadResponse = await response.json();

  // Return the URL - check common response field names
  return data.url || data.fileUrl || data.publicUrl || '';
};
