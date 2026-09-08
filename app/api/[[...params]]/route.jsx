export async function GET(req,{params}) {
    const {params : myParams}=await params;
    // console.log(myParams)
    return Response.json({myParams , message : "succesfull"});
}