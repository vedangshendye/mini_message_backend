const express=require('express');
const path=require("path");
const app=express();
const fs=require('fs');
app.use(express.urlencoded({ extended: true }));
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

const messages = [
  {
    text: "Winter is coming",
    user: "Ned Stark",
    added: new Date()
  },
  {
    text: "Hear me roar!",
    user: "Tywin Lannister",
    added: new Date()
  },
  {
    text:"Fire and blood",
    user:"Danerys Targeryan",
    added: new Date()
  }
];
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');


app.get("/",(req,res)=>{
    res.render("index",{messages:messages});

})
app.get("/newmessage",(req,res)=>{
    res.render("newmessage");

})
app.get("/details/:id", (req, res) => {
    const id = req.params.id;
    const message = messages[id];
    res.render("details", { message });
});
app.post("/newmessage",(req,res)=>{
    messages.push({text:req.body.text,user:req.body.user,added:new Date()});
    res.redirect("/");
})

const port = process.env.PORT || 8000;

app.listen(port, "0.0.0.0", () => {
  console.log(`Server started on port ${port}`);
});