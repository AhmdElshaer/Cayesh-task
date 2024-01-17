import { useSelector } from 'react-redux';
import classes from './selection.module.css';

function Modal(props) {
  const selectedMovies = useSelector(state=> state.categories);
  const firstSelectedMovie = selectedMovies?.selectedMovies?.firstSelected[0];
  const secondSelectedMovie = selectedMovies?.selectedMovies?.secondSelected[0];
  return (
    <div className={classes['modal_container']}>
      <div className={classes['modal_body']}>
        <button onClick={props.handleHide} className={classes['close']}>X</button>
        <p>SUCCESS</p>
        <div className={classes["result"]}>
          {selectedMovies && 
          <>
            <div className={classes['card']}>
              <p>{firstSelectedMovie?.title}</p>
              <img src={firstSelectedMovie?.image} alt={firstSelectedMovie?.title} />
            </div>
            <div className={classes['card']}>
              <p>{secondSelectedMovie?.title}</p>
              <img src={secondSelectedMovie?.image} alt={secondSelectedMovie?.title} />
            </div>
          </>
          }
        </div>
      </div>
      </div>
  )
}

export default Modal