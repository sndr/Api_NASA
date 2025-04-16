import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

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
  Q: string = '';  
  mediaItems: { links: string[], title: string }[] = [];

  constructor(private router: Router) {
    
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.data = navigation.extras.state['formData'];
      this.Q = this.data?.query || '';

      if (this.Q) {
        this.fetchAllMedia(this.Q.toLowerCase());
      }
    }
  }
  
// THIS PART I JUST HAVE TO VERIFY IF THE URL WITH JPG IN THE END IS WORKING OR NOT AND THEN RETURN THE LINKS
  async fetchAllMedia(q: string): Promise<void> {
    const totalPages = 2; // YOU CAN DECREASE THIS NUMBER TO MAKE THE SEARCH FASTER

    const fetchPromises = Array.from({ length: totalPages }, async (_, i) => {
      try {
        const url = `https://images-api.nasa.gov/search?q=${encodeURIComponent(q)}&page=${i + 1}&media_type=image&page_size=50`;
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
        }
        const data: ApiResponse = await response.json();

        return data.collection.items
          .map((item: MediaItem) => {
            const links = item.links?.map(link => link.href).filter(href => href?.endsWith('.jpg')) || [];
            const title = item.data?.[0]?.title || 'Título não disponível';
            return { links, title };
          })
          .filter(item => item.links.length > 0);

      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        return [];
      }
    });
    

    try {
      const results = await Promise.all(fetchPromises);
      this.mediaItems = results.flat(); // Ensures proper structure
    } catch (error) {
      console.error('Erro geral:', error);
      this.mediaItems = [];
    }
  }
  goToHome() {
    this.router.navigate(['/']).then(() => {
      window.location.reload();
  });
}
}
