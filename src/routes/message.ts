import { Router } from 'express';
import { body } from 'express-validator';
import { validateFields } from '@src/middlewares/fieldsValidation';
import { sendMessage } from '@src/controllers/messageController';

const messageRouter = Router();

messageRouter.post('/', 
  [
    body('sender').notEmpty().withMessage('Sender is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('subject').notEmpty().withMessage('Subject is required'),
    body('body').notEmpty().withMessage('Body is required'),
    validateFields
  ],
  sendMessage
);

export default messageRouter;