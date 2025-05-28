import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { environment } from '../environment';

interface MediaLink {
  href: string;
}

interface MediaItem {
  links?: MediaLink[];
  data: { title?: string }[];
}

interface ApiResponse {
  collection: {
    items: MediaItem[];
    metadata?: { total_hits: number };
  };
}

interface FormData {
  query: string;
}

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  data: FormData | null = null;
  Q: string | null = '';
  mediaItems: { links: string[]; title: string }[] = [];

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state?.['formData']?.query) {
      this.data = navigation.extras.state['formData'];
      this.Q = this.data?.query ? String(this.data.query).toLowerCase() : '';
      this.fetchAllMedia(this.Q);
    } else {
      console.warn('Nenhum dado de query fornecido na navegação.');
    }
  }

  async fetchPage(q: string, page: number, apiKey: string): Promise<{ links: string[]; title: string }[]> {
    try {
      const url = `https://images-api.nasa.gov/search?q=${encodeURIComponent(q)}&page=${page}&media_type=image&page_size=50`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
      }
      const data: ApiResponse = await response.json();
      return data.collection.items
        .map((item: MediaItem) => {
          const links = item.links?.map(link => link.href).filter(href => href && /\.(jpg|jpeg|png)$/i.test(href)) || [];
          const title = item.data?.[0]?.title || 'Título não disponível';
          return { links, title };
        })
        .filter(item => item.links.length > 0);
    } catch (error) {
      console.error(`Erro ao buscar página ${page}:`, error);
      return [];
    }
  }

  async fetchAllMedia(q: string): Promise<void> {
    const apiKey = environment.nasaApiKey;
    if (!apiKey) {
      console.error('Chave da API da NASA não configurada.');
      this.mediaItems = [];
      return;
    }

    const totalPages = 2;
    const fetchPromises = Array.from({ length: totalPages }, (_, i) => this.fetchPage(q, i + 1, apiKey));
    try {
      const results = await Promise.all(fetchPromises);
      this.mediaItems = results.flat();
    } catch (error) {
      console.error('Erro geral:', error);
      this.mediaItems = [];
      alert('Erro ao carregar imagens. Tente novamente mais tarde.');
    }
  }

  goToHome() {
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
  }
}