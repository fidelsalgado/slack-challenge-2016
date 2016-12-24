# Slack Challenge 2016    
----
### Installation
- Make sure node and npm is installed. You can install it from here: nodejs.org
- Then to run the server please run the following commands: 
    ```shell 
    npm install
    npm test
    npm start
    ```

### Slack Command Instructions
- To start a new game:
    ```shell
    /ttt @opponent-username
    ```
- To make a move where x and y are valid coordinates, that is they are within 0 and 2 (inclusive):
    ```shell
    /ttt (x, y)
    ```
- To see the board status and who's turn is next:
    ```shell
    /ttt
    ```