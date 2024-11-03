import { EmailAlreadyExistsException } from 'src/modules/user/domain/exceptions/email-already-exists.exception';
import { PasswordNotMatchException } from '@src/modules/user/domain/exceptions/password-not-match.exception';
import { InvalidPasswordException } from '@src/modules/user/domain/exceptions/invalid-password.exception';
import { InvalidGenderException } from '@src/modules/user/domain/exceptions/invalid-gender.exception';
import { UserNotFoundException } from '@src/modules/user/domain/exceptions/user-not-found.exception';
import { InvalidEmailException } from '@src/modules/user/domain/exceptions/invalid-email.exception';
import { Response } from 'express';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { AdvertisementNotFoundException } from '@src/modules/advertisement/domain/exceptions/advertisement-not-found.exception';
import { NotificationNotFoundException } from '@src/modules/notification/domain/exceptions/notification-not-found.exception';
import { AdvertisementPausedException } from '@src/modules/application/domain/exceptions/advertisement-paused.exception';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | object = 'An unexpected error occurred';

    if (exception instanceof EmailAlreadyExistsException) {
      status = HttpStatus.CONFLICT;
      message = exception.message;
    } else if (exception instanceof InvalidPasswordException) {
      status = HttpStatus.BAD_REQUEST;
      message = exception.message;
    } else if (exception instanceof InvalidGenderException) {
      status = HttpStatus.BAD_REQUEST;
      message = exception.message;
    } else if (exception instanceof InvalidEmailException) {
      status = HttpStatus.BAD_REQUEST;
      message = exception.message;
    } else if (exception instanceof PasswordNotMatchException) {
      status = HttpStatus.BAD_REQUEST;
      message = exception.message;
    } else if (exception instanceof UserNotFoundException) {
      status = HttpStatus.NOT_FOUND;
      message = exception.message;
    } else if (exception instanceof AdvertisementNotFoundException) {
      status = HttpStatus.NOT_FOUND;
      message = exception.message;
    } else if (exception instanceof NotificationNotFoundException) {
      status = HttpStatus.NOT_FOUND;
      message = exception.message;
    } else if (exception instanceof AdvertisementPausedException) {
      status = HttpStatus.BAD_REQUEST;
      message = exception.message;
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.getResponse();
    }

    response.status(status).json({
      statusCode: status,
      error: message,
    });
  }
}
