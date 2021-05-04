const authRoutes = require('./authRoutes.js');
const apiAuth = require('../middleware/apiAuth.js');
const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const Article = require('../models/Article');


//link to other controller files
router.use(authRoutes);

router.get('/', async (req,res) => {
  const allArticles = await Article.findAll().catch((err) => {
    res.json(err);
  });
  const articles = allArticles.map((article) => article.get({ plain: true }));

    res.render('index', { articles });
})

// router.get('/secretclubpage',(req,res)=>{
//     res.render('secretclub',req.session.user)
// })


// route for authorized user only
router.get("/profile", async (req, res) =>{ 
   if(!req.session.user){
      return res.status(401).send("Login first")
    } else {
        const allArticles = await Article.findAll().catch((err) => {
          res.json(err);
        });
        console.log(req.session.user);
        const articles = allArticles.map((article) => article.get({ plain: true }));
        console.log(articles);
        // console.log(articles[0].title);
        res.render('profile', { articles });
    }
  })

router.get("/test", apiAuth, async (req, res) =>{ 
  const allArticles = await Article.findAll().catch((err) => {
    res.json(err);
  });
    console.log(req.session.user);
    const articles = allArticles.map((article) => article.get({ plain: true }));
    console.log(articles);

    res.render(`test`, { articles });

  })



// route for authorized user only
router.get("/newpost",(req, res)=>{
  if(!req.session.user){
    return res.status(401).send("Login first")
  } else {
    res.render(`newpost`, req.session.user)
  }
})


router.post('/newpost',(req,res)=>{
  
  Article.create({ 
        title:req.body.title,
        content:req.body.content,
      }).then(newPost=>{
        res.json(newPost);
        res.render(`article`, req.session.user)
      }).catch(err=>{
        console.log(err);
        res.status(500).json(err);
      })
    })


module.exports = router;