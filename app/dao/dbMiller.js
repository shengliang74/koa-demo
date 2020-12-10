const db = require("./db");

const insertOne = function(data){
    return new Promise(function(resolve, reject){
        db.collection('miller','pageDataList').insertOne(data, function(res){
            console.log("zzzzzzzzzzzzzzzzzs",res)
            if(res && res.result && res.result.ok && res.insertedId){
                resolve(res)
            }else{
                reject(res)
            }
        })
    })
}

const updateOne = function(whereData, updateData){
    return new Promise(function(resolve, reject){
        const newUpdateData = {$set: updateData};
        db.collection('miller','pageDataList').updateOne(whereData, newUpdateData, function(res){
            if(res && res.result && res.result.ok){
                resolve(res)
            }else{
                reject(res)
            }
        })
    })
}

const deleteOne = function(whereData){
    return new Promise(function(resolve, reject){
        db.collection('miller','pageDataList').deleteOne(whereData, function(res){
            if(res && res.result && res.result.ok){
                resolve(res)
            }else{
                reject(res)
            }
        })
    })
}

const find = function(whereData){
    return new Promise(function(resolve, reject){
        db.collection('miller','pageDataList').find(whereData, function(res){
            if(res){
                resolve(res)
            }else{
                reject(res)
            }
        })
    })
}

const findSort = function(whereData, sortData){
    return new Promise(function(resolve, reject){
        db.collection('miller','pageDataList').findSort(whereData, sortData, function(res){
            if(res && res.ok){
                resolve(res)
            }else{
                reject(res)
            }
        })
    })
}

const findPage = function(whereData, curPage, eachPage){
    return new Promise(function(resolve, reject){
        db.collection('miller','pageDataList').findPage(whereData, curPage, eachPage, function(res){
            if(res){
                resolve(res)
            }else{
                reject(res)
            }
        })
    })
}

module.exports = {
    insertOne,
    updateOne,
    deleteOne,
    find,
    findSort,
    findPage
}