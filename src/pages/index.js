import Head from 'next/head'
import UnderConstruction from "@/components/UnderConstruction";
import RootLayout from "@/components/Layouts/RootLayout";

export default function Home() {
    return (
        <>
            <Head>
                <title>Enroll and Excel</title>
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
