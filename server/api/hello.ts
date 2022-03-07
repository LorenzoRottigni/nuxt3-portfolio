import type {IncomingMessage, ServerResponse} from "http"
import * as url from "url";
export default async (req: IncomingMessage, res: ServerResponse) => {
    ///api/hello/message=123
    //{{message: 123}}
    const queryObject = url.parse(req.url as string, true)
    const {message} = queryObject.query

    let data = { data: [{data: ""}]};

    //if(message)
    //    data = await $fetch("url")

    res.writeHead(200, {"Content-Type":"application/json"})
    //res.write(JSON.stringify(queryObject))
    res.write(JSON.stringify(message))
    res.end()
    //if(queryObject)
}