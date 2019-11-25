module.exports = (error, request, response, next) => {
  console.error(error);
  return response
    .status(500)
    .json({
    	status: 'error',
    	error: 'Ooops!! Something went wrong.',
    });
};
