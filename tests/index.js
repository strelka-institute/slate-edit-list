/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */

import test from 'ava';
import fs from 'fs';
import path from 'path';
import { Value, Schema } from 'slate';
import EditList from '../lib';

const tests = fs.readdirSync(__dirname);
const resolve = (...p) => path.resolve(__dirname, ...p);
const PLUGIN = EditList();
const SCHEMA = Schema.create({ plugins: [PLUGIN] });

tests
    .filter(testName => testName !== 'snapshots')
    .forEach((testName, index) => {
        if (testName[0] === '.' || path.extname(testName).length > 0) return;

        test(testName, t => {
            const input = require(resolve(testName, 'input.js')).default;
            const runChange = require(resolve(testName, 'change.js')).default;

            const value = Value.fromJSON(
                {
                    selection: input.selection,
                    document: input.document,
                    schema: SCHEMA
                },
                { normalize: false }
            );

            const change = runChange(PLUGIN, value.change());
            const changedDoc = change.value.toJSON();

            t.snapshot(changedDoc);
        });
    });
