// import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";

// const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {

//     return {
//         statusCode: 200,
//         body: JSON.stringify({
//             message: 'Hola Mundo',
//         }),
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     }
// }

// export { handler };

import type { Context } from "@netlify/functions";

export default async (req: Request, context: Context) => {
  console.log('Hola Mundo desde Hello Handler');
  return new Response("Hello, world!!!")
}