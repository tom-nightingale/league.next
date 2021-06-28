import { EMAIL_ADDRESS, PHONE_NUMBER } from '../lib/constants'
import Container from './container'
import Link from 'next/link'

export default function Header() {
    return (
        <header className="">
            <Container>
                <div className="flex flex-wrap justify-between w-full">

                    <Link className="max-w-1/2" href="/">
                        <a className="">
                            Logo
                        </a>
                    </Link>

                    <div className="flex items-center max-w-1/2">

                        <div className="flex flex-col">
                            <a href={`mailto:${EMAIL_ADDRESS}`}>
                                {EMAIL_ADDRESS}
                            </a>

                            <a href={`tel:${PHONE_NUMBER}`}>
                                {PHONE_NUMBER}
                            </a>
                        </div>

                        <button className="">
                            Search
                        </button>

                        <button>
                            Menu Button
                        </button>

                    </div>
                </div>
            </Container>
        </header>
    )
}