import Link from "next/link";

const LogosWatermarkOnly = () => {
    return (
        <>
            <div className="logo-svg-div">
                <Link href="/">
                    <img className="logo-svg-universal link" src="/images/TCMiniLogo.png" alt=""/>
                </Link>
            </div>
        </>
    )
}

export default LogosWatermarkOnly;