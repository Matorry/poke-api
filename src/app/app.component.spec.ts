import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { FooterComponent } from './core/footer/footer.component';
import { HeaderComponent } from './core/header/header.component';
import { CardComponent } from './pokemon/card/card.component';
import { ListComponent } from './pokemon/list/list.component';

describe('Given the class AppComponent', () => {
  describe('When i instance it', () => {
    beforeEach(() =>
      TestBed.configureTestingModule({
        imports: [RouterTestingModule, HttpClientTestingModule],
        declarations: [
          AppComponent,
          FooterComponent,
          HeaderComponent,
          ListComponent,
          CardComponent,
        ],
      })
    );

    it('should create the app', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      expect(app).toBeTruthy();
    });

    it(`should have as title 'poke-api'`, () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      expect(app.title).toEqual('poke-api');
    });
  });
});
