import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import styles from './styles.module.css';
import { Autoplay } from 'swiper';

export const Banner = () =>{
    return(
        <div className={styles.container}>
            <Swiper className="Swiper"
                slidesPerView={1}
                loop={true}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                   
                  }}
                  modules={[Autoplay]}
                >
                <SwiperSlide className={styles.slide}><img src="/tmp/banner-01.png" alt=""/></SwiperSlide>
                <SwiperSlide className={styles.slide}><img src="/tmp/banner-02.png" alt=""/></SwiperSlide>  
            </Swiper>
        </div>
    );
}