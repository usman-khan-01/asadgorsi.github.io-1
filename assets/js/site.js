var doc = new jsPDF('p', 'pt', 'legal');
var img = new Image();
getPlatformName = (data) => data[0].link;

// data
(async () => {
    const response = await fetch('https://graph.perspective-v.com/api/resume', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Accept": "*/*",
        },
        body: JSON.stringify({
            query: `query getMyResume($token:String!){
                getbyaccesstoken(accesToken:$token){
                  name,
                  jsonData
                }
              }`,
            variables: {
                token: '1pSkDoSIqUG/NRRMhsO+4Q=='
            }
        })
    });
    const body = await response.json();
    var data = JSON.parse(body.data.getbyaccesstoken.jsonData);

    // basic info
    $('.title-title').append(data.fullName);
    $('.logo, .lead').append(data.fullName);
    $('.head-trans').append(data.lastName + '.');
    // document.querySelector('.profile-image').src = data.profileImageUrl;
    document.querySelector('.profile-image').alt = data.fullName + "'s profile Image";
    $('.text-capitalize').append(data.fullName);
    $('.profession').append(data.profession);
    $('.about').append(data.about);
    $('.myself').append(data.about);

    // expertise / skills
    $.each(data.skills, function (i, skill) {
        $('.skills').append(
            `<div class="col-lg-6 col-md-6">
                <div class="skill-bar mb-4 mb-lg-0">
                    <div class="mb-4 text-right">
                        <h4 class="font-weight-normal skill-name">${skill.name}</h4>
                    </div>
                    <div class="progress">
                        <div class="progress-bar" data-percent="${skill.percentage}" style="width:${skill.percentage}%">
                            <span class="percent-text"><span class="count">${skill.percentage}</span>%</span>
                        </div>
                    </div>
                </div>
            </div>`);
    });

    // testimonials
    $.each(data.testimonals, function (i, testimonial) {
        $('.testimonial-item').append(`
        <i class="ti-quote-left text-white-50"></i>
        <div class="testimonial-content">
                <p class="text-md mt-3 review">${testimonial.review}</p>
                 <div class="media mt-5 align-items-center">
                    <img src="${testimonial.imageUrl}" alt="${testimonial.name}'s Profile Image"
                        class="img-fluid rounded-circle align-self-center mr-4 client-imageUrl" />
                    <div class="media-body">
                        <h3 class="mb-0 client-name">${testimonial.name}</h3>
                        <span class="text-muted client-designation">${testimonial.country}</span>
                    </div>
                </div>
        </div>`);
    });

    //#region pdf data
    $('.name_pdf').append(data.fullName);
    $('.address_pdf').append(data.basicInfo.address);
    $('.mailAndMobile_pdf').append(data.basicInfo.email + '<br>' + data.basicInfo.mobile);
    $('.about_pdf').append(data.about);
    document.querySelector('.linkedIn_pdf').href = data.socialLinks.linkedIn;
    $.each(data.skills, (i, skill) => $('.skill_pdf').append(`<li>${skill.name}</li>`));
    $.each(data.education, (i, edu) => $('.education_pdf').append(`<p>${edu.institution} - ${edu.subject}<br>${edu.yearOfGraduation}</p><br>`));
    $.each(data.experiences, (i, exp) => $('.experience_pdf').append(`<p><b>${exp.profession} - ${exp.company}</b><br>${exp.duration}<br>${exp.description}</p><br>`));
    $.each(data.licensesAndCertifications, (i, lcct) => $('.licensesAndCertifications_pdf').append(`<p><b>${lcct.name}</b> - ${lcct.institution}</p>`));
    //#endregion pdf data

    //#region generate pdf
    $(document).on('click', '#gpdf', function () {
        doc.fromHTML($("#pdf").html(), 20, 0, {
            width: 550,
            pagesplit: true
        });
        doc.save(`${data.fullName}'s CV.pdf`);
    });
    //#endregion generate pdf
})();
