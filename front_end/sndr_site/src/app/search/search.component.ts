import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

interface MediaLink {// itens manipulation
  href: string;
}

interface MediaItem {
  links: MediaLink[];
  data: { title: string }[]; // itens manipulation
}

interface ApiResponse {
  collection: {
    items: MediaItem[];// itens manipulation
  };
}

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent {
  data: any;
  Q = '';  // value  defined
  mediaItems: { links: string[], title: string }[] = [];

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      this.data = navigation.extras.state['formData'];
      this.Q = this.data?.query;

      this.fetchAllMedia(this.Q);
    }
  }

  async fetchAllMedia(q: string): Promise<void> {
    const totalPages = 10; 
    const mediaItems: { links: string[], title: string }[] = [];
  
    const fetchPromises = Array.from({ length: totalPages }, async (_, i) => {
      const url = `https://images-api.nasa.gov/search?q=${q}&page=${i + 1}&media_type=image`; // source from all of the links
      const response = await fetch(url) ;
      if (!response.ok) {
        throw new Error('Erro ao buscar dados da API');
      }
      
      const data: ApiResponse = await response.json();
      console.log('Dados recebidos da API:', data); 
  
      const items = await Promise.all(data.collection.items.map(async (item: MediaItem) => { // filter all of the .jpg
        const links = item.links ? item.links.map((link: MediaLink) => {
          return link.href.endsWith('.jpg') ? link.href : null;
        }) : [];
  
      
        const validLinks = links.filter(link => link !== null); // looking for the title if it doesnt exist return 'titulo não disponivel'
        const title = item.data[0]?.title || 'Título não disponível'; 
        
        return { links: validLinks, title };
      }));
  
    
      return items.filter(item => item.links.length > 0);
    });
  
    try {
      const results = await Promise.all(fetchPromises);
      results.forEach(result => mediaItems.push(...result));
      this.mediaItems = mediaItems.filter(item => item.links.length > 0);
      
      console.log('Mídias válidas encontradas:', this.mediaItems); 
    } catch (error) {
      console.error('Erro:', error);
    }
  }
}  