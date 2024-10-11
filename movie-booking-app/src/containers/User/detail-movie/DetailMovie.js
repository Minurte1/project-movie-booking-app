import React, { useEffect, useState } from "react";
import Axios from "axios";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import Footer from "./../home/Footer";
import Loader from "../../../components/User/Loader";
import GroupCinemaMovies from "../../../components/User/GroupCinemaMovies";
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { Modal, Button, Form } from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import "react-bootstrap/dist/react-bootstrap.min.js";
import "react-circular-progressbar/dist/styles.css";
import CinemaSeatsModal from "./modal/CinemaSeatsModal";
import axios from "axios";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: 440,
    overflow: "hidden",
  },
}));

const theme = createTheme({
  palette: {
    primary: {
      main: "#ff7539",
    },
    secondary: {
      main: "#fb4226",
    },
  },
  overrides: {
    PrivateTabScrollButton: {
      vertical: {
        // color: "#fb4226",
        position: "relative",
        "&::after": {
          content: '""',
          position: "absolute",
          bottom: 0,
          left: "50%",
          width: "calc(100% - 40px)",
          transform: "translateX(-50%)",
          borderBottom: "1px solid rgba(238, 238, 238, 0.88)",
        },
        "&::before": {
          content: '""',
          position: "absolute",
          top: -1,
          left: "50%",
          width: "calc(100% - 40px)",
          transform: "translateX(-50%)",
          borderTop: "1px solid rgba(238, 238, 238, 0.88)",
        },
      },
    },
  },
});

