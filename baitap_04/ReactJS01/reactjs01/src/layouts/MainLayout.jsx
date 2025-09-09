const MainLayout = ({ children }) => (
    <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 bg-gray-50">{children}</main>
        <Footer />
    </div>
);
export default MainLayout;