import { GetServerSideProps, GetServerSidePropsContext, GetStaticPropsContext, NextPage } from "next"
import Head from "next/head"
import styles from '../../styles/Home.module.css'
import { useRouter } from 'next/router'
import startsWithVowel from "../../helpers/startsWithVowel"
import Image from 'next/image'
import quizData from '../quizData.json'

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext): Promise<any> => {
    // It's important to default the slug so that it doesn't return "undefined"
    const slug = context.query.slug;
    let index = 0

    switch (slug) {
        case 'the Bronx':
            index = 0;
            break;

        case 'Brooklyn':
            index = 1;
            break;

        case 'Manhattan':
            index = 2;
            break;

        case 'Queens':
            index = 3;
            break;

        case 'Staten Island':
            index = 4;
            break;
    }

    let result = undefined;
    try {
        result = quizData.results[index];
    } catch (e) {
        console.error('result not valid');
        return {
            redirect: {
                permanent: false,
                destination: '/',
            },
            props: {}
        }
    }

    return {
        props: {
            slug,
            result
        }
    }
}

const Result: NextPage<any> = ({ slug, result }) => {

    const title = `I belong in ${result.title}`;
    const description = result.me_description;
    const url = `https://aft-nyc.vercel.app/result/${slug}`;
    const img = result.cover;

    return (
        <div className={styles.container}  style={{
            backgroundColor:'#fff',
            height: '100vh'
          }}>
            {
                result !== undefined && (
                    <>
                        <Head>

                            <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
                            <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
                            <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
                            <link rel="manifest" href="/favicon/site.webmanifest" />

                            <title>{title}</title>
                            <meta name="title" content={title} />
                            <meta name="description" content={description} />

                            <meta property="og:type" content="website" />
                            <meta property="og:url" content={url} />
                            <meta property="og:title" content={title} />
                            <meta property="og:description" content={description} />
                            <meta property="og:image" content={img} />

                            <meta property="twitter:card" content="summary_large_image" />
                            <meta property="twitter:url" content={url} />
                            <meta property="twitter:title" content={title} />
                            <meta property="twitter:description" content={description} />
                            <meta property="twitter:image" content={img} />


                        </Head>
                        <main style={{ maxWidth: 'calc(500px, 95vw)', margin: '0 auto', textAlign: 'center', color: '#11001c' }}>
                            <div className={styles.shareResult} style={{ marginTop: '50px', marginBottom: '50px' }}>
                                <span style={{ fontSize: '88px', display: 'block', margin: '0 auto', width: '40%' }}>{result.emoji}</span>
                                <h1>I belong in <em>{result.title}</em></h1>
                                <span>
                                    I did this quiz to finds out what New York City borough suits me best.<br />
                                    {description.split('. What')[0]}<br />
                                </span>

                                <p>
                                    Which New York City Borough Suits you best?<br />
                                    You can find out as well!<br /><br /><br />
                                    <a href='https://aft-nyc.vercel.app/' className={styles.card} style={{ display: 'block', maxWidth: '200px', margin: '0 auto', borderColor:'#11001c' }}>Do the quiz &rarr;</a>
                                </p>
                            </div>
                        </main>
                    </>
                )
            }


            <footer className={styles.footer}>
                <a
                    href='https://www.aftleuven.be'
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{color: '#11001c'}}
                >
                    Quiz by{' '}
                    <span className={styles.logo}>
                        <Image src="/aft.svg" alt="AFT Logo" width={72} height={16} />
                    </span>
                </a>
            </footer>
        </div >
    )
}

export default Result