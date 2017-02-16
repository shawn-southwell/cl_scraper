
module.exports.checkCache = (cache, data) => {
	const CACHE_TEN = cache.slice(0,11);
	const DATA_TEN = data.slice(0,11);
	return DATA_TEN.filter((item, i) => item.title !== CACHE_TEN[i].title );
}

module.exports.generateString = (data=[]) => {
	return data.reduce((SMS, item) => {
		return `${SMS} \n Title: 	${item.title} Price: ${item.price}`;	
	},'');
}

module.exports.getSomeItems = (data=[],howMany) => {
	return data.slice(0,11);
}

module.exports.sendSMS = (client,message) => {
	client.sendMessage({
		to: '18124595469',
		from: '18126181295',
		body: message,
	});
}
