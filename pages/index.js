import React from 'react'
import Head from 'next/head'
import Link from 'next/link'

import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faCalendarAlt, faExternalLink, faMapSigns } from '@fortawesome/free-solid-svg-icons'
import { faDiscord, faInstagram } from '@fortawesome/free-brands-svg-icons'

import calendar from '../data/calendar.json'
import clubs from '../data/clubs.json'
import styles from '../styles/Home.module.css'
import { Card, Carousel } from 'react-bootstrap'
import { formatFriendlyDateTime } from '../lib/date-utils'
import PropTypes from 'prop-types'

function getCards (arr) {
  let p = 0
  const data = arr
  const carousel = []
  for (let i = 0; i < Math.ceil(arr.length / 3); i++) {
    let firstCard = null
    let secondCard = null
    let thirdCard = null

    if (data[p] != null) {
      firstCard = getSingleCard(data[p])
    }
    if (data[p + 1] != null) {
      secondCard = getSingleCard(data[p + 1])
    }
    if (data[p + 2] != null) {
      thirdCard = getSingleCard(data[p + 2])
    }
    const carouselItem = <Carousel.Item key={p}>
      {firstCard}{secondCard}{thirdCard}
    </Carousel.Item>
    carousel.push(carouselItem)
    p = p + 3
  }

  return carousel
}

function getSingleCard (item) {
  const date = new Date(item.begin)
  const club = clubs.find(it => it.club === item.organizer)

  if (item.organizer != null && club != null) {
    return <Card className={styles.card}>
      <Card.Body>
        <Card.Title><h4>{item.title}</h4></Card.Title>
        <Card.Subtitle>{formatFriendlyDateTime(date)}</Card.Subtitle>
        <Card.Text>
          <span>{item.organizer} </span>
          <Card.Link href={club.website}><FontAwesomeIcon icon={faExternalLink}/></Card.Link>
          <Card.Link href={club.instagram}><FontAwesomeIcon icon={faInstagram}/></Card.Link>
        </Card.Text>
      </Card.Body>
    </Card>
  } else {
    return <Card className={styles.card}>
        <Card.Body>
          <Card.Title><h4>{item.title}</h4></Card.Title>
          <Card.Subtitle>{formatFriendlyDateTime(date)}</Card.Subtitle>
          <Card.Text>
            <span>{item.organizer.length > 0 && item.organizer} </span>
          </Card.Text>
        </Card.Body>
      </Card>
  }
}

