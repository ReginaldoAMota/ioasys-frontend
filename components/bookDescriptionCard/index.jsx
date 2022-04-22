import Modal from 'react-modal'
import styles from './bookdesc.module.css'

import { X } from 'react-feather'
import { useContext, useEffect, useState } from 'react'
import RootContext from '../../context/rootContext'

Modal.setAppElement('#__next')

function BookDescriptionCard() {
  const [book, setBook] = useState({})

  const context = useContext(RootContext)
  useEffect(() => {
    setBook(context.state.book)
    console.log('book', book)
  }, [context.state.ModalBookInfoIsOpen])

  return (
    <div>
      {context.state.ModalBookInfoIsOpen && (
        <div
          className={styles.btnClose}
          onClick={() =>
            context.setState({ ...context.state, ModalBookInfoIsOpen: false })
          }
        >
          <X color="#333333" size={16} />
        </div>
      )}

      <Modal
        isOpen={context.state.ModalBookInfoIsOpen}
        contentLabel="Example Modal"
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        {book && (
          <div className={styles.modalBody}>
            <div className={styles.modalImg}>
              <img src={book.imageUrl} alt={book.title} />
            </div>
            <div className={styles.bookInfo}>
              <div>
                <h1>
                  <strong>{book.title}</strong>
                </h1>
                <h2>
                  {book.authors?.map((item, index) => (
                    <span key={index}>
                      {index < book.authors?.length - 1 ? `${item}, ` : item}
                    </span>
                  ))}
                </h2>
              </div>
              <div>
                <h3>INFORMAÇÕES</h3>
                <p>
                  <span>Páginas </span> {book.pageCount} páginas
                </p>
                <p>
                  <span>Editora </span> {book.publisher}
                </p>
                <p>
                  <span>Publicação </span> {book.published}
                </p>
                <p>
                  <span>Idioma </span> {book.language}
                </p>
                <p>
                  <span>Titulo Original </span> {book.language}
                </p>
                <p>
                  <span>ISBN-10 </span> {book.isbn10}
                </p>
                <p>
                  <span>ISBN-13 </span> {book.isbn13}
                </p>
              </div>
              <div>
                <h3>RESENHA DA EDITORA</h3>
                <p>{book.description}</p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
export default BookDescriptionCard
