import { FaLinkedin, FaGithub, FaFacebook, FaInstagram } from 'react-icons/fa';
import logo from "../../assets/ScreenScore_dark.png"

function AboutScreenScore() {
    return (
    <div className="about-me">
        
      <h3 className="footer-heading"><img src={logo} alt="Logo" className='footer-image' />&emsp;ScreenScore</h3>
      <p className="footer-text">
        ScreenScore is your go-to destination for honest, in-depth movie reviews and ratings. Whether you're a casual viewer or a hardcore cinephile, our platform offers fresh perspectives on the latest blockbusters, hidden indie gems, and timeless classics.
      </p>
      
    </div>
  );
}

function AboutMe() {
  return (
    <div className="about-me">
      <h3 className="footer-heading">About Me</h3>
      <p className="footer-text">
        Hi, My Name is Sethu Maruthi and I'm passionate about movies.
      </p>
      <p className="footer-text">
        <a href="mailto:sethumaruthi93@gmail.com" className="email-link">
          sethumaruthi93@gmail.com
        </a>
      </p>
    </div>
  );
}

function Socials() {
  return (
    <div className="socials">
      <h3 className="footer-heading">Follow Me</h3>
      <div className="social-icons">
        <a 
          target="_blank" 
          rel="noopener noreferrer" 
          href="https://www.linkedin.com/in/sethu-maruthi-c-b90014181/" 
          className="social-link"
          aria-label="LinkedIn"
        >
          <FaLinkedin />
        </a>
        <a 
          target="_blank" 
          rel="noopener noreferrer" 
          href="https://github.com/maruthi0209" 
          className="social-link"
          aria-label="GitHub"
        >
          <FaGithub />
        </a>
        <a 
          target="_blank" 
          rel="noopener noreferrer" 
          href="https://www.facebook.com/sethu.maruthi" 
          className="social-link"
          aria-label="Facebook"
        >
          <FaFacebook />
        </a>
        <a 
          target="_blank" 
          rel="noopener noreferrer" 
          href="https://www.instagram.com/sethumaruthi" 
          className="social-link"
          aria-label="Instagram"
        >
          <FaInstagram />
        </a>
      </div>
    </div>
  );
}

function Copyright() {
  return (
    <div className="copyright">
      <p className="footer-text">
        &copy; {new Date().getFullYear()} Sethu Maruthi. All rights reserved.
      </p>
    </div>
  );
}

export default function Footer2() {
  return (
    <footer className="footer space-mono-regular">
      <div className="footer-container">
        <AboutScreenScore />
        <AboutMe />
        <Socials />
      </div>
      <Copyright />
    </footer>
  );
}