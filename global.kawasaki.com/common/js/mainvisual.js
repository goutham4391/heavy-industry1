
$(function(){
  $(".js-slider-main").slick({
		arrows: false,
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 639,
        settings: {
          dots: false
        }
      }
    ]
  });
});



