import forgeDerby from '../assets/images/FORGE-DERBY.png'
import vaultCourtSneaker from '../assets/images/VAULT-COURT-SNEAKER.png'
import shiftRunner from '../assets/images/SHIFT-RUNNER.png'

export const products = [
  {
    id: 1,
    name: 'Forge Derby',
    price: 575,
    tags: ['work', 'wide', 'fit'],
    availableColor: 'Noir',
    owned: false,
    ownershipNote: null,
    image: forgeDerby,
    description: 'Durable construction with all-day comfort for work.',
  },
  {
    id: 2,
    name: 'Vault Court Sneaker',
    price: 390,
    tags: ['travel', 'wide', 'fit'],
    availableColor: 'Ivory',
    owned: true,
    ownershipNote: 'You own this in Ivory — consider other colors for rotation.',
    image: vaultCourtSneaker,
    description: 'Lightweight and cushioned for travel comfort.',
  },
  {
    id: 3,
    name: 'Shift Runner',
    price: 420,
    tags: ['travel', 'wide', 'fit'],
    availableColor: 'Bone',
    owned: true,
    ownershipNote: 'You own this in Bone — consider other colors for rotation.',
    image: shiftRunner,
    description: 'Breathable and supportive for demanding days.',
  },
]
