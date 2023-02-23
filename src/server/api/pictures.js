const database = require('../db')
const express = require('express')
const router = express.Router()
const mysql = require('mysql')
const crypto = require('crypto')

//连接数据库
const con = mysql.createConnection(database.mysql)
con.connect()
const jsonWrite = function(res,ret) {
    if (typeof ret === 'undefined'){
        res.json({
            code:'1',msg:'操作失败'
        })
    }
    else {
        res.json(
            ret
        )
    }
}

//接口
router.get('/getPictures',(req,res) => {
    const params = req.query
    const sql = 'SELECT * FROM pictures ORDER BY RAND() LIMIT 15'
    con.query(sql,function(err,result){
        if(err){
            console.log(err)
        }
        if(result){
            jsonWrite(res,result)
        }
    })
})

router.get('/getAllPictures',(req,res) => {
    const params = req.query
    const sql = 'SELECT * FROM pictures order by id desc'
    con.query(sql,function(err,result){
        if(err){
            console.log(err)
        }
        if(result){
            jsonWrite(res,result)
        }
    })
})

router.get('/getDetailsPictures',(req,res) => {
    const params = req.query
    const sql = `SELECT * FROM pictures where id like '%${params.id}%' limit 1`
    con.query(sql,function(err,result){
        if(err){
            console.log(err)
        }
        if(result){
            jsonWrite(res,result)
        }
    })
})

router.get('/getTag',(req,res) => {
    const params = req.query
    const sql = `select * from p_tag where id =any (select t_id from id where p_id = ${params.id})`
    con.query(sql,function(err,result){
        if(err){
            console.log(err)
        }
        if(result){
            jsonWrite(res,result)
        }
    })
})

router.get('/getSearch',(req,res) => {
    const params = req.query
    const sql = `select * from pictures where id = any (select p_id from id where t_id = (select id from p_tag where tag = '${params.tag}' ))`
    con.query(sql,function(err,result){
        if(err){
            console.log(err)
        }
        if(result){
            jsonWrite(res,result)
        }
    })
})

module.exports = router