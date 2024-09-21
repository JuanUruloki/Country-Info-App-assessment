/**
 * The RootLayout function defines the layout structure for a web page with a header, main content
 * area, and footer.
 * @returns The `RootLayout` function is returning a JSX structure that represents the layout of a web
 * page. It includes an HTML document with a specified language, a body with a gray background and gray
 * text color, a header with a red background and white text containing a link to the homepage, a main
 * section with a container for the page content, and a footer with a dark gray background and white
 * text displaying
 */


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-800">
        <header className="flex items-center justify-center p-4 w-screen h-20 bg-red text-white">
          <a href="/" className="hover:cursor-pointer hover:text-darkGray">
          <h1 className="text-4xl font-extrabold">Country Info App</h1>
          </a>
        </header>
        <main className="container mx-auto mt-6">{children}</main>
        <footer className="p-4 bg-gray-800 text-white mt-8 text-center">
          © 2024 Country Info App - by Juan Pablo Valdivia
        </footer>
      </body>
    </html>
  );
}
