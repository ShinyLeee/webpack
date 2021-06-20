"use strict";

const path = require("path");
const fs = require("graceful-fs");

const webpack = require("..");

describe("HotModuleReplacementPlugin", () => {
	jest.setTimeout(20000);
	// it("should correct working when entry is Object and key is a number", done => {
	// 	const outputPath = path.join(__dirname, "js", "HotModuleReplacementPlugin");
	// 	const entryFile = path.join(outputPath, "entry.js");
	// 	const recordsFile = path.join(outputPath, "records.json");
	// 	try {
	// 		fs.mkdirSync(outputPath, { recursive: true });
	// 	} catch (e) {
	// 		// empty
	// 	}
	// 	try {
	// 		fs.unlinkSync(recordsFile);
	// 	} catch (e) {
	// 		// empty
	// 	}
	// 	const compiler = webpack({
	// 		mode: "development",
	// 		cache: false,
	// 		entry: {
	// 			0: entryFile
	// 		},
	// 		recordsPath: recordsFile,
	// 		output: {
	// 			path: outputPath
	// 		},
	// 		plugins: [new webpack.HotModuleReplacementPlugin()],
	// 		optimization: {
	// 			chunkIds: "named"
	// 		}
	// 	});
	// 	compiler.run((err, stats) => {
	// 		if (err) throw err;
	// 		done();
	// 	});
	// });

	it("should handle entryFile that contains path variable", done => {
		const entryFile = path.join(
			__dirname,
			"js",
			"HotModuleReplacementPlugin",
			"[name]",
			"entry.js"
		);
		const statsFile3 = path.join(
			__dirname,
			"js",
			"HotModuleReplacementPlugin",
			"HotModuleReplacementPlugin.test.stats3.txt"
		);
		const statsFile4 = path.join(
			__dirname,
			"js",
			"HotModuleReplacementPlugin",
			"HotModuleReplacementPlugin.test.stats4.txt"
		);
		const recordsFile = path.join(
			__dirname,
			"js",
			"HotModuleReplacementPlugin",
			"records.json"
		);
		try {
			fs.mkdirSync(
				path.join(__dirname, "js", "HotModuleReplacementPlugin", "[name]"),
				{
					recursive: true
				}
			);
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
				"[name]/entry.js": entryFile
			},
			recordsPath: recordsFile,
			output: {
				filename: "[name]",
				chunkFilename: "[name].js",
				path: path.join(__dirname, "js", "HotModuleReplacementPlugin"),
				hotUpdateChunkFilename: "static/webpack/[id].[hash].hot-update.js",
				hotUpdateMainFilename: "static/webpack/[hash].hot-update.json"
			},
			plugins: [new webpack.HotModuleReplacementPlugin()],
			optimization: {
				chunkIds: "named"
			}
		});
		// fs.writeFileSync(entryFile, "1", "utf-8");
		compiler.run((err, stats) => {
			if (err) return done(err);
			// fs.writeFileSync(statsFile3, stats.toString());
			compiler.run((err, stats) => {
				if (err) return done(err);
				// fs.writeFileSync(statsFile4, stats.toString());
				// fs.writeFileSync(entryFile, "2", "utf-8");
				compiler.run((err, stats) => {
					if (err) return done(err);
					// fs.writeFileSync(statsFile3, stats.toString());

					let foundUpdates = false;

					Object.keys(stats.compilation.assets).forEach(key => {
						foundUpdates =
							foundUpdates ||
							!!key.match(
								/static\/webpack\/\[name\]\/entry\.js\..*?\.hot-update\.js/
							);
					});

					// expect(foundUpdates).toBe(true);
					done();
				});
			});
		});
	});
});
