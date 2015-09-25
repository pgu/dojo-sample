# Run it
Unzip the folder. And run it with http-server for example.

```
cd dojo-sample
http-server
```
Then open http://localhost:8080/

# Frontend communication
Here are 2 ways of transferring data between 2 applications
- localStorage (which is enough when navigating from one view to another. RS already uses it to store the current api)
- postMessage (needed if necessary interactions with  outside/inside elements on the same page)

# Notes
We use the iframe strategy as it enables us to be in a sandbox environment. Indeed, here are some advantages:
- the Manager does not need to tweak its build to import our distribution (you can use the application distribution as it is)
- there won't be any technical problems due to:
 - overriding of global CSS styles
 - overriding of global JS variables
 - overriding of libraries, with conflicting versions

Thus, we will spend time only on the definition of what messages to exchange between the 2 applications.
*However* to achieve this goal, the UX of what is expected from the Designer inside the Manager must been specified first.
