const { ROLES, ERRORS } = require('../common/params.json')
import { Request, Response, NextFunction } from 'express';

export default (req: any, res: Response, next: NextFunction) => {
    const role = req.user && req.user.role
    const isAdmin = ROLES[role] === 'admin'
    if (!isAdmin) {
        return res.status(403).send(ERRORS.NOT_PERMITTED_ACTION)
    }
    next()
}