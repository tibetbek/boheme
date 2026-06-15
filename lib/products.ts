export interface Product {
  id: number
  name: string
  category: string
  price: string
  imageUrl: string
  description: string
}

export const products: Product[] = [
  {
    id: 1,
    name: 'Morning Ritual Oil',
    category: 'Facial Oil',
    price: '€68',
    imageUrl: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600&q=80&fit=crop',
    description: 'A luminous blend of rosehip, sea buckthorn, and neroli for radiant morning skin.',
  },
  {
    id: 2,
    name: 'Stone & Clay Mask',
    category: 'Face Mask',
    price: '€54',
    imageUrl: 'https://images.unsplash.com/photo-1599305090598-fe179d501227?w=600&q=80&fit=crop',
    description: 'Kaolin and bentonite draw out impurities while minerals restore natural balance.',
  },
  {
    id: 3,
    name: 'Forest Bath Serum',
    category: 'Serum',
    price: '€92',
    imageUrl: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=80&fit=crop',
    description: 'Shinrin-yoku in a bottle — adaptogenic forest extracts for antioxidant defence.',
  },
  {
    id: 4,
    name: 'Grounding Body Butter',
    category: 'Body Care',
    price: '€46',
    imageUrl: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&q=80&fit=crop',
    description: 'Shea, mango, and vetiver ground the body and deeply nourish dry skin.',
  },
  {
    id: 5,
    name: 'Ceremonial Cacao',
    category: 'Adaptogen',
    price: '€38',
    imageUrl: 'https://images.unsplash.com/photo-1606914501449-5a96b6ce24ca?w=600&q=80&fit=crop',
    description: 'Raw ceremonial-grade cacao with reishi and ashwagandha for sacred morning ritual.',
  },
  {
    id: 6,
    name: 'Sleep Tonic',
    category: 'Herbal Drops',
    price: '€44',
    imageUrl: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600&q=80&fit=crop',
    description: 'Valerian, passionflower, and lavender tincture for deep, restorative sleep.',
  },
]
