import { ReactElement } from 'react';
import { Typography } from '@progress/kendo-react-common';
import JBULogo from '../logo';

const Home = (): ReactElement => {
    return (
        <div className="WebPage">
            <div className="Wrapper">
                <JBULogo />
            </div>
            <div className="Wrapper">
                <div className="Banner">Just Between Us</div>
            </div>
            <div className="Wrapper">
                <Typography.p>
                    Welcome to this cozy corner of the internet where secrets are shared, laughter is loud, and every
                    message is a mystery waiting to spark intrigue.
                </Typography.p>
                <div style={{ textAlign: 'left' }}>
                    <ul>
                        <li>
                            <strong>Speak Your Mind, Anonymously:</strong> Let your thoughts flow without a trace. Your
                            messages are yours alone, giving you the freedom to share, vent, or inspire without the fear
                            of judgment.
                        </li>
                        <li>
                            <strong>Connect Through Secrets:</strong> Whether you're dropping a note, confessing a
                            quirky thought, or sending a burst of inspiration, every message adds to our library of
                            thoughts.
                        </li>
                        <li>
                            <strong>A Safe Space for Every Voice:</strong> No names, no identities—just pure, unfiltered
                            communication. It’s a place where every secret counts and every voice finds a home.
                        </li>
                    </ul>
                </div>
                <Typography.p>
                    <strong>JustBetweenUs</strong>, where the art of anonymous storytelling meets a relaxed mood. Share
                    your thoughts, discover unexpected connections, and join a community built on the power of mystery
                    and honesty.
                </Typography.p>
            </div>
        </div>
    );
};

export default Home;
