import { Request, Response } from 'express';

const handleLogout = (req: Request, res: Response): void => {
    try {
        // clear from cookie
        res.clearCookie('jwt', {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
        });

        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export { handleLogout };
