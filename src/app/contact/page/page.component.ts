import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { PagesService } from 'src/app/services/pages.service';

interface ContactReponse {
  contact: ContactContent[]
}

interface ContactContent {
  cidade_pais: string;
  email: string;
  endereco: string;
  galeria: string;
  telefone: string;
  id: number;
  site: string;
}

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {

  content$!: Observable<ContactContent[]>

  constructor(private pageService: PagesService) { }

  ngOnInit(): void {
    this.content$ = this.pageService.getPagesContent<ContactReponse>('contact').pipe(
      tap((response) => console.log(response.contact)),
      map((response: ContactReponse) => response.contact)
    )
  }

}
