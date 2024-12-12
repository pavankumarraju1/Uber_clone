import captainModel from "../model/CaptainModel.js";

const captainService=async({
    firstName,lastName,email,password,colour,vehicleType,capacity,plateNumber
})=>{
    if (!firstName||!lastName||!email||!password||!colour||!vehicleType||!capacity||!plateNumber){
        throw new Error('All fields must be required');
    }

    const captain = await captainModel.create({
        fullName:{firstName,lastName},email,password,vehicle:{colour,plateNumber,capacity,vehicleType}
    })
    return captain;
}

export default captainService;