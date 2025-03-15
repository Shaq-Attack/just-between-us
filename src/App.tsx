import './App.css';
import { useEffect, useState } from 'react';
import '@progress/kendo-theme-default/dist/all.css';
import HomePage from './pages/home';
import Write from './pages/write';
import Read from './pages/read';
import { AppBar, AppBarSection, AppBarSpacer } from '@progress/kendo-react-layout';
import { Switch } from '@progress/kendo-react-inputs';
import { Button } from '@progress/kendo-react-buttons';
import { GetThemeColour } from './utils';

const getInitialTheme = () => {
    return window.matchMedia('(prefers-color-scheme: light)').matches;
};

function App() {
    const [isLightMode, setIsLightMode] = useState<boolean>(getInitialTheme());
    const [pageToRender, setPageToRender] = useState<string>('home');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', isLightMode ? 'light' : 'dark');
    }, [isLightMode]);

    useEffect(() => {
        const setThemeChange = () => {
            setIsLightMode(window.matchMedia('(prefers-color-scheme: light)').matches);
        };

        window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', setThemeChange);
        return () => {
            window.matchMedia('(prefers-color-scheme: light)').removeEventListener('change', setThemeChange);
        };
    }, []);

    const renderPage = (page: string) => {
        switch (page) {
            case 'home':
                return <HomePage />;
            case 'write':
                return <Write isLightMode={isLightMode} />;
            case 'read':
                return <Read />;
            default:
                return <HomePage />;
        }
    };

    return (
        <div>
            <AppBar themeColor={GetThemeColour(isLightMode)} positionMode="fixed">
                <AppBarSection>
                    <p className="TextTitle">Just Between Us</p>
                </AppBarSection>
                <AppBarSpacer />
                <AppBarSection>
                    <span className="NavButtons">
                        <Button themeColor={GetThemeColour(isLightMode)} onClick={() => setPageToRender('home')}>
                            Home
                        </Button>
                        <Button themeColor={GetThemeColour(isLightMode)} onClick={() => setPageToRender('write')}>
                            Write
                        </Button>
                        <Button themeColor={GetThemeColour(isLightMode)} onClick={() => setPageToRender('read')}>
                            Read
                        </Button>
                    </span>
                </AppBarSection>
                <AppBarSpacer />
                <AppBarSection>
                    <Switch
                        offLabel=""
                        onLabel=""
                        checked={!isLightMode}
                        className="Switch"
                        onChange={() => setIsLightMode(!isLightMode)}
                    />
                </AppBarSection>
            </AppBar>
            {renderPage(pageToRender)}
        </div>
    );
}

export default App;
