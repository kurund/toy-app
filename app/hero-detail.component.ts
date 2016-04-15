import {Component, Input, OnInit, Output, EventEmitter} from 'angular2/core';
import {Hero} from './hero';
import { RouteParams } from 'angular2/router';
import { HeroService } from './hero.service';
import {NgForm}    from 'angular2/common';

@Component({
  selector: 'my-hero-detail',
  templateUrl: 'app/hero-detail.component.html',
  styleUrls: ['app/hero-detail.component.css']
})

export class HeroDetailComponent implements OnInit {
  constructor(
    private _heroService: HeroService,
    private _routeParams: RouteParams) {
    }

  ngOnInit() {
    let id = +this._routeParams.get('id');
    if (!isNaN(id)) {
      this._heroService.getHero(id)
      .then(hero => this.hero = hero);
    }
    else {
      this.hero = {id:0, username: '', first_name: '', last_name:'', is_deleted: false};
    }
  }

  saveUser() {
    if (this.hero.id == 0) {
      this.hero.id = this._heroService.getHeroesCount() + 1;
      this._heroService.addHero(this.hero);
    }

    // TODO: need to redirect to user listing
    // this might be hackish way but quicker way for now
    // since we don't store the value in DB, commenting below
    // it distroys the scope and the current changes
    // window.location.href = '/heroes';
  }

  goBack() {
    window.history.back();
  }

  @Input() hero: Hero;
}
