import styles from "../styles/Pagination.module.css";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page:number) => void;
}

export const Pagination = ({currentPage, totalPages, onPageChange}: PaginationProps) =>{

    return (
        <nav aria-label="controles de paginación" className={styles.pagination}> 
            <button
                className={styles.button}
                aria-label="Ir a la página anterior"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                {'<'}
            </button>
            <p className={styles.pageIndicator} aria-label="Página actual">{currentPage}</p>
            <button
                className={styles.button}
                aria-label="Ir a la siguiente página"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                {'>'}
            </button>
        </nav>
    );
}

