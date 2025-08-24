const  bcrypt = require ("bcrypt");



  const generatedHashPassword = async(plainPassword,saltRounds)=>{
    try {
       const hash = await  bcrypt.hash(plainPassword,saltRounds);
       return hash;
    } catch (error) {
        throw error;
    }

}

 const comparePassword = async(plainText,hashPassword)=>{
    try{
        const compare= await bcrypt.compare(plainText,hashPassword);
        return compare;
    }catch(error){
        throw error;
    }
}

module.exports={
  comparePassword,
  generatedHashPassword  
}