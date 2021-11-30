export const REGEX_VALID_NUMBERS = /^[0-9]+$/;
export const REGEX_VALID_NAME = /^[a-zA-ZÀ-ÿ Ññ., \\-]+$/;
export const REGEX_VALID_PHONE_NUMBER = /^\+?\d*$/;
export const REGEX_VALID_SOCIAL_REASON = /^[a-zA-ZÀ-ÿ0-9Ññ,_.:&@!¡;" -]*$/;
export const REGEX_VALID_DESCRIPTION = /^[a-zA-ZÀ-ÿ0-9Ññ,.:&@!¡;"'¨`$/% -]*$/;
export const REGEX_VALID_ADDRESS = /^[a-zA-ZÀ-ÿ0-9Ññ,.:&!¡;"'#/+°º -]*$/;
export const REGEX_VALID_FILENAME = /^[a-zA-ZÀ-ÿ0-9Ññ,.:&@!¡;"'¨`() -]*$/;
export const REGEX_VALID_COGNITO_PASSWORD =
   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\^$*.[\]{}()?\-"!@#%&/,><':;|_~`])\S{8,99}$/;
export const REGEX_VALID_HTML_CHARS = /[$()<>{}]/;
export const REGEX_VALID_USERNAME = /^[a-zA-ZÀ-ÿ0-9Ññ,_.:&@!¡;"'¨`$/%-]*$/;
export const REGEX_VALID_PLATE = /^[a-zA-Z0-9]*$/;
export const REGEX_VALID_MULTILINE = /^[a-zA-ZÀ-ÿ0-9Ññº°,.:&@!¡;"'¨`$/%#@ (\r\n|\r|\n) -]*$/;
export const REGEX_VALID_QUERY = /^[a-zA-ZÀ-ÿ0-9Ññ,.:&@!¡;"'¨`$/#_ -]*$/;
export const REGEX_VALID_EMAIL = /.+@.+\..+/;
export const REGEX_NO_ACCEPT_SPACES = /^[a-zA-ZÀ-ÿ0-9Ññ,_.:&@!¡;"'¨`$/%\\-]*$/;
export const REGEX_NO_SPECIAL_CHARACTERS = /[^a-zA-Z0-9]/;


