# LokiJS
A Javascript API module allowing users to interact with Topl's blockchain

# Installation
To install run "npm install bifrost-lokijs" in your project directory<br/>

# Usage
Create an instance of lokijs in your JS application by including:<br/>
var LokiJS = require('bifrost-lokijs');<br/><br/>
Most of the functions return promises that need to be operated upon using .then functions. For example: <br/>
var LokiObj = new LokiJS();<br/>
LokiObj.getMempool().then(function(response){console.log(response);});

License
-------
LokiJS is licensed under the
[Open Software License v. 3.0 (OSL-3.0)](https://opensource.org/licenses/OSL-3.0), also included
in our repository in the `LICENSE` file.