function Home ({ rawData }) {
  return (
    <Container className={styles.container}>
      <Head>
        <title>Digitale O-Phase</title>
        <meta name="description" content="Eine digitale O-Phase für die Erstis an der TH Ingolstadt."/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <link rel="icon" href="https://assets.neuland.app/StudVer_Logo_ohne%20Schrift.svg"/>
      </Head>

      <img
        src="https://assets.neuland.app/StudVer_Logo_2020_CMYK.svg"
        alt="Studierendenvertretung TH Ingolstadt"
        className={styles.logo}
      />

      <main className={styles.main}>
        <h1 className={styles.title}>
          Digitale O-Phase
        </h1>

        <p>
          Willkommen an der Technischen Hochschule Ingolstadt!
        </p>

        <p>
          Um euch die Ankunft in Ingolstadt beziehungsweise Neuburg und den Studienbeginn etwas angenehmer zu gestalten,
          haben wir entschlossen, eine digitale O-Phase zu erproben. Wir hoffen, eure Zeit an unserer Hochschule damit
          etwas angenehmer gestalten zu können.
        </p>

        <p>
          &ndash; Eure Fachschaft Informatik &lt;3
        </p>

        {rawData.length >= 8 &&
          <>
            <Link href="#studyguide">
              <Button variant={'secondary'} className={styles.button}>
                Springe zum Studienguide
              </Button>
            </Link>
            <Link href="#cityguide">
              <Button variant={'secondary'} className={styles.button}>
                Springe zur Stadtführung
              </Button>
            </Link>
            <Link href="#discord">
              <Button variant={'secondary'} className={styles.button}>
                Springe zu den Discord Servern
              </Button>
            </Link>
          </>
        }

        {rawData && rawData.length > 0 &&
          <>
            <hr/>

            <h2 className={styles.subtitle}>
              <FontAwesomeIcon icon={faCalendarAlt} fixedWidth/>
              <> Veranstaltungen</>
            </h2>

            <Carousel variant="dark">
              {getCards(rawData).map((item) => {
                return item
              })}
            </Carousel>
          </>
        }

        <hr id="studyguide"/>

        <h2 className={styles.subtitle}>
          <FontAwesomeIcon icon={faBook} fixedWidth/>
          <> Studienguide</>
        </h2>

        <p>
          In den folgenden Themenbereichen versuchen wir das wichtigste Knowhow zu eurem Studierendenleben an der THI
          zusammenzufassen:
        </p>

        <p>
          <Link href="/guide/studies">
            <Button variant="primary">
              Dein Studium
            </Button>
          </Link>
        </p>

        <p>
          <Link href="/guide/life">
            <Button variant="primary">
              Dein Studierendenleben
            </Button>
          </Link>
        </p>

        <p>
          <Link href="/guide/campus">
            <Button variant={'primary'}>
              Dein Campus
            </Button>
          </Link>
        </p>

        <p>
          <Link href="/guide/glossary">
            <Button variant={'primary'}>
              Glossar
            </Button>
          </Link>
        </p>

        <p>
          Bei allen Informationen, die auf euch einprasseln, vergesst eines nicht: <b>Macht euch nicht verrückt!</b>
        </p>

        <hr id='cityguide'/>

        <h2 className={styles.subtitle}>
          <FontAwesomeIcon icon={faMapSigns} fixedWidth/>
          <> Virtuelle Stadt- und Campusführung</>
        </h2>

        <p>
          Eine virtuelle Stadt- und Campusführung als interaktive Karte, damit ihr Ingolstadt und Neuburg selbst
          erkunden könnt.
        </p>

        <p>
          <Link href="/tour/ingolstadt" target='_blank'>
            <Button variant="primary">
              Ingolstädter Führung öffnen
            </Button>
          </Link>
        </p>

        <p>
          <Link href="/tour/neuburg">
            <Button variant="primary">
              Neuburger Führung öffnen
            </Button>
          </Link>
        </p>

        <p>
          <Link href="/scavenger">
            <Button variant="primary">
              Digitale Schnitzeljagd (Ingolstadt)
            </Button>
          </Link>
        </p>

        <hr id='discord'/>

        <h2 className={styles.subtitle}>
          <FontAwesomeIcon icon={faDiscord} fixedWidth/>
          <> Discord-Server der Fakultäten</>
        </h2>

        <p>
          Hier könnt Ihr die Discord-Server der Fakultäten finden:
        </p>

        <p>
          <a href="https://discord.gg/pTvQEZpga7" target="_blank" rel="noreferrer">
            <Button>
              Server der Fakultät I
            </Button>
          </a>
        </p>

        <p>
          <a href="https://discord.gg/2gzsCD744V" target="_blank" rel="noreferrer">
            <Button>
              Server der Fakultät E
            </Button>
          </a>
        </p>

        <p>
          <a href="https://discord.gg/gP4hQaxmRS" target="_blank" rel="noreferrer">
            <Button>
              Server der Fakultät M
            </Button>
          </a>
        </p>

        <p>
          <a href="https://discord.gg/geebhm5UKF" target="_blank" rel="noreferrer">
            <Button>
              Server der Fakultät WI
            </Button>
          </a>
        </p>

        <hr/>
      </main>

      <footer className={styles.footer}>
        <p>
          Ein Projekt der <a href="https://studverthi.de" target="_blank" rel="noreferrer">Fachschaft Informatik
          (StudVer)</a> in Kooperation mit <a href="https://neuland-ingolstadt.de" target="_blank" rel="noreferrer">Neuland
          Ingolstadt e.V.</a>
        </p>
        <p>
          Wir würden uns über euer Feedback freuen &ndash; entweder über Discord oder <a
          href="mailto:info@neuland-ingolstadt.de">per E-Mail</a>.
        </p>
        <p>
          <a href="https://github.com/neuland-ingolstadt/orientierungsphase" target="_blank"
             rel="noreferrer">Quellcode</a>
          <> &ndash; </>
          <a href="https://neuland-ingolstadt.de/impressum.htm" target="_blank" rel="noreferrer">Impressum und
            Datenschutz</a>
        </p>
      </footer>
    </Container>
  )
}

export async function getServerSideProps () {
  const res = await fetch('https://neuland.app/api/cl-events')
  const dataWeb = await res.json()

  const rawData = calendar
    .concat(dataWeb)
    .sort((a, b) => a.begin.localeCompare(b.begin))
    .filter(x => {
      if (x.end != null) {
        const date = new Date(x.end)
        return date > Date.now()
      } else {
        const date = new Date(x.begin)
        return date > Date.now()
      }
    })

  const finalRawData = rawData
    .filter(x => {
      const xDate = new Date(x.begin)
      const startDay = new Date(rawData[0].begin)
      xDate.setHours(12, 0, 0)
      startDay.setHours(12, 0, 0)

      const dateDelta = (xDate - startDay)
      const roundedDateDelta = Math.round(dateDelta / 86400000)

      return roundedDateDelta <= 14
    })

  return { props: { rawData: finalRawData } }
}

Home.propTypes = {
  rawData: PropTypes.array
}

export default Home
