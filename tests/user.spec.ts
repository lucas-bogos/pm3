import { User } from "../src/domain/entities";
import { describe, expect, it } from "vitest";
import { Role } from "../src/domain/value-objects";

describe("Entidade usuário", () => {
  it("Deve retornar uma exceção quando passar um email inválido", () => {
    expect(() => {
      User.create("Fulano", "fulano@dominio_", "123", "Desenvolvedor", Role.READ);

    }).toThrow();
  });
});
