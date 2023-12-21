(async () => {
  $.getJSON("./assets/data/data.json", (data) => {
    //#region Hero
    $(".dizme_tm_hero").append(`
        <div class="container">
            <div class="content">
                <div class="details">
                    <div class="hello"><h3 class="orangeText">Hello, I'm</h3></div>
                    <div class="name"><h3>${data.fullName}</h3></div>
                    <div class="job"><p>A <span class="greenText">${data.profession}</span> From <span class="yellowText">${data.basicInfo.shortAddress}</span></p></div>
                    <div class="text"><p>${data.quote}</p></div>
                    <div class="button">
                        <div class="dizme_tm_button"><a class="anchor" href="#about"><span>About Me</span></a></div>
                        <div class="social">
                            <ul></ul>
                        </div>
                    </div>
                </div>
                <div class="avatar">
                    <div class="image">
                        <img src="${data.profileImageUrl}" alt="${data.fullName}'s Image" />
                    </div>
                </div>
            </div>
        </div>
    `);

    $.each(data.socialLinks, (i, sl) => {
      $(".social ul").append(`
            <li><a href="${sl.link}"><i class="${sl.icon}"></i></a></li>
        `);
    });

    $.each(data.floatingLogos, (i, fl) => {
      $(".avatar .image").append(`
            <span class="skills ${fl.name} anim_moveBottom"><img class="svg" src="${fl.imageUrl}" alt="logo"/></span>
        `);
    });
    //#endregion Hero

    //#region Process
    $.each(data.process, (i, p) => {
      $(".dizme_tm_process .container .list ul").append(`
        <li class="wow fadeInUp" data-wow-duration="1s">
		    <div class="list_inner">
		        <div class="icon">
		            <span>
		                <img class="brush" src="${p.imageBackgroundUrl}" alt="" />
		                <img class="svg" src="${p.imageUrl}" alt="" />
		            </span>
		        </div>
		        <div class="title">
		            <h3>${p.name}</h3>
		        </div>
		        <div class="text">
		            <p>${p.description}</p>
		        </div>
		    </div>
		</li>
        `);
    });
    //#endregion Process

    //#region Portfolios
    $.each(data.portfolioHeadings, (i, ph) => {
      $(`.portfolio_filter ul`).append(`
            <li><a href="#" class="${ph.class}" data-filter="${ph.dataFilter}">${ph.name}</a></li>
        `);
    });

    $.each(data.portfolios, (i, p) => {
      $(`.gallery_zoom`).append(`
            <li class="popup ${p.class} grid-item">
                <div class="inner">
                    <div class="entry dizme_tm_portfolio_animation_wrap">
                        <a class="zoom" href="${p.href}">
                            <img src="${p.imageUrl}"/>
                            <div class="main" data-img-url="${p.dataImageUrl}"></div>
                        </a>
                    </div>
                    <div class="mobile_title">
                        <h3>Dexters Lab Wash</h3>
                    </div>
                </div>
            </li>
        `);
    });
    //#endregion Portfolios

    //#region Skills
    $.each(data.skills, (i, s) => {
      $(`.dodo_progress`).append(`
            <div class="progress_inner" data-value="${s.percentage}" data-color="${s.dataColor}">
                <span><span class="label">${s.name}</span><span class="number">${s.percentage}%</span></span>
                <div class="background"><div class="bar"><div class="bar_in"></div></div></div>
            </div>
        `);
    });
    //#endregion Skills

    //#region Services
    $.each(data.services, (i, s) => {
      $(`.service_list ul`).append(`
          <li class="wow fadeInLeft" data-wow-duration="1s">
              <div class="list_inner tilt-effect">
                  <span class="icon">
                      <img class="back" src="${
                        s.imageBackgroundUrl
                      }" alt="" />
                      <img class="svg" src="${s.imageUrl}" alt="" />
                  </span>
              <div class="title">
                  <h3>${s.name}</h3>
                  <!-- <span class="price">Starts from <span class="orangeText">$99</span></span> -->
              </div>
              <div class="text"><p>${s.description.replace(
                /\n/g,
                "<br>"
              )}</p></div>
              </div>
          </li>
        `);
    });
    //#endregion Services

    //#region Testimonials
    $.each(data.leftTestimonialsHoveringImages, (i, lt) => {
      $(".left_details").append(`
            <div class="det_image ${lt.class} wow fadeIn" data-wow-duration="1s" data-img-url="${lt.imageUrl}"></div>
            <span class="circle ${lt.colorOrShape} animPulse"></span>
        `);
    });

    $.each(data.testimonials, (i, t) => {
      $(".testimonials").append(`
            <li>
                <div class="icon">
                    <img class="svg" src="./assets/img/svg/testimonials/quote.svg" alt="" />
                </div>
                <div class="text">
                    <p>${t.review}</p>
                </div>
                <div class="short">
                    <div class="image">
                        <div class="main" data-img-url="${t.imageUrl}"></div>
                    </div>
                    <div class="detail">
                        <h3>${t.name}</h3>
                        <span>${t.from}</span>
                    </div>
                </div>
            </li>
        `);
    });

    $.each(data.rightTestimonialsHoveringImages, (i, rt) => {
      $(".right_details").append(`
            <div class="det_image ${rt.class} wow fadeIn" data-wow-duration="1s" data-img-url="${rt.imageUrl}"></div>
            <span class="circle ${rt.colorOrShape} animPulse"></span>
        `);
    });
    //#endregion Testimonials

    //#region Contact
    $(".contact_inner .left ul").append(`
        <li>
            <div class="list_inner">
                <div class="icon orangeBackground">
                    <i class="icon-location orangeText"></i>
                </div>
                <div class="short">
                    <h3>Address</h3>
                    <span>${data.basicInfo.longAddress}</span>
                </div>
            </div>
        </li>
        <li>
            <div class="list_inner">
                <div class="icon greenBackground">
                    <i class="icon-mail-1 greenText"></i>
                </div>
                <div class="short">
                    <h3>Email</h3>
                    <span><a href="mailto:${data.basicInfo.email}">${data.basicInfo.email}</a></span>
                </div>
            </div>
        </li>
        <li>
            <div class="list_inner">
                <div class="icon purpleBackground">
                    <i class="icon-phone purpleText"></i>
                </div>
                <div class="short">
                    <h3>Phone</h3>
                    <span>${data.basicInfo.mobile}</span>
                </div>
            </div>
        </li>
`);
    //#endregion Contact
  });
})();
