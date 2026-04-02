import zenithPro from '../assets/images/Zenith-Pro.png'
import ruMax350 from '../assets/images/RU-MAX-350.png'
import airscSpeedcross from '../assets/images/AIRSC-SPEEDCROSSS.png'

export const products = [
  {
    id: 1,
    name: 'Zenith Pro',
    category: 'Performance Running Shoes',
    price: 135,
    image: zenithPro,
    inStock: true,
    material: 'Premium leather',
    weight: '310g',
    bestFor: 'Gym & streetwear',
    agentAdvice: 'Fits small, order 0.5 size up',
  },
  {
    id: 2,
    name: 'RU MAX 350',
    category: 'Performance Running Shoes',
    price: 128,
    image: ruMax350,
    inStock: true,
    material: 'Engineered mesh',
    weight: '730g',
    bestFor: 'Work & outdoor',
    agentAdvice: 'True to size, excellent durability',
  },
  {
    id: 3,
    name: 'AIRSC SPEEDCROSSS',
    category: 'Performance Running Shoes',
    price: 150,
    image: airscSpeedcross,
    inStock: true,
    material: null,
    weight: null,
    bestFor: null,
    agentAdvice: null,
  },
]
