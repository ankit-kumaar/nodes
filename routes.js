const url = req.url;
    const method = req.method;
    const body = [];

if (url === "/") {
    fs.readFile("message.txt", { encoding: "utf-8" }, (err, data) => {
        if (err) {
            console.log(err);
        }
        console.log('data from file' + data);
        res.setHeader("Content-Type", "text/html");
        res.write("<html>");
        res.write("<head><title>Enter Message</title></head>");
        res.write(`<body>${data}</body>`);
        res.write('<form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form>');
        res.write("</html>");
        return res.end();
    });

} else if (url === "/message" && method === "POST") {
    req.on("data", (chunk) => {
        body.push(chunk);
    });

    return req.on("end", () => {
        const parsedBody = Buffer.concat(body).toString();
        const message = parsedBody.split("=")[1];
        fs.writeFile("message.txt", message, (err) => {
            console.log('inside fs.writeFile');
            if (err) {
                console.log(err);
            }
            res.statusCode = 302;
            res.setHeader("Location", "/");
            return res.end();
        });
    });
} else {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>MyFirst page</title></head>");
    res.write("<body><h1>Hello Node.js</h1></body>");
    res.write("</html>");
    res.end();
};

exports.handler = requestHndler;

//module.exports = requestHandler;
// //module.exports = {
//     handler: requestHndler;
// }