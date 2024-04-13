import Link from "next/link";

const Logos = () => {
    return (
        <>
            <div className="logo-svg-div">
                <Link href="/">
                    <img className="logo-svg link" src="/images/TCMiniLogo.png" alt=""/>
                </Link>
            </div>

            <div className="full-logo-svg-div">
                <Link href="/">
                    <img className="full-logo-svg link" src="/images/TCFullLogo.png" alt=""/>
                </Link>
            </div>
        </>
    )
}

export default Logos;