/*********************************************************************************
* WEB422 – Assignment 1
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: Lais da Silva Lopes Furtado Student ID: 127799211 Date: 17/01/2023
* Cyclic Link: https://cute-rose-xerus-cuff.cyclic.app/
*
********************************************************************************/
const express = require("express");
const app = express();
const HTTP_PORT = process.env.PORT || 8080;
const cors = require("cors");
require("dotenv").config();
const MoviesDB = require("./modules/moviesDB.js");
const db = new MoviesDB();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.json({message: "API Listening"});
});

//successful post (create) = status 201
//successful delete = status 204 (no content)
//error = status 500 (internal server error)
app.post("/api/movies", async (req, res) => {
    try{
        let data = await db.addNewMovie(req.body);
        res.status(201).json(data);
    }catch(err){
        res.status(500).json({message: err});
    }
});
app.get("/api/movies", async (req, res) => {    
    try{
        let data = await db.getAllMovies(req.query.page, req.query.perPage, req.query.title);
        res.json(data);
    }catch(err){
        res.status(500).json({message: err.message});
    }         
});
app.get("/api/movies/:_id", async (req, res) => {
    try {
        let data = await db.getMovieById(req.params);
        res.json(data);
    } catch (err) {
        res.status(500).json({message: err});
    }
});
app.put("/api/movies/:_id", async (req, res) =>{
    try {
        let data = await db.updateMovieById(req.body, req.params);
        res.status(201).end();
    } catch (err) {
        res.status(500).json({message: err});
    }
});
app.delete("/api/movies/:_id", async (req, res) => {
    try {
        let data = await db.deleteMovieById(req.params);
        res.status(204).end();
    } catch (err) {
        res.status(500).json({message: err});
    }
});

db.initialize(process.env.MONGODB_CONN_STRING).then(()=>{
    app.listen(HTTP_PORT, ()=>{
    console.log(`server listening on: ${HTTP_PORT}`);
    });
   }).catch((err)=>{
    console.log(err);
   });