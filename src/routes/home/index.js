import classes from "./index.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { HashLink } from "react-router-hash-link";

import logoImg from "../../assets/logo.svg";
import iconCall from "../../assets/call.svg";
import iconCar from "../../assets/car.svg";
import iconWrite from "../../assets/write.svg";
import iconStar from "../../assets/star.svg";
import iconCheck from "../../assets/checkbox.svg";
import iconWhatsapp from "../../assets/whatsapp.svg";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
    Navigation,
    Pagination,
    Autoplay,
    Virtual
} from "swiper/core";
import "swiper/swiper-bundle.css";
import "./swiperCustom.css";
import { useMediaQuery } from 'react-responsive';

SwiperCore.use([Navigation, Pagination, Autoplay, Virtual]);

export default function HomePage() {
    const [apiData, setData] = useState({ "reviews": [], "vechiles": [], "gallery": [] });

    const slides2 = useMediaQuery({ query: '(min-width:910px) and (max-width:1370px)' });
    const slides1 = useMediaQuery({ query: '(max-width:910px)' });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(window.APIROOT + "data");
                setData(response.data);
                console.log(response.data);
                window.APIDATALOADED = true;
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    }, []);

    return (
        <>
            <section className={classes.header}>
                <div className={classes.headerText}>
                    <div>Plan your trip now</div>
                    <div>Save <span style={{ color: "#ff4d30" }}>big</span> with our car rental</div>
                    <div>Affordable and hassle-free self-drive cars for rental in Indore. Give us a call now to reserve the car of your choice and make your journey comfortable.</div>
                    <div className={classes.headerBtnsWrap}>
                        <a href={`tel:${apiData.call}`} style={{ textDecoration: "inherit", color: "inherit" }}><div className={classes.headerBtn}><img src={iconCall} alt="call" /><span>CALL US</span></div></a>
                        <HashLink style={{ textDecoration: 'inherit', color: 'inherit' }} to="#vechiles"><div className={classes.headerBtn + " " + classes.btnBlack}><img src={iconCar} alt="location" /><span>AVAILABLE CARS</span></div></HashLink>
                    </div>
                </div>
                <div className={classes.headerLogo}>
                    <img src={logoImg} alt="logo" />
                </div>
            </section>

            <section className={classes.bookHook}>
                <div className={classes.carHead}>
                    <div>Why choose us</div>
                    <div>Offered<span style={{ color: "#ff4d30" }}> Services</span></div>
                </div>
                <div className={classes.servicesOffered}>
                    <div className={classes.serviceOff}>
                        <img src={iconCheck} alt="check" /><span>Car rental</span>
                    </div>
                    <div className={classes.serviceOff}>
                        <img src={iconCheck} alt="check" /><span>Self-drive car</span>
                    </div>
                    <div className={classes.serviceOff}>
                        <img src={iconCheck} alt="check" /><span>Self-drive bike</span>
                    </div>
                    <div className={classes.serviceOff}>
                        <img src={iconCheck} alt="check" /><span>Tours</span>
                    </div>
                    <div className={classes.serviceOff}>
                        <img src={iconCheck} alt="check" /><span>Corporate car rental</span>
                    </div>
                </div>
            </section>

            <section className={classes.carSection} id="vechiles">
                <div className={classes.carHead}>
                    <div>Vechile Models</div>
                    <div>Our <span style={{ color: "#ff4d30" }}>Rental Fleet</span></div>
                </div>
                <div className={classes.carWrap}>
                    {
                        apiData.vechiles.map(e => {
                            return <div className={classes.carCard}>
                                <div className={classes.cardCardImg}><img src={e.image} alt="car" /></div>
                                <div className={classes.carCardText}>
                                    <div className={classes.carCardTitle}>{e.name}</div>
                                    <div className={classes.cardCardInfo}>
                                        <div className={classes.carCardPrice}>₹{e.costPerDay}</div>
                                        <div>
                                            <div>Per day</div>
                                            <div>{e.limit} km limit</div>
                                        </div>
                                    </div>
                                    <div className={classes.aboutCar}>
                                        {e.about}
                                    </div>
                                </div>
                            </div>
                        })
                    }
                </div>
            </section>

            <section className={classes.bookHook}>
                <div className={classes.carHead}>
                    <div>What people say about us</div>
                    <div><span style={{ color: "#ff4d30" }}>Client</span> Testimonials</div>
                </div>
                <div className={classes.reviewCardWrap}>
                    {
                        apiData.reviews.map(e => {
                            return <div className={classes.reviewCard}>
                                <div>
                                    <div className={classes.rating}>
                                        <img src={iconStar} alt="star" className={classes.starIcon} />
                                        <img src={iconStar} alt="star" className={classes.starIcon} />
                                        <img src={iconStar} alt="star" className={classes.starIcon} />
                                        <img src={iconStar} alt="star" className={classes.starIcon} />
                                        <img src={iconStar} alt="star" className={classes.starIcon} />
                                    </div>
                                    <div className={classes.rcText}>{e.content}</div>
                                </div>
                                <div>{e.name}</div>
                            </div>
                        })
                    }
                </div>
                <a href={apiData.writereview} style={{ textDecoration: "inherit", color: "inherit" }}><div className={classes.headerBtn}><img src={iconWrite} alt="call" /><span>WRITE A REVIEW</span></div></a>
            </section>

            <section className={classes.location}>
                <div className={classes.sectionHead}>Our services are available <span style={{ color: "#ff4d30" }}>24x7</span></div>
                {
                    apiData.location ?
                        <iframe
                            title="maps"
                            width="800"
                            height="450"
                            style={{ border: 0 }}
                            loading="lazy"
                            allowfullscreen
                            referrerpolicy="no-referrer-when-downgrade"
                            src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyAcAIpEFWAMwPUMSv8xgQvj2l8ObqKIcFY&q=${apiData.location}`}>
                        </iframe>
                        : null
                }
            </section>

            <section className={classes.bookHook}>
                <div className={classes.carHead}>
                    <div>Look into our services</div>
                    <div>BoomCar <span style={{ color: "#ff4d30" }}>Gallery</span></div>
                </div>
                <Swiper
                    className={classes.swiper}
                    id="swiper"
                    slidesPerView={slides1 ? 1 : (slides2 ? 2 : 3)}
                    spaceBetween={0}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true
                    }}
                    speed={500}
                    loop
                >
                    {apiData.gallery.map((e, id) => {
                        return <SwiperSlide key={`slide-${id}`} style={{ listStyle: "none" }}>
                            <div className={classes.galleryCard}>
                                <img src={e} alt="gallery" />
                            </div>
                        </SwiperSlide>
                    })}
                </Swiper>
            </section>

            <section className={classes.bookHook + " " + classes.footer}>
                <div className={classes.carHead}>
                    <div>Book your ride now</div>
                    <div><span style={{ color: "#ff4d30" }}>Quick & easy</span> car rental</div>
                </div>
                <div className={classes.headerBtnsWrap + " " + classes.bottomBtns}>
                    <a href={`tel:${apiData.call}`} style={{ textDecoration: "inherit", color: "inherit" }}><div className={classes.headerBtn}><img src={iconCall} alt="call" /><span>CALL US</span></div></a>
                    <a href={`whatsapp://send?phone=${apiData.whatsapp}`} style={{ textDecoration: "inherit", color: "inherit" }}><div className={classes.headerBtn + " " + classes.whatsappBtn}><img src={iconWhatsapp} alt="call" /><span>WHATSAPP</span></div></a>
                </div>
            </section>
        </>
    );
}