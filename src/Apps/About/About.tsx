import "./About.css"

export function AboutApp() {
    return (
        <div className="app aboutApp">
            <p className="logo"><span className="highlighted">sky</span>Os</p>
            <p>A WebOS written in <span style={{ color: "#61DBFB" }}>React</span> with a sort of pixelart style!</p>
            <a href="https://github.com/FonixPython/skyOS">
                <div>
                    Source code on GitHub
                </div>
            </a>
        </div>
    )
}