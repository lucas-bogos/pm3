import * as bcrypt from "bcrypt";

export class BcryptEncoder {
  private readonly rounds: number;

  constructor(rounds: number = 12) {
    this.rounds = rounds;
  }

  async encode(plain: string): Promise<string> {
    return await bcrypt.hash(plain, this.rounds);
  }

  async compare(plain: string, hashed: string): Promise<boolean> {
    return await bcrypt.compare(plain, hashed);
  }
}
