import * as _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { Base, IBase } from './base';
export interface IId extends IBase {
    id: string;

    // todo move to Audit class
    //createdAt: firebase.firestore.Timestamp | any;
    //updatedAt: firebase.firestore.Timestamp | any;
}

export class Id extends Base implements IId {
    id: string  = uuidv4();

    constructor(id?: any) { // IId
        super();
        this.initialize(this, id);
    }

    public toObject(exclude?: string[]): any {
        const obj = super.toObject(exclude);
        return obj;
    }
}