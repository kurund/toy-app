import {Component}       from 'angular2/core';
import {HeroService}     from './hero.service';
import {RosterService}     from './roster.service';
import {StudentService}     from './student.service';
import {HeroesComponent} from './heroes.component';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';
import {DashboardComponent} from './dashboard.component';
import {HeroDetailComponent } from './hero-detail.component';

@Component({
  selector: 'my-app',
  template: `
    <h1>{{title}}</h1>
    <nav>
      <a [routerLink]="['Dashboard']">Class Roaster</a>
      <a [routerLink]="['Heroes']">Users</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['app/app.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [
    ROUTER_PROVIDERS,
    HeroService,
    RosterService,
    StudentService
  ]
})

@RouteConfig([
  {
    path: '/heroes',
    name: 'Heroes',
    component: HeroesComponent
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardComponent,
    useAsDefault: true
  },
  {
    path: '/detail/:id',
    name: 'HeroDetail',
    component: HeroDetailComponent
  },
])

export class AppComponent {
  title = 'Toy App';
}
