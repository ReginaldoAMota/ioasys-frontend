import Image from 'next/image'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import RootContext from '../../context/rootContext'
import styles from './bookCard.module.css'

export default function BookCard({ book }) {
  const context = useContext(RootContext)

  return (
    <div
      className={styles.card}
      onClick={() =>
        context.setState({ ...context.state, book, ModalBookInfoIsOpen: true })
      }
    >
      <div>
        <img src={book.imageUrl} alt={book.title} />
      </div>
      <div className={styles.bookInfo}>
        <div>
          <h1>{book.title}</h1>
          <span>
            {book.authors.map((item, index) => (
              <span key={index}>
                {index < book.authors.length - 1 ? `${item}, ` : item}
                <br />
              </span>
            ))}
          </span>
        </div>
        <div>
          <p>{book.pageCount} páginas</p>
          <p>Editora {book.publisher}</p>
          <p>Publicado em {book.published}</p>
        </div>
      </div>
    </div>
  )
}
