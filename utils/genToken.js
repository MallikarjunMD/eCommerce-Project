import jwt from "jsonwebtoken"

export async function genToken(id){
    return await jwt.sign({id},process.env.SECRET_STRING)
}
