# Codex

Push frontend to the frontend branch<br>
And backend to the main branch under the `backend/` folder<br>

Most planned future features added would require changes to both frontend and backend, syncing 2 branches for commits is harder than just having both in one folder and reverting is as simple as reverting to the last working version.<br>
We can also automate redeploys only on changes within folders eg `backend/*` so maintaining 2 separate branches isn't a necessity.
