import * as _ from 'lodash';
import { DateTime } from 'luxon';

import { UserBase } from './user.base';
import { Base } from './base';

// this data never goes to !uid
export interface IUserProfile {
    anonymous: boolean;
    firstName: string;
    lastInitial: string;
}

export class UserProfile extends Base implements IUserProfile {
    anonymous: boolean = true;
    firstName: string = 'Anonymous';
    lastInitial: string = 'A';

    // ignore provided values that don't exist on object
    // overwrite defaults with provided values

    constructor(user?: any) {
        super();

        this.initialize(this, user)
    }
}

export interface IUser {
    id: string;             // Id
    name: string;           // UserBase
    profile: IUserProfile;
    homeMeeting: string;
    favMeetings: string[];
    blkMeetings: string[];
    
    chatUser: any;
    created: string;
}

declare const ONLINE_ACTIVITY = 15;
export class User extends UserBase implements IUser {
    profile: IUserProfile       = <any>null;
    homeMeeting: string         = <any>null;
    favMeetings: any[]          = [];
    blkMeetings: any[]          = [];
    chatUser: any               = null;
    created: string             = DateTime.utc().toISO();

    constructor(user?: any) {
        super(user);    // pass to super user?

        // This is the BaseClass (root) initialize()
        // parm1: subclass instance (this)
        // parm2: constructor parameters
        this.initialize(this, user);
        
        // Create Custom Object Properties
        if (_.has(user, 'profile') && !_.isEmpty(user.profile)) this.profile = new UserProfile(user.profile);
    }
    
    public setUserNames(firstName: string, lastInitial: string): boolean {
        if (!firstName
            || !lastInitial
            || firstName.length > 25
            || lastInitial.length !== 1) {
            return false;
        }
        this.profile.firstName = firstName;
        this.profile.lastInitial = lastInitial;
        this.name = `${firstName} ${lastInitial}.`;
        return true;
    }
}

