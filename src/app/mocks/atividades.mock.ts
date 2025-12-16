import { Atividade } from '../models/atividade.model';

export const ATIVIDADES_MOCK: Atividade[] = [
  {
    id: 1,
    tipo: 'Corrida',
    duracao: 40,
    data: '2025-12-01',
    local: 'Parque da Cidade',
    intensidade: 'moderada',
    favorita: true,
    notas: 'Boa sessão'
  },
  {
    id: 2,
    tipo: 'Ginásio',
    duracao: 60,
    data: '2025-12-03',
    local: 'Fitness Hut',
    intensidade: 'alta',
    favorita: false,
    notas: ''
  },
  {
    id: 3,
    tipo: 'Futebol',
    duracao: 90,
    data: '2025-12-05',
    local: 'Campo Municipal',
    intensidade: 'alta',
    favorita: true,
    notas: 'Jogo com amigos'
  }
];