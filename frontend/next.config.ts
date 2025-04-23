// import type { NextConfig } from 'next';
/** @type {import('next').NextConfig} */

import withPWA from 'next-pwa';

const nextConfig = {
  /* config options here */
  images: {
    // remotePatterns: [new URL('https://assets.example.com/account123/**')],
    domains: ['api.qrserver.com'], // for QR code
  },
};

// require 이용????
const nextPWA = withPWA({
  dest: 'public',
});

export default nextPWA(nextConfig);

/*
  middleware 이용하게되면 추후에 pwa 관련해서 고려하기
    https://all-dev-kang.tistory.com/entry/Next-Next-14-app-router%EC%97%90%EC%84%9C-PWA%EA%B0%80-%EB%90%A0%EA%B9%8C
*/
