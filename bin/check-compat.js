#!/usr/bin/env node

var path = require('path');

require('../')(path.join(process.cwd(), 'package.json'))
