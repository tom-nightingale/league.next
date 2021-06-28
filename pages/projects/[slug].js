import Head from 'next/head'
import Layout from '@/components/layout'
import Header from '@/components/header'
import Footer from '@/components/footer'
import Container from '@/components/container'
import { motion } from 'framer-motion'
import sanity from "@/lib/sanity"

export default function Project({ project }) {

    console.log(project);

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

                {project.title}

            </motion.div>

            <Footer />

        </Layout>

    )
}

// Grab the data for the current project
const currentProjectQuery = `*[_type == "project" && slug.current == $slug][0]
{
  _id,
  slug,
  title,
  projectImage,
  clientReview,
}
`;
export const getStaticProps = async ({ params }) => {
    const project = await sanity.fetch(currentProjectQuery, { slug: params.slug });

    return {
        props: { project } // will be passed to the page component as props
    };
};


// Generate routes for all of our projects
const allProjectQuery = `*[_type == "project"] { slug }`;
export async function getStaticPaths() {
    const projects = await sanity.fetch(allProjectQuery);
    const paths = projects.map(project => ({
        params: { slug: project.slug.current }
    }));

    return { paths, fallback: false };
}