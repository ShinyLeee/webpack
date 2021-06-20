"use strict";

const path = require("path");
const fs = require("graceful-fs");

const webpack = require("..");

describe("HotModuleReplacementPlugin", () => {
	jest.setTimeout(20000);
	it("should correct working when entry is Object and key is a number", done => {
		const outputPath = path.join(__dirname, "js", "HotModuleReplacementPlugin");
		const entryFile = path.join(__dirname, "mock", "entry.js");
		const recordsFile = path.join(outputPath, "records.json");
		try {
			fs.mkdirSync(outputPath, { recursive: true });
		} catch (e) {
			// empty
		}
		try {
			fs.unlinkSync(recordsFile);
		} catch (e) {
			// empty
		}
		const compiler = webpack({
			mode: "development",
			cache: false,
			entry: {
				0: entryFile
			},
			recordsPath: recordsFile,
			output: {
				path: outputPath
			},
			plugins: [new webpack.HotModuleReplacementPlugin()],
			optimization: {
				chunkIds: "named"
			}
		});
		compiler.run((err, stats) => {
			if (err) throw err;
			done();
		});
	});
});
