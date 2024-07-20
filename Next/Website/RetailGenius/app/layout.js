// app/layout.js

import "./globals.css";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};
const Layout = ({ children }) => {
    return (
        <html lang="en">
            <body>
                {children}
            </body>
        </html>
    );
};

export default Layout;
