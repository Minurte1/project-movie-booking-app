import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as action from "../../../services/redux/actions/movieActions";
import Movie from "../../../components/User/Movie";
import Slider from "react-slick";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import Spinner from "../../../components/User/Spinner";
import { NavLink } from "react-router-dom";

function SampleNextArrow(props) {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <ArrowForwardIosIcon style={{ fontSize: 45 }} />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <ArrowBackIosIcon style={{ fontSize: 45 }} />
    </div>
  );
}

const ListMovie = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const listMovie = useSelector((state) => state.movieReducer.listMovie);

  const settings = {
    arrows: true,
    dots: false,
    infinite: true,
    autoplay: false,
    slidesPerRow: 4,
    rows: 10,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesPerRow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesPerRow: 2,
          arrows: false,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesPerRow: 2,
        },
      },
    ],
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  useEffect(() => {
    dispatch(action.getListMovieAPI());
  }, [dispatch]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const renderHTML = (reverse) => {
    let upcoming = [];
    const nowShowing = () => {
      for (let i = 0; i < listMovie.length; i++) {
        if (new Date(listMovie[i].release_date) > new Date()) {
          upcoming.push(listMovie[i]);
        }
      }
    };
    if (reverse) {
      listMovie.reverse();
      nowShowing();
    }
    const filteredMovies = listMovie.filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return filteredMovies.map((item, index) => (
      <div className="slider" key={index}>
        <Movie key={index} movie={item} />
      </div>
    ));
  };

  const renderListMovieMobile = () => {
    return (
      <div className="list-movie--mobile">
        <div className="row m-0">
          {listMovie.map((movie, index) => {
            if (index > 3) {
              return (
                <div className="col-6 p-0 movie--more d-none" key={index}>
                  <NavLink to={`/detail-movie/${movie.movie_id}`}>
                    <div className="movie">
                      <div className="movie__img">
                        <img
                          alt={movie.title}
                          src={movie.poster}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/img/firm-0.webp";
                          }}
                        />
                      </div>
                      <div className="movie__name">{movie.title}</div>
                    </div>
                  </NavLink>
                </div>
              );
            }
            return (
              <div className="col-6 p-0" key={index}>
                <NavLink to={`/detail-movie/${movie.movie_id}`}>
                  <div className="movie">
                    <div className="movie__img">
                      <img
                        alt={movie.title}
                        src={movie.poster}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/img/firm-0.webp";
                        }}
                      />
                    </div>
                    <div className="movie__name">{movie.title}</div>
                  </div>
                </NavLink>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const showmore = () => {
    let boxs = document.getElementsByClassName("movie--more");
    let btn = document.getElementById("showmore-btn");
    for (let i = 0; i < boxs.length; i++) {
      let box = boxs[i];
      box.classList.toggle("d-none");
    }
    if (!btn.classList.contains("show")) {
      btn.innerHTML = "Show less";
      btn.classList.toggle("show");
    } else {
      btn.innerHTML = "Show more";
      btn.classList.toggle("show");
      document.getElementById("list-movie__wrap").scrollIntoView();
      window.scrollBy(0, -60);
    }
  };

  if (listMovie.length) {
    return (
      <div id="list-movie__wrap" className="list-movie__wrap">
        <input
          type="text"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input" // Thêm class ở đây
        />

        <ul
          className="nav nav-tabs justify-content-center align-items-center"
          id="listMovieTab"
          role="tablist"
        >
          <li className="nav-item">
            <a
              className="nav-link active"
              id="dangchieu-tab"
              data-toggle="tab"
              href="#dangchieu"
              role="tab"
              aria-controls="dangchieu"
              aria-selected="true"
            >
              All movies
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              id="sapchieu-tab"
              data-toggle="tab"
              href="#sapchieu"
              role="tab"
              aria-controls="sapchieu"
              aria-selected="false"
            >
              Upcoming
            </a>
          </li>
        </ul>
        <div className="tab-content" id="listMovieTabContent">
          <div
            className="tab-pane fade show active"
            id="dangchieu"
            role="tabpanel"
            aria-labelledby="dangchieu-tab"
          >
            <Slider className="list-movie" {...settings}>
              {renderHTML(false)}
            </Slider>
            <div className="list-movie--mobile">{renderListMovieMobile()}</div>
          </div>
          <div
            className="tab-pane fade"
            id="sapchieu"
            role="tabpanel"
            aria-labelledby="sapchieu-tab"
          >
            <Slider className="list-movie" {...settings}>
              {renderHTML(true)}
            </Slider>
            <div className="list-movie--mobile">{renderListMovieMobile()}</div>
          </div>
        </div>
        <div className="showmore">
          <button
            id="showmore-btn"
            className="btn showmore-btn"
            onClick={showmore}
          >
            Show more
          </button>
        </div>
        <div className="blank"></div>
      </div>
    );
  }
  return <Spinner />;
};

export default ListMovie;
