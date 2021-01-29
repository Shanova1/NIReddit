// define how many posts
const numOfPosts = 10;

// function to get top numOfPosts posts from Reddit.com API (posts are called children)
const getRawData = async () => {
  try {
    const response = await fetch(
      `https://www.reddit.com/r/all.json?limit=${numOfPosts}`
    );
    if (response.ok) {
      const jsonResponse = await response.json();
      const childrenPosts = jsonResponse.data.children;
      console.log(childrenPosts);
      return childrenPosts;
    }
  } catch (error) {
    console.log(error);
  }
};

// reddit posts data model - construct a class to save the relevant data from each post
class post {
  constructor(title, thumbnail, ups, permalink) {
    this._title = title;
    this._thumbnail = thumbnail;
    this._ups = ups;
    this._permalink = permalink;
  }
}

// loop through the raw data and save it to an array of posts (objects according to the class)
const organizeRawData = async () => {
  const rawData = await getRawData();
  let postArr = [];
  for (let i = 0; i < rawData.length; i++) {
    // for image-less posts, replace with a placeholder
    if (rawData[i].data.thumbnail.includes("http") === false) {
      rawData[i].data.thumbnail = "images/white.jpg";
    }
    postArr.push(
      new post(
        rawData[i].data.title,
        rawData[i].data.thumbnail,
        rawData[i].data.ups,
        rawData[i].data.permalink
      )
    );
  }
  console.log(postArr);
  return postArr;
};

// function to add posts data to HTML (index.html)
const displayPosts = async () => {
  const posts = await organizeRawData();
  for (let i = 0; i < posts.length; i++) {
    document.querySelector("#app").insertAdjacentHTML(
      "beforeend",
        `<div class="number">
        <h2>#${i + 1}<h2>
        </div>
        <br>
        <div class="posts-container">
        <div class="posts">
        <h3><a href="postview.html?post=${posts[i]._permalink}">${posts[i]._title}</a><h3>
        </div>
        <br>
        <div class="posts"><img src="${posts[i]._thumbnail}"></div>
        <br>
        <div class="posts"><b>↑upvotes:</b> ${posts[i]._ups}<br></div></div>
        <div class="posts"><h4><a href="https://www.reddit.com${posts[i]._permalink}">View on Reddit.com</a><h4></div><br>`
    );
  } 
};

displayPosts();
