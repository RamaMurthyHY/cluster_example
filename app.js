// Tutorial youtube video:  https://www.youtube.com/watch?v=9RLeLngtQ3A&ab_channel=yoursTRULY

const express = require('express');
const cluster = require('cluster');
const os = require('os');


const PORT = 3000;
const app = express();
const numCpus = os.cpus().length;

app.get('/', (req, res)=> {
    for(let i = 0; i<1e8; i++) {
        //
    }
    res.send(`Ok... from ${process.pid}`)
    cluster.worker.kill()
})



const isClusterMode = true;

if(isClusterMode) {
    if(cluster.isMaster) {
        for(let i = 0; i < numCpus; i++) {
            cluster.fork()
        }
    
        cluster.on('exit', (worker, code, signal)=> {
            console.log(`Worker ${worker.process.pid}`)
            cluster.fork()
        })
    } else {
        app.listen(PORT, ()=> {
            console.log(`Server is running ${process.pid} @http://localhost:${PORT}`)
        })
    }
} else {
    app.listen(PORT, ()=> {
        console.log(`Server is running ${process.pid} @http://localhost:${PORT}`)
    })
}

