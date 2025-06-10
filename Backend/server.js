const app=require('./app');
const connectDatabase = require('./config/database');

connectDatabase();

const server=app.listen(process.env.PORT,()=>{
    console.log(`My Server listening to the port: ${process.env.PORT} in ${process.env.NODE_ENV}`);
    
})

process.on('unhandledRejection',(err)=>{
    console.log(`Error : ${err.message}`);
    console.log('Shutting down the server due to unhandlerejection Error');
    server.close(()=>{
        process.exit(1)
    })
    
}) 

// process.on("unhandledRejection", (reason, promise) => {
//     console.error("Unhandled Rejection at:", promise, "reason:", reason);
//     // Optionally, you can shut down the server
//     process.exit(1); // Exit the server if needed
//   });

process.on('uncaughtException',(err)=>{
    console.log(`Error : ${err.message}`);
    console.log('Shutting down the server due to uncaughtException Error');
    server.close(()=>{
        process.exit(1)
    })
})

