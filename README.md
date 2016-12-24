# Slack Challenge 2016    
----
### Prerequisites
- [Node.js 7.0+](http://nodejs.org)

### Installation
Please run the following commands:
```bash
# Install all dependencies
npm install

# Make sure unit tests work properly
npm test

# Start the server
npm start
```

### Slack Command Instructions
Start a new game:
```shell
/ttt @opponent-username
```

Make a move where x and y are valid coordinates, that is they are within 0 and 2 (inclusive):
```shell
/ttt (x, y)
```

To see the board status and who's turn is next:
```shell
/ttt
```
