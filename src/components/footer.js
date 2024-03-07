import './footer.css';

const Footer = () => {
    return (
        <div className='footer-container center-horizontal-content'>
            <img className='footer-logo' src='/logo512.png' alt='logo'/>
            <p className='footer-text'>Pair tiles © 2024 Arataki Leo;</p>
            <a
                className='footer-text'
                href='https://github.com/aratakileo/pair-tiles'
                style={{marginLeft: '0.3rem'}}
            >
                sources
            </a>
        </div>
    );
};

export default Footer;
