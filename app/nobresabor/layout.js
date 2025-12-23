import './reset.css';
import './style.css';

export async function generateMetadata({ params }) {
  const baseUrl = 'https://vicedartt.com'
  const title = 'Nobre Sabor'
  const description = 'portfolio. Explore responsive websites and modern interface projects focused on user experience. Discover my skills, browse my work, and get in touch.'
  const image = `${baseUrl}/favicon.png`
  const url = `${baseUrl}/pt-BR`

  return {
    title,
    description,

    openGraph: {
      title,
      description,
      url,
      type: 'website',
      locale: "pt-BR",
      images: [
        {
          url: image,
          width: 1200,
          height: 630
        }
      ]
    },

    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image]
    }
  }
}

export default async function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
      </body>
    </html>
  )
}