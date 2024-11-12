import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TemporaryDataService {
  setData(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  getData(key: string): string | boolean {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  clearData(key: string): void {
    localStorage.removeItem(key);
  }
}
