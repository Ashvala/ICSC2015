# Dynamic Orchestra server
----
#Installation requirements:

- Node.js
- socket.io
- express

## Installing these:
----

### OS X:

On OS X, you'd ideally want to install Node.JS via homebrew

```
	brew install nodejs
```

Node.js comes with its own package manager called NPM. We will use NPM to install the stuff for the server 

```
	npm install express
```

```
 	npm install socket.io 	 
```

#Usage:
----

To run the server, just execute: 

``` 
	node server
```

This will start a server on port 8181. To change this, edit the source-code to whatever port your router or VPS supports. 

In addition to that, we have a .orc file, which contains the orchestra code that will be split into sections based on the seperator ";------;", with however many hyphens or whatever you want inside. 





