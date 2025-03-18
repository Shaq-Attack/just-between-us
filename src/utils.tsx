import { Message } from './RecordKeeper';

export const GetThemeColour = (isLightMode: boolean): 'light' | 'dark' => {
    return isLightMode ? 'light' : 'dark';
};

export const GetThemeColourV2 = (isLightMode: boolean): 'tertiary' | 'secondary' => {
    return isLightMode ? 'tertiary' : 'secondary';
};

export const GetStoryCategory = (cat: number): string => {
    switch (cat) {
        case 0:
            return 'Empty';
        case 1:
            return 'Keep going!';
        case 2:
            return 'Short post';
        case 3:
            return 'Medium post';
        case 10:
            return 'Large post';
        default:
            return '...';
    }
};

export const InitializeMessage = (title: string, body: string, category: number): Message => {
    return {
        title: title,
        body: body,
        category: category,
        comments: [],
        likeDislike: [0, 0],
        reactions: [],
        creationDate: new Date(),
    };
};
