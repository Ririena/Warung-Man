import { Navbar } from "./Navbar";

const MainLayout = ({ children }) => {
    return (
        <div>
           <Navbar/>
            <main>{children}</main>
            <footer>Footer</footer>
        </div>
    );
};

export default MainLayout;
