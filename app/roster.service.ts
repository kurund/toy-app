import {Injectable} from 'angular2/core';
import {Roster} from './roster';
import {ROSTERS} from './mock-rosters';

@Injectable()
export class RosterService {
  getRosters() {
    return Promise.resolve(ROSTERS);
  }

  getRoster(id: number) {
    return Promise.resolve(ROSTERS).then(
      rosters => rosters.filter(roster => roster.id === id)[0]
    );
  }
}
