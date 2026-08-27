"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

type CategoryLink = {
  id: string;
  name: string;
};

type Slide = {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  categoryName: string;
  color: string;
};

const SLIDES: Slide[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?q=80&w=1935&auto=format&fit=crop",
    title: "Đèn Trang Trí Hiện Đại",
    subtitle: "Nâng tầm không gian sống với bộ sưu tập đèn chùm, đèn thả trần mới nhất 2024.",
    categoryName: "Thiết bị điện",
    color: "from-orange-500 to-red-600",
  },
  {
    id: 2,
    image: "/images/banner-ocam.png",
    title: "Thiết Bị Điện Thông Minh",
    subtitle: "Công tắc cảm ứng, ổ cắm wifi - Điều khiển ngôi nhà trong tầm tay bạn.",
    categoryName: "Smart Home & IoT",
    color: "from-blue-500 to-blue-700",
  },
  {
    id: 3,
    image: "/images/banner-premium-plumbing-3.png",
    title: "Ống Nước & Phụ Kiện Cao Cấp",
    subtitle: "Chất liệu nhựa PVC/PPR siêu bền, chống rò rỉ, bảo hành chính hãng.",
    categoryName: "Vật tư nước",
    color: "from-green-500 to-teal-600",
  },
  {
    id: 4,
    image: "/images/banner-den-hoc-3.png",
    title: "Đèn học hiện đại và bảo vệ mắt",
    subtitle: "Công nghệ LED chống rung (flicker-free) và giảm ánh sáng xanh, giúp đôi mắt không bị mỏi khi học tập trong thời gian dài.",
    categoryName: "Thiết bị điện",
    color: "from-yellow-500 to-yellow-600",
  },
  {
    id: 5,
    image: "/images/banner-den-suoi-3.png",
    title: "Đèn sưởi nhà tắm",
    subtitle: "Công nghệ bóng hồng ngoại giúp làm ấm phòng tắm chỉ trong 3 giây, không cần chờ đợi lâu trong mùa đông giá rét.",
    categoryName: "Thiết bị điện",
    color: "from-pink-500 to-yellow-600",
  },
];

function getCategoryLink(categoryName: string, categories: CategoryLink[]) {
  const category = categories.find((item) => item.name === categoryName);
  return category ? `/?categoryId=${category.id}#products` : "/#products";
}

export default function HeroCarousel({ categories }: { categories: CategoryLink[] }) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
  };

  useEffect(() => {
    if (isPaused) return;
    const slideInterval = setInterval(nextSlide, 5000);
    return () => clearInterval(slideInterval);
  }, [isPaused, nextSlide]);

  return (
    <div
      className="relative w-full h-[400px] md:h-[500px] overflow-hidden group bg-gray-900"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {SLIDES.map((slide) => (
          <div key={slide.id} className="min-w-full h-full relative">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

            <div className="absolute inset-0 flex items-center">
              <div className="max-w-7xl mx-auto px-4 w-full grid grid-cols-1 md:grid-cols-2">
                <div className="text-white space-y-6 animate-fade-in-up p-4 md:p-0">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${slide.color} shadow-lg mb-2`}>
                    SẢN PHẨM HOT
                  </span>

                  <h2 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight drop-shadow-md">
                    {slide.title}
                  </h2>

                  <p className="text-gray-200 text-lg md:text-xl max-w-lg drop-shadow">
                    {slide.subtitle}
                  </p>

                  <Link
                    href={getCategoryLink(slide.categoryName, categories)}
                    className={`group inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white bg-gradient-to-r ${slide.color} hover:scale-105 transition-transform shadow-lg`}
                  >
                    Xem chi tiết <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-white/20"
      >
        <ChevronLeft size={30} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-white/20"
      >
        <ChevronRight size={30} />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              current === index
                ? "bg-white w-8"
                : "bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
