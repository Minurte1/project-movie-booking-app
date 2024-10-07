import React from 'react';
import Slider from 'react-slick';
import HomeTool from '../../../components/User/MovieSelect';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import slide1 from '../../../assets/img/movie-1.jpg';
import slide2 from '../../../assets/img/movie-2.jpg';
import slide3 from '../../../assets/img/movie-3.jpg';
import slide4 from '../../../assets/img/movie-0.jpg';

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

export default function Carousel(props) {
    const settings = {
        arrows: true,
        dots: true,
        infinite: true,
        autoplay: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    };
    return (
        <div className='pp-carousel'>
            <Slider {...settings}>
                <div>
                    <img src={'https://music.voca.vn/assets/img/img_song/Happier%20Than%20Ever.jpg'} alt='movie' />
                    <div className='backgroundLinear'></div>
                </div>
                <div>
                    <img src={'https://m.media-amazon.com/images/S/pv-target-images/e8f2344ca0d9f84c2b9968d7df55d1b9ae9f3384a920f956febe983f8a853f26.jpg'} alt='movie' />
                    <div className='backgroundLinear'></div>
                </div>
                <div>
                    <img src={'https://i.ytimg.com/vi/UrrUDfej-Tw/maxresdefault.jpg'} alt='movie' />
                    <div className='backgroundLinear'></div>
                </div>
                <div>
                    <img src={'https://www.womjapan.com/vn/wp-content/uploads/sites/2/2023/06/Tour-Taylor-Swift-2024-ta%CC%A3i-Nha%CC%A3%CC%82t-Ba%CC%89n.jpeg'} alt='movie' />
                    <div className='backgroundLinear'></div>
                </div>
            </Slider>
            <HomeTool history={props.history} />
        </div>
    );
}
