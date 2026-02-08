import { Feedspot } from '../types';

export const FEEDSPOTS_MOCK: Feedspot[] = [
  {
    id: '1',
    name: 'Comedouro Praça Central',
    latitude: -23.55052,
    longitude: -46.633308,
    description:
      'Ponto movimentado no coração da praça, com sombra e acesso fácil para voluntários locais.',
    photos: [
      'https://picsum.photos/seed/caramelo-1a/800/600',
      'https://picsum.photos/seed/caramelo-1b/800/600',
      'https://picsum.photos/seed/caramelo-1c/800/600'
    ],
    status: 'ok',
    lastFilledAt: '2026-02-08T10:30:00.000Z'
  },
  {
    id: '2',
    name: 'Comedouro Parque das Flores',
    latitude: -23.5527,
    longitude: -46.6284,
    description:
      'Comedouro próximo à pista de caminhada, com grande circulação de pets e protetores.',
    photos: [
      'https://picsum.photos/seed/caramelo-2a/800/600',
      'https://picsum.photos/seed/caramelo-2b/800/600',
      'https://picsum.photos/seed/caramelo-2c/800/600',
      'https://picsum.photos/seed/caramelo-2d/800/600'
    ],
    status: 'ok'
  },
  {
    id: '3',
    name: 'Comedouro Largo do Sol',
    latitude: -23.5489,
    longitude: -46.637,
    description:
      'Área ampla e tranquila, ideal para reposição rápida de água e ração em horários de pico.',
    photos: [
      'https://picsum.photos/seed/caramelo-3a/800/600',
      'https://picsum.photos/seed/caramelo-3b/800/600',
      'https://picsum.photos/seed/caramelo-3c/800/600'
    ],
    status: 'needs_attention'
  },
  {
    id: '4',
    name: 'Comedouro Vila Esperança',
    latitude: -23.5554,
    longitude: -46.6401,
    description:
      'Ponto comunitário em frente ao mercado de bairro, com apoio frequente dos moradores.',
    photos: [
      'https://picsum.photos/seed/caramelo-4a/800/600',
      'https://picsum.photos/seed/caramelo-4b/800/600',
      'https://picsum.photos/seed/caramelo-4c/800/600',
      'https://picsum.photos/seed/caramelo-4d/800/600',
      'https://picsum.photos/seed/caramelo-4e/800/600'
    ],
    status: 'ok'
  },
  {
    id: '5',
    name: 'Comedouro Jardim Aurora',
    latitude: -23.5465,
    longitude: -46.6314,
    description:
      'Comedouro em rua residencial silenciosa, com monitoramento semanal de voluntários.',
    photos: [
      'https://picsum.photos/seed/caramelo-5a/800/600',
      'https://picsum.photos/seed/caramelo-5b/800/600',
      'https://picsum.photos/seed/caramelo-5c/800/600'
    ],
    status: 'ok'
  },
  {
    id: '6',
    name: 'Comedouro Estação Velha',
    latitude: -23.5538,
    longitude: -46.626,
    description:
      'Ponto estratégico perto da estação, útil para rondas rápidas durante o dia.',
    photos: [
      'https://picsum.photos/seed/caramelo-6a/800/600',
      'https://picsum.photos/seed/caramelo-6b/800/600',
      'https://picsum.photos/seed/caramelo-6c/800/600',
      'https://picsum.photos/seed/caramelo-6d/800/600'
    ],
    status: 'needs_attention'
  }
];
