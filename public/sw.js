if(!self.define){let e,s={};const a=(a,n)=>(a=new URL(a+".js",n).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(n,c)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let t={};const r=e=>a(e,i),o={module:{uri:i},exports:t,require:r};s[i]=Promise.all(n.map((e=>o[e]||r(e)))).then((e=>(c(...e),t)))}}define(["./workbox-50de5c5d"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/NjJMD-SFP3gk_7Y03v3xK/_buildManifest.js",revision:"8374f844a27a88c0705db0a343220b64"},{url:"/_next/static/NjJMD-SFP3gk_7Y03v3xK/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/01ce7644.1355b12c43057809.js",revision:"1355b12c43057809"},{url:"/_next/static/chunks/521.6dcb09799107fca0.js",revision:"6dcb09799107fca0"},{url:"/_next/static/chunks/542b50fd.7bf33b273a31548d.js",revision:"7bf33b273a31548d"},{url:"/_next/static/chunks/545-508098bed983d528.js",revision:"508098bed983d528"},{url:"/_next/static/chunks/707.0941aea1634aabbd.js",revision:"0941aea1634aabbd"},{url:"/_next/static/chunks/732-602b6df8098dae14.js",revision:"602b6df8098dae14"},{url:"/_next/static/chunks/790.f6fb8f37bd0375b1.js",revision:"f6fb8f37bd0375b1"},{url:"/_next/static/chunks/9d1c5148.a540ba5dff3ceee6.js",revision:"a540ba5dff3ceee6"},{url:"/_next/static/chunks/framework-9f08df5c28531828.js",revision:"9f08df5c28531828"},{url:"/_next/static/chunks/main-491cd01f7f95d652.js",revision:"491cd01f7f95d652"},{url:"/_next/static/chunks/pages/_app-e747b92b41a5fd20.js",revision:"e747b92b41a5fd20"},{url:"/_next/static/chunks/pages/_error-ddc812f335504fd9.js",revision:"ddc812f335504fd9"},{url:"/_next/static/chunks/pages/account-e9b72acd7645f282.js",revision:"e9b72acd7645f282"},{url:"/_next/static/chunks/pages/index-9b2101a9941db451.js",revision:"9b2101a9941db451"},{url:"/_next/static/chunks/pages/pricing-b06fdeb630792177.js",revision:"b06fdeb630792177"},{url:"/_next/static/chunks/pages/signin-ee3fc0099ca033bf.js",revision:"ee3fc0099ca033bf"},{url:"/_next/static/chunks/pages/subscription-d9a64bb8596c22f0.js",revision:"d9a64bb8596c22f0"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-343a03745734b511.js",revision:"343a03745734b511"},{url:"/_next/static/css/11d49b094f581348.css",revision:"11d49b094f581348"},{url:"/_next/static/media/2aaf0723e720e8b9-s.p.woff2",revision:"e1b9f0ecaaebb12c93064cd3c406f82b"},{url:"/_next/static/media/9c4f34569c9b36ca-s.woff2",revision:"2c1fc211bf5cca7ae7e7396dc9e4c824"},{url:"/_next/static/media/ae9ae6716d4f8bf8-s.woff2",revision:"b0c49a041e15bdbca22833f1ed5cfb19"},{url:"/_next/static/media/b1db3e28af9ef94a-s.woff2",revision:"70afeea69c7f52ffccde29e1ea470838"},{url:"/_next/static/media/b967158bc7d7a9fb-s.woff2",revision:"08ccb2a3cfc83cf18d4a3ec64dd7c11b"},{url:"/_next/static/media/c0f5ec5bbf5913b7-s.woff2",revision:"8ca5bc1cd1579933b73e51ec9354eec9"},{url:"/_next/static/media/d1d9458b69004127-s.woff2",revision:"9885d5da3e4dfffab0b4b1f4a259ca27"},{url:"/favicon.ico",revision:"c30c7d42707a47a3f4591831641e50dc"},{url:"/google-credentials.json",revision:"00efdcb5cd1296c9595ced05b5831332"},{url:"/icon-192x192.png",revision:"8df203a273889ecb1c8f2d715d38489a"},{url:"/icon-256x256.png",revision:"3394013c086e3c0e1f832be60c4ad77f"},{url:"/icon-384x384.png",revision:"c911158dc1eb4b4d441da02196435a35"},{url:"/icon-512x512.png",revision:"a51297a481a0191405e986be033b1559"},{url:"/icons/avatar.png",revision:"b4f53539c59b1a23e4e5141d2e37bd97"},{url:"/icons/avatar_gpt.png",revision:"3a113f9c523ba7135646b63b1a197387"},{url:"/icons/avatar_user.png",revision:"d49fa1f23eb8b26dbac76ff7c791198c"},{url:"/logo.png",revision:"a51297a481a0191405e986be033b1559"},{url:"/manifest.json",revision:"bef48ce10ac4779b6ce0ecdd584752fb"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:n})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
