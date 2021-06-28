import Head from 'next/head'
import Layout from '../components/layout'
import Header from '../components/header'
import Footer from '../components/footer'
import Container from '../components/container'
import { motion } from 'framer-motion'
import sanity from "../lib/sanity"

export default function Home({ home, allServices, allProjects }) {

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
          transition={{duration: .25}}
        >
          <div>
            {home.heroHeading}
            {home.heroBlurb}
          </div>

          <div>
            {home.whoWeAreHeading}
            {home.whoWeAreBlurb}
          </div>

          <div className="text-white bg-primary">
            {home.whatWeDoHeading}
            {home.whatWeDoSubheading}
            {home.whatWeDoBlurb}

            {allServices.map(( service, index ) => {
              return(
                <div key={index} className="">
                  {service.title}
                </div>
              )
            })}
          </div>

          <div className="">
            {home.howWeHelpHeading}
            {home.howWeHelpBlurb}
          </div>

          <div className="text-white bg-primary">
            <p>Case Studies</p>
            {allProjects.map(( project, index ) => {
              return(
                <div key={index} className="">
                  {project.title}
                </div>
              )
            })}
          </div>

          <div className="bg-gray-100">
            <p>What They Say</p>
            {allProjects.map((project, index) => {
              return(
                <div key={index} className="">
                  {project.clientReview ? project.clientReview : null}
                </div>
              )
            })}
          </div>

          <div className="text-white bg-secondary">
            <p>Work with us</p>
            <p>Get in touch today and find out how we can help you.</p>
          </div>          

        </motion.div>

        <Footer />

    </Layout>

  )
}


const homeQuery = `*[_type == "home"][0] 
  {
    _id,
    title,
    heroHeading,
    heroBlurb,
    heroImage,
    whoWeAreHeading,
    whoWeAreBlurb,
    whatWeDoHeading,
    whatWeDoSubheading,
    whatWeDoBlurb,
    howWeHelpHeading,
    howWeHelpBlurb,
  }
`;

const allServiceQuery = `*[_type == "service"]
{
  _id,
  title,
}
`;

const allProjectQuery = `*[_type == "project"]
{
  _id,
  title,
  projectImage,
  clientReview,
}
`;

export const getStaticProps = async () => {
  const home = await sanity.fetch(homeQuery);
  const allServices = await sanity.fetch(allServiceQuery);
  const allProjects = await sanity.fetch(allProjectQuery);
  return {
    props: { home, allServices, allProjects } // will be passed to the page component as props
  };
};
