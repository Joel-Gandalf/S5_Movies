import headingImage from '../assets/images/imagen-muestra.png';
import styles from '../styles/HomePage.module.css';

export const HomePage = () => {
  
    return (
        <>
            <section className={styles.hero}>
                <h1 className={styles.title}>
                    Déjate envolver por la magia del cine
                </h1>
                <p className={styles.intro}>
                    Explora miles de películas, guarda tus favoritas y puntúalas a tu manera. Tu espacio personal para no perder de vista el cine que te apasiona.
                </p>
            </section>

            <section className={styles.section} aria-labelledby="discover-heading">
                <div className={styles.sectionContent}>
                    <h2 id="discover-heading" className={styles.sectionHeading}>
                        Tu rincón para descubrir el cine que te apasiona
                    </h2>
                    <p className={styles.sectionDescription}>
                        Busca por título, actor o director, filtra por género o puntuación... Encuentra siempre algo nuevo que ver.
                    </p>
                </div>
                <figure className={styles.figure}>
                    <img src={headingImage} alt="Vista previa de la aplicación PROVISIONAL" />
                </figure>
            </section>

            <section className={styles.section} aria-labelledby="people-heading">
                <div className={styles.sectionContent}>
                    <h2 id="people-heading" className={styles.sectionHeading}>
                        Mira detrás del telón
                    </h2>
                    <p className={styles.sectionDescription}>
                        Descubre la trayectoria de tus actores y directores favoritos, y explora toda su filmografía.
                    </p>
                </div>
                <figure className={styles.figure}>
                    <img src={headingImage} alt="Vista previa de la aplicación PROVISIONAL" />
                </figure>
            </section>

            <section className={styles.section} aria-labelledby="favorites-heading">
                <div className={styles.sectionContent}>
                    <h2 id="favorites-heading" className={styles.sectionHeading}>
                        El cine que te gusta, organizado a tu manera
                    </h2>
                    <p className={styles.sectionDescription}>
                        Marca tus películas preferidas y tenlas siempre a mano, en un único listado personal.
                    </p>
                </div>
                <figure className={styles.figure}>
                    <img src={headingImage} alt="Vista previa de la aplicación PROVISIONAL" />
                </figure>
            </section>

            <section className={styles.section} aria-labelledby="rating-heading">
                <div className={styles.sectionContent}>
                    <h2 id="rating-heading" className={styles.sectionHeading}>
                        Tu opinión también cuenta
                    </h2>
                    <p className={styles.sectionDescription}>
                        Construye tu propio criterio y compártelo con la comunidad.
                    </p>
                </div>
                <figure className={styles.figure}>
                    <img src={headingImage} alt="Vista previa de la aplicación PROVISIONAL" />
                </figure>
            </section>
        </>
    );
} 