function Head() {

  const redirectToLogin = () => {
    if (window.chrome && chrome.runtime) {
      chrome.runtime.sendMessage(
        { 
          type: 'redirect-to-login',
        },
        (response) => {
          console.log("Message sent to Chrome extension:", response);
        }
      );
    }
  }
  
  return (
    <div className="text-center p-2 bg-indigo-500 text-white rounded-md shadow-lg">
        <h1 
          className="text-4xl font-bold hover:cursor-pointer"
          onClick={redirectToLogin}
        >
          WEB TRACKER
        </h1>
    </div>
  )
}

export default Head