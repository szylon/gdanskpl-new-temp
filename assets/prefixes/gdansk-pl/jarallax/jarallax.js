


// ./assets/main/js/jarallax.defer.js
export default async function initJarallax(nodes) {
    
    // Optional video extension
jarallaxVideo();

  const { jarallax } = await import('jarallax');
  jarallax(nodes, { speed: 0.2 });
  
}