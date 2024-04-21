import { exec, execSync } from "child_process";

export default function handler(req, res) {
    const object = req.body;

    /* const response = fetch(`http://timpc:6000/restaurants`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(object),
    }); */
    var version = execSync(`curl --request POST --header "Content-Type: application/json" --data '{"lat": ${43}, "lon": ${14}}' http://timpc:6000/restaurants -o output.txt`).toString();
    //take second to last line
    console.log();
    console.log();
    console.log();
    console.log(version);
    // Assuming you want to return a JSON response
    res.status(200).json(JSON.parse(version))
  }