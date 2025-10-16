import { HttpErrorResponse } from '@angular/common/http';

export function parseErrorMessages(error: HttpErrorResponse) {
  if (error?.status === 500) {
    return 'خطا در اجرای عملیات';
  }
  let errorMessages = '';
  if (Array.isArray(error.error.messages)) {
    if (typeof error.error.messages?.[0] === 'string') {
      error.error.messages.forEach((msg: any) => {
        errorMessages += msg + '<br />';
      });
    } else {
      error.error.messages?.forEach((message: any) => {
        Object.keys(message).forEach((msg) => {
          if (typeof message[msg]?.message == 'string') {
            errorMessages += `${msg}: ${message[msg].message} <br />`;
          } else if (typeof message[msg]?.message?.[0] === 'string') {
            message[msg]?.message.forEach((msg: any) => {
              errorMessages += msg + '\n';
            });
          } else if (Array.isArray(message[msg]?.message)) {
            message[msg]?.message.forEach((insideMsg: any) => {
              Object.keys(insideMsg).forEach((key) => {
                errorMessages += key + ' : ' + insideMsg[key].join() + '<br>';
              });
            });
          } else if (
            message[msg]?.length == 1 &&
            typeof message[msg]?.[0] === 'string'
          ) {
            message[msg].forEach((msg: any) => {
              errorMessages += msg + '\n';
            });
          } else if (Array.isArray(message[msg])) {
            message[msg].forEach((insideMsg: any) => {
              Object.keys(insideMsg).forEach((key) => {
                errorMessages +=
                  (key === 'non_field_errors'
                    ? insideMsg[key].join()
                    : key + ' : ' + insideMsg[key].join()) + '<br>';
              });
            });
          } else if (typeof message[msg] === 'string') {
            errorMessages += message[msg] + '\n';
          }
        });
      });
    }
  } else {
    if (typeof error.error.messages === 'string') {
      errorMessages = error.error.messages;
    } else {
      const msg = Object.keys(error.error.messages);
      errorMessages += `${msg}: ${error.error.messages[msg[0]].message}<br/>`;
    }
  }
  return errorMessages;
}
