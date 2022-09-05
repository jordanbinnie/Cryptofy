import React, { useState, useEffect } from 'react'
import './Sidepanel.css'
import useCurrentWidth from '../../hooks/useCurrentWidth'
import { MdOutlineClear } from 'react-icons/md'

function Sidepanel() {
  const [news, setNews] = useState('')
  const [loading, setLoading] = useState(true)
  const [sidepanel, setSidepanel] = useState('')

  const fetchNews = () => {
    const url = 'https://newsapi.org/v2/top-headlines?' +
              'q=Crypto&' +
              'apiKey=500b9a2861184b04827aa346fdcf28d5';
          
    const req = new Request(url);

    setLoading(true)

    fetch(req)
    .then(res => res.json())
    .then(data => setNews(data.articles))

    setLoading(false)
  }

  useEffect(() => {
    fetchNews()
  }, [])

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  // hard coded news data for production code, because newsapi.org only supports testing and local host api calls
  
  const staticNews = [
    {
      urlToImage: "https://techcrunch.com/wp-content/uploads/2022/02/drawkit-illustrations-8iIUDnRq87o-unsplash-1.jpg?w=711",
      publishedAt: "2022-09-04T16:00:21Z",
      title: "How the upcoming Ethereum Merge could change crypto’s rewards, costs and reputation",
      author: "Anita Ramaswamy",
      source: {
        name: "TechCrunch"
      },
      url: "https://techcrunch.com/2022/09/04/how-the-upcoming-ethereum-merge-could-change-cryptos-rewards-costs-and-reputation/",
    },
    {
      urlToImage: "https://techcrunch.com/wp-content/uploads/2022/09/TC22_Sessions_Crypto_Wordpress_Header_Image_1200x628-1.png?w=764",
      publishedAt: "2022-09-04T15:55:37Z",
      title: "Less than 3 days left for 2-for-1 sale on TC Sessions: Crypto passes!",
      author: "Lauren Simonds",
      source: {
        name: "TechCrunch"
      },
      url: "https://techcrunch.com/2022/09/04/2-for-1-sale-on-tc-sessions-crypto-passes/",
    },
    {
      urlToImage: "https://media.wired.com/photos/630916d9ba2a66af641b11ee/master/w_1600,c_limit/Ledger-Nano-X-Gear.jpg",
      publishedAt: "2022-08-29T09:00:00Z",
      title: "This Cold-Storage Crypto Wallet Is a Smart Investment",
      author: "Scott Gilbertson",
      source: {
        name: "Wired"
      },
      url: "https://www.theglobeandmail.com/podcasts/the-decibel/article-panic-at-the-crypto/",
    },
    {
      urlToImage: "https://www.theglobeandmail.com/resizer/_avQSW-gNb8XMlBIpkC-PJlBCCk=/1200x800/filters:quality(80)/cloudfront-us-east-1.images.arcpublishing.com/tgam/GHQ5WM2SKJDSDH53LMIWUHHUSA.png",
      publishedAt: "2022-06-16T09:00:00Z",
      title: "Panic at the crypto",
      author: "Unknown",
      source: {
        name: "The Globe And Mail"
      },
      url: "https://www.theglobeandmail.com/podcasts/the-decibel/article-panic-at-the-crypto/",
    },
]

  //mobile friendly

  let width = useCurrentWidth()

  const maxWidth = () => {
    if (width > 480) return "-450px"
    if (width < 480) return "-350px"
  }

  if (width > 1500 && sidepanel) {
      sidepanel.style.right = "0px"
  } else if (width < 1500 && sidepanel) {
      sidepanel.style.right = maxWidth()
  }

  useEffect(() => {

      setSidepanel(() => {
          const element = document.querySelector('.Sidepanel--fixed')
          return element
      })
  }, [])

  function handleExitSidepanel() {
      sidepanel.style.right = maxWidth()
  }

  let content = news ? news : staticNews


  return (
    <div className="Sidepanel--fixed">
        <div className="Sidepanel">
          <div className="Sidepanel_block block--header">
            <h2 className="heading heading--2">Latest <span id="color-blue">Crypto News</span></h2>
            <div className="Sidepanel-exit-icon" onClick={handleExitSidepanel}>
                <MdOutlineClear /> 
            </div>
          </div>
          {(!loading && content) && content?.map((story, index) => {
            if (index === 0) {
              return (    
                <div className="Sidepanel_block block--main">
                  <img src={story?.urlToImage}/>
                  <div className="Sidepanel_block_content--main">
                    <div className="image-back-drop">
                      <p className="heading subHeading--3 uppercase">{formatDate(story?.publishedAt)}</p>
                      <h3 className="heading heading--3">{story?.title}</h3>
                      <p className="subHeading--2">{story?.author},</p>
                      <p className="subHeading--3">{story?.source.name}</p>
                    </div>
                    <a href={story?.url} target="_blank" rel="noreferrer"><p className="news_button--main heading subHeading--3">See more</p></a>
                  </div>
                </div>
              )
            } else {
              return (
                <div className="Sidepanel_block block--regular">
                  <div className="Sidepanel_block_image-container">
                    <img src={story?.urlToImage} />
                  </div>
                  <div className="Sidepanel_block_content--regular">
                    <h3 className="heading paragraph--2">{story?.title}</h3>
                    <p className="heading subHeading--3 gray-font">{formatDate(story?.publishedAt)}</p>
                    <a href={story?.url} target="_blank" rel="noreferrer"><p className="news_button heading subHeading--3">See more</p></a>
                  </div>
                </div>
              )
            }
          })}
        </div>
    </div>
  )
}

export default Sidepanel