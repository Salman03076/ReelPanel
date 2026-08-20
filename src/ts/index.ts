import { application } from "./app.js"


export let stage;

(async () => (
    stage = await application()
))


