import './App.css';
import '@progress/kendo-theme-default/dist/all.css';
import { Home } from './pages/home';
import { AppBar, AppBarSection, AppBarSpacer } from '@progress/kendo-react-layout';
import { Switch } from '@progress/kendo-react-inputs';
import { useEffect, useState } from 'react';

function App() {
    const [isLightMode, setIsLightMode] = useState(true);

    const getInitialTheme = () => {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };

    const [theme, setTheme] = useState(getInitialTheme());

    const handleThemeChange = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        setIsLightMode(theme === 'light');
    }, [theme]);

    useEffect(() => {
        const setThemeChange = () => {
            setIsLightMode(window.matchMedia('(prefers-color-scheme: light)').matches);
        };

        window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', setThemeChange);
        return () => {
            window.matchMedia('(prefers-color-scheme: light)').removeEventListener('change', setThemeChange);
        };
    }, []);

    return (
        <div>
            <AppBar themeColor={isLightMode ? 'light' : 'dark'} positionMode="fixed">
                <AppBarSection>
                    <p className="TextTitle">Just Between Us</p>
                </AppBarSection>
                <AppBarSpacer />
                <AppBarSection>
                    <span>Text1</span>
                    <span>Text2</span>
                    <span>Text3</span>
                </AppBarSection>
                <AppBarSpacer />
                <AppBarSection>
                    <Switch onChange={handleThemeChange} />
                </AppBarSection>
            </AppBar>
            <Home />
        </div>
    );
}

export default App;
