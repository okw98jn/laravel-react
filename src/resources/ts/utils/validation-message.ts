export function requiredMessage(attribute: string): string {
  return `${attribute}は必ず指定してください。`;
}

export function emailMessage(): string {
  return '有効なメールアドレスを指定してください。';
}

export function stringMinMessage(attribute: string, min: number): string {
  return `${attribute}は、${min}文字以上で指定してください。`;
}

export function stringMaxMessage(attribute: string, max: number): string {
  return `${attribute}は、${max}文字以下で指定してください。`;
}

export function passwordConfirmationMessage(): string {
  return 'パスワード（確認）とパスワードには同じ値を指定してください。';
}
