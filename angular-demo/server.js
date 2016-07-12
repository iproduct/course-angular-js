/**
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only. Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var PRODUCTS_FILE = path.join(__dirname, 'products','products.json');

app.set('port', (process.env.PORT || 9000));

app.use('/api/products/', express.static(path.join(__dirname, '/products')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Additional middleware which will set headers that we need on each request.
app.use(function(req, res, next) {
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Disable caching so we'll always get the latest comments.
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.get('/api/products', function(req, res) {
  fs.readFile(PRODUCTS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.json(JSON.parse(data).reverse());
  });
});

app.post('/api/products', function(req, res) {
  fs.readFile(PRODUCTS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    var products = JSON.parse(data);
    
    product = req.body;
    
    // NOTE: In a real implementation, we would likely rely on a database or
    // some other approach (e.g. UUIDs) to ensure a globally unique id. We'll
    // treat Date.now() as unique-enough for our purposes.
    var newProduct = {
      'id': Date.now(),
      'name': product.name,
      'vendor': product.vendor,
      'permalink': product.permalink,
      'imageUrl': product.imageUrl,
      'snippet': product.snippet,
      'price': product.price,
      'currency': product.currency
    };
    console.log('Add product: ', product);
    products.push(newProduct);
    fs.writeFile(PRODUCTS_FILE, JSON.stringify(products, null, 4), function(err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      res.json(product);
    });

  });
});

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
