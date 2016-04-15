import { Component, OnInit } from 'angular2/core';
import { Router } from 'angular2/router';

import { Roster } from './roster';
import { RosterService } from './roster.service';

import { Student } from './student';
import { StudentService } from './student.service';

import {Hero} from './hero';
import {HeroService} from './hero.service';

@Component({
  selector: 'my-dashboard',
  templateUrl: 'app/dashboard.component.html',
  styleUrls: ['app/dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  rosters: Roster[] = [];
  students: Student[] = [];
  heroes: Hero[] = [];
  rosterStudents = [];
  formattedHeroes = [];
  notInRosterStudents = [];
  selectedRoster: Roster;

  constructor(
    private _router: Router,
    private _rosterService: RosterService,
    private _studentService: StudentService,
    private _heroService: HeroService
    ) {
  }

  ngOnInit() {
    this._rosterService.getRosters()
      .then(rosters => this.rosters = rosters);

      this._studentService.getStudents()
        .then(students => this.students = students);

      this._heroService.getHeroes()
      .then(heroes => this.heroes = heroes);
  }

  onSelect(roster: Roster) {
    this.selectedRoster = roster;

    // reformat heros list
    this.heroes.forEach(hero => {
      if (!hero.is_deleted && hero.id) {
        this.formattedHeroes[hero.id] = {
          'first_name': hero.first_name,
          'last_name': hero.last_name
        };
      }
    });

    // also build not in roster students
    this.notInRosterStudents = this.formattedHeroes;

    // build roster list
    this.rosterStudents = [];
    this.students.forEach(student => {
      if (student.roster_id == this.selectedRoster.id) {
        student.first_name = this.formattedHeroes[student.hero_id].first_name;
        student.last_name = this.formattedHeroes[student.hero_id].last_name;
        this.rosterStudents.push(student);
        // this.notInRosterStudents.splice(this.selectedRoster.id);
      }
    });

    console.log(this.notInRosterStudents);

  }

  // gotoDetail() {
  //   //this._router.navigate(['RosterDetailss', { id: this.selectedRoster.id }]);
  //   // console.log(this);
  //   // this._studentService.getStudents(this.selectedRoster.id)
  //   // .then(students => this.students = students);
  // }

}
