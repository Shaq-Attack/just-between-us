import { ReactElement, useEffect, useState } from 'react';
import { GridLayout, GridLayoutItem } from '@progress/kendo-react-layout';
import '@progress/kendo-theme-default/dist/all.css';
import { Card, CardHeader, CardBody, CardTitle, CardActions } from '@progress/kendo-react-layout';
import { Button } from '@progress/kendo-react-buttons';
import { Message, ReadAll, ReadByTitle } from '../RecordKeeper';
import { Firestore } from 'firebase/firestore';
import { Typography } from '@progress/kendo-react-common';
import { Window } from '@progress/kendo-react-dialogs';
import { Loader } from '@progress/kendo-react-indicators';
import { GetThemeColour, GetThemeColourV2 } from '../utils';
import { TextBox } from '@progress/kendo-react-inputs';
import { Notification, NotificationGroup } from '@progress/kendo-react-notification';
import { Fade } from '@progress/kendo-react-animation';

const Read = (props: { isLightMode: boolean; db: Firestore }): ReactElement => {
    const { isLightMode, db } = props;
    const [data, setData] = useState<Message[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [visibleWindow, setVisibleWindow] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('');
    const [searchTitle, setSearchTitle] = useState<string>('');
    const [body, setBody] = useState<string>('');
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        ReadAll(db)
            .then((result) => setData(randomise(result)))
            .finally(() => setLoading(false));
    }, [db]);

    const randomise = (array: Message[]): Message[] => {
        return array.sort(() => Math.random() - 0.5);
    };

    const toggleWindow = () => {
        setVisibleWindow(!visibleWindow);
    };

    const truncate = (text: string, size: number): string => {
        if (text.length > size) {
            return text.slice(0, size) + '...';
        }
        return text;
    };

    const showMore = (item: Message) => {
        setTitle(item.title);
        setBody(item.body);
        toggleWindow();
    };

    return (
        <div className="WebPage">
            {loading && !visibleWindow && (
                <div className="Loader">
                    <Loader type="infinite-spinner" themeColor={GetThemeColourV2(isLightMode)} />
                    <Typography.p>Retrieving Posts...</Typography.p>
                </div>
            )}
            {!loading && !visibleWindow && (
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                    }}
                >
                    <div style={{ marginBottom: '1rem' }}>
                        <TextBox
                            className="TextInput"
                            style={{ width: '24rem', marginRight: '1rem' }}
                            placeholder="Search by Title..."
                            value={searchTitle}
                            onChange={(e) => setSearchTitle((e.target.value as string) ?? '')}
                        />
                        <Button
                            fillMode="solid"
                            themeColor={GetThemeColour(isLightMode)}
                            type="button"
                            onClick={() => {
                                setLoading(true);
                                ReadByTitle(db, searchTitle)
                                    .then((result) => showMore(result.docs[0].data() as Message))
                                    .catch((e) => setError(true))
                                    .finally(() => setLoading(false));
                            }}
                        >
                            Search by title
                        </Button>
                    </div>
                    <div className="Grid-layout-wrapper">
                        <div className="Grid-layout-page">
                            <div className="Grid-layout-content">
                                <GridLayout
                                    cols={[{ width: 400 }, { width: 400 }, { width: 400 }]}
                                    gap={{ rows: 5, cols: 5 }}
                                >
                                    {data.map((item, index) => (
                                        <GridLayoutItem
                                            className="grid-box"
                                            key={index}
                                            row={Math.floor(index / 3) + 1}
                                            col={(index % 3) + 1}
                                        >
                                            <Card className="Card" style={{ width: 400, margin: 'auto' }}>
                                                <CardHeader>
                                                    <CardTitle>{truncate(item.title, 50)}</CardTitle>
                                                </CardHeader>
                                                <CardBody>
                                                    <Typography.p>{truncate(item.body, 100)}</Typography.p>
                                                </CardBody>
                                                <CardActions>
                                                    <Button
                                                        fillMode="flat"
                                                        themeColor={GetThemeColour(!isLightMode)}
                                                        type="button"
                                                        onClick={() => showMore(item)}
                                                    >
                                                        Read more
                                                    </Button>
                                                </CardActions>
                                            </Card>
                                        </GridLayoutItem>
                                    ))}
                                </GridLayout>
                            </div>
                        </div>
                    </div>
                    <NotificationGroup
                        style={{
                            right: 0,
                            bottom: 0,
                            alignItems: 'flex-start',
                            flexWrap: 'wrap-reverse',
                        }}
                    >
                        <Fade>
                            {error && (
                                <Notification
                                    type={{ style: 'error', icon: true }}
                                    closable={true}
                                    onClose={() => setError(false)}
                                >
                                    <span>Failed to find post...</span>
                                </Notification>
                            )}
                        </Fade>
                    </NotificationGroup>
                </div>
            )}
            {visibleWindow && (
                <Window
                    className="Card"
                    themeColor={GetThemeColour(isLightMode)}
                    title={title}
                    onClose={toggleWindow}
                    initialHeight={300}
                    initialWidth={500}
                    resizable={true}
                >
                    <Typography.p>{body}</Typography.p>
                </Window>
            )}
        </div>
    );
};

export default Read;
