import Header from "../components/selectionPage/Header";
import classes from "../components/selectionPage/selection.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCategories } from "../store/categorySlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "../components/selectionPage/Modal";

function NomineeSelection() {
  const [firstCategory, setFirstCategory] = useState();
  const [secondCategory, setSecondCategory] = useState();
  const [selectedFirstId, setSelectedFirstId] = useState();
  const [selectedSecondId, setSelectedSecondId] = useState();
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("http://localhost:3031/categories")
      .then((res) => {
        setFirstCategory(res?.data[0]);
        setSecondCategory(res?.data[1]);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = () => {
    if(!selectedFirstId || !selectedSecondId){
      toast.warning("Please select one movie on Both Categories!")
    }else{
      const firstSelected = firstCategory.movies.filter((item)=> selectedFirstId === item.id);
      const secondSelected = secondCategory.movies.filter((item)=> selectedSecondId === item.id);
      dispatch(setCategories({selectedMovies: {firstSelected, secondSelected}}));
      setShowModal(true);
    }
  }

  const handleHide = () => {
    setShowModal(false);
  }

  return (
    <div>
      <ToastContainer />
      <Header />
      <div className={classes["selection_body"]}>
        <p className={classes["title"]}>Movie Awards 2021</p>
        {firstCategory && (
          <div>
            <p>{firstCategory?.category}</p>
            <div className={classes["category"]}>
              {firstCategory?.movies.map((movie) => (
                <div key={movie.id} className={`${classes["card"]} ${selectedFirstId === movie.id ? classes['selected_card'] : ''}`}>
                  <p>{movie.title}</p>
                  <img src={movie.image} alt={movie.title} />
                  <button
                    onClick={() => {
                      if(selectedFirstId){
                        toast.error("Only One Choice for each category!!");
                        setSelectedFirstId(movie.id);
                      }else{
                        setSelectedFirstId(movie.id);
                      }
                    }}
                    >
                    select Movie
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        {secondCategory && (
          <div>
            <p>{secondCategory?.category}</p>
            <div className={classes["category"]}>
              {secondCategory?.movies.map((movie) => (
                <div key={movie.id} className={`${classes["card"]} ${selectedSecondId === movie.id ? classes['selected_card'] : ''}`}>
                  <p>{movie.title}</p>
                  <img src={movie.image} alt={movie.title} />
                  <button
                    onClick={() => {
                      if(selectedSecondId){
                        toast.error("Only One Choice for each category!!");
                        setSelectedSecondId(movie.id);
                      }else{
                        setSelectedSecondId(movie.id);
                      }
                    }}
                    >
                    select Movie
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <p className={classes['button_wrap']}>
        <button onClick={handleSubmit}>Submit</button>
      </p>
      {showModal && <Modal handleHide={handleHide} />}
    </div>
  );
}

export default NomineeSelection;
