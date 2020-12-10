const MongoClient = require('mongodb').MongoClient;
const config = require('../../config/config.default');
const {dbName,host,port} = config.mongodb || {};
const url = `mongodb://${host}:${port}/${dbName}`;
const isFunction = function(func){
    return typeof func === 'function';
}

const oprate = function(database, sheetName, opr){
    return function(){
        var arg = [].slice.apply(arguments);
        MongoClient.connect(url, {useNewUrlParser: true}, function(err, db){
            if(err) throw err;
            const dbase = db.db(database);
            const func = arg[arg.length -1];
            if(isFunction(func)){
                arg[arg.length-1] = function(err, res){
                    if(err) throw err;
                    try{
                        func(res)
                    }catch(e){
                        console.error(e)
                    }
                    db.close()
                }
            }
            // dbase.collection(sheetName)[opr](...arg);
            const dbaseC = dbase.collection(sheetName);
            dbaseC[opr].apply(dbaseC, arg);
        })
    }
}

const find = function(database, sheetName){
    return function(whereData, func){
        MongoClient.connect(url, {useNewUrlParser: true}, function(err, db){
            if(err) throw err;
            const dbase = db.db(database);
            const dbaseC = dbase.collection(sheetName);
            dbaseC.find(whereData).toArray(function(err, res){
                if(err) throw err;
                if(isFunction(func)){
                    try{
                        func(res)
                    }catch(e){
                        console.error(e)
                    }
                }
                db.close()
            })
        })
    }
}

const findSort = function(database, sheetName){
    return function(whereData, sortData , func){
        MongoClient.connect(url, {useNewUrlParser: true}, function(err, db){
            if(err) throw err;
            const dbase = db.db(database);
            const dbaseC = dbase.collection(sheetName);
            dbaseC.find(whereData).sort(sortData).toArray(function(err, res){
                if(err) throw err;
                if(isFunction(func)){
                    try{
                        func(res)
                    }catch(e){
                        console.error(e)
                    }
                }
                db.close()
            })
        })
    }
}

const findPage = function(database, sheetName){
    return function(whereData, curPage, eachPage, func){
        MongoClient.connect(url, {useNewUrlParser: true}, function(err, db){
            if(err) throw err;
            if(curPage <= 0 || eachPage <= 0){
                throw new Error('params is error')
                return
            }
            const dbase = db.db(database);
            const dbaseC = dbase.collection(sheetName);
            const skipNum = (curPage - 1) * eachPage;
            dbaseC.find(whereData).skip(skipNum).limit(eachPage).toArray(function(err, res){
                if(err) throw err;
                if(isFunction(func)){
                    try{
                        func(res)
                    }catch(e){
                        console.error(e)
                    }
                }
                db.close()
            })
        })
    }
}



module.exports = {
    collection: function(database, sheetName){
        return {
            insertOne: oprate(database, sheetName, 'insertOne'),
            updateOne: oprate(database, sheetName, 'updateOne'),
            deleteOne: oprate(database, sheetName, 'deleteOne'),
            find: find(database, sheetName),
            findSort: findSort(database, sheetName),
            findPage: findPage(database, sheetName)
        }
    }
}