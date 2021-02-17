module.exports = (isAuthNeeded = true) => {
    return (req, res, next) => {
        const isNotAuthWhenIsNeeded = !req.user && isAuthNeeded;
        const isAuthWhenIsNotNeeded = req.user && !isAuthNeeded;

        if (isNotAuthWhenIsNeeded || isAuthWhenIsNotNeeded) {
            const redirectPage = isNotAuthWhenIsNeeded ? '/auth/login' : '/';
            res.redirect(redirectPage);
            return;
        }
        next();
    };
}