const SiteLink = ({ link, imgSrc }) => {
  return (
    <div>
      <a href={link} target="_blank" rel="noreferrer">
        <img src={imgSrc} alt={link} className="linkLogo"/>
      </a>
    </div>
  )
}

export default SiteLink;