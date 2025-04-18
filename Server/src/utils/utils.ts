import mongoose, {Document} from 'mongoose';
export function randomHash(len: number, userId: string ){
    const length = userId.length;
    let hash:string = "";
    for(let i = 0; i < len; i++){
        hash += userId[Math.floor(Math.random()*len)]
    } return hash;
}
export interface InnerObjectType extends Document {
    Name?: boolean;
    Class?: boolean;
    Section?: boolean;
    RollNo?: boolean;
    Department?: boolean;
    Email?: boolean;
    PhoneNumber?: boolean;
    hash?: string;
    Questions?: string;
    Title?: string;
    Description?: string;
    Deadline?: string;
    userId: mongoose.Types.ObjectId; // Explicitly type userId as ObjectId
}
export interface FilteredObjectType {
  Name?: boolean;
  Class?: boolean;
  Section?: boolean;
  RollNo?: boolean;
  Department?: boolean;
  Email?: boolean;
  PhoneNumber?: boolean;
  hash?: string;
  Title?: string;
  Deadline?: string;
  userId?: mongoose.Types.ObjectId;
  _id?: string;
}

export function filterObjectProperties(originalArray: InnerObjectType[]): FilteredObjectType[] {
  const allowedKeys: (keyof FilteredObjectType)[] = [
    'Name', 'Class', 'Section', 'RollNo', 'Department', 'Email', 'PhoneNumber',
    'hash', 'Title', 'Deadline', 'userId', '_id'
  ];

  return originalArray.map(innerObject => {
    const plainObject = innerObject.toObject?.({ getters: false }) || { ...innerObject };
    const filteredInnerObject: Partial<FilteredObjectType> = {};
    // Copy allowed keys
    for (const key of allowedKeys) {
      if (plainObject[key] !== undefined) {
        filteredInnerObject[key] = plainObject[key];
      }
    }
    delete (filteredInnerObject as any).__v;
    delete (filteredInnerObject as any).Questions;
    delete (filteredInnerObject as any).Description;

    return filteredInnerObject as FilteredObjectType;
  });
}