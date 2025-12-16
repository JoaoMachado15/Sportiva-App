import { Injectable } from '@angular/core';
import { Atividade } from '../models/atividade.model';
import { ATIVIDADES_MOCK } from '../mocks/atividades.mock';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AtividadeService {

  private atividades: Atividade[] = [...ATIVIDADES_MOCK];

  // 🔹 Simula GET
  getAtividades(): Observable<Atividade[]> {
    return of(this.atividades);
  }

  // 🔹 Simula POST
  addAtividade(a: Atividade): Observable<Atividade> {
    this.atividades.push(a);
    return of(a);
  }

  // 🔹 Simula PUT
  updateAtividade(a: Atividade): Observable<Atividade> {
    this.atividades = this.atividades.map(x =>
      x.id === a.id ? a : x
    );
    return of(a);
  }

  // 🔹 Simula DELETE
  deleteAtividade(id: number): Observable<void> {
    this.atividades = this.atividades.filter(a => a.id !== id);
    return of();
  }
}