import { ReactElement, useEffect, useState } from 'react';
import { Typography } from '@progress/kendo-react-common';
import { TextBox, TextArea } from '@progress/kendo-react-inputs';
import { Button } from '@progress/kendo-react-buttons';
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';
import { Loader } from '@progress/kendo-react-indicators';
import { GetStoryCategory, GetThemeColour, GetThemeColourV2 } from '../utils';

const Write = (props: { isLightMode: boolean }): ReactElement => {
    const { isLightMode } = props;
    const [title, setTitle] = useState<string>('');
    const [story, setStory] = useState<string>('');
    const [wordCount, setWordCount] = useState<number>(0);
    const [storyCategory, setStoryCategory] = useState<number>(0);
    const [visibleErrorDialog, setVisibleErrorDialog] = useState<boolean>(false);
    const [visibleSuccessDialog, setVisibleSuccessDialog] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

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
            setTimeout(() => {
                setLoading(false);
                setVisibleSuccessDialog(true);
            }, 2000);
        } else {
            setVisibleErrorDialog(true);
        }
    };

    return (
        <div className="WebPage">
            {!visibleErrorDialog && !visibleSuccessDialog && !loading && (
                <div>
                    <Typography.h3>Share Your Thoughts! </Typography.h3>
                    <Typography.p>
                        Drop in any message you like—whether it's a quirky thought, a secret smile, or a piece of
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
                            rows={31}
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
            {visibleSuccessDialog && (
                <Dialog
                    themeColor={GetThemeColour(isLightMode)}
                    title={'Success!'}
                    onClose={() => setVisibleSuccessDialog(false)}
                >
                    <Typography.p>
                        Your message has been submitted successfully! Thanks for sharing your thoughts with us.
                    </Typography.p>
                    <DialogActionsBar>
                        <Button onClick={() => setVisibleSuccessDialog(false)}>Back</Button>
                    </DialogActionsBar>
                </Dialog>
            )}
            {loading && (
                <div className="Loader">
                    <Loader type="infinite-spinner" themeColor={GetThemeColourV2(isLightMode)} />
                    <Typography.p>Submitting your message...</Typography.p>
                </div>
            )}
        </div>
    );
};

export default Write;
