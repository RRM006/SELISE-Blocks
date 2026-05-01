selise blocks

\- operates in an area where it has similarity all platforms like vercel, aws, azure, etc  
\- focus is very broad  
\- services to build, deploy, monitor applications, etc, everything.  
\- why was it created?   
\- most problems are repetitive, everyone more or less wants a user management system, everyone needs secure way to store/use their files, and enterprises and stuff need tools to monitor stuff yada yada  
\- instead of having to ssh into servers and stuff, what if they could visualize stuff?  
\- blocks is an internal tool that was created to improve that stuff.  
\- branched into a LOT of microservices, so with blocks OS, they made sure that not everything is a separate app.  
\- similar apps/services was compiled into a single app/etc. so, groups of similar microservices are within one group of stuff.  
\- defaults are more restrictive so that mistakes aren’t made when deploying and using these services

\- blocks offers a few core services, including and grouped by: identity (most tested), observability, data gateway, blocks ai, deployment, localization, workflow, communications, etc.  
\- for the data gateway, you don’t need to worry about credentials and stuff to connect your backend, the user gets a token/jwt using which selise verifies if someone should get access to data or not.  
\- no restapi for the data gateway, graphql used.  
\- we will get access to a dummy app (called the construct, it’s a public repo) that uses the data gateway properly, and we can utilize that to figure out how their data gateway works.  
\- we can set up different environments as well (prod and dev etc)  
\- most things are configureable in the GUI.  
\- the moment you create a project, you get a few keys and cli commands to work with this.  
\- the commands will download construct in a folder and replace the env vars and stuff as well  
\- branches sync with different environments (prod, dev) as we name the branches properly (dev \-\> development environment), (main \-\> production) this is a part of the project setup.  
\- there’s a chrome extension that allows you to make edits (per language for content) and make edits in the extension that syncs realtime with your app, be it local or deployed somewhere (as it fetches these things via an api)  
\- all options in the GUI are not in the CLI. there are certain things that will have to be done manually/with computer use tools that won’t be made available for agents  
\- db is configured and works with mongo, not sql.  
\- their data access has RLS policies that can be created as well  
\- each settings exposes an api url that can be called with headers and stuff that can be used (request type is graphql of course)  
\- blocks-localization-api::key::save (we’ll have to create permissions to enable users to use each ui element and drag and drop it into their UI, where each key would represent each ui element a user would drag and drop)