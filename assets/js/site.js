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
    $('.logo').append(data.fullName + '.');
    $('.head-trans').append(data.lastName + '.');
    document.querySelector('.profile-image').src = data.profileImageUrl;
    document.querySelector('.profile-image').alt = data.fullName + "'s profile Image";
    $('.text-capitalize').append(data.fullName);
    $('.profession').append(data.profession);
    $('.about').append(data.about);

})();