import "./About.css"

export function AboutApp() {
    return (
        <div className="app aboutApp">
            <p className="logo"><span className="highlighted">sky</span>Os</p>
            <p>A WebOS written in <span style={{ color: "#61DBFB" }}>React</span> with a sort of pixelart style!</p>
            <a href="https://github.com/FonixPython/skyOS" target="_blank">
                <div>
                    <p>Source code on GitHub</p>
                </div>
            </a>
            <a href="https://www.reddit.com/r/PixelArt/comments/9n5yd4/oc_mountainscape_with_shittyrushed_clouds_i_made/">Default wallpaper credit: u/Aethrall</a>
        </div>
    )
}