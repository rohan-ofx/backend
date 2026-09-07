const asynchandler = (requesthandler) =>{
    (req, res, next) =>{
        Promise.resolve(requesthandler(req, res, next)).catch((err) => next(err))
    }
}




export {asynchandler}

//TRY  CATCH PROCESS


// const asynchandler =(fn) =>async(req , res , next)=> {
//     try {
//         await fn(req, res, next)
        
//     } catch (error) {
//         res.status(err.code || 500).json({
//             success : false,
//             message: err.message
//         })
        
//     }

// }