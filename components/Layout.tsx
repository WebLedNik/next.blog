import React from "react";
import Header from "./Header";

interface LayoutProps {
    children: React.ReactNode
}

const Layout = ({children}: LayoutProps) => {
    return (
            <div className={'page'}>
                <Header/>
                <main className={'main'}>
                    <div className={'container'}>
                        <div className={'main__row'}>
                            <div className={'main__ads'}></div>
                            <div className={'main__article'}>{children}</div>
                        </div>
                    </div>
                </main>
            </div>
    )
}

export default Layout
