import express from 'express';
import validateRequest from '../../middlewares/validateRequest';

import auth from '../../middlewares/auth';

import { UserRoleEnum } from '@prisma/client';
import { authValidation } from './auth.validation';
import { AuthControllers } from './auth.controller';
const router = express.Router();

router.post(
  '/login',
  validateRequest.body(authValidation.loginUser),
  AuthControllers.loginWithOtp,
);

router.post('/register', AuthControllers.registerWithOtp);
router.post('/logout', AuthControllers.logoutUser);

router.post(
  '/verify-email-with-otp',
  validateRequest.body(authValidation.verifyOtpValidationSchema),
  AuthControllers.verifyEmailWithOtp,
);

router.post(
  '/resend-verification-with-otp',
  validateRequest.body(authValidation.forgetPasswordValidationSchema),
  AuthControllers.resendVerificationWithOtp,
);

router.post(
  '/change-password',
  auth(UserRoleEnum.USER, UserRoleEnum.ADMIN),
  AuthControllers.changePassword,
);

router.post(
  '/forget-password',
  validateRequest.body(authValidation.forgetPasswordValidationSchema),
  AuthControllers.forgetPassword,
);

router.post(
  '/forget-password/verify-otp',
  validateRequest.body(authValidation.verifyOtpValidationSchema),
  AuthControllers.verifyForgotPassOtp,
);

router.post(
  '/reset-password',
  validateRequest.body(authValidation.resetPasswordValidationSchema),
  AuthControllers.resetPassword,
);

export const AuthRouters = router;
