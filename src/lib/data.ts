
export type Category = {
  id: string;
  name: string;
  icon: string;
  description: string;
};

export type ItemStatus = 'available' | 'reserved' | 'donated';

export type DonationItem = {
  id: string;
  title: string;
  description: string;
  categoryId: string;
  condition: string;
  imageUrl: string;
  location: string;
  pickupDates: string;
  pickupTimes: string;
  contactName?: string;
  contactPhone?: string;
  contactEmail?: string;
  status: ItemStatus;
  createdAt: string;
  updatedAt: string;
  reservedBy?: {
    name: string;
    phone: string;
    until: string;
  };
};

export type NeedRequest = {
  id: string;
  name: string;
  phone: string;
  email?: string;
  location: string;
  items: string[]; // List of categories needed
  reason: string;
  createdAt: string;
  status: 'active' | 'fulfilled' | 'expired';
};

// Predefined categories
export const categories: Category[] = [
  {
    id: 'beds',
    name: 'Camas',
    icon: 'bed',
    description: 'Camas, colchões e itens relacionados ao sono'
  },
  {
    id: 'clothing',
    name: 'Roupas',
    icon: 'shirt',
    description: 'Roupas, calçados e acessórios para todas as idades'
  },
  {
    id: 'furniture',
    name: 'Móveis',
    icon: 'sofa',
    description: 'Móveis para casa como sofás, mesas, cadeiras'
  },
  {
    id: 'kitchen',
    name: 'Cozinha',
    icon: 'utensils',
    description: 'Utensílios, eletrodomésticos e itens para cozinha'
  },
  {
    id: 'appliances',
    name: 'Eletrodomésticos',
    icon: 'tv',
    description: 'Eletrodomésticos grandes e pequenos'
  },
  {
    id: 'baby',
    name: 'Bebê',
    icon: 'baby',
    description: 'Itens para bebês e crianças pequenas'
  },
  {
    id: 'hygiene',
    name: 'Higiene',
    icon: 'shower',
    description: 'Produtos de higiene pessoal e limpeza'
  },
  {
    id: 'food',
    name: 'Alimentos',
    icon: 'utensils',
    description: 'Alimentos não perecíveis'
  }
];

// Mock donation items
export const mockDonationItems: DonationItem[] = [
  {
    id: '1',
    title: 'Cama de casal em bom estado',
    description: 'Cama de casal completa com colchão. Usada por 2 anos, em bom estado de conservação.',
    categoryId: 'beds',
    condition: 'Bom',
    imageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    location: 'Porto Alegre, RS',
    pickupDates: 'Segunda a Sexta',
    pickupTimes: '18h às 20h',
    contactName: 'Carlos Silva',
    contactPhone: '(51) 99999-9999',
    status: 'available',
    createdAt: '2023-05-15T10:30:00Z',
    updatedAt: '2023-05-15T10:30:00Z'
  },
  {
    id: '2',
    title: 'Sofá de 3 lugares',
    description: 'Sofá de 3 lugares em tecido, cor bege. Algumas marcas de uso mas estrutura íntegra.',
    categoryId: 'furniture',
    condition: 'Regular',
    imageUrl: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    location: 'Canoas, RS',
    pickupDates: 'Sábados e Domingos',
    pickupTimes: '10h às 16h',
    contactName: 'Maria Oliveira',
    contactPhone: '(51) 98888-8888',
    contactEmail: 'maria@example.com',
    status: 'reserved',
    createdAt: '2023-05-10T14:20:00Z',
    updatedAt: '2023-05-12T09:15:00Z',
    reservedBy: {
      name: 'João Pereira',
      phone: '(51) 97777-7777',
      until: '2023-05-20T23:59:59Z'
    }
  },
  {
    id: '3',
    title: 'Conjunto de roupas infantis',
    description: 'Roupas infantis para menino tamanho 4-6 anos. Total de 15 peças incluindo calças, camisetas e casacos.',
    categoryId: 'clothing',
    condition: 'Ótimo',
    imageUrl: 'https://images.unsplash.com/photo-1567113463300-102a7eb3cb26?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    location: 'São Leopoldo, RS',
    pickupDates: 'Qualquer dia',
    pickupTimes: '9h às 21h',
    contactPhone: '(51) 96666-6666',
    status: 'available',
    createdAt: '2023-05-16T08:45:00Z',
    updatedAt: '2023-05-16T08:45:00Z'
  },
  {
    id: '4',
    title: 'Geladeira 300L',
    description: 'Geladeira branca 300L, funcionando perfeitamente. Aproximadamente 5 anos de uso.',
    categoryId: 'appliances',
    condition: 'Bom',
    imageUrl: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    location: 'Novo Hamburgo, RS',
    pickupDates: 'Segunda a Sexta',
    pickupTimes: '18h às 20h',
    contactName: 'Roberto Santos',
    contactPhone: '(51) 95555-5555',
    status: 'donated',
    createdAt: '2023-04-30T16:20:00Z',
    updatedAt: '2023-05-05T10:10:00Z'
  },
  {
    id: '5',
    title: 'Kit de panelas',
    description: 'Conjunto com 5 panelas em bom estado de conservação. Antiaderente.',
    categoryId: 'kitchen',
    condition: 'Bom',
    imageUrl: 'https://images.unsplash.com/photo-1584474263331-a85ef166be43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    location: 'Porto Alegre, RS',
    pickupDates: 'Segundas, Quartas e Sextas',
    pickupTimes: '14h às 18h',
    contactName: 'Ana Costa',
    contactPhone: '(51) 94444-4444',
    contactEmail: 'ana@example.com',
    status: 'available',
    createdAt: '2023-05-14T11:30:00Z',
    updatedAt: '2023-05-14T11:30:00Z'
  }
];

// Mock need requests
export const mockNeedRequests: NeedRequest[] = [
  {
    id: '1',
    name: 'Família Rodrigues',
    phone: '(51) 93333-3333',
    email: 'rodrigues@example.com',
    location: 'Alvorada, RS',
    items: ['beds', 'kitchen', 'furniture'],
    reason: 'Perdemos nossa casa nas enchentes recentes e estamos recomeçando do zero.',
    createdAt: '2023-05-10T09:15:00Z',
    status: 'active'
  },
  {
    id: '2',
    name: 'Abrigo Esperança',
    phone: '(51) 92222-2222',
    location: 'Viamão, RS',
    items: ['clothing', 'hygiene', 'food'],
    reason: 'Abrigo com 30 pessoas desalojadas pelas chuvas.',
    createdAt: '2023-05-12T16:40:00Z',
    status: 'active'
  }
];
