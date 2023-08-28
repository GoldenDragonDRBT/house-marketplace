import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase.config';
import { Swiper, SwiperSlide } from 'swiper/react';// import Swiper core
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';// Swiper required modules
import 'swiper/css'; // Import Swiper styles
import 'swiper/css/navigation'; // Import Swiper styles
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Spinner from './Spinner';


function Slider() {
  const [loading, setLoading] = useState(true)
  const [listings, setListings] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    const fetchListings = async () => {
      const listingsRef = collection(db, 'listings')
      const q = query(listingsRef, orderBy('timestamp', 'desc'), limit(5))
      const querySnap = await getDocs(q)

      let listings = []

      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        })
      })
      // console.log(listings)
      setListings(listings)
      setLoading(false)
    }

    fetchListings()
  }, [])

  if (loading) {
    return <Spinner />

  }

  if (listings.length === 0) {
    return <></>
    // For the home slider, In case when we don't have any listings data and don't want to show empty space instead.
  }

  return listings && (
    <>
      <p className="exploreHeading">Recommended</p>

      <Swiper
        // Implementation from 'Doc' according to updated newer 'Swiper React component', but will be removed in future version
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        modules={[Navigation, Pagination, Scrollbar, A11y]}
      >
        {listings.map(({ data, id }) => (
          <SwiperSlide
            key={id}
            onClick={() => navigate(`/category/${data.type}/${id}`)}
          >
            <div
              style={{
                background: `url(${data.imageUrls[0]}) center no-repeat`,
                backgroundSize: 'cover',
                minHeight: '22rem',
              }}
              className='swiperSlideDiv'
            >
              <p className="swiperSlideText">{data.name}</p>
              <p className="swiperSlidePrice">
                ${data.discountedPrice ?? data.regularPrice} {''}
                {data.type === 'rent' && '/ month'}
                {/* This will show discountedPrice if it has one and if 'discountedPrice=null' then it will the regularPrice */}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}
export default Slider;