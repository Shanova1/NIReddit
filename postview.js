// specific post url
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const postUrl = urlParams.get('post');
console.log(postUrl);

// function to get the specific post raw data from Reddit.com API
const getPostRawData = async () => {
    try {
      const response = await fetch(
        `https://www.reddit.com${postUrl}.json`
      );
      if (response.ok) {
        const jsonResponse = await response.json();
        const postRawData = jsonResponse[0].data.children[0].data;
        console.log(postRawData);
        return postRawData;
      }
    } catch (error) {
      console.log(error);
    }
  };

// reddit specific post data model - construct a class to save the relevant data from the specific post
class post {
    constructor(title, url) {
      this._title = title;
      this._url = url;
    }
  }

// loop through the pecific post raw data and save it to an object according to the class
const organizePostRawData = async () => {
    const postRawData = await getPostRawData();
    const postOrganisedData = new post(
        postRawData.title,
        postRawData.url
        )
    console.log(postOrganisedData);
    return postOrganisedData;
  };

// function to add post data to HTML (postview.html)
const displayPost = async () => {
    const post = await organizePostRawData();
      document.querySelector("#current-post").insertAdjacentHTML(
        "beforeend",
          `<div class="posts">
          <h3>${post._title}<h3>
          </div>
          <br>
          <div class="posts"><img src="${post._url}"></div>
          <br>
          <div class="posts-pic"><h4><a href="https://www.reddit.com${postUrl}">View on Reddit.com</a><h4></div><br>`
      );
    };
  
  displayPost();