import "./globals.css";

export const metadata = {
  title: "Next.js CRUD App",
  description: "Built with Node, Express, and MongoDB",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
