const preload = (api, option) => async (req, res, next) => {
	try {
		let params;
		let errorMessage;

		// TODO ADD NEEDED CASES

		switch (option) {
			case 'TODO':
				params = [req.body._id];
				errorMessage = '';
				break;

			default:
				throw new Error('Invalid preload option');
		}

		const currentState = await api(...params);

		if (currentState) {
			res.locals.preloadData = currentState;
			next();

		} else {
			throw new Error(errorMessage);
		}

	} catch (error) {
		next(error);
	}
};

export default preload;