function DetailMovie(props) {
  const classes = useStyles();
  const [modalShow, setModalShow] = useState(false);
  const [bookingModalShow, setBookingModalShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [detailMovie, setDetailMovie] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [username, setUsername] = useState("");

  const [bookingInfo, setBookingInfo] = useState({
    name: "",
    email: "",
    phone: "",
    time: "",
    payment: "",
    date: "",
    day_of_week: "",
    seat_number: "",
  });
  const [data_Comment, setData_Comment] = useState([]);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const localStoreUsername = localStorage.getItem("User");
      setUsername(localStoreUsername);
      const id = props.match.params.id;

      try {
        // Thực hiện tất cả các API request song song
        const [response, response_comment, result] = await Promise.all([
          Axios.get(`http://localhost:5000/films?id=${id}`),
          Axios.get(`http://localhost:5000/api/commentsSanPham/${id}`),
          Axios.get(`http://localhost:5000/schedule?id=${id}`),
        ]);

        // Xử lý dữ liệu sau khi tất cả các request hoàn thành
        setDetailMovie(response.data[0]);
        setData_Comment(response_comment.data);
        setSchedule(result.data);
        setIsLoading(true);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMovieDetails();
  }, [props.match.params.id]);

  console.log("data_Comment", data_Comment);
  function VideoModal(props) {
    return (
      <Modal
        size="lg"
        {...props}
        aria-labelledby="video-modal"
        centered
        className="video-modal text-center"
      >
        <Modal.Body>
          <iframe
            title={detailMovie.title}
            src={detailMovie.trailer}
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </Modal.Body>
      </Modal>
    );
  }
  const handleBookingInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setBookingInfo({
      ...bookingInfo,
      [name]: value,
    });
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    const emailTemplate = `
        <table border="1" cellpadding="5" cellspacing="0" style="border-collapse: collapse; width: 100%; font-family: Arial, sans-serif; color: #333; width:400px">
            <thead>
                <tr style="background-color: #ff8c00; color: white;">
                    <th colspan="2" style="padding: 10px; text-align: center; font-size: 18px;">Booking Information</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style="padding: 10px; font-weight: bold;">Name:</td>
                    <td style="padding: 10px;">${bookingInfo.name}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; font-weight: bold;">Email:</td>
                    <td style="padding: 10px;">${bookingInfo.email}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; font-weight: bold;">Phone Number:</td>
                    <td style="padding: 10px;">${bookingInfo.phone}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; font-weight: bold;">Showtime:</td>
                    <td style="padding: 10px;">${bookingInfo.time}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; font-weight: bold;">Payment Method:</td>
                    <td style="padding: 10px;">${bookingInfo.payment}</td>
                </tr>
            </tbody>
        </table>
        <br/>
        <table border="1" cellpadding="5" cellspacing="0" style="border-collapse: collapse; width: 100%; font-family: Arial, sans-serif; color: #333;">
            <thead>
                <tr style="background-color: #ff8c00; color: white;">
                    <th colspan="2" style="padding: 10px; text-align: center; font-size: 18px;">Show Details</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style="padding: 10px; font-weight: bold;">Title:</td>
                    <td style="padding: 10px;">${detailMovie.title}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; font-weight: bold;">Director:</td>
                    <td style="padding: 10px;">${detailMovie.director}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; font-weight: bold;">Cast:</td>
                    <td style="padding: 10px;">${detailMovie.cast}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; font-weight: bold;">Genre:</td>
                    <td style="padding: 10px;">${detailMovie.genre}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; font-weight: bold;">Release Date:</td>
                    <td style="padding: 10px;">${new Date(
                      detailMovie.release_date
                    ).toLocaleDateString()}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; font-weight: bold;">Duration:</td>
                    <td style="padding: 10px;">${detailMovie.duration} mins</td>
                </tr>
                <tr>
                    <td style="padding: 10px; font-weight: bold;">Language:</td>
                    <td style="padding: 10px;">${detailMovie.language}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; font-weight: bold;">Rating:</td>
                    <td style="padding: 10px;">${detailMovie.rating}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; font-weight: bold;">Description:</td>
                    <td style="padding: 10px;">${detailMovie.description}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; font-weight: bold;">Seat Price:</td>
                    <td style="padding: 10px;">${
                      detailMovie.seat_price
                    } VND</td>
                </tr>
                <tr>
                    <td style="padding: 10px; font-weight: bold;">VIP Price:</td>
                    <td style="padding: 10px;">${detailMovie.VIP_price} VND</td>
                </tr>
            </tbody>
        </table>
    `;

    const emailData = {
      emailTo: bookingInfo.email,
      template: emailTemplate,
    };

    try {
      const response = await fetch(
        "http://emailserivce.somee.com/Email/sendMail",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(emailData),
        }
      );

      if (response.ok) {
        try {
          const response = await axios.post(
            "http://localhost:5000/api/bookings",
            {
              bookingInfo,
              chooseSeat,
              dayOfWeek,
              day,
              seat_price: detailMovie.seat_price,
              tiket_booking: detailMovie.title,
            }
          );
          console.log(response.data);
        } catch (error) {
          console.error("Error fetching movies:", error);
        }
        alert("Booking information has been sent successfully!");
        setBookingModalShow(false); // Đóng modal sau khi submit
      } else {
        alert("Failed to send booking information.");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("There was an error sending the email.");
    }
  };

  const [open, setOpen] = useState(false);
  const [chooseSeat, setChooseSeat] = useState("");

  const handleClose = () => setOpen(false);
  const [dayOfWeek, setDayOfWeek] = useState(0); // Ví dụ cho ngày trong tuần
  const [day, setDay] = useState(""); // Ví dụ cho ngày cụ thể

  // const handleBookingSubmit = async (event) => {
  //   event.preventDefault();
  //   try {
  //     const response = await axios.post("http://localhost:5000/api/bookings", {
  //       bookingInfo,
  //       chooseSeat,
  //       dayOfWeek,
  //       day,
  //       seat_price: detailMovie.seat_price,
  //       tiket_booking: detailMovie.title,
  //     });
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error("Error fetching movies:", error);
  //   }
  // };

  const handleOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };
  const handleBooKingOnline = async (event) => {
    event.preventDefault();
    console.log("Booking Info:", bookingInfo);
    console.log("Chosen Seats:", chooseSeat);
    console.log("Day of Week:", dayOfWeek);
    console.log("Day:", day);
    console.log("Seat Price:", detailMovie.seat_price);
    console.log("Movie Title:", detailMovie.title);

    // Kiểm tra dữ liệu
    if (
      !bookingInfo || // Check if booking info is present
      !chooseSeat ||
      chooseSeat.length === 0 || // Ensure at least one seat is selected
      !dayOfWeek || // Validate day of the week
      !day || // Validate the actual day/date
      !detailMovie.seat_price || // Validate seat price
      !detailMovie.title // Validate if movie title exists
    ) {
      alert("Dữ liệu không hợp lệ. Vui lòng kiểm tra lại."); // Show error toast if validation fails
      return; // Stop the function execution and don't open a new window
    }

    // Open new window for VNPayment
    window.open(
      "https://sandbox.vnpayment.vn/tryitnow/Home/CreateOrder",
      "_blank"
    );

    try {
      // Post the booking details to the backend
      const response = await axios.post("http://localhost:5000/api/bookings", {
        bookingInfo,
        chooseSeat,
        dayOfWeek,
        day,
        seat_price: detailMovie.seat_price,
        tiket_booking: detailMovie.title,
      });
      console.log(response.data);
    } catch (error) {
      console.error("Error posting booking:", error);
    }
  };

  // Hàm setDayOfWeek và setDay có thể có logic tùy chỉnh mà bạn muốn
  const handleSetDayOfWeek = (day) => {
    setDayOfWeek(day);
  };

  const handleSetDay = (day) => {
    setDay(day);
  };

  const showBookingForm = (showtime) => {
    setBookingInfo({ ...bookingInfo, time: showtime }); // Lấy thời gian từ showtime
    setBookingModalShow(true); // Hiển thị popup form
  };
  const starRate = () => {
    if (detailMovie.rating) {
      let rate = detailMovie.rating;
      let stars = [];
      for (let index = 0; index < 10; index += 2) {
        if (rate >= 2) {
          stars.push(
            <i key={index} className="fa fa-star" aria-hidden="true" />
          );
        } else if (rate >= 1) {
          stars.push(
            <i key={index} className="fa fa-star-half-o" aria-hidden="true" />
          );
        }
        rate -= 2;
      }
      return stars;
    }
  };

  const [newComment, setNewComment] = useState(""); // Nội dung bình luận mới
  const [rating, setRating] = useState(0); // Rating người dùng chọn
  const handleAddComment = async () => {
    // Kiểm tra nếu trường bình luận bị trống
    if (newComment.trim() === "") {
      console.log("Bình luận không được để trống!");
      return;
    }

    // Kiểm tra nếu rating nằm trong khoảng hợp lệ (giả sử từ 1 đến 5)
    if (rating < 1 || rating > 5) {
      console.log("Rating phải nằm trong khoảng từ 1 đến 5!");
      return;
    }

    // Kiểm tra nếu id người dùng hợp lệ
    if (!username || typeof username !== "string" || username.trim() === "") {
      console.log("Tên người dùng không hợp lệ!");
      return;
    }

    // Kiểm tra nếu id sản phẩm hợp lệ
    if (!detailMovie.movie_id || typeof detailMovie.movie_id !== "number") {
      console.log("ID sản phẩm không hợp lệ!");
      return;
    }

    // Nếu các kiểm tra thành công, tiếp tục gửi dữ liệu tới backend
    try {
      const response = await axios.post("http://localhost:5000/api/comments", {
        id_nguoi_dung: username,
        id_san_pham: detailMovie.movie_id,
        danh_gia: rating,
        noi_dung: newComment,
      });

      // Kiểm tra phản hồi từ server
      if (response.data.EC == 1) {
        setData_Comment(response.data.DT);
      }
    } catch (err) {
      console.log("Lỗi khi gửi bình luận:", err);
    }

    // Xóa nội dung sau khi gửi bình luận
    setNewComment("");
  };

  if (isLoading) {
    return (
      <ThemeProvider theme={theme}>
        <VideoModal show={modalShow} onHide={() => setModalShow(false)} />
        <div className="detail-movie__wrap">
          <div className="detail-movie__background">
            <img src={detailMovie.poster} alt="background-movie" />
            <div className="detail-movie__gradient">
              <div className="movie__play">
                <i
                  onClick={() => setModalShow(true)}
                  className="fa fa-play"
                  aria-hidden="true"
                />
              </div>
            </div>
            <div className="detail-movie__rate--small">
              <span className="avgPoint">{detailMovie.rating}</span>
              <div className="starRate">{starRate()}</div>
            </div>
          </div>
          <div className="detail-movie">
            <div className="row m-0">
              <div className="detail-movie__poster col-3 p-lg-0">
                <img className="img-fluid" src={detailMovie.poster} alt="" />
                <div className="movie__play">
                  <i
                    onClick={() => setModalShow(true)}
                    className="fa fa-play"
                    aria-hidden="true"
                  />
                </div>
              </div>
              <div className="detail-movie__info col-6">
                <div>
                  <p>{detailMovie.release_date}</p>
                  <p className="tenPhim">
                    <span className="age-type">C13</span>
                    {detailMovie.title}
                  </p>
                  <p>
                    {detailMovie.duration} minutes - {detailMovie.rating} IMDb -
                    2D/Digital
                  </p>
                  <button
                    className="book-ticket"
                    onClick={() => showBookingForm("14:00 - 16:00")}
                  >
                    Book Now
                  </button>
                </div>
              </div>
              <div className="detail-movie__rate col-3 ">
                <div>
                  <div
                    className="movieRateCircle"
                    style={{
                      maxWidth: "128px",
                      margin: "auto",
                    }}
                  >
                    <CircularProgressbar
                      background={true}
                      value={detailMovie.rating}
                      text={detailMovie.rating}
                      maxValue={10}
                      strokeWidth={6}
                      styles={buildStyles({
                        strokeLinecap: "butt",
                        textColor: "white",
                        pathColor: "#7ed321",
                        trailColor: "#3a3a3a",
                        textSize: "40px",
                        backgroundColor: "rgba(0,0,0,.4)",
                      })}
                    />
                  </div>
                  <div className="starRate">{starRate()}</div>
                  <div className="numberOfReviews">
                    <span>356 people has rated this show</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="detail-movie__bottom">
          <div className="detail-movie__info--mobile">
            <div>
              <p>{detailMovie.release_date}</p>
              <p className="tenPhim">
                <span>C13 - </span>
                {detailMovie.title}
              </p>
              <p>
                {detailMovie.duration} minutes - {detailMovie.rating} IMDb -
                2D/Digital
              </p>
            </div>
          </div>
          <div className="detail-movie__bottom--translate">
            <ul
              className="nav nav-tabs justify-content-center align-items-center pb-md-4"
              id="myTab"
              role="tablist"
            >
              <li className="nav-item">
                <a
                  className="nav-link active"
                  id="showtimes-tab"
                  data-toggle="tab"
                  href="#showtime"
                  role="tab"
                  aria-controls="showtime"
                  aria-selected="true"
                >
                  Schedule
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  id="info-tab"
                  data-toggle="tab"
                  href="#info"
                  role="tab"
                  aria-controls="info"
                  aria-selected="false"
                >
                  Information
                </a>
              </li>{" "}
              <li className="nav-item">
                <a
                  className="nav-link"
                  id="info-tab"
                  data-toggle="tab"
                  href="#comment"
                  role="tab"
                  aria-controls="info"
                  aria-selected="false"
                >
                  Comment
                </a>
              </li>
            </ul>
            <div className="tab-content" id="myTabContent">
              <div
                className="tab-pane fade show active p-3 p-lg-0"
                id="showtime"
                role="tabpanel"
                aria-labelledby="showtimes-tab"
              >
                <Paper className={`MuiTab d-none d-md-flex ${classes.root}`}>
                  <GroupCinemaMovies
                    history={props.history}
                    detailMovie={detailMovie}
                    schedule={schedule}
                    setDayOfWeek={handleSetDayOfWeek} // Truyền hàm setDayOfWeek
                    setDay={handleSetDay} // Truyền hàm setDay
                  />{" "}
                </Paper>
              </div>
              <div
                className="tab-pane fade"
                id="info"
                role="tabpanel"
                aria-labelledby="info-tab"
              >
                <div className="row m-0">
                  <div className="col-sm-6 p-0">
                    <div className="row m-0">
                      <div className="col-5">
                        <p className="title">Release date</p>
                      </div>
                      <div className="col-7">
                        <p className="content">{detailMovie.release_date}</p>
                      </div>
                    </div>
                    <div className="row m-0">
                      <div className="col-5">
                        <p className="title">Director</p>
                      </div>
                      <div className="col-7">
                        <p className="content">{detailMovie.director}</p>
                      </div>
                    </div>
                    <div className="row m-0">
                      <div className="col-5">
                        <p className="title">Cast</p>
                      </div>
                      <div className="col-7">
                        <p className="content">{detailMovie.cast}</p>
                      </div>
                    </div>
                    <div className="row m-0">
                      <div className="col-5">
                        <p className="title">Genre</p>
                      </div>
                      <div className="col-7">
                        <p className="content">{detailMovie.genre}</p>
                      </div>
                    </div>
                    <div className="row m-0">
                      <div className="col-5">
                        <p className="title">Format</p>
                      </div>
                      <div className="col-7">
                        <p className="content">2D/Digital</p>
                      </div>
                    </div>
                    <div className="row m-0">
                      <div className="col-5">
                        <p className="title">Subtitle </p>
                      </div>
                      <div className="col-7">
                        <p className="content">{detailMovie.language}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <p className="title">Description</p>
                    <p className="content info-full">
                      {detailMovie.description}
                    </p>
                  </div>
                </div>
              </div>{" "}
              <div id="comment" className="comments-section mt-4">
                <h4>Bình luận</h4>

                {/* Hiển thị danh sách bình luận */}
                <div className="comments-list scrollable">
                  {Array.isArray(data_Comment) && data_Comment.length > 0 ? (
                    data_Comment.map((comment, index) => (
                      <div key={index} className="comment-item mb-2">
                        {/* Hiển thị số sao */}
                        <div className="rating">
                          {Array.from({ length: comment.danh_gia }, (_, i) => (
                            <span key={i} className="star text-danger">
                              ★
                            </span>
                          ))}
                        </div>
                        <strong>{comment.id_nguoi_dung}</strong>{" "}
                        <span>
                          {" "}
                          <strong>|| {comment.ngay_tao} </strong>
                        </span>
                        <p>{comment.noi_dung}</p>
                        <small>
                          {new Date(comment.ngay_tao).toLocaleDateString()}
                        </small>
                      </div>
                    ))
                  ) : (
                    <p>Không có bình luận nào.</p>
                  )}
                </div>

                {/* Form nhập bình luận */}
                <div className="comment-form mt-3">
                  <h5>Add a Comment</h5>
                  <textarea
                    className="form-control"
                    rows="3"
                    placeholder="Write your comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  ></textarea>{" "}
                  {/* Khu vực chọn rating */}
                  <div className="rating-select mt-2">
                    {/* <span>Select Rating: </span> */}
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className="star"
                        style={{
                          cursor: "pointer",
                          color: star <= rating ? "#ffc107" : "#ccc",
                        }}
                        onClick={() => setRating(star)}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <button
                    className="btn btn-primary mt-2"
                    onClick={handleAddComment}
                  >
                    Bình Luận
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Modal booking */}
        <Modal
          show={bookingModalShow}
          onHide={() => setBookingModalShow(false)}
          centered
        >
          <Modal.Header
            closeButton
            style={{ backgroundColor: "#ff8c00", color: "white" }}
          >
            <Modal.Title>Booking Information</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  name="name"
                  value={bookingInfo.name}
                  onChange={handleBookingInputChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  value={bookingInfo.email}
                  onChange={handleBookingInputChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formPhone">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your phone number"
                  name="phone"
                  value={bookingInfo.phone}
                  onChange={handleBookingInputChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formTime">
                <Form.Label>Showtime</Form.Label>
                <Form.Control
                  type="text"
                  name="time"
                  value={bookingInfo.time}
                  readOnly
                  required
                />
              </Form.Group>

              <Form.Group controlId="formPayment">
                <Form.Label>Payment Method</Form.Label>
                <Form.Control
                  as="select"
                  name="payment"
                  value={bookingInfo.payment}
                  onChange={handleBookingInputChange}
                  required
                >
                  <option value="">Choose...</option>
                  <option value="creditCard">Credit Card</option>
                  <option value="cash">Cash</option>
                </Form.Control>
              </Form.Group>
              <div>
                <button
                  className="btn btn-primary"
                  onClick={(e) => handleOpen(e)}
                >
                  Chọn ghế
                </button>
                <span className="ml-2 text-success">
                  {chooseSeat ? `${chooseSeat}` : ""}
                </span>
                <CinemaSeatsModal
                  open={open}
                  setChooseSeat={setChooseSeat}
                  onClose={handleClose}
                />
              </div>
              {bookingInfo.payment === "creditCard" ? (
                <>
                  {" "}
                  <Button
                    className="mt-2"
                    onClick={handleBooKingOnline}
                    type="submit"
                    style={{
                      backgroundColor: "#ff8c00",
                      color: "white",
                      border: "none",
                      padding: "10px 20px",
                      fontSize: "1rem",
                      fontWeight: "bold",
                      textTransform: "uppercase",
                      borderRadius: "4px",
                      cursor: "pointer",
                      transition: "background-color 0.3s ease",
                    }}
                  >
                    Booking Online
                  </Button>{" "}
                </>
              ) : (
                <>
                  {" "}
                  <Button
                    onClick={() => handleBookingSubmit()}
                    className="mt-2"
                    type="submit"
                    style={{
                      backgroundColor: "#ff8c00",
                      color: "white",
                      border: "none",
                      padding: "10px 20px",
                      fontSize: "1rem",
                      fontWeight: "bold",
                      textTransform: "uppercase",
                      borderRadius: "4px",
                      cursor: "pointer",
                      transition: "background-color 0.3s ease",
                    }}
                  >
                    Confirm Booking
                  </Button>{" "}
                </>
              )}
            </Form>
          </Modal.Body>
        </Modal>

        <Footer />
      </ThemeProvider>
    );
  }
  return <Loader />;
}

export default DetailMovie;
