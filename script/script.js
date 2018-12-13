$(document).ready(function () {
	/***************************
	Owl Carousel
	*****************************/
	$('.owl-carousel').owlCarousel({
		rtl: true,
		loop: true,
		margin: 10,
		nav: true,
		responsive: {
			0: {
				items: 1
			},
			600: {
				items: 3
			},
			1000: {
				items: 5
			}
		}
	});






	/**********************************
	Product Categories
	**********************************/
	var li = $('.categor ul span');

	for (var i = 0; i < li.length; i++) {
		var clik = li[i];
		$(clik).click(function () {
			var openCategor = $(this).next();
			var icon = $(this).prev();
			$(openCategor).slideToggle({
				display: 'block'
			});
			$(icon).toggleClass('rotate');
		});
	}




	/*************************************
	Add-Basket-Functionsss
	**************************************/
	var basketBox = $('.basket-box'),
		boxShop = $('.box-shop'),
		closeBox = $('.close-box'),
		product = $('.crop'),
		addBasketButton = $('.crop .add');


	/*****************************
	closed-basket-page
	******************************/
	$(boxShop).on('click', OpenClosedBasketPage);
	$(closeBox).on('click', OpenClosedBasketPage);
	$('.dark-bg').on('click', OpenClosedBasketPage);

	function OpenClosedBasketPage() {
		if ($(basketBox).hasClass('translate')) {
			$(basketBox).removeClass('translate');
		} else {
			$(basketBox).addClass('translate');
		}
	}


	/*****************************
	Add To Basket
	******************************/
	for (var i = 0; i < $(addBasketButton).length; i++) {
		var product_ = addBasketButton[i];
		$(product_).on('click', addBasket)
	}

	function addBasket() {
		var basket = $('.custom-box .produnct-choose .pro-container'),
			quantity = $('.box-shop .basket span');

		var parentElement = $(this).closest('.crop');
		$(parentElement).clone().appendTo(basket).append("<button class='del'>DELETE</button>");
		$(basket).find('.add').remove();
		var count = 0;
		count = $('.custom-box .crop').length;
		$(quantity).html(count);
		$('.custom-box .count span:last-child').html(count);

		countPrice();

		/************************
		product image basket box
		************************/
		var cloneImage = $(parentElement).find('img').clone().appendTo(parentElement);
		$(cloneImage).addClass('tt');

		function productImageBasketBox() {
			var xCloneImage = $(cloneImage).offset().left;
			var xBasket = $('.box-shop').offset().left;
			var yCloneImage = $(cloneImage).offset().top;
			var YBasket = $('.box-shop').offset().top;
			var left = xBasket - xCloneImage;
			var top = YBasket - yCloneImage;

			$('.tt').delay(300).animate({
				opacity: '0.4',
				width: '50px',
				height: '50px',
				left: left,
				top: top
			}, 400, function () {
				$('.tt').remove();
			});
		}
		productImageBasketBox();


		var delProduct = $('.del');
		for (var i = 0; i < delProduct.length; i++) {
			var deletedProduct = delProduct[i];
			$(deletedProduct).on('click', deleted);
		}
	}


	/*****************************
	Count Price
	******************************/
	function countPrice() {
		var customPrice = $('.custom-box .custom-price span:last-child'),
			price = $('.custom-box .crop span:nth-of-type(4)'),
			MemoryCurrentNumber = 0;

		for (var i = 0; i < price.length; i++) {
			var MemoryPrice = $(price[i]).text();
			MemoryCurrentNumber += parseFloat(MemoryPrice);
		}
		$(customPrice).html(Number.parseFloat(MemoryCurrentNumber).toFixed(2));
	}


	/*****************************
	Delete Products 
	******************************/
	function deleted() {
		var parentEle = $(this).closest('.crop'),
			quantity = $('.box-shop .basket span');

		$(parentEle).remove();
		var count = 0;
		count = $('.custom-box .crop').length;
		$(quantity).html(count);
		$('.custom-box .count span:last-child').html(count);
		countPrice();
	}


	/*****************************
	Delete All Selected Products
	******************************/
	$('.empty').on('click', allDeleteProduct);

	function allDeleteProduct() {
		var basket = $('.custom-box'),
			quantity = $('.box-shop .basket span');
		$(basket).find('.crop').remove('.crop');
		var count = 0;
		count = $('.custom-box .crop').length;
		$(quantity).html(count);
		$('.custom-box .count span:last-child').html(count);

		countPrice();

	}
	/*END - Basket-Functionsss*/



	/*******************************
	Big Image
	*******************************/
	var img = $('.crop .img');
	for (var i = 0; i < img.length; i++) {
		var photo = img[i];
		$(photo).on('click', bigImg)
	}

	function bigImg() {
		$('body').append("<div class='big-image-container'><i class='fas fa-times'></i></div>");
		var bigImage = $(this).children().clone().appendTo('.big-image-container');
		$(bigImage).addClass('big-image');

		var closeIcon = $('.big-image-container i');

		$(closeIcon).on('click', closeBox);
		$('.big-image-container').on('click', closeBox);

		function closeBox() {
			$('.big-image-container').fadeOut('slow', function () {
				$(this).remove();
			});

		}
	}




});
