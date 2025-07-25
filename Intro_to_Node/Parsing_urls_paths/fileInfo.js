const path = require("path");

function getInfo(pathway){
	return{
		fileName:path.basename(pathway),
		extension:path.extname(pathway),
		directory:path.dirname(pathway)
	}
}

module.exports = getInfo;