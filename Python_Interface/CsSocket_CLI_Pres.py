from socketIO_client import SocketIO

def on_connect_function(*args):
    print "connected" # Connected!

class CsSocket:
    def __init__(self, port): #initialization
        self.port = port # Socket.io port
        self.socketIO = SocketIO('localhost', port) # connect to localhost
        self.socketIO.wait(seconds = 1) # check every second
        self.socketIO.on("connect", on_connect_function) # on connect event function

    def parse(self, str):
        arg_arr = str.split(" ") # split at spaces
        if arg_arr[0] == "sco" and len(arg_arr) > 0: # check for proper score event
            self.socketIO.emit(arg_arr[0], str[4:]) # send score event


if __name__ == "__main__":
    CsSocket_Instance = CsSocket(8181) # create a new instance
    print "sending messages on port 8181"
    while True:
        command_str = raw_input("> ") # User input
        if command_str == "exit":
            break # exit the loop

        command_str2 = "sco " + command_str # pre-pend sco
        CsSocket_Instance.parse(command_str2) # run through the simple parser
