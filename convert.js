var Path = require('path');
var pd = require('pretty-data').pd;
var soap = require('soap');
var uuid = require('uuid');

var converter = {

    parseFile: function (url, callback) {
        soap.createClient(url, (err, client) => this.convertResource(err, client, callback).bind(this));
    },

    convertResource: function (err, client, callback) {
        let collection = {};
        let wsdlBasename = Path.basename(client.wsdl.uri);
        let wsdlExtension = Path.extname(wsdlBasename);
        collection.info = {
            _postman_id: uuid.v4(),
            name: wsdlBasename.substr(0, wsdlBasename.indexOf(wsdlExtension)),
            schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json'
        };
        let clientDescription = client.describe();
        collection.item = Object.keys(clientDescription).sort()
            .map((serviceName) => {
                return {
                    id: uuid.v4(),
                    name: serviceName,
                    item: this.parseService(client, serviceName, clientDescription[serviceName])
                };
            });
        callback(collection);
    },

    parseService: function (client, serviceName, serviceDescription) {
        return Object.keys(serviceDescription).sort()
            .map((portName) => {
                return {
                    id: uuid.v4(),
                    name: portName,
                    item: this.parsePort(client, serviceName, portName, serviceDescription[portName])
                };
            });
    },

    parsePort: function (client, serviceName, portName, portDescription) {
        return Object.keys(portDescription).sort()
            .map((operationName) => {
                let operationItem = {
                    id: uuid.v4(),
                    name: operationName,
                    request: {
                        method: 'POST',
                        body: { mode: 'raw' },
                        description: ''
                    }
                };
                client.httpClient = {
                    request: function (rurl, data, callback, exheaders, exoptions) {
                        operationItem.request.body.raw = pd.xml(data);
                        operationItem.request.header = Object.keys(exheaders).map((headerKey) => {
                            return {
                                key: headerKey,
                                value: exheaders[headerKey]
                            };
                        });
                        operationItem.request.url = rurl;
                    }
                };
                let requestParameter = this.expand(portDescription[operationName].input);
                client[serviceName][portName][operationName](requestParameter);
                return operationItem;
            });
    },

    expand: function (input) {
        let keys = Object.keys(input);
        if (keys.length === 0) return '?';
        let obj = {};
        keys.filter((fieldName) => fieldName !== 'targetNSAlias' && fieldName !== 'targetNamespace')
            .forEach((fieldName) => {
                let parameterValue = typeof input[fieldName] === 'object' ? this.expand(input[fieldName]) : '?';

                if (fieldName.endsWith('[]')) {
                    obj[fieldName.substr(0, fieldName.length - 2)] = [parameterValue];
                }
                else {
                    obj[fieldName] = parameterValue;
                }

            });
        return obj;
    }
};

module.exports = converter;
