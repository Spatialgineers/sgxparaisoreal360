import { Property, Lead } from './types';

export const defaultProperties: Property[] = [
  {
    id: '1',
    title: 'Villa del Sol',
    location: 'Isabela',
    stats: '4 Hab | 3 Baños',
    price: 850000,
    status: 'ACTIVO',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80',
    panoUrls: ['https://static.wixstatic.com/media/fe81a7_99eaacdbbbd2480281aed2ddd2da9ff0~mv2.png'],
    views: 142
  },
  {
    id: '2',
    title: 'Dorado Beach Estate',
    location: 'Dorado',
    stats: '5 Hab | 5.5 Baños',
    price: 4500000,
    status: 'NUEVO',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80',
    panoUrls: [
      'https://static.wixstatic.com/media/fe81a7_603731065ef24ecb8308d7d772e10495~mv2.png',
      'https://static.wixstatic.com/media/fe81a7_0bd1af73ca934917a23de450569d95b3~mv2.png'
    ],
    views: 89
  },
  {
    id: '3',
    title: 'Rincon Surf Villa',
    location: 'Rincón',
    stats: '3 Hab | 2 Baños',
    price: 1250000,
    status: 'EN CONTRATO',
    image: 'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=600&q=80',
    panoUrls: [
      'https://static.wixstatic.com/media/fe81a7_e915ba0255ac4add9715a90e702829b4~mv2.png',
      'https://static.wixstatic.com/media/fe81a7_339d86e221314496acedb869bcd1c620~mv2.png',
      'https://static.wixstatic.com/media/fe81a7_e880dd066c8a4bd7a0f0802ea2713058~mv2.png'
    ],
    views: 350
  }
];

export const defaultLeads: Lead[] = [
  { id: '1', name: 'José Rodríguez', timeAgo: 'Hace 2 días', interest: 'Villa del Sol', source: 'SGX Showcase', status: 'CONTACTADO', initials: 'JR' },
  { id: '2', name: 'María González', timeAgo: 'Hace 5 horas', interest: 'Condo Marazul', source: 'Referido', status: 'CALIFICADO', initials: 'MG' },
  { id: '3', name: 'Carlos Toledo', timeAgo: 'Hace 1 semana', interest: 'Dorado Beach Estate', source: 'Website', status: 'NUEVO', initials: 'CT' }
];
