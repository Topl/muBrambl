# LokiJS
A Javascript API wrapper to communicate with the Topl blockchain via fetch requests.

# Installation
To install run "npm install bifrost-lokijs" in your project directory<br/>

# Usage
Create an instance of LokiJS in your JS application by including:<br/>
* var LokiJS = require('bifrost-lokijs');<br/><br/>
Most of the functions return promises that need to be operated upon using .then functions. For example: <br/>
* var LokiObj = new LokiJS();<br/>
* LokiObj.getMempool().then(function(response){console.log(response);});<br/>

# Api-Key protection
To api-key protect your node and requests follow these steps:<br/>
1. Choose an api-key (some string)<br/>
2. Find the Blake2b256 hash of this string (can be found using the blakeHash function in this module)<br/>
3. Set the "apiKeyHash" field in the settings file of your node to be the blakeHash of your chosen api-key as found in the previous step<br/>
4. Use the setApiKey function in this module to set your chosen api-key for all requests made using a LokiJS instance in your application<br/>

License
-------
LokiJS is licensed under the
[Open Software License v. 3.0 (OSL-3.0)](https://opensource.org/licenses/OSL-3.0), also included
in our repository in the `LICENSE` file.

