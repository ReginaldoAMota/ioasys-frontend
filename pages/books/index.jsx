import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import useMediaQuery from '../../hooks/useMediaQuery'
import styles from './books.module.css'

import RootContext from '../../context/rootContext'
import BookCard from '../../components/bookCard'

import { ChevronLeft, ChevronRight, LogOut } from 'react-feather'

import books from '../../services/books'
import BookDescriptionCard from '../../components/bookDescriptionCard'

function BooksPage() {
  const [dataBooks, setDataBooks] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [currentPage, setCurrentPage] = useState()
  const [totalResult, setTotalResult] = useState(0)

  const context = useContext(RootContext)
  const route = useRouter()

  const screenSM = useMediaQuery('(max-width: 640px)')
  const screenMD = useMediaQuery('(min-width: 640px) and (max-width: 1000px)')
  const screenLG = useMediaQuery('(min-width: 1000px) and (max-width: 1320px)')
  const screenXL = useMediaQuery('(min-width: 1320px)')

  useEffect(() => {
    handlePageChange(1)
    !context.state.isLoggedIn && route.back()
  }, [])

  const handlePageChange = (page) => {
    books.getAll(context.state.token, page).then((res) => {
      const [data, error] = res
      error && console.log(error)
      if (!error) {
        setDataBooks(data.data)
        setTotalPages(Math.floor(data.totalPages))
        setCurrentPage(data.page)
        setTotalResult(data.totalItems)
      }
    })
  }

  const handleLogOut = () => {
    context.setState({
      ...context.state,
      isLoggedIn: false,
      token: '',
      user: {},
    })
    route.push('/login')
  }

  return (
    <div className={styles.booksPage}>
      <div className={styles.nav}>
        <h1>
          <strong className={styles.logo}>ioasys</strong> Books
        </h1>
        <div>
          {(screenXL || screenLG || screenMD) && (
            <span>
              Bem vindo, <span>{context.state.user.name}</span> !
            </span>
          )}

          <div className={styles.circle} onClick={handleLogOut}>
            <LogOut size={18} color="#333333" />
          </div>
        </div>
      </div>
      <div className={styles.booksCards}>
        {dataBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
      <div className={styles.pagination}>
        {(screenXL || screenLG || screenMD) && (
          <>
            Página {currentPage} de {totalPages}
          </>
        )}
        <div
          className={styles.circle}
          style={currentPage == 1 ? { opacity: '33%' } : {}}
        >
          <ChevronLeft
            size={18}
            color="#333333"
            onClick={() => handlePageChange(currentPage - 1)}
          />
        </div>
        {screenSM && (
          <>
            Página {currentPage} de {totalPages}
          </>
        )}
        <div
          className={styles.circle}
          style={currentPage == totalPages ? { opacity: '33%' } : {}}
        >
          <ChevronRight
            size={18}
            color="#333333"
            onClick={() => handlePageChange(currentPage + 1)}
          />
        </div>
      </div>
      <BookDescriptionCard />
    </div>
  )
}

export default BooksPage
