import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    theme_color: '#e5f4d5',
    background_color: '#e5f4d5',
    orientation: 'any',
    display: 'standalone',
    dir: 'auto',
    lang: 'ko-KR',
    name: 'Cardly',
    short_name: 'Cardly',
    start_url: '/',
    scope: '/',
    icons: [
      {
        src: 'images/icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'images/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
