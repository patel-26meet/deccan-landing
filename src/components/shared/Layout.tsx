import "@/styles/index.scss";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="layout-wrapper">
            {/* Header */}
            {/* Main */}
            {children}
            {/* Footer */}

        </div>
    )
}

export default Layout