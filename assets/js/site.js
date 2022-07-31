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
    console.log(data);
    $('.logo').append(data.fullName);
})();