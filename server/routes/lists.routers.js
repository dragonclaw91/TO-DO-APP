
const express = require('express');

const router = express.Router();

const pool = require('../modules/pool');


router.get("/",(req,res) => {
    let queryText = 'SELECT * FROM "List" ORDER BY "isComplete"' //grabbing everthing from the table in database
    pool.query(queryText).then(result => {
        res.send(result.rows) //sending the results to the client
    }).catch(error => {
        console.log("error getting tasks",error);
        res.sendStatus(500);
    })
})

router.post("/",(req,res) => {
    let newTask = req.body;
    console.log("adding new task",newTask);

    let queryString = `INSERT INTO "List" ("task")
    VALUES($1);`;
    pool.query(queryString,[newTask.task]) // sending information to add to the dataase
.then(result => {
    res.sendStatus(201); 
}).catch(error => {
    console.log("there was an error adding new task",error);
    res.sendStatus(500);
})
});
// passing id of items for deletion to database
router.delete("/:id",(req,res) => {
    console.log("deleting book",req.params)
    let queryText = `DELETE FROM "List" WHERE "id"=$1`;
    pool.query(queryText,[req.params.id])
    .then(result =>{
        res.send(`task with id ${req.params.id} was deleted`)
    }).catch(error => {
        console.log("there was an error deleting task",error)
        res.sendStatus(500)
    })

})
// allowing for the database to update the status of the task to complete
router.put('/:taskid',  (req, res) => {
    console.log(`marking task as complete`);
    console.log(req.params);
  
    let queryText = `UPDATE "List" SET "isComplete"=NOT "isComplete","completed_at"=NOW() WHERE "id"=$1`;
    pool.query(queryText, [req.params.taskid])
      .then(result => {
        res.send(`task with id ${req.params.taskid} was updated`)
      })
      .catch(error => {
        console.log(`Error task `, error);
        res.sendStatus(500);
      });
  });


module.exports = router;