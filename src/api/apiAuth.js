
function makeMockRequest(url, data, callback) {
    setTimeout(() => {
      
      const response = { status: 'success',data: { access_token: '12345', ...data } };
      callback(response);
    }, 1000);
  }
  export default makeMockRequest;



 