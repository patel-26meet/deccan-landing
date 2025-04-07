
import Layout from "@/components/shared/Layout";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body >
                <Layout>{children}</Layout>
            </body>
        </html>
    );
}
