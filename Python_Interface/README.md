# CsSocket python interface:

----

#Requirements:

Install (using pip): 

```
   pip install socketIO-client
```

You obviously also need the node.js server from the directory above up and running in order to use this.

#Usage:

```
python CsSocket_CLI.py
```

This will start the Client needed to connect to the Server. 

You can send score messages to the server in the standard score format. You can extend the parse method in the CsSocket class to include more actions that are supported currently, such as channel messages (*chanmsg*) and full orchestras (*orc*)

