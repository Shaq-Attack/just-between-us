import { addDoc, getDocs, collection, Firestore, QuerySnapshot, query, where } from 'firebase/firestore';

export type Message = {
    title: string;
    body: string;
    category: number;
    comments: string[];
    likeDislike: number[];
    reactions: string[];
    creationDate: Date;
};

export const Create = async (db: Firestore, toWrite: Message) => {
    const coll = collection(db, 'messages');
    const q = query(coll, where('title', '==', toWrite.title), where('body', '==', toWrite.body));
    const result = await getDocs(q);

    if (result.size === 0) {
        try {
            await addDoc(collection(db, 'messages'), toWrite);
        } catch (e) {
            console.error('Error adding document: ', e);
            throw e;
        }
    }
};

export const ReadAll = async (db: Firestore): Promise<Message[]> => {
    const result = await getDocs(collection(db, 'messages'));
    const messages = result.docs.map((doc) => doc.data() as Message);
    return messages;
};

export const ReadByTitle = async (db: Firestore, title: string): Promise<QuerySnapshot> => {
    const coll = collection(db, 'messages');
    const q = query(coll, where('title', '==', title));
    const result = await getDocs(q);

    return result;
};
