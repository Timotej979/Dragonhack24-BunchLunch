import { execSync } from "child_process";
import { NextApiRequest, NextApiResponse } from "next";

export default async function  handler(req: NextApiRequest, res: NextApiResponse) {
    // Get lat and lon from the request body
    const { lat, lon } = req.body;

    const get = await execSync(
        `curl -v --request POST --header "Content-Type: application/json" --data '{"lat": ${lat}, "lon": ${lon}}' http://127.0.0.1:7000/bunchlunch-api/v1/wolt/restaurants`
      );
    const lines = get.toString().trim().split("\n");

    console.log(lines);

    const lastLine = lines[lines.length - 1];
  
    console.log(lastLine)
    // Assuming you want to return a JSON response
    res.status(200).json(JSON.parse(lastLine))
  }