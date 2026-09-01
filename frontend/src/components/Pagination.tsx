interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page:number) => void;
}

export const Pagination = ({currentPage, totalPages, onPageChange}: PaginationProps) =>{

    return (
        <nav aria-label="controles de paginación"> 
            <button 
                aria-label="Ir a la página anterior"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                {'<'}
            </button>
            <p aria-label="Página actual">{currentPage}</p>
            <button 
                aria-label="Ir a la siguiente página"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                {'>'}
            </button>
        </nav>
    );
}

