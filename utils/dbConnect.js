const mongoose= require('mongoose')

const dbConnect=()=>{
    const MONGODB_URI = "mongodb+srv://khusbumallick:UoajUXGTZpaXl1j2@cluster0.5g3pkpx.mongodb.net/";
    mongoose.connect(MONGODB_URI)
    .then(()=>{
        console.log('connected to db')
    })
    .catch((err)=>{
        console.log('not connected to db',err)
    })
}

module.exports= dbConnect