import { ReplaySubject } from 'rxjs';
import { User } from '../../shared/models';

export interface IUserService {

    isNewUser: boolean

    _user: User;
    user$: ReplaySubject<User>;

    getUser(id: string): Promise<User>;
    saveUserAsync(user: User);

    setName(firstName: string, lastInitial: string);
    makeHomeGroup(id: string);
    makeFavGroup(id: string, make: boolean);

    unsubscribe();
}