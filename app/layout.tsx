import type { Metadata } from "next";
import CssBaseline from "@mui/material/CssBaseline";

export const metadata: Metadata = {
  title: "LinkedIn PDF Maker",
  description: "Generated PDF from LinkedIn Profile URL",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CssBaseline />
        {children}
      </body>
    </html>
  );
}
