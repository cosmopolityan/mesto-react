function Card ({card, onCardClick}) {

  return (
    <li
      className="element"
    >
        <img className="element__image" src={card.link} alt={card.name}
          onClick={() => onCardClick(card)}
        />
        <button
          type="button"
          className="element__trash-button"
          aria-label="Удалить"
        >
        </button>
      <div className="element__container">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like">
          <button type="button" className="element__like-button" aria-label="Добавить в избранное"></button>
          <span className="element__likecounter">{card.likes.length}</span>
        </div>
      </div>
    </li>
  )
}

export default Card