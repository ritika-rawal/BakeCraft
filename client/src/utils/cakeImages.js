export const CAKE_IMAGES = [
  '/cake-strawberry.png',
  '/cake-black-forest.png',
  '/cake-lavender.png',
  '/dessert-assortment.png',
  '/Cake1.jpg',
  '/cake.jpg',
  '/dashboardcake.jpg',
];

export function cakeImageFor(value = '') {
  const text = String(value).toLowerCase();

  if (text.includes('strawberry') || text.includes('velvet') || text.includes('pink')) {
    return '/cake-strawberry.png';
  }
  if (text.includes('black') || text.includes('dark') || text.includes('chocolate')) {
    return '/cake-black-forest.png';
  }
  if (text.includes('lavender') || text.includes('vanilla') || text.includes('white')) {
    return '/cake-lavender.png';
  }
  if (text.includes('cupcake') || text.includes('mini') || text.includes('dessert')) {
    return '/dessert-assortment.png';
  }

  const index = Math.abs([...text].reduce((sum, char) => sum + char.charCodeAt(0), 0)) % CAKE_IMAGES.length;
  return CAKE_IMAGES[index];
}
