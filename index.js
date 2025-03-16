import express from 'express';
import bodyParser from 'body-parser';
import lodash from 'lodash';

const app = express();

const _ = lodash;

const PORT = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const homeStartingContent = 'BlogApp is a dynamic web application that allows users to create, publish, and read blog posts. Built using Node.js, Express.js, and EJS, it provides a simple yet powerful platform for content sharing. Users can compose new posts, which are stored in an array for easy access. The homepage displays all blog entries with truncated previews, and each post has a dedicated page for full content viewing. The app includes About and Contact pages for additional information. With a clean UI and smooth navigation, BlogApp serves as an excellent platform for beginner developers to learn full-stack web development.'
const aboutContent = 'BlogApp is a minimalistic and user-friendly web application designed for effortless blogging. It allows users to write, publish, and read blog posts in a structured and intuitive manner. Built using Node.js, Express.js, and EJS, the platform dynamically renders content, making it easy to manage posts without a database.'
const contactContent = 'For any inquiries or feedback, please contact us at Email:naveem@gmail.com or Phone: 123-456-7890. We value your input and are committed to providing a seamless user experience. Feel free to reach out with any questions or suggestions.'

const posts = [];

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index.ejs', { homeContent: homeStartingContent , posts});
});

app.get('/about', (req, res) => {
  res.render('about',
    {
      aboutContent: aboutContent
    })
})

app.get('/compose', (req, res) => {
  res.render('compose')
})


app.get('/contact', (req, res) => {
  res.render('contact',
    {
      contactContent : contactContent
    })
})

app.post('/compose', (req, res) => {
  const postTitle = req.body.postTitle;
  const postBody = req.body.postBody;
  const post = {
    title: postTitle,
    body: postBody
  }
  posts.push(post);
  res.redirect('/');
});

app.get('/posts/:postID', (req, res) => {
  let postTitle = req.params.postID
  let postBody = ''
  let title = ''
  
  posts.forEach((post) => {
    title = post.title
    postBody = post.body
  })

  if (_.toLower(postTitle) == _.toLower(title)) {
    res.render(
      'post', 
      {
        title,
        body: postBody
      })
  }
})

app.listen(PORT, () => { 
  console.log(`Server is running on PORT ${PORT}`);
});



