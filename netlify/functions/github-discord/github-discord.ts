import type { Context } from "@netlify/functions";

const notify = async(message: string) => {
    const body = {content: message}
    
    const resp = await fetch(process.env.DISCORD_WEBHOOK_URL ?? '', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });
    
    if (!resp.ok) {
        console.log('Error sending message todiscord');
        return false;
    }
    
    return true;
}

const onStar = (payload: any): string => {
    const { action, sender, repository } = payload;
    return `User ${sender.login} ${action} star on ${repository.full_name}`;
}

const onIssue = (payload: any): string => {
    const { action, issue } = payload;
    return `An issue was ${action} by ${issue.user.login}`;
}


export default async (req: Request, context: Context) => {
  const githubEvent = req.headers.get('x-github-event') ?? 'unknown';
    const payload = req.body;
    let message: string;

    switch (githubEvent) {
        case 'star':
            message = onStar(payload);
            break;
        case 'issues':
            message = onIssue(payload);
            break;
        default:
            message = `Unknown event ${githubEvent}`;
    }

    await notify(message);

  return new Response("done")
}

// import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";

// const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
//     const githubEvent = event.headers['x-github-event'] ?? 'unknown';
//     const payload = JSON.parse(event.body ?? '{}');
//     let message: string;

//     switch (githubEvent) {
//         case 'star':
//             message = onStar(payload);
//             break;
//         case 'issues':
//             message = onIssue(payload);
//             break;
//         default:
//             message = `Unknown event ${githubEvent}`;
//     }

//     await notify(message);

//     return {
//         statusCode: 200,
//         body: JSON.stringify({
//             message: 'done',
//         }),
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     }
// }

// export { handler };