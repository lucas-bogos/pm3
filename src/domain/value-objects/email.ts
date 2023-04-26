export class Email {
  public readonly value: string

  private constructor (email: string) {
    this.value = email;

    Object.freeze(this);
  }

  public static create(email: string): Email {
    if(!Email.isValid(email)) {
      throw new Error("Email é inválido");
    }

    return new Email(email);
  }

  private static isValid(value: string): boolean {
    const regex = /^[a-zA-Z0-9\-\_]+\@[a-z0-9\-\_]+\.[a-z]+(\.[a-z]+)?$/g;

    return regex.test(value);
  }
}
