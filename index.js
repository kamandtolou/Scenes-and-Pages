import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

// In-memory storage for reviews (for now, no database is used)
let reviews = [   {
    id: 0,
    title: "The Catcher in the Rye",
    genre: "Literary Fiction",
    mediaType: "Book",
    review: "A classic coming-of-age novel that captures teenage angst and alienation. Holden Caulfield's narrative is raw, sarcastic, and deeply emotional, making it a timeless read for anyone struggling with growing up.",
    rating: 4
  },
  {
    id: 1,
    title: "Breaking Bad",
    genre: "Crime, Drama, Thriller",
    mediaType: "Series",
    review: "Breaking Bad is one of the most well-crafted TV series of all time. Walter White's transformation from a mild-mannered chemistry teacher to a ruthless drug kingpin is captivating, with stunning performances and intense plot twists.",
    rating: 5
  },
  {
    id: 2,
    title: "Inception",
    genre: "Science Fiction, Thriller",
    mediaType: "Movie",
    review: "Inception is a mind-bending film that challenges the boundaries of reality and dreams. Christopher Nolan's direction combined with Hans Zimmer's epic score and brilliant performances make this a masterpiece.",
    rating: 5
  },
  {
    id: 3,
    title: "Pride and Prejudice",
    genre: "Romance, Historical Fiction",
    mediaType: "Book",
    review: "A witty and heartwarming exploration of love, class, and reputation. Jane Austen's timeless classic still resonates today with its sharp social commentary and memorable characters, especially the iconic Elizabeth Bennet.",
    rating: 4
  },
  {
    id: 4,
    title: "Stranger Things",
    genre: "Science Fiction, Horror",
    mediaType: "Series",
    review: "Stranger Things is a nostalgic tribute to 80s pop culture, packed with supernatural thrills and heartfelt moments. The show balances creepy monsters with strong friendships, making it a fan-favorite binge-worthy experience.",
    rating: 4
  },
  {
    id: 5,
    title: "The Dark Knight",
    genre: "Action, Crime, Drama",
    mediaType: "Movie",
    review: "The Dark Knight redefines the superhero genre with its intense plot, dark atmosphere, and Heath Ledger's unforgettable portrayal of the Joker. It’s a thrilling, complex, and visually stunning film that holds up on every rewatch.",
    rating: 5
  }
    
];

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log("The Server is running on port " + port);
});


// Routes
// Home route - renders the homepage and passes the reviews array to the view
app.get("/", (req, res) => {
    res.render("index.ejs" ,{ reviews})
   
}); 

// Render the form for creating a new review
app.get("/create", (req, res) => {
    res.render("create.ejs");
});

// Render the 'About' page
app.get("/about", (req, res) => {
    res.render("about.ejs");
});

// Render the 'Contact' page
app.get("/contact", (req, res) => {
    res.render("contact.ejs");
});

// Handle form submission for creating a new review
app.post("/submit-review", (req, res) => {
    const { 
        title,
        review,
        genre, 
        mediaType, 
        rating    } = req.body;

    const newReview = {
        id:
        title,
        review,
        genre,
        mediaType,
        rating,
    };
    
    reviews.push(newReview);  
    res.redirect("/");
        
});


// Render the 'Edit' form for a specific review
app.get("/edit/:id", (req, res) => {
    const reviewId = parseInt(req.params.id);
    const review = reviews[reviewId];

    if(review){
        res.render("edit.ejs",{review});
    }
    else{
        res.status(404).send('Review not found');
    }
});

// Handle form submission for updating an existing review
app.post("/update/:id",(req,res)=>{
    const reviewId = parseInt(req.params.id);
    const newData={
        id: reviewId,
      title : req.body.title,
      review: req.body.review,
      genre: req.body.genre,
      mediaType: req.body.mediaType,
      rating : req.body.rating
    } 
    if(reviews[reviewId]){
        reviews[reviewId]=newData;
        res.render("review.ejs",{review: reviews[reviewId],reviews});  
      }   
    
    else{
        res.status(404).send('Review not found');
    }
});

// Handle the deletion of a review
app.post("/delete/:id", (req, res) => {
    const reviewId = parseInt(req.params.id);
    if(reviews[reviewId]){
        reviews.pop(reviews[reviewId]);
        res.redirect("/");
    }
    else{
        res.status(404).send('Review not found');
    }
});

// Render a specific review's details
app.get("/review/:id", (req, res) => {

    const reviewId = parseInt(req.params.id);
    const review = reviews.find(r => r.id === reviewId);

    if(review){
        res.render("review.ejs",{review, reviews});
    }
    else{
        res.status(404).send('Review not found');
    }
});