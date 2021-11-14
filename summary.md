# Real-time Web Application

## Goals

- What are Real-time web applications?
=> have a concrete understanding of what real-time web applications are
- What technologies are used to create them?


## Concepts

### What are Real-time web applications?

A set of technologies and practices that enable users to receive information as it is published

Example of services that use these type of applications are facebook, twitter, gmail

### Use cases

- Social networking
- Gaming
- Gambling
- Trading
- Monitoring
- Tracking
- Sports events
- Collaborative apps
- Job progress updates
- Messaging

### Underlying technologies to create real-time web application

- AJAX Polling
- AJAX Long-Polling
- HTML5 Server Sent Events
- HTML5 Websockets


### How client communicate with server?

Through HTTP request, using HTTP protocol

1. a client request a web page from a server by sending a http request
1. the server calculates the response, and sends it to the client

![](https://arrow-test-env.s3.us-east-2.amazonaws.com/rwa/1-http-request.png)

How can we make the server able to pass data and update to the client?


## AJAX Polling

A standard technique used by the vast majority of AJAX applications.

Through periodical AJAX requests, client send http requests to server, the server responds and passes new data to the user

![](https://arrow-test-env.s3.us-east-2.amazonaws.com/rwa/2-polling.png)

1. The client opens a connection and requests data from the server using regular HTTP.
2. The requested webpage sends requests to the server at regular intervals (e.g., 0.5 seconds).
3. The server calculates the response and sends it back, just like regular HTTP traffic.
4. The client repeats the above three steps periodically to get updates from the server

Problems: 

- client has to keep asking the server for any new data, creating HTTP overhead.


## Long Polling

The client requests information from the server exactly as in regular polling, but if the server does not have any data available for the client, the server holds the request and waits until some data becomes available.


![](https://arrow-test-env.s3.us-east-2.amazonaws.com/rwa/3-long-polling.png)

1. The client makes an initial request using regular HTTP and then waits for a response.
1. The server delays its response until an update is available or a timeout has occurred.
1. When an update is available, the server sends a complete response to the client.
1. The client typically sends a new long-poll request, either immediately upon receiving a response or after a pause to allow an acceptable latency period.
1. Each Long-Poll request has a timeout. Therefore, the client has to reconnect periodically after the connection is closed due to timeouts.


## Server-Sent Events (SSEs)

Allows the server to push information to a client whenever the data is available.

Server-Sent Events is a server push technology enabling a client to receive automatic updates from a server via an HTTP connection

SSE is a high-performance transport for server-to-client streaming of text-based real-time data: messages can be pushed the moment they become available on the server (low latency), there is minimum message overhead (long-lived connection, event-stream protocol, and gzip compression)

The client establishes a persistent and long-term connection with the server. The server uses this connection to send data to a client.

1. Client requests data from a server using regular HTTP.
1. The requested webpage opens a connection to the server.
1. The server sends the data to the client whenever there’s new information available.

![](https://arrow-test-env.s3.us-east-2.amazonaws.com/rwa/4-sse.png)

Some important things you should know before choosing them for your application:

- The technology is based on HTTP
- Allows only unidirectional data flow (as already mentioned)
- It is limited to pure text data, no binaries allowed

SSEs are best when we need real-time traffic from the server to the client or if the server is generating data in a loop and send multiple events to the client.

If the server crashes or the connection is lost, the `EventSource` tries to reconnect, we do not need to worry about it. If the browser knows that there is no Internet connection at the moment, it will try again to reconnect once the Internet connection is established.

Server-Sent Events have a limited maximum number of open connections (6)

SSE are much easier and faster to implement than WebSocket

Browser Support: [https://caniuse.com/eventsource](https://caniuse.com/eventsource)


## WebSocket

WebSocket allows communication in both directions, allows this to happen simultaneously.

It provides a persistent connection between a client and a server that both parties can use to start sending data at any time

HTML5 app that utilizes Web Sockets will work on any HTML5 enabled web browser.

![](https://arrow-test-env.s3.us-east-2.amazonaws.com/rwa/5-web-socket.png)

1. The client establishes a WebSocket connection through a process known as the WebSocket handshake. 
1. If the process succeeds, then the server and client can exchange data in both directions at any time.

WebSocket Events:

- OnOpen
- OnMessage
- OnError
- OnClose

WebSocket API:

- Send
- Close


Browser Support: [https://caniuse.com/websockets](https://caniuse.com/websockets)

WebSockets are new protocol, it doesn't run on http protocol

WebSockets do not provide an automatic reconnection if the connection is lost

WebSockets allows sending binary data


## References

- [Ajax Polling vs Long-Polling vs WebSockets vs Server-Sent Events](https://medium.com/geekculture/ajax-polling-vs-long-polling-vs-websockets-vs-server-sent-events-e0d65033c9ba)
- [A Complete Guide To Server-Sent Events In JavaScript](https://vhudyma-blog.eu/a-complete-guide-to-server-sent-events-in-javascript/)
- [WebSockets - Quick Guide](https://www.tutorialspoint.com/websockets/websockets_quick_guide.htm)