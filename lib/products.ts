export type Product = {
  id: string
  name: string
  tagline: string
  category: string
  price: number
  image: string
  material: string
  sizes: string[]
  description: string
}

const APPAREL_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

export const featuredProduct: Product = {
  id: 'kuro-hoodie',
  name: 'Kuro Heavyweight Hoodie',
  tagline: 'The flagship pullover. 480gsm loopback cotton, built to outlast seasons.',
  category: 'Hoodie',
  price: 148,
  image: '/products/hoodie.png',
  material: '480gsm Loopback Cotton',
  sizes: APPAREL_SIZES,
  description:
    'Our anchor piece. Cut from heavyweight 480gsm loopback cotton with a boxy, structured fit, a double-lined hood, and ribbed cuffs that hold their shape. Garment-dyed for a deep, lasting black.',
}

export const sideProducts: Product[] = [
  {
    id: 'sen-tee',
    name: 'Sen Boxy Tee',
    tagline: 'Everyday heavyweight staple.',
    category: 'T-Shirt',
    price: 58,
    image: '/products/tee.png',
    material: '240gsm Combed Cotton',
    sizes: APPAREL_SIZES,
    description:
      'A boxy, mid-weight tee with a wide neck rib and drop shoulders. Pre-shrunk 240gsm combed cotton that only gets better with wear.',
  },
  {
    id: 'ronin-cargo',
    name: 'Ronin Cargo Pants',
    tagline: 'Tapered utility, refined.',
    category: 'Pants',
    price: 128,
    image: '/products/cargo.png',
    material: 'Ripstop Cotton Blend',
    sizes: APPAREL_SIZES,
    description:
      'Tapered cargo pants in a durable ripstop cotton blend. Articulated knees, hidden zip pockets, and an adjustable hem for a clean, modern silhouette.',
  },
]

export const carouselProducts: Product[] = [
  {
    id: 'kaze-windbreaker',
    name: 'Kaze Windbreaker',
    tagline: 'Packable, weather-ready.',
    category: 'Jacket',
    price: 158,
    image: '/products/windbreaker.png',
    material: 'Recycled Nylon',
    sizes: APPAREL_SIZES,
    description:
      'A lightweight, packable shell in water-repellent recycled nylon. Sealed seams and a two-way front zip keep the wind out on transitional days.',
  },
  {
    id: 'tetsu-bomber',
    name: 'Tetsu Bomber Jacket',
    tagline: 'Structured MA-1 silhouette.',
    category: 'Jacket',
    price: 218,
    image: '/products/bomber.png',
    material: 'Matte Poly Shell',
    sizes: APPAREL_SIZES,
    description:
      'A modern take on the MA-1 with a matte poly shell, ribbed collar and cuffs, and a utility zip pocket on the sleeve. Insulated for cold-weather layering.',
  },
  {
    id: 'nami-crewneck',
    name: 'Nami Crewneck',
    tagline: 'Heavyweight fleece comfort.',
    category: 'Sweatshirt',
    price: 118,
    image: '/products/crewneck.png',
    material: '400gsm Brushed Fleece',
    sizes: APPAREL_SIZES,
    description:
      'A relaxed crewneck in 400gsm brushed fleece with a soft inner loop. Ribbed hem and cuffs give it a clean, boxy drape.',
  },
  {
    id: 'hoshi-longsleeve',
    name: 'Hoshi Long Sleeve',
    tagline: 'The everyday base layer.',
    category: 'Long Sleeve',
    price: 68,
    image: '/products/longsleeve.png',
    material: '220gsm Cotton',
    sizes: APPAREL_SIZES,
    description:
      'A slim-to-regular long sleeve in 220gsm cotton with a ribbed crew neck. Designed to layer cleanly under any of our jackets.',
  },
  {
    id: 'yoru-beanie',
    name: 'Yoru Beanie',
    tagline: 'Ribbed knit essential.',
    category: 'Headwear',
    price: 42,
    image: '/products/beanie.png',
    material: 'Merino Wool Blend',
    sizes: ['One Size'],
    description:
      'A finely ribbed beanie in a soft merino wool blend. Cuffed for a snug fit with a subtle woven tab at the hem.',
  },
  {
    id: 'kiba-denim',
    name: 'Kiba Denim Jacket',
    tagline: 'Washed black workwear.',
    category: 'Jacket',
    price: 188,
    image: '/products/denim.png',
    material: '13oz Japanese Denim',
    sizes: APPAREL_SIZES,
    description:
      'A structured trucker jacket in 13oz washed Japanese denim. Boxy fit, antique-finish hardware, and chest flap pockets that break in beautifully.',
  },
]

export const allProducts: Product[] = [featuredProduct, ...sideProducts, ...carouselProducts]

export function getProductById(id: string): Product | undefined {
  return allProducts.find((p) => p.id === id)
}
