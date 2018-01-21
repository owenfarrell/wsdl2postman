var assert = require('assert');
var converter = require('../convert');
var Path = require('path');

describe('Converter', function () {

    describe('#expand()', function () {
        it('should expand a description in to a shell object', function () {
            let sampleDescription = {
                "n1": "xs:int",
                "n2": "xs:int",
                "n3[]": "xs:string",
                "n4": {},
                "n5": {
                    "n6": "xs:int",
                    "n7[]": "xs:string",
                }
            };
            let expectedExpansion = {
                n1: '?',
                n2: '?',
                n3: ['?'],
                n4: '?',
                n5: {
                    n6: '?',
                    n7: ['?']
                }
            };
            let actualExpansion = converter.expand(sampleDescription);
            assert.deepEqual(actualExpansion, expectedExpansion);
        });
    });

    describe('#convert()', function () {
        
        it('should parse a wsdl available on the file system', function (done) {
            let wsdlUri = Path.resolve(__dirname, "StockQuote.wsdl");
            converter.parseFile(wsdlUri, () => done());
        });
            
        it('should parse a bare hello world WSDL', function (done) {
            let wsdlUri = 'https://raw.githubusercontent.com/apache/cxf/HEAD/tools/javato/ws/src/test/resources/java2wsdl_wsdl/hello_world_bare.wsdl';
            converter.parseFile(wsdlUri, () => done());
        });

        it('should parse a WSDL for SOAP v1.2', function (done) {
            let wsdlUri = 'https://raw.githubusercontent.com/apache/cxf/HEAD/tools/javato/ws/src/test/resources/org/apache/cxf/tools/java2wsdl/processor/expected/hello_soap12.wsdl';
            converter.parseFile(wsdlUri, () => done());
        });

        it('should parse a WSDL that uses RPC', function (done) {
            let wsdlUri = 'https://raw.githubusercontent.com/apache/cxf/HEAD/tools/javato/ws/src/test/resources/org/apache/cxf/tools/java2wsdl/processor/expected/rpc-hello-expected.wsdl';
            converter.parseFile(wsdlUri, () => done());
        });

        it('should parse a WSDL with multiple ports', function (done) {
            let wsdlUri = 'https://raw.githubusercontent.com/apache/cxf/HEAD/rt/ws/eventing/src/main/resources/wsdl/eventing.wsdl';
            converter.parseFile(wsdlUri, () => done());
        });

        it('should parse a WSDL with multiple services', function (done) {
            let wsdlUri = 'https://raw.githubusercontent.com/apache/cxf/HEAD/tools/javato/ws/src/test/resources/org/apache/cxf/tools/java2wsdl/processor/internal/jaxws/expected/expected_hello_world_doc_lit.wsdl';
            converter.parseFile(wsdlUri, () => done());
        });

    });

});
