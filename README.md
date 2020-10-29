# wsdl-to-postman
Coverts WSDL specs to Postman Collections (v2.1 of the collection format)

[![Build Status](https://travis-ci.org/owenfarrell/wsdl2postman.svg?branch=master)](https://travis-ci.org/owenfarrell/wsdl2postman)
[![Maintainability](https://api.codeclimate.com/v1/badges/c4f05e210676c4684a77/maintainability)](https://codeclimate.com/github/owenfarrell/wsdl2postman/maintainability)
[![Known Vulnerabilities](https://snyk.io/test/github/owenfarrell/wsdl2postman/badge.svg?targetFile=package.json)](https://snyk.io/test/github/owenfarrell/wsdl2postman?targetFile=package.json)
[![codecov](https://codecov.io/gh/owenfarrell/wsdl2postman/branch/master/graph/badge.svg)](https://codecov.io/gh/owenfarrell/wsdl2postman)

# Usage
```sh
npx wsdl-to-postman /path/to/soapapi.wsdl > /path/to/save/soapapi.postman
```

## local usage

```sh
./console.js /path/to/soapapi.wsdl > /path/to/save/soapapi.postman
```