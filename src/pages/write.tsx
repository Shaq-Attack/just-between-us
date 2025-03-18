import { ReactElement, useEffect, useState } from 'react';
import { Typography } from '@progress/kendo-react-common';
import { TextBox, TextArea } from '@progress/kendo-react-inputs';
import { Button } from '@progress/kendo-react-buttons';
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';
import { Loader } from '@progress/kendo-react-indicators';
import { Notification, NotificationGroup } from '@progress/kendo-react-notification';
import { Fade } from '@progress/kendo-react-animation';
import { GetStoryCategory, GetThemeColour, GetThemeColourV2, InitializeMessage } from '../utils';
import { Firestore } from 'firebase/firestore';
import { Create } from '../RecordKeeper';

interface State {
    success: boolean;
    error: boolean;
}

const Write = (props: { isLightMode: boolean; db: Firestore }): ReactElement => {
    const { isLightMode, db } = props;
    const [title, setTitle] = useState<string>('');
    const [story, setStory] = useState<string>('');
    const [wordCount, setWordCount] = useState<number>(0);
    const [storyCategory, setStoryCategory] = useState<number>(0);
    const [visibleErrorDialog, setVisibleErrorDialog] = useState<boolean>(false);
    const [state, setState] = useState<State>({ success: false, error: false });
    const [loading, setLoading] = useState<boolean>(false);

    const onToggle = (flag: keyof State) => {
        setState({ ...state, [flag]: !state[flag] });
        if (flag === 'success') {
            setTimeout(() => {
                setState({ ...state, [flag]: false });
            }, 3000);
        }
        if (flag === 'error') {
            setTimeout(() => {
                setState({ ...state, [flag]: false });
            }, 5000);
        }
    };
    const { success, error } = state;

    useEffect(() => {
        const wordCount = story.split(' ').filter((word) => word.length > 0).length;
        setWordCount(wordCount);
        if (!story) {
            setStoryCategory(0);
        } else if (wordCount > 0 && wordCount <= 50) {
            setStoryCategory(1);
        } else if (wordCount > 50 && wordCount <= 150) {
            setStoryCategory(2);
        } else if (wordCount > 150 && wordCount <= 300) {
            setStoryCategory(3);
        } else {
            setStoryCategory(10);
        }
    }, [story]);

    const submitPost = () => {
        const canSubmit = storyCategory > 0 && title.length > 0;
        if (canSubmit) {
            setLoading(true);
            Create(db, InitializeMessage(title, story, storyCategory))
                .catch((e) => {
                    console.error(e);
                    setLoading(false);
                    onToggle('error');
                })
                .then(() => {
                    setLoading(false);
                    setTitle('');
                    setStory('');
                    setWordCount(0);
                    setStoryCategory(0);
                    onToggle('success');
                });
        } else {
            setVisibleErrorDialog(true);
        }
    };

    return (
        <div className="WebPage">
            {!visibleErrorDialog && !loading && (
                <div>
                    <Typography.h3>Share Your Thoughts! </Typography.h3>
                    <Typography.p>
                        Drop in any message you like—whether it's a quirky thought, your deepest secret, or a piece of
                        wisdom.
                    </Typography.p>
                    <Typography.p>
                        Just remember, while we're all here to be heard, let's keep it kind and respectful.
                    </Typography.p>
                    <Typography.p>
                        Your words have the power to brighten someone's day, so share with heart and care!
                    </Typography.p>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '1rem',
                        }}
                    >
                        <TextBox
                            className="TextInput"
                            style={{ width: '24rem' }}
                            placeholder="Give me a Title..."
                            value={title}
                            onChange={(e) => setTitle((e.target.value as string) ?? '')}
                        />
                        <TextArea
                            className="TextInput"
                            rows={25}
                            resizable="none"
                            style={{ width: '48rem' }}
                            placeholder="Write your message here..."
                            value={story}
                            onChange={(e) => setStory(e.target.value ?? '')}
                        />
                    </div>
                    <div className="Buttons">
                        <Button themeColor={GetThemeColour(isLightMode)} onClick={() => setStory('')}>
                            Clear
                        </Button>
                        <Button themeColor={GetThemeColour(isLightMode)} onClick={submitPost}>
                            Submit
                        </Button>
                    </div>
                    <Typography.p>
                        <strong>Word Count:</strong> {wordCount} ({GetStoryCategory(storyCategory)})
                    </Typography.p>
                    <NotificationGroup
                        style={{
                            right: 0,
                            bottom: 0,
                            alignItems: 'flex-start',
                            flexWrap: 'wrap-reverse',
                        }}
                    >
                        <Fade>
                            {success && (
                                <Notification
                                    type={{ style: 'success', icon: true }}
                                    closable={true}
                                    onClose={() => setState({ ...state, success: false })}
                                >
                                    <span>Your message has been submitted!</span>
                                </Notification>
                            )}
                        </Fade>
                        <Fade>
                            {error && (
                                <Notification
                                    type={{ style: 'error', icon: true }}
                                    closable={true}
                                    onClose={() => setState({ ...state, error: false })}
                                >
                                    <span>Something went wrong. Please try again.</span>
                                </Notification>
                            )}
                        </Fade>
                    </NotificationGroup>
                </div>
            )}
            {visibleErrorDialog && (
                <Dialog
                    themeColor={GetThemeColour(isLightMode)}
                    title={'Oops!'}
                    onClose={() => setVisibleErrorDialog(false)}
                >
                    <Typography.p>
                        Looks like you missed something! Make sure you've entered a title and your message before you
                        submit.
                    </Typography.p>
                    <DialogActionsBar>
                        <Button onClick={() => setVisibleErrorDialog(false)}>Got it!</Button>
                    </DialogActionsBar>
                </Dialog>
            )}
            {loading && (
                <div className="Loader">
                    <Loader type="infinite-spinner" themeColor={GetThemeColourV2(isLightMode)} />
                    <Typography.p>Submitting your Post...</Typography.p>
                </div>
            )}
        </div>
    );
};

export default Write;
