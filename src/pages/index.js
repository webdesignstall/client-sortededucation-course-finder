import Head from 'next/head'
import UnderConstruction from "@/components/UnderConstruction";
import RootLayout from "@/components/Layouts/RootLayout";

export default function Home() {
    return (
        <>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
                <link href="https://fonts.cdnfonts.com/css/norwester" rel="stylesheet"/>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
                <link
                    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap"
                    rel="stylesheet"/>
            </Head>
            <main>
                <UnderConstruction/>
            </main>
        </>
    )
}

Home.getLayout = function getLayout(page) {
    return (
        <RootLayout>{page}</RootLayout>
    );
};
