import Slider from "react-slick";

const OffersSection = () => {
  const offers = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=1200&q=80",
      link: "/products?offer=flash-sale",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80",
      link: "/products",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1556742111-a301076d9d18?auto=format&fit=crop&w=1200&q=80",
      link: "/register",
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80",
      link: "/products?offer=home",
    },
  ];

  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2500,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024, // tablets/laptops
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640, // mobile
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="py-3 bg-gray-50">
      <div className="max-w-8xl mx-auto px-2 sm:px-4 lg:px-6">
        <Slider {...settings}>
          {offers.map((offer) => (
            <a
              key={offer.id}
              href={offer.link}
              className="px-2 block focus:outline-none"
            >
              <img
                src={offer.image}
                alt={`Offer ${offer.id}`}
                className="w-full h-40 sm:h-56 lg:h-64 object-cover rounded-xl shadow-md"
              />
            </a>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default OffersSection;
