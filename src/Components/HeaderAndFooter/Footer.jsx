function AboutMe(){
    return(
        <>
        <div className="aboutme" id="aboutme">
            <p>
                Hi, My Name is Sethu Maruthi and I'm passionate about movies. I love to watch, review and discuss them with my friends, family and loved ones.
                If you're also a movie geek like me, you can reach out to me at sethumaruthi93@gmail.com.
            </p>
        </div>
        </>
    )
}

function Socials() {
    return(
        <>
        <div className="socials" id="socials">
            <h3>
                Follow me on socials
            </h3>
            <div className="socialicons" id="sociallinks">
                <a href="https://www.linkedin.com/in/sethu-maruthi-c-b90014181/">LinkedIn</a>
                <a href="https://github.com/maruthi0209">GitHub</a>
                <a href="https://www.facebook.com/sethu.maruthi">Facebook</a>
                <a href="https://www.instagram.com/sethumaruthi">Instagram</a>
            </div>
        </div>
        </>
    )
}

function Copyright() {
    return(
        <>
        <div className="copyright" id="copyright">
            <p>
            &copy;Copyright 2025. All rights reserved.
            </p>
        </div>
        </>
    )
}

export default function Footer() {
    return (
        <>
        <div className="footer space-mono-regular">
            <AboutMe />
            <Socials />
            <Copyright />
        </div>
        </>
    )
}