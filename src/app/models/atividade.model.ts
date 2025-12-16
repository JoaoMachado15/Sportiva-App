export interface Atividade {
  id: number;
  tipo: string;
  duracao: number;
  data: string;
  local: string;
  intensidade: 'baixa' | 'moderada' | 'alta';
  favorita: boolean;
  notas?: string;
}