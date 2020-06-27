$(function () {
  //caches a jQuery object containing the header element
  var header = $("header");
  $(window).scroll(function () {
    var scroll = $(window).scrollTop();

    if (scroll >= 10) {
      header.addClass("rt-sticky");
    } else {
      header.removeClass("rt-sticky");
    }
  });
});

$(window).scroll(function () {
  if ($(this).scrollTop() >= 670) {
    $(".info").addClass("menu-hide").slideUp("fast");
  } else {
    $(".info").removeClass("menu-hide").slideDown("fast");
  }
});

/* Parallax */

$(document).ready(function () {
  var elem = $(".face"), //    Контейнер, в котором будем проводить анимацию
    pos = elem.offset(), //    Позиция элемента
    elem_left = pos.left, //    Слева
    elem_top = pos.top, //    Сверху
    elem_width = elem.width(), //    Ширина элемента
    elem_height = elem.height(), //    Высота элемента
    x_center, //    Координаты центра по оси X
    y_center; //    Координаты центра по оси Y
  //    Обрабатываем событие перемещения курсора мыши
  $(".face").mousemove(function (e) {
    //    Определяем центр элемента (формула легко гуглится)
    x_center = elem_width / 2 - (e.pageX - elem_left);
    y_center = elem_height / 2 - (e.pageY - elem_top);
    //    Проходим по всем блокам с изображениями)
    $(".parallax").each(function () {
      var speed = $(this).attr("data-speed"), //    Определяем скорость
        xPos = Math.round(((-1 * x_center) / 20) * speed), //    Высчитываем позицию по оси X, движения будут инвертированы (-1). Формула подбиралась на глаз
        yPos = Math.round((y_center / 20) * speed); //    Высчитываем позицию по оси Y
      //    Перемещение по оси Y делаем до определенной точки, потом перемещение останавливаем
      if (yPos < 0) yPos = -2 * speed;
      //    Непосредственно перенос
      $(this).css(
        "transform",
        "translate3d(" + xPos + "px, " + yPos + "px, 0px)"
      );
    });
  });
});

/*  Vasak menu icon */
$(".change").click(function () {
  $("i", this).toggleClass("fa-chevron-right fa-chevron-down", 3000);
  $(".hide-nav-item ").toggle();
});

/* Toodete Valik */

$(document).ready(function () {
  var windowHeight = $(window).height();

  $(document).on("scroll", function () {
    $("#meietooted").each(function () {
      var self = $(this),
        height = self.offset().top + self.height()/3 - windowHeight/3;
      if ($(document).scrollTop() >= height) {
        $("nav").removeClass("hide").addClass("show");
      } else {
        $("nav").addClass("hide").removeClass("show");
      }
    });
  });
});

/* SPIN 360 */
function bootSpriteSpin(selector, options) {
  if ("IntersectionObserver" in window) {
    // Browser supports IntersectionObserver so use that to defer the boot
    let observer = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          observer.unobserve(entry.target);
          $(entry.target).spritespin(options);
          console.log("booted", selector, options);
        }
      });
    });
    observer.observe($(selector)[0]);
  } else {
    // Browser does not support IntersectionObserver so boot instantly
    $(selector).spritespin(options);
    console.log("booted", selector, options);
  }
}

$(function () {
  var frames = SpriteSpin.sourceArray("car/{frame}.png", {
    frame: [1, 51],
    digits: 2,
  });
  bootSpriteSpin(".spritespin1", {
    source: frames,
    width: 314,
    height: 140,
    sense: 1,
    frameTime: 60,
    plugins: ["progress", "360", "drag"],
  });
});
/* EndOfSpin 360 */

/* remove fadeUp */
$(".card")
  .addClass("animate__fadeInUp")
  .delay(1600)
  .queue(function () {
    $(this).removeClass("animate__fadeInUp").dequeue();
  });

/* btn delay */
$(".btn")
  .css("visibility", "hidden")
  .delay(900)
  .queue(function () {
    $(this)
      .css("visibility", "visible")
      .addClass("animate__bounceIn")
      .dequeue();
  });

/* SWIPER */



let swiper = new Swiper(".swiper-container", {
  slidesPerView: 4,
  spaceBetween: 10,
  centeredSlides: true,
  loop: true,
  loopFillGroupWithBlank: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },

  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 1,
      spaceBetween: 15,
    },
    // when window width is >= 480px
    480: {
      slidesPerView: 3,
    },
    // when window width is >= 640px
    640: {
      slidesPerView: 4,
    },
  },
});


/* End SWIPER */


/* Mobile Menu */

$(document).ready(function() {
	$('.header__burger').click(function(event) {
		$('.header__burger,.header__menu').toggleClass('active');
		$('body').toggleClass('lock');
	});
});

/* Side Mobile Menu */


const $sideNav = $('.sidenav');

$(document).mouseup(function(e) {
  if (!$sideNav.is(e.target) // if the target of the click isn't the container...
  && $sideNav.has(e.target).length === 0) // ... nor a descendant of the container
  {
    $sideNav.removeClass('active');
 }
});


$(document).ready(function() {
	$('#mobile-side-nav').click(function(event) {
		$('.sidenav').toggleClass('active');
	});
});
