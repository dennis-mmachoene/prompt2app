import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Provider from "./provider";
import ConvexClientProvider from "./ConvexClientProvider";

export const metadata = {
  title: "Promp2App",
  description:
    "Prompt2App is an AI-powered platform that transforms simple text prompts into fully functional web applications. Whether you need a landing page, a dashboard, an e-commerce site, or a custom business tool, just describe what you want, and Prompt2App will generate the code for you—instantly!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ConvexClientProvider>
          <Provider>{children}</Provider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
