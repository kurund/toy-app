import {Component, OnInit} from 'angular2/core';
import {Hero} from './hero';
import {HeroDetailComponent} from './hero-detail.component';
import {HeroService} from './hero.service';
import { Router } from 'angular2/router';

@Component({
  selector: 'my-heroes',
  templateUrl: 'app/heroes.component.html',
  styleUrls:  ['app/heroes.component.css'],
  directives: [HeroDetailComponent]
})

export class HeroesComponent implements OnInit {
  heroes: Hero[];
  selectedHero: Hero;
  constructor(
    private _router: Router,
    private _heroService: HeroService) { }

  getHeroes() {
    this._heroService.getHeroes().then(heroes => this.heroes = heroes);
  }
  
  ngOnInit() {
    this.getHeroes();
  }

  gotoDetail(hero: Hero) {
    this._router.navigate(['HeroDetail', { id: hero.id }]);
  }

  addNew() {
    this._router.navigate(['HeroDetail', { id: 'new' }]);
  }

  deleteHeroes(hero: Hero) {
    // set the delete flag
    hero.is_deleted = true;

    // rebuild heroes list
    let oldHeros = this.heroes;
    this.heroes = [];
    oldHeros.forEach(hero => {
      if (!hero.is_deleted) { this.heroes.push(hero); }
    });
  }
}
