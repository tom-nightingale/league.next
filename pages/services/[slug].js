import Head from 'next/head'
import Layout from '@/components/layout'
import Header from '@/components/header'
import Footer from '@/components/footer'
import Container from '@/components/container'
import { motion } from 'framer-motion'
import sanity from "@/lib/sanity"

export default function Project({ service }) {

    console.log(service);

    return (

        <Layout>

            <Head>
                <link rel="icon" href="/favicon.ico" />
                <title>Nextjs boilerplate</title>
                <meta
                    name="description"
                    content="nextJS boilerplate"
                />
                <meta name="og:title" content="Website Title" />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>

            <Header />

            <motion.div
                key="homepage"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: .25 }}
            >

                {service.title}

            </motion.div>

            <Footer />

        </Layout>

    )
}

// Grab the data for the current service
const currentServiceQuery = `*[_type == "service" && slug.current == $slug][0]
{
  _id,
  slug,
  title,
}
`;
export const getStaticProps = async ({ params }) => {
    const service = await sanity.fetch(currentServiceQuery, { slug: params.slug });

    return {
        props: { service } // will be passed to the page component as props
    };
};


// Generate routes for all of our services
const allServiceQuery = `*[_type == "service"] { slug }`;
export async function getStaticPaths() {
    const services = await sanity.fetch(allServiceQuery);
    const paths = services.map(service => ({
        params: { slug: service.slug.current }
    }));

    return { paths, fallback: false };
}